import React from "react"
import { IChildren, statusEnum } from "../Types"
import { moduleFirebase } from "../Module"
import { useAuth } from "./auth"

// CONTEXTO DE Firebase
// Responsável por 

// tipagem do contexto
interface IFirebaseContext {
  getUser: () => void
  firebaseStatus: statusEnum
}

// definição do contexto
// implementa a interface IFirebaseContext
const FirebaseContext = React.createContext<IFirebaseContext>({
  getUser: () => { },
  firebaseStatus: 'ERROR'
})

// definição do Provider do contexto 
// props implementa a interface: IChildren
export const FirebaseProvider = ({ children }: IChildren) => {

  // acesse as informações de perfil presentes no contexto 
  // AuthContext
  const { perfil, addPerfilProperty } = useAuth()

  // acesse o módulo do firebase para expor as funções 
  // do firebase para o contexto 
  const { getDataByGroup, writeDBData } = moduleFirebase()

  // definição do estado responsável por armazenar o Status da conexão/consulta 
  const [firebaseStatus, setFirebaseStatus] = React.useState<statusEnum>('ERROR')

  // getUser() é a função responsável por consultar a presença do usuário dentro do bando de dados 
  function getUser() {
    console.log('get user')

    // defina o caminho dentro do banco de dados onde está armazenado o grupo de usuários
    const userGroupPath = 'users'

    // definir o status da conexão para LOADING, esse status vai mudar apenas se os dados forem encontrados ou não
    setFirebaseStatus('LOADING')

    /**
    * para evitar possiveis erros 
    * verifica se existe a propriedade id dentro de perfil 
    * para que seja possível prosseguir com a consulta 
    * ao banco de dados
    **/
    if (perfil?.id == undefined) return

    // função do módulo firebase responsável por encontrar um dado a partir do id e/ou do grupo o id é optativo, mas como queremos identificar 1 usuário específico, é importante passar o id para localizar o usuário desejado dentro do grupo de usuários
    getDataByGroup({
      group: userGroupPath,
      id: perfil?.id
    })
      // a função aplica uma Promise, portanto é importante capturar o que é resolvido pela Promise 
      .then(data => {
        // verifica se o perfil já armazenado na aplicação é igual ao perfil armazenado no banco de dados e, caso seja, retorna e previne executar desnecessáriamente o código imediatamente abaixo
        if (JSON.stringify(perfil) == JSON.stringify(data)) return

        // percorra os dados encontrados no banco de dados e adicione cada propriedade do obj ao perfil
        /**
          * OBS.: o objeto perfil é um Prototype.
          * Ou melhor, o protótipo do perfil armazena a resposta que recebemos da api de autenticação do google.
          * Isso significa que propriedades como name, id, email, locate, etc. já estão presentes no objeto perfil, mesmo estando vazio perfil = {}
          * Porém essas propriedades podem ser sobreescritas caso seja definida uma propriedade de mesmo nome no obj perfil
          * Ou seja, caso o usuário tenha um email cadastrado no banco de dados firebase, o email do registrado no firebase será levado 
          * em conta, mas no protótipo do obj perfil ainda existirá o email do google 
          * 
        **/
        for (let key in data) {
          addPerfilProperty([key, data[key]])
        }

        // caso a promise seja resolvida, ou seja, caso recebebamos uma resposta positiva do servidor com as informações do usuário,  o status será definido para OK
        setFirebaseStatus('OK')
      })
      // além disso, é importante capturar o que é ejetado pela Promise
      .catch((error) => {
        writeDBData({ group: 'users', data: perfil })
        // caso algum erro seja ejetado, o status é definido para ERROR 
        setFirebaseStatus('LOADING')
        throw new Error('erro ao acessar o bando de dados -> ' + error.message)
      })
  }

  // useEffect responsável por observar mudanças no perfil
  // caso o perfil seja definido para undefined e o status da conexão seja diferente de ERROR, mudamos o status da conexão para EROOR
  React.useEffect(() => {
    if (perfil == undefined && firebaseStatus != 'ERROR') {
      setFirebaseStatus('ERROR')
    }
  }, [perfil])

  return (
    <FirebaseContext.Provider value={{ getUser, firebaseStatus }}>
      {children}
    </FirebaseContext.Provider>
  )
}

// definição do hook responsável por acessar o contexto
// e disponibilizar as variáveis e as funções definidar na
// interface IFirebaseContext
export const useFirebase = () => React.useContext(FirebaseContext)