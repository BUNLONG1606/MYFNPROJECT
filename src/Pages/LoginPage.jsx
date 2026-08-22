import './LoginPage.css';

export default function LoginPage({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin
}) {
  return (
    <section className="page-container auth-page">

      <div className="auth-card">

        <h2>Welcome to Bunlong Cafe</h2>

        <p className="auth-subtitle">
          Sign in to place orders or manage the store
        </p>

        <form
          onSubmit={handleLogin}
          className="auth-form"
        >

          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="admin@coffee.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Sign In
          </button>

        </form>

        <div className="login-hint">
          <strong>Admin demo:</strong>
          <br />
          admin@coffee.com
          <br />
          admin123
        </div>

      </div>

    </section>
  );
}