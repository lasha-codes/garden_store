import { Product } from '@/types/globalTypes'
import { fetchProductsSEO } from '@/services/products'

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT

  try {
    const response = await fetchProductsSEO(baseUrl as string)

    const products = response
      ? response.map((product: Product) => ({
          url: `${baseUrl}/products/${product.id}`,
          lastModified: new Date(product.createdAt as number).toISOString(),
        }))
      : []

    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
      },

      ...products,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return []
  }
}
