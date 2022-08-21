import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { getStorageItem, setStorageItem } from '../lib/utils'

const Context = createContext()

export const StateContext = ({ children }) => {
  let cart = getStorageItem('cart')

  const [showCart, setShowCart] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)
  let foundProduct
  let index

  // for filter button

  const [filterProducts, setFilterProducts] = useState(null)

  // the initial values of totalPrice and totalQuantities
  useEffect(() => {
    setTotalPrice(
      cart ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0
    )
    setTotalQuantities(cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0)
  }, [cart])

  const onAdd = (product, quantity) => {
    const checkProductInCart = cart.find((item) => item._id === product._id)

    setTotalPrice((PrevTotalPrice) => PrevTotalPrice + product.price * quantity)
    setTotalQuantities((PrevTotalQuantities) => PrevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cart.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity }
        }
        return cartProduct
      })
      setStorageItem('cart', updatedCartItems)
    } else {
      product.quantity = quantity

      setStorageItem('cart', [...cart, product])
    }

    toast.success(`${qty} ${product.name} added to cart`)
  }

  const onRemove = (product) => {
    foundProduct = cart.find((item) => item._id === product._id)
    const newCartItems = cart.filter((item) => item._id !== product._id)

    setTotalPrice(
      (PrevTotalPrice) => PrevTotalPrice - foundProduct.price * foundProduct.quantity
    )
    setTotalQuantities(
      (PrevTotalQuantities) => PrevTotalQuantities - foundProduct.quantity
    )

    setStorageItem('cart', newCartItems)
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cart.find((item) => item._id === id)
    // index = cart.findIndex((product) => product._id === id)

    // const newCartItems = cart.filter((item) => item._id !== id)

    if (value === 'inc') {
      cart = cart.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
      setStorageItem('cart', cart)

      setTotalPrice((PrevTotalPrice) => PrevTotalPrice + foundProduct.price)
      setTotalQuantities((PrevTotalQuantities) => PrevTotalQuantities + 1)
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        cart = cart.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return item
        })
        setStorageItem('cart', cart)

        setTotalPrice((PrevTotalPrice) => PrevTotalPrice - foundProduct.price)
        setTotalQuantities((PrevTotalQuantities) => PrevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1

      return prevQty - 1
    })
  }

  return (
    <Context.Provider
      value={{
        setShowCart,
        showCart,
        cart,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        filterProducts,
        setFilterProducts,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
