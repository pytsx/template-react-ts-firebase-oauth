import React from "react"
import { IChildren } from "../Types"
import { env } from "../Config/env.singleton"
import { OverridableTokenClientConfig, TokenResponse, useGoogleLogin } from "@react-oauth/google"
// CONTEXTO DE AUTENTICAÇÃO
// Responsável por autenticar os usuários que tentam fazer login 

// tipagem do contexto
interface IAuthContext {
  initGoogleAuthentication: (overrideConfig?: OverridableTokenClientConfig | undefined) => void
  perfil: any
  loading: boolean
}

// definição do contexto do contexto de autenticação 
// implementa a interface IAuthContext
const AuthContext = React.createContext<IAuthContext>({
  initGoogleAuthentication: () => { },
  perfil: {},
  loading: false
})

// definição do Provider do contexto de autenticação
// props implementa a interface: IChildren
export const AuthProvider = ({ children }: IChildren) => {

  // definição do estado responsável por armazenar a responsta 
  // do servidor com as credenciais do usuário  
  const [userCredentials, setUserCredentials] = React.useState<any>()

  // definição do estado responsácel por armazenar o perfil 
  // encontrado a partir das credenciais do usuário
  const [perfil, setPerfil] = React.useState()
  const [loading, setLoading] = React.useState<boolean>(false)

  /**
   * lida com a autenticação do usuário usando credenciais do Google
   * armazena as credentialis no estado userCredentials
   * retorna um boolean para indicar o status da autenticação
  **/
  function autenticateWithGoogle(response: TokenResponse) {
    setUserCredentials(response)
    return {
      ok: !!response.access_token,
      access_token: response.access_token
    }
  }

  function handleGoogleLogin(codeResponse: TokenResponse) {
    setLoading(true)
    const { ok, access_token } = autenticateWithGoogle(codeResponse)
    if (!ok) {
      setLoading(false)
    }

    fetchGoolePerfil(access_token)
  }


  /**
   *  inicializar a autenticação com o Google e usa a biblioteca 
   * useGoogleLogin. Define callbacks de sucesso e erro para lidar 
   * com o resultado da autenticação 
  **/
  const initGoogleAuthentication = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: (e) => {
      console.log(e)
      setLoading(false)
    }
  })

  // Esta função busca informações de perfil no API do Google com base no token fornecido.
  function fetchGoolePerfil(access_token: string): any {

    // Faz uma solicitação à API do Google OAuth para obter informações de perfil,
    // usando o token de acesso fornecido nas credenciais do usuário.
    // @ts-ignore
    fetch(import.meta.env.VITE_GOOGLE_API_URL + access_token, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json'
      }
    })
      .then((res) => {
        // Verifica se a resposta HTTP está OK (status 200).
        if (res.ok) {
          // Converte os dados da resposta em formato JSON.
          return res.json()
        } else {
          setLoading(false)
          // Lança uma exceção em caso de erro na resposta HTTP, com uma mensagem de erro.
          throw new Error('erro ao acessar o perfil ' + res)
        }
      })
      .then((data) => {
        // Define o perfil do usuário com os dados obtidos da resposta da API.
        setPerfil(data)

      })
      .catch((err) => {
        setLoading(false)
        // Em caso de qualquer erro durante a solicitação ou processamento dos dados,
        // lança uma exceção com uma mensagem de erro.
        throw new Error('erro ao acessar o perfil ' + err)
      })

  }

  return (
    <AuthContext.Provider value={{ initGoogleAuthentication, perfil, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// definição do hook responsável por acessar o contexto
// e disponibilizar as variáveis e as funções definidar na
// interface IAuthContext
export const useAuth = () => React.useContext(AuthContext)