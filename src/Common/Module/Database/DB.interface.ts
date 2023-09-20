export interface IWriteData {
  group: string
  data: any
  id?: string
  key?: string
}
export interface IGetData {
  group: string
  id?: string
}
export interface IDeleteData {
  group: string
  id: string
}
