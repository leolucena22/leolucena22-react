import { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export function ConfirmModal({ isOpen, title, message, confirmLabel = 'Excluir', cancelLabel = 'Cancelar', onConfirm, onCancel, variant = 'danger' }) {
  const modalRef = useRef(null);
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the cancel button for safety
      setTimeout(() => confirmBtnRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onCancel();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const colors = {
    danger: {
      icon: '#ff4d4d',
      iconBg: 'rgba(255, 77, 77, 0.12)',
      btnBg: 'linear-gradient(135deg, #ff4d4d 0%, #e53935 100%)',
      btnHover: '#ff6b6b',
    },
    warning: {
      icon: '#ffb300',
      iconBg: 'rgba(255, 179, 0, 0.12)',
      btnBg: 'linear-gradient(135deg, #ffb300 0%, #ff8f00 100%)',
      btnHover: '#ffc107',
    },
  };

  const c = colors[variant] || colors.danger;

  return (
    <div
      onClick={onCancel}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 9999,
        animation: 'confirmOverlayIn 0.2s ease forwards',
        padding: '1rem',
      }}
    >
      <style>{`
        @keyframes confirmOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes confirmModalIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .confirm-cancel-btn:hover {
          background-color: rgba(255,255,255,0.08) !important;
          color: var(--text-primary) !important;
        }
        .confirm-action-btn:hover {
          filter: brightness(1.15);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(255, 77, 77, 0.3);
        }
      `}</style>

      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '2rem',
          maxWidth: '420px',
          width: '100%',
          animation: 'confirmModalIn 0.25s ease forwards',
          boxShadow: '0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onCancel}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            transition: 'color 0.2s',
          }}
          aria-label="Fechar"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: c.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AlertTriangle size={28} color={c.icon} />
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            margin: '0 0 0.5rem',
            fontSize: '1.2rem',
            fontWeight: 700,
            textAlign: 'center',
            color: 'var(--text-primary)',
          }}
        >
          {title}
        </h3>

        {/* Message */}
        <p
          style={{
            margin: '0 0 1.75rem',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          {message}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={onCancel}
            className="confirm-cancel-btn"
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmBtnRef}
            onClick={onConfirm}
            className="confirm-action-btn"
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: c.btnBg,
              color: '#fff',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
