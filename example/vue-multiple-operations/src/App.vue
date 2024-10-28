<script setup lang="ts">
import { opHf26, opLegacy } from './data';
</script>

<template>
  <BinaryView :data="opHf26" rootnode="operation" dark />
  <BinaryView :data="opLegacy" rootnode="operation" dark />
</template>
