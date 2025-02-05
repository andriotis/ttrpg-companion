import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

export interface Spell {
  name: string;
  level: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string[];
  higherLevels?: string;
}

interface SpellDialogProps {
  spell: Spell;
}

function SpellDialog({ spell }: SpellDialogProps) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-600 hover:underline"
      >
        {spell.name}
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
            <DialogPanel className="w-full max-w-2xl space-y-3 sm:space-y-4 bg-white p-4 sm:p-6 md:p-8 rounded-lg mx-2 shadow-xl">
              <DialogTitle className="text-xl sm:text-2xl font-bold">
                {spell.name}
              </DialogTitle>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-sm">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-semibold">Level:</span> {spell.level}
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-semibold">Casting Time:</span>
                  {spell.castingTime}
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-semibold">Range:</span> {spell.range}
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-semibold">Components:</span>
                  {spell.components}
                </div>
                <div className="sm:col-span-2 flex flex-wrap items-center gap-1">
                  <span className="font-semibold">Duration:</span>
                  {spell.duration}
                </div>
              </div>

              <Description className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                {spell.description.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {spell.higherLevels && (
                  <p className="font-semibold text-sm sm:text-base">
                    Using a Higher-Level Spell Slot: {spell.higherLevels}
                  </p>
                )}
              </Description>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default SpellDialog;
