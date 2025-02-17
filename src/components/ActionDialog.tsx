import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { ActionForm } from "./ActionForm";

export interface Action {
  name: string;
  type: "Action" | "Bonus Action" | "Reaction";
  source: string; // e.g., "Rogue (Level 2)", "Cunning Action", etc.
  description: string[];
  requirements?: string;
  trigger?: string; // Specifically for reactions
}

interface ActionDialogProps {
  action: Action;
  onUpdate: (updatedAction: Action) => void;
}

function ActionDialog({ action, onUpdate }: ActionDialogProps) {
  let [isOpen, setIsOpen] = useState(false);
  let [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedAction: Action) => {
    onUpdate(updatedAction);
    setIsEditing(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-600 hover:underline"
      >
        {action.name}
      </button>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setIsEditing(false);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
            {isEditing ? (
              <ActionForm
                action={action}
                isOpen={true}
                onSubmit={handleUpdate}
                onClose={() => setIsEditing(false)}
              />
            ) : (
              <DialogPanel className="w-full max-w-2xl space-y-3 sm:space-y-4 bg-white p-4 sm:p-6 md:p-8 rounded-lg mx-2 shadow-xl">
                <DialogTitle className="text-xl sm:text-2xl font-bold">
                  {action.name}
                </DialogTitle>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-sm">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="font-semibold">Type:</span> {action.type}
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="font-semibold">Source:</span>{" "}
                    {action.source}
                  </div>
                  {action.requirements && (
                    <div className="sm:col-span-2 flex flex-wrap items-center gap-1">
                      <span className="font-semibold">Requirements:</span>
                      {action.requirements}
                    </div>
                  )}
                  {action.trigger && (
                    <div className="sm:col-span-2 flex flex-wrap items-center gap-1">
                      <span className="font-semibold">Trigger:</span>
                      {action.trigger}
                    </div>
                  )}
                </div>

                <Description className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                  {action.description.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </Description>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-500 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ActionDialog;
