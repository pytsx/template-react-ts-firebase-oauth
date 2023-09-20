import { dbCreateAdapter } from "./DB.create.adapter"
import { dbDeleteAdapter } from "./DB.delete.adapter"
import { dbReadDataAdapter } from "./DB.read.adapter"
import { dbUpdateAdapter  } from "./DB.update.adapter"

export const moduleFirebase = () => {
  const { writeData } = dbCreateAdapter()
  const { deleteData} = dbDeleteAdapter()
  const { getDataByGroup} = dbReadDataAdapter()
  const {updateData } = dbUpdateAdapter()

  






  return {
    getDataByGroup, 
    writeData, 
    updateData, 
    deleteData
  }
}