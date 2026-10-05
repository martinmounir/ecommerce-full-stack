import axiosClient from './axiosClient'

// Add product to cart
const addToCart = (payload) => axiosClient.post('/carts', payload)

// Get user's cart
const getUserCartItems = (email) =>
  axiosClient.get('/carts', {
    params: {
      'populate[products][populate]': 'banner',
      'filters[email][$eq]': email,
    },
  })

// Remove cart item
const deleteCartItem = (id) => axiosClient.delete(`/carts/${id}`)

export default {
  addToCart,
  getUserCartItems,
  deleteCartItem,
}
