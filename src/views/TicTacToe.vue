<template>
  <div class="home">
    <TicTacToeBoard />
  </div>
</template>

<!--<script>
import TicTacToeBoard from "@/components/TicTacToe/TicTacToeBoard.vue";

export default {
  name: "TicTacToe",
  components: {
    TicTacToeBoard
  }
};
</script> -->


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
