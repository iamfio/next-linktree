import LinkEntity, { ILinkEntity } from '@/models/link'
import { connectMongo } from '@/utils/connectMongo'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { href, title, image } = JSON.parse(req.body)

    try {
      await connectMongo()

      const link = await LinkEntity.create<ILinkEntity>({ href, title, image })

      res.status(201).json(link)
    } catch (error) {
      res.status(400).json(error)
    }
  } else {
    res.status(400).json({ message: 'Only POST is allowed' })
  }
}
