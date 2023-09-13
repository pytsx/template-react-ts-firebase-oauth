import React from "react"
import { IChildren, statusEnum } from "../Types"
import { moduleFirebase, moduleGoogleAuth } from "../Module"
// CONTEXTO DE AUTENTICAÇÃO
// Responsável por autenticar os usuários que tentam fazer login 

// tipagem do contexto
type perfilType = {
  [key: string]: string
}
interface IAuthContext {
  loginWithGoogle: () => void
  perfil: perfilType | undefined
  addPerfilProperty: (property: [string, string]) => void
  authStatus: statusEnum
  logout: () => void
}

// definição do contexto do contexto de autenticação 
// implementa a interface IAuthContext
const AuthContext = React.createContext<IAuthContext>({
  loginWithGoogle: () => { },
  perfil: undefined,
  addPerfilProperty: () => { },
  authStatus: 'ERROR',
  logout: () => { }
})

// definição do Provider do contexto de autenticação
// props implementa a interface: IChildren
export const AuthProvider = ({ children }: IChildren) => {
  // definição do estado responsácel por armazenar o perfil 
  // encontrado a partir das credenciais do usuário
  const [perfil, setPerfil] = React.useState<perfilType | undefined>(undefined)
  // definição do estado responsável por armazenar o status da autenticação 
  const [authStatus, setAuthStatus] = React.useState<statusEnum>('ERROR')

  // funcão de dependência do módulo moduleGoogleAuth 
  // responsável por atribuir os valores de retorno 
  // do módulo e registrar os dados no estato 'perfil'
  function handlePerfilData(data: any) {
    let appPerfil = Object.create(data)
    setPerfil(appPerfil)
  }

  // função para adicionar novas propriedades ao perfil 
  function addPerfilProperty(property: [string, string]) {
    setPerfil(prev => {
      prev![property[0]] = property[1]
      return prev
    })
  }

  // funcão de dependência do módulo moduleGoogleAuth 
  // responsável por atribuir o valor do estado authStatus
  function handleAuthStatus(option: statusEnum) {
    setAuthStatus(option)
  }

  // intancia o módulo moduleGoogleAuth, 
  // e expõe ao contexto a função loginWithGoogle
  // dependência: handlePerfilData
  const { loginWithGoogle } = moduleGoogleAuth({ handlePerfilData, handleAuthStatus, authStatus })

  function logout() {
    setPerfil(undefined)
    setAuthStatus("ERROR")
  }

  return (
    <AuthContext.Provider value={{ loginWithGoogle, perfil, addPerfilProperty, authStatus, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// definição do hook responsável por acessar o contexto
// e disponibilizar as variáveis e as funções definidar na
// interface IAuthContext
export const useAuth = () => React.useContext(AuthContext)