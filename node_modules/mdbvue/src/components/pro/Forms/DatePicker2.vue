<template>
  <div class="mdb-vue-date" v-mdb-click-outside="away">
    <div class="datepickbox" ref="popper">
      <mdb-input v-show="!disableInput" :bg="bg" :outline="outline" :icon="icon" :iconClass="iconClass" :far="far" :fal="fal" :fab="fab" :fad="fad" type="text" :disabled="disabled" :validation="validation" :customValidation="customValidation" :isValid="isValid" :validFeedback="validFeedback" :invalidFeedback="invalidFeedback" :title="mdbOptions.title" :label="mdbOptions.label" class="mdb-datepicker-2" :placeholder="value || mdbOptions.placeholder" v-model="date.time" :required="required" @change="emitDate" @blur="$emit('blur', $event)" @focus="$emit('focus', $event)" datePicker :datePickerIcon="datePickerIcon" @datePickerToggle="toggle" :aria-haspopup="show" />
    </div>
    <transition name="fade" mode="out-in">
      <div :class="inline ? 'datepicker-inline-overlay' : 'datepicker-overlay'" ref="mdbPicker" v-if="show && !disabled" @click="dismiss($event)" v-bind:style="{'background' : mdbOptions.overlayOpacity ? 'rgba(0,0,0,'+mdbOptions.overlayOpacity+')' : 'rgba(0,0,0,0.5)'}">
        <div :class="inline ? 'mdb-date-inline-body' : 'mdb-date-body'" :style="{'background-color': mdbOptions.color ? mdbOptions.color.header : '#3f51b5'}">
          <!-- the Header -->
          <div v-if="!inline" :class="'mdb-date-header ' + mdbOptions.color.header + '-color'">
            <div class="mdb-date-title">{{ title }}</div>
            <div class="mdb-date-caption" :style="{'color': mdbOptions.color ? mdbOptions.color.headerText : '#fff'}">
              <span>{{mdbOptions.week[checked.currentMoment.day()]}},</span> 
              <span> {{mdbOptions.month[parseInt(checked.month) - 1].substring(0,3)}}</span>
              <span> {{checked.day}}</span>
            </div>
          </div>
          <div class="mdb-date-box" v-if="showInfo.day">
            <div class="mdb-picker-box">
              <div class="mdb-datepicker-select" ref="mdbDatepickerSelect" @keydown.enter.stop="showYear" @click.prevent.stop="showYear" tabindex="0" @keydown.tab="focusLastItem">
                <span> {{mdbOptions.month[parseInt(checked.month) - 1]}}</span>
                <span> {{checked.year}} </span>
              </div>
              <div class="mdb-datepicker-arrows-navigation">
                <button type="button" class="mdb-date-previous" @keydown.enter.stop @click="nextMonth('pre')"><i class="fas fa-chevron-left"></i></button>
                <button type="button" class="mdb-date-next" @keydown.enter.stop @click="nextMonth('next')"><i class="fas fa-chevron-right"></i></button>
              </div>
              <div class="week">
                <ul>
                  <li v-for="(weekie, index) in library.week" :key="weekie+index">{{weekie[0]}}</li>
                </ul>
              </div>
              <div ref="days" class="days">
                <div class="day" v-for="(day, index) in dayList" :key="day+index" @click="checkDay(day, $event)" :tabindex="day.checked || day.value === tabindexActiveDay ? 0 : -1" @keydown.left="prevDay" @keydown.right="nextDay" @keydown.up.prevent="prevWeek" @keydown.down.prevent="nextWeek" @keydown.home.prevent="firstDay" @keydown.end.prevent="lastDay" @keydown.enter.stop="checkDay(day, $event)" @keydown.page-up.prevent="nextMonth('pre', true)" @keydown.page-down.prevent="nextMonth('next', true)" @keydown.tab="e => inline && focusFirstItem(e)" :class="{'checked':day.checked, 'unavailable':day.unavailable, 'current': day.moment.isSame(currentDate, 'd'), 'passive-day': !(day.inMonth),[mdbOptions.color.checkedDay + '-color'] : day.checked}">{{day.value}}</div>
              </div>
            </div>
          </div>

          <!-- the Calendar -->
          <div class="mdb-date-box list-box" v-if="showInfo.year">
            <div class="mdb-picker-box">
              <div class="mdb-datepicker-select mdb-datepicker-select-rotated" ref="mdbDatepickerSelect" @keydown.enter.stop="showDay(checked.currentMoment)" @click.prevent.stop="showDay(checked.currentMoment)" tabindex="0" @keydown.tab="focusLastItem">
                <span> {{library.year[0]}} - {{library.year[library.year.length- 1]}} </span>
              </div>
              <div class="mdb-datepicker-arrows-navigation">
                <button type="button" class="mdb-date-previous" @keydown.enter.stop @click="showYear('prev')"><i class="fas fa-chevron-left"></i></button>
                <button type="button" class="mdb-date-next" @keydown.enter.stop @click="showYear('next')"><i class="fas fa-chevron-right"></i></button>
              </div>
              <div class="mdb-picker-box date-list" id="yearList" ref="years">
                <div class="date-item" v-for="(yearItem, index) in library.year" :key="yearItem+index" @click.prevent.stop="setYear(yearItem)" @keydown.enter.stop="setYear(yearItem)" :class="{'current': currentDate.year() === yearItem, 'unavailable': currentDate.year() > yearItem && disabledPast || currentDate.year() < yearItem && disabledFuture || limitDates.from && yearItem > limitDates.from.year() || limitDates.to && yearItem < limitDates.to.year()}" :tabindex="yearItem === tabindexActiveYear ? 0 : -1" @keydown.right="nextYear" @keydown.left="prevYear" @keydown.down.prevent="next4Years" @keydown.up.prevent="prev4Years" @keydown.home.prevent="firstYear" @keydown.end.prevent="lastYear" @keydown.page-up.prevent="showYear('prev', true)" @keydown.page-down.prevent="showYear('next', true)" @keydown.tab="e => inline && focusFirstItem(e)">{{yearItem}}</div>
              </div>
            </div>
          </div>
          <div class="mdb-date-box list-box" v-if="showInfo.month">
            <div class="mdb-picker-box">
              <div class="mdb-datepicker-select mdb-datepicker-select-rotated" ref="mdbDatepickerSelect" @keydown.enter.stop="showDay(checked.currentMoment)" @click.prevent.stop="showDay(checked.currentMoment)" tabindex="0" @keydown.tab="focusLastItem">
                <span> {{checked.year}} </span>
              </div>
              <div class="mdb-datepicker-arrows-navigation">
                <button type="button" class="mdb-date-previous" @keydown.enter.stop @click="checked.year--"><i class="fas fa-chevron-left"></i></button>
                <button type="button" class="mdb-date-next" @keydown.enter.stop @click="checked.year++"><i class="fas fa-chevron-right"></i></button>
              </div>
              <div class="mdb-picker-box date-list">
                <div class="mdb-picker-year-title">{{checked.year}}</div>
                <div ref="months">
                  <div class="date-item" v-for="(monthItem, index) in library.month" :key="monthItem+index" @click.stop="setMonth(monthItem)" @keydown.enter.stop="setMonth(monthItem)" :class="{'current': currentDate.year() === parseInt(checked.year) && currentDate.month() === index, 'unavailable': currentDate.year() === parseInt(checked.year) && disabledPast && currentDate.month() > index || currentDate.year() > parseInt(checked.year) && disabledPast || currentDate.year() === parseInt(checked.year) && disabledFuture && currentDate.month() < index || currentDate.year() < parseInt(checked.year) && disabledFuture || limitDates.from && parseInt(checked.year) === limitDates.from.year() && index > limitDates.from.month() || limitDates.from && parseInt(checked.year) > limitDates.from.year() || limitDates.to && parseInt(checked.year) === limitDates.to.year() && index > limitDates.to.month() || limitDates.to && parseInt(checked.year) < limitDates.to.year()}" :tabindex="index + 1 === tabindexActiveMonth ? 0 : -1" @keydown.right="focusNextMonth" @keydown.left="focusPrevMonth" @keydown.down.prevent="focusNext4Months" @keydown.up.prevent="focusPrev4Months" @keydown.home.prevent="focusFirstMonth" @keydown.end.prevent="focusLastMonth" @keydown.tab="e => inline && focusFirstItem(e)">{{monthItem.substring(0,3)}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mdb-date-box list-box" v-if="showInfo.hour">
            <div class="mdb-picker-box date-list">
              <div class="watch-box">
                <div class="hour-box">
                  <ul>
                    <li class="hour-item" v-for="(hitem, index) in hours" :key="hitem+index" @click="setTime('hour', hitem, hours)" :class="{'active':hitem.checked}">{{hitem.value}}</li>
                  </ul>
                </div>
                <div class="min-box">
                  <div class="min-item" v-for="(mitem, index) in mins" :key="mitem+index" @click="setTime('min',mitem, mins)" :class="{'active':mitem.checked}">{{mitem.value}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="button-box" v-if="!inline">
            <button type="button" @click="clear" @keydown.enter.stop v-if="!mdbDisableClear" class="mdb-datepicker-clear-btn" :class="`text-${mdbOptions.color.header}`">{{mdbOptions.buttons.clear}}</button>
            <button type="button" @click="clearAndClose" @keydown.enter.stop v-if="!mdbDisableCancel" :class="`text-${mdbOptions.color.header}`">{{mdbOptions.buttons.cancel}}</button>
            <button type="button" @click="show=false" @keydown.enter.stop @keydown.tab="focusFirstItem" v-if="!mdbDisableOk" :class="`text-${mdbOptions.color.header}`" ref="mdbDatepickerOkButton">{{mdbOptions.buttons.ok}}</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import moment from 'moment';
import { mdbInput } from './Input';
import mdbClickOutside from '../../../directives/clickOutside';
import Popper from "popper.js";

const mdbDatePicker2 = {
  props: {
    required: false,
    date: {
      type: Object,
      default: () => ({
        date: ''
      })
    },
    options: {
      type: Object,
      default: () => ({})
    },
    limit: {
      type: Array,
      default: () => ([])
    },
    getValue: {
      type: Function
    },
    disableOk: Boolean,
    placeholder: String,
    label: String,
    title: {
      type: String,
      default: 'Title'
    },
    disableClear: Boolean,
    disableCancel: Boolean,
    autoHide: Boolean,
    defaultDate: [String, Date],
    value: String,
    validation : {
      type: Boolean,
      default: false
    },
    customValidation : {
      type: Boolean,
      default: false
    },
    isValid: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    validFeedback: String,
    invalidFeedback: String,
    icon: String,
    iconClass: String,
    far: Boolean,
    fab: Boolean,
    fal: Boolean,
    fad: Boolean,
    bg: Boolean,
    outline: {
      type: Boolean,
      default: true
    },
    disabledPast: Boolean,
    disabledFuture: Boolean,
    disableInput: {
      type: Boolean
    },
    datePickerIcon: {
      type: String,
      default: 'far fa-calendar'
    },
    inline: Boolean,
    inlinePlacement: {
      type: String,
      default: 'bottom-start'
    }
  },
  model: {
    event: 'change'
  },
  directives: {
    mdbClickOutside
  },
  components: {
    mdbInput
  },
  computed: {
    currentDate() {
      return moment();
    },
    mdbDisableOk() {
      return this.disableOk;
    },
    mdbDisableClear() {
      return this.disableClear;
    },
    mdbDisableCancel() {
      return this.disableCancel;
    },
    mdbAutoHide() {
      return this.autoHide || this.inline;
    },
    mdbOptions() { 
      let buttons = [];
      let colors = [];
      if (this.options.buttons) {
        buttons.ok = this.options.buttons.ok || 'OK';
        buttons.clear = this.options.buttons.clear || 'Clear';
        buttons.cancel = this.options.buttons.cancel || 'Cancel';
      } else {
        buttons.ok = 'OK';
        buttons.clear = 'Clear';
        buttons.cancel = 'Cancel';
      }
      if (this.options.color) {
        colors.header = this.options.color.header || 'primary';
        colors.headerText = this.options.color.headerText || 'white';
        colors.checkedDay = this.options.color.checkedDay || 'primary';
      } else {
        colors.header = 'primary';
        colors.headerText = 'white';
        colors.checkedDay = 'primary';
      }
      return {
        type: this.options.type || 'day',
        sundayFirst: this.options.sundayFirst || true,
        week: this.options.week || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        month: this.options.month || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: this.options.format || 'YYYY-MM-DD',
        color: {
          header: colors.header,
          headerText: colors.headerText,
          checkedDay: colors.checkedDay
        },
        placeholder: this.placeholder || this.options.placeholder,
        buttons: {
          ok: buttons.ok,
          clear: buttons.clear, 
          cancel: buttons.cancel
        },
        overlayOpacity: this.options.overlayOpacity || 0.5,
        label: this.label || this.options.label || ''
      };
    },
    library() {
      return {
        week: this.mdbOptions.week,
        month: this.mdbOptions.month,
        year: []
      };
    },
    hours() {
      let list = [];
      let hour = 24;
      while (hour > 0) {
        hour--;
        list.push({
          checked: false,
          value: hour < 10 ? '0' + hour : hour
        });
      }
      return list;
    },
    mins() {
      let list = [];
      let min = 60;
      while (min > 0) {
        min--;
        list.push({
          checked: false,
          value: min < 10 ? '0' + min : min
        });
      }
      return list;
    },
    defaultDateWrapper(){
      return this.defaultDate || this.value;
    }
  },
  data() {
    return {
      showInfo: {
        hour: false,
        day: false,
        month: false,
        year: false,
        check: false
      },
      show: false,
      displayInfo: {
        month: ''
      },
      checked: {
        oldtime: '',
        currentMoment: null,
        year: '',
        month: '',
        day: '',
        hour: '00',
        min: '00'
      },
      dayList: [],
      selectedDays: [],
      tabindexActiveDay: 1,
      tabindexActiveYear: moment().year() - 4,
      tabindexActiveMonth: 1,
      firstYearInTheList: moment().year(),
      popperJS: null,
      popperOptions: {
        placement: this.inlinePlacement
      },
      limitDates: {
        from: false,
        to: false
      }
    };
  },
  methods: {
    pad (n) {
      let m = Math.floor(n);
      return m < 10 ? '0' + m : m;
    },
    nextMonth (type, focus) {
      let next = null;
      type === 'next' ? next = moment(this.checked.currentMoment).add(1, 'M') : next = moment(this.checked.currentMoment).add(-1, 'M');
      this.showDay(next);
      if (focus === true) {
        this.$nextTick(() => {
          this.$refs.days.querySelector('[tabindex="0"]').focus();
        });
      }
    },
    showDay (time) {
      if (typeof time === "undefined" || !time) {
        this.defaultDate || this.value ? this.checked.currentMoment = moment(this.defaultDateWrapper) : this.checked.currentMoment = moment();
      } else {
        this.checked.currentMoment = moment(time, this.mdbOptions.format);
      }
      this.showOne('day');
      this.checked.year = moment(this.checked.currentMoment).format('YYYY');
      this.checked.month = moment(this.checked.currentMoment).format('MM');
      this.checked.day = moment(this.checked.currentMoment).format('DD');
      this.displayInfo.month = this.library.month[moment(this.checked.currentMoment).month()];
      let days = [];
      let currentMoment = this.checked.currentMoment;
      let firstDay = moment(currentMoment).date(1)
        .day();
      // gettting previous and next month
      // let currentMonth = moment(currentMoment)
      let previousMonth = moment(currentMoment);
      let nextMonth = moment(currentMoment);
      nextMonth.add(1, 'months');
      previousMonth.subtract(1, 'months');
      let monthDays = moment(currentMoment).daysInMonth();
      let oldtime = this.checked.oldtime;
      for (let i = 1; i <= monthDays; ++i) {
        days.push({
          value: i,
          inMonth: true,
          unavailable: false,
          checked: false,
          moment: moment(currentMoment).date(i)
        });
        if (i === Math.ceil(moment(currentMoment).format('D')) && moment(oldtime, this.mdbOptions.format).year() === moment(currentMoment).year() && moment(oldtime, this.mdbOptions.format).month() === moment(currentMoment).month()) {
          days[i - 1].checked = true;
        }
        this.checkBySelectDays(i, days);
      }
      if (firstDay === 0) firstDay = 7;
      for (let i = 0; i < firstDay - (this.mdbOptions.sundayFirst ? 0 : 1); i++) {
        let passiveDay = {
          value: previousMonth.daysInMonth() - (i),
          inMonth: false,
          action: 'previous',
          unavailable: true,
          checked: false,
          moment: moment(currentMoment).date(1)
            .subtract(i + 1, 'days')
        };
        days.unshift(passiveDay);
      }
      if (this.limit.length > 0) {
        for (let li of this.limit) {
          switch (li.type) {
            case 'fromto':
              days = this.limitFromTo(li, days);
              break;
            case 'from':
              days = this.limitFrom(li, days);
              break;
            case 'to':
              days = this.limitTo(li, days);
              break;
            case 'range':
              days = this.limitRange(li, days);
              break;
            case 'weekday':
              days = this.limitWeekDay(li, days);
              break;
            case 'exact':
              days = this.limitExactDays(li, days);
              break;
          }
        }
      }
      if (this.disabledPast) days = this.limitPast(days);
      if (this.disabledFuture) days = this.limitFuture(days);
      var passiveDaysAtFinal = 42 - days.length;
      for (let i = 1; i <= passiveDaysAtFinal; i++) {
        let passiveDay = {
          value: i,
          inMonth: false,
          action: 'next',
          unavailable: true,
          checked: false,
          moment: moment(currentMoment).add(1, 'months')
            .date(i)
        };
        days.push(passiveDay);
      }
      this.dayList = days;
    },
    checkBySelectDays (d, days) {
      this.selectedDays.forEach(day => {
        if (this.checked.year === moment(day).format('YYYY') && this.checked.month === moment(day).format('MM') && d === Math.ceil(moment(day).format('D'))) {
          days[d - 1].checked = true;
        }
      });
    },
    limitWeekDay (limit, days) {
      days.map(day => {
        if (limit.available.indexOf(Math.floor(day.moment.format('d'))) === -1) {
          day.unavailable = true;
        }
      });
      return days;
    },
    limitFromTo (limit, days) {
      if (limit.from || limit.to) {
        days.map(day => {
          if (this.getLimitCondition(limit, day)) {
            day.unavailable = true;
          }
        });
      }
      return days;
    },
    limitFrom (limit, days) {
      if (limit.from) {
        this.limitDates.from = moment(limit.from);
        days.map(day => {
          if (this.getLimitFromCondition(limit, day)) {
            day.unavailable = true;
          }
        });
      }
      return days;
    },
    limitTo (limit, days) {
      if (limit.to) {
        this.limitDates.to = moment(limit.to);
        days.map(day => {
          if (this.getLimitToCondition(limit, day)) {
            day.unavailable = true;
          }
        });
      }
      return days;
    },
    limitRange (limit, days) {
      if (limit.from || limit.to) {
        days.map(day => {
          if (this.getLimitRangeCondition(limit, day)) {
            day.unavailable = true;
          }
        });
      }
      return days;
    },
    limitPast (days) {
      days.map(day => {
        if (this.getLimitPastCondition(day)) {
          day.unavailable = true;
        }
      });
      return days;
    },
    limitFuture (days) {
      days.map(day => {
        if (this.getLimitFutureCondition(day)) {
          day.unavailable = true;
        }
      });
      return days;
    },
    getLimitCondition (limit, day) {
      let tmpMoment = moment(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value));
      if (limit.from && !limit.to) {
        return !tmpMoment.isAfter(limit.from);
      } else if (!limit.from && limit.to) {
        return !tmpMoment.isBefore(limit.to);
      }
      return !tmpMoment.isBetween(limit.from, limit.to);
    },
    getLimitFromCondition (limit, day) {
      let tmpMoment = moment(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value));
      return tmpMoment.isAfter(moment(limit.from), 'date');
    },
    getLimitToCondition (limit, day) {
      let tmpMoment = moment(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value));
      return tmpMoment.isBefore(moment(limit.to), 'date');
    },
    getLimitRangeCondition (limit, day) {
      let tmpMoment = moment(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value));
      return tmpMoment.isBetween(limit.from, limit.to, null, '[]');
    },
    getLimitPastCondition (day) {
      let tmpMoment = moment(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value));
      return tmpMoment.isBefore(moment(), 'date');
    },
    getLimitFutureCondition (day) {
      let tmpMoment = moment(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value));
      return tmpMoment.isAfter(moment(), 'date');
    },
    limitExactDays (limit, days) {
      if (limit.disabled) {
        days.map(day => {
          if (Array.isArray(limit.disabled)) {
            limit.disabled.map(disabledDay => {
              if (this.getExactLimitCondition(disabledDay, day)) {
                day.unavailable = true;
              }
            })
          } else {
            if (this.getExactLimitCondition(limit.disabled, day)) {
              day.unavailable = true;
            }
          }
        });
      }
      return days;
    },
    getExactLimitCondition (disabledDay, day) {
      let tmpMoment = moment(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value));
      let disabledDayMoment = moment(disabledDay)
      if (tmpMoment.isSame(disabledDayMoment)) return true
      return false
    },
    checkDay (obj, e) {
      e.target.focus();
      this.tabindexActiveDay = obj.value;
      if (obj.unavailable || obj.value === '') {
        return false;
      }
      if (!(obj.inMonth)) {
        this.nextMonth(obj.action);
      }
      if (this.mdbOptions.type === 'day' || this.mdbOptions.type === 'min') {
        this.dayList.forEach(x => {
          x.checked = false;
        });
        this.checked.day = this.pad(obj.value);
        obj.checked = true;
      } else {
        let day = this.pad(obj.value);
        let ctime = this.checked.year + '-' + this.checked.month + '-' + day;
        if (obj.checked === true) {
          obj.checked = false;
          this.selectedDays = this.selectedDays.filter(day => day !== ctime);
        } else {
          this.selectedDays.push(ctime);
          obj.checked = true;
        }
      }
      switch (this.mdbOptions.type) {
        case 'day':
          this.picked();
          break;
        case 'min':
          this.showOne('hour');
          // shift activated time items to visible position.
          this.shiftActTime();
          break;
      }
    },
    showYear(type, focus) {
      let year = this.firstYearInTheList;
      this.library.year = [];
      let yearTmp = [];
      if (type === 'prev') {
        this.firstYearInTheList = year - 24;
        for (let i = year - 28; i < year - 4; ++i) {
          yearTmp.push(i);
        }
      } else if (type === 'next') {
        this.firstYearInTheList = year + 24;
        for (let i = year + 20; i < year + 44; ++i) {
          yearTmp.push(i);
        }
      } else {
        for (let i = year - 4; i < year + 20; ++i) {
          yearTmp.push(i);
        }
      }
      this.tabindexActiveYear = this.firstYearInTheList - 4;
      this.$set(this.library, 'year', yearTmp)
      this.showOne('day');
      this.showOne('year');
      if (focus === true) {
        this.$nextTick(() => {
          this.$refs.years.querySelector('[tabindex="0"]').focus();
        });
      }
    },
    showOne (type) {
      switch (type) {
        case 'year':
          this.showInfo.hour = false;
          this.showInfo.day = false;
          this.showInfo.year = true;
          this.showInfo.month = false;
          break;
        case 'month':
          this.showInfo.hour = false;
          this.showInfo.day = false;
          this.showInfo.year = false;
          this.showInfo.month = true;
          break;
        case 'day':
          this.showInfo.hour = false;
          this.showInfo.day = true;
          this.showInfo.year = false;
          this.showInfo.month = false;
          break;
        case 'hour':
          this.showInfo.hour = true;
          this.showInfo.day = false;
          this.showInfo.year = false;
          this.showInfo.month = false;
          break;
        default:
          this.showInfo.day = true;
          this.showInfo.year = false;
          this.showInfo.month = false;
          this.showInfo.hour = false;
      }
    },
    showMonth () {
      this.showOne('month');
    },
    setYear (year) {
      this.checked.currentMoment = moment(year + '-' + this.checked.month + '-' + this.checked.day);
      this.showDay(this.checked.currentMoment);
      this.showMonth();
    },
    setMonth (month) {
      let mo = (this.library.month.indexOf(month) + 1);
      if (mo < 10) {
        mo = String('0' + mo);
      }
      this.checked.currentMoment = moment(this.checked.year + '-' + mo + '-' + this.checked.day);
      this.showDay(this.checked.currentMoment);
    },
    open () {
      if (this.date.time === '') {
        this.showDay();
      } else if (this.mdbOptions.type === 'day' || this.mdbOptions.type === 'min') {
        this.checked.oldtime = this.date.time;
        this.showDay(this.date.time);
      } else {
        this.selectedDays = JSON.parse(this.date.time);
        if (this.selectedDays.length) {
          this.checked.oldtime = this.selectedDays[0];
          this.showDay(this.selectedDays[0]);
        } else {
          this.showDay();
        }
      }
      this.show = true;
    },
    toggle () {
      if (this.show) {
        this.close();
      } else {
        this.open();
      }
    },
    away() {
      if (this.show && this.inline) this.close();
    },
    setTime (type, obj, list) {
      for (let item of list) {
        item.checked = false;
        if (item.value === obj.value) {
          item.checked = true;
          this.checked[type] = item.value;
        }
      }
    },
    picked () {
      if (this.mdbOptions.type === 'day' || this.mdbOptions.type === 'min') {
        let ctime = this.checked.year + '-' + this.checked.month + '-' + this.checked.day + ' ' + this.checked.hour + ':' + this.checked.min;
        this.checked.currentMoment = moment(ctime, 'YYYY-MM-DD HH:mm');
        this.date.time = moment(this.checked.currentMoment).format(this.mdbOptions.format);
      } else {
        this.date.time = JSON.stringify(this.selectedDays);
      }
      this.$emit('getValue', this.date.time);
      this.hide();
    },
    dismiss (evt) {
      if (evt.target.className === 'datepicker-overlay') {
        this.show = false;
        this.$emit('cancel');
      }
    },
    hide() {
      if (this.mdbAutoHide) {
        this.show = false;
      }
    },
    close() {
      this.show = false;
    },
    shiftActTime () {
      // shift activated time items to visible position.
      this.$nextTick(() => {
        if (!document.querySelector('.hour-item.active')) {
          return false;
        }
        document.querySelector('.hour-box').scrollTop = (document.querySelector('.hour-item.active').offsetTop || 0) - 250;
        document.querySelector('.min-box').scrollTop = (document.querySelector('.min-item.active').offsetTop || 0) - 250;
      });
    },
    clear () {
      this.date.time = '';
      this.dayList.forEach(x => {
        x.checked = false;
      });
      this.$emit('getValue', this.date.time);
      this.showDay(moment());
      this.hide();
    },
    clearAndClose() {
      this.clear();
      this.close();
    },
    today () {
      let isTodayDisabled = false;
      this.dayList.forEach(x => {
        x.checked = false;
        if (x.moment.isSame(moment(), 'date') && x.unavailable === true) isTodayDisabled = true;
      });
      if (!isTodayDisabled) {
        this.checked.day = moment().format('DD');
        this.checked.month = moment().format('MM');
        this.checked.year = moment().format('YYYY');
        if (this.checked.currentMoment.isSame(moment(), 'month')) {
          this.picked();
        }
        if (!this.mdbAutoHide) {
          this.open();
        }
      }
    },
    setDefaultDate() {
      this.date.time = this.value || this.defaultDate;
      if (typeof this.defaultDateWrapper === String) {
        return new Date(this.defaultDateWrapper);
      }
      return this.defaultDateWrapper;
    },
    emitDate() {
      this.$emit('change', this.date.time);
    },
    handleKeyPress(e) {
      e.stopPropagation();
      if (e.keyCode === 13 || e.keyCode === 27) {
        this.show=false;
      }
      else if (e.keyCode === 46) {
        this.clear();
      }
    },
    prevDay(e) {
      if (this.tabindexActiveDay >= 1) {
        this.tabindexActiveDay--;
        e.target.previousElementSibling.focus();
      }
    },
    nextDay(e) {
      const activeDay = moment(this.checked.year + '-' + this.checked.month + '-' + this.checked.day);
      const lastDayOfMonth = parseInt(activeDay.endOf('month').format('DD'));
      if (this.tabindexActiveDay === lastDayOfMonth) return;
      this.tabindexActiveDay++;
      e.target.nextElementSibling.focus();
    },
    prevWeek(e) {
      if (this.tabindexActiveDay - 7 < 1) return;
      this.tabindexActiveDay = this.tabindexActiveDay - 7;
      e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.focus();
    },
    nextWeek(e) {
      const activeDay = moment(this.checked.year + '-' + this.checked.month + '-' + this.checked.day);
      const lastDayOfMonth = parseInt(activeDay.endOf('month').format('DD'));
      if (this.tabindexActiveDay + 7 > lastDayOfMonth) return;
      this.tabindexActiveDay = this.tabindexActiveDay + 7;
      e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.focus();
    },
    focusFirstItem(e) {
      if (!e.shiftKey) {
        e.preventDefault();
        this.$refs.mdbDatepickerSelect.focus();
      }
    },
    focusLastItem(e) {
      if (e.shiftKey) {
        e.preventDefault();
        if (this.inline) {
          if (this.showInfo.day) {
            this.$refs.days.querySelector('div[tabindex="0"]').focus();
          }
          if (this.showInfo.year) {
            this.$refs.years.querySelector('div[tabindex="0"]').focus();
          }
          if (this.showInfo.month) {
            this.$refs.months.querySelector('div[tabindex="0"]').focus();
          }
        } else {
          this.$refs.mdbDatepickerOkButton.focus();
        }
      }
    },
    firstDay(e) {
      this.tabindexActiveDay = 1;
      e.target.parentNode.querySelector('.day:not(.passive-day)').focus();
    },
    lastDay(e) {
      const activeDay = moment(this.checked.year + '-' + this.checked.month + '-' + this.checked.day);
      const lastDayOfMonth = parseInt(activeDay.endOf('month').format('DD'));
      this.tabindexActiveDay = lastDayOfMonth;
      e.target.parentNode.querySelectorAll('.day:not(.passive-day)')[lastDayOfMonth - 1].focus();
    },
    prevYear(e) {
      if (this.tabindexActiveYear === this.firstYearInTheList - 4) return;
      this.tabindexActiveYear--;
      e.target.previousElementSibling.focus();
    },
    nextYear(e) {
      if (this.tabindexActiveYear === this.firstYearInTheList + 19) return;
      this.tabindexActiveYear++;
      e.target.nextElementSibling.focus();
    },
    prev4Years(e) {
      if (this.tabindexActiveYear - 4 < this.firstYearInTheList - 4) return;
      this.tabindexActiveYear = this.tabindexActiveYear - 4;
      e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.focus();
    },
    next4Years(e) {
      if (this.tabindexActiveYear + 4 > this.firstYearInTheList + 19) return;
      this.tabindexActiveYear = this.tabindexActiveYear + 4;
      e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.focus();
    },
    firstYear(e) {
      this.tabindexActiveYear = this.firstYearInTheList - 4;
      e.target.parentNode.querySelector('div').focus();
    },
    lastYear(e) {
      this.tabindexActiveYear = this.firstYearInTheList + 19;
      e.target.parentNode.querySelector('div:last-child').focus();
    },
    focusPrevMonth(e) {
      if (this.tabindexActiveMonth === 1) return;
      this.tabindexActiveMonth--;
      e.target.previousElementSibling.focus();
    },
    focusNextMonth(e) {
      if (this.tabindexActiveMonth === 12) return;
      this.tabindexActiveMonth++;
      e.target.nextElementSibling.focus();
    },
    focusPrev4Months(e) {
      if (this.tabindexActiveMonth - 4 < 1) return;
      this.tabindexActiveMonth = this.tabindexActiveMonth - 4;
      e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.focus();
    },
    focusNext4Months(e) {
      if (this.tabindexActiveMonth + 4 > 12) return;
      this.tabindexActiveMonth = this.tabindexActiveMonth + 4;
      e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.focus();
    },
    focusFirstMonth(e) {
      this.tabindexActiveMonth = 1;
      e.target.parentNode.querySelector('div').focus();
    },
    focusLastMonth(e) {
      this.tabindexActiveMonth = 12;
      e.target.parentNode.querySelector('div:last-child').focus();
    }
  },
  mounted() {
    this.setDefaultDate();
  },
  updated() {
    if (!this.show) {
      this.$emit('close');
    }

    setTimeout(() => {
      if (this.show){
        window.addEventListener('keydown', this.handleKeyPress);
      }
      else {
        window.removeEventListener('keydown', this.handleKeyPress);
      }
    }, 800);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyPress, false);
  },
  watch: {
    value() {
      this.setDefaultDate();
    },
    show(val) {
      if (val && this.inline) {
        this.$nextTick(() => {
          this.popperJS = new Popper(
            this.$refs.popper,
            this.$refs.mdbPicker,
            this.popperOptions
          );
        })
      }
    }
  }
};

export default mdbDatePicker2;
export { mdbDatePicker2 };
</script>

<style scoped lang="scss">
.mdb-vue-date {
  position: relative;
}
.datepicker-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99998;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.datepicker-inline-overlay {
  position: relative;
  z-index: 100;
  width: 300px;
  height: 340px;
  margin-top: 5px;
  background: transparent !important;
}
.mdb-date-box {
  @media (max-width: 992px) and (orientation: "landscape") {
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
    height: 300px;
  }
}
.mdb-date-body,
.mdb-date-inline-body {
  background: #fff;
  overflow: hidden;
  font-size: 0.9rem;
  font-family: 'Roboto';
  font-weight: 400;
  line-height: 1.2;
  display: block;
  position: relative;
  width: 300px;
  max-width: 100%;
  z-index: 99999;
  box-shadow: 0 12px 36px 16px rgba(0,0,0,.24);
  border-radius: 5px;
  @media (max-width: 992px) and (orientation: "landscape") {
    width: 450px;
    height: 300px;
  }
}
.mdb-date-inline-body {
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
}
.mdb-picker-box {
  background: #fff;
  width: 100%;
  display: inline-block;
  box-sizing: border-box !important;
  -moz-box-sizing: border-box !important;
  -webkit-box-sizing: border-box !important;
  -ms-box-sizing: border-box !important;
  width: 400px;
  max-width: 100%;
  height: 334px;
  text-align: start!important;
  padding: 0.5rem;
  font-size: 0.8rem;
  @media (max-width: 992px) and (orientation: "landscape") {
    width: 300px;
    height: 300px;
  }
}
.mdb-datepicker-select {
  display: inline-block;
  padding: 10px;
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 10px;
}
.mdb-datepicker-select::after {
  display: inline-block;
  margin-left: .255em;
  vertical-align: .200em;
  content: "";
  border-top: .3em solid;
  border-right: .3em solid transparent;
  border-bottom: 0;
  border-left: .3em solid transparent;
}
.mdb-datepicker-select-rotated:after {
  border-bottom: .3em solid;
  border-top: 0;
}
.mdb-datepicker-select:focus ,
.mdb-datepicker-select:hover {
  background-color: #eee;
}
.mdb-datepicker-arrows-navigation {
  float: right;
}
.mdb-date-previous,
.mdb-date-next {
  border: none;
  background-color: white;
  width: 36px;
  height: 36px;
  padding: 0;
  color: #666;
  border-radius: 50%;
}
.mdb-date-previous {
  margin-right: 2px;
}
.mdb-date-previous:focus,
.mdb-date-next:focus,
.mdb-date-previous:hover,
.mdb-date-next:hover {
  background-color: #eee;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}
.datepicker-overlay .week,
.datepicker-overlay .days {
  @media (max-width: 992px) and (orientation: "landscape") {
    padding: 0 32px;
  }
}
.day {
  width: 14.2%;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  padding: 0;
  background: #fff;
  vertical-align: middle;
  border: 1px solid white;
  border-radius: 50%;
}
.datepicker-overlay .day {
  @media (max-width: 992px) and (orientation: "landscape") {
    height: 30px;
    line-height: 30px;
  }
}
.day:not(.unavailable):hover {
  cursor: pointer;
  color: #000;
  background-color: #eee;
}
.day.current {
  border: 1px solid #666;
}
.day:focus {
  background-color: #eee;
}
.week ul {
  margin: 0 0 8px;
  padding: 0;
  list-style: none;
}
.week ul li {
  width: 14.2%;
  display: inline-block;
  text-align: center;
  background: transparent;
  font-weight: 500;
  color: #666;
  padding-top: 20px;
}
.datepicker-overlay .week ul li {
  @media (max-width: 992px) and (orientation: "landscape") {
    padding-top: 8px;
  }
}
.passive-day {
  visibility: hidden;
}
.checked {
  background: #F50057;
  color: #FFF !important;
  border-radius: 50%;
}
.unavailable {
  color: #ccc;
  pointer-events: none;
}
.mdb-date-header {
  position: relative;
  height: 115px;
  color: #fff;
  @media (max-width: 992px) and (orientation: "landscape") {
    position: absolute;
    left: 0;
    top: 0;
    width: 150px;
    height: 100%;
  }
}
.mdb-date-title {
  position: relative;
  width: 100%;
  height: 30px;
  padding-top: 15px;
  padding-left: 20px;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  font-size: 0.7rem;
}
.mdb-date-caption {
  color: #fff;
  width: 100%;
  font-size: 2rem;
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 20px;
  padding-bottom: 15px;
  span:first-child {
    @media (max-width: 992px) and (orientation: "landscape") {
      display: block;
      width: 100%;
    }
  }
}
.year {
  color: rgba(255,255,255,.4);
  font-weight: 300;
}
.unavailable:hover {
  background: none;
}
.checked:hover {
  background: #FF4F8E;
}
.date-item {
  text-align: center;
  font-size: 20px;
  padding: 12px 0;
  width: 25%;
  display: inline-block;
  cursor: pointer;
  font-size: 0.8rem;
  border-radius: 30px;
  border: 1px solid white;
}
.datepicker-overlay .date-item {
  @media (max-width: 992px) and (orientation: "landscape") {
    padding: 8px 0;
  }
}
.date-item:hover,
.date-item:focus {
  background: #eee;
}
.date-item.current {
  border: 1px solid #666;
}
.mdb-picker-year-title {
  padding: 10px 3px;
  font-weight: 500;
  color: #666;
  font-size: 0.9rem;
}
.date-list {
  overflow: auto;
  vertical-align: top;
  padding-top: 5px;
}
.button-box {
  background: #fff;
  vertical-align: top;
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding: 0 10px;
  margin-bottom: 5px;
  margin-top: -5px;
  @media (max-width: 992px) and (orientation: "landscape") {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 300px;
  }
}
.button-box button {
  background-color: #fff;
  border: none;
  cursor: pointer;
  padding: 0 10px;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 500;
  height: 40px;
  line-height: 40px;
  letter-spacing: 0.1rem;
  border-radius: 10px;
  margin-bottom: 10px;
}
.button-box button:hover,
.button-box button:focus {
  background: #eee;
}
.mdb-datepicker-clear-btn {
  float: left;
  margin-top: 1px;
  position: relative;
}
.watch-box {
  height: 100%;
  overflow: hidden;
}
.hour-box,
.min-box {
  width: 50%;
  text-align: center;
  height: 100%;
  overflow: auto;
  float: left;
}
.hour-box ul,
.min-box ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.hour-item,
.min-item {
  padding: 10px;
  font-size: 36px;
  cursor: pointer;
}
.hour-item:hover,
.min-item:hover {
  background: #E3E3E3;
}
.hour-box .active,
.min-box .active {
  background: #F50057;
  color: #FFF !important;
}
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-track {
  background: #E3E3E3;
}
::-webkit-scrollbar-thumb {
  background: #C1C1C1;
  border-radius: 2px;
}
div:focus {
  outline: none;
  background: rgba(0,0,0,.15);
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

<style lang="scss">
.mdb-datepicker-2 input[type="text"]:not(.browser-default) ~ label{
  pointer-events: none;
}
.mdb-datepicker-2 input[type="text"]:not(.browser-default):focus {
  border-color: #4285F4;
}
.mdb-datepicker-2 input[type="text"]:not(.browser-default):focus ~ label{
  color: #4285F4;
}

.mdb-datepicker-2 .form-control.is-valid {
  background-position-x: calc(100% - 30px) !important;
  border-color: #28a745 !important;
}

.mdb-datepicker-2 .form-control.is-invalid {
  background-position-x: calc(100% - 30px) !important;
  border-color: #dc3545 !important;
}
</style>