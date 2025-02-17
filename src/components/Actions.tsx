import { useState, useEffect } from "react";
import ActionDialog, { Action } from "./ActionDialog";
import { ActionForm } from "./ActionForm";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { TrashIcon } from "@heroicons/react/24/outline";

export function Actions() {
  const [actions, setActions] = useState<Action[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedActions = loadFromStorage<Action[]>("ACTIONS");
    if (savedActions) {
      setActions(savedActions);
    }
  }, []);

  const handleAddAction = (newAction: Action) => {
    const updatedActions = [...actions, newAction];
    setActions(updatedActions);
    saveToStorage("ACTIONS", updatedActions);
  };

  const handleDeleteAction = (actionName: string) => {
    const updatedActions = actions.filter(
      (action) => action.name !== actionName
    );
    setActions(updatedActions);
    saveToStorage("ACTIONS", updatedActions);
  };

  const handleUpdateAction = (updatedAction: Action) => {
    const updatedActions = actions.map((action) =>
      action.name === updatedAction.name ? updatedAction : action
    );
    setActions(updatedActions);
    saveToStorage("ACTIONS", updatedActions);
  };

  return (
    <div className="mb-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            Actions & Abilities
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your character's actions, bonus actions, and
            reactions.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => setShowForm(true)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Action
          </button>
        </div>
      </div>

      <ActionForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleAddAction}
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <div
            key={action.name}
            className="relative group overflow-hidden rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow"
          >
            <ActionDialog action={action} onUpdate={handleUpdateAction} />
            <button
              onClick={() => handleDeleteAction(action.name)}
              className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
