import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Mainpage from './pages/Mainpage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Mainpage />
  </StrictMode>
)
