<template>
  <Playground>
    <div class="popover-container">
      <Popover
        v-for="(item, index) in popoverItems"
        :key="`${item.title}-${index}`"
        :title="item.title"
        :padding-size="item.paddingSize"
        :placement="item.placement"
      >
        <template #content>
          <div class="content">
            {{ item.content }}
          </div>
        </template>
        <div class="popover-content">
          {{ item.placement }}
        </div>
      </Popover>
    </div>
  </Playground>
</template>

<script setup lang="ts">
import { Popover } from '@/lib'

interface PopoverItem {
  paddingSize?: 'sm' | 'md' | 'lg' | 'none'
  title?: string | null
  placement?: 'left' | 'right' | 'bottom' | 'top' | 'bottomRight' | 'bottomLeft' | 'topLeft' | 'topRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
  content: string
}

const popoverItems: PopoverItem[] = [
  {
    paddingSize: 'md',
    title: '標題',
    content: '詳細說明的文字內容',
    placement: 'top',
  },
  {
    paddingSize: 'md',
    title: '標題',
    content: '詳細說明的文字內容',
    placement: 'bottom',
  },
  {
    paddingSize: 'md',
    title: '標題',
    content: '詳細說明的文字內容',
    placement: 'left',
  },
  {
    paddingSize: 'md',
    title: '標題',
    content: '詳細說明的文字內容',
    placement: 'right',
  },
]

</script>

<style lang="scss" scoped>

.content {
  width: 276px;
}

.popover-container {
  display: inline-flex;
}

.popover-content {
  margin-right: 20px;
  padding: 6px 16px;
  border: 1px solid var(--c-divider);
  border-radius: 5px;
}
</style>
