// SystemManager
import React from 'react'
import { useAuth, useFirebase } from '../../Common'
import SystemManagerDesign from './SystemManager.design'

const SystemManagerContainer = () => {
  const { loginWithGoogle, authStatus, logoutGoogle } = useAuth()
  const { getUser, firebaseStatus } = useFirebase()

  return (
    <SystemManagerDesign
      systemStatus={[
        {
          service: 'OAuth',
          status: authStatus,
          action:
            authStatus == 'OK'
              ? logoutGoogle
              : authStatus == 'LOADING' 
              ? logoutGoogle
              :loginWithGoogle
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