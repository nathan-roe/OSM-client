"use client";
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Box } from '@mantine/core';

interface GradientMeshBackgroundProps {
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  animated?: boolean;
  interactive?: boolean;
  speed?: 'slow' | 'medium' | 'fast';
  opacity?: number;
  blur?: number;
  blobCount?: number;
  performanceMode?: boolean;
  meshPattern?: 'grid' | 'dots' | 'hexagons' | 'none';
}

interface Blob {
  id: number;
  top: string;
  left: string;
  width: string;
  height: string;
  color: string;
  borderRadius: string;
  animationClass: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
  scale: number;
  transform: string;
}

const GradientMeshBackground: React.FC<GradientMeshBackgroundProps> = ({
  primaryColor = 'var(--mantine-color-primary-4)',
  secondaryColor = 'var(--mantine-color-secondary-4)',
  tertiaryColor = 'var(--mantine-color-primary-7)',
  animated = true,
  interactive = false,
  speed = 'medium',
  opacity = 0.25,
  blur = 70,
  blobCount = 3,
  performanceMode = false,
  meshPattern = 'hexagons',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowReady, setWindowReady] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Define animation durations based on speed
  const durationSettings = useMemo(() => {
    const baseDuration = {
      slow: 30,
      medium: 15,
      fast: 5
    }[speed];
    
    return {
      base: baseDuration,
      short: baseDuration * 0.7,
      long: baseDuration * 1.5,
      veryLong: baseDuration * 2
    };
  }, [speed]);
  
  // Get random values for blob generation
  const getRandomValue = useCallback((min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }, []);
  
  // Generate blobs with varied properties
  const generateBlobs = useCallback(() => {
    // Adjust blob count based on performance mode
    const adjustedBlobCount = performanceMode ? Math.min(3, blobCount) : blobCount;
    const colors = [primaryColor, secondaryColor, tertiaryColor];
    const animations = ["blob-morph", "blob-float", "blob-pulse"];
    
    let newBlobs: Blob[] = [];
    
    for (let i = 0; i < adjustedBlobCount; i++) {
      const blobSize = getRandomValue(30, 70);
      const aspectRatio = getRandomValue(0.7, 1.3);
      
      // Create varied border radius for organic shapes
      const br1 = getRandomValue(30, 70);
      const br2 = getRandomValue(30, 70);
      const br3 = getRandomValue(30, 70);
      const br4 = getRandomValue(30, 70);
      
      const animationIndex = Math.floor(getRandomValue(0, animations.length));
      const animationClass = animated ? animations[animationIndex] : "";
      
      // Ensure blobs are distributed across the screen
      const quadrant = i % 4; // 0: top-left, 1: top-right, 2: bottom-left, 3: bottom-right
      
      let top, left;
      switch (quadrant) {
        case 0: // top-left
          top = `${getRandomValue(-20, 30)}%`;
          left = `${getRandomValue(-20, 30)}%`;
          break;
        case 1: // top-right
          top = `${getRandomValue(-20, 30)}%`;
          left = `${getRandomValue(60, 110)}%`;
          break;
        case 2: // bottom-left
          top = `${getRandomValue(60, 110)}%`;
          left = `${getRandomValue(-20, 30)}%`;
          break;
        case 3: // bottom-right
          top = `${getRandomValue(60, 110)}%`;
          left = `${getRandomValue(60, 110)}%`;
          break;
        default:
          // For any additional blobs, place them randomly
          top = `${getRandomValue(-20, 100)}%`;
          left = `${getRandomValue(-20, 100)}%`;
      }
      
      // Ensure first 3 blobs are in primary positions if low blob count
      if (adjustedBlobCount <= 4 && i < 3) {
        switch (i) {
          case 0: // primary blob - top left
            top = '-10%';
            left = '-15%';
            break;
          case 1: // secondary blob - bottom right
            top = '70%';
            left = '80%';
            break;
          case 2: // middle blob
            top = '40%';
            left = '30%';
            break;
        }
      }
      
      // Add some variation to the animation duration
      const durationVariation = getRandomValue(0.8, 1.2);
      let animationDuration;
      
      if (i % 3 === 0) {
        animationDuration = `${durationSettings.short * durationVariation}s`;
      } else if (i % 3 === 1) {
        animationDuration = `${durationSettings.base * durationVariation}s`;
      } else {
        animationDuration = `${durationSettings.long * durationVariation}s`;
      }
      
      // Vary the delays to prevent synchronized animations
      const animationDelay = `${getRandomValue(0, durationSettings.base / 2)}s`;
      
      // Choose color from our 3 options with some variation
      const colorIndex = i % 3;
      
      // Create the blob
      newBlobs.push({
        id: i,
        top,
        left,
        width: `${blobSize}%`,
        height: `${blobSize * aspectRatio}%`,
        color: colors[colorIndex],
        borderRadius: `${br1}% ${br2}% ${br3}% ${br4}%`,
        animationClass,
        animationDuration,
        animationDelay,
        opacity: opacity * getRandomValue(0.8, 1.2),
        scale: 1,
        transform: 'scale(1) translate(0, 0)'
      });
    }
    
    return newBlobs;
  }, [
    primaryColor, secondaryColor, tertiaryColor, 
    animated, getRandomValue, durationSettings, 
    blobCount, performanceMode, opacity
  ]);
  
  // Handle mouse movement for interactive mode
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!interactive || performanceMode) return;
    
    // Only update if container ref exists
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
    
    // Update blob positions based on mouse - with requestAnimationFrame for performance
    requestAnimationFrame(() => {
      setBlobs(prevBlobs => {
        return prevBlobs.map(blob => {
          // Calculate distance from blob center to mouse (simplified)
          const blobCenterX = parseFloat(blob.left) / 100;
          const blobCenterY = parseFloat(blob.top) / 100;
          
          // Distance influences how much the blob reacts
          const distance = Math.sqrt(
            Math.pow(blobCenterX - x, 2) + 
            Math.pow(blobCenterY - y, 2)
          );
          
          // Closer blobs react more strongly
          const influence = Math.max(0, 1 - distance * 1.5);
          
          // Calculate the repulsion effect - move slightly away from mouse
          const repelX = (blobCenterX - x) * influence * 10;
          const repelY = (blobCenterY - y) * influence * 10;
          
          // Scale blobs slightly based on mouse proximity
          const scale = 1 + influence * 0.15;
          
          return {
            ...blob,
            transform: `scale(${scale}) translate(${repelX}%, ${repelY}%)`
          };
        });
      });
    });
  }, [interactive, performanceMode]);
  
  // Initialize and handle window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setWindowReady(true);
    
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    // Initialize
    handleResize();
    setBlobs(generateBlobs());
    
    // Add event listeners
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    // Throttled resize event
    let resizeTimeout: number;
    window.addEventListener('resize', () => {
      if (resizeTimeout) window.cancelAnimationFrame(resizeTimeout);
      resizeTimeout = window.requestAnimationFrame(handleResize);
    });
    
    // Clean up
    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (resizeTimeout) window.cancelAnimationFrame(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    generateBlobs, handleMouseMove, interactive
  ]);
  
  // Create CSS animation keyframes
  const animationStyles = useMemo(() => {
    return `
      @keyframes blob-morph {
        0% { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; }
        25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        50% { border-radius: 60% 40% 30% 70% / 60% 40% 60% 30%; }
        75% { border-radius: 40% 60% 70% 30% / 30% 40% 60% 70%; }
        100% { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; }
      }
      
      @keyframes blob-float {
        0% { transform: translateY(0) rotate(0deg); }
        33% { transform: translateY(-10px) rotate(2deg); }
        66% { transform: translateY(5px) rotate(-2deg); }
        100% { transform: translateY(0) rotate(0deg); }
      }
      
      @keyframes blob-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      .blob-morph {
        animation-name: blob-morph;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
      }
      
      .blob-float {
        animation-name: blob-float;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
      }
      
      .blob-pulse {
        animation-name: blob-pulse;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
      }
    `;
  }, []);
  
  // Define mesh pattern styles
  const meshStyle = useMemo(() => {
    const baseColor = 'rgba(255, 255, 255, 0.08)';
    const baseColorDarker = 'rgba(255, 255, 255, 0.12)';
    
    switch (meshPattern) {
      case 'grid':
        return {
          backgroundImage: `
            linear-gradient(${baseColor} 1px, transparent 1px), 
            linear-gradient(90deg, ${baseColor} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0',
        };
      case 'dots':
        return {
          backgroundImage: `
            radial-gradient(${baseColorDarker} 1.5px, transparent 1.5px)
          `,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0',
        };
      case 'hexagons':
        // More complex hexagonal pattern
        return {
          backgroundImage: `
            linear-gradient(30deg, ${baseColor} 12%, transparent 12.5%, transparent 87%, ${baseColor} 87.5%, ${baseColor}),
            linear-gradient(150deg, ${baseColor} 12%, transparent 12.5%, transparent 87%, ${baseColor} 87.5%, ${baseColor}),
            linear-gradient(30deg, ${baseColor} 12%, transparent 12.5%, transparent 87%, ${baseColor} 87.5%, ${baseColor}),
            linear-gradient(150deg, ${baseColor} 12%, transparent 12.5%, transparent 87%, ${baseColor} 87.5%, ${baseColor}),
            linear-gradient(60deg, ${baseColorDarker} 25%, transparent 25.5%, transparent 75%, ${baseColorDarker} 75%, ${baseColorDarker}),
            linear-gradient(60deg, ${baseColorDarker} 25%, transparent 25.5%, transparent 75%, ${baseColorDarker} 75%, ${baseColorDarker})
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
        };
      case 'none':
      default:
        return {};
    }
  }, [meshPattern]);
  
  if (!windowReady) return null;
  
  return (
    <Box
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <style jsx global>{animationStyles}</style>
      
      {/* Render blobs */}
      {blobs.map(blob => (
        <Box
          key={blob.id}
          className={blob.animationClass}
          style={{
            position: 'fixed',
            top: blob.top,
            left: blob.left,
            width: blob.width,
            height: blob.height,
            borderRadius: blob.borderRadius,
            background: blob.color,
            opacity: blob.opacity,
            filter: `blur(${blur}px)`,
            animationDuration: blob.animationDuration,
            animationDelay: blob.animationDelay,
            transition: interactive ? 'transform 0.3s ease-out' : undefined,
            transform: blob.transform,
            willChange: 'transform, border-radius',
          }}
        />
      ))}
      
      {/* Add gradient overlay for blending */}
      <Box
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.03) 100%)`,
          opacity: 1,
            zIndex: 0
        }}
      />
      
      {/* Mesh overlay */}
      {meshPattern !== 'none' && (
        <Box
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            ...meshStyle,
            opacity: .7,
            zIndex: 0
          }}
        />
      )}
    </Box>
  );
};

export default GradientMeshBackground;
