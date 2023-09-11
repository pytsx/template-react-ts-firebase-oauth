import React from "react"
import { IChildren } from "../Types"

// CONTEXTO DE AUTENTICAÇÃO
// Responsável por autenticar os usuários que tentam fazer login 

// tipagem do contexto
interface IAuthContext {
}

// definição do contexto do contexto de autenticação 
// implementa a interface IAuthContext
const AuthContext = React.createContext<IAuthContext>({
})

// definição do Provider do contexto de autenticação
// props implementa a interface: IChildren
export const AuthProvider = ({ children }: IChildren) => {

  // definição do estado responsável por armazenar a responsta 
  // do servidor com as credenciais do usuário  
  const [credentials, setCredentials] = React.useState()

  // definição do estado responsácel por armazenar o perfil 
  // encontrado a partir das credenciais do usuário
  const [perfil, setPerfil] = React.useState()

  function login() {

  }

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

// definição do hook responsável por acessar o contexto
// e disponibilizar as variáveis e as funções definidar na
// interface IAuthContext
export const useAuth = () => React.useContext(AuthContext)