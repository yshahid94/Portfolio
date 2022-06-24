<template>
  <div class="container">
    <div class="row">
      <div class="offset-lg-3 col-lg-6 offset-md-2 col-md-8 col-sm-12 card bg-dark text-white">
        <h2>Tic Tac Toe</h2>
        <p class="text-left">That's it, it's just tic tac toe... </p>
      </div>
    </div>
    <div class="row">
      <div class="offset-lg-3 col-lg-6 offset-md-2 col-md-8 col-sm-12 card bg-dark text-white">
        <TicTacToeBoard />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TicTacToeBoard from "@/components/TicTacToe/TicTacToeBoard.vue";
import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {
    TicTacToeBoard
  }
})
export default class Home extends Vue {
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
