<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="640"
      ref="addHostDialog"
      @keydown="hotkeys"
    >
      <v-card>
        <v-card-title>
          <v-icon icon="mdi-laptop"></v-icon>
          <span class="text-h5" icon="mdi-laptop"> Host </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="item.name"
                  label="Host name*"
                  required
                  autofocus
                  variant="underlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="this.item.defRoute"
                  variant="underlined"
                  label="Default route"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="item.ipv4"
                  variant="underlined"
                  label="Ipv4"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="item.subnetMask"
                  variant="underlined"
                  label="Subnet mask"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="item.ipv6"
                  variant="underlined"
                  label="Ipv6"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="
              dialog = false;
              this.eventBus.emit('canceled');
            "
          >
            Close
          </v-btn>
          <v-btn
            type="submit"
            color="blue-darken-1"
            variant="text"
            @click="sendData"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
// import common from "./common";
// import errors from "@/validation/errors";
// import {
// required,
// hostname,
// ip,
// between,
// decimal,
// naturalNumberList,
// } from "@/validation/rules";
export default {
  mounted() {
    this.eventBus.on("addHostDialog", (nextLabel) => {
      this.item.name = nextLabel;
      this.dialog = true;
    });
    this.eventBus.on("canceled", () => this.resetData());
  },
  // mixins: [common, errors],
  // validations: {
  //   item: {
  //     defRoute: { ip },
  //     // name: { required, name },
  //   },
  // },
  data() {
    return {
      dialog: false,
      item: {},
    };
  },

  methods: {
    hotkeys(e) {
      if (e.key == "Enter") {
        this.sendData();
      }
    },
    resetData() {
      this.item = {};
      // for (let field in this.host) {
      //   this.host[field] = null;
      // }
    },
    sendData() {
      if (this.item.name) {
        this.eventBus.emit("newHostSuccess", {
          type: "Host",
          name: this.item.name,
          defRoute: this.item.defRoute,
          subnetMask: this.item.subnetMask,
          ipv4: this.item.ipv4,
          ipv6: this.item.ipv6,
        });
        console.log(this.item);
        this.dialog = false;
      }
      this.resetData();
      return;
    },
  },
};
</script>
