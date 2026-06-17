'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Field } from '@/app/shared/components/field'
import { ERoute } from '@/app/shared/interfaces'
import { type ISignInForm, signInSchema } from '@/app/shared/validation'
import { signIn } from '@/pkg/auth-client'

interface IProps {
  returnTo?: string
}

// SignInModule — email/password login form
const SignInModule = ({ returnTo }: IProps = {}) => {
  const router = useRouter()
  const [formError, setFormError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    setFormError('')
    const { error } = await signIn.email({ email: values.email, password: values.password })
    if (error) {
      setFormError(error.message ?? 'Sign in failed')
      return
    }
    const redirectTo = returnTo && returnTo.startsWith('/') && !returnTo.startsWith('//') ? returnTo : ERoute.HOME
    router.push(redirectTo)
    router.refresh()
  })

  return (
    <div className='form-card'>
      <h1>Log in</h1>
      <form onSubmit={onSubmit} noValidate>
        <Field label='Email' type='email' autoComplete='email' error={errors.email?.message} {...register('email')} />
        <Field
          label='Password'
          type='password'
          autoComplete='current-password'
          error={errors.password?.message}
          {...register('password')}
        />
        {formError ? <p className='field__error'>{formError}</p> : null}
        <button className='btn btn--accent' type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Log in'}
        </button>
      </form>
      <p className='form-card__alt'>
        No account? <Link href={ERoute.REGISTER}>Sign up</Link>
      </p>
    </div>
  )
}

export default SignInModule
