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
    // const options = this.options;
    // Create and fill datasets
    const nodes = (this.nodes = new DataSet());
    const edges = (this.edges = new DataSet());
    // this.replaceItems();
    // nodes.add({ id: 2, label: "Node 2" });
    // Create the network
    const net = new Network(container, { nodes, edges }, this.options);
    this.net = net;

    // this.nodes.add({ id: 2, label: "Node 2" });
    // this.cleanUpCallbacks.push(() => {
    //   net.destroy();
    // });

    // // Therefore this can't be done before the topology is built.

    // this.cleanUpCallbacks.push(
    //   this.$store.subscribe(({ type, payload }, { data }) => {
    //     (this.storeActions[type] || (() => {}))(payload, data);
    //   })
    // );

    this.$emit("ready", { container, net, nodes, edges });
  },
  methods: {
    // replaceItems() {
    //   // Preprocess items
    //   const items = Object.keys(this.data.items).map((id) => {
    //     const node = JSON.parse(JSON.stringify(this.data.items[id]));
    //     node.id = id;
    //     return node;
    //   });
    // },
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
