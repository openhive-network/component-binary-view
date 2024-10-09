<script setup lang="ts">
import { IDataNode, IObjectNode } from '../types'
import { useBinaryViewStore } from '../store'
// Random colors are already generated in HexProp.vue
const store = useBinaryViewStore()

const props = defineProps<{
  data: IDataNode | IObjectNode
}>()
</script>

<template>
  <span> </span>
</template>

<style scoped></style>
