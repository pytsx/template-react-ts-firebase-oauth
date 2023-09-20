import React from "react"
import { IChildren, statusEnum } from "../../Types"
import { googleAuthAdapter } from "../../Module"
import { IAuthContext, perfilType } from "./auth.interface"
import Crypto from 'crypto-js'
import { date } from "../../Config/date.singleton"

// CONTEXTO DE AUTENTICAÇÃO
// Responsável por autenticar os usuários que tentam fazer login e gerenciar informações de perfil e status de autenticação.

const AuthContext = React.createContext<IAuthContext>({
  loginWithGoogle: () => { },
  perfil: undefined,
  addPerfilProperty: () => { },
  authStatus: 'ERROR',
  logoutGoogle: () => { }
})

// PROVIDER
// Responsável por fornecer funcionalidades de autenticação, como login, logout e gerenciamento de perfil de usuário.
export const AuthProvider = ({ children }: IChildren) => {
  const [perfil, setPerfil] = React.useState<perfilType | undefined>(undefined)
  const [authStatus, setAuthStatus] = React.useState<statusEnum>('ERROR')

  // Esta função trata os dados do perfil do usuário obtidos da API de autenticação do Google.
  function handlePerfilData(data: any) {
    if(!!!data) return
    let appPerfil = Object.create(data)
    setPerfil(appPerfil)
    localStorage.setItem('perfil', JSON.stringify(data))
  }

  // adiciona propriedades ao perfil, útil para add infos do DB 
  function addPerfilProperty(property: [string, string]) {
    setPerfil(prev => {
      prev![property[0]] = property[1]
      return prev
    })
  }

  // esta função atualiza o status de autenticação 
  function handleAuthStatus(option: statusEnum) {
    setAuthStatus(option)
  }

  // Inicialização do módulo de autenticação do Google
  // Este módulo é responsável pela integração com a autenticação do Google OAuth.
  const { initGoogleAuthentication, autenticateWithGoogle } = googleAuthAdapter({handleAuthStatus, handlePerfilData })

  // função responsável por intermediar o módulo com o core da app, desencadeando o login
  function loginWithGoogle() {
    handleAuthStatus("LOADING")
    const isPerfilStorage = !!localStorage.getItem('perfil')
    if (!isPerfilStorage){
      initGoogleAuthentication()
    } else {
      const tokenEncrypted = JSON.parse(localStorage.getItem('perfil')!).tokenResponse
      // @ts-ignore
      const bytes = Crypto.AES.decrypt(tokenEncrypted, import.meta.env.VITE_CRYPTO_KEY)
      const token = bytes.toString(Crypto.enc.Utf8)
      
      autenticateWithGoogle(JSON.parse(token))
    }
  }

  // função responsável por remover os dados do contexto e, consequentemente, deslogar o usuário
  function logoutGoogle() {
    setPerfil(undefined)
    localStorage.clear()
    setAuthStatus("ERROR")
  }

  function handleRestoragePerfil() {
    handleAuthStatus('LOADING')
    const { isTodayOrPassed } = date
    const perfilStoraged = JSON.parse(localStorage.getItem('perfil')!)
    
    if (perfilStoraged && perfil == undefined){
      if (isTodayOrPassed(perfilStoraged.expireAt)) {
        
        logoutGoogle()
      } else {
        handlePerfilData(perfilStoraged)
        handleAuthStatus('OK')
      }
    } else {
      setAuthStatus('ERROR')
    }
  }

  // verifica se, ao entrar na página, o usuário possui uma sessão armazenada no localstorage
  React.useEffect(() => {
    handleRestoragePerfil()
  }, [])

  return (
    <AuthContext.Provider value={{ loginWithGoogle, perfil, addPerfilProperty, authStatus, logoutGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

// HOOK
export const useAuth = () => React.useContext(AuthContext)