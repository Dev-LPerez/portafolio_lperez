"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

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

  // Touch handling para Swipe y Pinch-to-Zoom
  const touchStartRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const touchDistanceRef = useRef<number | null>(null);
  const lastTapRef = useRef<number>(0);

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

  // ── TOUCH GESTURES (SWIPE & PINCH) PARA MÓVIL ───────────
  // Swipe en carrusel inline
  const handleInlineTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  };

  const handleInlineTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      const dt = Date.now() - touchStartRef.current.time;

      // Si fue swipe horizontal predominante y rápido
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 450) {
        if (dx < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
  };

  // Touch handling en Modal (Swipe cuando zoom=1, Pan cuando zoom>1, Pinch zoom con 2 dedos)
  const handleModalTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };

      // Doble tap en móvil para zoom
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        handleToggleZoom();
        lastTapRef.current = 0;
        return;
      }
      lastTapRef.current = now;

      if (zoom > 1) {
        setIsDragging(true);
        dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        panStartRef.current = { x: pan.x, y: pan.y };
      }
    } else if (e.touches.length === 2) {
      // Inicio de Pinch
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchDistanceRef.current = dist;
    }
  };

  const handleModalTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && zoom > 1 && isDragging) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      setPan({
        x: panStartRef.current.x + dx,
        y: panStartRef.current.y + dy,
      });
    } else if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      // Pinch Zoom en progreso
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchDistanceRef.current;
      if (Math.abs(factor - 1) > 0.05) {
        if (factor > 1) {
          handleZoomIn();
        } else {
          handleZoomOut();
        }
        touchDistanceRef.current = dist;
      }
    }
  };

  const handleModalTouchEnd = (e: React.TouchEvent) => {
    setIsDragging(false);
    touchDistanceRef.current = null;

    if (e.changedTouches.length === 1 && zoom === 1) {
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      const dt = Date.now() - touchStartRef.current.time;

      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4 && dt < 450) {
        if (dx < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
  };

  // Formato limpio de URL para el mockup de navegador
  const formattedDomain = liveUrl
    ? liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${title.toLowerCase().replace(/\s+/g, "-")}.app`;

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
            {formattedDomain}
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
          {/* Barra superior de navegador responsive */}
          <div className="browser-mockup-header">
            <div className="browser-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="browser-address" title={liveUrl || formattedDomain}>
              {formattedDomain}
            </div>
            <div className="carousel-counter">
              {currentIndex + 1} / {total}
            </div>
          </div>

          {/* Imagen interactiva principal con soporte de swipe móvil */}
          <div
            className="carousel-main-view"
            onClick={() => {
              setIsClosing(false);
              resetZoom();
              setIsModalOpen(true);
            }}
            onTouchStart={handleInlineTouchStart}
            onTouchEnd={handleInlineTouchEnd}
            title="Toca para ampliar en pantalla completa"
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
            <Image
              key={currentIndex}
              src={screenshots[currentIndex]}
              alt={`Captura ${currentIndex + 1} de ${title}`}
              width={1200}
              height={750}
              className="carousel-main-image"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              style={{ width: "100%", height: "auto" }}
            />

            {/* Swipe indicator badge para móvil */}
            {total > 1 && (
              <div className="carousel-mobile-swipe-badge" aria-hidden="true">
                <span>Desliza ⟷</span>
              </div>
            )}

            {/* Hover overlay hint */}
            <div className="carousel-zoom-hint" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
              <span>Ampliar</span>
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

              <div className="carousel-dots-indicator" aria-hidden="true">
                {screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`carousel-dot ${idx === currentIndex ? "is-active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      resetZoom();
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Ir a captura ${idx + 1}`}
                  />
                ))}
              </div>

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
                <Image
                  src={shot}
                  alt={`Miniatura ${idx + 1}`}
                  width={160}
                  height={100}
                  sizes="80px"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL CON CARRUSEL DE PANTALLA COMPLETA & ZOOM ───── */}
      {isModalOpen && (
        <div
          className={`cert-modal-backdrop project-modal-backdrop ${isClosing ? "is-closing" : ""}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${title}`}
        >
          <div
            className={`project-modal-container ${isClosing ? "is-closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal con Controles de Zoom Responsive */}
            <div className="cert-modal-header project-modal-header">
              <div className="project-modal-header-info">
                <span className="cert-modal-issuer">
                  {currentIndex + 1} / {total}
                </span>
                <h3 className="cert-modal-title project-modal-title-text">{title}</h3>
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

            {/* Cuerpo del Modal con Visor, Zoom, Drag y Touch Gestures */}
            <div
              className={`project-modal-body ${zoom > 1 ? "is-zoomed" : ""} ${
                isDragging ? "is-dragging" : ""
              }`}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleModalTouchStart}
              onTouchMove={handleModalTouchMove}
              onTouchEnd={handleModalTouchEnd}
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
                    : "Doble clic o pellizca para hacer zoom"
                }
              >
                <Image
                  key={currentIndex}
                  src={screenshots[currentIndex]}
                  alt={`Captura ${currentIndex + 1} de ${title}`}
                  width={1600}
                  height={1000}
                  className="project-modal-image"
                  sizes="100vw"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
                    transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
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
            {total > 1 && (
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
                      <Image
                        src={shot}
                        alt={`Miniatura modal ${idx + 1}`}
                        width={120}
                        height={80}
                        sizes="60px"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
