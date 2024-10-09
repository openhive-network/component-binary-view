<script setup lang="ts">
import './BinaryView.css' // Global styles shared between all components
import { IBinaryView } from './types'
import HexProp from './components/HexProp.vue'
import KeyProp from './components/KeyProp.vue'
import { useBinaryViewStore } from './store'
const store = useBinaryViewStore()

const props = defineProps<{
  data: IBinaryView
}>()

store.indexBinaryData(props.data)
</script>

<template>
  <div class="binary-container">
    <div class="left-pane">
      <div>
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

.left-pane > div {
  display: inline-block;
  width: 200px;
  line-height: normal;
}

.left-pane,
.right-pane {
  flex-grow: 1;
  height: 100%;
}
</style>
