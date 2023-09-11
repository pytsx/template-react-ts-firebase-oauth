import React from "react"
import { IChildren } from "../Types"
import { moduleGoogleAuth } from "../Module"
// CONTEXTO DE AUTENTICAÇÃO
// Responsável por autenticar os usuários que tentam fazer login 

// tipagem do contexto
type perfilType = {
  [key: string]: string
}
interface IAuthContext {
  loginWithGoogle: () => void
  perfil: perfilType | undefined
  loading: boolean
}

// definição do contexto do contexto de autenticação 
// implementa a interface IAuthContext
const AuthContext = React.createContext<IAuthContext>({
  loginWithGoogle: () => { },
  perfil: undefined,
  loading: false
})

// definição do Provider do contexto de autenticação
// props implementa a interface: IChildren
export const AuthProvider = ({ children }: IChildren) => {

  // definição do estado responsácel por armazenar o perfil 
  // encontrado a partir das credenciais do usuário
  const [perfil, setPerfil] = React.useState<perfilType | undefined>(undefined)
  // definição do estado responsácel por armazenar o status do contexto
  const [loading, setLoading] = React.useState<boolean>(false)

  // funcão de dependência do módulo moduleGoogleAuth 
  // responsável por atribuir os valores de retorno 
  // do módulo e registrar os dados no estato 'perfil'
  function handlePerfilData(data: any) {
    setPerfil(data)
  }

  // funcão de dependência do módulo moduleGoogleAuth 
  // responsável por atribuir o valor do estado loading
  function toogleLoader(option?: boolean) {
    setLoading(prev => option ? option : !prev)
  }

  // intancia o módulo moduleGoogleAuth, 
  // e expõe ao contexto a função loginWithGoogle
  // dependência: handlePerfilData
  const { loginWithGoogle } = moduleGoogleAuth({ handlePerfilData, toogleLoader })



  return (
    <AuthContext.Provider value={{ loginWithGoogle, perfil, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// definição do hook responsável por acessar o contexto
// e disponibilizar as variáveis e as funções definidar na
// interface IAuthContext
export const useAuth = () => React.useContext(AuthContext)