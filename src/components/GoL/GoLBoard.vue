<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <!-- <label for="checkbox">{{ running ? "Running" : "Stopped" }}</label>
          <input type="checkbox" id="checkbox" v-model="running" /> -->
          <!-- <input type="button" @click="stepBack()" value="<||" /> -->
          <button type="button" class="btn step" @click="stepOnce()"></button>
          <button type="button" @click="toggleRunning()" :class="running ? 'btn pause' : 'btn play'"></button>
          <!-- <p>Frame: {{ frame }}</p> -->
          <!-- <p>test: {{ test }}</p> -->
          <!-- <div class="row" :key="index" v-for="(entity, index) in entities">
              <p>Name: {{ entity.name }}</p>
              <p>Ate: {{ entity.foodAte }}</p>
          </div> -->
          <!-- <form>
            <div class="form-group">
              <input type="range" class="form-control-range" min="0" max="100" step="1" v-model="boardSpeed">
            </div>
          </form>
          
          <p>FPS: {{ fps }}</p> -->
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
import { Prop, Vue, Watch } from "vue-property-decorator";

export default class GoLBoard extends Vue {
  //private map: Array<object>;
  private map: Array<any[]> = [];
  private size = 10;
  private running = true;
  //private frame = 0;
  // private test = 0;
  private ctx?: CanvasRenderingContext2D = undefined;
  // private maxNumberOfFood = 10;
  private lastEvolveTime = 0;
  private boardSpeed = 60;
  // private fps = 0;
  // private timeBetweenFrames: number[] = [];
  @Prop() private sizeX!: number;
  @Prop() private sizeY!: number;
  private widthDim = this.size*this.sizeX;
  private heightDim = this.size*this.sizeY;
  private mapHistory: Array<Array<any[]>> = [];
  private matched = false;
  private currentPostMatchedFrames = 0
  private postMatchedFrames = 5
  beforeDestroy() {
      this.evolve = () => {
          //Do nothing
      };
  }
  mounted() {
    const canvas: any = this.$refs.canvas;
    this.ctx = canvas.getContext('2d');
    this.map = this.setupBoard(this.sizeY, this.sizeX);
    
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
    // const { lastEvolveTime } = this;
    
    // this.fps = Math.trunc(1/((Math.trunc(now) - Math.trunc(this.lastEvolveTime))/1000));
    

    // if((!lastEvolveTime || now - lastEvolveTime >= 500/this.boardSpeed))
    // {
    //   this.timeBetweenFrames.push((Math.trunc(now) - Math.trunc(this.lastEvolveTime)));

    //   if(this.timeBetweenFrames.length > 10)
    //   {
    //     const last10FrameTimes: number[] = this.timeBetweenFrames.slice(this.timeBetweenFrames.length - 10);
    //     let frameTime = 0;
    //     for (let index = 0; index < last10FrameTimes.length; index++) {
    //       frameTime += last10FrameTimes[index];
    //     }
    //     this.fps = Math.trunc(1/((frameTime/10)/1000));
    //   }

      
    //   this.lastEvolveTime = now;
    //   this.stepBoard();
    // }

    if(this.running)
    {
      this.stepBoard();
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
        if(gridRow[cell])
        {
          ctx!.fillStyle = "rgb(255, 255, 255)";
          ctx!.fillRect(cell * size, row * size, size, size);
        }
      }
    }
  }
        
  public setupBoard(heightPar: number, widthPar: number): Array<any[]>
  {
    const map2: Array<any[]> = [];
    for (let indexY = 0; indexY < heightPar; indexY++) {
      const newRow = [];
      for (let indexX = 0; indexX < widthPar; indexX++) {
        const flip = Math.floor(Math.random() * 2);
        newRow.push(flip == 1);
      }
      map2.push(newRow);
    }

    return map2
  }


  public stepBoard() {
    
    // for (let index = 0; index < this.entities.length; index++) {
    //   const entity = this.entities[index];
    //   if(this.frame % entity.speed == 0)
    //   {


    //   }
    // }

    const { mapHistory, map } = this;

    
    if(this.matched == false)
    {
      for (let index = 0; index < mapHistory.length; index++) 
      {
        const currentMap = mapHistory[index];
        if (JSON.stringify(currentMap) == JSON.stringify(map)) 
        {
          this.matched = true;
        }
      }
      this.mapHistory.push(this.map)
    }
    else if(this.currentPostMatchedFrames < this.postMatchedFrames)
    {
      this.currentPostMatchedFrames += 1

    }
    else
    {
      this.mapHistory = [];
      this.map = this.setupBoard(this.sizeY, this.sizeX);
      this.matched = false;
      this.currentPostMatchedFrames = 0
    }

    const map2: Array<any[]> = [];
    for (let indexY = 0; indexY < map.length; indexY++) {
      const row = map[indexY];
      const newRow = [];
      for (let indexX = 0; indexX < row.length; indexX++) {
        const cell = row[indexX];
        const alive = this.getNumberOfAliveFromXandY(indexY, indexX);
        if(cell && (alive == 2 || alive == 3))
        {
          newRow.push(true);
        }
        else if(cell == false && alive == 3)
        {
          newRow.push(true);
        }
        else{
          newRow.push(false);
        }
      }
      map2.push(newRow);
    }

    this.map = map2;

    //this.frame++;
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
  public getNumberOfAliveFromXandY(y: number, x: number): number {
    const { sizeX, sizeY } = this;

    let alive = 0;
    for (const xModifier of [-1, 0, 1]) {
      for (const yModifier of [-1, 0, 1]) {
        let xModified = x + xModifier;
        let yModified = y + yModifier;
        
        if(xModified < 0){
            xModified += sizeX
        }
        else if(xModified == sizeX){
            xModified -= sizeX
        }
        if(yModified < 0){
            yModified += sizeY
        }
        else if(yModified == sizeY){
          yModified -= sizeY
        }
        
        if(!(xModified == x && yModified == y) && this.map[xModified][yModified]){
          alive += 1
        }
      }
    }
    return alive;
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn.step:after {
	content: '\f051';
	font-family: FontAwesome;
	padding-left: 10px;
}
.btn.play:after {
	content: '\f04b';
	font-family: FontAwesome;
	padding-left: 10px;
}
.btn.pause:after {
	content: '\f04c';
	font-family: FontAwesome;
	padding-left: 10px;
}
</style>
