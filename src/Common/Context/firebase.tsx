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
  const { perfil, addPerfilProperty } = useAuth()
  const { getDataByGroup } = moduleFirebase()
  const [firebaseStatus, setFirebaseStatus] = React.useState<statusEnum>('ERROR')

  function getUser() {
    setFirebaseStatus('LOADING')
    if (perfil?.id == undefined) {
      setTimeout(() => {

        setFirebaseStatus('ERROR')
      }, 600)
      return
    }
    getDataByGroup({
      group: 'users',
      id: perfil?.id
    }).then(data => {
      if (JSON.stringify(perfil) == JSON.stringify(data)) return
      for (let key in data) {
        addPerfilProperty([key, data[key]])
      }
      setFirebaseStatus('OK')
    })
      .catch((error) => {
        setFirebaseStatus('ERROR')
        throw new Error('erro ao acessar o bando de dados -> ' + error.message)
      })
  }

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