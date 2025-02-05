import { useState } from "react";
import { Spell } from "./Dialog";

interface SpellFormProps {
  onSubmit: (spell: Spell) => void;
}

export function SpellForm({ onSubmit }: SpellFormProps) {
  const [spell, setSpell] = useState<Spell>({
    name: "",
    level: "",
    castingTime: "",
    range: "",
    components: "",
    duration: "",
    description: [""],
    higherLevels: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(spell);
    // Reset form
    setSpell({
      name: "",
      level: "",
      castingTime: "",
      range: "",
      components: "",
      duration: "",
      description: [""],
      higherLevels: "",
    });
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescription = [...spell.description];
    newDescription[index] = value;
    setSpell({ ...spell, description: newDescription });
  };

  const addDescriptionParagraph = () => {
    setSpell({ ...spell, description: [...spell.description, ""] });
  };

  const removeDescriptionParagraph = (index: number) => {
    const newDescription = spell.description.filter((_, i) => i !== index);
    setSpell({ ...spell, description: newDescription });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            required
            value={spell.name}
            onChange={(e) => setSpell({ ...spell, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Level</label>
          <input
            type="text"
            required
            value={spell.level}
            onChange={(e) => setSpell({ ...spell, level: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Casting Time</label>
          <input
            type="text"
            required
            value={spell.castingTime}
            onChange={(e) =>
              setSpell({ ...spell, castingTime: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Range</label>
          <input
            type="text"
            required
            value={spell.range}
            onChange={(e) => setSpell({ ...spell, range: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Components</label>
          <input
            type="text"
            required
            value={spell.components}
            onChange={(e) => setSpell({ ...spell, components: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Duration</label>
          <input
            type="text"
            required
            value={spell.duration}
            onChange={(e) => setSpell({ ...spell, duration: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        {spell.description.map((paragraph, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <textarea
              required
              value={paragraph}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
            />
            {spell.description.length > 1 && (
              <button
                type="button"
                onClick={() => removeDescriptionParagraph(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addDescriptionParagraph}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Paragraph
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Higher Level Effects
        </label>
        <input
          type="text"
          value={spell.higherLevels || ""}
          onChange={(e) => setSpell({ ...spell, higherLevels: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Add Spell
      </button>
    </form>
  );
}
