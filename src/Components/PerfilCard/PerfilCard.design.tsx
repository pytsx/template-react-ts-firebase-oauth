import React from 'react'
import { LoginButton, LoginButtonText, PerfilAvatar, PerfilCardLayoutWrapper, FooterWrapper, PerfilHeaderWrapper, FooterTitle } from './PerfilCard.styled'
import { FaGoogle } from 'react-icons/fa'
import { useConfig } from '../../Common'

// definição do componente principais que será exportado
const PerfilCardtDesign = () => {
  return (
    <PerfilCardLayoutWrapper>
      <PerfilHeader />
      <CustomGoogleButton />
      <PerfilFooter />
    </PerfilCardLayoutWrapper>
  )
}

// export padrão do compoennte 
export default PerfilCardtDesign


//  definição dos componentes auxiliares:

const CustomGoogleButton = () => {
  return (
    <LoginButton >
      <FaGoogle />
      <LoginButtonText variant='button'>
        continuar com <span>google</span>
      </LoginButtonText>
    </LoginButton>
  )
}

const PerfilHeader = () => {
  return (
    <PerfilHeaderWrapper>
      <PerfilAvatar />
    </PerfilHeaderWrapper>
  )
}

const PerfilFooter = () => {
  const { env } = useConfig()
  return (
    <FooterWrapper>
      <FooterTitle>
        <span>pytsx</span> (v0.1.0)
      </FooterTitle>
    </FooterWrapper>
  )
}
