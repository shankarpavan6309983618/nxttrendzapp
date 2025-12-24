import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0

        cartList.forEach(eachItem => {
          total += eachItem.price * eachItem.quantity
        })

        const totalItems = cartList.length

        return (
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total:</span> Rs {total}
              /-
            </h1>
            <p className="total-items">{totalItems} Items in cart</p>

            {/* ✅ ONLY ONE CHECKOUT BUTTON */}
            <Popup
              modal
              trigger={
                <button type="button" className="checkout-button">
                  Checkout
                </button>
              }
            >
              {close => (
                <div className="payment-popup">
                  {!orderPlaced ? (
                    <>
                      <h1>Payment Options</h1>

                      <label>
                        <input type="radio" disabled />
                        Card
                      </label>
                      <br />

                      <label>
                        <input type="radio" disabled />
                        Net Banking
                      </label>
                      <br />

                      <label>
                        <input type="radio" disabled />
                        UPI
                      </label>
                      <br />

                      <label>
                        <input type="radio" disabled />
                        Wallet
                      </label>
                      <br />

                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="COD"
                          onChange={e => setPaymentMethod(e.target.value)}
                        />
                        Cash on Delivery
                      </label>

                      <div>
                        <p>Items: {totalItems}</p>
                        <p>Total: Rs {total}/-</p>
                      </div>

                      <button
                        type="button"
                        disabled={paymentMethod !== 'COD'}
                        onClick={() => setOrderPlaced(true)}
                      >
                        Confirm Order
                      </button>
                    </>
                  ) : (
                    <p>Your order has been placed successfully</p>
                  )}

                  <button type="button" onClick={close}>
                    Close
                  </button>
                </div>
              )}
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
