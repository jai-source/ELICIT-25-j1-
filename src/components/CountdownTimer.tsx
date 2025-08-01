import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date (example: 30 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-black bg-opacity-70 border border-cyan-400 p-4 font-mono mobile-timer"
      style={{
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        boxShadow: '0 0 20px rgba(0, 255, 65, 0.4), 0 0 40px rgba(255, 0, 64, 0.2)',
      }}
    >
      <div className="text-lime-400 text-xs mb-2 text-center matrix-glow">SYSTEM BREACH IN:</div>
      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { value: timeLeft.days, label: 'DAYS' },
          { value: timeLeft.hours, label: 'HRS' },
          { value: timeLeft.minutes, label: 'MIN' },
          { value: timeLeft.seconds, label: 'SEC' },
        ].map((item, index) => (
          <div key={index} className="flex flex-col">
            <motion.div 
              className="text-red-400 text-lg font-bold"
              animate={{
                scale: [1, 1.1, 1],
                textShadow: [
                  '0 0 5px #ff0040',
                  '0 0 15px #ff0040, 0 0 25px #ff0040',
                  '0 0 5px #ff0040'
                ]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2
              }}
            >
              {formatNumber(item.value)}
            </motion.div>
            <div className="text-lime-400 text-xs">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CountdownTimer;