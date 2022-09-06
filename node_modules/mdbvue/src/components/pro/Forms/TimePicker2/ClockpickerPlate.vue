<template>
  <div class="picker__calendar-container">
    <div class="clockpicker-plate">
      <time-picker-clock
        v-if="unitsMode === 'h'"
        :min="1"
        :max="hoursFormat"
        :step="1"
        :rotate="30"
        :color="color"
        :scrollable="true"
        :value="hours"
        :ref="'clock'"
        :allowedValues="allowedHours"
        :double="hoursFormat === 24"
        @input="onHoursChange"
        @change="$emit('change', 'm')"
      />
      <time-picker-clock
        v-if="unitsMode === 'm'"
        :min="0"
        :max="59"
        :step="5"
        :allowedValues="allowedMinutes"
        :rotate="0"
        :color="color"
        :scrollable="true"
        :value="minutes"
        :ref="'clock'"
        @input="onMinutesChange"
      />
    </div>
  </div>
</template>

<script>
import TimePickerClock from "./TimePickerClock";

const ClockpickerPlate = {
  components: {
    TimePickerClock
  },
  props: {
    unitsMode: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    hoursFormat: {
      type: Number,
      required: true
    },
    hours: {
      type: Number,
      required: true
    },
    minutes: {
      type: Number,
      required: true
    },
    step: {
      type: Number
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    dayTime: {
      type: String
    }
  },
  data() {
    return {
      hour: this.hours
    };
  },
  methods: {
    onMinutesChange(val, ready) {
      this.$emit("minutes", val, ready);
    },
    onHoursChange(val) {
      this.hour = val;
      this.$emit("hours", val);
    },
    allowedHours(value) {
      if (!this.max && !this.min) return value;

      let max = this.max;
      let min = this.min; 

      if (this.max && this.min && this.max < this.min) {
        [max, min] = [this.min, this.max];
      }

      min = min - (min % 60);

      const addition = this.hoursFormat && this.dayTime === "pm" ? 12 * 60 : 0;
      const selectedHourValue = value * 60 + addition;


      let boundryCondition = true;

      if (this.min) boundryCondition = boundryCondition && selectedHourValue >= min;
      if (this.max) boundryCondition = boundryCondition && selectedHourValue <= max;

      return boundryCondition;
    },
    allowedMinutes(value) {
      if (!this.min && !this.max) {
        return value / this.step === Math.floor(value / this.step);
      }

      let max = this.max;
      let min = this.min; 

      if (this.max && this.min && this.max < this.min) {
        [max, min] = [this.min, this.max];
      }

      const addition = this.hoursFormat && this.dayTime === "pm" ? 12 * 60 : 0;

      const hourValue = this.hour * 60 + addition;

      let boundryCondition = true;

      if (this.min) boundryCondition = boundryCondition && hourValue + value >= min;
      if (this.max) boundryCondition = boundryCondition && hourValue + value <= max;

      return (
        boundryCondition &&
        value / this.step === Math.floor(value / this.step)
      );
    }
  },
  watch: {
    hours(value) {
      this.hour = value;
    }
  }
};

export default ClockpickerPlate;
</script>
