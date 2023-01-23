import { NextPage } from 'next'
import { FormEvent, FormEventHandler, useState } from 'react'
import { signIn } from 'next-auth/react'
import Router, { useRouter } from 'next/router'

const SignInPage: NextPage = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<{
    email: string
    password: string
  }>({ email: '', password: '' })
  const [message, setMessage] = useState<string | null>(null)

  const handleOnChange = (e: FormEvent) => {
    const fieldName = (e.target as HTMLInputElement).name
    const fieldValue = (e.target as HTMLInputElement).value

    setUserInfo((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent) => {
    // const router = useRouter()

    // TODO: validate userInfo
    e.preventDefault()

    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    })

    if (res?.error) {
      setMessage(res.error)
      return
    }

    return Router.push('/')

    console.log('🚀 ~ file: signin.tsx:16 ~ res', res)
  }

  return (
    <div className="text-gray-300">
      {message && (
        <div className="bg-white text-pink-800 py-1 px-2">{message}</div>
      )}

      <form method="post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block w-full ml-3 mb-1 font-semibold"
          >
            E-Mail:
          </label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleOnChange}
            placeholder="E-Mail"
            className="mx-2 rounded-lg text-gray-600 block w-50"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block w-full ml-3 mb-1 font-semibold"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleOnChange}
            placeholder="********"
            className="mx-2 rounded-lg text-gray-600 block w-50"
          />
        </div>
        <div className="ml-2 -my-6">
          <button
            type="submit"
            className="py-2 px-4 my-12 bg-white hover:bg-purple-500 text-purple-800 hover:text-gray-100 transition-all duration-100 font-semibold rounded-lg"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignInPage
