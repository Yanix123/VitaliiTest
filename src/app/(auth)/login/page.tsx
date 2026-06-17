import { SignInModule } from '@/app/modules/sign-in'

interface IProps {
  searchParams: Promise<{ returnTo?: string }>
}

// page — login
const Page = async ({ searchParams }: IProps) => {
  const { returnTo } = await searchParams
  return <SignInModule returnTo={returnTo} />
}

export default Page
