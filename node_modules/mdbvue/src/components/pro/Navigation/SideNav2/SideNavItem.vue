<template>
  <li>
    <div class="ripple-parent">
      <router-link
        v-if="to"
        :to="to"
        @click.native="handleClick"
        class="mdbvue-sidenav__item"
        :class="itemClasses"
        tabindex="0"
        @keydown.native.enter="handleKeydown"
      >
        <div :style="{ minWidth: '40px' }" class="text-center">
          <mdb-icon
            v-if="icon"
            :icon="icon"
            :far="far"
            :fab="fab"
            :fal="fal"
            :fad="fad"
          />
        </div>
        <span v-if="!slim">{{ name }}</span>

        <mdb-icon
          v-if="children && !slim"
          :icon="active ? 'chevron-up' : 'chevron-down'"
          :style="{ position: 'absolute', right: '12px' }"
        />
      </router-link>

      <a
        v-else
        @keydown.enter="handleKeydown"
        @click="handleClick"
        :href="href"
        class="mdbvue-sidenav__item"
        :class="itemClasses"
        tabindex="0"
      >
        <div :style="{ minWidth: '40px' }" class="text-center">
          <mdb-icon
            v-if="icon"
            :icon="icon"
            :far="far"
            :fab="fab"
            :fal="fal"
            :fad="fad"
          />
        </div>
        <span v-if="!slim">{{ name }}</span>
        <mdb-icon
          v-if="children && !slim"
          :icon="active ? 'chevron-up' : 'chevron-down'"
          :style="{ position: 'absolute', right: '12px' }"
        />
      </a>
    </div>
    <transition
      @beforeEnter="beforeExpand"
      @enter="expandList"
      @leave="hideList"
    >
      <ul v-if="showItems" class="list-unstyled expandable-items">
        <li
          v-for="(child, i) in children"
          :key="i"
          :style="{ marginBottom: '8px' }"
          class="ripple-parent"
        >
          <router-link
            v-if="child.to !== undefined"
            :to="child.to"
            tabindex="0"
            @click.native="handleItemClick($event, i)"
            @keydown.native.enter="handleKeydown($event, i)"
            class="mdbvue-sidenav__item"
            :class="{ active: active && activeChild === i }"
            >{{ child.name }}</router-link
          >
          <a
            v-else
            :href="child.href"
            tabindex="0"
            @keydown.enter="handleKeydown($event, i)"
            @click="handleItemClick($event, i)"
            class="mdbvue-sidenav__item"
            :class="{ active: active && activeChild === i }"
            >{{ child.name }}</a
          >
        </li>
      </ul>
    </transition>
  </li>
</template>

<script>
import { mdbIcon } from "../../../Content/Fa";
import waves from "../../../../mixins/waves";

export default {
  components: {
    mdbIcon,
  },
  mixins: [ waves],
  props: {
    icon: String,
    far: Boolean,
    fab: Boolean,
    fal: Boolean,
    fad: Boolean,
    to: [String, Object],
    href: String,
    name: String,
    children: Array,
    active: {
      type: Boolean,
      default: false,
    },
    slim: {
      type: Boolean,
      default: false,
    },
    show: Boolean
  },
  data() {
    return {
      activeChild: -1,
    };
  },
  computed: {
    itemClasses() {
      return {
        "justify-content-center": this.slim,
        active: this.active,
      };
    },
    showItems() {
      return this.children && this.active && !this.slim;
    },
  },
  methods: {
    handleClick(e) {
      this.wave(e);
      this.children ? this.$emit('expandCategory') : this.$emit('itemClick');
    },
    handleItemClick(e, i) {
      this.wave(e);
      this.$emit('itemClick', i)
    },
    handleKeydown(e, child) {
      if (child !== undefined || this.children === undefined) {
        e.target.click();
        this.$emit("itemClick", child);
      } else {
        this.$emit("expandCategory");
      }
    },
    beforeExpand(el) {
      el.style.height = "0px";
    },
    expandList(el) {
      el.style.height = el.scrollHeight + "px";
    },
    hideList(el) {
      el.style.height = "0px";
    },
  },
  mounted() {
    if (this.children) {
      let activeChild = -1;

      for (let i = 0; i < this.children.length; i++) {
        if (this.$route.path === this.children[i].to) {
          activeChild = i;
        }
      }

      this.activeChild = activeChild;
    }
  },
  watch: {
    $route(to) {
      if (this.children) {
        let activeChild = -1;

        for (let i = 0; i < this.children.length; i++) {
          if (to.path === this.children[i].to) {
            activeChild = i;
          }
        }

        this.activeChild = activeChild;
      }
    },
  },
};
</script>

<style scoped>
.mdbvue-sidenav__item {
  position: relative;
  height: 46px;
  font-weight: 400;
  display: flex;
  align-items: center;
  border-radius: 5px;
  color: inherit;
  transition: all 0.2s linear;
}

.expandable-items .mdbvue-sidenav__item {
  height: 28px;
  padding-left: 3.2rem;
}

.mdbvue-sidenav__content {
  overflow-x: hidden;
}

.mdbvue-sidenav__item span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.mdbvue-sidenav__content .active {
  background-color: var(--outline-color);
  color: var(--active-color) !important;
}

.expandable-items .active {
  background-color: transparent;
}

.mdbvue-sidenav__item:active {
  outline: none !important;
  background-color: var(--active-color);
  color: var(--active-color) !important;
}

.mdbvue-sidenav__item:focus {
  outline: none !important;
  background-color: var(--outline-color);
  color: var(--active-color) !important;
}

.mdbvue-sidenav__item:hover {
  outline: none !important;
  color: var(--active-color) !important;
  background-color: var(--outline-color);
}

.expandable-items {
  transition: height 0.2s linear;
  overflow: hidden;
}
</style>
