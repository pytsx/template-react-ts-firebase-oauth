// tipagem da variável env
export type envType = {
  BASE_URL: string,
  MODE: string,
  DEV: boolean,
  PROD: boolean,
  SSR: boolean,
  [key: string]: string | undefined
  [key: string]: boolean | undefined
  [key: string]: number | undefined
}