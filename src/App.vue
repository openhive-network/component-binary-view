<script setup lang="ts">
import data from '@/assets/data.json'

import BinaryView from '@/components/BinaryView'
</script>

<template>
  <main>
    <BinaryView :data="data" />
  </main>
</template>
