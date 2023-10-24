<template>
  <div id="canvas-box">
    <btn-list ref="btnList"></btn-list>
    <vis-container id="vis-canvas" ref="vis_canvas"></vis-container>
    <EditHost v-if="false"></EditHost>
  </div>
</template>

<script>
import BtnList from "@/components/canvas/BtnList.vue";
import VisContainer from "../canvas/vis/VisContainer.vue";
import EditHost from "../edit/EditHost.vue";

export default {
  name: "MainPage",
  components: {
    BtnList,
    VisContainer,
    EditHost,
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
      const deleteCallback = () => {
        this.$refs.vis_canvas.stopEditMode();
        this.$refs.vis_canvas.net.on("click", () => {
          this.doBtn("delete");
        });
      };
      this.eventBus.on("deleteNode", deleteCallback);
      this.eventBus.on("addHost", () => {
        this.doBtn("host");
      });
      this.eventBus.on("addSwitch", () => {
        this.doBtn("switch");
      });
      this.eventBus.on("addEdge", () => {
        this.doBtn("edge");
      });
    },

    doBtn(type) {
      let Node = this.$refs.btnList.$refs[type];
      if (Node.isActive) {
        switch (type) {
          case "host":
            this.$refs.vis_canvas.net.off("click", this.deleteCallback);
            this.$refs.vis_canvas.addHost();
            break;
          case "switch":
            this.$refs.vis_canvas.net.off("click", this.deleteCallback);
            this.$refs.vis_canvas.addSwitch();
            break;
          case "edge":
            this.$refs.vis_canvas.net.off("click", this.deleteCallback);
            this.$refs.vis_canvas.addEdge();
            break;
          case "delete":
            this.$refs.vis_canvas.deleteNode();
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
  width: 100%;
  height: 100%;
}
#canvas-box {
  display: flex;
  flex-direction: row;
  background-color: #ccc;
  width: 800px;
  height: 650px;
}
</style>
