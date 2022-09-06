<template>
  <component :is="tag" :class="liClass">
    <a
      v-if="href"
      :href="href"
      v-bind="$attrs"
      :class="className"
      @click="wave"
      tabindex="0"
    >
      <mdb-icon
        v-if="icon"
        :icon="icon"
        :far="far || regular"
        :fab="fab || brands"
        :fal="fal || light"
        :fad="fad || duotone"
      />
      <span v-if="slim" class="sv-slim">{{ slim }}</span>
      <span v-if="slimIcon" class="sv-slim"
        ><mdb-icon
          :icon="slimIcon"
          :far="slimFar"
          :fal="slimFal"
          :fad="slimFad"
          :fab="slimFab"
      /></span>
      <slot></slot> </a
    >
    <a
      v-if="toggler"
      v-bind="$attrs"
      :class="className"
      @click="handleClick"
      @keyup.enter="handleClick"
      tabindex="0"
    >
      <mdb-icon v-if="!isCollapsed" :icon="icon" />
      <slot v-if="!isCollapsed"></slot>
      <mdb-icon :icon="openIcon" v-if="isCollapsed" />
    </a>
    <router-link
      v-if="to"
      :to="to"
      v-bind="$attrs"
      :class="className"
      @click="wave"
      tabindex="0"
    >
      <mdb-icon
        v-if="icon"
        :icon="icon"
        :far="far || regular"
        :fab="fab || brands"
        :fal="fal || light"
        :fad="fad || duotone"
      />
      <span v-if="slim" class="sv-slim">{{ slim }}</span>
      <slot></slot>
    </router-link>
  </component>
</template>

<script>
import waves from "../../../mixins/waves";
import { mdbIcon } from "../../Content/Fa";

const SideNavItem = {
  name: "SideNavItem",
  components: {
    mdbIcon
  },
  props: {
    tag: {
      type: String,
      default: "li"
    },
    wrapperClass: {
      type: String
    },
    href: {
      type: String
    },
    to: [String, Object],
    header: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    openIcon: {
      type: String
    },
    slimIcon: {
      type: String
    },
    slimFar: {
      type: Boolean,
      default: false
    },
    slimFab: {
      type: Boolean,
      default: false
    },
    slimFal: {
      type: Boolean,
      default: false
    },
    slimFad: {
      type: Boolean,
      default: false
    },
    far: {
      type: Boolean,
      default: false
    },
    regular: {
      type: Boolean,
      default: false
    },
    fal: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    fab: {
      type: Boolean,
      default: false
    },
    brands: {
      type: Boolean,
      default: false
    },
    fad: {
      type: Boolean,
      default: false
    },
    duotone: {
      type: Boolean,
      default: false
    },
    isCollapsed: {
      type: Boolean,
      default: false
    },
    toggler: {
      type: Boolean,
      default: false
    },
    slim: String
  },
  computed: {
    className() {
      return [
        'sidenav-link',
        'ripple-parent',
        this.header && 'collapsible-header',
        this.normal ? 'sv-normal' : '',
        this.slim && 'sv-slim'
      ];
    },
    liClass() {
      return ["menu-item", this.wrapperClass];
    }
  },
  mixins: [waves],
  methods: {
    handleClick(e) {
      this.wave(e);
      this.$emit("toggle", e);
    }
  }
};

export default SideNavItem;
export { SideNavItem as mdbSideNavItem };
</script>

<style scoped>
.sidenav-link:focus {
  outline: none;
  font-weight: 400;
}

.sidenav-link:active {
  outline: none;
  font-weight: 400;
}
</style>
