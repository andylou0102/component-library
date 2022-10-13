<template>
  <Playground>
    <Button
      class="dialog-btn"
      @click="isShowConfirmDialog = true"
    >
      Confirm Dialog
    </Button>
    <ConfirmDialog
      v-if="isShowConfirmDialog"
      :buttons-rtl="true"
      @close="isShowConfirmDialog = false"
      @cancel="isShowConfirmDialog = false"
    >
      <template #title>
        I'm title
      </template>
      content
    </ConfirmDialog>
  </Playground>
</template>

<script lang="ts" setup>
import {
  Button, ConfirmDialog,
} from '@/lib'

const isShowConfirmDialog = ref<boolean>(false)

</script>

<style lang="scss" scoped>
.dialog-btn {
  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
