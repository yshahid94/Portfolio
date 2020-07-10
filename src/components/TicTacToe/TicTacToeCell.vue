<template>
  <div
    class="cell"
    :style="{ width: width + 'px', height: height + 'px' }"
    @click="cellClicked"
  ><span v-if="value !== ''">{{ value }}</span></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({})
export default class TicTacToeCell extends Vue {
  @Prop() height!: number;
  @Prop() width!: number;
  @Prop() value!: string;
  cellClicked() {
    this.$emit("clickEmit");
  }
}
</script>

<style lang="css" scoped>
.cell {
    width: 100px;
    height: 100px;
    border: 2px solid black;
    font-size: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
