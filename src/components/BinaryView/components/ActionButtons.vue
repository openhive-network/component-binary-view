<script setup lang="ts">
import { useBinaryViewStore } from '../store'
const store = useBinaryViewStore()
</script>

<template>
  <div class="d-flex flex-column ga-1">
    <v-btn
      @click="store.copyBinary()"
      size="x-small"
      icon
      height="30"
      width="30"
      border="sm"
      rounded="lg"
    >
      <v-icon>mdi-hexadecimal</v-icon>
      <v-tooltip activator="parent" location="end">Copy binary (click)</v-tooltip>
    </v-btn>
    <v-btn
      @click="store.copyHex()"
      size="x-small"
      icon
      height="30"
      width="30"
      border="sm"
      rounded="lg"
    >
      <v-icon>mdi-content-copy</v-icon>
      <v-tooltip activator="parent" location="end">Copy hex (CTRL + click)</v-tooltip>
    </v-btn>
  </div>
</template>
