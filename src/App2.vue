<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>huhu</h1>
  <v-btn @click="active">Click ne</v-btn>
  <EditHost :nghetui="this.dialog"> </EditHost>
</template>

<script>
import EditHost from "./components/edit/EditHost.vue";

export default {
  components: {
    EditHost,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    active() {
      console.log(this.dialog);
      this.dialog = true;
    },
  },
};
</script>
