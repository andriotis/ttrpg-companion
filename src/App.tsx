import { useState } from "react";
import SpellDialog from "./components/Dialog";
import { SpellForm } from "./components/SpellForm";
import type { Spell } from "./components/Dialog";
import { DiceRoller } from "./components/DiceRoller";

const animalMessenger: Spell = {
  name: "Animal Messenger",
  level: "2 Enchantment",
  castingTime: "Action or Ritual",
  range: "30 feet",
  components: "V, S, M (a morsel of food)",
  duration: "24 hours",
  description: [
    'A Tiny Beast of your choice that you can see within range must succeed on a Charisma saving throw, or it attempts to deliver a message for you (if the target\'s Challenge Rating isn\'t 0, it automatically succeeds). You specify a location you have visited and a recipient who matches a general description, such as "a person dressed in the uniform of the town guard" or "a red-haired dwarf wearing a pointed hat." You also communicate a message of up to twenty-five words. The Beast travels for the duration toward the specified location, covering about 25 miles per 24 hours or 50 miles if the Beast can fly.',
    "When the Beast arrives, it delivers your message to the creature that you described, mimicking your communication. If the Beast doesn't reach its destination before the spell ends, the message is lost, and the Beast returns to where you cast the spell.",
  ],
  higherLevels:
    "The spell's duration increases by 48 hours for each spell slot level above 2.",
};

function App() {
  const [spells, setSpells] = useState<Spell[]>([animalMessenger]);
  const [showForm, setShowForm] = useState(false);

  const handleAddSpell = (newSpell: Spell) => {
    setSpells([...spells, newSpell]);
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Spell Book</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {showForm ? "Close Form" : "Add New Spell"}
          </button>
        </div>

        {showForm && <SpellForm onSubmit={handleAddSpell} />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {spells.map((spell) => (
          <div
            key={spell.name}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <SpellDialog spell={spell} />
          </div>
        ))}
      </div>
      <DiceRoller />
    </div>
  );
}

export default App;
