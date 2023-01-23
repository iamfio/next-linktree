import Image from 'next/image'
import data from '@/data.json'
import Link from 'next/link'

type ChildrenProps = {
  children: string | JSX.Element | JSX.Element[] | '() => JSX.Element'
}

const Layout = ({ children }: ChildrenProps) => {
  return (
    <div className="flex flex-col items-center px-8 mx-auto mt-16 w-full">
      <Link href="/">
        <Image
          className="rounded-full"
          src={data.avatar}
          width={96}
          height={96}
          alt={data.name}
        />
      </Link>

      <h1 className="font-bold mt-4 text-xl mb-8 text-white">{data.name}</h1>

      {children}
    </div>
  )
}

export default Layout
