import React from "react"
import { IChildren, statusEnum } from "../../Types"
import { moduleFirebase } from "../../Module"
import { useAuth } from "../Auth/auth"

// CONTEXTO DE Firebase
// Responsável por lidar com a implementação de alguma funcionalidades do módulo firebase, como consultar o realtime database de dados específicos para aplicação 

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

  const { perfil, addPerfilProperty, authStatus } = useAuth()
  const { getDataByGroup, writeData, deleteData, updateData } = moduleFirebase()
  const [firebaseStatus, setFirebaseStatus] = React.useState<statusEnum>('ERROR')

  let counterGetUserIteration = 0
  // getUser() é a função responsável por consultar a presença do usuário dentro do bando de dados 
  function getUser() {
    // defina o caminho dentro do banco de dados onde está armazenado o grupo de usuários
    const userGroupPath = 'users'

    // definir o status da conexão 
    setFirebaseStatus('LOADING')

    // verifica se existe a propriedade id dentro de perfil para evitar possiveis erros
    if (perfil?.id == undefined) return

    // buscar um usuário no banco de dados com base no id
    getDataByGroup({
      group: userGroupPath,
      id: perfil?.id
    })
      .then((data) => {
        // percorra os dados encontrados no banco de dados e adicione cada propriedade do obj ao perfil
        for (let key in data) {
          addPerfilProperty([key, data[key]])
        }

      })
      .finally(() => {
        // caso a promise seja resolvida, ou seja, caso recebebamos uma resposta positiva do servidor com as informações do usuário,  o status será definido para OK
        setFirebaseStatus('OK')
      })
      // além disso, é importante capturar o que é ejetado pela Promise
      .catch((error) => {
        // caso algum erro seja ejetado, o status é definido para LOADING para tratarmos o erro
        setFirebaseStatus('LOADING')

        // evitar recursividade infinita permitindo 1 interação 
        if (counterGetUserIteration < 1) {
          // registrar um novo usuário 
          writeData({
            group: 'users', data: {
              id: perfil.id,
              email: perfil.email,
              name: perfil.name,
              locale: perfil.locale,
              verified_email: perfil.verified_email,
              followers: '0',
              posts: '0'
            }
          })
          // incrementa o contador para impedir a recursividade infinita 
          counterGetUserIteration++
          // chamar novamente a função getUser() para executar a recursividade  
          getUser()
        } else {
          // caso o erro não tiver solução acima, o status é definido para ERROR para dar o feeback pro usuário
          setFirebaseStatus('ERROR')
          counterGetUserIteration = 0
          throw new Error('erro ao acessar o bando de dados -> ' + error.message)
        }
      })
  }

  // useEffect responsável por observar mudanças no perfil
  // caso o perfil seja definido para undefined e o status da conexão seja diferente de ERROR, mudamos o status da conexão para EROOR
  React.useEffect(() => {
    if (perfil == undefined && firebaseStatus != 'ERROR') {
      setFirebaseStatus('ERROR')
    } else if (authStatus == 'OK' && firebaseStatus == 'ERROR') {
      getUser()
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