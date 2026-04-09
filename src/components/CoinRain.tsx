import React from "react";

export const CoinRain = () => {
  const coins = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 16 + Math.random() * 20,
    opacity: 0.3 + Math.random() * 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute animate-coin-fall"
          style={{
            left: `${coin.left}%`,
            animationDelay: `${coin.delay}s`,
            animationDuration: `${coin.duration}s`,
            width: coin.size,
            height: coin.size,
            opacity: coin.opacity,
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-yellow-300 shadow-lg flex items-center justify-center">
            <span
              className="text-yellow-800 font-bold"
              style={{ fontSize: coin.size * 0.4 }}
            >
              $
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
