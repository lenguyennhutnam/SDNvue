<template>
  <div id="canvas-box">
    <!-- <btn-list ref="btnList" /> -->
    <div id="canvas" ref="canvas"></div>
  </div>
</template>

<script>
// import BtnList from "./BtnList.vue";
import { option } from "@/components/canvas/builder/option";

export default {
  components: {},
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Canvas",
  data() {
    return {};
  },
  mounted() {
    // const container = this.$refs.canvas;

    // // Create and fill datasets
    // const nodes = this.nodes;
    // const edges = this.edges;
    // const net = this.network;
    this.init();
    // this.$emit("ready", { container, net, nodes, edges });
  },

  // =================================================================

  methods: {
    init() {
      this.nodes = new this.vis.DataSet([
        { id: 1, label: "Host 1", group: "Host" },
        { id: 2, label: "Switch 1", group: "Switch" },
        { id: 3, label: "Host 2", group: "Host" },
      ]);

      this.container = document.getElementById("canvas");

      this.edges = new this.vis.DataSet([
        { from: 1, to: 2 },
        { from: 2, to: 3 },
      ]);

      this.data = {
        nodes: this.nodes,
        edges: this.edges,
      };

      this.options = option;

      this.network = new this.vis.Network(
        this.container,
        this.data,
        this.options
      );
      // =================================================================

      this.network.on("selectNode	", () => {
        console.log("Node");
      });

      this.eventBus.on("addHost", () => {
        this.adding = "Host";
        this.network.once("click", this.addNode);
      });
      this.eventBus.on("addSwitch", () => {
        this.adding = "Switch";
        this.network.once("click", this.addNode);
      });
      this.eventBus.on("addEdge", () => {
        this.adding = "Edge";
        this.network.once("click", this.addEdge);
      });

      this.$emit("ready", {
        data: {
          nodes: this.nodes,
          edges: this.edges,
        },
        options: this.options,
      });
    },

    //================================================================

    // addNode(e) {
    //   let clickX = e.pointer.canvas.x;
    //   let clickY = e.pointer.canvas.y;
    //   let idToRef = {
    //     Host: this.$refs.btnList.$refs.host,
    //     Switch: this.$refs.btnList.$refs.switch,
    //   };
    //   let nodeType = this.adding;
    //   if (idToRef[nodeType].isActive) {
    //     // Define new node
    //     let newnode = {
    //       id: this.nodes.length + 1,
    //       label: `${nodeType} ` + `${++this.itemList[nodeType]}`,
    //       group: nodeType,
    //       x: clickX,
    //       y: clickY,
    //     };

    //     // Off clicked button
    //     idToRef[nodeType].isActive = false;

    //     // Add node to canvas
    //     this.nodes.add(newnode);
    //   }
    // },

    // addEdge() {
    //   // this.network.manipulation.guiEnabled =
    //   //   !this.network.manipulation.guiEnabled;
    //   // this.network = new this.vis.Network(
    //   //   this.container,
    //   //   this.data,
    //   //   this.options
    //   // );
    //   // this.network.main = "sdsd";
    //   console.log(this.edges);
    //   // net.addEdgeMode();
    // },
  },
};
</script>

<style scoped>
#canvas {
  display: block;
  width: 1000px;
  height: 600px;
  background-color: #ccc;
}
#canvas-box {
  display: flex;
  flex-direction: row;
}
</style>
