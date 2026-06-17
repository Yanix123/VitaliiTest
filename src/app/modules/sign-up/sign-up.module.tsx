'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Field } from '@/app/shared/components/field'
import { ERoute } from '@/app/shared/interfaces'
import { type ISignUpForm, signUpSchema } from '@/app/shared/validation'
import { signUp } from '@/pkg/auth-client'

interface IProps {
  returnTo?: string
}

// SignUpModule — email/password registration form
const SignUpModule = ({ returnTo }: IProps = {}) => {
  const router = useRouter()
  const [formError, setFormError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    setFormError('')
    const { error } = await signUp.email({ name: values.name, email: values.email, password: values.password })
    if (error) {
      setFormError(error.message ?? 'Sign up failed')
      return
    }
    const redirectTo = returnTo && returnTo.startsWith('/') && !returnTo.startsWith('//') ? returnTo : ERoute.HOME
    router.push(redirectTo)
    router.refresh()
  })

  return (
    <div className='form-card'>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit} noValidate>
        <Field label='Name' autoComplete='name' error={errors.name?.message} {...register('name')} />
        <Field label='Email' type='email' autoComplete='email' error={errors.email?.message} {...register('email')} />
        <Field
          label='Password'
          type='password'
          autoComplete='new-password'
          error={errors.password?.message}
          {...register('password')}
        />
        {formError ? <p className='field__error'>{formError}</p> : null}
        <button className='btn btn--accent' type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className='form-card__alt'>
        Already have an account? <Link href={ERoute.LOGIN}>Log in</Link>
      </p>
    </div>
  )
}

export default SignUpModule
