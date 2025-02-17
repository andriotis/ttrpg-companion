import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { Action } from "./ActionDialog";

interface ActionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (action: Action) => void;
  action?: Action;
}

export function ActionForm({
  isOpen,
  onClose,
  onSubmit,
  action,
}: ActionFormProps) {
  const [formData, setFormData] = useState<Action>(
    action || {
      name: "",
      type: "Action",
      source: "",
      description: [""],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!action) {
      setFormData({
        name: "",
        type: "Action",
        source: "",
        description: [""],
      });
    }
    onClose();
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescription = [...formData.description];
    newDescription[index] = value;
    setFormData({ ...formData, description: newDescription });
  };

  const addDescriptionParagraph = () => {
    setFormData({ ...formData, description: [...formData.description, ""] });
  };

  const removeDescriptionParagraph = (index: number) => {
    const newDescription = formData.description.filter((_, i) => i !== index);
    setFormData({ ...formData, description: newDescription });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
          <DialogPanel className="w-full max-w-2xl bg-white p-4 sm:p-6 md:p-8 rounded-lg mx-2 shadow-xl">
            <DialogTitle className="text-xl sm:text-2xl font-bold mb-4">
              Add New Action
            </DialogTitle>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as Action["type"],
                      })
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="Action">Action</option>
                    <option value="Bonus Action">Bonus Action</option>
                    <option value="Reaction">Reaction</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Source
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.source}
                    onChange={(e) =>
                      setFormData({ ...formData, source: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    placeholder="e.g., Rogue (Level 2)"
                  />
                </div>
                {formData.type === "Reaction" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Trigger
                    </label>
                    <input
                      type="text"
                      value={formData.trigger || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, trigger: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="What triggers this reaction?"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Requirements
                </label>
                <input
                  type="text"
                  value={formData.requirements || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Any special requirements?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                {formData.description.map((paragraph, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <textarea
                      required
                      value={paragraph}
                      onChange={(e) =>
                        handleDescriptionChange(index, e.target.value)
                      }
                      className="w-full p-2 border rounded"
                      rows={3}
                    />
                    {formData.description.length > 1 && (
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

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-500 transition-colors"
                >
                  Add Action
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
