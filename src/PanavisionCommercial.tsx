import "./styles.css";
import { useState, useEffect } from "react";
import { FaLinkedin, FaArtstation, FaEnvelope } from "react-icons/fa";

export default function PanavisionCommercial() {
  const sliderImages = [
    "/Panavision Commercial/Panavision Commercial_02.png",
    "/Panavision Commercial/Panavision Commercial_03.jpg",
    "/Panavision Commercial/Panavision Commercial_01.png",
  ];

  const mainImage = "/Panavision Commercial/Panavision Commercial_03.jpg";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + sliderImages.length) % sliderImages.length);
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
        <div className="project-logo" onClick={goToHome}>Portfolio</div>
        <ul className="project-menu">
          <li><a href="#overview">Overview</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#tools">Tools</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Header */}
      <div className="detail-header" id="overview">
        <div className="detail-header-content">
          <span className="detail-category">Commercial</span>
          <h1>Panavision Commercial</h1>
          <p className="detail-tagline">Film Production Visualization</p>
        </div>
        <a href="https://vimeo.com/327700737?fl=ip&fe=ec" target="_blank" rel="noopener noreferrer" className="primary">
          <span>▶ Watch Video</span>
        </a>
      </div>

      {/* Main Image */}
      <div className="detail-hero-image">
        <img src={mainImage} alt="Panavision Commercial Main View" />
      </div>

      {/* Description */}
      <div className="detail-info-grid">
        <div className="detail-info-item">
          <h3>Overview</h3>
          <p>Commercial film production visualization for Panavision showcasing cinema equipment and production workflows.</p>
        </div>
        <div className="detail-info-item">
          <h3>Challenge</h3>
          <p>Create photorealistic visualizations of professional film equipment for marketing and promotional materials.</p>
        </div>
        <div className="detail-info-item">
          <h3>Result</h3>
          <p>High-quality visual assets used in advertising campaigns and trade shows.</p>
        </div>
      </div>

      {/* Slider Gallery */}
      <div className="detail-gallery" id="gallery">
        <h3 className="gallery-title">Gallery</h3>
        <div className="slider-container">
          {sliderImages.map((img, index) => (
            <div key={index} className={`slide ${index === currentIndex ? "active" : ""}`}>
              <img src={img} alt={`View ${index + 1}`} onClick={() => setLightbox(true)} style={{ cursor: "pointer" }} />
            </div>
          ))}
          <div className="slider-dots">
            {sliderImages.map((_, index) => (
              <span key={index} className={`dot ${index === currentIndex ? "active" : ""}`} onClick={() => setCurrentIndex(index)} />
            ))}
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="detail-tools-creative" id="tools">
        <h3>Tools & Technologies</h3>
        <div className="tools-creative-grid">
          <div className="tool-card"><span className="tool-icon">🎮</span><span className="tool-name">Unreal Engine</span><span className="tool-role">Real-time</span></div>
          <div className="tool-card"><span className="tool-icon">📐</span><span className="tool-name">Maya</span><span className="tool-role">Modeling</span></div>
          <div className="tool-card"><span className="tool-icon">🎨</span><span className="tool-name">Substance</span><span className="tool-role">Texturing</span></div>
          <div className="tool-card"><span className="tool-icon">📷</span><span className="tool-name">Arnold</span><span className="tool-role">Rendering</span></div>
        </div>
      </div>

      {/* Contact */}
      <section className="contact" id="contact">
        <h2>Get In Touch</h2>
        <p>Open for collaborations and freelance opportunities</p>
        <div className="contact-links">
          <a href="mailto:your@email.com" className="contact-btn"><FaEnvelope /> Email</a>
          <a href="https://www.artstation.com/jalpesh17" className="contact-btn" target="_blank"><FaArtstation /> ArtStation</a>
          <a href="https://www.linkedin.com/in/jalpesh-kholiya-28a545170/" className="contact-btn" target="_blank"><FaLinkedin /> LinkedIn</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Jalpesh Kholiya +91 73875 05341
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <span className="lightbox-arrow-left" onClick={(e) => { e.stopPropagation(); prevImage(); }}>❮</span>
          <img src={sliderImages[currentIndex]} alt={`View ${currentIndex + 1}`} className="lightbox-image" onClick={(e) => e.stopPropagation()} />
          <span className="lightbox-arrow-right" onClick={(e) => { e.stopPropagation(); nextImage(); }}>❯</span>
          <span className="lightbox-close" onClick={() => setLightbox(false)}>✕</span>
        </div>
      )}
    </div>
  );
}