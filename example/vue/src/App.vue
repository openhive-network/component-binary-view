<script setup lang="ts">
import data from './data';
</script>

<template>
  <BinaryView :data="JSON.stringify(data)" dark />
</template>
