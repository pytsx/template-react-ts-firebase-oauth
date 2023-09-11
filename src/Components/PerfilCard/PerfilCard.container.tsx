import React from 'react'
import { PerfilCardDesign, CustomGoogleButton, PerfilFooter, PerfilCardContent } from './PerfilCard.design'
import { env, useAuth } from '../../Common'
import { CircularProgress } from '@mui/material'

const PerfilCardContainer = () => {
  const { initGoogleAuthentication, perfil, loading } = useAuth()

  return (
    <PerfilCardDesign avatar_url={perfil?.picture} >

      {
        perfil?.hasOwnProperty('email')
          ? <PerfilCardContent perfil={perfil} />
          : <>
            {
              loading ? <CircularProgress /> : <CustomGoogleButton onClick={initGoogleAuthentication} />
            }
            <PerfilFooter version={env.VITE_APP_VERSION} />
          </>
      }

    </PerfilCardDesign>
  )
}

export default PerfilCardContainer