import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { useEffect } from 'react'

const ProtectedPage: NextPage = (): JSX.Element => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      Router.replace('/auth/signin')
    }
  }, [status])

  if (status === 'authenticated') {
    return (
      <div>
        <h1>ProtectedPage</h1>
        {JSON.stringify(session.user, null, 2)}
      </div>
    )
  }

  return <div>Loading...</div>
}

export default ProtectedPage
