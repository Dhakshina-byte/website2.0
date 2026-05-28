import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import ContactChat from './ContactChat';
import modelUrl from '@/assets/3d_model/laptop_3d_model_asus_tuf_dash_f15_2022.glb?url';
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const scaled = useRef(false);

  useEffect(() => {
    if (!groupRef.current || scaled.current) return;
    scaled.current = true;

    const box = new THREE.Box3().setFromObject(scene);
    const boxSize = new THREE.Vector3();
    box.getSize(boxSize);
    const maxDim = Math.max(boxSize.x, boxSize.y, boxSize.z);

    const cam = camera as THREE.PerspectiveCamera;
    const fovRad = (cam.fov * Math.PI) / 180;
    const dist = (camera.position as THREE.Vector3).length();
    const visibleHeight = 2 * Math.tan(fovRad / 2) * dist;
    const scaleFactor = (visibleHeight * 0.95) / maxDim;

    groupRef.current.scale.setScalar(scaleFactor);

    const center = new THREE.Vector3();
    box.getCenter(center);

    // Center horizontally, push down so keyboard shows at bottom edge
    groupRef.current.position.set(
      -center.x * scaleFactor  - 8,  // slight right shift
      -center.y * scaleFactor  + 0,  // push down — keyboard at bottom
      -center.z * scaleFactor +4,
    );

    groupRef.current.rotation.set(
        0,  // tilt screen back (opens up toward viewer)
       +10,  // rotate left so screen faces headline
       +0.06   // subtle roll
    );
  }, [scene, camera]);

  return <group ref={groupRef}><primitive object={scene} /></group>;
}
const ModelViewer: React.FC = () => {
  const [socialOpen, setSocialOpen] = useState(false);

  return (
    <>
      <style>{`
        .mv-wrapper {
          position: relative;
          width: 45vw;
          height: 45vh;
          min-width: 280px;
          min-height: 200px;
          background-color: #111114;
          border-radius: 16px;
          overflow: hidden;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        .mv-actions {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .mv-wrapper .cc-trigger {
          position: static !important;
        }

       .mv-social-btn {
  padding: 8px 18px;
  background-color: transparent;
  color: #ffffff;
  border: 1.5px solid rgba(255,255,255,0.7);
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 0.01em;
  backdrop-filter: blur(4px);
  transition: background-color 0.2s, border-color 0.2s;
  white-space: nowrap;
}
.mv-social-btn:hover {
  background-color: rgba(255,255,255,0.12);
  border-color: #ffffff;
}
.mv-social-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 20;
  background: rgba(20,20,24,0.95);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 140px;
  backdrop-filter: blur(12px);
}
.mv-social-dropdown a {
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  font-size: 13px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 8px;
}
.mv-social-dropdown a svg {
  font-size: 20px;
  flex-shrink: 0;
}
.mv-social-dropdown a:hover {
  background: rgba(255,255,255,0.08);
  color: #ffffff;
}

        /* Centered headline overlay */
        .mv-headline {
          position: absolute;
          top: 50%;
          left: 28px;
          transform: translateY(-50%);
          z-index: 10;
          pointer-events: none;
        }
        .mv-headline h1 {
          margin: 0;
          font-size: clamp(18px, 3.4vw, 52px);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }
        .mv-headline h1 .word-1 { color: #ffffff; display: block; }
        .mv-headline h1 .word-2 { color: rgba(255,255,255,0.55); display: block; }
        .mv-headline h1 .word-3 { color: #ff6b35; display: block; }

        .mv-headline p {
          margin: 10px 0 0;
          font-size: clamp(9px, 1vw, 12px);
          color: rgba(255,255,255,0.32);
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .mv-canvas-wrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: auto;
        }

        /* Left fade keeps text readable */
        .mv-fade {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, #111114 40%, transparent);
          pointer-events: none;
          z-index: 5;
        }

        /* ── Responsive ── */

        /* Mobile: don't touch screen edges */
        @media (max-width: 480px) {
          .mv-wrapper {
            width: calc(100% - 32px);   /* 16px margin each side */
            height: 62vw;
            min-height: 200px;
            border-radius: 14px;
            margin: 0 16px;
          }
          .mv-headline { left: 16px; }
        .mv-actions { top: 10px; right: 10px; gap: 8px; }
        .mv-wrapper .cc-trigger { padding: 6px 12px !important; font-size: 10px !important; }
        .mv-social-btn { padding: 6px 12px; font-size: 10px; }
        .mv-social-dropdown { min-width: 120px; padding: 6px; }
      .mv-social-dropdown a { font-size: 12px; padding: 8px 10px; gap: 6px; }
      .mv-social-dropdown a svg { font-size: 16px; }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .mv-wrapper {
            width: calc(100% - 40px);
            height: 52vw;
            border-radius: 14px;
            margin: 0 20px;
          }
          .mv-headline { left: 22px; }
        .mv-actions { top: 14px; right: 14px; gap: 10px; }
        .mv-wrapper .cc-trigger { padding: 7px 15px !important; font-size: 12px !important; }
        .mv-social-btn { padding: 7px 15px; font-size: 12px; }
        .mv-social-dropdown { min-width: 130px; }
      .mv-social-dropdown a { font-size: 12px; padding: 8px 10px; }
      .mv-social-dropdown a svg { font-size: 18px; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .mv-wrapper { width: 65vw; height: 40vw; }
        }
      `}</style>

      <div className="mv-wrapper">
        <div className="mv-actions">
          <div style={{ position: 'relative' }}>
            <button className="mv-social-btn" onClick={() => setSocialOpen(o => !o)}>
              Social
            </button>
            {socialOpen && (
              <div className="mv-social-dropdown">
                <a href="https://github.com/Dhakshina-byte" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/dhakshina-perera-b50a6223b/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin /> LinkedIn
                </a>
                <a href="https://www.instagram.com/_dhakshina_perera_?igsh=eXpwY3BvajN5YjRw" target="_blank" rel="noopener noreferrer">
                  <FaInstagram /> Instagram
                </a>
              </div>
            )}
          </div>
          <ContactChat />
        </div>
        
        <div className="mv-headline">
          <h1>
            <span className="word-1">Code.</span>
            <span className="word-2">Create.</span>
            <span className="word-3">Deliver.</span>
          </h1>
        </div>

        <div className="mv-canvas-wrap">
          <Canvas
            camera={{ position: [0, 0.3, 2.8], fov: 55 }}
            gl={{ alpha: true }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={2} />
            <spotLight position={[5, 8, 5]} angle={0.2} penumbra={1} decay={0} intensity={Math.PI * 1.5} />
            <pointLight position={[-8, -8, -8]} decay={0} intensity={Math.PI} />
            <directionalLight position={[3, 3, 3]} intensity={1.5} />
            <Suspense fallback={
              <Html center><div className="text-white/60 tracking-widest text-xs uppercase whitespace-nowrap">Loading 3D Model...</div></Html>
            }>
              <Model url={modelUrl} />
            </Suspense>
            <OrbitControls makeDefault target={[0.55, -0.3, 0]} />
          </Canvas>
        </div>

        <div className="mv-fade" />
      </div>
    </>
  );
};

useGLTF.preload(modelUrl);

export default ModelViewer;