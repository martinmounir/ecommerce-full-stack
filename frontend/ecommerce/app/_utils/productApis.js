import axiosClient from './axiosClient'

// Get all products
const getLatestProducts = () => {
  return axiosClient.get('/products?populate=*')
}

// Get product by ID
const getProductById = async (id) => {
  try {
    const url = `/products?filters[id][$eq]=${id}&populate=*`

    console.log('Calling URL:', url)

    const res = await axiosClient.get(url)

    return res
  } catch (error) {
    console.log('Status:', error.response?.status)
    console.log('URL:', error.config?.url)
    console.log('Response:', error.response?.data)

    throw error
  }
}

// Get products by category
const getProductsByCategory = async (category) => {
  return await axiosClient.get(
    `/products?filters[category][$eq]=${category}&populate=*`,
  )
}

export default {
  getLatestProducts,
  getProductById,
  getProductsByCategory,
}
