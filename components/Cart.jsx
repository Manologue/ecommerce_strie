import React, { useRef } from 'react'
// import axios from 'axios'
import Link from 'next/link'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai'

import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'

const Cart = () => {
  const cartRef = useRef()
  const {
    totalPrice,
    totalQuantities,
    cart,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext()

  const handleCheckout = async () => {
    const stripe = await getStripe()
    // const response = await axios.post('/api/stripe', {
    //   cartItems: cartItems,
    // })
    // // const data = await response.json()
    // // console.log(data)
    // if (response.error) return
    // toast.loading('Redirecting...')
    // const result = await stripe.redirectToCheckout({
    //   sessionId: response.data.id,
    // })
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems: cart,
      }),
    })

    if (response.statusCode === 500) return

    const data = await response.json()

    toast.loading('Redirecting...')

    stripe.redirectToCheckout({
      sessionId: data.id,
    })
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities})</span>
        </button>
        {cart.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping back is empty</h3>
            <Link href="/">
              <button type="button" onClick={() => setShowCart(false)} className="btn">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cart.length >= 1 &&
            cart.map((item) => (
              <div className="product" key={item._id}>
                <img src={urlFor(item?.image[0])} className="cart-product-image" />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cart.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
