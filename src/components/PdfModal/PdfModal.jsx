import React, { useEffect } from "react";

/**
 * PdfModal — shows a PDF on the current page (no new tab / no navigation)
 * using a bare iframe so the browser's native PDF viewer renders it.
 *
 * Props:
 *  - open:     boolean, controls visibility
 *  - onClose:  callback to close the modal
 *  - title:    title shown in the slim header bar
 *  - src:      bundled PDF URL (imported asset)
 *  - height:   iframe height (number or CSS string), default 560
 */
const PdfModal = ({
  open,
  onClose,
  title = "Document",
  src,
  height = 560,
}) => {
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "Nunito, sans-serif",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(920px, 100%)",
          height: "min(92vh, 1100px)",
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 24px 70px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "12px 18px",
            borderBottom: "1px solid #eef0f2",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 15, color: "#354138" }}>
            {title}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              border: "none",
              background: "none",
              fontSize: 24,
              lineHeight: 1,
              cursor: "pointer",
              color: "#666",
              padding: "0 2px",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
          >
            ×
          </button>
        </div>
        <iframe
          src={src}
          title={title}
          style={{
            width: "100%",
            flex: 1,
            minHeight: height,
            border: "none",
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

export default PdfModal;
