import "./styles.css";
import { useState, useEffect } from "react";
import { FaLinkedin, FaArtstation, FaEnvelope, FaPhone } from "react-icons/fa";

export default function ATVConfigurator() {
  const sliderImages = [
    "/ATVConfigurator_Image/ATV_05.webp",
    "/ATVConfigurator_Image/ATV_04.webp",
    "/ATVConfigurator_Image/ATV_03.webp",
    "/ATVConfigurator_Image/ATV_02.webp",
    "/ATVConfigurator_Image/ATV_06.webp",
  ];

  const mainImage = "/ATVConfigurator_Image/ATV_06.webp";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const prevImage = () => {
    setCurrentIndex(
      (currentIndex - 1 + sliderImages.length) % sliderImages.length
    );
  };

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % sliderImages.length);
  };

  const goToHome = () => {
    window.location.href = "/#home";
    window.location.reload();
  };

  return (
    <div className="project-detail">
      <nav className="project-navbar">
        <div className="project-logo" onClick={goToHome}>
          Portfolio
        </div>
        <ul className="project-menu">
          <li>
            <a href="#overview">Overview</a>
          </li>
          <li>
            <a href="#gallery">Gallery</a>
          </li>
          <li>
            <a href="#tools">Tools</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <div className="detail-header" id="overview">
        <div className="detail-header-content">
          <span className="detail-category">Interactive</span>
          <h1>ATV Bike Configurator</h1>
          <p className="detail-tagline">
            Real-time ATV Configurator with Interactive UI
          </p>
        </div>
        <a
          href="https://vimeo.com/1197075794?fl=pl&fe=sh"
          target="_blank"
          rel="noopener noreferrer"
          className="primary"
        >
          <span>▶ Watch Video</span>
        </a>
      </div>

      <div className="detail-hero-image">
        <img src={mainImage} alt="ATV Configurator Main View" />
      </div>

      <div className="detail-info-grid">
        <div className="detail-info-item">
          <h3>Overview</h3>
          <p>
            Real-time configurator with variants, lighting control, and
            interactive UI allowing users to customize colors and accessories.
          </p>
        </div>
        <div className="detail-info-item">
          <h3>Challenge</h3>
          <p>
            Build a responsive 3D configurator that works seamlessly across web
            and mobile platforms with AR/VR support.
          </p>
        </div>
        <div className="detail-info-item">
          <h3>Result</h3>
          <p>
            Immersive shopping experience with real-time customization and
            interactive product visualization.
          </p>
        </div>
      </div>

      <div className="detail-gallery" id="gallery">
        <h3 className="gallery-title">Gallery</h3>
        <div className="slider-container">
          {sliderImages.map((img, index) => (
            <div
              key={index}
              className={`slide ${index === currentIndex ? "active" : ""}`}
            >
              <img
                src={img}
                alt={`View ${index + 1}`}
                onClick={() => setLightbox(true)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
          <div className="slider-dots">
            {sliderImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="detail-tools-creative" id="tools">
        <h3>Tools & Technologies</h3>
        <div className="tools-creative-grid">
          <div className="tool-card">
            <span className="tool-icon">🎮</span>
            <span className="tool-name">Unreal Engine</span>
            <span className="tool-role">Real-time Rendering</span>
          </div>
          <div className="tool-card">
            <span className="tool-icon">📱</span>
            <span className="tool-name">JavaScript</span>
            <span className="tool-role">Interactivity</span>
          </div>
          <div className="tool-card">
            <span className="tool-icon">🥽</span>
            <span className="tool-name">AR / VR</span>
            <span className="tool-role">Immersive Tech</span>
          </div>
          <div className="tool-card">
            <span className="tool-icon">🌐</span>
            <span className="tool-name">WebGL</span>
            <span className="tool-role">3D Web</span>
          </div>
        </div>
      </div>

      <section className="contact" id="contact">
        <h2>Get In Touch</h2>
        <p>Open for collaborations and freelance opportunities</p>
        <div className="contact-links">
          
          <a href="mailto:your@email.com" className="contact-btn">
            <FaEnvelope /> Email
          </a>
          <a
            href="https://www.artstation.com/jalpesh17"
            className="contact-btn"
            target="_blank"
          >
            <FaArtstation /> ArtStation
          </a>
          <a
            href="https://www.linkedin.com/in/jalpesh-kholiya-28a545170/"
            className="contact-btn"
            target="_blank"
          >
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Jalpesh Kholiya +91 73875 05341
      </footer>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <span
            className="lightbox-arrow-left"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ❮
          </span>
          <img
            src={sliderImages[currentIndex]}
            alt={`View ${currentIndex + 1}`}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
          <span
            className="lightbox-arrow-right"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ❯
          </span>
          <span className="lightbox-close" onClick={() => setLightbox(false)}>
            ✕
          </span>
        </div>
      )}
    </div>
  );
}
