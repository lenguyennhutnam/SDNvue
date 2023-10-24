<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="640" ref="addHostDialog">
      <!-- <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
      </template> -->
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
                  v-model="host.name"
                  label="Host name*"
                  required
                  autofocus
                  variant="underlined"
                ></v-text-field>
                <p>{{ host.name }}</p>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="this.host.defRoute"
                  variant="underlined"
                  label="Default route"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="host.ipv4"
                  variant="underlined"
                  label="Ipv4"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="host.subnetMask"
                  variant="underlined"
                  label="Subnet mask"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="host.ipv6"
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
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
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
export default {
  mounted() {
    this.eventBus.on("addHostDialog", () => (this.dialog = true));
  },
  data() {
    return {
      dialog: false,
      host: {
        name: null,
        defRoute: null,
        subnetMask: null,
        ipv4: null,
        ipv6: null,
      },
    };
  },
  methods: {
    sendData() {
      console.log(this.host);
      this.dialog = false;
    },
  },
};
</script>
