import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Bunlong Cafe. All rights reserved.</p>
    </footer>
  );
}