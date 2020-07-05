<template>
  <div
    class="cell"
    v-bind:style="{
      backgroundColor: color,
      height: height + 'px',
      width: width + 'px'
    }"
  >
    {{ this.name }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GoLCell extends Vue {
  @Prop() private type!: string;
  @Prop() private color!: string;
  @Prop() private name!: string;
  @Prop() private selected!: boolean;
  @Prop() private height!: number;
  @Prop() private width!: number;
  public static createCell(type: string, color: string, name: string): GoLCell {
    const cell = new GoLCell();
    cell.type = type;
    cell.color = color;
    cell.name = name;

    return cell;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
