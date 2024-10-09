<script setup lang="ts">
import data from '@/assets/data.json'

import BinaryView from '@/components/BinaryView'
</script>

<template>
  <main style="max-width: 800px">
    <BinaryView :data="data" />
  </main>
</template>
