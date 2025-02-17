import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import SessionNoteDialog from "./SessionNoteDialog";
import { SessionNoteForm } from "./SessionNoteForm";

export interface SessionNote {
  title: string;
  content: string;
  date: string;
}

export function SessionNotes() {
  const [notes, setNotes] = useState<SessionNote[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedNotes = loadFromStorage<SessionNote[]>("NOTES");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleAddNote = (newNote: SessionNote) => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveToStorage("NOTES", updatedNotes);
  };

  const handleDeleteNote = (noteTitle: string) => {
    const updatedNotes = notes.filter((note) => note.title !== noteTitle);
    setNotes(updatedNotes);
    saveToStorage("NOTES", updatedNotes);
  };

  const handleUpdateNote = (updatedNote: SessionNote) => {
    const updatedNotes = notes.map((note) =>
      note.title === updatedNote.title ? updatedNote : note
    );
    setNotes(updatedNotes);
    saveToStorage("NOTES", updatedNotes);
  };

  return (
    <div className="mb-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            Session Notes
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Keep track of important events and information from your sessions.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => setShowForm(true)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Note
          </button>
        </div>
      </div>

      <SessionNoteForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleAddNote}
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div
            key={note.title}
            className="relative group overflow-hidden rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow"
          >
            <SessionNoteDialog note={note} onUpdate={handleUpdateNote} />
            <button
              onClick={() => handleDeleteNote(note.title)}
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
