import React from 'react'
import { LoginButton, LoginButtonText, PerfilAvatar, PerfilCardLayoutWrapper, FooterWrapper, PerfilHeaderWrapper, FooterTitle } from './PerfilCard.styled'
import { FaGoogle } from 'react-icons/fa'
import { useConfig } from '../../Common'
import logo from '../../assets/logo_1.png'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  return (
    <LoginButton onClick={() => navigate('/exemple')} >
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
      <PerfilAvatar src={logo} variant='square' />
    </PerfilHeaderWrapper>
  )
}

const PerfilFooter = () => {
  return (
    <FooterWrapper>
      <FooterTitle>
        <span>pytsx</span> (v0.1.1)
      </FooterTitle>
    </FooterWrapper>
  )
}
