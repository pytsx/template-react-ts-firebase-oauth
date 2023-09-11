import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import theme from './theme'
import { AuthProvider, ConfigProvider } from './Common'
import './root.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ConfigProvider>
        <AuthProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </AuthProvider>
      </ConfigProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
