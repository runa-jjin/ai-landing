"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";

export function StarryBackground() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectsRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const windowHalfXRef = useRef(0);
  const windowHalfYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 요금제 페이지에서는 배경을 표시하지 않음
    if (pathname === "/pricing") {
      return;
    }

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

    // 메인 페이지인 경우 회전하는 3D 기하학적 도형들 생성
    if (pathname === "/") {
      const objectsGroup = new THREE.Group();
      
      // 다양한 기하학적 도형들 생성
      const geometries = [
        new THREE.BoxGeometry(100, 100, 100),
        new THREE.OctahedronGeometry(80, 0),
        new THREE.TetrahedronGeometry(70, 0),
        new THREE.IcosahedronGeometry(90, 0),
        new THREE.TorusGeometry(60, 20, 16, 100),
        new THREE.SphereGeometry(75, 32, 32),
      ];

      const colors = [
        new THREE.Color(0x4fc3f7), // blue-300
        new THREE.Color(0x29b6f6), // blue-400
        new THREE.Color(0x03a9f4), // blue-500
        new THREE.Color(0x00acc1), // cyan-600
        new THREE.Color(0x00bcd4), // cyan-500
        new THREE.Color(0x26c6da), // cyan-400
      ];

      geometries.forEach((geometry, index) => {
        const material = new THREE.MeshPhongMaterial({
          color: colors[index],
          transparent: true,
          opacity: 0.6,
          wireframe: true,
          emissive: colors[index],
          emissiveIntensity: 0.3,
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        // 랜덤한 위치에 배치
        mesh.position.x = (Math.random() - 0.5) * 1500;
        mesh.position.y = (Math.random() - 0.5) * 1500;
        mesh.position.z = (Math.random() - 0.5) * 1500;
        
        // 랜덤한 회전 속도 저장
        (mesh as any).rotationSpeed = {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        };

        objectsGroup.add(mesh);
      });

      // 조명 추가
      const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
      scene.add(ambientLight);
      
      const pointLight1 = new THREE.PointLight(0x4fc3f7, 1, 2000);
      pointLight1.position.set(500, 500, 500);
      scene.add(pointLight1);
      
      const pointLight2 = new THREE.PointLight(0x00bcd4, 1, 2000);
      pointLight2.position.set(-500, -500, -500);
      scene.add(pointLight2);

      scene.add(objectsGroup);
      objectsRef.current = objectsGroup;
    } else {
      // 다른 페이지에서는 입자 시스템 사용 (별 개수 줄임)
      const particleCount = 2000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const color = new THREE.Color();

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        const z = Math.random() * 2000 - 1000;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const t = (i / particleCount) * 0.5 + 0.5;
        color.setHSL(0.5 + t * 0.1, 0.7, 0.6);

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      objectsRef.current = particles as any;
    }

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
      if (!objectsRef.current || !cameraRef.current || !rendererRef.current) return;

      const time = Date.now() * 0.0001;

      // 메인 페이지인 경우 3D 도형들 회전
      if (pathname === "/" && objectsRef.current instanceof THREE.Group) {
        objectsRef.current.rotation.x = time * 0.1;
        objectsRef.current.rotation.y = time * 0.15;
        
        // 각 도형을 개별적으로 회전
        objectsRef.current.children.forEach((child) => {
          if (child instanceof THREE.Mesh && (child as any).rotationSpeed) {
            child.rotation.x += (child as any).rotationSpeed.x;
            child.rotation.y += (child as any).rotationSpeed.y;
            child.rotation.z += (child as any).rotationSpeed.z;
          }
        });
      } else if (objectsRef.current instanceof THREE.Points) {
        // 입자 회전
        objectsRef.current.rotation.x = time * 0.2;
        objectsRef.current.rotation.y = time * 0.15;
      }

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
  }, [pathname]);

  return (
    <canvas
      id="bg-canvas"
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}

