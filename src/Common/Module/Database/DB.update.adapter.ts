import { update, ref } from "firebase/database"
import { database } from "../../Services/firebase.config"
import { IWriteData } from "./DB.interface"

export function dbUpdateAdapter() {
  function updateData({ group, data, id }: IWriteData) {
    try {
      update(ref(database, `${group}/${id}`), data)
    } catch (error) {
      console.log('não foi possível atualizar os dados ' + error)
    }
  }

  return {
    updateData
  }
}