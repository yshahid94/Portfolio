<template>
  <div>
    <div class="container-fluid" >
      <div class="intro container">
        <div class="row">
          <div class="col-md-6">
            <div class="profile-pic"></div>
            <!-- <div class="profile-tag">Yassin Shahid</div> -->
            <div class="about">
              <h4>About me</h4>
              My name is Yassin, I'm a {{ age }} year old dev with a computer science degree from MMU.
              I currently live in Old Trafford, Manchester.
              I love gaining knowledge that I can use to solve problems, which has lead me down the
              path of becoming a developer.
              If I'm not infront of the screen you'll find me hiking and biking.
              I took an extended break to do some travelling but my plans were halted with the events of Covid.
              My previous job took me back in and I've been with them since.
              I am currently looking for a full stack job that will allow me to experience new technologies,
              and expose me to new ways of thinking.
            </div>
          </div>
          <div class="col-md-6">
            <h4>Software developer with 5+ years of professional software development experience</h4>
            <ul class="content-skills">
              <li v-for="skill in skills" :key="skill"> {{ skill }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="Experiences" class="section">
        <div class="title row">
          <div class="col-md-12">
            <h2>Experience</h2>
          </div>
        </div>
        <div class="body row">
          <div class="col-md-12">
            <Timeline />
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>
        <p>
          Contact Me:<br />
          yshahid94@gmail.com<br />
          07402628322
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Timeline from "@/components/Timeline.vue";
import moment from "moment";
@Component({
  components: {
    Timeline
  }
})
export default class Home extends Vue {

  dateOfBirth: moment.Moment = moment([1994, 5, 3]);
  age: number = moment().diff(this.dateOfBirth, 'years');

  skills: string[] = [
    "C#",
    "SQL",
    "Vue",
    "MVC",
    "TFS",
    "Webforms",
    "ASP.Net",
    "Javascript",
    "jQuery",
    "CSS",
    "Bootstrap"
  ];
  mounted() {
    window.addEventListener("scroll", this.scrollHandler)
  }

  scrollHandler = function () {
    const app = document.querySelector("#app")!;
    if (window.pageYOffset >= 20) {
      app.classList.add("scrolled")
    } else {
      app.classList.remove("scrolled");
    }

    const elementTarget = document.getElementById("Experiences")!;
    if (window.scrollY > (elementTarget.offsetTop)) {
      elementTarget.classList.add("active")
    } else {
      elementTarget.classList.remove("active");
    }
  }

  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (min-width: 2000px) {
  .container {
    max-width: 1920px;
  }
}

.container-fluid {
  position: relative;
  z-index: 2;
  margin-bottom: 100px;
  background-color:#24252a;
}

.intro .col-md-6 {
  margin: auto 0;
  padding: 3em 0;
}
.profile-tag {
  justify-content: center;
  background-color: rgb(32, 32, 32);
  padding: 6px 10px;
  margin: 10px auto;
  box-shadow: 1px 1px 5px #000;
}

.scrolled .profile-pic {
  opacity: 0;
  transition: 0.6s;
}

.profile-pic {
  opacity: 1;
  margin: 2em auto;
  width: 150px;
  height: 150px;
  background-image: url(~@/assets/port_prof.jpg);
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 0 14px 0 black;
  transition: 0.6s;
}

.about {
  text-align:left;
}

.section .title {
  background-color: rgb(52, 58, 64);
}
.section .body {
  background-color:#181a1b;
  box-shadow: inset 0 0 10px #000000;
}
/* Adding for animation */
.section .title h2 {
  margin: 0.5em;
  transition: 1s;
}
/* Handling section title on section scroll */
.active.section .title h2 {
  margin: 0.25em;
  transition: 1s;
}
.active.section .title {
  position: fixed;
  top: 60px;
  right: 0;
  left: 0;
  z-index: 1031;
  opacity: 0.8;
  transition: 1s;
}

.footer {
  position: fixed;
  bottom: 0;
  z-index:1;
  width: 100%;
}
</style>