<template>
  <div id="app" :class="[currentPage() == '/' ? '' : 'scrolled']">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="profile-pic"></div>
        <a class="navbar-brand" href="#">Yassin Shahid</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li :class="[currentPage() == '/' ? 'active': '', 'nav-item']">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li :class="['nav-item dropdown']">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Little Projects
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/projects/gol">GoL</router-link>
                <router-link class="dropdown-item" to="/projects/ttt">TTT</router-link>
                <router-link class="dropdown-item" to="/projects/advgol">AdvGoL</router-link>
              </div>
            </li>
          </ul>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <a class="nav-link" href="./Yassin Shahid CV.pdf">CV</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.linkedin.com/in/yassin-shahid-465298105/"><i class="fab fa-linkedin"></i></a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class App extends Vue {
  currentPage() {
        return this.$route.path;
    }

}
</script>

<style>
body {
    background-color: #24252A;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e2e2e2;
}

#nav {
  padding: 30px;
}

.scrolled .container {
  padding-top: 60px;
}

.scrolled nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  transition: 1s;
}

.scrolled nav .profile-pic{
  opacity: 1;
  margin: 0px 2em 0px 0px;
  transition: 0.6s;
}

nav .profile-pic {
  margin: 0px 0em 0px 0px;
  width: 50px;
  height: 50px;
  background-image: url(~@/assets/port_prof.jpg);
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 0 14px 0 black;
  opacity: 0;
  transition: 0.6s;
}

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
  padding: 0px 30px;
}
/* 
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
