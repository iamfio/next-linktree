import { model, models, Schema } from 'mongoose'

export interface IVerificationToken {
  identifier: string
  token: string
  expires: Date
}

const verificationTokenSchema = new Schema<IVerificationToken>(
  {
    identifier: String,
    token: String,
    expires: Date,
  },
  {
    timestamps: true,
  }
)

const User =
  models.User ||
  model<IVerificationToken>('VerificationToken', verificationTokenSchema)

export default User
