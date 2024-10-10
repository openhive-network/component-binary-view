<script setup lang="ts">
import './BinaryView.css' // Global styles shared between all components
import { type IBinaryView } from './types'
import HexProp from './components/HexProp.vue'
import KeyProp from './components/KeyProp.vue'
import ActionButtons from './components/ActionButtons.vue'
import { useBinaryViewStore } from './store'
const store = useBinaryViewStore()

const props = defineProps<{
  data: IBinaryView
  rowbytes?: number
  uppercase?: boolean
}>()

store.setBytesInRow(props.rowbytes)
store.setUppercase(props.uppercase)
store.indexBinaryData(props.data)
</script>

<template>
  <div>
    <div class="binary-container">
      <div class="left-pane">
        <ActionButtons class="left-pane-actions-buttons" />
        <div class="left-pane-index">
          <div class="left-pane-index-header">:</div>
          <div
            v-for="(offset, index) in Math.ceil(store.data.binary.length / 2 / store.bytesInRow)"
            :key="offset"
          >
            {{ store.setCase((index * 16).toString(16).padStart(6, '0')) }}:
          </div>
        </div>
        <div
          class="left-pane-hex-data"
          :style="{
            width: `${24 * store.bytesInRow + 1}px` /* +1px due to some browsers font differences in .02px - switching lines */
          }"
        >
          <div class="left-pane-binary-header">
            <span v-for="(byte, index) in store.bytesInRow" :key="byte">
              {{ store.setCase(index.toString(16).padStart(2, '0')) }}
            </span>
          </div>
          <span v-for="(offset, index) in props.data.offsets" :key="index">
            <HexProp :data="offset" />
          </span>
        </div>
      </div>
      <div class="right-pane">
        <div v-for="(offset, index) in props.data.offsets" :key="index">
          <KeyProp :data="offset" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.binary-container {
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: row;
  user-select: none;
}

.left-pane {
  display: flex;
  justify-content: center;
  margin-right: 20px;
}

.left-pane-binary-header,
.left-pane-index-header {
  margin-bottom: 8px;
}

.left-pane-binary-header > span {
  padding: 0 3px;
  color: white;
}

.left-pane-index > div {
  margin-right: 4px;
}

.left-pane-index {
  color: white;
  text-align: right;
  line-height: normal;
}

.left-pane-actions-buttons {
  flex-grow: 0;
  margin-right: 20px;
}

.left-pane > .left-pane-hex-data {
  display: inline-block;
  line-height: normal;
  font-size: 15px;
}

.left-pane,
.right-pane {
  flex-grow: 1;
  height: 100%;
}
</style>
