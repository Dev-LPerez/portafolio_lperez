import React, { useState, useEffect, useCallback, useRef } from "react";

export type Certificate = {
  date: string;
  title: string;
  issuer: string;
  detail?: string;
  link?: string;
  image?: string;
};

type CertificatesListProps = {
  certificates: Certificate[];
};

export default function CertificatesList({ certificates }: CertificatesListProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = (cert: Certificate, e?: React.MouseEvent) => {
    triggerRef.current = (e?.currentTarget as HTMLElement) || (document.activeElement as HTMLElement);
    setIsClosing(false);
    setSelectedCert(cert);
  };

  const closeModal = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setSelectedCert(null);
      setIsClosing(false);
      triggerRef.current?.focus();
    }, 220);
  }, [isClosing]);

  // Cerrar modal con tecla Escape, atrapar foco y bloquear scroll de fondo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    if (selectedCert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert, closeModal]);

  return (
    <>
      <div className="timeline" role="list">
        {certificates.map((cert, i) => (
          <article key={i} className="timeline-entry cert-timeline-entry" role="listitem">
            <p className="timeline-year">{cert.date}</p>
            
            <div className="cert-entry-main">
              <div className="cert-entry-info">
                <p className="timeline-role">{cert.title}</p>
                <p className="timeline-company">{cert.issuer}</p>
                {cert.detail && <p className="timeline-detail">{cert.detail}</p>}
                
                {cert.link && (
                  <p style={{ marginTop: "0.5rem" }}>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Ver credencial ↗
                    </a>
                  </p>
                )}
              </div>

              {/* Recuadro / Thumbnail de la Imagen */}
              <div className="cert-entry-thumb-wrapper">
                {cert.image ? (
                  <button
                    type="button"
                    className="cert-thumb-btn"
                    onClick={(e) => openModal(cert, e)}
                    title={`Ver imagen de ${cert.title}`}
                    aria-label={`Ampliar imagen de ${cert.title}`}
                  >
                    <img
                      src={cert.image}
                      alt={`Certificado: ${cert.title}`}
                      width={120}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="cert-thumb-img"
                    />
                    <span className="cert-thumb-overlay">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </span>
                  </button>
                ) : (
                  <div className="cert-thumb-placeholder" title="Imagen pendiente">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    <span>{cert.issuer}</span>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── MODAL ANIMADO DE VISUALIZACIÓN (MONOCROMO) ──────── */}
      {selectedCert && (
        <div
          className={`cert-modal-backdrop ${isClosing ? "is-closing" : ""}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <div
            ref={modalRef}
            className={`cert-modal-container ${isClosing ? "is-closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="cert-modal-header">
              <div>
                <span className="cert-modal-issuer">{selectedCert.issuer} — {selectedCert.date}</span>
                <h3 id="cert-modal-title" className="cert-modal-title">
                  {selectedCert.title}
                </h3>
              </div>
              <button
                type="button"
                className="cert-modal-close"
                onClick={closeModal}
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            {/* Imagen del Certificado */}
            <div className="cert-modal-body">
              {selectedCert.image ? (
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  width={900}
                  height={600}
                  decoding="async"
                  className="cert-modal-image"
                  style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "75vh" }}
                />
              ) : null}
            </div>

            {/* Footer del Modal */}
            <div className="cert-modal-footer">
              {selectedCert.detail ? (
                <p className="cert-modal-detail">{selectedCert.detail}</p>
              ) : <div />}
              {selectedCert.link && (
                <a
                  href={selectedCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--solid cert-modal-btn"
                >
                  Ver credencial oficial ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
