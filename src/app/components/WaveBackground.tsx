"use client";
import React from 'react';
import { Box } from '@mantine/core';

interface WaveBackgroundProps {
  color?: string;
  secondaryColor?: string;
  animated?: boolean;
  speed?: 'slow' | 'medium' | 'fast';
  opacity?: number;
  reverse?: boolean;
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({
  color = 'var(--mantine-color-primary-4)',
  secondaryColor = 'var(--mantine-color-secondary-4)',
  animated = true,
  speed = 'medium',
  opacity = 0.5,
  reverse = false,
}) => {
  // Determine animation duration based on speed
  const getDuration = () => {
    switch (speed) {
      case 'slow': return '30s';
      case 'medium': return '20s';
      case 'fast': return '10s';
      default: return '20s';
    }
  };

  const duration = getDuration();
  
  // SVG wave patterns
  const wave1 = `
    <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
      <path fill="${color}" fill-opacity="${opacity}" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  `;
  
  const wave2 = `
    <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
      <path fill="${secondaryColor}" fill-opacity="${opacity}" d="M0,32L48,53.3C96,75,192,117,288,117.3C384,117,480,75,576,64C672,53,768,75,864,96C960,117,1056,139,1152,133.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  `;
  
  // Adding a third wave for more depth and visual interest
  const wave3 = `
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="${color}" fill-opacity="0.5" d="M0,96L60,96C120,96,240,96,360,106.7C480,117,600,139,720,138.7C840,139,960,117,1080,112C1200,107,1320,117,1380,122.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
    </svg>
  `;
  
  return (
    <Box
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 0,
        overflow: 'hidden',
        transform: reverse ? 'scaleY(-1)' : 'none',
        pointerEvents: 'none',
        opacity,
      }}
    >
      <style jsx global>{`
        @keyframes wave-animation {
          0% { transform: translateX(0) translateZ(0); }
          50% { transform: translateX(-25%) translateZ(0); }
          100% { transform: translateX(-50%) translateZ(0); }
        }
        
        .wave-animation {
          animation-name: wave-animation;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: ${duration};
        }
      `}</style>
      
      {/* First wave layer */}
      <Box
        className={animated ? 'wave-animation' : ''}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200%', // Double width for seamless animation
          height: '40%',
          backgroundImage: `url("data:image/svg+xml;charset=utf8,${encodeURIComponent(wave1)}")`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '50% 100%',
          backgroundPosition: '0 bottom',
        }}
      />
      
      {/* Second wave layer - slightly offset */}
      <Box
        className={animated ? 'wave-animation' : ''}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-25%', // Start offset for varied wave pattern
          width: '200%',
          height: '35%', // Slightly shorter
          backgroundImage: `url("data:image/svg+xml;charset=utf8,${encodeURIComponent(wave2)}")`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '50% 100%',
          backgroundPosition: '0 bottom',
          animationDelay: '0.5s', // Offset animation
          animationDuration: animated ? `calc(${duration} * 1.2)` : '0s', // Slightly slower
        }}
      />
      
      {/* Third wave layer - creates depth */}
      <Box
        className={animated ? 'wave-animation' : ''}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '0',
          width: '200%',
          height: '30%', // Even shorter
          backgroundImage: `url("data:image/svg+xml;charset=utf8,${encodeURIComponent(wave3)}")`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '50% 100%',
          backgroundPosition: '0 bottom',
          animationDelay: '0.2s',
          animationDuration: animated ? `calc(${duration} * 0.8)` : '0s', // Slightly faster
        }}
      />
    </Box>
  );
};

export default WaveBackground;
