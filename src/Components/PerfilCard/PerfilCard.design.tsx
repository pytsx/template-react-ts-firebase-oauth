import React from 'react'
import { LoginButton, LoginButtonText, PerfilAvatar, PerfilCardLayoutWrapper, FooterWrapper, PerfilHeaderWrapper, FooterTitle, PersilCardContentWrapper } from './PerfilCard.styled'
import { FaGoogle } from 'react-icons/fa'
import logo from '../../assets/logo_1.png'
import { IChildren, useAuth } from '../../Common'
import { Stack, Typography } from '@mui/material'

interface IPerfilCardDesign extends IChildren {
  avatar_url: string
}

// definição do componente principais que será exportado
export const PerfilCardDesign = ({ children, avatar_url }: IPerfilCardDesign) => {
  return (
    <PerfilCardLayoutWrapper>
      <PerfilHeader avatar_url={avatar_url} />
      {children}
    </PerfilCardLayoutWrapper>
  )
}


export const PerfilCardContent = ({ perfil }: { perfil: any }) => {
  return (
    <PersilCardContentWrapper sx={{}}>
      <Typography>
        {perfil?.id}
      </Typography>
      <Typography>
        {perfil?.email}
      </Typography>
      <Typography>
        {perfil?.verified_email}
      </Typography>
      <Typography>
        {perfil?.name}
      </Typography>
      <Typography>
        {perfil?.locale}
      </Typography>

    </PersilCardContentWrapper>
  )
}

//  definição dos componentes auxiliares:

export const CustomGoogleButton = ({ onClick }: { onClick: () => void }) => {

  const handleClick = () => {
    onClick()
  }
  return (
    <LoginButton onClick={() => handleClick()} >
      <FaGoogle />
      <LoginButtonText variant='button'>
        continuar com <span>google</span>
      </LoginButtonText>
    </LoginButton>
  )
}

const PerfilHeader = ({ avatar_url }: { avatar_url: string }) => {
  return (
    <PerfilHeaderWrapper>
      <PerfilAvatar src={avatar_url ? avatar_url : logo} variant={avatar_url ? 'circular' : 'square'} />
    </PerfilHeaderWrapper>
  )
}

export const PerfilFooter = ({ version }: { version: string | number | undefined }) => {
  return (
    <FooterWrapper>
      <FooterTitle>
        <span>pytsx</span> (v{version})
      </FooterTitle>
    </FooterWrapper>
  )
}

export const ProfileLoader = () => {

}