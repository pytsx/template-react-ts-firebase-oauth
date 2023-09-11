import styled from "@emotion/styled";
import { Box, Theme } from "@mui/material";
import { ITheme } from "../../Common";


export const LayoutWrapper = styled(Box) <ITheme>`
  background: ${({ theme }) => theme.palette.background.default};
  padding: 2rem;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: fixed;
` 