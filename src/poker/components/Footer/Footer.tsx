import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <p>
        Hecho con ❤️ por <strong>TuNombre</strong>
      </p>

      <div className="footer-links">
        <a href="https://github.com/tuusuario" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
