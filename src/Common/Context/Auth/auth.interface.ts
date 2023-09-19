import { statusEnum } from "../../Types"

export type perfilType = {
  [key: string]: string
}

export interface IAuthContext {
  loginWithGoogle: () => void
  perfil: perfilType | undefined
  addPerfilProperty: (property: [string, string]) => void
  authStatus: statusEnum
  logoutGoogle: () => void
}
