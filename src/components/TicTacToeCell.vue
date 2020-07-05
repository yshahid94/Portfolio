<template>
  <div
    class="cell"
    :style="{ width: width + 'px', height: height + 'px' }"
    @click="cellClicked"
  ></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({})
export default class TicTacToeCell extends Vue {
  @Prop() height!: number;
  @Prop() width!: number;
  @Prop() id!: number;
  cellClicked() {
    this.$emit("clickEmit", this.id);
  }
}
</script>

<style lang="css" scoped>
.cell {
  border: 2px solid black;
}
</style>
