export type statusEnum = 'OK' | 'LOADING' | 'ERROR'

export type systemStatusType = {
  service: string,
  status: statusEnum,
  action: () => void,
  disabled?: boolean
}

export interface ISystemManagerDesign {
  systemStatus: systemStatusType[]
}