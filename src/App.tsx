import { useState, useEffect } from "react";
import "./App.css";
import MapToday from "./assets/map.json";

const App = () => {
  const currentMap = MapToday.map.toUpperCase();
  const [timeUntilReset, setTimeUntilReset] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateMapAndTime = () => {
      const now = new Date();
      setCurrentTime(now);

      // Calculate time until next reset (17:00 UTC)
      const nextReset = new Date();
      nextReset.setUTCHours(17, 0, 0, 0);
      if (now.getUTCHours() >= 17) {
        nextReset.setUTCDate(nextReset.getUTCDate() + 1);
      }

      const timeDiff = nextReset.getTime() - now.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeUntilReset(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );
    };

    updateMapAndTime();
    const interval = setInterval(updateMapAndTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const isMesa = currentMap === "MESA";

  // Generate particles
  const particles = [];
  const particleCount = isMesa ? 15 : 25;

  for (let i = 0; i < particleCount; i++) {
    const particleStyle = {
      left: `${Math.random() * 100}%`,
      top: isMesa ? `${20 + Math.random() * 60}%` : `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${2 + Math.random() * 2}s`,
    };

    particles.push(
      <div
        key={i}
        className={`particle ${isMesa ? "desert-particle" : "snow-particle"}`}
        style={particleStyle}
      ></div>,
    );
  }

  return (
    <div className={`container ${isMesa ? "mesa-theme" : "alpine-theme"}`}>
      Under maintainance due to the roots update. See you soon!
    </div>
  );
};

export default App;
