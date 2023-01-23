import Link from 'next/link'
import { LinkCard } from '@/components/LinkCard'
import { ILinkEntity } from '@/models/link'
import { GetStaticProps } from 'next'
import { signIn } from 'next-auth/react'

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/links')
  const links: ILinkEntity[] = await res.json()

  return {
    props: {
      links,
    },
  }
}

const Home = ({ links }: { links: ILinkEntity[] }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <button
        onClick={() => {
          signIn()
        }}
      >
        Sign In{' '}
      </button>
      <Link href={'add'}>
        <div className="my-8 bg-gray-100 text-gray-800 hover:bg-gray-600 hover:text-gray-100 hover:scale-105 px-3 py-2 rounded-lg font-semibold transition-all delay-100">
          Add New
        </div>
      </Link>

      {links.map((link: ILinkEntity) => (
        <LinkCard key={link.href} {...link} />
      ))}
    </div>
  )
}

export default Home
