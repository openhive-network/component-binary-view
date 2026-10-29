<script setup lang="ts">
import data from './data';
</script>

<template>
  <div style="background: #161616; color: rgb(235,235,235); min-height:100vh;min-width:100vw;padding:2rem">
    <client-only>
      <BinaryView :data="data" rootnode="transaction" dark />
    </client-only>
  </div>
</template>
