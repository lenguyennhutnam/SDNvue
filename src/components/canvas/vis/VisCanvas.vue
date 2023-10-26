<template>
  <div ref="container" class="vis-container">
    <div ref="vis" class="vis-root"></div>
  </div>
</template>

<script>
import { DataSet } from "vis-data/peer";
import { Network } from "vis-network/peer";
import "vis-network/styles/vis-network.css";

export default {
  name: "VisCanvas",
  data: () => ({
    cleanUpCallbacks: [],
  }),

  mounted() {
    const container = this.$refs.vis;
    const nodes = (this.nodes = new DataSet());
    const edges = (this.edges = new DataSet());
    const net = new Network(container, { nodes, edges }, this.options);
    this.net = net;

    this.$emit("ready", { container, net, nodes, edges });
  },
  methods: {
    isEdge(type) {
      return type === "link" || type === "association";
    },
  },
};
</script>

<style>
.vis-root {
  width: inherit;
  height: inherit;
}
/* .vis-container {
  position: relative;
  width: 100%;
  height: 100%;
} */
/* .vis-container > * {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
} */
</style>
