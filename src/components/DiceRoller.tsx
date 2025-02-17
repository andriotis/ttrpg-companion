import { useState } from "react";

type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";

interface RollResult {
  values: number[];
  total: number;
  expression: string;
}

type DiceCount = Record<DiceType, number>;

export function DiceRoller() {
  const [rolls, setRolls] = useState<RollResult[]>([]);
  const [selectedDice, setSelectedDice] = useState<DiceCount>({
    d4: 0,
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
    d100: 0,
  });
  const [hasSelections, setHasSelections] = useState(false);
  const diceTypes: DiceType[] = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"];

  const handleDiceClick = (diceType: DiceType, event: React.MouseEvent) => {
    const increment = event.shiftKey ? 2 : 1;
    setSelectedDice((prev) => ({
      ...prev,
      [diceType]: prev[diceType] + increment,
    }));
    setHasSelections(true);
  };

  const rollSelectedDice = () => {
    const newRolls: RollResult[] = [];

    Object.entries(selectedDice).forEach(([diceType, count]) => {
      if (count > 0) {
        const diceNumber = parseInt(diceType.substring(1));
        const values = Array.from(
          { length: count },
          () => Math.floor(Math.random() * diceNumber) + 1
        );
        newRolls.push({
          values,
          total: values.reduce((sum, val) => sum + val, 0),
          expression: `${count}${diceType}`,
        });
      }
    });

    setRolls(newRolls);
  };

  const clearSelections = () => {
    setSelectedDice({
      d4: 0,
      d6: 0,
      d8: 0,
      d10: 0,
      d12: 0,
      d20: 0,
      d100: 0,
    });
    setRolls([]);
    setHasSelections(false);
  };

  const getCombinedExpression = () => {
    if (rolls.length === 0) return null;
    const allValues = rolls.flatMap((roll) => roll.values);
    const total = allValues.reduce((sum, val) => sum + val, 0);
    const expression = `${allValues.join("+")} = ${total}`;
    return expression;
  };

  return (
    <>
      {/* Dice Roller Widget */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-2 gap-2">
            {diceTypes.map((diceType) => (
              <button
                key={diceType}
                onClick={(e) => handleDiceClick(diceType, e)}
                className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors text-sm relative"
                title="Click for 1 die, Shift+Click for 2 dice"
              >
                {diceType}
                {selectedDice[diceType] > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {selectedDice[diceType]}
                  </span>
                )}
              </button>
            ))}
          </div>
          {hasSelections && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                onClick={rollSelectedDice}
                className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition-colors text-sm"
              >
                Roll
              </button>
              <button
                onClick={clearSelections}
                className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-300 transition-colors text-sm"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Result Display */}
      {rolls.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-lg font-mono">{getCombinedExpression()}</div>
          </div>
        </div>
      )}
    </>
  );
}
