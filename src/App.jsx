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

// Global layout styles
import './App.css';

const INITIAL_ITEMS = [
  { id: 1, name: 'Espresso', category: 'Hot Drinks', price: 1.00, desc: 'Rich and bold single shot of roasted espresso', image: '☕' },
  { id: 2, name: 'Cappuccino', category: 'Hot Drinks', price: 1.50, desc: 'Equal parts espresso, steamed milk, and rich foam', image: '🥛' },
  { id: 3, name: 'Caramel Macchiato', category: 'Hot Drinks', price: 1.50, desc: 'Fresh espresso with vanilla syrup and caramel drizzle', image: '🍯' },
  { id: 4, name: 'Ice Vanila', category: 'Cold Drinks', price: 1.50, desc: 'Coffee mix with vanila', image: '🥛' },
  { id: 5, name: 'Iced Matcha Latte', category: 'Cold Drinks', price: 1.50, desc: 'Japanese green tea with chilled milk over ice', image: '🍵' },
  { id: 6, name: 'Iced Americano', category: 'Cold Drinks', price: 1.25, desc: 'Espresso shots topped with cold water and ice', image: '🥤' },
  { id: 7, name: 'Ice Mocha', category: 'Cold Drinks', price: 1.50, desc: 'Coffee mix with chocolate', image: '🥛' },
  { id: 8, name: 'Hot Chocolate', category: 'Hot Drinks', price: 1.25, desc: 'Velvety steamed milk with rich dark chocolate fudge', image: '☕' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('menu');
  const [menuItems, setMenuItems] = useState(INITIAL_ITEMS);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);

  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Admin New Item Form State
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Hot Drinks');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemImage, setNewItemImage] = useState('☕');

  // Cart Functions
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Authentication Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return alert('Please enter both email and password.');
    
    const cleanEmail = email.toLowerCase().trim();
    const isAdminAccount = cleanEmail === 'admin@coffee.com';

    if (isAdminAccount && password !== 'admin123') {
      alert('Incorrect password for admin account.');
      return;
    }

    const username = cleanEmail.split('@')[0];
    setUser({ name: username, email: cleanEmail, isAdmin: isAdminAccount });

    if (isAdminAccount) {
      setCurrentPage('admin');
    } else {
      setCurrentPage('menu');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    setCurrentPage('login');
  };

  // Checkout Handler
  const handleCheckout = () => {
    if (!user) {
      alert('Please log in first to complete your order!');
      setCurrentPage('login');
      return;
    }

    const newOrder = {
      id: Date.now(),
      buyerName: user.name,
      buyerEmail: user.email,
      items: cart,
      total: totalPrice,
      date: new Date().toLocaleString(),
    };

    setCustomerOrders((prev) => [newOrder, ...prev]);
    alert(`Thank you for your order, ${user.name}! Total: $${totalPrice}`);
    setCart([]);
  };

  // Admin Handler to Add Menu Item
  const handleAddMenuItem = (e) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return alert('Please provide an item name and price.');

    const newItem = {
      id: Date.now(),
      name: newItemName,
      category: newItemCategory,
      price: parseFloat(newItemPrice),
      desc: newItemDesc,
      image: newItemImage || '☕',
    };

    setMenuItems((prev) => [...prev, newItem]);
    alert(`"${newItemName}" added to the menu successfully!`);

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
          <CategoriesPage menuItems={menuItems} addToCart={addToCart} />
        )}

        {currentPage === 'about' && <AboutPage />}

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