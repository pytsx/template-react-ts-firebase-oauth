import { statusEnum } from "../../Types"

// define a interface do module googleAuth 
export interface IModuleGoogleAuth {
  handlePerfilData: (data: any) => void
  handleAuthStatus: (option: statusEnum) => void
}
