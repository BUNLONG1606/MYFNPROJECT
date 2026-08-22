import { useState } from 'react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';

// Images
import caramelLateImg from './images/CaramelLate.png';
import expressoImg from './images/Expresso.png';
import hotChocolateImg from './images/HotChocolate.png';
import iceAmericanoImg from './images/IceAmericano.png';
import iceCapuccinoImg from './images/IceCapuccino.png';
import iceLateImg from './images/IceLate.png';
import iceMatchaLateImg from './images/IceMatchaLate.png';
import iceMochaImg from './images/IceMocha.png';
import iceVanilaImg from './images/IceVanila.png';

// Global styles
import './App.css';

const INITIAL_ITEMS = [
  {
    id: 1,
    name: 'Espresso',
    category: 'Hot Drinks',
    price: 1.00,
    desc: 'Rich and strong espresso made from freshly roasted coffee beans.',
    image: expressoImg
  },
  {
    id: 2,
    name: 'Iced Cappuccino',
    category: 'Cold Drinks',
    price: 1.50,
    desc: 'Smooth espresso with cold milk and creamy foam.',
    image: iceCapuccinoImg
  },
  {
    id: 3,
    name: 'Caramel Latte',
    category: 'Cold Drinks',
    price: 1.50,
    desc: 'Creamy latte with a sweet caramel flavor.',
    image: caramelLateImg
  },
  {
    id: 4,
    name: 'Iced Vanilla',
    category: 'Cold Drinks',
    price: 1.50,
    desc: 'Refreshing iced coffee with a smooth vanilla flavor.',
    image: iceVanilaImg
  },
  {
    id: 5,
    name: 'Iced Matcha Latte',
    category: 'Cold Drinks',
    price: 1.50,
    desc: 'Refreshing matcha blended with creamy milk.',
    image: iceMatchaLateImg
  },
  {
    id: 6,
    name: 'Iced Americano',
    category: 'Cold Drinks',
    price: 1.25,
    desc: 'Bold espresso served over ice and cold water.',
    image: iceAmericanoImg
  },
  {
    id: 7,
    name: 'Iced Mocha',
    category: 'Cold Drinks',
    price: 1.50,
    desc: 'Chocolate, espresso and milk served chilled.',
    image: iceMochaImg
  },
  {
    id: 8,
    name: 'Hot Chocolate',
    category: 'Hot Drinks',
    price: 1.25,
    desc: 'Warm and creamy chocolate drink.',
    image: hotChocolateImg
  },
  {
    id: 9,
    name: 'Iced Latte',
    category: 'Cold Drinks',
    price: 1.50,
    desc: 'Smooth espresso with cold milk served over ice.',
    image: iceLateImg
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('menu');
  const [menuItems, setMenuItems] = useState(INITIAL_ITEMS);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);

  // Login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Admin form
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Hot Drinks');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemImage, setNewItemImage] = useState('☕');

  // =========================
  // CART
  // =========================

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);

      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prevCart,
        {
          ...item,
          quantity: 1
        }
      ];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + delta;

            return newQuantity > 0
              ? { ...item, quantity: newQuantity }
              : null;
          }

          return item;
        })
        .filter(Boolean)
    );
  };

  const totalCartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart
    .reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    .toFixed(2);

  // =========================
  // LOGIN
  // =========================

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    const cleanEmail = email.toLowerCase().trim();

    const isAdminAccount =
      cleanEmail === 'admin@coffee.com';

    if (isAdminAccount && password !== 'admin123') {
      alert('Incorrect password for admin account.');
      return;
    }

    const username = cleanEmail.split('@')[0];

    const loggedInUser = {
      name: username,
      email: cleanEmail,
      isAdmin: isAdminAccount
    };

    setUser(loggedInUser);

    if (isAdminAccount) {
      setCurrentPage('admin');
    } else {
      setCurrentPage('menu');
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    setCart([]);
    setCurrentPage('login');
  };

  // =========================
  // CHECKOUT
  // =========================

  const handleCheckout = () => {
    if (!user) {
      alert('Please log in first to complete your order.');
      setCurrentPage('login');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const newOrder = {
      id: Date.now(),
      buyerName: user.name,
      buyerEmail: user.email,
      items: cart,
      total: totalPrice,
      date: new Date().toLocaleString()
    };

    setCustomerOrders((prevOrders) => [
      newOrder,
      ...prevOrders
    ]);

    alert(
      `Thank you for your order, ${user.name}! Total: $${totalPrice}`
    );

    setCart([]);
  };

  // =========================
  // ADMIN ADD ITEM
  // =========================

  const handleAddMenuItem = (e) => {
    e.preventDefault();

    if (!newItemName.trim() || !newItemPrice) {
      alert('Please provide an item name and price.');
      return;
    }

    const price = parseFloat(newItemPrice);

    if (Number.isNaN(price) || price <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    const newItem = {
      id: Date.now(),
      name: newItemName.trim(),
      category: newItemCategory,
      price,
      desc: newItemDesc.trim() || 'Freshly prepared at Bunlong Cafe.',
      image: newItemImage.trim() || '☕'
    };

    setMenuItems((prevItems) => [
      ...prevItems,
      newItem
    ]);

    alert(
      `"${newItem.name}" added to the menu successfully!`
    );

    setNewItemName('');
    setNewItemCategory('Hot Drinks');
    setNewItemPrice('');
    setNewItemDesc('');
    setNewItemImage('☕');
  };

  return (
    <div className="coffee-app">

      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        handleLogout={handleLogout}
      />

      <main className="main-content">

        {currentPage === 'login' && (
          <LoginPage
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        )}

        {currentPage === 'menu' && (
          <MenuPage
            menuItems={menuItems}
            addToCart={addToCart}
            cart={cart}
            updateQuantity={updateQuantity}
            totalCartCount={totalCartCount}
            totalPrice={totalPrice}
            handleCheckout={handleCheckout}
          />
        )}

        {currentPage === 'categories' && (
          <CategoriesPage
            menuItems={menuItems}
            addToCart={addToCart}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            user={user}
            setCurrentPage={setCurrentPage}
            handleAddMenuItem={handleAddMenuItem}
            newItemName={newItemName}
            setNewItemName={setNewItemName}
            newItemCategory={newItemCategory}
            setNewItemCategory={setNewItemCategory}
            newItemPrice={newItemPrice}
            setNewItemPrice={setNewItemPrice}
            newItemImage={newItemImage}
            setNewItemImage={setNewItemImage}
            newItemDesc={newItemDesc}
            setNewItemDesc={setNewItemDesc}
            customerOrders={customerOrders}
          />
        )}

      </main>

      <Footer />

    </div>
  );
}