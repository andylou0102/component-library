<script lang="ts" setup>
import type { Dayjs } from 'dayjs'
import { DatePicker } from 'ant-design-vue'
import { useDateLocale } from './composable'

const { locale } = useDateLocale()

const isMouseEnter = ref(false)
function setIsMouseEnter (status = false) {
  isMouseEnter.value = status
}

const emit = defineEmits(['update:value'])
function handleChange (val: string | Dayjs) {
  emit('update:value', val)
}

</script>

<script lang="ts">
export default {
  name: 'DatePicker',
  inheritAttrs: false,
}
</script>

<template>
  <DatePicker
    v-bind="$attrs"
    class="default-datepicker"
    :class="{
      custom: $slots.default != null,
    }"
    dropdown-class-name="default-datepicker__calendar"
    :locale="locale"
    :allow-clear="false"
    :format="($attrs['show-time'] as any) ? 'YYYY-MM-DD HH:mm:ss' : ['YYYY/MM/DD', 'YYYY-MM-DD']"
    @mouseenter="setIsMouseEnter(true)"
    @mouseleave="setIsMouseEnter(false)"
    @change="handleChange"
  >
    <template
      v-for="(slot, name) in $slots"
      :key="name"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>
  </DatePicker>
</template>
