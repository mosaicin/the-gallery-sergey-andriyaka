import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./style/css/index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import Loading from "./components/Loading/Loading";

/** Museum adaptation: retain the original first-person gallery interaction while reframing the entry as a memorial watercolor museum for Sergey Andriyaka. */
const Overlay = () => {
  const [ready, setReady] = useState(false);

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
          <aside className="museum-info" aria-label="Информация об экспозиции">
            <div className="info-index">ЭКСПОЗИЦИЯ 01 / 04</div>
            <h2>Свет, вода,<br />память.</h2>
            <p>Постоянная экспозиция, посвящённая творчеству Сергея Николаевича Андрияки — художника, педагога и основателя Академии акварели.</p>
            <div className="info-line" />
            <span className="info-hint">N — СМЕНА ОСВЕЩЕНИЯ</span>
          </aside>
        )}
        <img className={ready ? "hidden-control" : "controlsL"} src="./assets/Images/ControlsL.png" alt="Движение: WASD, прыжок: SPACE, бег: SHIFT" />
        <img className={ready ? "hidden-control" : "controlsR"} src="./assets/Images/ControlsR.png" alt="Обзор: мышь" />
        <img className={ready ? "hidden-control" : "controlsTR"} src="./assets/Images/ControlsTR.png" alt="Производительность: P, освещение: N" />
      </div>
      <div className="dot" style={{ pointerEvents: ready ? "none" : "all" }} aria-hidden="true" />
      <Loading />
    </>
  );
};

ReactDOM.render(<Overlay />, document.getElementById("root"));
reportWebVitals();
