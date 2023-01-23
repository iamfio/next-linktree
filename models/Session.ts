import { model, models, Schema } from 'mongoose'
import { IAccount } from './Account'

export interface ISession {
  id: string
  expires: Date
  sessionToken: string
  userId: string
}

const sessionSchema = new Schema<ISession>(
  {
    expires: Date,
    sessionToken: String,
    userId: String
  },
  {
    timestamps: true,
  }
)

const Session = models.Session || model<ISession>('Session', sessionSchema)

export default Session
