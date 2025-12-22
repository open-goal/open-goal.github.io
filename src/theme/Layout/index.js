import { useEffect } from "react";
import Layout from '@theme-original/Layout';

const SNOWFLAKE_SRC = require("@site/static/img/holidays.png").default;
const MAX_FLAKES = 80;
const STORAGE_KEY = "holidays-enabled";

export function useSnowflakes() {
  useEffect(() => {
    const container = document.getElementById("holidays-animation");
    if (!container) return;

    const flakes = [];
    let running = localStorage.getItem(STORAGE_KEY) !== "false";

    function createFlake() {
      const flake = document.createElement("img");
      flake.src = SNOWFLAKE_SRC;
      flake.style.position = "absolute";
      flake.style.top = "-10px";
      flake.style.left = `${Math.random() * window.innerWidth}px`;
      const size = 8 + Math.random() * 20;
      const speed = 0.4 + Math.random() * 1.2;
      const drift = (Math.random() - 0.5) * 0.5;
      flake.style.width = `${size}px`;
      flake.style.opacity = `${0.4 + Math.random() * 0.6}`;
      container.appendChild(flake);
      flakes.push({
        el: flake,
        x: parseFloat(flake.style.left),
        y: -size,
        speed,
        drift,
        size,
      });
    }

    function update() {
      // some event listener to disable running

      if (!running) return;
      if (flakes.length < MAX_FLAKES && Math.random() < 0.3) {
        createFlake();
      }
      for (let i = flakes.length - 1; i >= 0; i--) {
        const f = flakes[i];
        f.y += f.speed;
        f.x += f.drift;
        f.el.style.transform = `translate(${f.x}px, ${f.y}px)`;
        if (f.y > window.innerHeight + f.size) {
          f.el.remove();
          flakes.splice(i, 1);
        }
      }
      requestAnimationFrame(update);
    }

    function handleStorage(e) {
      running = localStorage.getItem(STORAGE_KEY) !== "false";
      if (!running) {
        flakes.forEach(f => f.el.remove());
      } else {
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("local-storage-update", handleStorage);
    update();

    return () => {
      running = false;
      flakes.forEach(f => f.el.remove());
      window.removeEventListener("local-storage-update", handleStorage);
    };
  }, []);
}

export default function LayoutWrapper(props) {
  useSnowflakes();

  return (
    <>
      <div id="holidays-animation"></div>
      <Layout {...props} />
    </>
  );
}
