import Host from "@/assets/network/host.svg";
import Switch from "@/assets/network/switch.svg";

const color = {
  host: {
    highlight: {
      border: "orange",
      background: "#0000",
    },
  },
  switch: {
    highlight: {
      border: "blue",
      background: "#0000",
    },
  },
};

export const option = {
  manipulation: {
    enabled: false,
  },
  physics: {
    enabled: false,
  },
  nodes: {
    size: 30,
    imagePadding: 5,
    borderWidth: 0.000001,
    borderWidthSelected: 2,
    color: {
      background: "#0000",
      hover: {
        background: "#0000",
      },
      highlight: {
        border: "orange",
        background: "#0000",
      },
    },
    shapeProperties: {
      useBorderWithImage: true,
    },
  },
  edges: {
    smooth: false,
    color: "green",
  },
  groups: {
    Host: {
      title: "Host",
      shape: "image",
      image: Host,
      color: color.host,
    },
    Switch: {
      title: "Switch",
      shape: "image",
      image: Switch,
      color: color.switch,
    },
  },
  interaction: {
    hover: true,
    hoverConnectedEdges: true,
  },
};

// options = {
//   physics: {
//     enabled: false,
//   },
//   nodes: {
//     // Invisible border, 0 makes selected border dissapear
//     borderWidth: 0.0001,
//     borderWidthSelected: 2,
//     shapeProperties: {
//       borderRadius: 6,
//       useBorderWithImage: true,
//     },
//   },
//   edges: {
//     smooth: false,
//     font: {
//       align: "top",
//       color: "green",
//       strokeWidth: 0,
//     },
//   },
//   interaction: {
//     hover: true,
//     navigationButtons: false,
//     keyboard: false,
//   },
//   manipulation: {
//     enabled: true,
//     initiallyActive: true,
//     addNode: function (nodeData, callback) {
//       console.log(nodeData);
//       nodeData.label = "hello sssworld";
//       nodeData.id = "10";
//       nodeData.group = "host";
//       callback(nodeData);
//     },
//   },
//   groups: {
//     host: {
//       size: 25,
//       shape: "image",
//       image: Host,
//     },
//     switch: {
//       size: 25,
//       image: Switch,
//     },
//   },
// },
