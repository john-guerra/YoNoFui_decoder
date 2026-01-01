// Dice faces: 3 eyes (👁️) and 3 paws (🐾 with 1, 1, or 2 paws)
export const DICE_FACES = [
  { type: 'eye', paws: 0, icon: '👁️' },
  { type: 'eye', paws: 0, icon: '👁️' },
  { type: 'eye', paws: 0, icon: '👁️' },
  { type: 'paw', paws: 1, icon: '🐾' },
  { type: 'paw', paws: 1, icon: '🐾' },
  { type: 'paw', paws: 2, icon: '🐾🐾' },
];

// Roll a single die
export const rollDie = () => DICE_FACES[Math.floor(Math.random() * DICE_FACES.length)];
