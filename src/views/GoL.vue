<template>
  <div class="home">
    <GoLBoard sizeX="50" sizeY="50" />
  </div>
</template>

<script>
import GoLBoard from "@/components/GoLBoard.vue";

export default {
  name: "GoL",
  components: {
    GoLBoard
  },
  props: {
    msg: String
  },
  methods: {
    test() {
      return "hi";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
