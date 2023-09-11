import { envType } from '../Types'

/**
 * Singleton Pattern:
 * Garante a existência única de um objeto durante a vida do programa.
 * 
 * Este código utiliza uma IIFE (Immediately Invoked Function Expression) para criar
 * e reutilizar uma única instância do objeto 'env', independentemente do número
 * de importações do módulo. Isso é útil para compartilhar configurações ou recursos
 * globais em todo o aplicativo.
 **/

export const env = (() => {
  // @ts-ignore
  let env: envType = import.meta.env
  return {
    ...env
  }
})()