import 'vuetify/styles'

import { defineCustomElement } from 'vue'
import BinaryView from './components/BinaryView'

const SimpleSample = defineCustomElement(BinaryView)

customElements.define('binary-view', SimpleSample)
