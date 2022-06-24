<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 card bg-dark text-white">
        <h2>Game of Life</h2>
        <p class="text-left">Game of life was my dissertation project in university, the project helped me get to grips with architecting a solution. 
          There are a few different problems that need to be tackled and it’s a fun puzzle. 
          Although I did have to code the original in Java which made it less fun. 
          This is not really the type of thing Vue is made for but when I originally picked up Vue this gave me a good way to learn the basics in a fun way. </p>
        <p class="text-left">You can change the speed of the generation, draw live cells onto the board. </p>
      </div>
    </div>
    <GoLBoard />
  </div>
</template>

<script lang="ts">
import GoLBoard from "@/components/GoL/GoLBoard.vue";

export default {
  name: "GoL",
  components: {
    GoLBoard,
  },
  props: {
    msg: String,
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
