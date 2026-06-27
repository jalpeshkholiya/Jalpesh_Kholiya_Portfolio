import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  ContactShadows,
  Environment,
  Center,
} from "@react-three/drei";
import { useState, useEffect, Suspense, useRef } from "react";
import "./styles.css";
import { FaLinkedin, FaArtstation, FaEnvelope } from "react-icons/fa";

function CameraController({ view }: { view: "exterior" | "interior" }) {
  const { camera } = useThree();

  useEffect(() => {
    if (view === "exterior") {
      camera.position.set(8, 4, 12);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.set(0, 10, 6);
      camera.lookAt(0, 2.5, 0);
    }
  }, [view, camera]);

  return null;
}

function CarModel({
  color,
  view,
}: {
  color: string;
  view: "exterior" | "interior";
}) {
  const { scene } = useGLTF("/LiveConfiguator/2021_ram_1500_trx.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      const meshName = (mesh.name || "").toLowerCase();
      const material = mesh.material;
      const mats = Array.isArray(material) ? material : [material];

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      if (meshName.includes("body")) {
        mats.forEach((m) => {
          if (!m || !(m as any).color) return;
          const matAny = m as any;
          matAny.color.set(color);
          if ("metalness" in matAny) matAny.metalness = 0.6;
          if ("roughness" in matAny) matAny.roughness = 0.15;
        });
      }

      if (meshName.includes("glass") || meshName.includes("window")) {
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0x88ccff,
          metalness: 0,
          roughness: 0,
          transmission: 0.1,
          thickness: 0.5,
          transparent: true,
          opacity: 0.1,
          clearcoat: 1,
          clearcoatRoughness: 0,
          ior: 1.5,
          envMapIntensity: 2,
        });

        mesh.material = Array.isArray(material)
          ? mats.map(() => glassMat)
          : glassMat;
      }

      if (
        meshName.includes("chrome") ||
        meshName.includes("metal") ||
        meshName.includes("trim")
      ) {
        mats.forEach((m) => {
          if (!m) return;
          const matAny = m as any;
          if ("metalness" in matAny) matAny.metalness = 0.95;
          if ("roughness" in matAny) matAny.roughness = 0.05;
        });
      }
    });
  }, [color, scene]);

  useFrame(() => {
    if (groupRef.current) {
      if (view === "interior") {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          Math.PI * 0.5,
          0.03
        );
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          0,
          0.03
        );
      }
    }
  });

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={scene} scale={0.05} />
      </group>
    </Center>
  );
}

function RoadBackground() {
  const { scene } = useGLTF("/LiveConfiguator/Road.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      mesh.castShadow = false;
      mesh.receiveShadow = true;
    });
  }, [scene]);

  return <primitive object={scene} scale={1.2} position={[-50, -3.5, -60]} rotation={[0,0,0]} />;
}

export default function LiveConfigurator() {
  const [bodyColor, setBodyColor] = useState("#1a1a1a");
  const [view, setView] = useState<"exterior" | "interior">("exterior");
  const [lightingMode, setLightingMode] = useState<
    "environment" | "studio"
  >("environment");
  const isEnvironmentActive = lightingMode === "environment";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const goToHome = () => {
    window.location.href = "/#home";
    window.location.reload();
  };

  return (
    <div className="live-configurator">
      <nav className="project-navbar">
        <div className="project-logo" onClick={goToHome}>
          Portfolio
        </div>
        <ul className="project-menu">
          <li><a href="#configurator">Configurator</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {isLoading && (
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading 3D Model...</p>
        </div>
      )}

      <div className="canvas-wrapper" id="configurator">
        <Canvas
          camera={{ position: [1, 1, 1], fov: 35 }}
          shadows
          style={{
            background:
              lightingMode === "studio"
                ? "#111111"
                : "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
          }}
        >
          <Suspense fallback={null}>

            {/* ✅ FINAL HDRI FIX */}
            {lightingMode === "environment" ? (
              <>
                <ambientLight intensity={0.5} />
                <directionalLight
                  position={[6, 10, 6]}
                  intensity={1}
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                  shadow-camera-near={1}
                  shadow-camera-far={50}
                  shadow-camera-left={-20}
                  shadow-camera-right={20}
                  shadow-camera-top={20}
                  shadow-camera-bottom={-20}
                  shadow-bias={-0.0005}
                />

                <Environment
                  files="/LiveConfiguator/Environment.hdr"
                  background
                  ground={{
                    height: 50,
                    radius: 3000,
                    scale: 500,
                  }}
                />
              </>
            ) : (
              <>
                <ambientLight intensity={0.3} />

                <spotLight position={[10, 15, 10]} intensity={2} angle={0.3} penumbra={1} castShadow />
                <spotLight position={[-10, 10, -10]} intensity={1} angle={0.4} />
                <spotLight position={[0, 20, -20]} intensity={1.5} angle={0.5} />

                {/* KEEP CITY PRESET */}
                <Environment preset="city" background={false} />
              </>
            )}

            <CameraController view={view} />
            {lightingMode === "environment" && <RoadBackground />}
            <CarModel color={bodyColor} view={view} />

            {lightingMode === "environment" && (
              <>
                <mesh rotation-x={-Math.PI / 2} position={[0, -3.47, 0]} receiveShadow>
                  <planeGeometry args={[80, 80]} />
                  <shadowMaterial opacity={1} transparent />
                </mesh>
              </>
            )}
          </Suspense>

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            minDistance={view === "interior" ? 0.5 : 6}
            maxDistance={view === "interior" ? 2 : 20}
            minPolarAngle={view === "interior" ? Math.PI / 32 : Math.PI / 8}
            maxPolarAngle={
              view === "interior"
                ? Math.PI - 0.3
                : Math.PI / 2 - 0.1
            }
            autoRotate={view === "exterior"}
            autoRotateSpeed={0.7}
          />
        </Canvas>

        <div className="controls-overlay">
          <div className="view-toggle">
            <button className={`view-btn ${view === "exterior" ? "active" : ""}`} onClick={() => setView("exterior")}>
              Exterior
            </button>
            <button className={`view-btn ${view === "interior" ? "active" : ""}`} onClick={() => setView("interior")}>
              Interior
            </button>
          </div>

          <div className="lighting-toggle">
            <button className={`toggle-btn ${lightingMode === "environment" ? "active" : ""}`} onClick={() => setLightingMode("environment")}>
              Environment
            </button>
            <button className={`toggle-btn ${lightingMode === "studio" ? "active" : ""}`} onClick={() => setLightingMode("studio")}>
              Studio
            </button>
          </div>

          <div className="color-picker-overlay">
            <input type="color" value={bodyColor} onChange={(e) => setBodyColor(e.target.value)} className="color-input" />
            <span className="color-label">{bodyColor.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <section className="contact" id="contact">
        <h2>Get In Touch</h2>
        <div className="contact-links">
          <a href="mailto:your@email.com" className="contact-btn"><FaEnvelope /> Email</a>
          <a href="https://www.artstation.com/jalpesh17" className="contact-btn" target="_blank"><FaArtstation /> ArtStation</a>
          <a href="https://www.linkedin.com/in/jalpesh-kholiya-28a545170/" className="contact-btn" target="_blank"><FaLinkedin /> LinkedIn</a>
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Jalpesh Kholiya +91 73875 05341
      </footer>
    </div>
  );
}