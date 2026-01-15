import { useState } from "react";
import { MainScreen } from "./components/MainScreen";
import { ConfirmationScreen } from "./components/ConfirmationScreen";
import { BrewingScreen } from "./components/BrewingScreen";

interface Drink {
  id: string;
  name: string;
  price: string;
  image: string;
}

type MachineState = "idle" | "confirming" | "brewing" | "finished";

export default function App() {
  const [machineState, setMachineState] = useState<MachineState>("idle");
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [credit, setCredit] = useState(1.20);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAddMoneyWarning, setShowAddMoneyWarning] = useState(false);

  const handleSelectDrink = (drink: Drink) => {
    if (credit < 1.20) {
      // Show error message if insufficient credit
      setShowAddMoneyWarning(true);
      return;
    }
    setSelectedDrink(drink);
    setMachineState("confirming");
  };

  const handleConfirm = () => {
    setMachineState("brewing");
  };

  const handleCancel = () => {
    setSelectedDrink(null);
    setMachineState("idle");
  };

  const handleBrewingComplete = () => {
    setCredit(0.00); // Reset credit after purchase
    setMachineState("finished");
    // Keep selectedDrink for finished state display
    setTimeout(() => {
      setSelectedDrink(null);
      setMachineState("idle");
    }, 10000); // Show finished state for 10 seconds
  };

  return (
    <div className="w-[1080px] h-[1920px] mx-auto bg-slate-900 overflow-hidden">
      {machineState === "idle" && (
        <MainScreen onSelectDrink={handleSelectDrink} credit={credit} errorMessage={errorMessage} />
      )}

      {machineState === "confirming" && selectedDrink && (
        <ConfirmationScreen
          drink={selectedDrink}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {machineState === "brewing" && selectedDrink && (
        <BrewingScreen
          drink={selectedDrink}
          onComplete={handleBrewingComplete}
        />
      )}

      {machineState === "finished" && selectedDrink && (
        <div className="h-screen w-full bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center">
          <div className="aspect-[9/16] w-full max-w-sm bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/2 to-transparent pointer-events-none"></div>
            <div className="h-full flex flex-col items-center justify-center relative z-10">
              <div className="bg-stone-950 px-4 py-3 text-white text-center font-bold text-lg mb-4">
                KAFFEE AUTOMAT
              </div>
              <div className="text-center">
                <div className="text-white text-xl font-bold mb-4">Fertig!</div>
                <div className="text-stone-300 text-sm mb-6">Ihr Getränk ist bereit</div>
                <div className="text-white text-sm font-medium">{selectedDrink.name}</div>
                <div className="text-stone-300 text-xs">{selectedDrink.price}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Money Warning Modal */}
      {showAddMoneyWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-stone-800 border border-stone-600 rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <div className="text-white text-lg font-bold mb-2">Bitte Geld einwerfen</div>
              <button
                onClick={() => setShowAddMoneyWarning(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
