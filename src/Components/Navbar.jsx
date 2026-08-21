import './Navbar.css';

export default function Navbar({ currentPage, setCurrentPage, user, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setCurrentPage('menu')}>☕ BUNLONG CAFE</div>
      
      <div className="nav-links">
        <button className={currentPage === 'menu' ? 'active' : ''} onClick={() => setCurrentPage('menu')}>Menu</button>
        <button className={currentPage === 'categories' ? 'active' : ''} onClick={() => setCurrentPage('categories')}>Hot & Cold</button>
        <button className={currentPage === 'about' ? 'active' : ''} onClick={() => setCurrentPage('about')}>About Us</button>
        {user?.isAdmin && (
          <button className={`admin-nav-btn ${currentPage === 'admin' ? 'active' : ''}`} onClick={() => setCurrentPage('admin')}>
            📊 Admin Dashboard
          </button>
        )}
      </div>

      <div className="nav-actions">
        {user ? (
          <div className="user-profile">
            <span>👋 {user.name} {user.isAdmin && <strong className="admin-badge">ADMIN</strong>}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button className={`auth-btn ${currentPage === 'login' ? 'active-auth' : ''}`} onClick={() => setCurrentPage('login')}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}