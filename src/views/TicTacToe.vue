<template>
  <div class="home">
    <TicTacToeBoard />
  </div>
</template>

<script>
import TicTacToeBoard from "@/components/TicTacToeBoard.vue";

export default {
  name: "TicTacToe",
  components: {
    TicTacToeBoard
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
