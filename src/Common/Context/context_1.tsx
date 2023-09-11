import React from "react"
import { IChildren } from "../Types"

// CONTEXTO DE Empty
// Responsável por 

// tipagem do contexto
interface IEmptyContext {
  value: string
}

// definição do contexto
// implementa a interface IEmptyContext
const EmptyContext = React.createContext<IEmptyContext>({
  value: ''
})

// definição do Provider do contexto 
// props implementa a interface: IChildren
export const EmptyProvider = ({ children }: IChildren) => {

  // definição de um estado 
  const [value, setValue] = React.useState<string>('')

  return (
    <EmptyContext.Provider value={{ value }}>
      {children}
    </EmptyContext.Provider>
  )
}

// definição do hook responsável por acessar o contexto
// e disponibilizar as variáveis e as funções definidar na
// interface IEmptyContext
export const useEmpty = () => React.useContext(EmptyContext)