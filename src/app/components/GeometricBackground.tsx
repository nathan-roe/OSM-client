"use client";
import React, { useEffect, useState } from 'react';
import { Box } from '@mantine/core';

interface GeometricBackgroundProps {
  opacity?: number;
  variant?: 'primary' | 'secondary' | 'gradient';
  animated?: boolean;
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
}

// Shape generator functions
const generateShapes = (
  count: number,
  variant: 'primary' | 'secondary' | 'gradient',
  animated: boolean,
  speed: 'slow' | 'medium' | 'fast'
) => {
  const shapes = [];
  
  // Animation duration mapping
  const durationMap = {
    slow: { min: 15, max: 25 },
    medium: { min: 8, max: 15 },
    fast: { min: 4, max: 8 },
  };
  
  const { min, max } = durationMap[speed];
  
  for (let i = 0; i < count; i++) {
    // Random properties for each shape
    const size = Math.floor(Math.random() * 120) + 40;
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    const shapeType = Math.floor(Math.random() * 4); // 0: circle, 1: square, 2: triangle, 3: hexagon
    const duration = Math.floor(Math.random() * (max - min)) + min;
    const float = Math.floor(Math.random() * 5);
    const zIndex = Math.floor(Math.random() * 5) - 10; // Negative z-index to stay in background
    
    // Color based on variant
    let background;
    const opacity = Math.random() * 0.15 + 0.05; // Between 0.05 and 0.2
    
    switch (variant) {
      case 'primary':
        background = `var(--mantine-color-primary-${Math.floor(Math.random() * 3) + 4})`;
        break;
      case 'secondary':
        background = `var(--mantine-color-secondary-${Math.floor(Math.random() * 3) + 4})`;
        break;
      case 'gradient':
        const gradientAngle = Math.floor(Math.random() * 360);
        background = `linear-gradient(${gradientAngle}deg, var(--mantine-color-primary-3), var(--mantine-color-secondary-5))`;
        break;
      default:
        background = `var(--mantine-color-primary-5)`;
    }
    
    // Animation type
    let animationClass = '';
    let animationStyle = {};
    
    if (animated) {
      const animationType = Math.floor(Math.random() * 2); // 0: float, 1: rotate
      switch (animationType) {
        case 0:
          animationClass = 'float-animation';
          animationStyle = {
            animationDuration: `${duration}s`, 
            animationDelay: `${Math.random() * 2}s`
          };
          break;
        case 1:
          animationClass = 'rotate-animation';
          animationStyle = {
            animationDuration: `${duration * 2}s`, 
            animationDelay: `${Math.random() * 2}s`
          };
          break;
      }
    }
    
    // Create different shape styles
    let shapeStyle = {};
    switch (shapeType) {
      case 0: // Circle
        shapeStyle = { borderRadius: '50%' };
        break;
      case 1: // Square
        shapeStyle = { borderRadius: '4px' };
        break;
      case 2: // Triangle (using clip-path)
        shapeStyle = { 
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          borderRadius: 0
        };
        break;
      case 3: // Hexagon (using clip-path)
        shapeStyle = {
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          borderRadius: 0
        };
        break;
    }
    
    shapes.push(
      <Box
        key={i}
        className={animationClass}
        style={{
          position: 'fixed',
          width: size,
          height: size,
          top: `${top}%`,
          left: `${left}%`,
          background,
          opacity,
          transform: `rotate(${Math.floor(Math.random() * 45)}deg)`,
          transition: 'all 0.5s ease',
          zIndex,
          backdropFilter: Math.random() > 0.7 ? 'blur(10px)' : 'none',
          boxShadow: Math.random() > 0.8 ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
          ...shapeStyle,
          ...animationStyle
        }}
      />
    );
  }
  
  return shapes;
};

const GeometricBackground: React.FC<GeometricBackgroundProps> = ({
  opacity = 0.4,
  variant = 'primary',
  animated = true,
  density = 'high',
  speed = 'medium'
}) => {
  const [shapes, setShapes] = useState<React.ReactNode[]>([]);
  const [windowReady, setWindowReady] = useState(false);
  
  // Determine number of shapes based on density
  const getShapeCount = () => {
    switch (density) {
      case 'low': return 10;
      case 'medium': return 20;
      case 'high': return 35;
      default: return 20;
    }
  };
  
  useEffect(() => {
    setWindowReady(true);
    const shapeCount = getShapeCount();
    setShapes(generateShapes(shapeCount, variant, animated, speed));
    
    // Regenerate shapes on window resize
    const handleResize = () => {
      setShapes(generateShapes(shapeCount, variant, animated, speed));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [variant, animated, density, speed]);
  
  // Use pattern overlays for added texture
  const getPatternOverlay = () => {
    return (
      <Box
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: opacity,
          background: `radial-gradient(circle at 25% 25%, var(--mantine-color-primary-4) 1px, transparent 1px),
                      radial-gradient(circle at 75% 75%, var(--mantine-color-secondary-4) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />
    );
  };
  
  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        opacity,
        pointerEvents: 'none',
      }}
    >
      <style jsx global>{`
        @keyframes float-animation {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes pulse-animation {
          0% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
          100% { opacity: 0.5; transform: scale(1); }
        }
        
        @keyframes rotate-animation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .float-animation {
          animation-name: float-animation;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        
        .pulse-animation {
          animation-name: pulse-animation;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        
        .rotate-animation {
          animation-name: rotate-animation;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
      
      {windowReady && shapes}
      {getPatternOverlay()}
    </Box>
  );
}

export default GeometricBackground;
