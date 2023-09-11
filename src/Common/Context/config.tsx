import React from "react"
import { IChildren } from "../Types"


// CONTEXTO DE CONFIGURAÇÃO DA APLICAÇÃO
// contexto responsável por disponibilizar objs contendo configurações globais
// para a aplicação 
// a variável 'env' disponibiliza todas as variáveis locais do arquivo .env

// tipagem da variável env
type envType = {
  BASE_URL: string,
  MODE: string,
  DEV: boolean,
  PROD: boolean,
  SSR: boolean,
  [key: string]: string | boolean | number | undefined | null
}

// interface responsáveis por tipar as variáveis e os atributos que serão expostos pelo contexto 
interface IConfigContext {
  env: envType
}

// definição do contexto de configuração implementando a interface: IConfigContext
const ConfigContext = React.createContext<IConfigContext>({
  // @ts-ignore
  env: import.meta.env
})

// definição do Provider do contexto de configuração
// props implementa a interface: IChildren
export const ConfigProvider = ({ children }: IChildren) => {
  // estado responsável por centralizar, armazenar e atualizar as configurações do projeto
  // @ts-ignore
  const [env, setEnv] = React.useState<envType>(import.meta.env)

  return (
    <ConfigContext.Provider value={{ env }}>
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfig = () => React.useContext(ConfigContext)