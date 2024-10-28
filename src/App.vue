<script setup lang="ts">
import BinaryView from '@/components/BinaryView'
import { ref } from 'vue'
import { createWaxFoundation } from '@hiveio/wax'

const transaction = ref('')
const data = ref('')

const dark = ref(true)

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
  <main
    :style="{
      'background-color': dark ? '#181818' : 'white',
      color: dark ? 'rgb(235,235,235)' : '#181818'
    }"
  >
    <header>
      <label for="dark">Dark theme:</label>
      <input type="checkbox" id="dark" v-model="dark" />
      <textarea
        :style="{
          'background-color': dark ? '#181818' : 'white',
          color: dark ? 'rgb(235,235,235)' : '#181818'
        }"
        v-model="transaction"
        placeholder="Provide JSON transaction here"
      />
      <button @click="applyTransaction()">Apply</button>
    </header>
    <BinaryView @copy="console.log('copied')" v-if="data.length > 0" rootnode="transaction" :dark="dark" :data="data" />
  </main>
</template>
