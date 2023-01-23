import LinkEntity, { ILink } from '@/models/Link'
import { connectMongo } from '@/utils/connectMongo'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo()

  if (req.method === 'POST') {
    const { href, title, image } = req.body

    try {
      const link = await LinkEntity.create<ILink>({ href, title, image })

      res.status(201).json(link)
    } catch (error) {
      res.status(400).json(error)
    }
  } else if (req.method === 'GET') {
    try {
      const links = await LinkEntity.find<ILink>()

      res.status(200).json(links)
    } catch (error) {
      res.status(400).json(error)
    }
  } else {
    res.status(400).json({ message: 'Only GET or POST is allowed' })
  }
}
