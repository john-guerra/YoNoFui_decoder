import React from 'react';
import { TRAITS } from '../../data/traits';

const ClueReveal = ({ trait, hasIt, onClose }) => {
  const traitInfo = TRAITS[trait];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div
        className="rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
        style={{ backgroundColor: '#FFF8F0' }}
      >
        <div className="text-6xl mb-4">{traitInfo.icon}</div>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#5D4E37' }}>
          {traitInfo.name}
        </h3>
        <div
          className={`text-4xl font-bold py-4 rounded-xl mb-6 ${
            hasIt ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {hasIt ? '✓ SÍ' : '✗ NO'}
        </div>
        <p className="text-sm mb-6" style={{ color: '#7D6E5D' }}>
          {hasIt
            ? 'El culpable TIENE esta característica'
            : 'El culpable NO tiene esta característica'}
        </p>
        <button
          onClick={onClose}
          className="px-8 py-3 rounded-full font-bold text-white transition-colors"
          style={{ backgroundColor: '#C4956A' }}
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default ClueReveal;
