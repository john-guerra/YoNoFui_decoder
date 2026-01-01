import React from 'react';
import { SUSPECTS } from '../../data/suspects';

const IMAGE_BASE_URL = `${import.meta.env.BASE_URL}imgs/`;

const IntroScreen = ({ currentDano, introStep, onAdvance }) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: '#E8D5C4' }}
      onClick={onAdvance}
    >
      {introStep === 0 && (
        <>
          <img
            src={`${IMAGE_BASE_URL}Nes.png`}
            alt="Nes"
            className="w-40 h-40 rounded-full mb-6 shadow-lg object-cover"
            style={{ border: '4px solid #C4956A' }}
          />
          <div
            className="rounded-2xl p-6 max-w-md text-center shadow-xl mb-6"
            style={{ backgroundColor: '#FFF8F0' }}
          >
            <p className="text-2xl font-bold" style={{ color: '#5D4E37' }}>
              "¿Quién me {currentDano.verbo} {currentDano.objeto} de {currentDano.lugar}?"
            </p>
          </div>
          <p className="text-sm animate-pulse" style={{ color: '#7D6E5D' }}>
            Toca para continuar...
          </p>
        </>
      )}

      {introStep === 1 && (
        <>
          <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-md">
            {Object.values(SUSPECTS).slice(0, 8).map((suspect, i) => (
              <img
                key={i}
                src={`${IMAGE_BASE_URL}${suspect.image}`}
                alt={suspect.name}
                className="w-16 h-16 rounded-full object-cover shadow-md"
                style={{ border: '3px solid #C4956A' }}
              />
            ))}
          </div>
          <div
            className="rounded-2xl p-6 max-w-md text-center shadow-xl mb-6"
            style={{ backgroundColor: '#D64545' }}
          >
            <p className="text-3xl font-bold text-white">
              "¡¡YO NO FUI!!"
            </p>
          </div>
          <p className="text-sm animate-pulse" style={{ color: '#7D6E5D' }}>
            Toca para continuar...
          </p>
        </>
      )}

      {introStep === 2 && (
        <>
          <img
            src={`${IMAGE_BASE_URL}Nes.png`}
            alt="Nes"
            className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover"
            style={{ border: '4px solid #C4956A' }}
          />
          <div
            className="rounded-2xl p-6 max-w-md text-center shadow-xl mb-4"
            style={{ backgroundColor: '#FFF8F0' }}
          >
            <p className="text-xl font-bold" style={{ color: '#5D4E37' }}>
              "¿Entonces fue el Padre Mejía?"
            </p>
          </div>
          <img
            src={`${IMAGE_BASE_URL}Padre_Mejia.png`}
            alt="Padre Mejía"
            className="w-28 h-28 rounded-full mb-6 shadow-lg object-cover"
            style={{ border: '4px solid #5D4E37' }}
          />
          <p className="text-lg font-bold mb-2" style={{ color: '#5D4E37' }}>
            ¡Descubre quién fue antes de que escape!
          </p>
          <p className="text-sm animate-pulse" style={{ color: '#7D6E5D' }}>
            Toca para comenzar...
          </p>
        </>
      )}
    </div>
  );
};

export default IntroScreen;
