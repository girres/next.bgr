'use client';

import { useEffect, useState, useRef } from 'react';
import './cursor.scss';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);
  const timeoutRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const updatePosition = (e) => {
      const newPos = { x: e.clientX, y: e.clientY, id: Date.now(), timestamp: Date.now() };
      setPosition(newPos);

      // Add to trail with timestamp
      trailRef.current = [...trailRef.current, newPos].slice(-12);
      setTrail([...trailRef.current]);

      if (!isVisible) setIsVisible(true);

      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set timeout to clear trail when mouse stops
      timeoutRef.current = setTimeout(() => {
        trailRef.current = [];
        setTrail([]);
      }, 100);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      trailRef.current = [];
      setTrail([]);
    };

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .project, .job-card, .client'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });

      return interactiveElements;
    };

    // Animation loop to fade out old trail particles
    const animate = () => {
      const now = Date.now();
      trailRef.current = trailRef.current.filter(
        (pos) => now - pos.timestamp < 150
      );
      setTrail([...trailRef.current]);
      rafRef.current = requestAnimationFrame(animate);
    };

    // Initial setup
    const elements = addHoverListeners();

    // Mouse move listener
    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    // Observer for dynamically added elements
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      elements.forEach((el) => {
        el.removeEventListener('mouseenter', () => setIsHovering(true));
        el.removeEventListener('mouseleave', () => setIsHovering(false));
      });

      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <>
      {/* Trail */}
      {trail.map((pos, index) => {
        const age = Date.now() - pos.timestamp;
        const lifespan = 150;
        const progress = Math.min(age / lifespan, 1);
        const opacity = (1 - progress) * 0.6 * (index / Math.max(trail.length, 1));
        const scale = 0.4 + (index / Math.max(trail.length, 1)) * 0.6;

        return (
          <div
            key={pos.id}
            className='custom-cursor-trail'
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              opacity: opacity,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          />
        );
      })}

      {/* Main cursor */}
      <div
        className={`custom-cursor ${isHovering ? 'hovering' : ''} ${
          isVisible ? 'visible' : ''
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Dot */}
      <div
        className={`custom-cursor-dot ${isVisible ? 'visible' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
