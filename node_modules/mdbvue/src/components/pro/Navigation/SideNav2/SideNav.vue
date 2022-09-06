<template>
  <div>
    <div
      role="navigation"
      ref="sidenav"
      v-mdb-touch:swipe.right.carousel="swipeRight"
      @touchmove.prevent
      v-mdb-touch:swipe.left.carousel="swipeLeft"
    >
      <transition @enter="enter" @before-enter="beforeEnter" @leave="leave">
        <div
          class="mdbvue-sidenav"
          :class="sidenavClasses"
          :style="sidenavStyle"
          v-show="value"
          v-on="
            expandOnHover && {
              mouseenter: () => {
                slimMode = false;
              },
              mouseleave: () => {
                slimMode = true;
              },
            }
          "
        >
          <component
            :is="fixedHeader ? 'div' : 'mdb-scrollbar'"
            suppressScrollX
            class="mdbvue-sidenav__content"
            :style="{ padding: fixedHeader ? '0' : '8px' }"
          >
            <div
              class="mdbvue-sidenav__header"
              :style="{ padding: fixedHeader ? '8px' : '0' }"
            >
              <slot name="header"></slot>
            </div>

            <component
              :is="fixedHeader ? 'mdb-scrollbar' : 'div'"
              suppressScrollX
              class="mdbvue-sidenav__body"
              :style="{ padding: fixedHeader ? '8px' : '0' }"
            >
              <slot name="content-header"></slot>
              <div v-for="(group, i) in links" :key="i">
                <h6 v-if="group.name" class="group-title grey-text">
                  {{ group.name }}
                </h6>
                <ul class="list-unstyled">
                  <side-nav-item
                    v-for="(link, j) in group.data"
                    :key="j"
                    :children="link.children"
                    :href="link.href"
                    :to="link.to"
                    :name="link.name"
                    :icon="link.icon"
                    :far="link.far"
                    :fal="link.fal"
                    :fab="link.fab"
                    :fad="link.fad"
                    :show="value"
                    :active="activeCategory === j && value && activeGroup === i"
                    :slim="slim && slimMode"
                    @expandCategory="expandCategory(j, i)"
                    @itemClick="itemClick($event, j, i)"
                  >
                  </side-nav-item>
                </ul>
                <hr v-if="i !== links.length - 1" />
              </div>
              <slot name="content" />
            </component>
          </component>
        </div>
      </transition>

      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div
          v-if="value && backdrop && over"
          class="mdbvue-backdrop"
          :class="backdropClass"
          @click="$emit('input', false)"
          @wheel="blockScroll"
        ></div>
      </transition>
    </div>
    <div ref="nav">
      <slot name="nav"></slot>
    </div>
    <div ref="main">
      <slot name="main"></slot>
    </div>
    <div ref="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { mdbIcon } from "../../../Content/Fa";
import mdbWaves from "../../../../directives/waves";
import mdbTouch from "../../../../directives/pro/touch";
import { mdbScrollbar } from "../../../Advanced/Scrollbar";
import SideNavItem from "./SideNavItem";

const SideNav2 = {
  components: { mdbIcon, mdbScrollbar, SideNavItem },
  directives: { mdbWaves, mdbTouch },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    right: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 300,
    },
    backdrop: {
      type: Boolean,
      default: true,
    },
    backdropClass: {
      type: [String, Array],
      default: "rgba-black-light",
    },
    slim: {
      type: Boolean,
      default: false,
    },

    fixedHeader: {
      type: Boolean,
      default: false,
    },
    expandOnHover: {
      type: Boolean,
      default: false,
    },
    sidenavClass: {
      type: [String, Array],
      default: () => [],
    },
    slimCollapsed: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "primary",
    },
    slimWidth: {
      type: Number,
      default: 60,
    },
    width: {
      type: Number,
      default: 240,
    },
    groups: {
      type: Boolean,
      default: false,
    },
    over: {
      type: Boolean,
      default: false,
    },
    push: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      links: [],
      activeCategory: -1,
      activeGroup: -1,
      dragged: false,
      start: null,
      x: 0,
      offset: 0,
      transitionDuration: this.duration,
      slimMode: this.slimCollapsed,
      mouseover: false,
      lastElement: null,
      firstElement: null,
    };
  },
  computed: {
    side() {
      return !this.over && !this.push;
    },
    computedWidth() {
      return this.slim && this.slimMode ? this.slimWidth : this.width;
    },
    sidenavStyle() {
      const alignment = this.right
        ? { right: this.offset + "px", transitionProperty: "right, width" }
        : { left: this.offset + "px", transitionProperty: "left, width" };
      return {
        ...alignment,
        transitionDuration: `${this.transitionDuration / 1000}s`,
        width: this.computedWidth + "px",
      };
    },
    sidenavClasses() {
      let classes =
        typeof this.sidenavClass === "string"
          ? [this.sidenavClass]
          : this.sidenavClass;

      return [
        ...classes,
        this.fixedHeader && "fixed-header",
        `sidenav-${this.color}`,
      ];
    },
  },
  mounted() {
    if (!this.value) this.offset = -1 * this.computedWidth;

    this.setData(this.data);

    this.$nextTick(this.setActive);

    if (this.push || this.side) {
      const width = this.value ? this.computedWidth : 0;
      this.setOffset(width);
    }

    window.addEventListener("keydown", this.focusFirst);
    window.addEventListener("keyup", this.close);
  },
  beforeDestroy() {
    if (!this.over) {
      this.setOffset(0);
    }
    window.removeEventListener("keyup", this.close);
  },
  methods: {
    setActive() {
      if (this.links.length < 1 || !(this.$router && this.$router.history)) return;
      this.links.forEach((group, groupIndex) =>
        group.data.forEach((link, i) => {
          let active = link.to === this.$router.history.current.path;
          let children = link.children || [];

          children.forEach((child) => {
            if (child.to === this.$router.history.current.path) {
              active = true;
            }
          });

          if (active) {
            this.activeGroup = groupIndex;
            this.activeCategory = i;
          }
        })
      );
    },
    itemClick(e, i, group) {
      this.activeGroup = group;
      this.$emit("itemClick", i, e);
      if (this.slim && this.slimMode) {
        this.slimMode = false;
      }
    },
    expandCategory(i, group) {
      this.$emit("itemClick", i);
      this.activeGroup = group;
      if (this.slim && this.slimMode) {
        this.slimMode = false;
        this.activeCategory = i;
      } else if (this.activeCategory === i) this.activeCategory = -1;
      else this.activeCategory = i;
    },
    close(e) {
      if (e.keyCode === 27 && this.value) {
        this.$emit("input", false);
      }
    },
    swipeRight() {
      if (!this.right && this.slim && this.slimMode) {
        this.slimMode = false;
        return;
      } else if (!this.right) return;

      if (this.slim && !this.slimMode) this.slimMode = true;
      else this.$emit("input", false);
    },
    swipeLeft() {
      if (this.right && this.slim && this.slimMode) {
        this.slimMode = false;
        return;
      } else if (this.right) return;

      if (this.slim && !this.slimMode) {
        this.slimMode = true;
      } else this.$emit("input", false);
    },
    beforeEnter() {
      this.offset = -1 * this.computedWidth;
    },
    enter(el, done) {
      setTimeout(() => {
        this.offset = 0;
        done();
      }, 10);
    },
    leave() {
      this.offset = -1 * this.computedWidth;
    },
    setOffset(width = this.computedWidth) {
      const { nav, main, footer } = this.$refs;
      const elements = [nav, main, footer];

      const property = this.right ? "margin-right" : "margin-left";
      const negativeProperty = this.right ? "margin-left" : "margin-right";

      elements.forEach((el) => {
        if (!el) return;

        el.style["transition-property"] = `${property}, ${negativeProperty}`;
        el.style["transition-duration"] = `${this.duration / 1000}s`;
        el.style["transition-timing-function"] = "linear";
        el.style[property] = width + "px";

        if (this.push) {
          el.style[negativeProperty] = -1 * width + "px";
        } else {
          el.style[negativeProperty] = "0px";
        }
      });

      this.$emit("setOffset", width);
    },
    focusFirst(e) {
      if (this.value && e.keyCode === 9) {
        e.preventDefault();
        this.trapFocus();
      }
      window.removeEventListener("keydown", this.focusFirst);
    },
    trapFocus() {
      if (!this.firstElement) return;
      this.firstElement.focus();
    },
    removeFocusTrap() {
      this.lastElement.removeEventListener("blur", this.trapFocus);
    },
    calculateFocusTrap(e) {
      if ((e && e.keyCode !== 9) || !this.value) return;

      const focusable = Array.from(
        this.$refs.sidenav.querySelectorAll(
          'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => {
        return (
          !el.classList.contains("ps__thumb-x") &&
          !el.classList.contains("ps__thumb-y")
        );
      });

      if (focusable.length === 0) return;

      this.firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (this.lastElement && this.lastElement !== lastElement) {
        this.lastElement.removeEventListener("blur", this.trapFocus);
      }

      this.lastElement = lastElement;
      this.lastElement.addEventListener("blur", this.trapFocus);
    },
    setData(value) {
      if (this.groups) this.links = [...value];
      else this.links = [{ name: null, data: value }];
    },
    blockScroll(e) {
      if (this.value) e.preventDefault();
    },
  },
  watch: {
    value(value) {
      if (value && this.over) {
        this.$nextTick(() => {
          this.calculateFocusTrap();
          window.addEventListener("keydown", this.focusFirst);
        });
      } else if (!this.over) {
        const width = value ? this.computedWidth : 0;
        this.setOffset(width);
      } else if (!value) this.setOffset(0);
    },
    slimMode(value) {
      this.$emit("toggleSlim", value);
      if (!this.over && this.value) {
        this.setOffset();
      }
    },
    slimCollapsed(value) {
      this.slimMode = value;
    },
    data(value) {
      this.setData(value);
    },
    over(value) {
      window.addEventListener("keydown", this.focusFirst);
      if (value) {
        this.setOffset(0);
        this.value &&
          this.$nextTick(() => {
            this.calculateFocusTrap();
            // this.trapFocus();
          });
      }
    },
    side(value) {
      if (value && this.lastElement) this.removeFocusTrap();
      if (value && this.value) this.setOffset();
    },
    push(value) {
      if (value && this.lastElement) this.removeFocusTrap();

      if (value && this.value) this.setOffset();
    },
    right() {
      if (!this.over && this.value) this.setOffset();
    },
    $route() {
      this.setActive();
    },
  },
};

export default SideNav2;
export { SideNav2 as mdbSideNav2 };
</script>

<style scoped>
.sidenav-primary {
  --active-color: rgba(66, 133, 244, 1);
  --outline-color: rgba(66, 133, 244, 0.05);
}

.sidenav-danger {
  --active-color: rgba(255, 53, 71, 1);
  --outline-color: rgba(255, 53, 71, 0.05);
}

.sidenav-warning {
  --active-color: rgba(255, 187, 51, 1);
  --outline-color: rgba(255, 187, 51, 0.05);
}

.sidenav-success {
  --active-color: rgba(0, 200, 81, 1);
  --outline-color: rgba(0, 200, 81, 0.05);
}

.sidenav-info {
  --active-color: rgba(51, 181, 229, 1);
  --outline-color: rgba(51, 181, 229, 0.05);
}

.sidenav-default {
  --active-color: rgba(43, 187, 173, 1);
  --outline-color: rgba(43, 187, 173, 0.05);
}

.sidenav-secondary {
  --active-color: rgba(170, 102, 204, 1);
  --outline-color: rgba(170, 102, 204, 0.05);
}

.sidenav-elegant {
  --active-color: rgba(46, 46, 46, 1);
  --outline-color: rgba(46, 46, 46, 0.05);
}

.sidenav-stylish {
  --active-color: rgba(75, 81, 93, 1);
  --outline-color: rgba(75, 81, 93, 0.05);
}

.sidenav-unique {
  --active-color: rgba(63, 114, 155, 1);
  --outline-color: rgba(63, 114, 155, 0.05);
}

.sidenav-special {
  --active-color: rgba(55, 71, 79, 1);
  --outline-color: rgba(55, 71, 79, 0.05);
}

.sidenav-white {
  --active-color: rgba(255, 255, 255, 1);
  --outline-color: rgba(255, 255, 255, 0.1);
}

.mdbvue-sidenav {
  height: 100vh;
  background-color: white;
  -webkit-box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  z-index: 1060;
  transition-timing-function: linear;
  overflow-x: hidden;
  white-space: nowrap;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.sidenav-white {
  color: rgba(255, 255, 255, 0.5);
}

.mdbvue-sidenav__content {
  overflow-x: hidden;
}

.mdbvue-sidenav .group-title {
  padding: 10px;
  font-weight: 400;
  font-size: 0.875rem;
}

.fixed-header .mdbvue-sidenav__content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.fixed-header .mdbvue-sidenav__body {
  flex: 0 1 auto;
}

.link-toggler {
  flex: 0 1 auto;
}

.mdbvue-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1059;
}
</style>
