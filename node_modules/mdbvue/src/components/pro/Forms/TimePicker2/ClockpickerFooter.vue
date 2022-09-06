<template>
  <div class="picker__footer">
    <button
      type="button"
      :class="textColor"
      class="btn btn-flat px-3 mx-0 clockpicker-button"
      :tabindex="1"
      @click="$emit('clear')"
      :aria-label="clear"
    >
      {{ clear }}
    </button>
    <div>
      <button
        type="button"
        :class="textColor"
        class="btn btn-flat px-3 mx-0 clockpicker-button"
        :tabindex="1"
        @click="$emit('close')"
        :aria-label="close"
        @blur="!doneActive && $emit('blur')"
      >
        {{ close }}
      </button>
      <button
        :disabled="!doneActive"
        type="button"
        :class="textColor"
        class="btn btn-flat px-3 mx-0 clockpicker-button"
        :tabindex="1"
        @click="$emit('done')"
        @blur="$emit('blur')"
        :aria-label="done"
      >
        {{ done }}
      </button>
    </div>
  </div>
</template>

<script>
const ClockpickerFooter = {
  props: {
    done: String,
    clear: String,
    close: String,
    doneActive: Boolean,
    textColor: String
  }
};

export default ClockpickerFooter;
</script>
<style scoped>
.picker__footer .clockpicker-button {
  transition: background-color .3s linear;
}

.picker__footer .clockpicker-button:focus {
  background-color: #f0f0f0 !important;
  border-radius: 5px;
}

.picker__footer .clockpicker-button:hover {
  background-color: #f0f0f0 !important;
  border-radius: 5px;
}

.picker__footer {
  padding: 16px;
}

.picker__footer .btn.btn-flat {
  font-size: 0.8rem;
}
</style>
