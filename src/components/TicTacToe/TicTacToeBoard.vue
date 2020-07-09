<template>
  <div>
    <input v-model="height" />
    <input v-model="width" />
    <TicTacToeCell
      v-for="cell in noOfCells"
      :key="cell"
      :height="height"
      :width="width"
      :id="cell"
      @clickEmit="childClicked"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TicTacToeCell from "@/components/TicTacToe/TicTacToeCell.vue";
@Component({
  components: {
    TicTacToeCell
  }
})
export default class TicTacToeBoard extends Vue {
  childClicked(testParam: number) {
    console.log("clicked: " + testParam);
  }
  noOfCells = 9;
  height = 50;
  width = 50;
}
</script>

<style lang="css" scoped></style>
