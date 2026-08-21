import './CoffeeCard.css';

export default function CoffeeCard({ item, addToCart, showCategoryTag = true }) {
  return (
    <div className="coffee-card">
      <div className="card-top">
        <span className="card-icon">{item.image}</span>
        {showCategoryTag && <span className="category-tag">{item.category}</span>}
      </div>
      <h3>{item.name}</h3>
      <p className="desc">{item.desc}</p>
      <div className="card-bottom">
        <span className="price">${item.price.toFixed(2)}</span>
        <button className="add-btn" onClick={() => addToCart(item)}>+ Add</button>
      </div>
    </div>
  );
}