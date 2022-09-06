<template>
  <!-- eslint-disable  vue/custom-event-name-casing-->
  <div
    class="md-form"
    :class="
      wasValidated ? (isValid ? 'timepicker-valid' : 'timepicker-invalid') : ''
    "
  >
    <mdb-input
      ref="input"
      type="text"
      v-show="!disableInput"
      :placeholder="placeholder"
      :id="id"
      :class="
        `mdb-timepicker timepicker ${
          pickerDialogOpen ? 'picker__input picker__input--active' : ''
        }`
      "
      v-model="innerValue"
      :icon="icon"
      :iconClass="iconClass"
      :label="label"
      :far="far"
      :bg="bg"
      :size="size"
      :fal="fal"
      :fab="fab"
      :outline="!bg && outline"
      :isValid="isValid"
      :customValidation="wasValidated"
      :validFeedback="validFeedback"
      :invalidFeedback="invalidFeedback"
      @input="handleInput"
      @change="$emit('getInputValue', $event)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      :aria-haspopup="pickerDialogOpen"
    />
    <mdb-btn
      ref="pickerIcon"
      v-show="!disableInput"
      :aria-haspopup="pickerDialogOpen"
      :tabindex="0"
      :icon="pickerIcon.icon"
      :far="pickerIcon.far"
      :fab="pickerIcon.fab"
      :fal="pickerIcon.fal"
      :fad="pickerIcon.fad"
      :iconClass="pickerIcon.class"
      class="timepicker-icon p-0 m-0"
      :style="{ top: `calc(${inputHeight} - 9px)` }"
      flat
      @click="handlePickerDialogToggle"
      @keydown.enter="handlePickerDialogToggle"
    />
    <div ref="dialog">
      <transition name="fade" mode="out-in">
        <div v-if="pickerDialogOpen" class="clockpicker picker picker--opened">
          <div class="picker__holder flex-center" @mousedown.self="handleClose">
            <div class="picker__frame h-100 flex-center">
              <div class="flex-center">
                <div class="picker__box">
                  <time-display
                    ref="timeDisplay"
                    :hours="computedHours"
                    :color="color"
                    :minutes="computedMinutes"
                    :hours-aria-label="hoursAriaLabel"
                    :minutes-aria-label="minutesAriaLabel"
                    :dayTime="dayTime"
                    :unitsMode="unitsMode"
                    @unitsMode="handleModeChange"
                    :hoursFormat="hoursFormat"
                    @hours="handleHoursChange"
                    @minutes="handleMinutesChange($event, false)"
                    @incrementHours="incrementHours"
                    @incrementMinutes="incrementMinutes"
                    :step="step"
                  >
                    <clockpicker-am-pm-block
                      v-if="hoursFormat === 12"
                      v-model="dayTime"
                    />
                  </time-display>
                  <clockpicker-plate
                    @minutes="handleMinutesChange"
                    @hours="handleHoursChange"
                    @change="handleModeChange"
                    :hours="hours"
                    :minutes="minutes"
                    :unitsMode="computedMode"
                    :color="color"
                    :hoursFormat="hoursFormat"
                    :step="step"
                    :min="computedMinValue"
                    :max="computedMaxValue"
                    :dayTime="dayTime"
                  />
                  <clockpicker-footer
                    @done="handleDoneClicked"
                    @clear="handleClearClicked"
                    @close="pickerDialogOpen = false"
                    @blur="focusFirstElement"
                    :done="doneLabel"
                    :clear="clearLabel"
                    :close="closeLabel"
                    :done-active="valueInRange"
                    :textColor="textColor"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import TimeDisplay from "./TimeDisplay";
import ClockpickerPlate from "./ClockpickerPlate";
import ClockpickerAmPmBlock from "./ClockpickerAmPmBlock";
import ClockpickerFooter from "./ClockpickerFooter";
import mdbInput from "../../../Forms/Input";
import mdbBtn from "../../../Components/Button";

const TimePicker = {
  props: {
    color: {
      type: String,
      default: "primary-color"
    },
    textColor: {
      type: String,
      default: "text-primary"
    },
    placeholder: {
      type: String
    },
    id: {
      type: [String, Boolean],
      default: false
    },
    label: {
      type: String
    },
    hoursFormat: {
      type: Number,
      default: 12
    },
    getValue: {
      type: Function
    },
    doneLabel: {
      type: String,
      default: "Ok"
    },
    clearLabel: {
      type: String,
      default: "Clear"
    },
    closeLabel: {
      type: String,
      default: "Close"
    },
    hoursAriaLabel: {
      type: String,
      default: "Change view to hours"
    },
    minutesAriaLabel: {
      type: String,
      default: "Chnage view to minutes"
    },
    autoClose: {
      type: Boolean,
      default: false
    },
    icon: String,
    iconClass: String,
    far: Boolean,
    fab: Boolean,
    fal: Boolean,
    outline: {
      type: Boolean,
      default: true
    },
    bg: { type: Boolean, default: false },
    size: { type: String },
    value: {
      type: String
    },
    disableInput: {
      type: Boolean
    },
    pickerIcon: {
      type: Object,
      default: () => ({ icon: "clock" })
    },
    step: {
      type: Number,
      default: 1,
      validator: value => {
        return value === 1 || value / 5 === Math.floor(value / 5);
      }
    },
    min: {
      type: String
    },
    max: {
      type: String
    },
    wasValidated: {
      type: Boolean,
      default: false
    },
    isValid: {
      type: Boolean,
      default: false
    },
    validFeedback: String,
    invalidFeedback: String
  },
  components: {
    TimeDisplay,
    ClockpickerPlate,
    ClockpickerAmPmBlock,
    ClockpickerFooter,
    mdbInput,
    mdbBtn
  },
  data() {
    return {
      innerValue: this.value,
      pickerDialogOpen: false,
      ready: false,
      unitsMode: "h",
      dayTime: "am",
      inputHeight: "50%",
      minutes: 0,
      hours: 12,
      body: null,
      previousValue: null
    };
  },
  computed: {
    computedMinutes() {
      return this.minutes < 10
        ? `0${this.minutes.toString()}`
        : `${this.minutes.toString()}`;
    },
    computedHours() {
      return this.hours < 10
        ? `0${this.hours.toString()}`
        : this.hours === 24
        ? `00`
        : `${this.hours.toString()}`;
    },
    computedMode() {
      return this.unitsMode;
    },
    computedMinValue() {
      if (this.min === undefined) return 0;

      return this.getMinutesValue(this.getTimeUnits(this.min));
    },
    computedMaxValue() {
      if (this.max === undefined) return 24 * 60;

      return this.getMinutesValue(this.getTimeUnits(this.max));
    },
    valueInRange() {
      return this.isValueInRange(this.hours, this.minutes, this.datTime);
    }
  },
  methods: {
    clear() {
      // clear timepicker from outside
      this.handleClearClicked();
      this.handleClose();
    },
    emitValue(innerValue) {
      this.$emit("input", innerValue);
      this.$emit("getValue", innerValue);
    },
    focusFirstElement() {
      this.$refs.timeDisplay.$refs.hours.focus();
    },
    getTimeUnits(string) {
      let [hours, remain] = string.split(":");
      hours = parseInt(hours);

      //minutes
      let [minutes] = remain.match(/[0-9]{2}/);
      minutes = parseInt(minutes);

      let dayTime;

      //dayTime
      if (this.hoursFormat === 24) {
        dayTime = null;
      } else {
        dayTime = remain.replace(/[0-9]{2}/, "").toLowerCase();
      }

      return {
        hours,
        minutes,
        dayTime
      };
    },
    getMinutesValue({ hours, minutes, dayTime }) {
      const addition =
        this.hoursFormat === 12 && dayTime === "pm" ? 12 * 60 : 0;

      return hours * 60 + minutes + addition;
    },
    handlePickerDialogToggle() {
      this.pickerDialogOpen = !this.pickerDialogOpen;
    },
    handleModeChange(mode) {
      this.unitsMode = mode;
    },
    handleDayTimeChange(dayTime) {
      if (dayTime === "am" || dayTime === "pm") {
        this.dayTime = dayTime;
      }
    },
    handleMinutesChange(minutes, ready = true) {
      this.minutes = minutes;
      if (ready) {
        this.ready = true;
        this.autoClose && this.$nextTick(this.handleDoneClicked);
      }
    },
    handleHoursChange(hours) {
      this.hours = hours;
    },
    handleDoneClicked() {
      this.innerValue =
        this.hoursFormat === 12
          ? `${this.computedHours}:${this.computedMinutes}${this.dayTime}`
          : `${this.computedHours}:${this.computedMinutes}`;
      this.unitsMode = "h";
      this.emitValue(this.innerValue);
      this.handlePickerDialogToggle();
      this.$emit("close");
    },
    handleClearClicked() {
      this.innerValue = "";
      this.hours = 12;
      this.minutes = 0;
      this.unitsMode = "h";
      this.dayTime = 'am';
      this.emitValue(this.innerValue);
      this.handlePickerDialogToggle();
    },
    handleInput(e) {
      this.$nextTick(() => {
        if (this.isInputValid(e) && this.valueInRange) {
          this.emitValue(this.innerValue);
        }
      });
    },
    handleClose() {
      this.$emit("close");
      this.pickerDialogOpen = false;
    },
    handleKeyup(e) {
      switch (e.keyCode) {
        case 8:
          this.unitsMode = "h";
          break;
        case 13:
          if (this.ready) {
            this.handleDoneClicked();
            this.ready = false;
          }
          break;
        case 27:
          this.pickerDialogOpen = false;
          break;
      }
    },
    incrementHours(delta) {
      this.handleModeChange("h");
      const incrementedValue = parseInt(this.hours) + delta;
      let result =
        incrementedValue <= 0
          ? this.hoursFormat
          : incrementedValue > this.hoursFormat
          ? 1
          : incrementedValue;

      const validValue = this.isValueInRange(
        result,
        this.minutes,
        this.dayTime
      );

      const min = this.min && this.getTimeUnits(this.min);
      const max = this.max && this.getTimeUnits(this.max);

      if (
        !validValue &&
        delta > 0 &&
        this.max &&
        incrementedValue === max.hours
      ) {
        result = max.hours;
        this.minutes = max.minutes;
      } else if (!validValue && delta > 0) {
        result = this.min ? min.hours : 0;
        this.minutes = this.min ? min.minutes : 0;
      } else if (
        !validValue &&
        delta < 0 &&
        this.min &&
        incrementedValue === min.hours
      ) {
        result = min.hours;
        this.minutes = min.minutes;
      } else if (!validValue && delta < 0) {
        result = this.max ? max.hours : this.hoursFormat;
        this.minutes = this.max ? max.minutes : 0;
      }

      this.hours = result;
    },
    incrementMinutes(delta) {
      this.handleModeChange("m");
      const incrementedValue = parseInt(this.minutes) + delta * this.step;
      let result =
        incrementedValue < 0
          ? 60 - this.step
          : incrementedValue > 59
          ? 0
          : incrementedValue;

      const validValue = this.isValueInRange(this.hours, result, this.dayTime);

      if (!validValue) return;
      this.minutes = result;
    },
    isValueInRange(hours, minutes, dayTime) {
      const time = {
        hours,
        minutes,
        dayTime
      };

      let max = this.computedMaxValue;
      let min = this.computedMinValue;

      if (max !== null && min !== null && min > max) {
        [min, max] = [max, min];
      }
      if (this.max && max < this.getMinutesValue(time)) return false;
      if (this.min && min > this.getMinutesValue(time)) return false;
      return true;
    },
    isInputValid(value) {
      if (!value.match(/[0-9]{1,2}:[0-9]{2}/)) return false;
      if (this.hoursFormat === 24 && value.length > 5) return false;
      if (this.hoursFormat === 12 && value.length > 7) return false;

      //minutes
      const time = this.getTimeUnits(value);

      if (time.hours > this.hoursFormat) return false;

      const validMinutes =
        time.minutes / this.step === Math.floor(time.minutes / this.step);

      //dayTime
      let validDayTime = true;

      if (
        this.hoursFormat === 12 &&
        time.dayTime !== "am" &&
        time.dayTime !== "pm"
      )
        validDayTime = false;

      return validMinutes && validDayTime;
    },
    open() {
      //open picker from outside
      this.pickerDialogOpen = true;
    },
    setInputHeight() {
      this.inputHeight =
        this.$refs.input.$refs.input.getBoundingClientRect().height / 2 + "px";
      if (this.innerValue) {
        this.setTimeUnits();
      }
    },
    setTimeUnits() {
      if (!this.isInputValid(this.innerValue)) return;

      const time = this.getTimeUnits(this.innerValue);

      if (this.hoursFormat === 12) {
        this.handleDayTimeChange(time.dayTime);
      }
      this.hours = time.hours;
      this.minutes = time.minutes;
    }
  },
  mounted() {
    this.setInputHeight();

    this.body = document.getElementsByTagName("body")[0];
    this.body.appendChild(this.$refs.dialog);
  },
  beforeDestroy() {
    this.body.removeChild(this.$refs.dialog);
  },
  updated() {
    if (this.pickerDialogOpen) {
      setTimeout(() => window.addEventListener("keyup", this.handleKeyup), 800);
    } else {
      window.removeEventListener("keyup", this.handleKeyup);
    }
  },
  watch: {
    innerValue() {
      this.setTimeUnits();
    },
    pickerDialogOpen(value) {
      if (value) {
        this.$nextTick(this.focusFirstElement);
      }
      else {
        this.$nextTick(() => {
          this.$refs.pickerIcon.$el.focus();
        })
      }
    }
  }
};

export default TimePicker;
export { TimePicker as mdbTimePicker2 };
</script>
<style scoped>
.timepicker {
  position: relative;
}

.timepicker-icon {
  position: absolute;
  right: 10px;
}

.timepicker-icon.btn.btn-flat:focus {
  color: rgba(66, 133, 244) !important;
}

.timepicker-valid .timepicker-icon.btn.btn-flat {
  color: #28a745 !important;
}

.timepicker-invalid .timepicker-icon.btn.btn-flat {
  color: #dc3545 !important;
}
</style>
<style>
.mdb-timepicker .form-control.is-valid {
  background-position-x: calc(100% - 30px) !important;
  border-color: #28a745 !important;
}

.mdb-timepicker .form-control.is-invalid {
  background-position-x: calc(100% - 30px) !important;
  border-color: #dc3545 !important;
}

.timepicker-valid label {
  color: #28a745 !important;
}

.timepicker-invalid label {
  color: #dc3545 !important;
}

.timepicker-invalid .md-form.md-bg .form-control.is-invalid {
  background-position: 100% 100% !important;
  background-image: linear-gradient(to bottom, #dc3545, #dc3545),
    linear-gradient(to bottom, #ced4da, #ced4da);
}

.timepicker-valid .md-form.md-bg .form-control.is-valid {
  background-position: 100% 100% !important;
  background-image: linear-gradient(to bottom, #dc3545, #dc3545),
    linear-gradient(to bottom, #ced4da, #ced4da);
}
</style>
