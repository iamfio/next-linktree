import { model, models, Schema } from 'mongoose'

export interface IAccount {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string
  access_token: string
  expires_at: number
  token_type: string
  scope: string
  id_token: string
  session_state: string
  oauth_token_secret: string
  oauth_token: string
}

const accountSchema = new Schema<IAccount>(
  {
    userId: String,
    type: String,
    provider: String,
    providerAccountId: String,
    refresh_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String,
    oauth_token_secret: String,
    oauth_token: String,
  },
  {
    timestamps: true,
  }
)

const Account = models.Account || model<IAccount>('Account', accountSchema)

export default Account
