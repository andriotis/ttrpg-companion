import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { SessionNoteForm } from "./SessionNoteForm";
import { SessionNote } from "./SessionNotes";

interface SessionNoteDialogProps {
  note: SessionNote;
  onUpdate: (updatedNote: SessionNote) => void;
}

function SessionNoteDialog({ note, onUpdate }: SessionNoteDialogProps) {
  let [isOpen, setIsOpen] = useState(false);
  let [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedNote: SessionNote) => {
    onUpdate(updatedNote);
    setIsEditing(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-600 hover:underline"
      >
        {note.title}
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
              <SessionNoteForm
                note={note}
                isOpen={true}
                onSubmit={handleUpdate}
                onClose={() => setIsEditing(false)}
              />
            ) : (
              <DialogPanel className="w-full max-w-2xl space-y-3 sm:space-y-4 bg-white p-4 sm:p-6 md:p-8 rounded-lg mx-2 shadow-xl">
                <DialogTitle className="text-xl sm:text-2xl font-bold">
                  {note.title}
                </DialogTitle>

                <div className="text-sm text-gray-500">
                  {new Date(note.date).toLocaleDateString()}
                </div>

                <Description className="space-y-3 sm:space-y-4 text-sm sm:text-base whitespace-pre-wrap">
                  {note.content}
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

export default SessionNoteDialog;
