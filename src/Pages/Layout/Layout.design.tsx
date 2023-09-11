import React from 'react'
import { LayoutWrapper } from './Layout.styled'
import { Outlet } from 'react-router-dom'
import { useTheme } from '@mui/material'

const LayoutDesign = () => {
  const theme = useTheme()
  return (
    <LayoutWrapper theme={theme}>
      <Outlet />
    </LayoutWrapper>
  )
}

export default LayoutDesign