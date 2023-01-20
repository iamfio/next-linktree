import { model, models, Schema } from 'mongoose'

export interface ILinkEntity {
  href: string
  title: string
  image?: string
}

const linkSchema = new Schema<ILinkEntity>(
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
  models.LinkEntity || model<ILinkEntity>('LinkEntity', linkSchema)

export default LinkEntity
