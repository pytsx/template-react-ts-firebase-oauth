import styled from "@emotion/styled";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";

const flexDirectionCol = `
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const PerfilCardLayoutWrapper = styled(Paper)`
  border-radius: .64rem;
  min-width: 250px;
  width: fit-content;
  height: 320px;
  ${flexDirectionCol}
  justify-content: space-between;
  overflow: hidden;
`

export const LoginButton = styled(Button)`
  display: flex;
  gap: .64rem;
  margin: 0 1.2rem;
  padding:.4rem  1.28rem;
  
`

export const LoginButtonText = styled(Typography)`
  text-transform: lowercase;
  & span {
    text-transform: capitalize;
  }
`

// variavel responsável por definir o tamanho do componente avatar
const avatarSize = 64
// o margem inferior deve ser metade do tamanho do avatar para garantir 
// que o avatar fique na metade da linha inferior di box em que se localiza 
const avatarMarginButton = avatarSize / 2.5
// fator de incremento para a logo 
const incrementSizeFactor = 1.6
// defina o tamanho da logo com base no avatar
const logoSize = avatarSize * incrementSizeFactor

export const PerfilHeaderWrapper = styled(Box)`
  background: #0066cc;
  width: 100%;
  height: 80px;
  ${flexDirectionCol}
  justify-content: end;
  margin-bottom: ${avatarMarginButton}px;
`

export const PerfilAvatar = styled(Avatar)`
  width: ${avatarSize}px;
  height: ${avatarSize}px;
  margin-bottom: -${avatarMarginButton}px;
`
export const PerfilLogo = styled.img`
  width: ${logoSize}px;
  height: ${logoSize}px;
  opacity: .8;
`

export const FooterWrapper = styled(Box)`
  ${flexDirectionCol}
  border-top: 1px solid #2d2d2d;
  justify-content: center;
  min-height: 40px;
  width: 100%;
`

export const FooterTitle = styled(Typography)`
  font-weight: 500;
  color: #9d9d9d;
  font-size: 12px;
  letter-spacing: 0rem;
  &:first-letter{
    text-transform: uppercase;
  };
  & span {
    text-transform: capitalize;
    color: #c9c9c9;
    margin-right: .08rem;
  }
`

export const PerfilCardContentWrapper = styled(Box)`
  ${flexDirectionCol}
  margin: 0 1.2rem;
  width: 100%;
  height: 60%;
  justify-content: center;
  gap: .32rem;
`

export const PerfilCardChildrenWrapper = styled(Box)`
  ${flexDirectionCol}
  justify-content: center;
  height: 200px;

`