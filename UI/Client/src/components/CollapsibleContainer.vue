<template>
  <div :class="['slideout-sidebar', slideOutDirectionClass, isActive ? 'active' : '']">
    <div class="slideout-sidebar-handle" @click="toggleActive">
      <i :class="['fa-regular', slideOutHandleClass]"></i>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, computed, PropType } from "vue";
export enum direction {
  left,
  right,
}
export default defineComponent({
  emits: ["activeStateChanged"],
  props: {
    direction: {
      type: Number as PropType<direction>,
      default: direction.left,
    },
    z_index: {
      type: Number,
      default: 80,
    },
  },
  setup(props, { emit, expose }) {
    const isActive = ref(false);

    const slideOutDirectionClass = computed(() => {
      let dir = props.direction;
      return dir == direction.left ? "slideout-sidebar-left" : "slideout-sidebar-right";
    });

    const slideOutHandleClass = computed(() => {
      let dir = props.direction;
      if (isActive.value) {
        if (dir == direction.left) dir = direction.right;
        else dir = direction.left;
      }
      return dir == direction.left ? "fa-arrow-to-left" : "fa-arrow-to-right";
    });

    function changeActiveState(show: boolean) {
      if (isActive.value != show) {
        isActive.value = show;
        emit("activeStateChanged", isActive.value);
      }
    }

    function toggleActive() {
      changeActiveState(!isActive.value);
    }

    function show() {
      changeActiveState(true);
    }

    function hide() {
      changeActiveState(false);
    }

    expose({ show, hide });
    return { isActive, slideOutDirectionClass, slideOutHandleClass, toggleActive, show, hide };
  },
});
</script>
<style scoped lang="scss">
$slideout-sidebar-width: 300px;
$transition: all linear 0.5s;

.slideout-sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  width: $slideout-sidebar-width;
  transition: $transition;
  background-color: var(--bs-light);
  z-index: v-bind("$props.z_index") !important;
}

.slideout-sidebar.slideout-sidebar-left.active {
  right: 0;
  border-left: 1px solid #dee2e6 !important;
}

.slideout-sidebar.slideout-sidebar-right.active {
  left: 0;
  border-right: 1px solid #dee2e6 !important;
}

.slideout-sidebar-left {
  right: -1 * $slideout-sidebar-width;
}

.slideout-sidebar-right {
  left: -1 * $slideout-sidebar-width;
}

.slideout-sidebar-handle {
  position: absolute;
  background-color: var(--bs-blue);
  display: inline-block;
  width: 30px;
  height: 40px;
  top: 6px;
  cursor: pointer;
  z-index: v-bind("$props.z_index") !important;
  text-align: center;
  padding: 10px 5px;
  color: white;
  line-height: 20px;
  transition: $transition;
  box-shadow: 0 6px 10px 0 #666;
}

.slideout-sidebar-left .slideout-sidebar-handle {
  right: $slideout-sidebar-width;
  border-right-width: 0px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.slideout-sidebar-right .slideout-sidebar-handle {
  left: $slideout-sidebar-width;
  border-left-width: 0px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>

<style>
.slideout-sidebar-overlay {
  visibility: hidden;
  position: absolute;
  /* full screen */
  width: 100%;
  height: 100%;
  /* transparent black */
  background: rgba(0, 0, 0, 0.7);
  /* middle layer, i.e. appears below the sidebar */
  z-index: 79;
  opacity: 0;
  top: 0;
  left: 0;
  /* animate the transition */
  transition: visibility 0.5s linear, opacity 0.5s linear;
}

/* display .overlay when it has the .active class */
.slideout-sidebar-overlay.active {
  visibility: visible;
  opacity: 0.8;
}
</style>
