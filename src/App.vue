<script setup lang="ts">
import BinaryView from '@/components/BinaryView'
import { ref } from 'vue'
import { createWaxFoundation } from '@hiveio/wax'

const transaction = ref('')
const data = ref('')

const applyTransaction = () => {
  createWaxFoundation().then((wax) => {
    const tx = wax.createTransactionFromJson(transaction.value)

    data.value = JSON.stringify(tx.binaryViewMetadata)

    qs.set('transaction', btoa(tx.toApi()))

    window.history.replaceState({}, '', `${location.pathname}?${qs.toString()}`)
  })
}

const qs = new URLSearchParams(location.search)
const savedTx = qs.get('transaction')

if (savedTx) {
  transaction.value = atob(savedTx)
  applyTransaction()
}
</script>

<template>
  <main>
    <header>
      <textarea v-model="transaction" placeholder="Provide JSON transaction here" />
      <button @click="applyTransaction()">Apply</button>
    </header>
    <BinaryView @copy="console.log('copied')" v-if="data.length > 0" dark :data="data" />
  </main>
</template>
