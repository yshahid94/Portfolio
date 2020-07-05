<template>
  <div class="container">
    <input type="checkbox" id="checkbox" v-model="running" />
    <label for="checkbox">{{ running ? "Running" : "Stopped" }}</label>
    <p>Frame: {{ frame }}</p>
    <div class="row" :key="index" v-for="(entity, index) in entities">
      <p>Name: {{ entity.name }}</p>
      <p>Ate: {{ entity.foodAte }}</p>
    </div>

    <div class="row" v-bind:key="'row' + index" v-for="(row, index) in map">
      <div
        class="cell"
        v-bind:key="'cell' + index"
        v-for="(cell, index) in row"
      >
        <!-- <div class="cell-contents" >
                </div> -->
        <!-- <GoLCell v-bind:type=cell.type v-bind:color=cell.color v-bind:name=cell.name /> -->
        <!-- <component :is="cell"></component> -->
        <GoLCell
          v-if="cell == null"
          type="empty"
          color="black"
          name=""
          :height="size"
          :width="size"
        />
        <GoLCell
          v-else
          :type="cell.type"
          :color="cell.color"
          :name="cell.name"
          :selected="cell.selected"
          :height="size"
          :width="size"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GoLCell from "./GoLCell.vue";
// import GoLFood from "./GoLFood.vue";
// import GoLEntity from "./GoLEntity.vue";
import { GoLEntity, GoLWall, GoLFood } from "./CellTypes";
import { AStar } from "./aStar";
import { interval } from "rxjs";

@Component({
  components: {
    GoLCell
  }
})
export default class GoLBoard extends Vue {
  //private map: Array<object>;
  private map: Array<any[]> = [];
  private size = 20;
  private entities: GoLEntity[] = [];
  private walls: GoLWall[] = [];
  private food: GoLFood[] = [];
  private running = false;
  private frame = 0;
  @Prop() private sizeX!: number;
  @Prop() private sizeY!: number;
  // public createEmptyCell(name: string): GoLCell {
  //     const cell = GoLCell.createCell("EmptyCell","black", name);
  //     return cell;
  // }
  // public createFood(name: string): GoLCell {
  //     const food = GoLCell.createCell("Food", "green", name);
  //     return food;
  // }
  mounted() {
    //this.walls.push(new GoLWall(1,1));
    this.entities.push(new GoLEntity(0, 0, "A", "green", 15, 1));
    this.entities.push(new GoLEntity(49, 49, "B", "blue", 45, 3));
    this.entities.push(new GoLEntity(0, 49, "C", "white", 75, 5));
    this.entities.push(new GoLEntity(49, 0, "D", "yellow", 100, 20));

    this.map = this.get2dBoardFromListOfCells();

    interval(1000 / 60).subscribe(val => {
      if (this.running) {
        //     for (let i = 0; i < 5; i++) {
        this.stepBoard();
        //     }
      }
    });

    // window.requestAnimationFrame(() => {
    //   if (this.running) {
    //     this.stepBoard(timestamp);
    //   }
    // });

    // while(true)
    // {
    //     if(this.running)
    //     {
    //         this.stepBoard()
    //     }
    // }
  }
  //   @Watch("sizeX")
  //   sizeXChanged(val: number, oldVal: number) {
  //     const changeAmount = Math.abs(val - oldVal);
  //     if (val != oldVal) {
  //       //expanding
  //       if (val > oldVal) {
  //         this.map.forEach(element => {
  //           for (let index = 0; index < changeAmount; index++) {
  //             +element.push(null); //push the default box into this
  //           }
  //         });
  //       }
  //       //compressing
  //       else {
  //         this.map.forEach(element => {
  //           for (let index = 0; index < changeAmount; index++) {
  //             element.pop();
  //           }
  //         });
  //       }
  //     }
  //   }

  //   @Watch("sizeY")
  //   sizeYChanged(val: number, oldVal: number) {
  //     const changeAmount = Math.abs(val - oldVal);
  //     if (val != oldVal) {
  //       //expanding
  //       if (val > oldVal) {
  //         for (let indexY = 0; indexY < changeAmount; indexY++) {
  //           const i: object[] = [];
  //           for (let indexX = 0; indexX < this.sizeX; indexX++) {
  //             i.push(null); //push the default box into this
  //           }
  //           this.map.push(i);
  //         }
  //       }
  //       //compressing
  //       else {
  //         this.map.forEach(element => {
  //           for (let index = 0; index < changeAmount; index++) {
  //             element.pop();
  //           }
  //         });
  //       }
  //     }
  //   }

  public get2dBoardFromListOfCells(): Array<any[]> {
    const board2d: Array<any[]> = [];

    for (let indexY = 0; indexY < this.sizeY; indexY++) {
      const row: Array<any> = [];
      for (let indexX = 0; indexX < this.sizeX; indexX++) {
        row.push(null); //push the default box into this
      }
      board2d.push(row);
    }

    this.entities.forEach(entity => {
      board2d[entity.location[0]][entity.location[1]] = entity;
    });

    this.walls.forEach(wall => {
      board2d[wall.location[0]][wall.location[1]] = wall;
    });

    this.food.forEach(food => {
      board2d[food.location[0]][food.location[1]] = food;
    });

    return board2d;
  }

  public getListOfCellsInRange(
    position: [number, number],
    viewRange: number,
    board2d: Array<any[]>
  ): Array<any> {
    const parentClosedSet: Array<[number, number]> = [];
    let parentOpenSet: Array<[number, number]> = [];
    const cells: Array<any> = [];

    parentOpenSet.push(position);

    for (let index = 0; index < viewRange; index++) {
      // Keep running till all nodes have been closed

      const NoOfparentNodes = parentOpenSet.length;
      const childOpenSet: Array<[number, number]> = [];
      for (let indexNode = 0; indexNode < NoOfparentNodes; indexNode++) {
        //while (parentOpenSet.length > 0){

        const parentNode = parentOpenSet.shift();
        parentClosedSet.push(parentNode!);

        // Unzip the current node position
        const x = parentNode![0];
        const y = parentNode![1];

        const neighbors: Array<[number, number]> = [
          [x - 1, y],
          [x + 1, y],
          [x, y - 1],
          [x, y + 1]
        ];

        neighbors.forEach(childPosition => {
          // Make sure on board and node hasn't already been covered
          if (
            !(
              childPosition[0] > board2d.length - 1 ||
              childPosition[0] < 0 ||
              childPosition[1] > board2d[board2d.length - 1].length - 1 ||
              childPosition[1] < 0
            ) &&
            !(
              parentClosedSet.some(
                closedPosition =>
                  closedPosition[0] == childPosition[0] &&
                  closedPosition[1] == childPosition[1]
              ) ||
              parentOpenSet.some(
                openPosition =>
                  openPosition[0] == childPosition[0] &&
                  openPosition[1] == childPosition[1]
              ) ||
              childOpenSet.some(
                openPosition =>
                  openPosition[0] == childPosition[0] &&
                  openPosition[1] == childPosition[1]
              )
            )
          ) {
            childOpenSet.push(childPosition);
          }
        });
      }
      parentOpenSet = parentOpenSet.concat(childOpenSet);
      //parentClosedSet = parentClosedSet.concat(parentOpenSet);
      //parentOpenSet = [];
    }

    parentClosedSet.forEach(childPosition => {
      cells.push(board2d[childPosition[0]][childPosition[1]]);
    });

    return cells;
  }

  public stepBoard() {
    const entities2: Array<GoLEntity> = [];
    const activeEntities = this.entities.filter(x => this.frame % x.speed == 0);
    const nonActiveEntities = this.entities.filter(
      x => this.frame % x.speed != 0
    );
    const board2d = this.map;

    activeEntities.forEach(entity => {
      if (entity.currentAction == "Wandering") {
        const inrangeCells = this.getListOfCellsInRange(
          entity.location,
          entity.viewRange,
          board2d
        );

        const targetFood = inrangeCells.find(cell => cell instanceof GoLFood);

        if (targetFood != null) {
          entity.targetLocation = targetFood.location;

          entity.currentAction = "Moving";
        }
      } else if (entity.currentAction == "Moving") {
        //check if food is still there
        if (
          this.food.some(
            food =>
              food.location[0] == entity.targetLocation[0] &&
              food.location[1] == entity.targetLocation[1]
          )
        ) {
          const path = AStar.run(
            board2d,
            [entity.location[0], entity.location[1]],
            [entity.targetLocation[0], entity.targetLocation[1]]
          );
          if (path == null) {
            entity.currentAction = "Wandering";
            // if(debug):
            //     print(person.name + ' could not find a path and is standing now')
          } else if (path.length > 1) {
            // if any movement needs to be made, make it
            entity.move(path[1][0], path[1][1]);
            // if(debug):
            //     print(person.name + ' moved to (' + str(path[1][0]) + ',' + str(path[1][1]) + ')')
          } else {
            entity.currentAction = "Wandering";
            // if(debug):
            //     print(person.name + ' is standing now')
          }
        } else {
          entity.currentAction = "Wandering";
        }
      }
      entities2.push(entity);

      this.food.forEach(singleFood => {
        const eaterEntity = this.entities.find(
          entity =>
            entity.location[0] == singleFood.location[0] &&
            entity.location[1] == singleFood.location[1]
        );

        if (eaterEntity != null) {
          this.food = this.food.filter(eachFood => eachFood !== singleFood);
          //this.food.remove(singleFood);
          //console.log(entity.name + ' ate food');
          entity.foodAte++;
          entity.currentAction = "Wandering";
        }
      });
    });

    this.entities = entities2;
    this.entities = this.entities.concat(nonActiveEntities);

    if (this.frame % 50 == 0) {
      this.generateRandomFood();
    }

    this.map = this.get2dBoardFromListOfCells();
    this.frame++;
  }

  public getPositionFromXandY(y: number, x: number) {
    let count = y * this.sizeX;
    count += x;
    return count;
  }
  public getPositionFromCount(count: number): [number, number] {
    const x = count % this.sizeX;
    const y = Math.trunc(count / this.sizeX);
    return [y, x];
  }

  public generateRandomFood() {
    let foodLocation: number[] = [];

    while (foodLocation.length == 0) {
      //const randomLocation = Math.random(0, (this.sizeY * this.sizeX) - 1);
      const randomLocationCount = Math.floor(
        Math.random() * (this.sizeY * this.sizeX)
      );
      const randomLocation: [number, number] = this.getPositionFromCount(randomLocationCount);

      if (this.map[randomLocation[0]][randomLocation[1]] == null) {
        foodLocation = randomLocation;
      }
    }

    this.food.push(new GoLFood(foodLocation[0], foodLocation[1], ""));
  }
}
</script>
<!--
<script>
export default {
  name: 'GoLBoard',
  props: {
    msg: String
  },
  watch: {
      sizeX: function (val, oldVal) {
        const changeAmount = Math.abs(val - oldVal);
        if (val != oldVal)
        {
            //expanding
            if (val > oldVal){
                this.map.forEach(element => {
                    for (let index = 0; index < changeAmount; index++) {
                        element.push(); //push the default box into this
                    }
                });
            }
            //compressing
            else {
                this.map.forEach(element => {
                    for (let index = 0; index < changeAmount; index++) {
                        element.pop();
                    }
                });
            }
        }
      },
      sizeY: function (val, oldVal) {
        const changeAmount = Math.abs(val - oldVal);
        if (val != oldVal)
        {
            //expanding
            if (val > oldVal){
                for (let index = 0; index < changeAmount; index++) {
                    const i = [];
                    for (let index = 0; index < this.sizeX; index++) {
                        i.push(); //push the default box into this
                    }
                    this.map.push(i);
                }
            }
            //compressing
            else {
                this.map.forEach(element => {
                    for (let index = 0; index < changeAmount; index++) {
                        element.pop();
                    }
                });
            }
        }
      }
  },
  data() {
    return {
        map: []
    }
  },
  methods: {
    test() {

        
        return "hi";
    }
  }
}
</script>-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
