import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

interface Drink {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface BrewingScreenProps {
  drink: Drink;
  onComplete: () => void;
}

export function BrewingScreen({ drink, onComplete }: BrewingScreenProps) {
  const [phase, setPhase] = useState<'preparing' | 'filling' | 'complete'>('preparing');
  const [milkLevel, setMilkLevel] = useState(0);
  const [coffeeLevel, setCoffeeLevel] = useState(0);
  const [foamLevel, setFoamLevel] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Start filling after short pause
    const startTimer = setTimeout(() => {
      setPhase('filling');

      // Milk filling (slow, constant)
      const milkInterval = setInterval(() => {
        setMilkLevel(prev => {
          if (prev >= 60) {
            clearInterval(milkInterval);
            return 60;
          }
          return prev + 1.0; // Smooth, gradual fill
        });
      }, 60);

      // Coffee after milk starts (slight overlap for realism)
      setTimeout(() => {
        const coffeeInterval = setInterval(() => {
          setCoffeeLevel(prev => {
            if (prev >= 20) {
              clearInterval(coffeeInterval);
              return 20;
            }
            return prev + 0.6;
          });
        }, 60);
      }, 1200);

      // Foam last (uneven, soft edge)
      setTimeout(() => {
        const foamInterval = setInterval(() => {
          setFoamLevel(prev => {
            if (prev >= 8) {
              clearInterval(foamInterval);
              setPhase('complete');
              setTimeout(onComplete, 200); // Short pause before complete
              return 8;
            }
            return prev + 0.4;
          });
        }, 80);
      }, 2400);

    }, 200); // Initial pause

    return () => clearTimeout(startTimer);
  }, [onComplete]);

  return (
    <div className="h-screen w-full bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center">
      <div className="aspect-[9/16] w-full max-w-sm bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 relative">
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/2 to-transparent pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-full flex flex-col relative z-10"
        >
          {/* Header */}
          <div className="bg-stone-950 px-4 py-3 text-white text-center font-bold text-lg">
            KAFFEE AUTOMAT
          </div>

          {/* Status Message */}
          <div className="text-center py-2">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-sm font-medium"
            >
              {phase === 'preparing' && 'Vorbereitung...'}
              {phase === 'filling' && 'Wird zubereitet...'}
              {phase === 'complete' && 'Fertig!'}
            </motion.div>
          </div>

          {/* Dispensing Area */}
          <div className="flex-1 flex items-center justify-center px-4">
            <video
              ref={videoRef}
              src="/pictures/sample brewing vidoe.mp4"
              className="w-32 h-48 object-cover rounded-b-full border-4 border-stone-700"
              autoPlay
              muted
              loop
            />
          </div>

          {/* Drink Info */}
          <div className="bg-stone-950 px-4 py-3 text-center">
            <div className="text-white text-sm font-medium mb-1">{drink.name}</div>
            <div className="text-stone-300 text-xs">{drink.price}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
