import { forwardRef, type InputHTMLAttributes } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

// Field — labelled text input that surfaces a validation error
const Field = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { label, error, ...rest } = props

  return (
    <div className='field'>
      <label className='field__label'>{label}</label>
      <input ref={ref} className={`field__input ${error ? 'field__input--invalid' : ''}`} {...rest} />
      {error ? <span className='field__error'>{error}</span> : null}
    </div>
  )
})

Field.displayName = 'Field'

export default Field
