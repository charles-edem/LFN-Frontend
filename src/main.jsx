import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './lib/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </AuthProvider>
)
