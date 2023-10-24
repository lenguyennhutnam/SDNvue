<template>
  <div class="button-list">
    <func-btn ref="host" id="host" @click="activeHost"></func-btn>
    <func-btn ref="switch" id="switch" @click="acitveSwitch"></func-btn>
    <func-btn ref="edge" id="edge" @click="acitveEdge"></func-btn>
    <func-btn ref="delete" id="delete" @click="activeDelete"></func-btn>
  </div>
</template>

<script>
import FuncBtn from "./FuncBtn.vue";
export default {
  name: "BtnList",
  components: {
    FuncBtn,
  },
  data() {
    return {};
  },
  mounted() {
    this.eventBus.on("offBtn", this.offBtn);
  },
  methods: {
    offBtn() {
      this.$refs.switch.isActive = false;
      this.$refs.host.isActive = false;
      this.$refs.edge.isActive = false;
      this.$refs.delete.isActive = false;
    },
    acitveBtn(ref) {
      let lastState = ref.isActive;
      this.offBtn();
      ref.isActive = lastState;
      if (ref.id == "delete") {
        this.eventBus.emit("deleteNode");
      } else {
        this.eventBus.emit(
          `add${ref.id.charAt(0).toUpperCase() + ref.id.slice(1)}`
        );
      }
    },

    activeHost() {
      this.acitveBtn(this.$refs.host);
    },
    acitveSwitch() {
      this.acitveBtn(this.$refs.switch);
    },
    acitveEdge() {
      this.acitveBtn(this.$refs.edge);
    },
    activeDelete() {
      this.acitveBtn(this.$refs.delete);
    },
  },
};
</script>

<style scoped>
.button-list {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}
</style>
