<template>
  <div :class="'picker__date-display ' + color">
    <div class="clockpicker-display">
      <div class="clockpicker-display-column d-flex">
        <span
          ref="hours"
          :tabindex="1"
          :aria-label="hoursAriaLabel"
          @keydown.down.prevent="$emit('incrementHours', -1)"
          @keydown.up.prevent="$emit('incrementHours', 1)"
          :class="
            `clockpicker-span-hours ${unitsMode === 'h' ? 'text-primary' : ''}`
          "
          @click="changeMode('h')"
          >{{ hours }}</span
        >:<span
          :tabindex="1"
          :aria-label="minutesAriaLabel"
          @keydown.down.prevent="$emit('incrementMinutes', -1)"
          @keydown.up.prevent="$emit('incrementMinutes', 1)"
          :class="
            `clockpicker-span-minutes ${
              unitsMode === 'm' ? 'text-primary' : ''
            }`
          "
          @click="changeMode('m')"
          >{{ minutes }}</span
        >
        <span v-if="hoursFormat === 12" class="">
          <slot></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
const TimeDisplay = {
  props: {
    hours: {
      type: String,
      required: true
    },
    minutes: {
      type: String,
      required: true
    },
    hoursAriaLabel: {
      type: String
    },
    minutesAriaLabel: {
      type: String
    },
    hoursFormat: {
      type: Number
    },
    unitsMode: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "primary-color"
    },
    step: {
      type: Number,
      required: true
    }
  },
  methods: {
    changeMode(mode) {
      this.$emit("unitsMode", mode);
    }
  }
};

export default TimeDisplay;
</script>
<style scoped>
.clockpicker-display-column {
  color: rgba(255, 255, 255, 0.6) !important;
}
.clockpicker-span-hours:focus,
.clockpicker-span-minutes:focus {
  color: white !important;
  outline: none !important;
}
</style>
