<template>
  <div class="playground">
    <div class="component-container">
      <slot v-bind="{ data }" />
    </div>
    <div class="component-controller">
      <div
        v-for="item in controlItems"
        :key="item.name"
        class="control-item"
      >
        <div class="control-item__name">
          {{ item.name }}
        </div>
        <div class="control-item__value">
          <!-- toggle -->
          <div
            v-if="item.type === 'toggle'"
            class="control-item__value-toggle"
          >
            <label>
              <input
                v-model="data[item.name]"
                type="checkbox"
              >
              <span>{{ !!data[item.name] }}</span>
            </label>
          </div>
          <!-- number -->
          <div
            v-else-if="item.type === 'number'"
            class="control-item__value-number"
          >
            <input
              v-model="data[item.name]"
              type="number"
            >
          </div>
          <!-- string -->
          <div
            v-else-if="item.type === 'string'"
            class="control-item__value-string"
          >
            <input
              v-model="data[item.name]"
              type="text"
            >
          </div>
          <!-- select -->
          <div
            v-else-if="item.type === 'select'"
            class="control-item__value-select"
          >
            <select
              v-model="data[item.name]"
            >
              <option
                v-for="(option, index) in item.options"
                :key="`option-${index}`"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
          <!-- json -->
          <div
            v-else-if="item.type === 'json'"
            class="control-item__value-json"
          >
            <textarea
              v-model="item.draft"
              rows="5"
            />
            <button @click="data[item.name] = JSON.parse(item.draft)">
              apply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  controlItems: {
    type: Array as PropType<ControlItem[]>,
    default: () => [],
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data = ref<any | null>(null)

watch(() => props.controlItems, () => {
  const controlItems = props.controlItems
  const newData: Record<string, unknown> = {}
  controlItems.forEach((item) => {
    newData[item.name] = item.defaultValue
  })
  data.value = newData
}, {
  immediate: true,
})
</script>

<script lang="ts">
// eslint-disable-next-line vue/multi-word-component-names
export default { name: 'Playground' }

export interface AbstractControlItem {
  type: 'string' | 'number' | 'select' | 'toggle' | 'json'
  name: string
  label: string
  defaultValue?: unknown
}

export interface StringControlItem extends AbstractControlItem {
  type: 'string'
  defaultValue?: string
}

export interface NumberControlItem extends AbstractControlItem {
  type: 'number'
  defaultValue?: string
}

export interface SelectControlItem extends AbstractControlItem {
  type: 'select'
  options: {
    label: string
    value: unknown
  }[]
  defaultValue?: unknown
}

export interface ToggleControlItem extends AbstractControlItem {
  type: 'toggle'
  defaultValue?: boolean
}

export interface JsonControlItem extends AbstractControlItem {
  type: 'json'
  draft: string
  defaultValue?: unknown
}

export type ControlItem = StringControlItem | NumberControlItem | SelectControlItem | ToggleControlItem | JsonControlItem

</script>

<style lang="scss" scoped>
.playground {
  margin-top: 6px;
}

.component-container {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid var(--c-divider);
  border-radius: 0.25rem;
}

.component-controller {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid var(--c-divider);
  border-radius: 0.25rem;

  .control-item {
    display: flex;
    flex-direction: column;
    width: 33%;
    padding: 0.5rem;

    .control-item__name {
      margin-bottom: 0.25rem;
      font-weight: bold;
      font-size: 0.8rem;
    }

    .control-item__value {
      display: flex;
      flex-direction: column;

      .control-item__value-toggle {
        display: flex;
        flex-direction: row;
        align-items: center;

        label {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-right: 0.5rem;
        }
      }

      .control-item__value-number {
        input {
          width: 100%;
        }
      }

      .control-item__value-string {
        input {
          width: 100%;
        }
      }

      .control-item__value-select {
        select {
          width: 100%;
        }
      }

      .control-item__value-json {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
