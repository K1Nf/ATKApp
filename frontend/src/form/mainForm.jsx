import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './indexForm.css'
import App from './AppForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
