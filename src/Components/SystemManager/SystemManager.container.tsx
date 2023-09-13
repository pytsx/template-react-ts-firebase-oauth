// SystemManager
import React from 'react'
import { useAuth, useFirebase } from '../../Common'
import SystemManagerDesign from './SystemManager.design'

const SystemManagerContainer = () => {
  const { perfil, loginWithGoogle, authStatus, logout } = useAuth()
  const { getUser, firebaseStatus } = useFirebase()

  return (
    <SystemManagerDesign
      systemStatus={[
        {
          service: 'OAuth',
          status: authStatus,
          action:
            authStatus == 'OK'
              ? logout
              : authStatus == 'ERROR'
                ? loginWithGoogle
                : () => { }
        },
        {
          service: 'firebase',
          status: firebaseStatus,
          action:
            firebaseStatus == 'OK'
              ? () => { }
              : getUser,
          disabled: authStatus == 'OK' ? false : true
        },
        {
          service: 'stripe',
          status: 'ERROR',
          action: () => { },
          disabled: true
        }
      ]} />
  )
}

export default SystemManagerContainer