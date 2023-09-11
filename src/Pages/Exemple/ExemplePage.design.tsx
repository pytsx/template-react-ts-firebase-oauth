// ExemplePage

import React from 'react'
import { ExemplePageWrapper } from './ExemplePage.styled'
import { ExempleComponent } from '../../Components/Exemple'

const ExemplePageDesign = () => {
  return (
    <ExemplePageWrapper>
      <iframe title='teste' style={{ border: "1px solid rgba(0, 0, 0, 0.1);" }} width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F8yoAhPJfmcJyNPGFklzJz4%2Ftemplate-react-ts-project%3Ftype%3Dwhiteboard%26node-id%3D1%253A424%26t%3DSKOzT3Qcu47tcx0C-1"></iframe>

      <ExempleComponent />
    </ExemplePageWrapper>
  )
}

export default ExemplePageDesign