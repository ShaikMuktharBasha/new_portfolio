import React, { useEffect, useRef } from 'react';

function RocketCursor() {
  const cursorRef = useRef(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const currentRotation = useRef(45);
  const rafId = useRef(null);
  const targetPosition = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const updateCursor = () => {
      cursor.style.left = `${targetPosition.current.x}px`;
      cursor.style.top = `${targetPosition.current.y}px`;
      cursor.style.transform = `translate(-50%, -50%) rotate(${currentRotation.current}deg)`;
      rafId.current = null;
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Calculate rotation based on movement direction
      const dx = clientX - lastPosition.current.x;
      const dy = clientY - lastPosition.current.y;
      
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        currentRotation.current = Math.atan2(dy, dx) * (180 / Math.PI) + 45;
      }
      
      lastPosition.current = { x: clientX, y: clientY };
      targetPosition.current = { x: clientX, y: clientY };
      
      // Use requestAnimationFrame for smooth updates
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updateCursor);
      }
      
      cursor.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="rocket-cursor"
      style={{
        left: -100,
        top: -100,
        transform: 'translate(-50%, -50%) rotate(45deg)',
        opacity: 0,
      }}
    >
      🚀
    </div>
  );
}

export default RocketCursor;
