"use client"

import React, { useEffect, useState } from 'react'

type TimeLeft = {
    hours: number;
    minutes: number;
    seconds: number;
}

const CountDown = () => {

    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const calculateTimeLeft = (): TimeLeft => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
    
        const diff = midnight.getTime() - now.getTime();
    
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
    
        return {
          hours,
          minutes,
          seconds,
        };
    };

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

  return (
    <div className='flex items-center justify-center space-x-4 text-gray-800'>
        {(["hours", "minutes", "seconds"] as const).map((unit) => (
            <div key={unit} className={`flex flex-col items-center px-6 py-1 rounded-full w-32 ${
                unit === "seconds"
                  ? "border border-red-500 text-red-500"
                  : "bg-gray-100"
              }`}>

                <div className='flex items-center gap-2'>
                    <span className='text-2xl font-bold'>
                        {timeLeft[unit].toString().padStart(2, "0")}
                    </span>
                    <span className='text-sm'>
                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </span>
                </div>
            </div>
        ))}
    </div>
  )
}

export default CountDown