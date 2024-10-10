<script setup lang="ts">
import data from '@/assets/data'

import BinaryView from '@/components/BinaryView'
</script>

<template>
  <main style="max-width: 1000px">
    <BinaryView :data="data" :uppercase="true" />
  </main>
</template>
