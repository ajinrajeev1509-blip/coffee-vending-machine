import { motion } from "motion/react";

interface Drink {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface MainScreenProps {
  onSelectDrink: (drink: Drink) => void;
  credit: number;
  errorMessage: string | null;
}

const drinks: Drink[] = [
  {
    id: "1",
    name: "Bohnenkaffee",
    price: "1.20€",
    image: "/pictures/Bohnenkaffee schwarz.jpg"
  },
  {
    id: "2",
    name: "Bohnenkaffee Weiß",
    price: "1.20€",
    image: "/pictures/Bohnenkaffee Weiß.jpg"
  },
  {
    id: "3",
    name: "Cappuccino",
    price: "1.20€",
    image: "/pictures/Cappuccino.jpg"
  },
  {
    id: "4",
    name: "Cappuccino mit Schaum",
    price: "1.20€",
    image: "/pictures/Cappuccino mit Schoko.jpg"
  },
  {
    id: "5",
    name: "Latte Macchiato",
    price: "1.20€",
    image: "/pictures/Latte Macchiato.jpg"
  },
  {
    id: "6",
    name: "Milchkaffee",
    price: "1.20€",
    image: "/pictures/Milchkaffee.jpg"
  },
  {
    id: "7",
    name: "Latte Vanille",
    price: "1.20€",
    image: "/pictures/Latte Vanille.jpg"
  },
  {
    id: "8",
    name: "Schokolade",
    price: "1.20€",
    image: "/pictures/Schokolade.jpg"
  },
  {
    id: "9",
    name: "Schokomilch",
    price: "1.20€",
    image: "/pictures/Schokomilch.jpg"
  },
  {
    id: "10",
    name: "Kinderpunsch Vanille",
    price: "1.20€",
    image: "/pictures/Kindermilch Vanille.jpg"
  },
];

export function MainScreen({ onSelectDrink, credit, errorMessage }: MainScreenProps) {
  const currentDate = new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="h-screen w-full bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center">
      <div className="aspect-[9/16] w-full max-w-sm bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
        {/* Simplified Header */}
        <div className="bg-stone-950 px-4 py-2 text-white text-center font-bold text-lg">
          KAFFEE AUTOMAT
        </div>

        {/* Status Bar */}
        <div className="bg-stone-950 px-4 py-1 flex justify-between items-center text-white text-sm">
          <div className="text-stone-300">
            <span>{currentDate}</span>
            <span className="ml-2">{currentTime}</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-green-400">{credit.toFixed(2)}€</span>
            <span className="ml-1 text-xs text-stone-400">KREDIT</span>
          </div>
        </div>

        {/* Product Grid - Main Focus with Glass Effect */}
        <div className="flex-1 bg-gradient-to-b from-stone-800 to-stone-900 p-4 relative">
          {/* Glass overlay */}
          <div className="absolute inset-4 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded pointer-events-none"></div>
          <div className="absolute inset-4 bg-gradient-to-t from-transparent via-white/2 to-transparent rounded pointer-events-none"></div>

          <div className="h-full grid grid-cols-3 gap-0 border border-stone-700 relative z-10">
            {drinks.map((drink, index) => (
              <motion.button
                key={drink.id}
                onClick={() => onSelectDrink(drink)}
                className="bg-transparent hover:bg-stone-700/20 transition-colors duration-200 flex flex-col items-center justify-center p-4 border-r border-b border-stone-700 last:border-r-0"
                whileHover={{ backgroundColor: 'rgba(41, 37, 36, 0.2)' }}
                whileTap={{ backgroundColor: 'rgba(41, 37, 36, 0.3)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                {/* Price */}
                <div className="text-white font-bold text-base mb-2">
                  {drink.price}
                </div>

                {/* Product Image with Glow */}
                <div className="relative mb-2">
                  <div className="absolute inset-0 bg-stone-200 rounded-full opacity-20 blur-sm"></div>
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="relative w-16 h-16 object-cover rounded-full"
                  />
                </div>

                {/* Product Name */}
                <div className="text-white text-sm text-center leading-tight font-medium max-w-full">
                  {drink.name}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-600 px-4 py-2 text-center">
            <div className="text-white text-sm font-bold">{errorMessage}</div>
          </div>
        )}

        {/* Cash Only Notice */}
        <div className="bg-stone-950 px-4 py-1 text-center">
          <div className="text-stone-400 text-xs font-medium">NUR BARZAHLUNG</div>
        </div>

        {/* Coin Slot */}
        <div className="bg-stone-950 px-4 py-3 text-center">
          <div className="text-white text-sm font-bold">MÜNZEN EINWERFEN</div>
        </div>

        {/* Advertisement */}
        <div className="bg-white px-4 py-2">
          <img
            src="/pictures/katjes advertisement.jpeg"
            alt="Katjes Advertisement"
            className="w-full h-16 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
