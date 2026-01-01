import React from 'react';

const IMAGE_BASE_URL = `${import.meta.env.BASE_URL}imgs/`;

const MenuScreen = ({ onStartGame }) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: '#E8D5C4' }}
    >
      <img
        src={`${IMAGE_BASE_URL}Nes.png`}
        alt="Nes"
        className="w-28 h-28 rounded-full mb-4 shadow-lg object-cover"
        style={{ border: '4px solid #C4956A' }}
      />
      <h1
        className="text-4xl font-bold mb-2 text-center"
        style={{ color: '#5D4E37' }}
      >
        ¡Yo No Fui!
      </h1>
      <p className="text-lg mb-4" style={{ color: '#7D6E5D' }}>
        Decodificador de Pistas
      </p>

      {/* Story description */}
      <div
        className="max-w-md text-center mb-6 p-4 rounded-xl"
        style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
      >
        <p className="text-sm mb-2" style={{ color: '#5D4E37' }}>
          Algo pasó en la casa de <strong>Nes</strong>: se rompió la porcelana,
          se perdieron las llaves, alguien se comió el postre...
        </p>
        <p className="text-sm mb-2" style={{ color: '#5D4E37' }}>
          Todos dicen <span className="font-bold" style={{ color: '#C4956A' }}>"¡Yo no fui!"</span>
        </p>
        <p className="text-sm" style={{ color: '#5D4E37' }}>
          Cuando nadie confesaba, Nes siempre culpaba al misterioso <strong>Padre Mejía</strong>...
          ¡Descubre quién fue antes de que escape!
        </p>
      </div>

      <button
        onClick={onStartGame}
        className="px-8 py-4 rounded-full text-xl font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 mb-6"
        style={{ backgroundColor: '#C4956A' }}
      >
        🔍 Nueva Partida
      </button>

      {/* Links to other pages */}
      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href="instrucciones.html"
          className="px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all"
          style={{ backgroundColor: '#2A7B7B', color: 'white' }}
        >
          📋 Instrucciones
        </a>
        <a
          href="dados.html"
          className="px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all"
          style={{ backgroundColor: '#E67E22', color: 'white' }}
        >
          🎲 Crea tus Dados
        </a>
      </div>
    </div>
  );
};

export default MenuScreen;
