import React, { useState, useEffect, useRef } from 'react';

function RocketCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [rotation, setRotation] = useState(45);
  const [isVisible, setIsVisible] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Calculate rotation based on movement direction
      const dx = clientX - lastPosition.current.x;
      const dy = clientY - lastPosition.current.y;
      
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 45;
        setRotation(angle);
      }
      
      lastPosition.current = { x: clientX, y: clientY };
      setPosition({ x: clientX, y: clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      className="rocket-cursor"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      🚀
    </div>
  );
}

export default RocketCursor;
