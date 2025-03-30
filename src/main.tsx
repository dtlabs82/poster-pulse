
import React from 'react-dom/client'
import { createElement } from 'react'
import App from './App.tsx'
import './index.css'

const root = document.getElementById("root")
if (root) {
  createRoot(root).render(createElement(App))
}

function createRoot(container) {
  // @ts-ignore - This is necessary to work around the type error
  return React.createRoot(container);
}
