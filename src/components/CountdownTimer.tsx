import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 816);
    
    const difference = endDate.getTime() - new Date().getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-black/50 backdrop-blur-sm border-2 border-yellow-400 rounded-lg px-4 py-3 min-w-[80px]">
        <span className="text-3xl md:text-4xl font-bold text-yellow-400 font-montserrat">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-sm md:text-base text-white/70 mt-2 font-open-sans">
        {label}
      </span>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-red-600/20 via-orange-600/20 to-red-600/20 backdrop-blur-md border-2 border-red-500/50 rounded-2xl p-6 md:p-8 animate-fade-in">
      <div className="text-center mb-4">
        <p className="text-xl md:text-2xl font-bold text-white font-montserrat mb-1">
          ⏰ Акция заканчивается через:
        </p>
        <p className="text-sm md:text-base text-white/80 font-open-sans">
          Успей заказать со скидкой 50%!
        </p>
      </div>
      <div className="flex justify-center gap-3 md:gap-6">
        <TimeUnit value={timeLeft.days} label="дней" />
        <div className="text-4xl text-yellow-400 font-bold self-start mt-2">:</div>
        <TimeUnit value={timeLeft.hours} label="часов" />
        <div className="text-4xl text-yellow-400 font-bold self-start mt-2">:</div>
        <TimeUnit value={timeLeft.minutes} label="минут" />
        <div className="text-4xl text-yellow-400 font-bold self-start mt-2">:</div>
        <TimeUnit value={timeLeft.seconds} label="секунд" />
      </div>
    </div>
  );
};

export default CountdownTimer;
