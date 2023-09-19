import { TokenResponse, useGoogleLogin } from "@react-oauth/google"
import { IModuleGoogleAuth } from "./googleAuth.interface"
import { fetchGooglePerfilAdapter } from "./fetchPerfil.adapter"

export function googleAuthAdapter({ handlePerfilData, handleAuthStatus }: IModuleGoogleAuth) {
  /**
   * lida com a autenticação do usuário usando credenciais do Google
   * armazena as credentialis no estado userCredentials
   * retorna um boolean para indicar o status da autenticação
  **/
  function autenticateWithGoogle(response: TokenResponse) {
    // garanta que o estado status estaja LOADING
    handleAuthStatus('LOADING')

    fetchGooglePerfilAdapter(response.access_token)
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

  return {
    initGoogleAuthentication
  }

}