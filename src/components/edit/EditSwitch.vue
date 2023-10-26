<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="640"
      ref="addSwitchDialog"
      @keydown="hotkeys"
    >
      <v-card>
        <v-card-title>
          <v-icon icon="mdi-switch"></v-icon>
          <span class="text-h5" icon="mdi-switch"> Switch </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="item.name"
                  label="Switch name*"
                  required
                  autofocus
                  variant="underlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="item.switchType"
                  :items="switchTypes"
                  item-title="text"
                  item-value="value"
                  label="Type"
                  clearable
                  variant="underlined"
                />
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
import {
  switchTypes,
  // failModes,
  // datapaths,
  // protocolsOF,
} from "@/components/selects";
export default {
  mounted() {
    this.eventBus.on("addSwitchDialog", (nextLabel) => {
      this.item.name = nextLabel;
      this.dialog = true;
    });
    this.eventBus.on("canceled", () => this.resetData());
  },

  data() {
    return {
      dialog: false,
      switchTypes,
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
    },
    sendData() {
      console.log(this.item.switchType);
      if (this.item.name) {
        this.eventBus.emit("newSwitchSuccess", {
          type: "Switch",
          name: this.item.name,
          subnetMask: this.item.subnetMask,
          ipv4: this.item.ipv4,
          ipv6: this.item.ipv6,
          switchType: this.item.switchType,
        });
        this.dialog = false;
      }
      this.resetData();
      return;
    },
  },
};
</script>
