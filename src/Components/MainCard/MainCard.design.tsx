import {
  PerfilAvatar,
  MainCardLayoutWrapper,
  FooterButtonWrapper,
  FooterTitle,
  MainCardContentWrapper,
  PerfilLogo,
  MainCardHeaderWrapper,
  PerfilInfoViewer,
  PerfilInfoWrapper,
} from './MainCard.styled'
import logo from '../../assets/logo.svg'
import { SystemManager } from '../SystemManager'
import { Typography } from '@mui/material'

type avatarUrlType = string

interface IMainCardProps {
  perfil?: any
  author?: string,
  version?: string | number | undefined
}

// definição do componente principais que será exportado
export const MainCardDesign = ({ perfil, author, version }: IMainCardProps) => {
  return (
    <MainCardLayoutWrapper>
      <MainCardHeader perfil={perfil} />

      <MainCardContentWrapper>
        <SystemManager />
      </MainCardContentWrapper>

      <MainCardFooter author={author} version={version} />

    </MainCardLayoutWrapper>
  )
}

//  definição dos componentes auxiliares:

// definição do componente responsável por exibir a imagem de perfil do usuário 
// ou, caso ainda não tenho nenhum usuário logado, exibe um svg padrão 
const MainCardHeader = ({ perfil }: IMainCardProps) => {
  return (
    <MainCardHeaderWrapper>
      {
        perfil !== undefined
          ? <PerfilInfoWrapper>
            <PerfilInfoViewer>
              <span>followers</span>
              {perfil?.followers || '-'}
            </PerfilInfoViewer>
            <PerfilInfoViewer>
              <span>posts</span>
              {perfil?.posts || '-'}
            </PerfilInfoViewer>
          </PerfilInfoWrapper>
          : ''
      }


      {perfil !== undefined ? <PerfilAvatar src={perfil!.picture} variant={'circular'} /> : <PerfilLogo src={logo} alt='logo' />}
    </MainCardHeaderWrapper>
  )
}

// definição do componente responsável por exibir informações do criador do projeto e 
// da versão atual do projeto 
export const MainCardFooter = ({ author, version }: IMainCardProps) => {
  return (
    <FooterButtonWrapper>
      <FooterTitle>
        <span>{author}</span> (v{version})
      </FooterTitle>
    </FooterButtonWrapper>
  )
}
