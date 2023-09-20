import { set, ref } from "firebase/database";
import { database } from "../../Services/firebase.config";
import { IWriteData } from "./DB.interface";

export function dbCreateAdapter() {
  function writeData({ group, data }: IWriteData) {
    set(ref(database, `${group}/${data.id}`), { ...data })
  }

  return {
    writeData
  }
}