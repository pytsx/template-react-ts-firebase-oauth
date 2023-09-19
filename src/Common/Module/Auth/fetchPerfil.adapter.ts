
// Esta função busca informações de perfil no API do Google com base no token fornecido.
export async function fetchGooglePerfilAdapter(access_token: string): Promise<any> {

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