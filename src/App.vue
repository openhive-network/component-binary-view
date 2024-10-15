<script setup lang="ts">
import BinaryView from '@/components/BinaryView'
import { ref } from 'vue'
import { createWaxFoundation } from '@hiveio/wax'

const transaction = ref('')
const data: any = ref(undefined)

const applyTransaction = () => {
  createWaxFoundation().then((wax) => {
    const tx = wax.createTransactionFromJson(transaction.value)

    data.value = tx.binaryViewMetadata as any

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
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          text="Provide transaction here"
          variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Provide transaction">
          <v-card-text>
            <v-textarea
              clearable
              v-model="transaction"
              label="JSON transaction"
              variant="outlined"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="OK" @click="(isActive.value = false), applyTransaction()" />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <BinaryView class="mt-4" v-if="data" :data="data" />
  </main>
</template>
