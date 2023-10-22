// Vis
import vis from "vis-network/dist/vis-network.min.js";
import "vis-network/dist/dist/vis-network.min.css";

// Vuetify
import createVuetify from "./plugin/vuetify";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vue
import { createApp } from "vue";
import App from "./App.vue";

var app = createApp(App);

const vuetify = createVuetify;

// Event bus
import mitt from "mitt";
const eventBus = mitt();

app.config.globalProperties.eventBus = eventBus;
app.config.globalProperties.vis = vis;
app.use(vuetify).mount("#app");
