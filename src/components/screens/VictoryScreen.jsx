import React from 'react';
import { SUSPECTS } from '../../data/suspects';

const IMAGE_BASE_URL = `${import.meta.env.BASE_URL}imgs/`;

const VictoryScreen = ({ culprit, onPlayAgain, onGoToMenu }) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: '#E8D5C4' }}
    >
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: '#5D4E37' }}>
        ¡Correcto!
      </h1>
      <img
        src={`${IMAGE_BASE_URL}${SUSPECTS[culprit].image}`}
        alt={SUSPECTS[culprit].name}
        className="w-40 h-40 rounded-xl mb-4 shadow-lg object-cover"
      />
      <p className="text-xl mb-2" style={{ color: '#7D6E5D' }}>
        ¡Fue <strong>{SUSPECTS[culprit].name}</strong>!
      </p>
      <p className="text-lg mb-8" style={{ color: '#7D6E5D' }}>
        Nes estaría orgullosa 💕
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={onPlayAgain}
          className="px-8 py-4 rounded-full text-lg font-bold text-white shadow-lg"
          style={{ backgroundColor: '#C4956A' }}
        >
          Jugar de Nuevo
        </button>
        <button
          onClick={onGoToMenu}
          className="px-8 py-3 rounded-full text-sm font-medium"
          style={{ backgroundColor: '#E8D5C4', color: '#5D4E37', border: '2px solid #C4956A' }}
        >
          Volver al Menú
        </button>
      </div>
    </div>
  );
};

export default VictoryScreen;
