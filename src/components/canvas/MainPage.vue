<template>
  <div id="canvas-box" @mousemove="moveMouseTag">
    <btn-list id="btn-list" ref="btn_list"></btn-list>
    <vis-container id="vis-canvas" ref="vis_canvas"></vis-container>
    <EditSwitch></EditSwitch>
    <EditHost></EditHost>
    <div
      v-if="checkTag"
      :style="{ left: mouseTag.x - 45 + 'px', top: mouseTag.y - 50 + 'px' }"
      class="mouse-tag"
    >
      <v-icon color="black" :icon="mouseTagIcon"></v-icon>
    </div>
  </div>
</template>

<script>
import BtnList from "@/components/canvas/BtnList.vue";
import VisContainer from "../canvas/vis/VisContainer.vue";
import EditHost from "../edit/EditHost.vue";
import EditSwitch from "../edit/EditSwitch.vue";

export default {
  name: "MainPage",
  components: {
    BtnList,
    VisContainer,
    EditHost,
    EditSwitch,
  },
  data() {
    return {
      curBtnType: "",
      mouseTag: {
        x: 0,
        y: 0,
      },
      isMounted: false,
    };
  },
  computed: {
    checkTag() {
      if (!this.isMounted) return;
      let types = ["host", "switch", "edge", "delete"];
      for (let type of types) {
        if (this.$refs.btn_list.$refs[type].isActive) {
          return true;
        }
      }
      return false;
    },
    mouseTagIcon() {
      let icon = {
        host: "mdi-laptop",
        switch: "mdi-switch",
        delete: "mdi-delete-outline",
      };
      return icon[this.curBtnType];
    },
    checkTagMouse() {
      return this.checkTag();
    },
  },
  mounted() {
    this.init();
    this.isMounted = true;
  },
  methods: {
    init() {
      this.eventBus.on("deleteNode", () => {
        this.$refs.vis_canvas.stopEditMode();
        this.curBtnType = "delete";
        this.$refs.vis_canvas.net.on("click", (e) => {
          if (e.nodes.length != 0 || e.edges.length != 0) {
            this.doBtn("delete");
            this.$refs.vis_canvas.net.off("click");
          }
        });
      });
      this.eventBus.on("addHost", () => {
        this.curBtnType = "host";
        this.doBtn("host");
      });
      this.eventBus.on("addSwitch", () => {
        this.curBtnType = "switch";
        this.doBtn("switch");
      });
      this.eventBus.on("addEdge", () => {
        this.curBtnType = "edge";
        this.doBtn("edge");
      });
    },

    doBtn(type) {
      let Node = this.$refs.btn_list.$refs[type];
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
          case "delete":
            this.$refs.vis_canvas.deleteNode();
            break;
        }
      } else {
        this.$refs.vis_canvas.stopEditMode();
      }
    },
    moveMouseTag({ clientX: x, clientY: y }) {
      this.mouseTag.x = x;
      this.mouseTag.y = y + 10;
    },
  },
};
</script>

<style scoped>
.mouse-tag {
  position: fixed;
  margin: 1em;
}
#vis-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
#canvas-box {
  /* margin-left: 100px; */
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: #eeeeee88;
  width: 800px;
  height: 650px;
}
</style>
