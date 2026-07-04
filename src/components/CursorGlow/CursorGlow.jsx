import { useEffect, useRef } from 'react';
import './CursorGlow.css';

export function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;

    function handleMouseMove(e) {
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
    }

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />;
}
