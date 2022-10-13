<template>
  <Playground>
    <div class="picker-container">
      <DatePicker
        v-model:value="value"
      />
    </div>
  </Playground>
</template>

<script lang="ts" setup>
import { DatePicker } from '@/lib'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import utc from 'dayjs/plugin/utc'

dayjs.extend(isBetween)
dayjs.extend(utc)

const value = ref<Dayjs>()

</script>

<style lang="scss" scoped>
.picker-container {
  display: flex;
  justify-content: space-around;
}
</style>
