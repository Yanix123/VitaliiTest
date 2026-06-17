import { z } from 'zod'

// sign-in form schema
export const signInSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type ISignInForm = z.infer<typeof signInSchema>

// sign-up form schema
export const signUpSchema = signInSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

export type ISignUpForm = z.infer<typeof signUpSchema>
