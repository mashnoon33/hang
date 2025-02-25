"use client";
import { useState, useEffect } from 'react';

export const useViewportWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [size, setSize] = useState(getSize(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      setSize(getSize(newWidth));
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return { width, size };
};


export const getSize = (width: number) => {
  if (width < 640) return 'sm';
  if (width < 768) return 'md';
  if (width < 1024) return 'lg';
  if (width < 1280) return 'xl';
  return '2xl';
};