import { TokenResponse, useGoogleLogin } from "@react-oauth/google"
import { statusEnum } from "../Types"

// define a interface do module googleAuth 
interface IModuleGoogleAuth {
  handlePerfilData: (data: any) => void
  handleAuthStatus: (option: statusEnum) => void
  authStatus: statusEnum
}

// Module Pattern responsável por gerenciar a autenticação do usuário 
export function moduleGoogleAuth({ handlePerfilData, handleAuthStatus, authStatus }: IModuleGoogleAuth) {

  /**
   * lida com a autenticação do usuário usando credenciais do Google
   * armazena as credentialis no estado userCredentials
   * retorna um boolean para indicar o status da autenticação
  **/
  function autenticateWithGoogle(response: TokenResponse) {
    // garanta que o estado status estaja LOADING
    handleAuthStatus('LOADING')

    fetchGoolePerfil(response.access_token)
      .then((data) => {
        // Define o perfil do usuário com os dados obtidos da resposta da APIGoogle.
        handlePerfilData(data)
        handleAuthStatus('OK')
      })
      .catch((error) => {
        throw new Error('error ao logar: ' + error.message)
      })
    return !!response.access_token
  }

  /**
   *  inicializar a autenticação com o Google e usa a biblioteca 
   * useGoogleLogin. Define callbacks de sucesso e erro para lidar 
   * com o resultado da autenticação 
  **/
  const initGoogleAuthentication = useGoogleLogin({
    onSuccess: autenticateWithGoogle,
    onError: (e) => {
      console.log('erro ao iniciar autenticação com google: ' + e)
    }
  })

  // Esta função busca informações de perfil no API do Google com base no token fornecido.
  async function fetchGoolePerfil(access_token: string): Promise<any> {

    /** 
    *  Faz uma solicitação à API do Google OAuth para obter informações de perfil,
    *  usando o token de acesso fornecido nas credenciais do usuário.
    *  a url deve estar presente na variável global VITE_GOOGLE_API_URL para que funcione corretamente
    *  'https://www.googleapis.com/oauth2/v1/userinfo?access_token='
    **/

    // @ts-ignore
    return fetch(import.meta.env.VITE_GOOGLE_API_URL + access_token, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json'
      }
    })
      .then((res) => {
        // Verifica se a resposta HTTP está OK (status 200).
        if (res.ok) {
          // Converte os dados da resposta em formato JSON e retorna o valor para ser acessado fora do escopo da função.

          return res.json()
        } else {
          // Lança uma exceção em caso de erro na resposta HTTP, com uma mensagem de erro.
          throw new Error('erro ao acessar o perfil ' + res)
        }
      })
      .catch((err) => {
        // Em caso de qualquer erro durante a solicitação ou processamento dos dados,
        // lança uma exceção com uma mensagem de erro.
        throw new Error('erro ao acessar o perfil ' + err)
      })
  }

  // função responsável por intermediar a implementação interna e o resto da app 
  // a função simplemente executa o inicializador de autenticação do google. 
  // Para usar basta chamar a função loginWithGoogle  - distribuída pelo contexto de Autenticação -
  // em qualquer local da aplicação, por exemplo no onClick  de um botão 
  function loginWithGoogle() {
    handleAuthStatus("LOADING")
    initGoogleAuthentication()
  }

  return {
    loginWithGoogle
  }
}