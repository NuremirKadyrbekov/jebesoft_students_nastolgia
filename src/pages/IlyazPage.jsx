import React from 'react';
import styles from './IlyazPage.module.css';
import Ilaz from '../assets/Ilaz.jpeg';

export default function IlyazPage() {
  const languages = [
    { name: 'КЫРГЫЗСКИЙ', level: 100 },
    { name: 'РУССКИЙ', level: 95 },
    { name: 'АНГЛИЙСКИЙ', level: 75 },
    { name: 'ТУРЕЦКИЙ', level: 50 },
  ];

  const skills = [
    { name: 'REACT', percent: 90 },
    { name: 'JAVASCRIPT', percent: 85 },
    { name: 'HTML / CSS', percent: 95 },
    { name: 'GIT / GITHUB', percent: 80 },
    { name: 'REDUX', percent: 75 },
    { name: 'TYPESCRIPT', percent: 70 },
  ];

  const hobbies = [
    { name: 'Кодинг', icon: '💻' },
    { name: 'Спорт', icon: '⚽' },
    { name: 'Игры', icon: '🎮' },
  ];

  return (
    <div className={styles.page}>
      {/* Навигация */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>Ilyaz Alymkulov</div>
        <div className={styles.navRight}>
          <div className={styles.navLinks}>
            <a href="#portfolio">PORTFOLIO</a>
            <a href="#about" className={styles.activeLink}>ABOUT</a>
            <span className={styles.searchIcon}>🔍</span>
          </div>
          <a href="#contact" className={styles.contactBtn}>GET IN TOUCH</a>
        </div>
      </nav>

      {/* Верхний белый блок (Профиль) */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.avatarWrapper}>
            <img 
              src={Ilaz}
              alt="Ильяз Алымкулов" 
              className={styles.avatar}
            />
          </div>

          <div className={styles.bioContent}>
            <h1 className={styles.name}>Ильяз Алымкулов</h1>
            <h2 className={styles.title}>Frontend Разработчик (Студент)</h2>
            <p className={styles.description}>
              Привет всем! Меня зовут Ильяз, я начинающий Frontend-разработчик, активно изучающий React и современный веб-стек.
            </p>
            <p className={styles.description}>
              С момента начала обучения я постоянно стремлюсь <strong>создавать удобные, быстрые и отзывчивые пользовательские интерфейсы</strong>. Стремлюсь развивать навыки адаптивной верстки, работы с API и управления состоянием приложения.
            </p>
          </div>
        </div>
      </section>

      {/* Нижний желтый блок (Скиллы, Языки, Хобби) */}
      <section className={styles.detailsSection}>
        <div className={styles.detailsContainer}>
          
          {/* Языки */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Languages</h3>
            <div className={styles.languageList}>
              {languages.map((lang, index) => (
                <div key={index} className={styles.langRow}>
                  <span className={styles.langName}>{lang.name}</span>
                  <div className={styles.barTrack}>
                    <div 
                      className={styles.barFill} 
                      style={{ width: `${lang.level}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Навыки / Технологии */}
          <div className={styles.columnCenter}>
            <h3 className={styles.columnTitle}>Skills & Tools</h3>
            <div className={styles.skillsGrid}>
              {skills.map((skill, index) => (
                <div key={index} className={styles.circleCard}>
                  <div className={styles.circle}>
                    <span>{skill.percent}%</span>
                  </div>
                  <span className={styles.skillName}>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Хобби */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Hobbies</h3>
            <div className={styles.hobbiesList}>
              {hobbies.map((hobby, index) => (
                <div key={index} className={styles.hobbyCircle} title={hobby.name}>
                  <span className={styles.hobbyIcon}>{hobby.icon}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}