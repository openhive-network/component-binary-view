<script setup lang="ts">
import BinaryView from '@/components/BinaryView'
import { ref } from 'vue'
import { createWaxFoundation } from '@hiveio/wax';

const transaction = ref('');
const data = ref({ binary: "", offsets: [] });

const applyTransaction = () => {
  createWaxFoundation().then(wax => {
    const tx = wax.createTransactionFromJson(transaction.value);

    data.value = tx.binaryViewMetadata as any;
  });
};
</script>

<template>
  <main>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          text="Provide transaction"
          variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
      <v-card title="Provide transaction">
          <v-card-text>
            <v-textarea clearable v-model="transaction" label="JSON transaction" variant="outlined"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text="OK"
              @click="isActive.value = false, applyTransaction()"
            />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <BinaryView class="mt-4" :data="data" />
  </main>
</template>
