import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { SessionNote } from "./SessionNotes";

interface SessionNoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (note: SessionNote) => void;
  note?: SessionNote;
}

export function SessionNoteForm({
  isOpen,
  onClose,
  onSubmit,
  note,
}: SessionNoteFormProps) {
  const [formData, setFormData] = useState<SessionNote>(
    note || {
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!note) {
      setFormData({
        title: "",
        content: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
          <DialogPanel className="w-full max-w-2xl bg-white p-4 sm:p-6 md:p-8 rounded-lg mx-2 shadow-xl">
            <DialogTitle className="text-xl sm:text-2xl font-bold mb-4">
              Add Session Note
            </DialogTitle>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Content
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  rows={6}
                />
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
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                >
                  Add Note
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
