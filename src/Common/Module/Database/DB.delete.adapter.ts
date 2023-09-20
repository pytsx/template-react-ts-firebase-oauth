import { remove, ref } from "firebase/database";
import { database } from "../../Services/firebase.config";
import { IDeleteData } from "./DB.interface";

export function dbDeleteAdapter() {

  function deleteData({ group, id }: IDeleteData) {
    remove(ref(database, `${group}/${id}`))
  }

  return {
    deleteData
  }
}