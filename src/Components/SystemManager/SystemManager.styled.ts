// SystemManager
import styled from "@emotion/styled";
import { Box, Theme, Typography } from "@mui/material";
import { statusEnum } from "../../Common";

interface IViewStatus {
  status: statusEnum
  theme: Theme
  disabled?: boolean
}

export const SystemManagerLayoutWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`

export const ServiceWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: .4rem;
`

export const ServiceDisplayInfoWrapper = styled(Box) <IViewStatus>`
  padding: .32rem .8rem;
  margin: .16rem 0rem;
  background: #2d2d2d ;
  width: 100%;
  border-radius: .32rem;
  display: flex;
  justify-content: space-between;
  border-left: 5px solid transparent;
  transition: all 200ms ease-in-out;
  opacity: ${({ disabled }) => disabled ? '.32' : '1'};
  &:hover{
    border-left: 5px solid ${({ theme, status, disabled }) =>
    status == 'OK' && !disabled
      ? `${theme.palette.success.main}64`
      : status == 'LOADING' && !disabled
        ? `${theme.palette.warning.main}64`
        : status == 'ERROR' && !disabled
          ? `${theme.palette.error.main}64`
          : '#fafafa00'
  };
    box-shadow: ${({ disabled }) => disabled ? '' : '0px 2px 4px #2d2d2d64'};
  }
`

export const ServiceTextWrapper = styled(Typography)`
  text-transform: capitalize;
`

export const ServiceActionWrapper = styled(Box)`
  width: 32px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ServiceStatusView = styled(Box) <IViewStatus>`
  width: 10px;
  height: 10px;
  background: ${({ theme, status }) => status == 'OK' ? theme.palette.success.main : status == 'LOADING' ? theme.palette.warning.main : theme.palette.error.main};
  border-radius: 50rem;
`