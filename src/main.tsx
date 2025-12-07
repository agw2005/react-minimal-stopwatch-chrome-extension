import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import NonExtension from './NonExtension.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
    {/* <NonExtension /> */}
  </StrictMode>,
)
