import { ILinkEntity } from '@/models/link'
import Image from 'next/image'

export const LinkCard = ({ href, title, image }: ILinkEntity) => {
  return (
    <a
      href={href}
      className="flex items-center p-1 w-full rounded-md hover:scale-105 transition-all bg-gray-100 mb-3 max-w-3xl"
    >
      <div className="flex text-center w-full">
        <div className="w-10 h-10">
          {image && (
            <Image
              className="rounded-md object-contain"
              src={image}
              width={40}
              height={40}
              alt={title}
            />
          )}
        </div>
        <h2 className="flex justify-center items-center -ml-10 font-semibold w-full text-gray-700">
          {title}
        </h2>
      </div>
    </a>
  )
}
