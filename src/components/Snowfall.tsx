import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      size: 2 + Math.random() * 4,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-0 text-white opacity-80 animate-snowfall"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            fontSize: `${flake.size}px`,
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  );
};

export default Snowfall;
