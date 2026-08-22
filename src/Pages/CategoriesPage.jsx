import CoffeeCard from '../components/CoffeeCard';

import './CategoriesPage.css';

export default function CategoriesPage({
  menuItems,
  addToCart
}) {
  const categories = [
    {
      name: 'Hot Drinks',
      icon: '🔥'
    },
    {
      name: 'Cold Drinks',
      icon: '🧊'
    },
    {
      name: 'Bakery',
      icon: '🥐'
    }
  ];

  return (
    <section className="page-container categories-page">

      <h2>Drink Categories</h2>

      <p className="page-desc">
        Choose your favorite drinks and delicious items.
      </p>

      <div className="category-sections">

        {categories.map((category) => {

          const items = menuItems.filter(
            (item) =>
              item.category === category.name
          );

          return (
            <div
              className="category-block"
              key={category.name}
            >

              <div className="category-header">

                <h3>
                  {category.icon} {category.name}
                </h3>

              </div>

              {items.length > 0 ? (
                <div className="menu-grid">

                  {items.map((item) => (
                    <CoffeeCard
                      key={item.id}
                      item={item}
                      addToCart={addToCart}
                      showCategoryTag={false}
                    />
                  ))}

                </div>
              ) : (
                <p className="no-items">
                  No items available in this category yet.
                </p>
              )}

            </div>
          );
        })}

      </div>

    </section>
  );
}