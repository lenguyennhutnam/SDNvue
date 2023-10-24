<template>
  <div
    class="component-container"
    @mousemove="moveMouseTag"
    @drag="moveMouseTag"
  >
    <div
      v-if="this.newItem.type != ''"
      :style="{ left: mouseTag.x + 20 + 'px', top: mouseTag.y + 5 + 'px' }"
      class="mouse-tag"
    >
      <v-icon color="black" :icon="mouseTagIcon"></v-icon>
    </div>
    <VisCanvas class="viscanvas" @ready="init" ref="rootVis"></VisCanvas>
  </div>
</template>

<script>
import VisCanvas from "./VisCanvas.vue";
import { option } from "@/components/canvas/builder/option";
const nodePriorities = ["switch", "host"];

const edgeTests = {
  link: (src, dst) => src === "port" && dst === "port",
  association: (src, dst) =>
    (src === "controller" && dst === "switch") ||
    (src === "switch" && dst === "port") ||
    (src === "host" && dst === "port") ||
    src === "dummy",
};

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
  // computed: {
  //   ...mapGetters("topology", ["data"]),
  //   loading() {
  //     return this.$store.state.loading;
  //   },
  //   mouseTagIcon() {
  //     return "$vuetify.icons.net-" + this.newItem.type;
  //   },
  // },
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
      this.newItem.set();
      console.log(this.newItem);
      this.net.deleteSelected();
    },
    stopEditMode() {
      this.newItem.set();
      this.net.disableEditMode();
    },
    async editItem(node, commit) {
      const oldItem = this.data.items[node.id] || {
        id: node.id,
        type: node.group,
        hostname: node.label,
      };

      const item = await new Promise((resolve) => {
        this.$emit("edit-item", oldItem, resolve);
      });
      // Ensure the root is focused (there were issues with broken keybindings).
      this.focusRoot();

      if (!item) {
        // Node/edge adding mode is not turned off unless a node/edge is placed.
        this.stopEditMode();
        return {};
      }

      if (node.from && node.to) {
        item.from = node.from;
        item.to = node.to;
      }

      if (commit !== false) {
        this.commit("replaceItems", [item]);
      }

      return { node, item };
    },
    commit(type, payload) {
      this.$store.dispatch(`topology/${type}`, payload);
    },
    orderNodes(edge) {
      const src = this.data.items[edge.from].type;
      const dst = this.data.items[edge.to].type;
      if (nodePriorities.indexOf(src) > nodePriorities.indexOf(dst)) {
        const tmp = edge.from;
        edge.from = edge.to;
        edge.to = tmp;
      }
    },
    getEdgeType(edge) {
      const item = this.data.items[edge.id];
      if (item && item.type) {
        return item.type;
      }

      const src = this.data.items[edge.from].type;
      const dst = this.data.items[edge.to].type;
      if (src === "port" && dst === "port") {
        return "link";
      } else {
        return "association";
      }
    },
    isEdgeValid(edge, type) {
      const src = this.data.items[edge.from].type;
      const dst = this.data.items[edge.to].type;
      return edgeTests[type](src, dst);
    },
    focusRoot() {
      this.$refs.rootVis.focus();
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
            this.eventBus.emit("open" + type + "Dialog");
            node.label = this.nextLabel(type);
            node.group = type;
            callback(node);
            this.nodeList[type].push(node);
            this.newItem.set();
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
        { id: 1, label: "Host 1", group: "Host" },
        { id: 2, label: "Switch 1", group: "Switch" },
        { id: 3, label: "Host 2", group: "Host" },
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

      // Save new positions if any missing
      // this.commitUncommitedPositions();
      // Manipulation
      // this.net.setOptions({
      //   groups: {
      //     host: {
      //       size: 25,
      //       shape: "image",
      //       image: Host,
      //     },
      //     switch: {
      //       size: 25,
      //       shape: "image",
      //       image: Switch,
      //     },
      //   },

      //   manipulation: {
      //     // enabled: false,
      //     addNode: function (nodeData, callback) {
      //       console.log(nodeData);
      //       nodeData.label = "hello sssworld";
      //       nodeData.id = "10";
      //       nodeData.group = "host";
      //       callback(nodeData);
      //     },
      //     // addNode: async (node, callback) => {

      //     //   callback(); // Node will be added via reactivity from Vuex

      //     //   const newItem = { ...this.newItem };
      //     //   this.newItem.set();

      //     //   node.group = newItem.type;
      //     //   node.label = newItem.label;

      //     //   const closestId = newItem.connectTo
      //     //     ? this.getClosestId(node.x, node.y, newItem.connectTo, 500)
      //     //     : null;
      //     //   node.label =
      //     //     newItem.label ||
      //     //     (baseHostnames[node.group]
      //     //       ? this.getNextFreeHostname(node.group, closestId)
      //     //       : "");

      //     //   const { node: edited, item } = newItem.noEdit
      //     //     ? {
      //     //         node,
      //     //         item: {
      //     //           id: node.id,
      //     //           type: node.group,
      //     //           hostname: node.label,
      //     //         },
      //     //       }
      //     //     : await this.editItem(node, false);
      //     //   if (!edited) {
      //     //     return;
      //     //   }

      //     //   item.x = edited.x;
      //     //   item.y = edited.y;
      //     //   const items = [item];

      //     //   if (closestId != null) {
      //     //     const association = {
      //     //       id: randomUUID(),
      //     //     };

      //     //     if (
      //     //       nodePriorities.indexOf(item.type) >
      //     //       nodePriorities.indexOf(this.data.items[closestId].type)
      //     //     ) {
      //     //       association.from = closestId;
      //     //       association.to = edited.id;
      //     //     } else {
      //     //       association.from = edited.id;
      //     //       association.to = closestId;
      //     //     }

      //     //     items.push({
      //     //       id: association.id,
      //     //       type: "association",
      //     //       from: association.from,
      //     //       to: association.to,
      //     //     });
      //     //   }

      //     //   const ports = portAmounts[edited.group] || 0;
      //     //   if (ports > 0) {
      //     //     const coords = this.generateOrganizedPortCoors(edited, ports);
      //     //     for (let i = 0; i < ports; ++i) {
      //     //       const port = {
      //     //         id: randomUUID(),
      //     //         label: `eth${i}`,
      //     //         group: "port",
      //     //         ...coords[i],
      //     //       };
      //     //       items.push({
      //     //         id: port.id,
      //     //         hostname: port.label,
      //     //         type: "port",
      //     //         ...coords[i],
      //     //       });

      //     //       const edge = {
      //     //         id: randomUUID(),
      //     //         from: edited.id,
      //     //         to: port.id,
      //     //       };
      //     //       items.push({
      //     //         id: edge.id,
      //     //         type: "association",
      //     //         from: edge.from,
      //     //         to: edge.to,
      //     //       });
      //     //     }
      //     //   }

      //     //   this.commit("replaceItems", items);
      //     // },
      //     // editNode: async (node, callback) => {
      //     //   this.newItem.set();
      //     //   await this.editItem(node);
      //     //   callback();
      //     // },
      //     // addEdge: async (edge, callback) => {
      //     //   callback(); // Edge will be added via reactivity from Vuex

      //     //   this.orderNodes(edge);
      //     //   const type = this.getEdgeType(edge);
      //     //   if (this.isEdgeValid(edge, type)) {
      //     //     edge.id = edge.id || randomUUID();
      //     //     edge.group = type;
      //     //     edge.label = "";

      //     //     // await this.editItem(edge);
      //     //   }

      //     //   this.newItem.set();
      //     // },
      //     // editEdge: async (edge, callback) => {
      //     //   this.orderNodes(edge);
      //     //   if (this.isEdgeValid(edge, this.getEdgeType(edge))) {
      //     //     await this.editItem(edge);
      //     //     callback();
      //     //   } else {
      //     //     callback();
      //     //   }

      //     //   this.newItem.set();
      //     // },
      //   },
      // });

      // // Events
      // this.net.on("deselectNode", deselectHandler.bind(null, this.net));
      // this.net.on("deselectEdge", deselectHandler.bind(null, this.net));
      // this.net.on("doubleClick", async (event) => {
      //   if (event.nodes.length === 0 && event.edges.length === 1) {
      //     const id = event.edges[0];
      //     await this.editItem(this.edges.get(id));
      //   } else if (event.nodes.length === 1) {
      //     this.net.editNode();
      //   }
      // });
      // this.net.on("hold", (event) => {
      //   if (event.nodes.length === 0 && event.edges.length === 1) {
      //     this.net.editEdgeMode();
      //   } else if (event.nodes.length === 1) {
      //     const node = this.nodes.get(event.nodes[0]);
      //     if (node.group === "host" || node.group === "switch") {
      //       this.organizePorts(node);
      //     }
      //   }
      // });
      // this.net.on("dragEnd", (event) => {
      //   if (event.nodes.length > 0) {
      //     this.commitPositions(event.nodes);
      //   }
      // });
      // this.net.on("dragStart", (event) => {
      //   if (event.nodes.length !== 1) {
      //     return;
      //   }
      //   const nodeItem = this.data.items[event.nodes[0]];
      //   if (!(nodeItem.type === "host" || nodeItem.type === "switch")) {
      //     return;
      //   }

      //   const toSelect = new Set();
      //   this.net.getSelectedEdges().forEach((edgeId) => {
      //     const edge = this.edges.get(edgeId);
      //     toSelect.add(edge.to);
      //     toSelect.add(edge.from);
      //   });
      //   const toSelectFiltered = [...toSelect].filter(
      //     (nodeId) => this.data.items[nodeId].type === "port"
      //   );
      //   if (toSelectFiltered.length) {
      //     this.net.selectNodes([event.nodes[0], ...toSelectFiltered]);
      //   }
      // });
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
