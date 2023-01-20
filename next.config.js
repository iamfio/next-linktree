/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: [
      'faces-img.xcdn.link',
      'picsum.photos',
      'thumbnailer.mixcloud.com',
      'images.unsplash.com',
    ],
  },
}

module.exports = nextConfig
