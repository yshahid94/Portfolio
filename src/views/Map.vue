<template>
  <div id="map" class="map">
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
// @ is an alias to /src
import "leaflet/dist/leaflet.css";
import L from "leaflet";



export default class Map extends Vue {
    map: L.Map | null = null;
    mounted() {
      this.map = L.map("map").setView([51.959, -8.623], 12);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      console.log(this.map);
    }

    beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #map {
        padding:50px;
        width: 100vw;
        height: 100vh;
    }
</style>
