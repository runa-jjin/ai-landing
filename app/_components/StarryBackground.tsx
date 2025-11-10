"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const windowHalfXRef = useRef(0);
  const windowHalfYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 초기화
    windowHalfXRef.current = window.innerWidth / 2;
    windowHalfYRef.current = window.innerHeight / 2;

    // Scene 생성
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera 생성
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 1000;
    cameraRef.current = camera;

    // 3D 입자(Particle) 생성
    const particleCount = 20000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // 랜덤한 위치에 배치
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // 그라데이션 색상 (파란색 ~ 청록색)
      const t = (i / particleCount) * 0.5 + 0.5; // 0.5 ~ 1.0 범위
      color.setHSL(0.5 + t * 0.1, 0.7, 0.6); // 0.5 (청록) ~ 0.6 (파랑)

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // 입자 재질 (Material)
    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Renderer 생성
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // 애니메이션 루프
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      render();
    };

    // 렌더링 함수
    const render = () => {
      if (!particlesRef.current || !cameraRef.current || !rendererRef.current) return;

      const time = Date.now() * 0.0001;

      // 입자 회전
      particlesRef.current.rotation.x = time * 0.2;
      particlesRef.current.rotation.y = time * 0.15;

      // 카메라가 마우스 위치를 천천히 따라가도록
      cameraRef.current.position.x +=
        (mouseXRef.current - cameraRef.current.position.x) * 0.02;
      cameraRef.current.position.y +=
        (-mouseYRef.current - cameraRef.current.position.y) * 0.02;
      cameraRef.current.lookAt(scene.position);

      rendererRef.current.render(scene, cameraRef.current);
    };

    // 이벤트 리스너
    const onWindowResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      windowHalfXRef.current = window.innerWidth / 2;
      windowHalfYRef.current = window.innerHeight / 2;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseXRef.current = (event.clientX - windowHalfXRef.current) * 0.5;
      mouseYRef.current = (event.clientY - windowHalfYRef.current) * 0.5;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        mouseXRef.current =
          (event.touches[0].pageX - windowHalfXRef.current) * 0.5;
        mouseYRef.current =
          (event.touches[0].pageY - windowHalfYRef.current) * 0.5;
      }
    };

    window.addEventListener("resize", onWindowResize, false);
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <canvas
      id="bg-canvas"
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}

