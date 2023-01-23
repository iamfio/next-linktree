import { model, models, Schema } from 'mongoose'
import { IAccount } from './Account'

export interface IUser {
  id: string
  name: string
  username: string
  email: string
  emailVerified: Date
  password: string
  image: string
  account: IAccount
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    emailVerified: { type: Date },
    password: { type: String, required: true },
    image: { type: String, default: 'https://picsum.photos/200' },
  },
  {
    timestamps: true,
  }
)

const User = models.User || model<IUser>('User', userSchema)

export default User
