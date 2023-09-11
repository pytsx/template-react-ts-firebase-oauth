import React from 'react'
import { PerfilCardDesign, CustomGoogleButton, PerfilFooter, PerfilCardContent } from './PerfilCard.design'
import { useAuth } from '../../Common'
import { CircularProgress } from '@mui/material'
import packagejson from '../../../package.json'

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
            <PerfilFooter version={packagejson.version} />
          </>
      }

    </PerfilCardDesign>
  )
}

export default PerfilCardContainer