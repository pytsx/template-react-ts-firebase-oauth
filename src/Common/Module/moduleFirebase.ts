import { DatabaseReference, child, onValue, push, ref, set } from "firebase/database"
import { database } from "../Service/firebase.config"

interface IWriteData {
  group: string
  data: any
  id?: string
}
interface IGetData {
  group: string
  id?: string
}
interface IDeleteData {
  group: string
  id: string
}

export const moduleFirebase = () => {

  function writeDBData({ group, data }: IWriteData) {

    set(ref(database, `${group}/` + data.id), {
      id: data.id,
      email: data.email,
      name: data.name,
      locale: data.locale,
      verified_email: data.verified_email,
      followers: '0',
      posts: '0'
    })
  }

  async function getDataByGroup({ group, id }: IGetData): Promise<any> {
    // para acessar os dados encontrados no banco de dados
    // utilizamos um Promise 
    // assim podemos acessar com .them().catch() 
    // para ter disponível os dados fora do módulo 
    return new Promise((resolve, reject) => {
      let userRef: DatabaseReference;
      if (id != undefined) {
        userRef = ref(database, `${group}/${id}`)
      } else {
        userRef = ref(database, group)
      }

      // onValue() é chamado sempre que os dados são alterados na referência 
      // de banco de dados especificada, incluindo alterações nos filhos.
      onValue(userRef, (snapshot) => {
        // O listener recebe um snapshot que contém os dados no local especificado 
        // no banco de dados no momento do evento. É possível recuperar os dados 
        // no snapshot com o método val().
        const data = snapshot.val()
        if (data !== null) {
          // Resolva a Promise com os dados encontrados retornando o valor
          resolve(data)
        } else {
          // rejeita a Promise estourando um erro
          reject(new Error('dados não encontrados'))
        }
      }, (error) => {
        // rejeita a Promise estourando um erro
        reject(error)
      })
    })
  }

  function updateData({ group, data, id }: IWriteData) {
    const newDataKey = push(child(ref(database), group)).key
    let updates: any = {}
  }

  function deleteData({ group, id }: IDeleteData) { }


  return {
    getDataByGroup, writeDBData
  }
}