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
  bytesInRow?: number
}>()

store.indexBinaryData(props.data)
store.bytesInRow = props.bytesInRow || 16
</script>

<template>
  <div>
    <div class="binary-container">
      <div class="left-pane">
        <ActionButtons class="mr-3 left-pane-actions-buttons" />
        <div class="left-pane-hex-data" :style="{ width: `${24 * store.bytesInRow}px` }">
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
}

.left-pane-actions-buttons {
  flex-grow: 0;
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
