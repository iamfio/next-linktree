import { model, models, Schema } from 'mongoose'

export interface ILink {
  href: string
  title: string
  image?: string
}

const linkSchema = new Schema<ILink>(
  {
    href: { type: String, required: true },
    title: { type: String, required: true },
    image: String,
  },
  {
    timestamps: true,
  }
)

const LinkEntity =
  models.LinkEntity || model<ILink>('LinkEntity', linkSchema)

export default LinkEntity
