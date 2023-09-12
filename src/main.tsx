import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import theme from './theme'
import { AuthProvider, FirebaseProvider } from './Common'
import './root.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* @ts-ignore */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
      <ThemeProvider theme={theme}>

        <AuthProvider>
          <FirebaseProvider>

            <CssBaseline />
            <RouterProvider router={router} />

          </FirebaseProvider>
        </AuthProvider>

      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
