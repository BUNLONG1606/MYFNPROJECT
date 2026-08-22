import './CoffeeCard.css';

export default function CoffeeCard({
  item,
  addToCart,
  showCategoryTag = true
}) {
  return (
    <div className="coffee-card">

      {typeof item.image === 'string' &&
      item.image.startsWith('data:') ? (
        <img
          src={item.image}
          alt={item.name}
          className="card-img"
        />
      ) : typeof item.image === 'string' &&
        item.image.includes('/') ? (
        <img
          src={item.image}
          alt={item.name}
          className="card-img"
        />
      ) : (
        <div className="emoji-image">
          {item.image || '☕'}
        </div>
      )}

      {showCategoryTag && (
        <span className="category-tag">
          {item.category}
        </span>
      )}

      <h3>{item.name}</h3>

      <p className="desc">
        {item.desc || 'Freshly prepared at Bunlong Cafe.'}
      </p>

      <div className="card-bottom">

        <span className="price">
          ${Number(item.price).toFixed(2)}
        </span>

        <button
          className="add-btn"
          onClick={() => addToCart(item)}
        >
          + Add
        </button>

      </div>

    </div>
  );
}