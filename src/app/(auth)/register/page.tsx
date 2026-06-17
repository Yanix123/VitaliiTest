import { SignUpModule } from '@/app/modules/sign-up'

interface IProps {
  searchParams: Promise<{ returnTo?: string }>
}

// page — register
const Page = async ({ searchParams }: IProps) => {
  const { returnTo } = await searchParams
  return <SignUpModule returnTo={returnTo} />
}

export default Page
