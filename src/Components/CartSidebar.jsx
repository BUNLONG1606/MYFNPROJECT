import './CartSidebar.css';

export default function CartSidebar({
  cart,
  updateQuantity,
  totalCartCount,
  totalPrice,
  handleCheckout
}) {
  return (
    <aside className="cart-sidebar">

      <h3>
        🛒 Current Order ({totalCartCount})
      </h3>

      {cart.length === 0 ? (
        <p className="empty-cart">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="cart-items">

            {cart.map((item) => (
              <div
                key={item.id}
                className="cart-item"
              >

                <div className="cart-item-info">

                  <strong>{item.name}</strong>

                  <div className="cart-item-price">
                    $
                    {(
                      item.price * item.quantity
                    ).toFixed(2)}
                  </div>

                </div>

                <div className="quantity-controls">

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, -1)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, 1)
                    }
                  >
                    +
                  </button>

                </div>

              </div>
            ))}

          </div>

          <div className="cart-summary">

            <div className="total-row">
              <span>Total:</span>

              <strong>
                ${totalPrice}
              </strong>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Checkout
            </button>

          </div>
        </>
      )}

    </aside>
  );
}