<script lang="ts" setup>
import { Button } from '@/lib/components/button'

// 這邊可能要跟 Button拆共用
export interface ButtonProps {
  styleType?: 'default' | 'primary' | 'secondary' | 'ghost' | 'ghost-white' | 'ghost-gray' | 'error'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

export interface ConfirmDialogProps {
  size?: 'sm' | 'md' | 'lg'
  title?: string
  confirmText?: string
  confirmButtonProps?: ButtonProps
  cancelText?: string
  cancelButtonProps?: ButtonProps
  buttonsRtl?: boolean
}

const props = withDefaults(
  defineProps<ConfirmDialogProps>(),
  {
    size: 'md',
    title: '',
    confirmText: undefined,
    confirmButtonProps: () => ({}),
    cancelText: undefined,
    cancelButtonProps: () => ({}),
    buttonsRtl: false,
  },
)

const emit = defineEmits(['close', 'confirm', 'cancel'])

function handleClose () { emit('close') }
function handleCancel () { emit('cancel') }
function handleConfirm () { emit('confirm') }

const i18nConfirmText = computed(() => props.confirmText ?? '確認')
const i18nCancelText = computed(() => props.cancelText ?? '取消')
</script>

<template>
  <div class="dialog">
    <div
      class="dialog__main"
      :class="{
        [`-size-${size}`]: true
      }"
    >
      <div
        class="dialog__close"
        @click.stop="handleClose"
      >
        X
      </div>
      <div
        v-if="$slots.title"
        class="dialog__title"
      >
        <slot name="title" />
      </div>
      <div
        v-if="$slots.default"
        class="dialog__content"
      >
        <slot />
      </div>
      <div
        class="dialog__buttons"
        :class="{ rtl: buttonsRtl }"
      >
        <slot
          name="buttons"
          v-bind="{ handleCancel, handleConfirm }"
        >
          <Button
            v-bind="confirmButtonProps"
            @click.stop="handleConfirm"
          >
            {{ i18nConfirmText }}
          </Button>
          <div class="gap" />
          <Button
            v-bind="cancelButtonProps"
            @click.stop="handleCancel"
          >
            {{ i18nCancelText }}
          </Button>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  width: 100%;
  height: 100%;
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.7);

  &__main {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 20px 30px;
    border: 1px solid var(--color-gray-5);
    border-radius: 5px;
    background-color: var(--color-gray-8);

    &.-size {
      &-sm {
        max-width: 320px;
      }

      &-md {
        max-width: 480px;
      }

      &-lg {
        max-width: 720px;
      }
    }
  }

  &__close {
    position: absolute;
    top: 11px;
    right: 11px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.5;
    }

    .svg-icon {
      display: block;
      width: 25px;
      height: 25px;
      color: var(--color-text-3);
    }
  }

  &__title {
    @extend %typo-heading-3;

    margin-bottom: 20px;
    color: var(--color-text-1);
    text-align: center;
  }

  &__content {
    @extend %typo-body-1;

    color: var(--color-gray-2);
    text-align: center;
  }

  &__buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    &.rtl {
      flex-direction: row-reverse;
    }

    .gap {
      width: 8px;
    }
  }
}
</style>
