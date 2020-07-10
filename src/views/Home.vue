<template>
  <div class="about">

    <div class="row">
      <div class="col-md-6">
        <h3>Software developer with 4+ years of professional software development</h3>
        <ul class="content-skills">
          <li v-for="skill in skills" :key="skill"> {{ skill }}
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <!-- <img  src="/port_prof.jpg"> -->
        <div class="profile" ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

export default class Home extends Vue {
  skills: string[] = [
    "C#",
    "MVC",
    "TFS",
    "Webforms",
    "ASP.Net",
    "Javascript",
    "jQuery",
    "CSS",
    "Vue",
    "SQL",
    "Bootstrap"
    ];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-skills li {
    list-style: none;
    flex-grow: 1;
    justify-content: center;
    background-color: black;
    padding: 6px 10px;
    margin: 2px 2px;
    box-shadow: 1px 1px 5px #000;
  }
  .content-skills {
    display: flex;
    flex-wrap: wrap;
  }
  .profile{
    margin: 0 auto;
    width: 150px;
    height: 150px;
    background-image: url(/port_prof.jpg);
    background-size: cover;
    border-radius: 50%;
    box-shadow: 0 0 14px 0 black;
  }

</style>