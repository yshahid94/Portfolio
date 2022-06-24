<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 card bg-dark text-white">
        <h2>Advanced Game of Life</h2>
        <p class="text-left">I wanted to take the concept of game of life and expand on it with cells having their own behaviours and give them the ability to evolve etc.
          I tried a couple different methods to display the board including rendering each cell as a div and rendering each cell via a svg path but in the end the best way was to use a canvas.
          I also had to figure out how the cells would do path finding and I came across a method called A* search algorithm which is what I implemented here.
          There is a lot I still want to do on this, but for now they eat the random food as it spawns. With each of the cells having different properties, such as speed, view distance, pathing ability.</p>
      </div>
    </div>
    <AdvGoLBoard sizeX=50 sizeY=50 />
  </div>
</template>

<script lang="ts">
import AdvGoLBoard from "@/components/AdvGoL/AdvGoLBoard.vue";

export default {
  name: "AdvGoL",
  components: {
    AdvGoLBoard
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
