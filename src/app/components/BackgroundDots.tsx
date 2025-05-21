"use client";
import React from 'react';
import { Box, useMantineTheme } from '@mantine/core';

interface BackgroundDotsProps {
  size?: number;
  spacing?: number;
  color?: string;
  opacity?: number;
  blur?: boolean;
}

const BackgroundDots: React.FC<BackgroundDotsProps> = ({
  size = 2,
  spacing = 30,
  color,
  opacity = 0.25,
  blur = false
}) => {
  const theme = useMantineTheme();
  const dotColor = color || `var(--mantine-color-primary-4)`;
  
  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        backgroundImage: `radial-gradient(${dotColor} ${size}px, transparent 0)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        backgroundPosition: '0 0, 10px 10px',
        opacity,
        filter: blur ? 'blur(1px)' : 'none',
      }}
    />
  );
};

export default BackgroundDots;
