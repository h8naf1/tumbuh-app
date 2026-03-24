import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
// Bootstrap utama aplikasi React.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrapper tema global aplikasi. */}
    <div data-theme="tumbuh">
      {/* Router utama untuk semua halaman. */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  </StrictMode>,
)