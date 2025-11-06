"use client";

import { useEffect, useRef } from "react";

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 캔버스 크기 설정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 별 생성
    interface Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      delta: number;
      vx: number;
      vy: number;
    }

    const stars: Star[] = [];
    const numStars = 250;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1, // 크기 증가 (1.5+0.5 → 2+1)
        alpha: Math.random() * 0.5 + 0.3, // 최소 밝기 보장 (0.3~0.8)
        delta: (Math.random() - 0.5) * 0.03, // 반짝임 속도 증가
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
      });
    }

    // 애니메이션
    let animationId: number;
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        // 별 그리기
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // 그라디언트 효과 (더 밝고 선명하게)
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.radius * 4
        );
        gradient.addColorStop(0, `rgba(191, 219, 254, ${star.alpha})`); // blue-200 (더 밝게)
        gradient.addColorStop(0.4, `rgba(147, 197, 253, ${star.alpha * 0.6})`); // blue-300
        gradient.addColorStop(1, `rgba(96, 165, 250, 0)`); // blue-400 transparent
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // 반짝임 효과
        star.alpha += star.delta;
        if (star.alpha <= 0.3 || star.alpha >= 1) { // 최소/최대 밝기 조정
          star.delta *= -1;
        }

        // 느린 움직임
        star.x += star.vx;
        star.y += star.vy;

        // 경계 처리
        if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1;
      }

      animationId = requestAnimationFrame(drawStars);
    };

    drawStars();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}

