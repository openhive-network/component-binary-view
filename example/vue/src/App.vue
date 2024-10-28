<script setup lang="ts">
import { useTemplateRef } from 'vue';
import data from './data';
import type { BinaryViewComponent } from '@hiveio/component-binary-view';

const binaryView = useTemplateRef<BinaryViewComponent>('binaryViewNode');

const alertSelectedRange = () => {
  alert(JSON.stringify(binaryView.value!.getSelectedRange()));
};
</script>

<template>
  <button @click="alertSelectedRange">Alert selected range</button>
  <BinaryView :data="data" ref="binaryViewNode" rootnode="transaction" dark />
</template>
