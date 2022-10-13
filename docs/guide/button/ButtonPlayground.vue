<template>
  <Playground
    :control-items="controlItems"
  >
    <template #default="{ data }">
      <Button
        v-bind="data"
      >
        {{ data.content }}
      </Button>
    </template>
  </Playground>
</template>

<script setup lang="ts">
import type { ControlItem } from '@/components/Playground.vue'
import { Button } from '@/lib'

const controlItems: ControlItem[] = [
  {
    name: 'content',
    label: 'Content',
    type: 'string',
    defaultValue: 'Button',
  },
  {
    name: 'styleType',
    label: 'Style',
    type: 'select',
    options: [
      {
        value: 'default',
        label: 'Default',
      },
      {
        value: 'primary',
        label: 'Primary',
      },
      {
        value: 'secondary',
        label: 'Secondary',
      },
      {
        value: 'ghost',
        label: 'Ghost',
      },
      {
        value: 'ghost-white',
        label: 'Ghost White',
      },
      {
        value: 'ghost-gray',
        label: 'Ghost Gray',
      },
    ],
    defaultValue: 'primary',
  },
  {
    name: 'size',
    label: 'Size',
    type: 'select',
    options: [
      {
        value: 'sm',
        label: 'Small',
      },
      {
        value: 'md',
        label: 'Medium',
      },
      {
        value: 'lg',
        label: 'Large',
      },
    ],
  },
  {
    name: 'disabled',
    label: 'Disabled',
    type: 'toggle',
  },
  {
    name: 'loading',
    label: 'Loading',
    type: 'toggle',
  },
]
</script>

<script lang="ts">
export default { name: 'ButtonPlayground' }
</script>
