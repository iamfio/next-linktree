import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Router from 'next/router'
import React, { FormEvent, FormEventHandler, useState } from 'react'

const SignUpPage: NextPage = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<{
    username: string
    name: string
    email: string
    password: string
  }>({ username: '', name: '', email: '', password: '' })

  const [message, setMessage] = useState<string | null>('')

  const handleOnChange = (e: FormEvent) => {
    const fieldName = (e.target as HTMLInputElement).name
    const fieldValue = (e.target as HTMLInputElement).value

    setUserInfo((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }))
  }

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    
    setMessage(null)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userInfo.username,
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      }),
    })

    const data = await res.json()

    if (res.ok && data.user) {
      // TODO: Improve Flash messages
      setMessage(data.message)

      alert(`Hello, ${data.user.username}!`)

      await signIn('credentials', {
        email: data.user.email,
        password: data.user.password,
        redirect: false,
      })

      return Router.push('/')
    }
  }

  return (
    <div>
      <div className="text-gray-300">
        <h1 className="text-2xl">Sign Up</h1>
        <form method="post" onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block w-full ml-3 mb-1 font-semibold"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              onChange={handleOnChange}
              value={userInfo.username}
              placeholder="Full Name"
              className="mx-2 rounded-lg text-gray-600 block w-50"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block w-full ml-3 mb-1 font-semibold"
            >
              Full Name:
            </label>
            <input
              type="text"
              name="name"
              onChange={handleOnChange}
              value={userInfo.name}
              placeholder="Full Name"
              className="mx-2 rounded-lg text-gray-600 block w-50"
            />
          </div>
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
              onChange={handleOnChange}
              value={userInfo.email}
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
              onChange={handleOnChange}
              value={userInfo.password}
              placeholder="********"
              className="mx-2 rounded-lg text-gray-600 block w-50"
            />
          </div>
          <div className="ml-2 -my-6">
            <button
              type="submit"
              className="py-2 px-4 my-12 bg-white hover:bg-purple-500 text-purple-800 hover:text-gray-100 transition-all duration-100 font-semibold rounded-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
