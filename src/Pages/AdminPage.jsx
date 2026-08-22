import './AdminPage.css';

export default function AdminPage({
  user,
  setCurrentPage,
  handleAddMenuItem,

  newItemName,
  setNewItemName,

  newItemCategory,
  setNewItemCategory,

  newItemPrice,
  setNewItemPrice,

  newItemImage,
  setNewItemImage,

  newItemDesc,
  setNewItemDesc,

  customerOrders
}) {

  if (!user?.isAdmin) {
    return (
      <section className="page-container admin-page">

        <div className="access-denied">

          <h2>🔒 Access Denied</h2>

          <p>
            Please log in with an administrator account.
          </p>

          <button
            className="submit-btn"
            onClick={() =>
              setCurrentPage('login')
            }
          >
            Go to Login
          </button>

        </div>

      </section>
    );
  }

  return (
    <section className="page-container admin-page">

      <div className="admin-grid">

        {/* ADD ITEM */}

        <div className="admin-card">

          <h2>➕ Add New Menu Item</h2>

          <form
            onSubmit={handleAddMenuItem}
            className="admin-form"
          >

            <div className="form-group">

              <label>Item Name</label>

              <input
                type="text"
                placeholder="e.g. Vanilla Latte"
                value={newItemName}
                onChange={(e) =>
                  setNewItemName(e.target.value)
                }
                required
              />

            </div>

            <div className="form-group">

              <label>Category</label>

              <select
                value={newItemCategory}
                onChange={(e) =>
                  setNewItemCategory(e.target.value)
                }
                className="select-input"
              >

                <option value="Hot Drinks">
                  Hot Drinks
                </option>

                <option value="Cold Drinks">
                  Cold Drinks
                </option>

                <option value="Bakery">
                  Bakery
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>Price ($)</label>

              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="1.50"
                value={newItemPrice}
                onChange={(e) =>
                  setNewItemPrice(e.target.value)
                }
                required
              />

            </div>

            <div className="form-group">

              <label>Image / Emoji</label>

              <input
                type="text"
                placeholder="☕ or image URL"
                value={newItemImage}
                onChange={(e) =>
                  setNewItemImage(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>Description</label>

              <textarea
                placeholder="Short item description..."
                value={newItemDesc}
                onChange={(e) =>
                  setNewItemDesc(e.target.value)
                }
                className="textarea-input"
              />

            </div>

            <button
              type="submit"
              className="submit-btn"
            >
              Add to Menu
            </button>

          </form>

        </div>

        {/* ORDERS */}

        <div className="admin-card">

          <h2>
            📋 Customer Orders ({customerOrders.length})
          </h2>

          {customerOrders.length === 0 ? (

            <p className="empty-orders">
              No customer orders received yet.
            </p>

          ) : (

            <div className="orders-container">

              {customerOrders.map((order) => (

                <div
                  key={order.id}
                  className="order-box"
                >

                  <div className="order-header">

                    <div>
                      <strong>
                        👤 {order.buyerName}
                      </strong>

                      <small>
                        {order.buyerEmail}
                      </small>
                    </div>

                    <span className="order-date">
                      {order.date}
                    </span>

                  </div>

                  <div className="order-item-list">

                    {order.items.map((item) => (

                      <div
                        key={item.id}
                        className="order-item-row"
                      >

                        <span>
                          {typeof item.image === 'string' &&
                          !item.image.includes('/')
                            ? item.image
                            : '☕'}{' '}
                          {item.name} ×{item.quantity}
                        </span>

                        <span>
                          $
                          {(
                            item.price *
                            item.quantity
                          ).toFixed(2)}
                        </span>

                      </div>

                    ))}

                  </div>

                  <div className="order-total-row">

                    <span>Total Paid:</span>

                    <strong>
                      ${order.total}
                    </strong>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </section>
  );
}