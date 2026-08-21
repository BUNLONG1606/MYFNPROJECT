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
          <p>Please log in with an administrator account (<code>admin@coffee.com</code>) to view this page.</p>
          <button className="submit-btn" onClick={() => setCurrentPage('login')}>Go to Login</button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-container admin-page">
      <div className="admin-grid">
        {/* Section 1: Add New Menu Item */}
        <div className="admin-card">
          <h2>➕ Add New Menu Item</h2>
          <form onSubmit={handleAddMenuItem} className="admin-form">
            <div className="form-group">
              <label>Item Name</label>
              <input 
                type="text" 
                placeholder="e.g. Vanilla Latte" 
                value={newItemName} 
                onChange={(e) => setNewItemName(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select 
                value={newItemCategory} 
                onChange={(e) => setNewItemCategory(e.target.value)} 
                className="select-input"
              >
                <option value="Hot Drinks">Hot Drinks</option>
                <option value="Cold Drinks">Cold Drinks</option>
                <option value="Bakery">Bakery</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price ($)</label>
              <input 
                type="number" 
                step="0.01" 
                placeholder="4.50" 
                value={newItemPrice} 
                onChange={(e) => setNewItemPrice(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Emoji Icon</label>
              <input 
                type="text" 
                placeholder="☕ or 🧊" 
                value={newItemImage} 
                onChange={(e) => setNewItemImage(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea 
                placeholder="Short item description..." 
                value={newItemDesc} 
                onChange={(e) => setNewItemDesc(e.target.value)} 
                className="textarea-input"
              />
            </div>

            <button type="submit" className="submit-btn">Add to Menu</button>
          </form>
        </div>

        {/* Section 2: Customer Orders List */}
        <div className="admin-card">
          <h2>📋 Customer Orders ({customerOrders.length})</h2>
          {customerOrders.length === 0 ? (
            <p className="empty-orders">No customer orders received yet.</p>
          ) : (
            <div className="orders-container">
              {customerOrders.map((order) => (
                <div key={order.id} className="order-box">
                  <div className="order-header">
                    <div>
                      <strong>👤 {order.buyerName}</strong> ({order.buyerEmail})
                    </div>
                    <span className="order-date">{order.date}</span>
                  </div>
                  
                  <div className="order-item-list">
                    {order.items.map((i) => (
                      <div key={i.id} className="order-item-row">
                        <span>{i.image} {i.name} (x{i.quantity})</span>
                        <span>${(i.price * i.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-total-row">
                    <span>Total Paid:</span>
                    <strong>${order.total}</strong>
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