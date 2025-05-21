"use client";
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Box } from '@mantine/core';

interface CircuitBackgroundProps {
  color?: string;
  pointColor?: string;
  lineWidth?: number;
  density?: 'low' | 'medium' | 'high';
  animated?: boolean;
  opacity?: number;
  performanceMode?: boolean;
  animationSpeed?: 'slow' | 'medium' | 'fast';
}

interface Point {
  x: number;
  y: number;
  size: number;
  delay: number;
  animationType: string;
  animationDuration: number;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  dashLength: number;
  dashGap: number;
  speed: number;
}

const CircuitBackground: React.FC<CircuitBackgroundProps> = ({
  color = 'var(--mantine-color-primary-4)',
  pointColor = 'var(--mantine-color-primary-6)',
  lineWidth = 1,
  density = 'high',
  animated = true,
  opacity = 0.35,
  performanceMode = false,
  animationSpeed = 'slow',
}) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [windowReady, setWindowReady] = useState(false);
  
  // Convert animation speed string to actual duration values
  const speedSettings = useMemo(() => {
    const speeds = {
      slow: { pointMin: 4, pointMax: 8, lineMin: 20, lineMax: 30 },
      medium: { pointMin: 2, pointMax: 5, lineMin: 15, lineMax: 25 },
      fast: { pointMin: 1, pointMax: 3, lineMin: 10, lineMax: 18 }
    };
    return speeds[animationSpeed];
  }, [animationSpeed]);
  
  // Determine density counts - memoized to prevent recalculation
  const densityCounts = useMemo(() => {
    // Adjust point count based on performance mode
    const multiplier = performanceMode ? 0.5 : 1;
    
    return {
      points: Math.floor((density === 'low' ? 20 : density === 'medium' ? 40 : 70) * multiplier),
      lines: Math.floor((density === 'low' ? 15 : density === 'medium' ? 30 : 50) * multiplier)
    };
  }, [density, performanceMode]);
  
  // Generator functions memoized to improve performance
  const generatePoints = useCallback(() => {
    const pointCount = densityCounts.points;
    const newPoints: Point[] = [];
    
    const animationTypes = ['pulse', 'blink', 'grow'];
    
    for (let i = 0; i < pointCount; i++) {
      // Select a random animation type for this point
      const animationType = animated 
        ? animationTypes[Math.floor(Math.random() * animationTypes.length)]
        : 'none';
      
      // Generate random duration within the speed range
      const { pointMin, pointMax } = speedSettings;
      const animationDuration = pointMin + Math.random() * (pointMax - pointMin);
      
      newPoints.push({
        x: Math.random() * 100, // % position
        y: Math.random() * 100, // % position
        size: Math.random() * 3 + 2, // 2-5px
        delay: Math.random() * 4, // 0-4s delay for animation
        animationType,
        animationDuration
      });
    }
    return newPoints;
  }, [densityCounts.points, animated, speedSettings]);
  
  const generateLines = useCallback((points: Point[]) => {
    const lineCount = densityCounts.lines;
    const newLines: Line[] = [];
    
    for (let i = 0; i < lineCount; i++) {
      // Connect random points, but with some intelligence to avoid extremely long lines
      // Create clusters of connected nodes rather than completely random connections
      const startPointIndex = Math.floor(Math.random() * points.length);
      const startPoint = points[startPointIndex];
      
      // Find a point that's somewhat close to the start point (within 30% of the canvas)
      // This creates more natural-looking connections
      let closestPoints = points.filter((p, idx) => {
        if (idx === startPointIndex) return false;
        
        const distance = Math.sqrt(
          Math.pow(p.x - startPoint.x, 2) + 
          Math.pow(p.y - startPoint.y, 2)
        );
        
        return distance < 30; // 30% of viewport max distance
      });
      
      // If no close points found, just pick any random point
      let endPoint;
      if (closestPoints.length > 0) {
        endPoint = closestPoints[Math.floor(Math.random() * closestPoints.length)];
      } else {
        const randomIndex = Math.floor(Math.random() * points.length);
        endPoint = randomIndex !== startPointIndex 
          ? points[randomIndex] 
          : points[(randomIndex + 1) % points.length];
      }
      
      // Randomize dash pattern for visual variety
      const dashLength = Math.floor(Math.random() * 7) + 3; // 3-10px
      const dashGap = Math.floor(Math.random() * 5) + 3; // 3-8px
      
      // Calculate animation speed based on line length
      const lineLength = Math.sqrt(
        Math.pow(endPoint.x - startPoint.x, 2) + 
        Math.pow(endPoint.y - startPoint.y, 2)
      );
      
      const { lineMin, lineMax } = speedSettings;
      // Longer lines animate slower, shorter lines animate faster
      const speed = lineMax - (lineLength / 100) * (lineMax - lineMin);
      
      newLines.push({
        x1: startPoint.x,
        y1: startPoint.y,
        x2: endPoint.x,
        y2: endPoint.y,
        delay: Math.random() * 3,
        dashLength,
        dashGap,
        speed
      });
    }
    return newLines;
  }, [densityCounts.lines, speedSettings]);
  
  // Initialize and handle window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setWindowReady(true);
    
    const handleResize = () => {
      // Only regenerate on significant size changes to avoid continuous reflows
      // Use a more efficient debounce technique
      if (window.innerWidth < 600 && !performanceMode) {
        // Auto-switch to performance mode on mobile devices
        const newPoints = generatePoints();
        setPoints(newPoints);
        setLines(generateLines(newPoints));
      }
    };
    
    // Generate initial layout
    const newPoints = generatePoints();
    setPoints(newPoints);
    setLines(generateLines(newPoints));
    
    // Throttled resize event with requestAnimationFrame
    let resizeTimeout: number;
    window.addEventListener('resize', () => {
      if (resizeTimeout) window.cancelAnimationFrame(resizeTimeout);
      resizeTimeout = window.requestAnimationFrame(handleResize);
    });
    
    return () => {
      if (resizeTimeout) window.cancelAnimationFrame(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [generatePoints, generateLines, performanceMode]);
  
  // Animation keyframes for different point animations
  const animationStyles = useMemo(() => {
    return `
      @keyframes pulse {
        0% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 0.2; transform: scale(0.8); }
      }
      
      @keyframes blink {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
      }
      
      @keyframes grow {
        0% { r: 1px; }
        50% { r: 5px; }
        100% { r: 1px; }
      }
      
      @keyframes dash {
        to { stroke-dashoffset: -100; }
      }
    `;
  }, []);
  
  if (!windowReady) return null;
  
  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <style jsx global>{animationStyles}</style>
      
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      >
        {/* Lines */}
        {lines.map((line, index) => (
          <line
            key={`line-${index}`}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke={color}
            strokeWidth={lineWidth}
            strokeLinecap="round"
            style={{
              strokeDasharray: animated ? `${line.dashLength},${line.dashGap}` : 'none',
              opacity: 0.7,
              animation: animated ? `dash ${line.speed}s linear infinite` : 'none',
              animationDelay: animated ? `${line.delay}s` : '0s',
              strokeDashoffset: 0
            }}
          />
        ))}
        
        {/* Points */}
        {points.map((point, index) => (
          <circle
            key={`point-${index}`}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r={point.size}
            fill={pointColor}
            style={{
              animation: animated ? `${point.animationType} ${point.animationDuration}s infinite ease-in-out` : 'none',
              animationDelay: animated ? `${point.delay}s` : '0s',
              transformOrigin: 'center',
              transformBox: 'fill-box'
            }}
          />
        ))}
      </svg>
      
      {/* Add a subtle overlay pattern */}
      <Box
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(${color} 1px, transparent 1px), 
            radial-gradient(${color} 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px',
          opacity: 0.4,
          zIndex: -1
        }}
      />
    </Box>
  );
};

export default CircuitBackground;
