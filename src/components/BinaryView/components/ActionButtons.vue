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
      <v-tooltip activator="parent" location="end">Copy hex (ALT + click)</v-tooltip>
    </v-btn>
    <v-divider class="my-1" />
    <v-btn
      @click="store.foldAll()"
      size="x-small"
      icon
      height="30"
      width="30"
      border="sm"
      rounded="lg"
    >
      <v-icon>mdi-unfold-less-vertical</v-icon>
      <v-tooltip activator="parent" location="end">Fold all</v-tooltip>
    </v-btn>
    <v-btn
      @click="store.unfoldAll()"
      size="x-small"
      icon
      height="30"
      width="30"
      border="sm"
      rounded="lg"
    >
      <v-icon>mdi-unfold-more-vertical</v-icon>
      <v-tooltip activator="parent" location="end">Unfold all</v-tooltip>
    </v-btn>
  </div>
</template>
