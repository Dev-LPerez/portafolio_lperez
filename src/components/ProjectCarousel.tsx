import React, { useState, useEffect, useCallback, useRef } from "react";

type ProjectCarouselProps = {
  title: string;
  slug?: string;
  liveUrl?: string;
  screenshots: string[];
};

export default function ProjectCarousel({
  title,
  slug,
  liveUrl,
  screenshots,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Mapa reactivo de orientación por captura (vertical vs horizontal)
  const [portraitMap, setPortraitMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    screenshots.forEach((src) => {
      if (typeof window === "undefined") return;
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        const isPortrait = img.naturalHeight > img.naturalWidth * 1.12;
        setPortraitMap((prev) => (prev[src] === isPortrait ? prev : { ...prev, [src]: isPortrait }));
      };
    });
  }, [screenshots]);

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

  const triggerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = (e?: React.MouseEvent | React.KeyboardEvent) => {
    triggerRef.current = (e?.currentTarget as HTMLElement) || (document.activeElement as HTMLElement);
    setIsClosing(false);
    resetZoom();
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      resetZoom();
      triggerRef.current?.focus();
    }, 220);
  }, [isClosing, resetZoom]);

  // Teclado para navegar carrusel, hacer zoom, cerrar modal y atrapar foco accesible
  useEffect(() => {
    if (!isModalOpen) return;

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
      <div
        className="browser-mockup browser-mockup--placeholder"
        style={slug ? ({ viewTransitionName: `project-cover-${slug}` } as React.CSSProperties) : undefined}
      >
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
        <div className="screenshot-placeholder-content" style={{ padding: "3.5rem 1.5rem", textAlign: "center" }}>
          <div
            style={{
              width: "3.5rem",
              height: "3.5rem",
              margin: "0 auto 1rem",
              borderRadius: "50%",
              backgroundColor: "var(--color-paper)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--color-border)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              style={{ width: "1.75rem", height: "1.75rem", color: "var(--color-ink)" }}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 14.25h13.5m-13.5 3h13.5m-9-9h9m-9 3h9m-11.25 6h.008v.008h-.008v-.008zm0-3h.008v.008h-.008v-.008zm0-3h.008v.008h-.008v-.008zm0-3h.008v.008h-.008v-.008zM3.75 3.75h16.5a1.5 1.5 0 011.5 1.5v13.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5z"
              />
            </svg>
          </div>
          <h3 className="screenshot-placeholder-title" style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>
            Arquitectura de Backend & Base de Datos
          </h3>
          <p className="screenshot-placeholder-sub" style={{ maxWidth: "48ch", margin: "0 auto 1.25rem", color: "var(--color-muted-foreground)", fontSize: "0.875rem" }}>
            Este proyecto está centrado en la lógica del servidor, modelos relacionales y concurrencia. El código fuente completo y los esquemas están disponibles en su repositorio.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <span className="tag">Modelado Relacional</span>
            <span className="tag">Clean Architecture</span>
            <span className="tag">API Endpoints</span>
          </div>
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
          {(() => {
            const currentShot = screenshots[currentIndex] || "";
            const isPortrait = Boolean(portraitMap[currentShot]);

            return (
              <div
                className={`carousel-main-view ${isPortrait ? "carousel-main-view--portrait" : ""}`}
                onClick={openModal}
                onTouchStart={handleInlineTouchStart}
                onTouchEnd={handleInlineTouchEnd}
                title="Toca para ampliar en pantalla completa"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    openModal(e);
                  }
                }}
              >
                {/* Fondo ambiental desenfocado dinámico para capturas verticales */}
                {isPortrait && (
                  <div
                    className="carousel-portrait-ambient"
                    style={{ backgroundImage: `url("${currentShot}")` }}
                    aria-hidden="true"
                  />
                )}

                {/* Badge distintivo de captura móvil */}
                {isPortrait && (
                  <div className="carousel-portrait-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="6" y="2" width="12" height="20" rx="3" ry="3" />
                      <circle cx="12" cy="18" r="1" />
                    </svg>
                    <span>Vista Móvil</span>
                  </div>
                )}

                <img
                  key={currentIndex}
                  src={currentShot}
                  alt={`Captura ${currentIndex + 1} de ${title}`}
                  width={1200}
                  height={750}
                  className={`carousel-main-image ${isPortrait ? "carousel-main-image--portrait" : ""}`}
                  loading={currentIndex === 0 ? "eager" : "lazy"}
                  decoding="async"
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    const isP = img.naturalHeight > img.naturalWidth * 1.12;
                    setPortraitMap((prev) => (prev[currentShot] === isP ? prev : { ...prev, [currentShot]: isP }));
                  }}
                  style={{
                    ...(isPortrait
                      ? {
                          width: "auto",
                          height: "92%",
                          maxHeight: "92%",
                          maxWidth: "92%",
                          objectFit: "contain",
                        }
                      : {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }),
                    ...(slug && currentIndex === 0 ? { viewTransitionName: `project-cover-${slug}` } : {}),
                  }}
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
            );
          })()}

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
            {screenshots.map((shot, idx) => {
              const isThumbPortrait = Boolean(portraitMap[shot]);
              return (
                <button
                  key={idx}
                  type="button"
                  className={`carousel-thumb-item ${
                    idx === currentIndex ? "is-active" : ""
                  } ${isThumbPortrait ? "carousel-thumb-item--portrait" : ""}`}
                  onClick={() => {
                    resetZoom();
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Ir a captura ${idx + 1}`}
                  role="tab"
                  aria-selected={idx === currentIndex}
                >
                  <img
                    src={shot}
                    alt={`Miniatura ${idx + 1}`}
                    width={160}
                    height={100}
                    loading="lazy"
                    decoding="async"
                    className={isThumbPortrait ? "carousel-thumb-img--portrait" : ""}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: isThumbPortrait ? "contain" : "cover",
                    }}
                  />
                  {isThumbPortrait && (
                    <span className="carousel-thumb-portrait-tag" title="Captura vertical">
                      MÓVIL
                    </span>
                  )}
                </button>
              );
            })}
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
            ref={modalRef}
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
            {(() => {
              const currentShot = screenshots[currentIndex] || "";
              const isPortrait = Boolean(portraitMap[currentShot]);

              return (
                <div
                  className={`project-modal-body ${zoom > 1 ? "is-zoomed" : ""} ${
                    isDragging ? "is-dragging" : ""
                  } ${isPortrait ? "project-modal-body--portrait" : ""}`}
                  onWheel={handleWheel}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleModalTouchStart}
                  onTouchMove={handleModalTouchMove}
                  onTouchEnd={handleModalTouchEnd}
                >
                  {/* Fondo ambiental sutil desenfocado en modal para verticales */}
                  {isPortrait && (
                    <div
                      className="carousel-portrait-ambient modal-portrait-ambient"
                      style={{ backgroundImage: `url("${currentShot}")` }}
                      aria-hidden="true"
                    />
                  )}

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
                    className={`modal-image-wrapper ${isPortrait ? "modal-image-wrapper--portrait" : ""}`}
                    onDoubleClick={handleToggleZoom}
                    title={
                      zoom > 1
                        ? "Arrastra para mover la imagen · Doble clic para restablecer"
                        : "Doble clic o pellizca para hacer zoom"
                    }
                  >
                    <img
                      key={currentIndex}
                      src={currentShot}
                      alt={`Captura ${currentIndex + 1} de ${title}`}
                      width={1600}
                      height={1000}
                      className={`project-modal-image ${isPortrait ? "project-modal-image--portrait" : ""}`}
                      style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
                        transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        maxWidth: "100%",
                        maxHeight: isPortrait ? "78vh" : "68vh",
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
              );
            })()}

            {/* Footer con miniaturas */}
            {total > 1 && (
              <div className="project-modal-footer">
                <div className="modal-thumbs-row">
                  {screenshots.map((shot, idx) => {
                    const isThumbPortrait = Boolean(portraitMap[shot]);
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`modal-thumb-item ${
                          idx === currentIndex ? "is-active" : ""
                        } ${isThumbPortrait ? "modal-thumb-item--portrait" : ""}`}
                        onClick={() => {
                          resetZoom();
                          setCurrentIndex(idx);
                        }}
                        aria-label={`Ver foto ${idx + 1}`}
                      >
                        <img
                          src={shot}
                          alt={`Miniatura modal ${idx + 1}`}
                          width={120}
                          height={80}
                          loading="lazy"
                          decoding="async"
                          className={isThumbPortrait ? "modal-thumb-img--portrait" : ""}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: isThumbPortrait ? "contain" : "cover",
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
