import React from 'react';
import { SUSPECTS } from '../../data/suspects';

const IMAGE_BASE_URL = `${import.meta.env.BASE_URL}imgs/`;

const DefeatScreen = ({ culprit, onPlayAgain }) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: '#E8D5C4' }}
    >
      <div className="text-6xl mb-4">😢</div>
      <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: '#5D4E37' }}>
        ¡Incorrecto!
      </h1>
      <img
        src={`${IMAGE_BASE_URL}${SUSPECTS[culprit].image}`}
        alt={SUSPECTS[culprit].name}
        className="w-40 h-40 rounded-xl mb-4 shadow-lg object-cover"
      />
      <p className="text-xl mb-2" style={{ color: '#7D6E5D' }}>
        Era <strong>{SUSPECTS[culprit].name}</strong>
      </p>
      <p className="text-lg mb-8" style={{ color: '#7D6E5D' }}>
        El Padre Mejía escapó... 👻
      </p>
      <button
        onClick={onPlayAgain}
        className="px-8 py-4 rounded-full text-lg font-bold text-white shadow-lg"
        style={{ backgroundColor: '#C4956A' }}
      >
        Intentar de Nuevo
      </button>
    </div>
  );
};

export default DefeatScreen;
