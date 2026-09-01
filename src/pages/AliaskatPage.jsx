import React, { useState } from 'react'
import './AliaskatPage.css'

function AliaskatPage () {

const [hoveredSkill, setHoveredSkill] = useState(null)

  const personData = [
    {
      name: "Алиев Артем",
      age: 18,
      city: "Астана",
      country: "Казахстан",
      phone: "+7 777 123 45 67"
    },
    {
      name: "Нуремиров Жакип",
      age: 19,
      city: "Алматы",
      country: "Казахстан",
      phone: "+7 777 987 65 43"
    }
  ]

  const skills = [
    {
      title: "React",
      level: "Advanced",
      icon: "⚛️"
    },
    {
      title: "JavaScript",
      level: "Expert",
      icon: "✨"
    },
    {
      title: "CSS/Design",
      level: "Advanced",
      icon: "🎨"
    }
  ]

  return (
    <div className="card-container">
      <h1>Информация о разработчиках</h1>
      
      {/* Два куба с информацией */}
      <div className="cubes-section">
        {personData.map((person, index) => (
          <div key={index} className="cube-wrapper">
            <div className="cube">
              <div className="cube-face front">
                <div className="face-content">
                  <h2>{person.name}</h2>
                  <p>{person.age} лет</p>
                </div>
              </div>
              <div className="cube-face back">
                <div className="face-content">
                  <p>{person.city}</p>
                  <p>{person.country}</p>
                </div>
              </div>
              <div className="cube-face right">
                <div className="face-content">
                  <p>Телефон:</p>
                  <p>{person.phone}</p>
                </div>
              </div>
              <div className="cube-face left">
                <div className="face-content">
                  <p>Разработчик</p>
                  <p>Web Developer</p>
                </div>
              </div>
              <div className="cube-face top">
                <div className="face-content">
                  <p>Профиль</p>
                </div>
              </div>
              <div className="cube-face bottom">
                <div className="face-content">
                  <p>Информация</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Три прямоугольника с навыками */}
      <h2 className="skills-title">Навыки</h2>
      <div className="skills-section">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="skill-rectangle"
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
            style={{
              transform: hoveredSkill === index ? 'scale(1.15)' : 'scale(1)'
            }}
          >
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-content">
              <h3>{skill.title}</h3>
              <p>{skill.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AliaskatPage