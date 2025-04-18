import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BaseLayout from './BaseLayout/BaseLayout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BaseLayout/>
  </StrictMode>,
)
