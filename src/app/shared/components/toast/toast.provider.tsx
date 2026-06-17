'use client'

import { type FC, type ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { ToastContext, type IToast } from './toast.context'

interface IProps {
  children: ReactNode
}

let nextId = 0

export const ToastProvider: FC<IProps> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    timers.current.delete(id)
  }, [])

  const addToast = useCallback(
    (message: string, type: IToast['type'] = 'success') => {
      const id = String(++nextId)
      setToasts((prev) => [...prev, { id, message, type }])
      const timer = setTimeout(() => remove(id), 3000)
      timers.current.set(id, timer)
    },
    [remove],
  )

  useEffect(() => {
    const map = timers.current
    return () => map.forEach(clearTimeout)
  }, [])

  return (
    <ToastContext value={{ addToast }}>
      {children}
      <div className='toast-container' aria-live='polite'>
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.type}`} role='status'>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext>
  )
}
