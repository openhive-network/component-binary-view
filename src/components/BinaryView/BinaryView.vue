<script setup lang="ts">
import BinaryDataHeader from './components/BinaryDataHeader.vue'
import { BinaryViewEmits, type IBinaryView, type IBinaryViewProps } from './types'
import HexProp from './components/HexProp.vue'
import KeyProp from './components/KeyProp.vue'
import ActionButtons from './components/ActionButtons.vue'
import { useIndexingBinaryViewStore, useBinaryViewStore } from './store'
import { ref, watch, onMounted } from 'vue';
import { getHost } from './utils/shadowdom'

const emit = defineEmits([...BinaryViewEmits])

const BinaryViewIndex = useIndexingBinaryViewStore().nextIndex();

const store = useBinaryViewStore(BinaryViewIndex)

const props = defineProps<IBinaryViewProps>()

defineExpose({ getSelectedRange: () => store.focusHighlightRange });

watch(props, () => {
  store.resetStore()
  store.setBytesInRow(Number.parseInt((props.rowbytes as string) ?? 16))
  store.setUppercase(String(props.uppercase) === 'true')
  store.indexBinaryData(
    props.rootnode ?? 'transaction',
    typeof props.data === 'object' ? props.data : (JSON.parse(props.data) as IBinaryView)
  )
})

store.setBytesInRow(Number.parseInt((props.rowbytes as string) ?? 16))
store.setUppercase(String(props.uppercase) === 'true')
store.indexBinaryData(
  props.rootnode ?? 'transaction',
  typeof props.data === 'object' ? props.data : (JSON.parse(props.data) as IBinaryView)
)

const binaryViewComponent = ref<HTMLElement | null>(null);
let host: HTMLElement | null;

const emitCopy = () => {
  if (host)
    host.dispatchEvent(new CustomEvent("copy"));
  else
    emit('copy');
};

onMounted(() => {
  host = getHost(binaryViewComponent.value);
  if (host)
    Object.defineProperty(host, 'getSelectedRange', {
      value: () => ({
        start: store.focusHighlightRange.start,
        end: store.focusHighlightRange.end
      }),
      writable: false,
      enumerable: true,
      configurable: true
    });
});
</script>

<template>
  <div ref="binaryViewComponent" :class="['binary-data-body', { dark: String(props.dark) === 'true' }]">
    <BinaryDataHeader :index="BinaryViewIndex" class="bvc:mb-4" />
    <!-- The margin goes on the second pane, as with Tailwind 3's space-y-4 (Tailwind 4's puts it on the first):
         the web component keeps the panes in a row on narrow screens too -->
    <div class="binary-view-container bvc:flex bvc:flex-col bvc:[&>*+*]:mt-4 bvc:md:[&>*+*]:mt-0 bvc:md:flex-row" :key="store.data.binary">
      <div class="binary-view-left-pane">
        <ActionButtons :index="BinaryViewIndex" @copy="emitCopy" class="binary-view-left-pane-actions-buttons" />
        <div class="binary-view-left-pane-index">
          <div class="binary-view-left-pane-index-header">:</div>
          <div
            v-for="(offset, index) in Math.ceil(store.data.binary.length / 2 / store.bytesInRow)"
            :key="offset"
          >
            {{ store.setCase((index * store.bytesInRow).toString(16).padStart(store.paddingZeros, '0')) }}:
          </div>
        </div>
        <div
          class="binary-view-left-pane-hex-data"
          :style="{
            width: `${24 * store.bytesInRow + 0.2 * store.bytesInRow}px` /* +1px due to some browsers font differences in .02px - switching lines */
          }"
        >
          <div class="binary-view-left-pane-binary-header">
            <span v-for="(byte, index) in store.bytesInRow" :key="byte">
              {{ store.setCase(index.toString(16).padStart(2, '0')) }}
            </span>
          </div>
          <span v-for="(offset, index) in store.data.offsets" :key="index">
            <HexProp :index="BinaryViewIndex" :data="offset" />
          </span>
        </div>
      </div>
      <div class="binary-view-right-pane">
        <div v-for="(offset, index) in store.data.offsets" :key="index">
          <KeyProp :index="BinaryViewIndex" :data="offset" />
        </div>
      </div>
    </div>
  </div>
</template>
