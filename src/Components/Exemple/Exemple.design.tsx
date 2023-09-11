import React from 'react'
import { ExempleLayoutWrapper } from './Exemple.styled'
import { useNavigate } from 'react-router-dom'

const ExempleComponentDesign = () => {
  const navigate = useNavigate()
  return (
    <ExempleLayoutWrapper onClick={() => navigate(-1)}>
      ExempleComponentDesign
    </ExempleLayoutWrapper>
  )
}

export default ExempleComponentDesign