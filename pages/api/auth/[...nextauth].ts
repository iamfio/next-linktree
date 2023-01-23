import clientPromise from '@/utils/clientPromise'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcrypt'

import CredentialsProvider from 'next-auth/providers/credentials'
import { connectMongo } from '@/utils/connectMongo'
import User from '@/models/User'

const signInUser = async ({
  password,
  user,
}: {
  password: string
  user: any
}) => {
  if (!user.password) {
    throw new Error('Password missing')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Wrong credentials')
  }

  return user
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo()

  return await NextAuth(req, res, {
    session: {
      strategy: 'jwt',
    },
    // adapter: MongoDBAdapter(clientPromise),
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        type: 'credentials',
        credentials: {
          email: {
            label: 'E-mail',
            type: 'email',
            placeholder: 'E-Mail',
          },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials, req) {
          const { email, password } = credentials as {
            email: string
            password: string
          }

          const user = await User.findOne({ email })

          if (!user) {
            throw new Error('User is not registered')
          }

          return signInUser({ password, user })
        },
      }),
    ],
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
      error: '/auth/error',
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
      async session({ session, user, token }) {
        return session
      },
    },
  })
}
