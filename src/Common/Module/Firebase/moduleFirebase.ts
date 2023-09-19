import { child, onValue, push, ref, set } from "firebase/database"
import { database } from "../../Service/firebase.config"

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

    set(ref(database, `${group}/${data.id}`), { ...data })

  }

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



  function updateData({ group, data, id }: IWriteData) {
    const newDataKey = push(child(ref(database), group)).key
    let updates: any = {}
  }

  function deleteData({ group, id }: IDeleteData) { }


  return {
    getDataByGroup, writeDBData
  }
}