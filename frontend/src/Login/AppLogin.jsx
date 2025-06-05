import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import Login from './Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
