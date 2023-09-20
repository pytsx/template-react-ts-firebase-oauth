import { ref, onValue } from "firebase/database";
import { database } from "../../Services/firebase.config";
import { IGetData } from "./DB.interface";

export function dbReadDataAdapter() {
  async function getDataByGroup({ group, id }: IGetData): Promise<any> {
    try {
      const userRef = id !== undefined ? ref(database, `${group}/${id}`) : ref(database, group);

      const snapshot: any = await new Promise((resolve, reject) => {
        onValue(userRef, (snapshot) => {
          resolve(snapshot);
        }, (error) => {
          reject(error);
        });
      });

      const data = snapshot.val();

      if (data !== null) {
        return data;
      } else {
        throw new Error('Dados não encontrados');
      }
    } catch (error) {
      throw error;
    }
  }


  return {
    getDataByGroup
  }
}