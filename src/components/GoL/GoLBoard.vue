<template>
  <div class="row">
    <div class="col-md-3 col-xs-12 card bg-dark text-white">
      <div class="card-body">
        <!-- <div class="col-md-5"></div> -->
        <!-- <label for="checkbox">{{ running ? "Running" : "Stopped" }}</label>
        <input type="checkbox" id="checkbox" v-model="running" /> -->
        <!-- <input type="button" @click="stepBack()" value="<||" /> -->
        <button type="button" class="btn" @click="stepOnce()">
          <i class="fa fa-step-forward"></i>
        </button>
        <button type="button" class="btn" @click="toggleRunning()">
          <i :class="running ? 'fa fa-pause' : 'fa fa-play'"></i>
        </button>

        <label for="boardSpeed">Speed:</label>
        <input
          type="range"
          id="boardSpeed"
          class="form-control-range"
          min="0"
          max="100"
          step="1"
          v-model="boardSpeed"
        />

        <p>Frame: {{ frame }}</p>
        <label for="autoRandom">Auto Randomise on match:</label>
        <input
          type="checkbox"
          id="autoRandom"
          v-model="autoRandomiseOnMatch"
        />
      </div>
    </div>

    <div class="col-md-9 col-xs-12 card bg-dark">
      <div ref="canvasBody" class="card-body">
        <canvas
          ref="canvas"
          :width="widthDim"
          :height="heightDim"
          @mousemove="draw"
          @mousedown="beginDrawing"
          @mouseup="stopDrawing"
          @mouseleave="stopDrawing"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Watch, Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class GoLBoard extends Vue {
  //private map: Array<object>;
  private map: Array<any[]> = [];
  private size = 10;
  private running = true;
  private frame = 0;
  private ctx?: CanvasRenderingContext2D = undefined;
  private lastEvolveTime = 0;
  private boardSpeed = 5;
  // private fps = 0;
  // private timeBetweenFrames: number[] = [];
  private sizeX = 50;
  private sizeY = 50;
  private borderWidth = 5;
  private mapHistory: Array<Array<any[]>> = [];
  private matched = false;
  private currentPostMatchedFrames = 0;
  private postMatchedFrames = 5;
  private autoRandomiseOnMatch = true;
  private isDrawing = false;
  private brush = true;
  
  beforeDestroy() {
    this.evolve = () => {
      //Do nothing
    };
  }
  mounted() {
    // window.addEventListener('resize', this.getWindowWidth);
    const canvas: any = this.$refs.canvas;
    const canvasBody: any = this.$refs.canvasBody;
    this.ctx = canvas.getContext("2d");
    this.map = this.setupBoard(this.sizeY, this.sizeX);
    
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth()
    })

    requestAnimationFrame(this.evolve);
  }

  get widthDim() {
    return this.size * this.sizeX + this.borderWidth * 2;
  }

  get heightDim() {
    return this.size * this.sizeY + this.borderWidth * 2;
  }

  public getWindowWidth() {
    const canvasBody: any = this.$refs.canvasBody;

    const {
      width,
      height
    } = canvasBody.getBoundingClientRect();

    const newSizeX = Math.trunc((width - this.borderWidth * 2 - 20) / this.size);

    //if map size is changing clear map history as it's not longer relevant
    if(newSizeX != this.sizeX)
    {
      this.mapHistory = [];
      this.sizeX = newSizeX;
    }

    //Making Y reactive is a bad idea probably best to have it as a manual setting on the frontend
    //this.sizeY = Math.trunc((height - this.borderWidth * 2) / this.size);
  }

  public makeDeepClone(map: Array<any[]>): Array<any[]> {
    const map2: Array<any[]> = [];

    for (let indexY = 0; indexY < this.map.length; indexY++) {
      const row = this.map[indexY];
      const newRow = [];
      for (let indexX = 0; indexX < row.length; indexX++) {
        const cell = row[indexX];
        const alive = this.getNumberOfAliveFromXandY(indexY, indexX);
        if (cell) {
          newRow.push(true);
        } else {
          newRow.push(false);
        }
      }
      map2.push(newRow);
    }

    return map2;
  }

  public draw(e: MouseEvent) {
    if (this.isDrawing === true) {
      const x = Math.trunc((e.offsetX - this.borderWidth) / this.size);
      const y = Math.trunc((e.offsetY - this.borderWidth) / this.size);

      const map2: Array<any[]> = this.makeDeepClone(this.map);

      map2[y][x] = true;
      this.map = map2;
    }
  }

  public beginDrawing(e: MouseEvent) {
    this.isDrawing = true;
  }

  public stopDrawing(e: MouseEvent) {
    if (this.isDrawing === true) {
      // drawLine(context, x, y, e.offsetX, e.offsetY);
      // x = 0;
      // y = 0;
      this.isDrawing = false;
    }
  }

  @Watch("sizeX")
  sizeXChanged(val: number, oldVal: number) {
    console.log(val, oldVal);
    const changeAmount = Math.abs(val - oldVal);
    if (val != oldVal) {
      //expanding
      if (val > oldVal) {
        this.map.forEach(element => {
          for (let index = 0; index < changeAmount; index++) {
            +element.push(null); //push the default box into this
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
  }

  @Watch("sizeY")
  sizeYChanged(val: number, oldVal: number) {
    const changeAmount = Math.abs(val - oldVal);
    if (val != oldVal) {
      //expanding
      if (val > oldVal) {
        for (let indexY = 0; indexY < changeAmount; indexY++) {
          const i: any[] = [];
          for (let indexX = 0; indexX < this.sizeX; indexX++) {
            i.push(null); //push the default box into this
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

  public stepOnce() {
    this.stepBoard();
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

  public toggleRunning() {
    this.running = !this.running;
    requestAnimationFrame(this.evolve);
  }

  public evolve(now: number) {
    const { lastEvolveTime } = this;

    if (
      this.running && !this.isDrawing &&
      (!lastEvolveTime || now - lastEvolveTime >= 500 / this.boardSpeed)
    ) {
      this.lastEvolveTime = now;
      this.stepBoard();
    }

    if (this.running) {
      requestAnimationFrame(this.evolve);
    }
  }

  @Watch("map", { deep: true })
  mapChanged() {
    const {
      ctx,
      heightDim,
      widthDim,
      sizeX,
      sizeY,
      map,
      size,
      mapHistory,
    } = this;
    ctx!.clearRect(0, 0, widthDim, heightDim);
    ctx!.fillStyle = "black";
    ctx!.fillRect(0, 0, widthDim, heightDim);
    ctx!.clearRect(
      this.borderWidth,
      this.borderWidth,
      widthDim - this.borderWidth * 2,
      heightDim - this.borderWidth * 2
    );

    //trail cells
    if (mapHistory.length > 0) {
      const lastMap = mapHistory[mapHistory.length - 1];
      for (let row = 0; row < sizeY; row++) {
        const gridRow = lastMap[row];
        for (let cell = 0; cell < sizeX; cell++) {
          if (gridRow[cell]) {
            ctx!.fillStyle = "rgb(150, 150, 150)";
            ctx!.fillRect(
              cell * size + this.borderWidth,
              row * size + this.borderWidth,
              size,
              size
            );
          }
        }
      }
    }

    //active cells
    for (let row = 0; row < sizeY; row++) {
      const gridRow = map[row];
      for (let cell = 0; cell < sizeX; cell++) {
        if (gridRow[cell]) {
          ctx!.fillStyle = "rgb(255, 255, 255)";
          ctx!.fillRect(
            cell * size + this.borderWidth,
            row * size + this.borderWidth,
            size,
            size
          );
        }
      }
    }
  }

  public setupBoard(heightPar: number, widthPar: number): Array<any[]> {
    const map2: Array<any[]> = [];
    for (let indexY = 0; indexY < heightPar; indexY++) {
      const newRow = [];
      for (let indexX = 0; indexX < widthPar; indexX++) {
        const flip = Math.floor(Math.random() * 2);
        newRow.push(flip == 1);
      }
      map2.push(newRow);
    }

    return map2;
  }

  public stepBoard() {
    const { mapHistory, map } = this;
    if (this.autoRandomiseOnMatch) {
      if (!this.matched) {
        for (let index = 0; index < mapHistory.length; index++) {
          const currentMap = mapHistory[index];
          if (JSON.stringify(currentMap) == JSON.stringify(map)) {
            this.matched = true;
          }
        }
        this.mapHistory.push(this.map);
      } else if (this.currentPostMatchedFrames < this.postMatchedFrames) {
        this.currentPostMatchedFrames += 1;
      } else {
        this.mapHistory = [];
        this.map = this.setupBoard(this.sizeY, this.sizeX);
        this.matched = false;
        this.currentPostMatchedFrames = 0;
        this.frame = 0;
      }
    } else {
      this.mapHistory = [];
      this.matched = false;
    }

    //Keep mapHistory limited to 500 as it starts causing lag
    if(this.mapHistory.length >= 500)
    {
      this.mapHistory.shift();
    }

    const map2: Array<any[]> = [];
    for (let indexY = 0; indexY < map.length; indexY++) {
      const row = map[indexY];
      const newRow = [];
      for (let indexX = 0; indexX < row.length; indexX++) {
        const cell = row[indexX];
        const alive = this.getNumberOfAliveFromXandY(indexY, indexX);
        if (cell && (alive == 2 || alive == 3)) {
          newRow.push(true);
        } else if (cell == false && alive == 3) {
          newRow.push(true);
        } else {
          newRow.push(false);
        }
      }
      map2.push(newRow);
    }

    this.map = map2;

    this.frame++;
  }

  // public getPositionFromXandY(y: number, x: number) {
  //   let count = y * this.sizeX;
  //   count += x;
  //   return count;
  // }
  // public getPositionFromCount(count: number): [number, number] {
  //   const x = count % this.sizeX;
  //   const y = Math.trunc(count / this.sizeX);
  //   return [y, x];
  // }
  public getNumberOfAliveFromXandY(y: number, x: number): number {
    const { sizeX, sizeY } = this;

    let alive = 0;
    for (const xModifier of [-1, 0, 1]) {
      for (const yModifier of [-1, 0, 1]) {
        let xModified = x + xModifier;
        let yModified = y + yModifier;

        if (xModified < 0) {
          xModified += sizeX;
        } else if (xModified == sizeX) {
          xModified -= sizeX;
        }
        if (yModified < 0) {
          yModified += sizeY;
        } else if (yModified == sizeY) {
          yModified -= sizeY;
        }

        if (
          !(xModified == x && yModified == y) &&
          this.map[yModified][xModified]
        ) {
          alive += 1;
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
  content: "\f051";
  font-family: FontAwesome;
  padding-left: 10px;
}
.btn.play:after {
  content: "\f04b";
  font-family: FontAwesome;
  padding-left: 10px;
}
.btn.pause:after {
  content: "\f04c";
  font-family: FontAwesome;
  padding-left: 10px;
}
</style>
