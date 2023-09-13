// SystemManager
import React from 'react'
import { ServiceTextWrapper, SystemManagerLayoutWrapper, ServiceStatusView, ServiceDisplayInfoWrapper, ServiceActionWrapper } from './SystemManager.styled'
import { IconButton, useTheme } from '@mui/material'
import { MdReplay, MdPlayArrow, MdStop } from 'react-icons/md'
import { ISystemManagerDesign, systemStatusType } from '../../Common'

const SystemManagerDesign = ({ systemStatus }: ISystemManagerDesign) => {

  return (
    <SystemManagerLayoutWrapper >
      {
        systemStatus.map((data: systemStatusType) => (
          <Service data={data} key={JSON.stringify(data)} />
        ))
      }
    </SystemManagerLayoutWrapper>
  )
}

export default SystemManagerDesign

// compoentes auxiliares ao layout principal 

const Service = ({ data }: { data: systemStatusType }) => {
  const theme = useTheme()
  const [hover, setHover] = React.useState(false)

  function handleHover(option: boolean) {
    if (data.disabled) return
    setHover(option)
  }

  React.useEffect(() => {
    if (hover == false) return
    setHover(false)
  }, [data.status])
  return (

    <ServiceDisplayInfoWrapper
      status={data.status}
      theme={theme}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      disabled={data.disabled}
    >
      <ServiceTextWrapper>
        {data.service}
      </ServiceTextWrapper>
      <ServiceActionWrapper>

        {
          hover
            ? <ActionButton
              action={data.action}
              service={data.service}
              status={data.status} />
            : <ServiceStatusView status={data.status} theme={theme} />
        }
      </ServiceActionWrapper>
    </ServiceDisplayInfoWrapper>
  )
}


const ActionButton = ({ status, action }: systemStatusType) => {
  const theme = useTheme()
  return (
    <IconButton
      onClick={() => action()}
      size='small'
      sx={{
        color: status == 'OK'
          ? theme.palette.success.main
          : status == 'LOADING'
            ? theme.palette.warning.main
            : theme.palette.error.main
      }}>
      {
        status == 'ERROR'
          ? <MdPlayArrow />
          : status == 'OK'
            ? <MdStop />
            : <MdReplay />
      }
    </IconButton>
  )
}