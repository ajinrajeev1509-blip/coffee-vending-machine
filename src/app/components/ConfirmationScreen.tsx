import { motion } from "motion/react";
import { Check, X } from "lucide-react";

interface Drink {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface ConfirmationScreenProps {
  drink: Drink;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationScreen({
  drink,
  onConfirm,
  onCancel,
}: ConfirmationScreenProps) {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center">
      <div className="aspect-[9/16] w-full max-w-sm bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 relative">
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/2 to-transparent pointer-events-none"></div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="h-full flex flex-col relative z-10"
        >
          {/* Header */}
          <div className="bg-stone-950 px-4 py-3 text-white text-center font-bold text-lg">
            KAFFEE AUTOMAT
          </div>

          {/* Selected Drink Display */}
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              Ihre Auswahl
            </h2>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-transparent border border-stone-700 rounded-lg overflow-hidden mb-4 w-full max-w-xs"
            >
              {/* Product Image - Reduced size to match main screen */}
              <div className="h-32 overflow-hidden flex items-center justify-center bg-stone-800">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-20 h-20 object-cover rounded-full"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 bg-stone-900 text-center">
                <h3 className="text-lg font-bold text-white mb-2">
                  {drink.name}
                </h3>
                <div className="text-white font-bold text-base">
                  {drink.price}
                </div>
              </div>
            </motion.div>

            <p className="text-sm text-stone-300 text-center mb-6">
              Bitte bestätigen Sie Ihre Auswahl
            </p>
          </div>

          {/* Action Buttons */}
          <div className="bg-stone-950 px-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onCancel}
                className="bg-gradient-to-b from-red-800 to-red-900 text-white rounded-xl py-4 px-6 text-lg font-bold flex items-center justify-center gap-3 border border-red-700 shadow-lg active:from-red-900 active:to-red-950 transition-colors duration-75"
                style={{
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                <span className="text-xl">❌</span>
                Abbrechen
              </button>

              <button
                onClick={onConfirm}
                className="bg-gradient-to-b from-green-800 to-green-900 text-white rounded-xl py-4 px-6 text-lg font-bold flex items-center justify-center gap-3 border border-green-700 shadow-lg active:from-green-900 active:to-green-950 transition-colors duration-75"
                style={{
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                <span className="text-xl">✔️</span>
                Bestätigen
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
