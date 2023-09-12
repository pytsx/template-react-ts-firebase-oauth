import React from 'react'
import {
  LoginButton,
  LoginButtonText,
  PerfilAvatar,
  PerfilCardLayoutWrapper,
  FooterButtonWrapper,
  PerfilHeaderWrapper,
  FooterTitle,
  PerfilCardContentWrapper,
  PerfilLogo,
} from './PerfilCard.styled'
import { FaGoogle } from 'react-icons/fa'
import logo from '../../assets/logo.svg'
import { IChildren } from '../../Common'
import { CircularProgress, Typography } from '@mui/material'

type avatarUrlType = string
interface IPerfilProps {
  avatar_url?: avatarUrlType
  author?: string,
  version?: string | number | undefined
}

interface IPerfilCardDesign extends IChildren, IPerfilProps { }

// definição do componente principais que será exportado
export const PerfilCardDesign = ({ children, avatar_url }: IPerfilCardDesign) => {
  return (
    <PerfilCardLayoutWrapper>
      <PerfilHeader avatar_url={avatar_url} />

      {children}

    </PerfilCardLayoutWrapper>
  )
}

//  definição dos componentes auxiliares:

// componente que exibe as informações do perfil do usuário
// essas informações devem passar por uma normalização no container 
// para que independente do provedor, os dados sejam exidos corretamente no design
export const PerfilCardContent = ({ perfil }: { perfil: any }) => {
  return (
    <PerfilCardContentWrapper sx={{}}>
      <Typography>
        {perfil?.id}
      </Typography>
      <Typography>
        {perfil?.email}
      </Typography>
      <Typography>
        {perfil?.name}
      </Typography>
      <Typography>
        {perfil?.locale}
      </Typography>

    </PerfilCardContentWrapper>
  )
}

// componente responsável por exibir e permitir interação com a api de autenticação do google 
// esse botão apenas cria o design do botão 
export const CustomGoogleButton = ({ onClick, loading }: { onClick: () => void, loading: boolean }) => {

  return (
    <>
      {loading
        ? <CircularProgress />
        : <LoginButton onClick={() => onClick()} >
          <FaGoogle />
          <LoginButtonText variant='button'>
            continuar com <span>google</span>
          </LoginButtonText>
        </LoginButton>
      }
    </>
  )
}

// definição do componente responsável por exibir a imagem de perfil do usuário 
// ou, caso ainda não tenho nenhum usuário logado, exibe um svg padrão 
const PerfilHeader = ({ avatar_url }: IPerfilProps) => {
  return (
    <PerfilHeaderWrapper>
      {avatar_url ? <PerfilAvatar src={avatar_url} variant={'circular'} /> : <PerfilLogo src={logo} alt='logo' />}
    </PerfilHeaderWrapper>
  )
}

// definição do componente responsável por exibir informações do criador do projeto e 
// da versão atual do projeto 
export const PerfilFooter = ({ author, version }: IPerfilProps) => {
  return (
    <FooterButtonWrapper>
      <FooterTitle>
        <span>{author}</span> (v{version})
      </FooterTitle>
    </FooterButtonWrapper>
  )
}
