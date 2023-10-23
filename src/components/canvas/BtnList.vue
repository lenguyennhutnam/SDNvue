<template>
  <div class="button-list">
    <func-btn ref="host" id="host" @click="activeHost"></func-btn>
    <func-btn ref="switch" id="switch" @click="acitveSwitch"></func-btn>
    <func-btn ref="edge" id="edge" @click="acitveEdge"></func-btn>
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
    this.eventBus.on("offAddNode", this.offNode);
    this.eventBus.on("offAddEdge", this.offEdge);
  },
  methods: {
    offNode() {
      this.$refs.switch.isActive = false;
      this.$refs.host.isActive = false;
    },
    offEdge() {
      this.$refs.edge.isActive = false;
    },
    acitveBtn(ref) {
      let lastState = ref.isActive;
      this.offNode();
      ref.isActive = lastState;
      this.eventBus.emit(
        `add${ref.id.charAt(0).toUpperCase() + ref.id.slice(1)}`
      );
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
