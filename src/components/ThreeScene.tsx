import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface ThreeSceneProps {
  P0: Vector3;
  V: Vector3;
  P: Vector3;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ P0, V, P }) => {
  const { scene, camera } = useThree();
  const axesHelper = useRef<THREE.AxesHelper | null>(null);
  const lineRef = useRef<THREE.Line | null>(null);
  const point0Ref = useRef<THREE.Points | null>(null);
  const pointPRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    camera.zoom = 2;
    camera.updateProjectionMatrix();

    return () => {
      if (axesHelper.current) {
        scene.remove(axesHelper.current);
        axesHelper.current = null;
      }
    };
  }, [scene, camera]);

  useEffect(() => {
    if (lineRef.current) scene.remove(lineRef.current);
    if (point0Ref.current) scene.remove(point0Ref.current);
    if (pointPRef.current) scene.remove(pointPRef.current);

    if (P0 && V && P) {
      const newLine = createLine(P0, V);
      const newPoint0 = createPoint(P0, 0x00ff00);
      const newPointP = createPoint(P, 0xff0000);

      lineRef.current = newLine;
      point0Ref.current = newPoint0;
      pointPRef.current = newPointP;

      scene.add(newLine);
      scene.add(newPoint0);
      scene.add(newPointP);
    }
  }, [P0, V, P, scene]);

  useFrame(() => { });

  function createLine(P0: Vector3, V: Vector3) {
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(P0.x, P0.y, P0.z).add(new THREE.Vector3(V.x, V.y, V.z).multiplyScalar(-100)),
      new THREE.Vector3(P0.x, P0.y, P0.z).add(new THREE.Vector3(V.x, V.y, V.z).multiplyScalar(100)),
    ]);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    return new THREE.Line(lineGeometry, lineMaterial);
  }

  function createPoint(position: Vector3, color: number) {
    const pointGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(position.x, position.y, position.z)]);
    const pointMaterial = new THREE.PointsMaterial({ color, size: 0.3 });
    return new THREE.Points(pointGeometry, pointMaterial);
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableDamping dampingFactor={0.25} />
      <ArrowHelper direction={new THREE.Vector3(1, 0, 0)} length={5} color={0xff0000} />
      <ArrowHelper direction={new THREE.Vector3(0, 1, 0)} length={5} color={0x00ff00} />
      <ArrowHelper direction={new THREE.Vector3(0, 0, 1)} length={5} color={0x0000ff} />
    </>
  );
};

const ArrowHelper = ({ direction, length, color }: { direction: THREE.Vector3; length: number; color: number }) => {
  const ref = useRef<THREE.ArrowHelper>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.setDirection(direction);
      ref.current.setLength(length);
      ref.current.setColor(color);
    }
  }, [direction, length, color]);

  return <primitive object={new THREE.ArrowHelper(direction, new THREE.Vector3(0, 0, 0), length, color)} ref={ref} />;
};

const ThreeCanvas: React.FC<{ P0: Vector3; V: Vector3; P: Vector3 }> = ({ P0, V, P }) => (
  <Canvas className="w-full h-full min-h-[300px] md:min-h-[500px]" style={{ aspectRatio: '16/9' }}>
    <ThreeScene P0={P0} V={V} P={P} />
  </Canvas>
);

export default ThreeCanvas;