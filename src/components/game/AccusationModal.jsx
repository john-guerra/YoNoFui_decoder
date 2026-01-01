import React from 'react';
import { SUSPECTS } from '../../data/suspects';

const IMAGE_BASE_URL = `${import.meta.env.BASE_URL}imgs/`;

const AccusationModal = ({ onAccuse, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div
        className="rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ backgroundColor: '#FFF8F0' }}
      >
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#5D4E37' }}>
          ¿Quién fue el culpable?
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-6">
          {Object.entries(SUSPECTS).map(([key, suspect]) => (
            <button
              key={key}
              onClick={() => onAccuse(key)}
              className="flex flex-col items-center p-3 rounded-xl hover:bg-amber-100 transition-all hover:scale-105"
            >
              <img
                src={`${IMAGE_BASE_URL}${suspect.image}`}
                alt={suspect.name}
                className="w-24 h-24 rounded-xl object-cover mb-2 shadow-md"
              />
              <span className="text-sm font-bold" style={{ color: '#5D4E37' }}>
                {suspect.name}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full py-4 rounded-xl font-bold text-lg"
          style={{ backgroundColor: '#E8D5C4', color: '#5D4E37' }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AccusationModal;
