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

    // 메인 페이지인 경우 유기적인 형태의 3D 오브젝트들 생성
    if (pathname === "/") {
      const objectsGroup = new THREE.Group();
      
      // plus-ex.com 스타일의 유기적인 blob 형태들
      const blobConfigs = [
        { radius: 150, segments: 64, color1: 0x6366f1, color2: 0x8b5cf6 }, // 보라-보라
        { radius: 180, segments: 64, color1: 0x8b5cf6, color2: 0xec4899 }, // 보라-핑크
        { radius: 140, segments: 64, color1: 0xec4899, color2: 0xf472b6 }, // 핑크-핑크
        { radius: 160, segments: 64, color1: 0x3b82f6, color2: 0x6366f1 }, // 블루-보라
        { radius: 170, segments: 64, color1: 0x06b6d4, color2: 0x3b82f6 }, // 시안-블루
        { radius: 145, segments: 64, color1: 0x8b5cf6, color2: 0xec4899 }, // 보라-핑크
      ];

      blobConfigs.forEach((config, index) => {
        // 고해상도 구체로 부드러운 형태 생성
        const geometry = new THREE.SphereGeometry(config.radius, config.segments, config.segments);
        
        // 그라데이션 색상 효과를 위한 커스텀 셰이더 머티리얼
        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            color1: { value: new THREE.Color(config.color1) },
            color2: { value: new THREE.Color(config.color2) },
            opacity: { value: 0.4 },
          },
          vertexShader: `
            varying vec3 vPosition;
            varying vec3 vNormal;
            uniform float time;
            
            void main() {
              vPosition = position;
              vNormal = normalize(normalMatrix * normal);
              
              // 부드러운 형태 변형 (noise 기반)
              vec3 pos = position;
              float noise = sin(pos.x * 0.02 + time) * sin(pos.y * 0.02 + time * 1.1) * sin(pos.z * 0.02 + time * 0.9);
              pos += normal * noise * 15.0;
              
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            uniform vec3 color1;
            uniform vec3 color2;
            uniform float opacity;
            varying vec3 vPosition;
            varying vec3 vNormal;
            
            void main() {
              // 그라데이션 효과 (위치 기반)
              float gradient = (vNormal.y + 1.0) * 0.5;
              
              // 시간에 따라 색상이 흐르는 효과
              float timeGradient = sin(time * 0.5 + vPosition.x * 0.01) * 0.5 + 0.5;
              
              // 두 그라데이션을 혼합
              float mixFactor = (gradient + timeGradient) * 0.5;
              vec3 color = mix(color1, color2, mixFactor);
              
              // 부드러운 가장자리
              float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              color += fresnel * 0.3;
              
              gl_FragColor = vec4(color, opacity);
            }
          `,
          transparent: true,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        // 화면 중앙을 기준으로 균형있게 분배
        const baseRadius = 1000;
        const spreadRadius = 350;
        const angle = (index / blobConfigs.length) * Math.PI * 2;
        
        const xOffset = Math.cos(angle) * (baseRadius + (index % 3) * spreadRadius);
        const yOffset = Math.sin(angle * 2) * 400;
        const zOffset = (Math.random() - 0.5) * 700;
        
        mesh.position.x = xOffset;
        mesh.position.y = yOffset;
        mesh.position.z = zOffset;
        
        // 초기 위치 저장
        (mesh as any).initialPosition = { x: xOffset, y: yOffset, z: zOffset };
        
        // 부드러운 자동 회전 속도 (영상처럼)
        (mesh as any).rotationSpeed = {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.01,
        };
        
        // 자동으로 부드럽게 움직이는 속도
        (mesh as any).floatSpeed = {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.4,
          z: (Math.random() - 0.5) * 0.2,
        };
        
        (mesh as any).floatOffset = {
          x: Math.random() * Math.PI * 2,
          y: Math.random() * Math.PI * 2,
          z: Math.random() * Math.PI * 2,
        };

        objectsGroup.add(mesh);
      });

      // 부드러운 조명 설정 (plus-ex.com 스타일)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambientLight);
      
      // 부드러운 포인트 라이트들 (보라-핑크 계열)
      const pointLight1 = new THREE.PointLight(0x8b5cf6, 2, 4000);
      pointLight1.position.set(1000, 800, 1000);
      scene.add(pointLight1);
      
      const pointLight2 = new THREE.PointLight(0xec4899, 2, 4000);
      pointLight2.position.set(-1000, -800, -1000);
      scene.add(pointLight2);
      
      const pointLight3 = new THREE.PointLight(0x6366f1, 1.5, 3500);
      pointLight3.position.set(0, 0, 1200);
      scene.add(pointLight3);
      
      // 헤미스피어 라이트로 부드러운 조명 추가
      const hemisphereLight = new THREE.HemisphereLight(0x8b5cf6, 0xec4899, 0.4);
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

      // 메인 페이지인 경우 3D blob 오브젝트들 애니메이션
      if (pathname === "/" && objectsRef.current instanceof THREE.Group) {
        // 스크롤에 반응하는 회전
        const scrollFactor = scrollYRef.current * 0.0002;
        objectsRef.current.rotation.x = time * 0.1 + scrollFactor;
        objectsRef.current.rotation.y = time * 0.15 + scrollFactor * 0.5;
        
        // 스크롤에 따라 오브젝트들이 위아래로 움직임
        const scrollYOffset = scrollYRef.current * 0.3;
        
        // 각 blob을 개별적으로 애니메이션
        objectsRef.current.children.forEach((child, index) => {
          if (child instanceof THREE.Mesh && (child as any).rotationSpeed) {
            // 부드러운 자동 회전
            child.rotation.x += (child as any).rotationSpeed.x;
            child.rotation.y += (child as any).rotationSpeed.y;
            child.rotation.z += (child as any).rotationSpeed.z;
            
            // 자동으로 부드럽게 떠다니는 효과 (영상처럼)
            const floatSpeed = (child as any).floatSpeed;
            const floatOffset = (child as any).floatOffset;
            if (floatSpeed && floatOffset) {
              child.position.x += Math.sin(time + floatOffset.x) * floatSpeed.x * 0.1;
              child.position.y += Math.sin(time * 1.2 + floatOffset.y) * floatSpeed.y * 0.1;
              child.position.z += Math.sin(time * 0.8 + floatOffset.z) * floatSpeed.z * 0.1;
            }
            
            // 마우스 따라다니는 효과 (부드럽게)
            const followSpeed = 0.03 + index * 0.01;
            const initialPos = (child as any).initialPosition;
            if (initialPos) {
              const mouseInfluence = 0.3 + index * 0.1;
              const targetX = initialPos.x + mouseXRef.current * mouseInfluence;
              const targetY = initialPos.y + (-mouseYRef.current) * mouseInfluence + scrollYOffset;
              
              child.position.x += (targetX - child.position.x) * followSpeed;
              child.position.y += (targetY - child.position.y) * followSpeed;
            }
            
            // 셰이더 시간 업데이트 (그라데이션 색상 흐름)
            const material = child.material as THREE.ShaderMaterial;
            if (material && material.uniforms) {
              material.uniforms.time.value = time * 2;
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

