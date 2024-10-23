import '../src/assets/main.css'

import { appInit } from '../src/app.init';
import BinaryView from '../src/components/BinaryView'
import type { App } from 'vue';

export { BinaryView }

const install = (app: App) => {
  appInit(app);

  app.component('BinaryView', BinaryView);
};

BinaryView.install = install;

export default BinaryView;
