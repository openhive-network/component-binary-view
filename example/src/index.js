import React from 'react'
import ReactDOM from 'react-dom/client'

import 'binary-view'

import data from './data.js'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <binary-view data={JSON.stringify(data)} dark />
  </React.StrictMode>
)
