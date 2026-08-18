"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type ProjectCarouselProps = {
  title: string;
  liveUrl?: string;
  screenshots: string[];
};

export default function ProjectCarousel({
  title,
  liveUrl,
  screenshots,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Estados para Zoom y Arrastre (Pan)
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });

  const total = screenshots.length;

  // Reset de zoom al cambiar de slide
  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const nextSlide = useCallback(() => {
    resetZoom();
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total, resetZoom]);

  const prevSlide = useCallback(() => {
    resetZoom();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total, resetZoom]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(Number((prev + 0.35).toFixed(2)), 3.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(Number((prev - 0.35).toFixed(2)), 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleToggleZoom = () => {
    if (zoom > 1) {
      resetZoom();
    } else {
      setZoom(2);
    }
  };

  const closeModal = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      resetZoom();
    }, 220);
  }, [isClosing, resetZoom]);

  // Teclado para navegar carrusel, hacer zoom y cerrar modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-") {
        handleZoomOut();
      } else if (e.key === "0") {
        resetZoom();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, closeModal, nextSlide, prevSlide, resetZoom]);

  // Control de arrastre con el mouse cuando hay zoom
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { x: pan.x, y: pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom con la rueda del ratón (Wheel)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  if (!screenshots || screenshots.length === 0) {
    return (
      <div className="browser-mockup browser-mockup--placeholder">
        <div className="browser-mockup-header">
          <div className="browser-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="browser-address">
            {liveUrl || "https://proyecto.app"}
          </div>
        </div>
        <div className="screenshot-placeholder-content">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <p className="screenshot-placeholder-title">
            Espacio para capturas de pantalla
          </p>
          <p className="screenshot-placeholder-sub">
            Guarda tus imágenes en <code>public/projects/</code> y añade las
            rutas en <code>lib/projects.ts</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── CARRUSEL INLINE EN LA PÁGINA ───────────────── */}
      <div className="project-carousel-container">
        <div className="browser-mockup">
          {/* Barra superior de navegador */}
          <div className="browser-mockup-header">
            <div className="browser-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="browser-address">
              {liveUrl || `https://${title.toLowerCase().replace(/\s+/g, "-")}.app`}
            </div>
            <div className="carousel-counter">
              {currentIndex + 1} / {total}
            </div>
          </div>

          {/* Imagen interactiva principal */}
          <div
            className="carousel-main-view"
            onClick={() => {
              setIsClosing(false);
              resetZoom();
              setIsModalOpen(true);
            }}
            title="Haz clic para abrir el visor con zoom"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsClosing(false);
                resetZoom();
                setIsModalOpen(true);
              }
            }}
          >
            <img
              key={currentIndex}
              src={screenshots[currentIndex]}
              alt={`Captura ${currentIndex + 1} de ${title}`}
              className="carousel-main-image"
              loading="eager"
            />

            {/* Hover overlay hint */}
            <div className="carousel-zoom-hint" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
              <span>Ver con zoom</span>
            </div>
          </div>

          {/* Controles de navegación */}
          {total > 1 && (
            <div className="carousel-nav-bar">
              <button
                type="button"
                className="carousel-nav-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Captura anterior"
              >
                ‹
              </button>
              <span className="carousel-nav-info">
                Captura {currentIndex + 1} de {total}
              </span>
              <button
                type="button"
                className="carousel-nav-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Siguiente captura"
              >
                ›
              </button>
            </div>
          )}
        </div>

        {/* Tira de Miniaturas */}
        {total > 1 && (
          <div className="carousel-thumbnails-strip" role="tablist">
            {screenshots.map((shot, idx) => (
              <button
                key={idx}
                type="button"
                className={`carousel-thumb-item ${
                  idx === currentIndex ? "is-active" : ""
                }`}
                onClick={() => {
                  resetZoom();
                  setCurrentIndex(idx);
                }}
                aria-label={`Ir a captura ${idx + 1}`}
                role="tab"
                aria-selected={idx === currentIndex}
              >
                <img src={shot} alt={`Miniatura ${idx + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL CON CARRUSEL DE PANTALLA COMPLETA & ZOOM ───── */}
      {isModalOpen && (
        <div
          className={`cert-modal-backdrop ${isClosing ? "is-closing" : ""}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${title}`}
        >
          <div
            className={`project-modal-container ${isClosing ? "is-closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal con Controles de Zoom */}
            <div className="cert-modal-header project-modal-header">
              <div>
                <span className="cert-modal-issuer">
                  Captura {currentIndex + 1} de {total}
                </span>
                <h3 className="cert-modal-title">{title}</h3>
              </div>

              {/* Barra de Herramientas de Zoom */}
              <div className="modal-zoom-toolbar">
                <button
                  type="button"
                  className="modal-zoom-btn"
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  title="Reducir zoom (-)"
                  aria-label="Reducir zoom"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="modal-zoom-indicator"
                  onClick={resetZoom}
                  title="Restablecer tamaño (100%)"
                  aria-label="Restablecer zoom al 100%"
                >
                  {Math.round(zoom * 100)}%
                </button>

                <button
                  type="button"
                  className="modal-zoom-btn"
                  onClick={handleZoomIn}
                  disabled={zoom >= 3.5}
                  title="Aumentar zoom (+)"
                  aria-label="Aumentar zoom"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="cert-modal-close"
                  onClick={closeModal}
                  aria-label="Cerrar modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Cuerpo del Modal con Visor, Zoom y Drag */}
            <div
              className={`project-modal-body ${zoom > 1 ? "is-zoomed" : ""} ${
                isDragging ? "is-dragging" : ""
              }`}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {total > 1 && (
                <button
                  type="button"
                  className="modal-arrow-btn modal-arrow-btn--left"
                  onClick={prevSlide}
                  aria-label="Foto anterior"
                >
                  ‹
                </button>
              )}

              <div
                className="modal-image-wrapper"
                onDoubleClick={handleToggleZoom}
                title={
                  zoom > 1
                    ? "Arrastra para mover la imagen · Doble clic para restablecer"
                    : "Doble clic o rueda del mouse para hacer zoom"
                }
              >
                <img
                  key={currentIndex}
                  src={screenshots[currentIndex]}
                  alt={`Captura ${currentIndex + 1} de ${title}`}
                  className="project-modal-image"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
                    transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  draggable={false}
                />
              </div>

              {total > 1 && (
                <button
                  type="button"
                  className="modal-arrow-btn modal-arrow-btn--right"
                  onClick={nextSlide}
                  aria-label="Siguiente foto"
                >
                  ›
                </button>
              )}
            </div>

            {/* Footer con miniaturas */}
            <div className="project-modal-footer">
              <div className="modal-thumbs-row">
                {screenshots.map((shot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`modal-thumb-item ${
                      idx === currentIndex ? "is-active" : ""
                    }`}
                    onClick={() => {
                      resetZoom();
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Ver foto ${idx + 1}`}
                  >
                    <img src={shot} alt={`Miniatura modal ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
