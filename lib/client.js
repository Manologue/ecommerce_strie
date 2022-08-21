import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'dzvda2hv',
  dataset: 'production',
  apiVersion: '2022-08-01',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
  return builder.image(source)
}
