import React from 'react'
import ReactDOM from 'react-dom/client'

import '@hiveio/component-binary-view-web-component'

import data from './data.js'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <binary-view data={JSON.stringify(data)} rootnode="transaction" dark />
  </React.StrictMode>
)
