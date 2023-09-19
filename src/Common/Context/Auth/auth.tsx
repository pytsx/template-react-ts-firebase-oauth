import React from "react"
import { IChildren, statusEnum } from "../../Types"
import { googleAuthAdapter } from "../../Module"
import { IAuthContext, perfilType } from "./auth.interface"
// CONTEXTO DE AUTENTICAÇÃO
// Responsável por autenticar os usuários que tentam fazer login e gerenciar informações de perfil e status de autenticação.


// CONTEXT
const AuthContext = React.createContext<IAuthContext>({
  loginWithGoogle: () => { },
  perfil: undefined,
  addPerfilProperty: () => { },
  authStatus: 'ERROR',
  logoutGoogle: () => { }
})

// PROVIDER
export const AuthProvider = ({ children }: IChildren) => {
  const [perfil, setPerfil] = React.useState<perfilType | undefined>(undefined)
  const [authStatus, setAuthStatus] = React.useState<statusEnum>('ERROR')

  // Esta função trata os dados do perfil do usuário obtidos da API de autenticação do Google.
  function handlePerfilData(data: any) {
    let appPerfil = Object.create(data)
    setPerfil(appPerfil)
  }

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
  const { initGoogleAuthentication } = googleAuthAdapter({handleAuthStatus, handlePerfilData })

  // função responsável por intermediar o módulo com o core possibilitando o login
  function loginWithGoogle() {
    handleAuthStatus("LOADING")
    initGoogleAuthentication()
  }

  function logoutGoogle() {
    setPerfil(undefined)
    setAuthStatus("ERROR")
  }

  return (
    <AuthContext.Provider value={{ loginWithGoogle, perfil, addPerfilProperty, authStatus, logoutGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

// HOOK
export const useAuth = () => React.useContext(AuthContext)