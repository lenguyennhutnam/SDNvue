<template>
  <div class="canvasbox">
    <!-- <button-list ref="btnList" /> -->
    <div id="canvas" ref="net"></div>
  </div>
</template>

<script>
// import ButtonList from "./BtnList.vue";
import { option } from "@/components/canvas/builder/option";

export default {
  components: {},
  name: "CanvasBox",
  data() {
    return {
      data: null,
      nodes: null,
      edges: null,
      container: null,
      network: null,
      adding: null,
      itemList: {
        Host: 0,
        Switch: 0,
      },
    };
  },
  mounted() {
    this.init();
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

      // this.options.physics.enabled = true;

      // this.network.setOptions(this.options);

      // =================================================================

      // this.addHost = () => {};
      // this.addSwitch = () => {};
      // this.addEdge = () => {};

      // this.eventBus.on("addHost", this.addHost);
      // this.eventBus.on("addSwitch", this.addSwitch);
      // this.eventBus.on("addEdge", this.addEdge);
    },
    // addItem(e) {
    //   let clickX = e.pointer.canvas.x;
    //   let clickY = e.pointer.canvas.y;
    //   let idToRef = {
    //     Host: this.$refs.btnList.$refs.host,
    //     Switch: this.$refs.btnList.$refs.switch,
    //     Edge: this.$refs.btnList.$refs.edge,
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
</style>
ButtonList
