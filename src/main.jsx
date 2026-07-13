import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{ BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // browser router enables URL and notifies to tthe react
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
