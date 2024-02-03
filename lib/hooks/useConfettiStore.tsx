import { useState, useEffect } from "react";

export const useConfettiStore = () => {
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    setConfetti(true);
  }, []);

  return confetti;
}