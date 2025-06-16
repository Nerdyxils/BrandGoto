import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Qr from './assets/qr/qr-code'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Qr />
  </StrictMode>,
)