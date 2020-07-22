<template>
  <div class="container">
    <div class="intro">
      <div class="row">
        <div class="col-md-6">
          <div class="profile-pic"></div>
          <!-- <div class="profile-tag">Yassin Shahid</div> -->
          <div class="" style="text-align:left;">
            <h4>About me</h4>
            My name is Yassin, I'm a 26 year old dev with a computer science degree from MMU
            I currently live in Old Trafford, Manchester.
            I love gaining knowledge that I can use to solve problems, which has lead me down the
            path of becoming a developer.
            If I'm not infront of the screen you'll find me hiking and biking.
            I took an extended break to do some travelling but my plans were halted with the events of Covid.
            I am currently looking for a full stack job that will allow me to experience new technologies,
            and expose me to new ways of thinking.
          </div>
        </div>
        <div class="col-md-6">
          <h4>Software developer with 4+ years of professional software development</h4>
          <ul class="content-skills">
            <li v-for="skill in skills" :key="skill"> {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
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
    background-color: rgb(32, 32, 32);
    padding: 6px 10px;
    margin: 2px 2px;
    box-shadow: 1px 1px 5px #000;
  }
  .content-skills {
    display: flex;
    flex-wrap: wrap;
  }
  .profile-tag {
    justify-content: center;
    background-color: rgb(32, 32, 32);
    padding: 6px 10px;
    margin: 10px auto;
    box-shadow: 1px 1px 5px #000;
  }
  .profile-pic{
    margin: 2em auto;
    width: 150px;
    height: 150px;
    background-image: url(~@/assets/port_prof.jpg);
    background-size: cover;
    border-radius: 50%;
    box-shadow: 0 0 14px 0 black;
  }
  .intro .col-md-6{
    margin: 5em 0;
  }

</style>