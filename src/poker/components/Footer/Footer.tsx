import "./Footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          <strong>Navet21</strong> &middot; {currentYear}
        </p>

        <nav className="footer-links" aria-label="Contacto y redes sociales">
          <a href="mailto:navet21dev@gmail.com">
            Contacto
          </a>
          <span className="separator">|</span>
          <a
            href="https://github.com/navet21"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span className="separator">|</span>
          <a
            href="https://linkedin.com/in/navet21"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
