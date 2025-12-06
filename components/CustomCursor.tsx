
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Magnetize to clickable elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Smooth follower animation using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const animateFollower = () => {
      setFollowerPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15, // Spring physics
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(animateFollower);
    };

    animationFrameId = requestAnimationFrame(animateFollower);

    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  // Hide on touch devices
  if (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${active ? 'active' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        ref={followerRef}
        className={`custom-cursor-follower ${active ? 'active' : ''}`}
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;
