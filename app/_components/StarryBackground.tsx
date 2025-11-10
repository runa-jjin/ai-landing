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
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const scrollYRef = useRef(0);
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
      
      // 다양한 기하학적 도형들 생성 (크기 증가)
      const geometries = [
        new THREE.BoxGeometry(150, 150, 150),
        new THREE.OctahedronGeometry(120, 0),
        new THREE.TetrahedronGeometry(105, 0),
        new THREE.IcosahedronGeometry(135, 0),
        new THREE.TorusGeometry(90, 30, 16, 100),
        new THREE.SphereGeometry(112, 32, 32),
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
        
        // 화면 중앙을 기준으로 좌우로 균형있게 분배
        const baseRadius = 1200; // 기본 반경 (화면에서 벗어나지 않게)
        const spreadRadius = 400; // 분산 반경
        const angle = (index / geometries.length) * Math.PI * 2; // 원형 배치 각도
        
        // 좌우로 분산 (X축 중심)
        const xOffset = Math.cos(angle) * (baseRadius + (index % 3) * spreadRadius);
        const yOffset = Math.sin(angle * 2) * 600; // 위아래 적당히 분산
        const zOffset = (Math.random() - 0.5) * 800; // 앞뒤 적당히 분산
        
        mesh.position.x = xOffset;
        mesh.position.y = yOffset;
        mesh.position.z = zOffset;
        
        // 초기 위치 저장 (마우스 따라다니기용)
        (mesh as any).initialPosition = { x: xOffset, y: yOffset, z: zOffset };
        
        // 랜덤한 회전 속도 저장 (속도 증가)
        (mesh as any).rotationSpeed = {
          x: (Math.random() - 0.5) * 0.04,
          y: (Math.random() - 0.5) * 0.04,
          z: (Math.random() - 0.5) * 0.04,
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
      // 다른 페이지에서는 정교한 입자 시스템 사용
      const particleCount = 3000; // 입자 개수 증가
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const velocities = new Float32Array(particleCount * 3);

      const color = new THREE.Color();

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        const z = Math.random() * 2000 - 1000;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // 다양한 크기의 입자
        sizes[i] = Math.random() * 2 + 0.5;

        // 속도 저장 (움직임 효과용)
        velocities[i * 3] = (Math.random() - 0.5) * 0.5;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

        // 더 정교한 그라데이션 색상
        const t = (i / particleCount);
        const hue = 0.5 + t * 0.15; // 더 넓은 색상 범위
        const saturation = 0.6 + Math.random() * 0.3;
        const lightness = 0.5 + Math.random() * 0.3;
        color.setHSL(hue, saturation, lightness);

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      (geometry as any).velocities = velocities; // 속도 저장
      (geometry as any).sizes = sizes; // 크기 저장

      // 더 정교한 입자 효과
      const material = new THREE.PointsMaterial({
        size: 2,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      particlesRef.current = particles;
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

      // 메인 페이지인 경우 3D 도형들 회전 및 마우스 따라다니기
      if (pathname === "/" && objectsRef.current instanceof THREE.Group) {
        // 스크롤에 반응하는 회전
        const scrollFactor = scrollYRef.current * 0.0001;
        objectsRef.current.rotation.x = time * 0.2 + scrollFactor;
        objectsRef.current.rotation.y = time * 0.3 + scrollFactor * 0.5;
        
        // 각 도형을 개별적으로 회전 및 마우스 따라다니기
        objectsRef.current.children.forEach((child, index) => {
          if (child instanceof THREE.Mesh && (child as any).rotationSpeed) {
            child.rotation.x += (child as any).rotationSpeed.x;
            child.rotation.y += (child as any).rotationSpeed.y;
            child.rotation.z += (child as any).rotationSpeed.z;
            
            // 마우스 따라다니는 효과 (각 도형마다 다른 반응 속도)
            const followSpeed = 0.03 + index * 0.01;
            const initialPos = (child as any).initialPosition;
            if (initialPos) {
              const targetX = initialPos.x + mouseXRef.current * (0.3 + index * 0.1);
              const targetY = initialPos.y + (-mouseYRef.current) * (0.3 + index * 0.1);
              
              child.position.x += (targetX - child.position.x) * followSpeed;
              child.position.y += (targetY - child.position.y) * followSpeed;
            }
          }
        });
      } else if (particlesRef.current) {
        // 정교한 입자 효과 - 움직임과 회전
        particlesRef.current.rotation.x = time * 0.2;
        particlesRef.current.rotation.y = time * 0.15;
        
        // 입자 위치 업데이트 (부드러운 움직임)
        const positions = particlesRef.current.geometry.attributes.position;
        const velocities = (particlesRef.current.geometry as any).velocities;
        
        if (positions && velocities) {
          for (let i = 0; i < positions.count; i++) {
            positions.array[i * 3] += velocities[i * 3] * 0.1;
            positions.array[i * 3 + 1] += velocities[i * 3 + 1] * 0.1;
            positions.array[i * 3 + 2] += velocities[i * 3 + 2] * 0.1;
            
            // 경계 처리
            if (Math.abs(positions.array[i * 3]) > 1000) velocities[i * 3] *= -1;
            if (Math.abs(positions.array[i * 3 + 1]) > 1000) velocities[i * 3 + 1] *= -1;
            if (Math.abs(positions.array[i * 3 + 2]) > 1000) velocities[i * 3 + 2] *= -1;
          }
          positions.needsUpdate = true;
        }
      }

      // 카메라가 마우스 위치와 스크롤에 반응
      const targetX = mouseXRef.current + scrollYRef.current * 0.1;
      const targetY = -mouseYRef.current - scrollYRef.current * 0.05;
      
      cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.02;
      cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.02;
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

    // 스크롤 이벤트 리스너
    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("scroll", onScroll);
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

