<script lang="ts" setup>
import { computed, type Component } from 'vue'

const props = withDefaults(
  defineProps<{
    styleType?: 'default' | 'primary' | 'secondary' | 'ghost' | 'ghost-white' | 'ghost-gray' | 'error'
    size?: 'sm' | 'md' | 'lg'
    icon?: Component | null
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    styleType: 'default',
    size: 'md',
    icon: null,
  },
)

const buttonClass = computed(() => ({
  [`-size-${props.size}`]: true,
  [`-type-${props.styleType}`]: true,
}))
</script>

<script lang="ts">
export default {
  name: 'Button',
  inheritAttrs: false,
}
</script>

<template>
  <button
    class="default-button"
    :class="buttonClass"
    v-bind="$attrs"
    :disabled="disabled || loading"
  >
    <slot name="icon">
      <Component
        :is="icon"
        v-if="icon"
      />
    </slot>
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.default-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-right: 11px;
  padding-left: 11px;
  border: 1px solid transparent;
  border-radius: 5px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: opacity 0.2s, background-color 0.2s, color 0.2s;

  &:disabled {
    border-color: transparent;
    background-color: inherit;
    color: initial;
    opacity: 0.5;
    cursor: initial;
  }

  &.-size {
    &-sm {
      @extend %typo-button-3;

      padding-top: 4px;
      padding-bottom: 4px;
    }

    &-md {
      @extend %typo-button-2;

      padding-top: 7px;
      padding-bottom: 7px;
    }

    &-lg {
      @extend %typo-button-1;

      padding-top: 9px;
      padding-bottom: 9px;
    }
  }

  &.-type {
    &-default {
      border: 1px solid var(--color-gray-6);
      color: var(--color-white);

      &:not(:disabled):hover {
        background-color: var(--color-translucent-white-3);
      }

      &:not(:disabled):active {
        background-color: var(--color-translucent-white-2);
      }
    }

    &-primary {
      background-color: var(--color-blue-5);
      color: var(--color-gray-9);

      &:not(:disabled):hover {
        background-color: var(--color-blue-4);
      }

      &:not(:disabled):active {
        background-color: var(--color-blue-6);
      }
    }

    &-secondary {
      background-color: var(--color-translucent-white-2);
      color: var(--color-blue-5);

      &:not(:disabled):hover {
        background-color: var(--color-translucent-white-4);
      }

      &:not(:disabled):active {
        background-color: var(--color-translucent-white-3);
      }
    }

    &-gray {
      background-color: var(--color-gray-9);
      color: var(--color-gray-4);

      &:not(:disabled):hover {
        color: var(--color-blue-5);
      }

      &:not(:disabled):active {
        color: var(--color-blue-4);
      }
    }

    &-ghost {
      color: var(--color-blue-5);
    }

    &-ghost-white {
      color: var(--color-white);
    }

    &-ghost-gray {
      color: var(--color-gray-4);
    }

    &-ghost,
    &-ghost-white,
    &-ghost-gray {
      padding: 0;

      &:not(:disabled):hover {
        color: var(--color-blue-4);
      }

      &:not(:disabled):active {
        color: var(--color-blue-6);
      }
    }

    &-error {
      background-color: var(--color-red-2);
      color: var(--color-black);

      &:not(:disabled):hover {
        background-color: var(--color-red-1);
      }

      &:not(:disabled):active {
        background-color: var(--color-red-3);
      }
    }
  }
}
</style>
