import styled from "@emotion/styled";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";

const flexDirectionCol = `
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const PerfilCardLayoutWrapper = styled(Paper)`
  border-radius: .64rem;
  min-width: 280px;
  min-height: 320px;
  ${flexDirectionCol}
  justify-content: space-between;
  overflow: hidden;
`

export const LoginButton = styled(Button)`
  display: flex;
  gap: .64rem;
  padding:.4rem  1.28rem;
  
`

export const LoginButtonText = styled(Typography)`
  text-transform: lowercase;
  & span {
    text-transform: capitalize;
  }
`


const avatarSize = 64
const avatarMarginButton = avatarSize / 2.5

export const PerfilHeaderWrapper = styled(Box)`
  background: #0066cc;
  width: 100%;
  height: 25%;
  ${flexDirectionCol}
  justify-content: end;
  margin-bottom: ${avatarMarginButton}px;
`

export const PerfilAvatar = styled(Avatar)`
  width: ${avatarSize}px;
  height: ${avatarSize}px;
  margin-bottom: -${avatarMarginButton}px;
`

export const FooterWrapper = styled(Box)`
  ${flexDirectionCol}
  justify-content: center;
  min-height: 25%;
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