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
      
      // 세련된 부드러운 3D 오브젝트들 생성
      const objectConfigs = [
        { type: 'sphere', radius: 120, segments: 64, color: 0x4fc3f7 },
        { type: 'icosahedron', radius: 100, detail: 2, color: 0x29b6f6 },
        { type: 'octahedron', radius: 110, detail: 1, color: 0x03a9f4 },
        { type: 'torus', radius: 80, tube: 30, segments: 64, color: 0x00acc1 },
        { type: 'sphere', radius: 95, segments: 64, color: 0x00bcd4 },
        { type: 'dodecahedron', radius: 105, detail: 1, color: 0x26c6da },
      ];

      objectConfigs.forEach((config, index) => {
        let geometry: THREE.BufferGeometry;
        
        switch (config.type) {
          case 'sphere':
            geometry = new THREE.SphereGeometry(config.radius, config.segments, config.segments);
            break;
          case 'icosahedron':
            geometry = new THREE.IcosahedronGeometry(config.radius, config.detail);
            break;
          case 'octahedron':
            geometry = new THREE.OctahedronGeometry(config.radius, config.detail);
            break;
          case 'torus':
            geometry = new THREE.TorusGeometry(config.radius, config.tube, 64, 100);
            break;
          case 'dodecahedron':
            geometry = new THREE.DodecahedronGeometry(config.radius, config.detail);
            break;
          default:
            geometry = new THREE.SphereGeometry(config.radius, 64, 64);
        }

        // 부드럽고 세련된 머티리얼
        const material = new THREE.MeshStandardMaterial({
          color: config.color,
          transparent: true,
          opacity: 0.6,
          metalness: 0.7,
          roughness: 0.3,
          emissive: config.color,
          emissiveIntensity: 0.2,
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        // 화면 중앙을 기준으로 균형있게 분배
        const baseRadius = 1200;
        const spreadRadius = 400;
        const angle = (index / objectConfigs.length) * Math.PI * 2;
        
        const xOffset = Math.cos(angle) * (baseRadius + (index % 3) * spreadRadius);
        const yOffset = Math.sin(angle * 2) * 500;
        const zOffset = (Math.random() - 0.5) * 800;
        
        mesh.position.x = xOffset;
        mesh.position.y = yOffset;
        mesh.position.z = zOffset;
        
        // 초기 위치 저장
        (mesh as any).initialPosition = { x: xOffset, y: yOffset, z: zOffset };
        
        // 부드러운 회전 속도
        (mesh as any).rotationSpeed = {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.03,
          z: (Math.random() - 0.5) * 0.015,
        };

        objectsGroup.add(mesh);
      });

      // 세련된 조명 설정
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);
      
      // 부드러운 포인트 라이트들
      const pointLight1 = new THREE.PointLight(0x4fc3f7, 1.5, 3000);
      pointLight1.position.set(800, 600, 800);
      scene.add(pointLight1);
      
      const pointLight2 = new THREE.PointLight(0x00bcd4, 1.5, 3000);
      pointLight2.position.set(-800, -600, -800);
      scene.add(pointLight2);
      
      const pointLight3 = new THREE.PointLight(0x26c6da, 1, 2500);
      pointLight3.position.set(0, 0, 1000);
      scene.add(pointLight3);
      
      // 헤미스피어 라이트로 부드러운 조명 추가
      const hemisphereLight = new THREE.HemisphereLight(0x4fc3f7, 0x00acc1, 0.3);
      scene.add(hemisphereLight);

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
        // 스크롤에 반응하는 회전 및 위치 변화
        const scrollFactor = scrollYRef.current * 0.0003;
        objectsRef.current.rotation.x = time * 0.15 + scrollFactor;
        objectsRef.current.rotation.y = time * 0.2 + scrollFactor * 0.6;
        
        // 스크롤에 따라 기둥들이 위아래로 움직임
        const scrollYOffset = scrollYRef.current * 0.5;
        
        // 각 도형을 개별적으로 회전 및 마우스 따라다니기
        objectsRef.current.children.forEach((child, index) => {
          if (child instanceof THREE.Mesh && (child as any).rotationSpeed) {
            child.rotation.x += (child as any).rotationSpeed.x;
            child.rotation.y += (child as any).rotationSpeed.y;
            child.rotation.z += (child as any).rotationSpeed.z;
            
            // 마우스 따라다니는 효과 (각 기둥마다 다른 반응 속도)
            const followSpeed = 0.05 + index * 0.015;
            const initialPos = (child as any).initialPosition;
            if (initialPos) {
              const mouseInfluence = 0.4 + index * 0.12;
              const targetX = initialPos.x + mouseXRef.current * mouseInfluence;
              const targetY = initialPos.y + (-mouseYRef.current) * mouseInfluence + scrollYOffset;
              
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

      // 카메라가 마우스 위치와 스크롤에 반응 (더 강하게)
      const targetX = mouseXRef.current * 1.2 + scrollYRef.current * 0.15;
      const targetY = -mouseYRef.current * 1.2 - scrollYRef.current * 0.08;
      
      cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.03;
      cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.03;
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

