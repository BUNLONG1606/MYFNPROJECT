import CoffeeCard from '../components/CoffeeCard';
import CartSidebar from '../components/CartSidebar';
import './MenuPage.css';

export default function MenuPage({ menuItems, addToCart, cart, updateQuantity, totalCartCount, totalPrice, handleCheckout }) {
  return (
    <section className="page-container menu-page">
      <header className="hero">
        <h1>Fresh Daily Coffee</h1>
        <p>Hand-picked beans, roasted locally and prepared with precision.</p>
      </header>

      <div className="layout-grid">
        <div className="menu-list">
          <h2>All Drinks & Items</h2>
          <div className="menu-grid">
            {menuItems.map((item) => (
              <CoffeeCard key={item.id} item={item} addToCart={addToCart} />
            ))}
          </div>
        </div>

        <CartSidebar 
          cart={cart}
          updateQuantity={updateQuantity}
          totalCartCount={totalCartCount}
          totalPrice={totalPrice}
          handleCheckout={handleCheckout}
        />
      </div>
    </section>
  );
}