<template>
  <!-- <Canvas @ready="clickBtn"></Canvas>
  <v-btn id="btn">Click</v-btn> -->
  <!-- <edit-host></edit-host> -->
  <main-page></main-page>
</template>

<script>
import MainPage from "./components/canvas/MainPage.vue";
// import EditHost from "./components/edit/EditHost.vue";
export default {
  name: "App",
  components: {
    MainPage,
    // EditHost,
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 30px;
}
</style>
