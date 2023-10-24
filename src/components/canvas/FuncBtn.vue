<template>
  <v-btn
    color="background"
    :id="id"
    :class="id"
    class="func-btn"
    :icon="icon"
    :active="isActive"
    @click="clickBtn"
  />
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      String,
    },
  },
  mounted() {
    this.setIcon();
  },
  data() {
    return {
      icon: null,
      images: {
        host: "mdi-laptop",
        switch: "mdi-switch",
        edge: "mdi-transit-connection-variant",
        delete: "mdi-delete-outline",
      },
      isActive: false,
    };
  },
  methods: {
    setIcon() {
      this.icon = this.images[this.id];
    },
    clickBtn() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
.func-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #ccc;
}
</style>
