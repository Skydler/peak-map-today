import { useState, useEffect } from "react";
import "./App.css";

// Known date with a specific map (MESA)
const epoch_date = new Date("2025-10-21T17:00:00.000Z");

const App = () => {
  const [currentMap, setCurrentMap] = useState("");
  const [timeUntilReset, setTimeUntilReset] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateMapAndTime = () => {
      const now = new Date();
      setCurrentTime(now);

      // Calculate days since epoch
      const daysSinceEpoch = Math.floor(
        (now.getTime() - epoch_date.getTime()) / (1000 * 60 * 60 * 24),
      );

      const isMesa = daysSinceEpoch % 2 === 0;
      setCurrentMap(isMesa ? "MESA" : "ALPINE");

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
      {/* Animated Background Elements */}
      <div className="background-elements">
        {isMesa && <div className="sun"></div>}
        {particles}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Title */}
        <div
          className={`title ${isMesa ? "mesa-text-shadow" : "alpine-text-shadow"}`}
        >
          PEAK
        </div>

        {/* Current Map Display */}
        <div className="map-card">
          <div className="map-title">Today's Map</div>
          <div
            className={`map-name ${isMesa ? "mesa-map-name" : "alpine-map-name"}`}
          >
            {currentMap}
          </div>

          {/* Biome Description */}
          <div className="description">
            {isMesa ? (
              <div>
                <div className="biome-info">
                  <span>🌵</span>
                  <span>Scorching desert heat awaits</span>
                  <span>☀️</span>
                </div>
                <div className="biome-details">
                  Stay in the shade • Find sunscreen • Avoid tumbleweeds
                </div>
              </div>
            ) : (
              <div>
                <div className="biome-info">
                  <span>❄️</span>
                  <span>Freezing alpine winds blow</span>
                  <span>🏔️</span>
                </div>
                <div className="biome-details">
                  Stay warm • Avoid blizzards • Find shelter
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="timer-card">
          <div className="timer-title">Map changes in</div>
          <div className="timer-display">{timeUntilReset}</div>
          <div className="timer-subtext">Daily reset at 17:00 UTC</div>
        </div>

        {/* Current Time Display */}
        <div className="current-time">
          Current UTC: {currentTime.toUTCString()}
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="footer">
        <div>{isMesa ? "🦂 Watch for scorpions" : "🧊 Beware of ice"}</div>
        <div>Made for PEAK climbers</div>
        <div>{isMesa ? "🌪️ Avoid tornadoes" : "🌨️ Find warmth"}</div>
      </div>

      {/* Pulsing Border Effect */}
      <div
        className={`border ${isMesa ? "mesa-border" : "alpine-border"}`}
      ></div>
    </div>
  );
};

export default App;
