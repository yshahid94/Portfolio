<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <!-- <label for="checkbox">{{ running ? "Running" : "Stopped" }}</label>
          <input type="checkbox" id="checkbox" v-model="running" /> -->
          <input type="button" @click="stepBack()" value="<||" />
          <input type="button" @click="stepOnce()" value="||>" />
          <input type="button" @click="toggleRunning()" :value="running ? '||' : '>'" />
          <!-- <p>Frame: {{ frame }}</p> -->
          <!-- <p>test: {{ test }}</p> -->
          <!-- <div class="row" :key="index" v-for="(entity, index) in entities">
              <p>Name: {{ entity.name }}</p>
              <p>Ate: {{ entity.foodAte }}</p>
          </div> -->
          <form>
            <div class="form-group">
              <input type="range" class="form-control-range" min="0" max="100" step="1" v-model="boardSpeed">
            </div>
          </form>
          
          <p>FPS: {{ fps }}</p>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-body">
        <!-- <div class="row" v-bind:key="'row' + index" v-for="(row, index) in map">
          <div
            class="cell"
            v-bind:key="'cell' + index"
            v-for="(cell, index) in row"
          >
            <div class="cell-contents" >
                    </div> -->
            <!-- <GoLCell v-bind:type=cell.type v-bind:color=cell.color v-bind:name=cell.name /> -->
            <!-- <component :is="cell"></component>
            <GoLCell
              :type="cell.type"
              :color="cell.color"
              :name="cell.name"
              :selected="cell.selected"
              :height="size"
              :width="size"
            />
          </div>
        </div> -->
        <!-- <svg :width=size*sizeX :height=size*sizeY>
            <g v-for="(row, rowIndex) in map" :key="'row' + rowIndex">
                <rect
                    v-for="(cell, cellIndex) in row"
                    :key="'cell' + cellIndex"
                    :width=size
                    :height=size
                    :fill="'rgb(' + cell.color + ')'"
                    :x=cellIndex*size
                    :y=rowIndex*size
                />
            </g>
        </svg> -->

        <canvas
            ref="canvas"
            :width=widthDim
            :height=heightDim
        />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import GoLCell from "./GoLCell.vue";
// import GoLFood from "./GoLFood.vue";
// import GoLEntity from "./GoLEntity.vue";
import { GoLEntity, GoLWall, GoLFood, GoLEmpty, Direction } from "./CellTypes";
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
  private test = 0;
  private ctx?: CanvasRenderingContext2D = undefined;
  private maxNumberOfFood = 10;
  private lastEvolveTime = 0;
  private boardSpeed = 60;
  private fps = 0;
  private timeBetweenFrames: number[] = [];
  @Prop() private sizeX!: number;
  @Prop() private sizeY!: number;
  private widthDim = this.size*this.sizeX;
  private heightDim = this.size*this.sizeY;
  // private mapHistory: Array<Array<any[]>> = [];
  // private entitiesHistory: Array<GoLEntity[]> = [];
  // private wallsHistory: Array<GoLWall[]> = [];
  // private foodHistory: Array<GoLFood[]> = [];
  // public createEmptyCell(name: string): GoLCell {
  //     const cell = GoLCell.createCell("EmptyCell","black", name);
  //     return cell;
  // }
  // public createFood(name: string): GoLCell {
  //     const food = GoLCell.createCell("Food", "green", name);
  //     return food;
  // }
  beforeDestroy() {
      this.evolve = () => {
          //Do nothing
      };
  }
  mounted() {
    //this.walls.push(new GoLWall(1,1));
    // this.entities.push(new GoLEntity(0, 0, "A", [0, 255, 0], 15, 1, Direction.Plus));
    // this.entities.push(new GoLEntity(49, 49, "B", [0, 0, 255], 45, 2, Direction.Diagonal));
    // this.entities.push(new GoLEntity(0, 49, "C", [255, 255, 255], 75, 3, Direction.Plus));
    // this.entities.push(new GoLEntity(49, 0, "D", [255, 255, 0], 100, 5, Direction.Diagonal));

    this.entities.push(new GoLEntity(0, 49, "C", [255, 255, 255], 75, 1, Direction.Diagonal));

    this.map = this.get2dBoardFromListOfCells();

    const canvas: any = this.$refs.canvas;
    this.ctx = canvas.getContext('2d');
    
    requestAnimationFrame(this.evolve);
    
    // interval(1).subscribe(val => {
    //   //this.test++;
    //   if (this.running) {
    //     //     for (let i = 0; i < 5; i++) {
    //     this.stepBoard();
    //     //     }
    //   }
    // });

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

  public stepOnce(){
    // this.stepBoard();
    this.running = false;
    requestAnimationFrame(this.evolve);
  }

  // public stepBack(){
  //   this.running = false;
  //   if(this.mapHistory.length > 0 && this.entitiesHistory.length > 0 && this.wallsHistory.length > 0 && this.foodHistory.length > 0)
  //   {
  //     this.map = this.mapHistory.pop()!;
  //     this.entities = this.entitiesHistory.pop()!;
  //     this.walls = this.wallsHistory.pop()!;
  //     this.food = this.foodHistory.pop()!;
  //     this.frame--;
  //   }
  // }
  
  public toggleRunning(){
    this.running = !this.running;
    requestAnimationFrame(this.evolve);
  }

  public evolve(now: number){
    // const t0 = performance.now();
    const { lastEvolveTime } = this;
    
    // this.fps = Math.trunc(1/((Math.trunc(now) - Math.trunc(this.lastEvolveTime))/1000));
    

    if((!lastEvolveTime || now - lastEvolveTime >= 500/this.boardSpeed))
    {
      this.timeBetweenFrames.push((Math.trunc(now) - Math.trunc(this.lastEvolveTime)));

      if(this.timeBetweenFrames.length > 10)
      {
        const last10FrameTimes: number[] = this.timeBetweenFrames.slice(this.timeBetweenFrames.length - 10);
        let frameTime = 0;
        for (let index = 0; index < last10FrameTimes.length; index++) {
          frameTime += last10FrameTimes[index];
        }
        this.fps = Math.trunc(1/((frameTime/10)/1000));
      }

      
      this.lastEvolveTime = now;
      this.stepBoard();
    }

    if(this.running)
    {
      requestAnimationFrame(this.evolve);
    }
  }

  @Watch("map")
  mapChanged() {
    const { ctx, heightDim, widthDim, sizeX, sizeY, map, size } = this;
    ctx!.clearRect(0, 0, widthDim, heightDim);
    ctx!.fillStyle = "black";
    ctx!.fillRect(0, 0, widthDim, heightDim);
    ctx!.clearRect(1, 1, widthDim-2, heightDim-2);
    for (let row = 0; row < sizeY; row++) {
      const gridRow = map[row];
      for (let cell = 0; cell < sizeX; cell++) {
        if(!(gridRow[cell] instanceof GoLEmpty))
        {
          ctx!.fillStyle = "rgb(" + gridRow[cell].color[0] + "," + gridRow[cell].color[1] + "," + gridRow[cell].color[2] + ")";
          ctx!.fillRect(cell * size, row * size, size, size);
        }
      }
    }
  }

  public mixColours(colorSet1: [number, number, number], colorSet2: [number, number, number]): [number, number, number] {
    return [colorSet2[0] + (colorSet1[0] - colorSet2[0] / 2), colorSet2[1] + (colorSet1[1] - colorSet2[1] / 2), colorSet2[2] + (colorSet1[2] - colorSet2[2] / 2) ];
  }

  public get2dBoardFromListOfCells(): Array<any[]> {
    const board2d: Array<any[]> = [];

    for (let indexY = 0; indexY < this.sizeY; indexY++) {
      const row: Array<any> = [];
      for (let indexX = 0; indexX < this.sizeX; indexX++) {
        row.push(new GoLEmpty(indexY, indexX)); //push the default box into this
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

  public getListOfCellsInViewRange(
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
    }

    parentClosedSet.forEach(childPosition => {
      cells.push(board2d[childPosition[0]][childPosition[1]]);
    });

    return cells;
  }

  public atSameLocation(cell1: any, cell2: any): boolean {
    return (cell1.location[0] == cell2.location[0] &&
            cell1.location[1] == cell2.location[1])
  }

  public stepBoard() {
    const entities2: Array<GoLEntity> = [];
    
    // this.mapHistory.push(this.map);


    // const entitiesState: GoLEntity[] = [];
    // for (let entityIndex = 0; entityIndex < this.entities.length; entityIndex++) {
    //   const element = this.entities[entityIndex];
      
    //   const entityCopy: GoLEntity = Object.assign({}, this.entities[entityIndex]);
    //   entitiesState.push(entityCopy);
    // }

    // this.entitiesHistory.push(entitiesState);

    
    // const foodState: GoLFood[] = [];
    // for (let entityIndex = 0; entityIndex < this.food.length; entityIndex++) {
    //   const element = this.food[entityIndex];
      
    //   const foodCopy: GoLFood = Object.assign({}, this.food[entityIndex]);
    //   foodState.push(foodCopy);
    // }

    // this.foodHistory.push(foodState);
    

    // this.wallsHistory.push(this.walls);

    for (let index = 0; index < this.entities.length; index++) {
      const entity = this.entities[index];
      if(this.frame % entity.speed == 0)
      {
        if (entity.currentAction == "Wandering")
        {
          const inrangeCells = this.getListOfCellsInViewRange(
          entity.location,
          entity.viewRange,
          this.map
          );

          const targetFood = inrangeCells.find(cell => cell instanceof GoLFood);

          if (targetFood != null) {
          entity.targetLocation = targetFood.location;

          entity.currentAction = "Moving";
          }
        } else if (entity.currentAction == "Moving") 
        {
          //check if food is still there
          if (
          this.food.some(
            food =>
            food.location[0] == entity.targetLocation[0] &&
            food.location[1] == entity.targetLocation[1]
          )) 
          {
            //find path to food using AStar algo
            const path = AStar.run(
              this.map,
              [entity.location[0], entity.location[1]],
              [entity.targetLocation[0], entity.targetLocation[1]]
            );

            if (path == null) {
              entity.currentAction = "Wandering";
            } else if (path.length > 1) {
              // if any movement needs to be made, make it
              entity.move(path[1][0], path[1][1]);
            } else 
            {
              entity.currentAction = "Wandering";
            }
          } else 
          {
            entity.currentAction = "Wandering";
          }
        }
      this.entities[index] = entity;

      
      for (let entityIndex = 0; entityIndex < this.entities.length; entityIndex++) 
      {
        for (let foodIndex = 0; foodIndex < this.food.length; foodIndex++) 
        {
          const singleFood = this.food[foodIndex];
        
          if(this.entities[entityIndex].atSameLocation(singleFood))
          {
            const eaterEntity = this.entities[entityIndex];
            this.food.splice(foodIndex, 1);
            console.log(entity.name + ' ate food at (' + eaterEntity.location[0] + ',' + eaterEntity.location[1] + ')' );

            entity.foodAte++;
            entity.currentAction = "Wandering";
            break; //If food was found on spot and ate stop checking for more food on the spot
          }
        //   if(this.entities[entityIndex].location[0] == singleFood.location[0] &&
        //     this.entities[entityIndex].location[1] == singleFood.location[1])
        //     {
        //       const eaterEntity = this.entities[entityIndex];

        //       this.food = this.food.filter(eachFood => eachFood !== singleFood);
        //       this.food.splice(foodIndex, 1);

        //     }
        // }
        }
      }

      this.food.forEach(singleFood => {
        const eaterEntity = this.entities.find(
        entity =>
          entity.location[0] == singleFood.location[0] &&
          entity.location[1] == singleFood.location[1]
        );

        if (eaterEntity != null) {
        this.food = this.food.filter(eachFood => eachFood !== singleFood);
        //this.food.remove(singleFood);

        console.log(entity.name + ' ate food at (' + eaterEntity.location[0] + ',' + eaterEntity.location[1] + ')' );
        entity.foodAte++;
        entity.currentAction = "Wandering";
        }
      });
      }


    }

    if (this.food.length < this.maxNumberOfFood && this.frame % 10 == 0) {
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

      if (this.map[randomLocation[0]][randomLocation[1]] instanceof GoLEmpty) {
        foodLocation = randomLocation;
      }
    }

    this.food.push(new GoLFood(foodLocation[0], foodLocation[1], ""));
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
