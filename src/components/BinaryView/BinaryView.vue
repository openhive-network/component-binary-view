<script setup lang="ts">
import BinaryDataHeader from './components/BinaryDataHeader.vue'
import { type IBinaryView } from './types'
import HexProp from './components/HexProp.vue'
import KeyProp from './components/KeyProp.vue'
import ActionButtons from './components/ActionButtons.vue'
import { useBinaryViewStore } from './store'
import { watch } from 'vue'

const emit = defineEmits(['copy'])

const store = useBinaryViewStore()

const props = defineProps<{
  data: string // We use string due to DOM limitations in propagating data to Web Components
  rowbytes?: number | string
  uppercase?: boolean | string
  dark?: boolean | string
}>()

watch(props, () => {
  store.resetStore()
  store.setBytesInRow(Number.parseInt((props.rowbytes as string) ?? 16))
  store.setUppercase(String(props.uppercase) === 'true')
  store.indexBinaryData(JSON.parse(props.data) as IBinaryView)
})

store.setBytesInRow(Number.parseInt((props.rowbytes as string) ?? 16))
store.setUppercase(String(props.uppercase) === 'true')
store.indexBinaryData(JSON.parse(props.data) as IBinaryView)
</script>

<template>
  <div :class="['binary-data-body', { dark: String(props.dark) === 'true' }]">
    <BinaryDataHeader class="mb-4" />
    <div class="binary-view-container" :key="store.data.binary">
      <div class="binary-view-left-pane">
        <ActionButtons @copy="emit('copy')" class="binary-view-left-pane-actions-buttons" />
        <div class="binary-view-left-pane-index">
          <div class="binary-view-left-pane-index-header">:</div>
          <div
            v-for="(offset, index) in Math.ceil(store.data.binary.length / 2 / store.bytesInRow)"
            :key="offset"
          >
            {{ store.setCase((index * 16).toString(16).padStart(6, '0')) }}:
          </div>
        </div>
        <div
          class="binary-view-left-pane-hex-data"
          :style="{
            width: `${24 * store.bytesInRow + 0.2 * store.bytesInRow}px` /* +1px due to some browsers font differences in .02px - switching lines */
          }"
        >
          <div class="binary-view-left-pane-binary-header">
            <span v-for="(byte, index) in store.bytesInRow" :key="byte">
              {{ store.setCase(index.toString(16).padStart(2, '0')) }}
            </span>
          </div>
          <span v-for="(offset, index) in store.data.offsets" :key="index">
            <HexProp :data="offset" />
          </span>
        </div>
      </div>
      <div class="binary-view-right-pane">
        <div v-for="(offset, index) in store.data.offsets" :key="index">
          <KeyProp :data="offset" />
        </div>
      </div>
    </div>
  </div>
</template>
