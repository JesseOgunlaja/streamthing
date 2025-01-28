"use client";

import { useEffect, useRef } from "react";

interface AnimationConfig {
  rectangleCount: number;
  baseSpeed: number;
  speedChange: number;
  maxDelay: number;
}

function animation(canvas: HTMLCanvasElement, config: AnimationConfig) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { baseSpeed, speedChange, rectangleCount, maxDelay } = config;
  ctx.fillStyle = "red";

  const positionSeed: number[] = [];
  const delaySeed: number[] = [];

  function createRectangle(index: number) {
    const x = Math.random() * canvas.width;
    positionSeed.push(x);

    const delay = Math.random() * maxDelay;
    delaySeed.push(delay);

    return {
      x,
      y: 0,
      width: 1,
      height: 25,
      speed: baseSpeed + speedChange * index,
      active: true,
      delay,
      opacity: 0.3,
      startTime: null as null | number,
    };
  }

  const rectangles = Array(rectangleCount)
    .fill(null)
    .map((_, index) => createRectangle(index));

  let startTime: number | null = null;
  let animationFrameId: number;

  function animate(currentTime: number) {
    if (!ctx) return;
    if (startTime === null) startTime = currentTime;

    const elapsedTime = currentTime - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rectangles.forEach((rect) => {
      if (elapsedTime >= rect.delay) {
        rect.y += rect.speed;
        if (rect.y < canvas.height + 25) {
          if (rect.startTime === null) rect.startTime = currentTime;

          const opacityElapsedTime = currentTime - rect.startTime;
          const opacityProgress = Math.min(opacityElapsedTime / 50, 1);
          rect.opacity = 0.3 + (1 - 0.3) * opacityProgress;

          ctx.globalAlpha = rect.opacity;
          ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
          ctx.globalAlpha = 1; // Reset global alpha
        } else rect.active = false;
      }
    });

    if (rectangles.some((rect) => rect.active)) {
      animationFrameId = requestAnimationFrame(animate);
    }
  }

  animationFrameId = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(animationFrameId);
}

export const AnimationCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationCancelRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const config: AnimationConfig = {
      rectangleCount: 25,
      baseSpeed: 10,
      speedChange: 0.075,
      maxDelay: 1500,
    };

    animationCancelRef.current = animation(canvas, config);

    const intervalId = setInterval(() => {
      if (animationCancelRef.current) {
        animationCancelRef.current();
      }
      animationCancelRef.current = animation(canvas, config);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      if (animationCancelRef.current) {
        animationCancelRef.current();
      }
    };
  }, []);

  return <canvas ref={canvasRef} width={210} height={90}></canvas>;
};
