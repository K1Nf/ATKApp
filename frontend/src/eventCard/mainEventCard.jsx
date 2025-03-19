import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../form/indexForm.css'
import App from './AppCard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
