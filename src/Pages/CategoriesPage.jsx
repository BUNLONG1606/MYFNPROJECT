import CoffeeCard from '../components/CoffeeCard';
import './CategoriesPage.css';

export default function CategoriesPage({ menuItems, addToCart }) {
  return (
    <section className="page-container categories-page">
      <h2>Drink Categories</h2>
      <p className="page-desc">You can choose a delicious drinks here.</p>

      <div className="category-sections">
        {/* Hot Drinks Section */}
        <div className="category-block">
          <div className="category-header hot-header">
            <h3>🔥 Hot Drinks</h3>
          </div>
          <div className="menu-grid">
            {menuItems.filter(i => i.category === 'Hot Drinks').map((item) => (
              <CoffeeCard key={item.id} item={item} addToCart={addToCart} showCategoryTag={false} />
            ))}
          </div>
        </div>

        {/* Cold Drinks Section */}
        <div className="category-block">
          <div className="category-header cold-header">
            <h3>🧊 Cold Drinks</h3>
          </div>
          <div className="menu-grid">
            {menuItems.filter(i => i.category === 'Cold Drinks').map((item) => (
              <CoffeeCard key={item.id} item={item} addToCart={addToCart} showCategoryTag={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}