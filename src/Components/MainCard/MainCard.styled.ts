import styled from "@emotion/styled";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";

const flexDirectionCol = `
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const MainCardLayoutWrapper = styled(Paper)`
  border-radius: .64rem;
  min-width: 250px;
  width: fit-content;
  height: 320px;
  ${flexDirectionCol}
  justify-content: space-between;
  overflow: hidden;
`


// variavel responsável por definir o tamanho do componente avatar
const avatarSize = 64
// o margem inferior deve ser metade do tamanho do avatar para garantir 
// que o avatar fique na metade da linha inferior di box em que se localiza 
const avatarOffset = avatarSize / 2.5
// fator de incremento para a logo 
const incrementSizeFactor = 1.6
// defina o tamanho da logo com base no avatar
const logoSize = avatarSize * incrementSizeFactor

export const MainCardHeaderWrapper = styled(Box)`
  background: #0066cc;
  width: 100%;
  height: 80px;
  ${flexDirectionCol}
  justify-content: center;
  flex-direction: row;
  position: relative;
`

export const PerfilAvatar = styled(Avatar)`
  width: ${avatarSize}px;
  height: ${avatarSize}px;
  bottom: -${avatarOffset}px;
  position: absolute;
`

export const PerfilInfoWrapper = styled(Box)`
 width: 100%;
 padding: 0 1rem ;
`

export const PerfilInfoViewer = styled(Typography)`
  font-weight: 400;
  margin: .16rem 0;
  height: 50%;
  display: flex;
  flex-direction: column;
  line-height: .9rem;
  & span {
    opacity: .64;
    font-weight: 800;
    font-size: .8rem;
  }
`

export const PerfilLogo = styled.img`
  width: ${logoSize}px;
  height: ${logoSize}px;
  position: absolute;
  opacity: .8;
`

export const FooterButtonWrapper = styled(Button)`
  ${flexDirectionCol}
  background: #4d4d4d;
  border-radius: 0;
  border-top: 1px solid #2d2d2d;
  justify-content: center;
  height: 40px;
  width: 100%;
  &:hover {
    background: #5d5d5d;
  }
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

export const MainCardContentWrapper = styled(Box)`
  ${flexDirectionCol}
  padding-top: ${avatarOffset}px;
  justify-content: center;
  height: 200px;
  width: 100%;
`

