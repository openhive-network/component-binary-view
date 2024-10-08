<script setup lang="ts">
import { IBinaryView } from './types'
import HexProp from './components/HexProp.vue'

const props = defineProps<{
  data: IBinaryView
}>()

const hex = props.data.binary.match(/.{1,2}/g)
</script>

<template>
  <div class="binary-container">
    <span v-for="(offset, index) in props.data.offsets" :key="index">
      <HexProp :data="offset" :index="index" />
    </span>
  </div>
</template>

<style scoped>
.binary-container {
  font-family: 'Courier New', Courier, monospace;
}
</style>
