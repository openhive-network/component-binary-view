<script setup lang="ts">
import { useBinaryViewStore } from '../store'
const store = useBinaryViewStore()
</script>

<template>
  <div class="action-buttons">
    <v-btn size="x-small" variant="text" height="30" width="30" border>
      <v-icon>mdi-hexadecimal</v-icon>
    </v-btn>
    <v-btn size="x-small" variant="text" height="30" width="30" border>
      <v-icon>mdi-content-copy</v-icon>
    </v-btn>
  </div>
</template>

<style scoped></style>
