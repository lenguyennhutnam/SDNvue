<template>
  <VisCanvas class="viscanvas" @ready="init" ref="rootVis"></VisCanvas>
</template>

<script>
import VisCanvas from "./VisCanvas.vue";
import { option } from "@/components/canvas/builder/option";

export default {
  name: "VisContainer",
  components: { VisCanvas },
  data: () => ({
    newItem: {
      type: "",
      connectTo: null,
      label: null,
      noEdit: false,
      set(type, connectTo, label, noEdit) {
        this.type = type || null;
        this.connectTo = connectTo || null;
        this.label = label || null;
        this.noEdit = noEdit || false;
      },
    },
    nodeList: {
      Host: [],
      Switch: [],
    },
    edgeList: [],
    mouseTag: {
      x: 0,
      y: 0,
    },
  }),
  computed: {
    mouseTagIcon() {
      let icon = {
        Host: "mdi-laptop",
        Switch: "mdi-switch",
        Delete: "mdi-delete-outline",
      };
      let type = this.newItem.type;
      return icon[type];
    },
  },
  mounted() {
    // this.focusRoot();
  },
  methods: {
    moveMouseTag({ offsetX: x, offsetY: y }) {
      this.mouseTag.x = x;
      this.mouseTag.y = y;
    },
    addEdge() {
      this.newItem.set("Edge");
      this.net.addEdgeMode();
    },
    addHost() {
      this.newItem.set("Host");
      this.net.addNodeMode();
    },
    addSwitch() {
      this.newItem.set("Switch");
      this.net.addNodeMode();
    },
    deleteNode() {
      // this.newItem.set("Delete");
      this.net.deleteSelected();
    },
    stopEditMode() {
      this.newItem.set();
      this.net.disableEditMode();
    },

    nextLabel(type) {
      let typeList = this.nodeList[type];
      return `${type} ${typeList.length + 1}`;
    },

    init({ net, nodes, edges }) {
      this.net = net;
      this.nodes = nodes;
      this.edges = edges;
      this.net.setOptions(option);
      this.net.setOptions({
        width: "100%",
        manipulation: {
          enabled: false,
          addNode: (node, callback) => {
            let type = this.newItem.type;
            this.eventBus.emit("add" + type + "Dialog", this.nextLabel(type));
            if (type == "Host") {
              this.eventBus.on("newHostSuccess", (data) => {
                node.label = data.name;
                node.group = data.type;
                this.nodeList[data.type].push(node);
                this.newItem.set();
                callback(node);
                this.eventBus.off("newHostSuccess");
              });
              this.eventBus.on("canceled", () => {
                callback();
                this.eventBus.off("newHostSuccess");
              });
            } else if (type == "Switch") {
              this.eventBus.on("newSwitchSuccess", (data) => {
                node.label = data.name;
                node.group = data.type;
                this.nodeList[data.type].push(node);
                this.newItem.set();
                callback(node);
                this.eventBus.off("newSwitchSuccess");
              });
              this.eventBus.on("canceled", () => {
                callback();
                this.eventBus.off("newSwitchSuccess");
              });
            } else {
              console.log(type);
              node.label = this.nextLabel(type);
              node.group = type;
              this.nodeList[type].push(node);
              this.newItem.set();
              callback(node);
            }
            this.eventBus.emit("offBtn");
          },
          addEdge: (edge, callback) => {
            callback(edge);
            this.edgeList.push(edge);
            this.newItem.set();
            this.eventBus.emit("offBtn");
          },
          deleteNode: (data, callback) => {
            callback(data);
            this.newItem.set();
            this.eventBus.emit("offBtn");
          },
          deleteEdge: (data, callback) => {
            callback(data);
            this.newItem.set();
            this.eventBus.emit("offBtn");
          },
        },
      });

      // TEST =================================================================
      this.nodes.add([
        { id: 1, label: "Host 1", group: "Host", x: -100, y: 100 },
        { id: 2, label: "Switch 1", group: "Switch", x: 0, y: -100 },
        { id: 3, label: "Host 2", group: "Host", x: 100, y: 100 },
      ]);
      this.nodeList["Host"].push(
        { id: 1, label: "Host 1", group: "Host" },
        { id: 3, label: "Host 2", group: "Host" }
      );
      this.nodeList["Switch"].push({
        id: 2,
        label: "Switch 1",
        group: "Switch",
      });
      this.edges.add([
        { from: 1, to: 2 },
        { from: 2, to: 3 },
      ]);
      this.edgeList.push({ from: 1, to: 2 }, { from: 2, to: 3 });
      // =================================================================
    },
  },
};
</script>

<style scoped>
.viscanvas {
  height: inherit;
}

.component-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.mouse-tag {
  position: fixed;
  margin: 1em;
}
</style>

<style>
.component-container {
  width: inherit;
  height: 1000px;
  outline: none;
}
.component-container * {
  outline: none;
}
</style>
