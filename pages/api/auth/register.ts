import User, { IUser } from '@/models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const body: IUser = req.body

    const userEsists = await User.findOne<IUser>({ email: body.email })

    if (userEsists) {
      res.status(200).json({ message: 'User already exists' })
      return
    }

    const user = new User<IUser>(body)
    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    // Hide User's password in JSON response
    delete user.password
    res.status(201).json({ message: 'User registered successfully', user })
  }
}
