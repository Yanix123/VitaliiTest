import { createContext } from 'react'

export interface IToast {
  id: string
  message: string
  type: 'success' | 'error'
}

export interface IToastContext {
  addToast: (message: string, type?: IToast['type']) => void
}

export const ToastContext = createContext<IToastContext>({ addToast: () => {} })
