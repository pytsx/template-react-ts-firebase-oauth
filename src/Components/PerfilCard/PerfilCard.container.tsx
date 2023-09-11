import React from 'react'
import { PerfilCardDesign, CustomGoogleButton, PerfilFooter, PerfilCardContent } from './PerfilCard.design'
import { useAuth } from '../../Common'
import packagejson from '../../../package.json'
import { PerfilCardChildrenWrapper } from './PerfilCard.styled'

const PerfilCardContainer = () => {
  const { loginWithGoogle, perfil, loading } = useAuth()
  return (
    <PerfilCardDesign avatar_url={perfil?.picture} >
      <PerfilCardChildrenWrapper>
        {
          perfil?.hasOwnProperty('email')
            ? <PerfilCardContent perfil={perfil} />
            : <CustomGoogleButton onClick={loginWithGoogle} loading={loading} />
        }
      </PerfilCardChildrenWrapper>
      <PerfilFooter author={packagejson.author} version={packagejson.version} />
    </PerfilCardDesign>
  )
}

export default PerfilCardContainer