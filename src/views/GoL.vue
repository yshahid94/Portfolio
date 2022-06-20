<template>
  <div class="container">
    
    <GoLBoard />
  </div>
</template>

<script>
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
