"use client";

import ReactConfetti from "react-confetti";

import { useConfettiStore } from "@/lib/hooks";

/**
 * ConfettiProvider component that provides confetti when isOpen is true.
 *
 * @return {JSX.Element} The confetti component
 */
export const ConfettiProvider = (): JSX.Element | null => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) return null;

  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  )
}