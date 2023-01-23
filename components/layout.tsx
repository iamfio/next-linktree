import Image from 'next/image'
import data from '@/data.json'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

type ChildrenProps = {
  children: string | JSX.Element | JSX.Element[] | '() => JSX.Element'
}

const Layout = ({ children }: ChildrenProps) => {
  const { data: session, status } = useSession()

  return (
    <div className="flex flex-col items-center px-8 mx-auto mt-16 w-full">
      <Link href="/">
        <Image
          className="rounded-full"
          src={session?.user?.image!}
          width={96}
          height={96}
          alt={session?.user?.name!}
        />
      </Link>

      <h1 className="font-bold mt-4 text-xl mb-8 text-white">
        {session?.user?.name}
      </h1>

      {children}
    </div>
  )
}

export default Layout
