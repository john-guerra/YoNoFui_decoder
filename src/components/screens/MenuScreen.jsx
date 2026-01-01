import React from 'react';
import { SUSPECTS } from '../../data/suspects';
import '../../styles/animations.css';

const IMAGE_BASE_URL = `${import.meta.env.BASE_URL}imgs/`;

// Floating suspect positions and animations
const FLOATING_SUSPECTS = [
  { key: 'vicente', top: '8%', left: '5%', animation: 'float1 4s ease-in-out infinite', delay: '0s', size: 60 },
  { key: 'jambita', top: '15%', right: '8%', animation: 'float2 5s ease-in-out infinite', delay: '0.5s', size: 55 },
  { key: 'santi', top: '45%', left: '3%', animation: 'float3 4.5s ease-in-out infinite', delay: '1s', size: 50 },
  { key: 'eli', top: '40%', right: '5%', animation: 'float4 5.5s ease-in-out infinite', delay: '0.3s', size: 55 },
  { key: 'goyo', bottom: '20%', left: '6%', animation: 'float2 4.8s ease-in-out infinite', delay: '0.7s', size: 50 },
  { key: 'magda', bottom: '25%', right: '4%', animation: 'float1 5.2s ease-in-out infinite', delay: '1.2s', size: 55 },
  { key: 'miguelito', top: '70%', left: '10%', animation: 'float4 4.3s ease-in-out infinite', delay: '0.4s', size: 45 },
  { key: 'luci', top: '65%', right: '10%', animation: 'float3 5s ease-in-out infinite', delay: '0.9s', size: 50 },
];

const MenuScreen = ({ onStartGame }) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFE5B4 0%, #FFB347 30%, #FF8C42 60%, #FF6B6B 100%)',
      }}
    >
      {/* Decorative circles in background */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #fff 0%, transparent 70%)',
          top: '-10%',
          right: '-10%',
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #fff 0%, transparent 70%)',
          bottom: '-5%',
          left: '-5%',
        }}
      />

      {/* Floating Suspects */}
      {FLOATING_SUSPECTS.map((suspect) => (
        <div
          key={suspect.key}
          className="absolute pointer-events-none"
          style={{
            top: suspect.top,
            left: suspect.left,
            right: suspect.right,
            bottom: suspect.bottom,
            animation: suspect.animation,
            animationDelay: suspect.delay,
          }}
        >
          <img
            src={`${IMAGE_BASE_URL}${SUSPECTS[suspect.key].image}`}
            alt={SUSPECTS[suspect.key].name}
            className="rounded-full object-cover shadow-lg"
            style={{
              width: suspect.size,
              height: suspect.size,
              border: '3px solid white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            }}
          />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Nes Hero Image */}
        <div
          className="relative mb-6"
          style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
        >
          <img
            src={`${IMAGE_BASE_URL}Nes.png`}
            alt="Nes"
            className="w-36 h-36 rounded-full object-cover"
            style={{
              border: '5px solid white',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            }}
          />
          {/* Decorative ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '3px dashed rgba(255,255,255,0.5)',
              transform: 'scale(1.2)',
              animation: 'wiggle 3s ease-in-out infinite',
            }}
          />
        </div>

        {/* Title */}
        <h1
          className="text-5xl font-black mb-2 text-center drop-shadow-lg"
          style={{
            color: 'white',
            textShadow: '3px 3px 0 #D64545, 6px 6px 0 rgba(0,0,0,0.1)',
          }}
        >
          ¡Yo No Fui!
        </h1>

        {/* Subtitle Badge */}
        <div
          className="px-5 py-2 rounded-full mb-6 shadow-md"
          style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            color: '#D64545',
          }}
        >
          <span className="font-bold text-sm tracking-wide">🔍 DECODIFICADOR DE PISTAS</span>
        </div>

        {/* Story Card */}
        <div
          className="max-w-md text-center mb-8 p-5 rounded-2xl"
          style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            boxShadow: '0 10px 40px rgba(214, 69, 69, 0.3), 0 0 0 4px rgba(255,255,255,0.5)',
          }}
        >
          <p className="text-base mb-3" style={{ color: '#5D4E37' }}>
            Algo pasó en la casa de <strong style={{ color: '#D64545' }}>Nes</strong>: se rompió la porcelana,
            se perdieron las llaves, alguien se comió el postre...
          </p>
          <p className="text-lg font-bold mb-3" style={{ color: '#FF6B6B' }}>
            "¡¡YO NO FUI!!"
          </p>
          <p className="text-sm" style={{ color: '#7D6E5D' }}>
            Cuando nadie confesaba, Nes siempre culpaba al misterioso{' '}
            <strong style={{ color: '#5D4E37' }}>Padre Mejía</strong>...
            <br />
            ¡Descubre quién fue antes de que escape!
          </p>
        </div>

        {/* Main CTA Button */}
        <button
          onClick={onStartGame}
          className="px-10 py-5 rounded-full text-2xl font-black text-white shadow-xl hover:scale-110 transition-all duration-300 mb-8"
          style={{
            background: 'linear-gradient(135deg, #2D8B6F 0%, #1a6b52 100%)',
            boxShadow: '0 6px 0 #145740, 0 10px 30px rgba(45, 139, 111, 0.4)',
          }}
        >
          🎮 Nueva Partida
        </button>

        {/* Secondary Links */}
        <div className="flex gap-3 flex-wrap justify-center">
          <a
            href="instrucciones.html"
            className="px-5 py-3 rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            style={{
              backgroundColor: '#3B82F6',
              color: 'white',
              boxShadow: '0 4px 0 #2563EB',
            }}
          >
            📋 Instrucciones
          </a>
          <a
            href="dados.html"
            className="px-5 py-3 rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            style={{
              backgroundColor: '#F59E0B',
              color: 'white',
              boxShadow: '0 4px 0 #D97706',
            }}
          >
            🎲 Dados
          </a>
          <a
            href="cartas.html"
            className="px-5 py-3 rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            style={{
              backgroundColor: '#8B5CF6',
              color: 'white',
              boxShadow: '0 4px 0 #7C3AED',
            }}
          >
            🃏 Cartas
          </a>
          <a
            href="matriz.html"
            className="px-5 py-3 rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            style={{
              backgroundColor: '#10B981',
              color: 'white',
              boxShadow: '0 4px 0 #059669',
            }}
          >
            📊 Matriz
          </a>
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;
