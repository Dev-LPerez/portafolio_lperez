import Link from "next/link";

export default function NotFound() {
  return (
    <div className="error-page">
      <p className="display error-code" aria-hidden="true">404</p>
      <h1 className="error-title">Página no encontrada</h1>
      <p className="error-message">
        La página que buscas no existe o fue movida a otra dirección.
      </p>
      <div className="error-actions">
        <Link href="/" className="btn btn--solid" id="not-found-home">
          Ir al inicio
        </Link>
        <Link href="/proyectos" className="btn btn--outline" id="not-found-projects">
          Ver proyectos
        </Link>
      </div>
    </div>
  );
}
