import React from 'react'
import { Link } from 'react-router-dom'
import './ErmPage.css'
function ErmPage() {
  return (
    <div className="nature-page">
      {/* Шапка сайта */}
      <header className="header">
        <div className="container nav-container">
          <div className="logo">🌿 ЭкоМир</div>
          <nav className="nav">
            <a href="#about">О нас</a>
            <a href="#features">Маршруты</a>
            <a href="#gallery">Галерея</a>
            <a href="#contact">Контакты</a>
          </nav>
        </div>
      </header>

      {/* Главный экран */}
      <section className="hero">
        <div className="hero-content">
          <h1>Откройте для себя первозданную природу</h1>
          <p>Погрузитесь в тишину леса, чистый горный воздух и величественные пейзажи.</p>
          <a href="#features" className="btn">Исследовать маршруты</a>
        </div>
      </section>

      {/* Секция "О нас" */}
      <section id="about" className="about section">
        <div className="container">
          <h2>О нашем заповеднике</h2>
          <p className="subtitle">Мы сохраняем дикую природу в её первозданном виде для будущих поколений.</p>
          <div className="about-grid">
            <div className="about-card">
              <h3>🌲 Вековые леса</h3>
              <p>Уникальные экосистемы с редкими видами флоры и фауны, нетронутые человеком.</p>
            </div>
            <div className="about-card">
              <h3>💧 Чистейшие реки</h3>
              <p>Прозрачные родники и горные потоки с питьевой водой высшего качества.</p>
            </div>
            <div className="about-card">
              <h3>⛰️ Горные вершины</h3>
              <p>Захватывающие дух панорамные виды и безопасные смотровые площадки.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Галерея */}
      <section id="gallery" className="gallery section">
        <div className="container">
          <h2>Живописные виды</h2>
          <div className="gallery-grid">
            <div className="gallery-item item-1"></div>
            <div className="gallery-item item-2"></div>
            <div className="gallery-item item-3"></div>
          </div>
        </div>
      </section>

      {/* Подвал */}
      <footer id="contact" className="footer">
        <div className="container footer-container">
          <p>© 2026 ЭкоМир. Все права защищены.</p>
          <p>Свяжитесь с нами: info@ecomir-nature.org</p>
        </div>
      </footer>
    </div>
  )
}

export default ErmPage