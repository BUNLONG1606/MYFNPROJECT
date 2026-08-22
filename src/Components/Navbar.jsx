import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar({
  currentPage,
  setCurrentPage,
  user,
  handleLogout
}) {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">

      <button
        className="logo"
        onClick={() => navigate('menu')}
      >
        ☕ Bunlong Cafe
      </button>

      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-menu ${isOpen ? 'open' : ''}`}>

        <div className="nav-links">

          <button
            className={currentPage === 'menu' ? 'active' : ''}
            onClick={() => navigate('menu')}
          >
            Home
          </button>

          <button
            className={currentPage === 'categories' ? 'active' : ''}
            onClick={() => navigate('categories')}
          >
            Categories
          </button>

          <button
            className={currentPage === 'about' ? 'active' : ''}
            onClick={() => navigate('about')}
          >
            About
          </button>

          {user?.isAdmin && (
            <button
              className={currentPage === 'admin' ? 'active' : ''}
              onClick={() => navigate('admin')}
            >
              Admin
            </button>
          )}

        </div>

        <div className="nav-actions">

          {user ? (
            <div className="user-profile">

              <span className="welcome-user">
                Hello, <strong>{user.name}</strong>

                {user.isAdmin && (
                  <span className="admin-badge">
                    Admin
                  </span>
                )}
              </span>

              <button
                className="logout-btn"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>

            </div>
          ) : (
            <button
              className="auth-btn"
              onClick={() => navigate('login')}
            >
              Login
            </button>
          )}

        </div>

      </div>

    </nav>
  );
}