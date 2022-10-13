<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">

import type { Component, PropType } from 'vue'
import { computed } from 'vue'
import { Popover } from 'ant-design-vue'

const props = defineProps({
  class: {
    type: [String, Object] as PropType<string | Record<string, boolean>>,
    default: '',
  },
  paddingSize: {
    type: String as PropType<'sm' | 'md' | 'lg' | 'none'>,
    default: 'md',
  },
  title: {
    type: [String, Object] as PropType<string | null>,
    default: null,
  },
  icon: {
    type: Object as PropType<Component | null>,
    default: null,
  },
})

const overlayClassName = computed(() => {
  const classObj = {
    'custom-popover': true,
    [`-padding-size-${props.paddingSize}`]: props.paddingSize !== 'none',
  }
  const propClass = props.class
  if (typeof propClass === 'string') {
    classObj[propClass.trim()] = true
  } else {
    Object.keys(propClass).forEach((className) => {
      if (propClass[className]) {
        classObj[className] = true
      }
    })
  }
  return Object.keys(classObj).filter((key) => Boolean(classObj[key])).join(' ')
})

const slots = useSlots()
const isNeedTitleBlock = computed(() => (slots.icon || props.icon) || (slots.title || props.title))
</script>

<script lang="ts">
export default {
  name: 'SisPopover',
  inheritAttrs: false,
}
</script>

<template>
  <Popover
    :overlay-class-name="overlayClassName"
    v-bind="$attrs"
  >
    <template #content>
      <slot name="content" />
    </template>
    <template
      v-if="isNeedTitleBlock"
      #title
    >
      <div
        class="custom-popover__head"
      >
        <div
          v-if="icon || $slots.icon"
          class="custom-popover__icon"
        >
          <slot name="icon">
            <Component
              :is="icon"
              v-if="icon"
            />
            <slot
              v-if="$slots.icon"
              name="icon"
            />
          </slot>
        </div>
        <div
          v-if="title || $slots.title"
          class="custom-popover__title"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>
      </div>
    </template>
    <slot />
  </Popover>
</template>

<style lang="scss" scoped>
.custom-popover {
  &__head {
    display: flex;
    align-items: center;
  }

  &__icon {
    flex: 0 0 auto;
    margin-right: 4px;

    .svg-icon {
      display: block;
      width: 16px;
      height: 16px;
      fill: var(--color-white);

    }
  }

  &__title {
    @extend %typo-body-2;

    flex: 1 1 auto;
    color: var(--color-white);
  }
}
</style>
