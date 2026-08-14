import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./style/css/index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import Loading from "./components/Loading/Loading";

/** Museum adaptation: the original pointer-lock gallery remains the spatial frame; this catalog adds a rights-safe index of works listed by the official museum. */
const SOURCE_URL = "https://mvk.academy-andriaka.ru/exhibitions/sergey-andriyaka/";
const CATALOG = [
  { title: "Разноцветные ирисы", year: "2000", group: "Цветы и натюрморт" },
  { title: "Деревенский домик", year: "2008", group: "Архитектура и Россия" },
  { title: "Маки", year: "2008", group: "Цветы и натюрморт" },
  { title: "Храм Христа Спасителя", year: "—", group: "Архитектура и Россия" },
  { title: "Церковь святого Владимира", year: "—", group: "Архитектура и Россия" },
  { title: "Вологда. Церковь Иоанна Златоуста", year: "2009", group: "Архитектура и Россия" },
  { title: "Хризантемы на голубом фоне", year: "2008", group: "Цветы и натюрморт" },
  { title: "Два букета алых роз", year: "2008", group: "Цветы и натюрморт" },
  { title: "Хризантемы и дыни", year: "2008", group: "Цветы и натюрморт" },
  { title: "Старый пруд в центре Нерехты", year: "2010", group: "Пейзаж" },
  { title: "Екатерининская пустынь", year: "2008", group: "Архитектура и Россия" },
  { title: "Майский вечер", year: "2010", group: "Пейзаж" },
  { title: "Летние сумерки. После дождя", year: "2009", group: "Пейзаж" },
  { title: "Букет белых лилий", year: "2008", group: "Цветы и натюрморт" },
  { title: "Закат над зимней рекой", year: "2011", group: "Пейзаж" },
  { title: "Час заката", year: "2008", group: "Пейзаж" },
  { title: "Восход в горах", year: "2006", group: "Пейзаж" },
  { title: "На конюшне", year: "2011", group: "Другие мотивы" },
  { title: "Со скалистого", year: "—", group: "Другие мотивы" },
  { title: "В Венеции", year: "2009", group: "Зарубежье" },
  { title: "Канал в Венеции", year: "2008", group: "Зарубежье" },
  { title: "Ветка сирени в вазе", year: "2009", group: "Цветы и натюрморт" },
  { title: "Сосульки на карнизе", year: "2010", group: "Пейзаж" },
  { title: "Купол Рождественского собора в Звенигороде", year: "—", group: "Архитектура и Россия" },
  { title: "Водопад в Норвегии", year: "2007", group: "Зарубежье" },
  { title: "Дорога через поле ржи", year: "2010", group: "Пейзаж" },
  { title: "Заснеженные сосны", year: "—", group: "Пейзаж" },
  { title: "Снегопад в старой Вологде", year: "2010", group: "Архитектура и Россия" },
  { title: "Дорога в зимнем лесу", year: "2010", group: "Пейзаж" },
  { title: "Дары сентября", year: "2010", group: "Цветы и натюрморт" },
  { title: "Осень. Гороховец", year: "2011", group: "Архитектура и Россия" },
  { title: "Соборы", year: "2002", group: "Архитектура и Россия" },
  { title: "Хризантемы в плетёной корзине", year: "2010", group: "Цветы и натюрморт" },
];

const GROUPS = ["Архитектура и Россия", "Пейзаж", "Цветы и натюрморт", "Зарубежье", "Другие мотивы"];

const Overlay = () => {
  const [ready, setReady] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  useEffect(() => {
    const handleLockchange = () => setReady(document.pointerLockElement !== null);
    document.addEventListener("pointerlockchange", handleLockchange);
    return () => document.removeEventListener("pointerlockchange", handleLockchange);
  }, []);

  return (
    <>
      <App />
      <div className={ready ? "museum-hud" : "overlay"}>
        {!ready ? (
          <section className="museum-entry" aria-label="Вход в музей акварели">
            <div className="museum-meta"><span>ПАМЯТИ СЕРГЕЯ АНДРИЯКИ</span><span>МОСКВА / АКВАРЕЛЬ</span></div>
            <div className="museum-title-block">
              <p className="museum-kicker">Музей акварели</p>
              <h1>Сергей<br />Андрияка</h1>
              <p className="museum-subtitle">Пространство, посвящённое мастеру многослойной акварели, его школе и красоте русского пейзажа.</p>
              <div className="entry-rule"><span /></div>
              <div className="start">Войти в экспозицию <span>↓</span></div>
            </div>
            <div className="museum-bottom"><span>WASD — ДВИЖЕНИЕ</span><span>МЫШЬ — ОБЗОР / SPACE — ПРЫЖОК</span></div>
          </section>
        ) : (
          <>
            <aside className="museum-info" aria-label="Информация об экспозиции">
              <div className="info-index">ЭКСПОЗИЦИЯ 01 / 04</div>
              <h2>Свет, вода,<br />память.</h2>
              <p>Постоянная экспозиция, посвящённая творчеству Сергея Николаевича Андрияки — художника, педагога и основателя Академии акварели.</p>
              <div className="info-line" />
              <span className="info-hint">N — СМЕНА ОСВЕЩЕНИЯ</span>
            </aside>
            <button className="catalog-toggle" onClick={() => setCatalogOpen(true)}>КАТАЛОГ <strong>33</strong></button>
          </>
        )}
        <img className={ready ? "hidden-control" : "controlsL"} src="./assets/Images/ControlsL.png" alt="Движение: WASD, прыжок: SPACE, бег: SHIFT" />
        <img className={ready ? "hidden-control" : "controlsR"} src="./assets/Images/ControlsR.png" alt="Обзор: мышь" />
        <img className={ready ? "hidden-control" : "controlsTR"} src="./assets/Images/ControlsTR.png" alt="Производительность: P, освещение: N" />
      </div>
      <div className="dot" style={{ pointerEvents: ready ? "none" : "all" }} aria-hidden="true" />
      {catalogOpen && (
        <section className="catalog-panel" aria-label="Каталог работ Сергея Андрияки">
          <div className="catalog-header">
            <div><span className="catalog-kicker">ОФИЦИАЛЬНЫЙ СПИСОК ЭКСПОЗИЦИИ</span><h2>Работы Сергея Андрияки</h2><p>33 названия из страницы постоянной экспозиции. Изображения не копируются без разрешения правообладателя.</p></div>
            <button className="catalog-close" onClick={() => setCatalogOpen(false)} aria-label="Закрыть каталог">×</button>
          </div>
          <div className="catalog-groups">
            {GROUPS.map((group) => {
              const works = CATALOG.filter((work) => work.group === group);
              return <div className="catalog-group" key={group}><h3>{group}<span>{String(works.length).padStart(2, "0")}</span></h3><div className="catalog-list">{works.map((work) => <div className="catalog-item" key={work.title}><span>{work.title}</span><time>{work.year}</time></div>)}</div></div>;
            })}
          </div>
          <div className="catalog-footer"><span>С.Н. АНДРИЯКА / КЛАССИЧЕСКАЯ МНОГОСЛОЙНАЯ АКВАРЕЛЬ</span><a href={SOURCE_URL} target="_blank" rel="noreferrer">Открыть официальный источник ↗</a></div>
        </section>
      )}
      <Loading />
    </>
  );
};

ReactDOM.render(<Overlay />, document.getElementById("root"));
reportWebVitals();
