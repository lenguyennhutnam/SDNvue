<template>
  <v-btn
    color="background"
    :id="id"
    :class="id"
    class="add-btn"
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
.add-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #ccc;
}
</style>
