<template>
  <div id="canvas-box">
    <btn-list ref="btnList" />
    <vis-container id="vis-canvas" ref="vis_canvas"></vis-container>
  </div>
</template>

<script>
import BtnList from "@/components/canvas/BtnList.vue";
import VisContainer from "../vis/VisContainer.vue";

export default {
  name: "MainPage",
  components: {
    BtnList,
    VisContainer,
  },
  data() {
    return {
      canvasBox: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.eventBus.on("addHost", () => {
        // let canvas = this.$refs.vis_canvas;
        // canvas.addHost();
        this.addNode("host");
      });
      this.eventBus.on("addSwitch", () => {
        this.addNode("switch");
      });
      this.eventBus.on("addEdge", () => {
        this.addNode("edge");
      });
    },

    addNode(type) {
      let Node = this.$refs.btnList.$refs[type];
      if (Node.isActive) {
        switch (type) {
          case "host":
            this.$refs.vis_canvas.addHost();
            break;
          case "switch":
            this.$refs.vis_canvas.addSwitch();
            break;
          case "edge":
            this.$refs.vis_canvas.addEdge();
            break;
        }
      } else {
        this.$refs.vis_canvas.stopEditMode();
      }
    },
  },
};
</script>

<style>
#vis-canvas {
  display: block;
  width: 700px;
  height: 600px;
}
#canvas-box {
  display: flex;
  flex-direction: row;
}
</style>
