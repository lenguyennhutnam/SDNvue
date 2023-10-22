<template>
  <div id="canvas-box">
    <btn-list ref="btnList" />
<<<<<<< HEAD
    <vis-container id="vis-canvas" ref="vis_canvas"></vis-container>
=======
    <canvas-box id="canvas" ref="canvas" @ready="init"></canvas-box>
>>>>>>> 033623aadcef512133c5a632393a71f014da8ae2
  </div>
</template>

<script>
<<<<<<< HEAD
import BtnList from "@/components/canvas/BtnList.vue";
import VisContainer from "../vis/VisContainer.vue";
=======
import CanvasBox from "@/components/canvas/CanvasBox.vue";
import BtnList from "@/components/canvas/BtnList.vue";
>>>>>>> 033623aadcef512133c5a632393a71f014da8ae2

export default {
  name: "MainPage",
  components: {
<<<<<<< HEAD
    BtnList,
    VisContainer,
=======
    CanvasBox,
    BtnList,
>>>>>>> 033623aadcef512133c5a632393a71f014da8ae2
  },
  data() {
    return {
      canvasBox: null,
    };
  },
  mounted() {
    this.init();
<<<<<<< HEAD
=======
    this.canvas = this.$refs.canvas;
    this.network = this.canvas.network;
>>>>>>> 033623aadcef512133c5a632393a71f014da8ae2
  },
  methods: {
    init() {
      this.eventBus.on("addHost", () => {
<<<<<<< HEAD
        this.addItem("Host");
      });
      this.eventBus.on("addSwitch", () => {
        this.$refs.vis_canvas.addSwitch();
      });
      this.eventBus.on("addEdge", this.addEdge);
      // this.$refs.vis_canvas.on("click", () => {
      //   console.log("upne");
      // });
    },
    addItem(nodeType) {
=======
        this.canvas.adding = "Host";
        this.canvas.network.once("click", this.addItem);
      });
      this.eventBus.on("addSwitch", () => {
        this.canvas.adding = "Switch";
        this.canvas.network.once("click", this.addItem);
      });
      this.eventBus.on("addEdge", this.addEdge);
    },
    addItem(e) {
      let clickX = e.pointer.canvas.x;
      let clickY = e.pointer.canvas.y;
>>>>>>> 033623aadcef512133c5a632393a71f014da8ae2
      let idToRef = {
        Host: this.$refs.btnList.$refs.host,
        Switch: this.$refs.btnList.$refs.switch,
      };
<<<<<<< HEAD
      if (idToRef[nodeType].isActive) {
        this.$refs.vis_canvas.addHost();
      } else {
        this.$refs.vis_canvas.stopEditMode();
=======
      let nodeType = this.$refs.canvas.adding;
      if (idToRef[nodeType].isActive) {
        // Define new node
        let newnode = {
          id: this.$refs.canvas.nodes.length + 1,
          label: `${nodeType} ` + `${++this.$refs.canvas.itemList[nodeType]}`,
          group: nodeType,
          x: clickX,
          y: clickY,
        };

        // Off clicked button
        idToRef[nodeType].isActive = false;

        // Add node to $refs.canvas
        this.$refs.canvas.nodes.add(newnode);
>>>>>>> 033623aadcef512133c5a632393a71f014da8ae2
      }
    },

    addEdge() {
<<<<<<< HEAD
      let Edge = this.$refs.btnList.$refs.edge;
      if (Edge.isActive) {
        this.$refs.vis_canvas.addEdge();
      } else {
        this.$refs.vis_canvas.stopEditMode();
      }
=======
      this.network.addEdgeMode();
      // let options = this.canvas.options;
      // console.log(options);
      // options.physics.enabled = !options.physics.enabled;
      // this.canvas.network.setOptions(options);
      console.log(this.eventBus);

      // newNet.addEdgeMode();
      // this.options.physics.enabled = true;

      // this.network.setOptions(this.options);
      // this.network.manipulation.guiEnabled =
      //   !this.network.manipulation.guiEnabled;
      // this.network = new this.vis.Network(
      //   this.container,
      //   this.data,
      //   this.options
      // );
      // this.network.main = "sdsd";
      // net.addEdgeMode();
>>>>>>> 033623aadcef512133c5a632393a71f014da8ae2
    },
  },
};

// import MainPage from "./MainPage.vue";

// var network = vas.network;
</script>

<style>
<<<<<<< HEAD
#vis-canvas {
  display: block;
  width: 500px;
=======
#canvas {
  display: block;
  width: 1000px;
>>>>>>> 033623aadcef512133c5a632393a71f014da8ae2
  height: 600px;
  background-color: #ccc;
}
#canvas-box {
  display: flex;
  flex-direction: row;
}
</style>
