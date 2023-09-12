// SystemManager
import React from 'react'
import { useAuth, useFirebase } from '../../Common'
import SystemManagerDesign from './SystemManager.design'

const SystemManagerContainer = () => {
  const { perfil, loginWithGoogle, authStatus } = useAuth()
  const { getUser, firebaseStatus } = useFirebase()
  React.useEffect(() => {
    console.log(authStatus);

  }, [authStatus])
  return (
    <SystemManagerDesign
      systemStatus={[
        {
          service: 'OAuth',
          status: authStatus,
          action:
            authStatus == 'OK' || authStatus == 'LOADING'
              ? () => { }
              : loginWithGoogle
        },
        {
          service: 'firebase',
          status: firebaseStatus,
          action: firebaseStatus == 'OK' ? () => { } : getUser,
          disabled: authStatus == 'OK' ? false : true
        },
        {
          service: 'stribe',
          status: 'ERROR',
          action: () => { },
          disabled: true
        }
      ]} />
  )
}

export default SystemManagerContainer