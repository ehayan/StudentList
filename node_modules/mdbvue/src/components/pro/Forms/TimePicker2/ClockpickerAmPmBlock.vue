<template>
  <div class="clockpicker-am-pm-block">
    <button
      :tabindex="1"
      type="button"
      :class="`am-button ${value === 'am' ? 'active' : ''}`"
      @keydown.enter="changeDayTime('am')"
      @click="changeDayTime('am')"
       aria-label="AM"
    >
      AM
    </button>
    <button
      :tabindex="1"
      type="button"
      :class="`pm-button ${value === 'pm' ? 'active' : ''}`"
      @keydown.enter="changeDayTime('pm')"
      @click="changeDayTime('pm')"
      aria-label="PM"
    >
      PM
    </button>
  </div>
</template>

<script>
const ClockpickerAmPmBlock = {
  props: {
    value: {
      type: String,
      default: "am"
    }
  },
  methods: {
    changeDayTime(time) {
      this.$emit("input", time);
    }
  }
};

export default ClockpickerAmPmBlock;
</script>
<style scoped>
.clockpicker-am-pm-block {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  background-color: transparent;
  border: none;
  justify-content: space-between;
  height: 65%;
  margin-top: 14px;
}

.clockpicker-am-pm-block button {
  background-color: transparent;
  border: none;
  color: rgba(0255, 255, 255, 0.6);
  transition: color 0.3s linear;
}

.clockpicker-am-pm-block button.active,
.clockpicker-am-pm-block button:focus {
  color: white;
}
</style>
