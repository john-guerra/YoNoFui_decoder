import React, { useState, useCallback } from 'react';

const IMAGE_BASE_URL = 'https://johnguerra.co/viz/YoNoFui/imgs/';

// 12 traits with icons
const TRAITS = {
  gafas: { name: 'Usa gafas', icon: '👓' },
  lloron: { name: 'Llorón', icon: '😢' },
  pelo_lacio: { name: 'Pelo lacio', icon: '👱' },
  ejercicio: { name: 'Hace ejercicio', icon: '🏋️' },
  hombre: { name: 'Es hombre', icon: '👨' },
  adulto: { name: 'Es adulto', icon: '🧑' },
  videojuegos: { name: 'Videojuegos', icon: '🎮' },
  religioso: { name: 'Religioso', icon: '⛪' },
  fashionista: { name: 'Fashionista', icon: '👗' },
  calvo: { name: 'Calvo/Canoso', icon: '👨‍🦲' },
  cafe: { name: 'Toma café', icon: '☕' },
  picante: { name: 'Come picante', icon: '🌶️' }
};

// 14 suspects with their traits and image filenames
const SUSPECTS = {
  vicente: {
    name: 'Vicente',
    image: 'Vicente.jpg',
    traits: ['gafas', 'lloron', 'hombre', 'adulto', 'religioso', 'calvo', 'cafe']
  },
  edwin: {
    name: 'Edwin',
    image: 'Edwin.jpg',
    traits: ['lloron', 'ejercicio', 'hombre', 'adulto', 'religioso', 'calvo', 'cafe', 'picante']
  },
  jambita: {
    name: 'Jambita',
    image: 'Jambita.jpg',
    traits: ['gafas', 'lloron', 'ejercicio', 'hombre', 'adulto', 'videojuegos', 'calvo', 'cafe', 'picante']
  },
  eli: {
    name: 'Eli',
    image: 'Eli.jpg',
    traits: ['gafas', 'lloron', 'ejercicio', 'adulto', 'religioso', 'fashionista']
  },
  magda: {
    name: 'Magda',
    image: 'Magda.jpg',
    traits: ['adulto', 'religioso', 'fashionista', 'cafe', 'picante']
  },
  aide: {
    name: 'Aide',
    image: 'Aide.jpg',
    traits: ['pelo_lacio', 'adulto', 'religioso', 'fashionista', 'cafe', 'picante']
  },
  yuli: {
    name: 'Yuli',
    image: 'Yuli.jpg',
    traits: ['pelo_lacio', 'adulto']
  },
  johan: {
    name: 'Johan',
    image: 'Johan.jpg',
    traits: ['gafas', 'hombre', 'adulto', 'videojuegos', 'religioso', 'calvo']
  },
  mafe: {
    name: 'Mafe',
    image: 'Mafe.png',
    traits: ['ejercicio', 'adulto', 'picante']
  },
  santi: {
    name: 'Santi',
    image: 'Santi.jpg',
    traits: ['lloron', 'pelo_lacio', 'ejercicio', 'hombre', 'videojuegos']
  },
  goyo: {
    name: 'Goyo',
    image: 'Goyo.png',
    traits: ['pelo_lacio', 'ejercicio', 'hombre', 'videojuegos']
  },
  luci: {
    name: 'Luchi',
    image: 'Luchi.jpg',
    traits: ['pelo_lacio', 'videojuegos', 'fashionista']
  },
  juanchito: {
    name: 'Juanchito',
    image: 'Juanchito.jpg',
    traits: ['hombre', 'videojuegos', 'religioso']
  },
  miguelito: {
    name: 'Miguelito',
    image: 'Miguelito.jpg',
    traits: ['lloron', 'hombre', 'videojuegos']
  }
};

// Character card component
const CharacterCard = ({ suspect, isEliminated, onToggle }) => {
  const imageUrl = `${IMAGE_BASE_URL}${suspect.image}`;
  
  return (
    <div 
      onClick={onToggle}
      className={`relative cursor-pointer transition-all duration-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg ${
        isEliminated ? 'opacity-40 grayscale' : 'hover:scale-105'
      }`}
      style={{ backgroundColor: '#FFF8F0' }}
    >
      <div className="aspect-square relative">
        <img 
          src={imageUrl} 
          alt={suspect.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div 
          className="w-full h-full items-center justify-center text-4xl hidden"
          style={{ backgroundColor: '#E8D5C4' }}
        >
          👤
        </div>
        {isEliminated && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">❌</span>
          </div>
        )}
      </div>
      <div 
        className="p-2 text-center font-bold text-sm"
        style={{ backgroundColor: '#C4956A', color: 'white' }}
      >
        {suspect.name}
      </div>
    </div>
  );
};

// Clue reveal component
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

// Main App
export default function YoNoFuiDecoder() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, victory, defeat
  const [culprit, setCulprit] = useState(null);
  const [revealedClues, setRevealedClues] = useState([]);
  const [eliminated, setEliminated] = useState({});
  const [currentClue, setCurrentClue] = useState(null);
  const [showAccusation, setShowAccusation] = useState(false);

  // Start new game
  const startGame = useCallback(() => {
    const suspectKeys = Object.keys(SUSPECTS);
    const randomCulprit = suspectKeys[Math.floor(Math.random() * suspectKeys.length)];
    setCulprit(randomCulprit);
    setRevealedClues([]);
    setEliminated({});
    setCurrentClue(null);
    setShowAccusation(false);
    setGameState('playing');
  }, []);

  // Reveal a random clue
  const revealClue = useCallback(() => {
    if (!culprit) return;
    
    const availableTraits = Object.keys(TRAITS).filter(t => !revealedClues.includes(t));
    if (availableTraits.length === 0) return;
    
    const randomTrait = availableTraits[Math.floor(Math.random() * availableTraits.length)];
    const culpritHasTrait = SUSPECTS[culprit].traits.includes(randomTrait);
    
    setRevealedClues(prev => [...prev, randomTrait]);
    setCurrentClue({ trait: randomTrait, hasIt: culpritHasTrait });
  }, [culprit, revealedClues]);

  // Toggle suspect elimination
  const toggleEliminated = useCallback((suspectKey) => {
    setEliminated(prev => ({
      ...prev,
      [suspectKey]: !prev[suspectKey]
    }));
  }, []);

  // Make accusation
  const accuse = useCallback((suspectKey) => {
    if (suspectKey === culprit) {
      setGameState('victory');
    } else {
      setGameState('defeat');
    }
    setShowAccusation(false);
  }, [culprit]);

  // Menu screen
  if (gameState === 'menu') {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{ backgroundColor: '#E8D5C4' }}
      >
        <img 
          src={`${IMAGE_BASE_URL}Nes.png`}
          alt="Nes"
          className="w-32 h-32 rounded-full mb-6 shadow-lg object-cover"
          style={{ border: '4px solid #C4956A' }}
        />
        <h1 
          className="text-4xl font-bold mb-2 text-center"
          style={{ color: '#5D4E37' }}
        >
          ¡Yo No Fui!
        </h1>
        <p className="text-lg mb-8" style={{ color: '#7D6E5D' }}>
          Decodificador de Pistas
        </p>
        <button
          onClick={startGame}
          className="px-8 py-4 rounded-full text-xl font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
          style={{ backgroundColor: '#C4956A' }}
        >
          🔍 Nueva Partida
        </button>
      </div>
    );
  }

  // Victory screen
  if (gameState === 'victory') {
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
        <button
          onClick={startGame}
          className="px-8 py-4 rounded-full text-lg font-bold text-white shadow-lg"
          style={{ backgroundColor: '#C4956A' }}
        >
          Jugar de Nuevo
        </button>
      </div>
    );
  }

  // Defeat screen
  if (gameState === 'defeat') {
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
          onClick={startGame}
          className="px-8 py-4 rounded-full text-lg font-bold text-white shadow-lg"
          style={{ backgroundColor: '#C4956A' }}
        >
          Intentar de Nuevo
        </button>
      </div>
    );
  }

  // Playing screen
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#E8D5C4' }}
    >
      {/* Header */}
      <header 
        className="sticky top-0 z-40 p-4 shadow-md"
        style={{ backgroundColor: '#C4956A' }}
      >
        <h1 className="text-xl font-bold text-white text-center">
          ¡Yo No Fui! - Decodificador
        </h1>
      </header>

      {/* Main content - scrollable */}
      <main className="flex-1 overflow-y-auto p-4 pb-48">
        {/* Revealed Clues */}
        {revealedClues.length > 0 && (
          <div 
            className="rounded-xl p-4 mb-4 shadow-md"
            style={{ backgroundColor: '#FFF8F0' }}
          >
            <h2 className="font-bold mb-3 text-center" style={{ color: '#5D4E37' }}>
              Pistas Reveladas ({revealedClues.length}/12)
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {revealedClues.map(trait => {
                const hasIt = SUSPECTS[culprit].traits.includes(trait);
                return (
                  <div
                    key={trait}
                    className={`px-3 py-2 rounded-full text-sm font-medium flex items-center gap-1 ${
                      hasIt ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <span>{TRAITS[trait].icon}</span>
                    <span>{hasIt ? 'SÍ' : 'NO'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Suspects Grid */}
        <div 
          className="rounded-xl p-4 shadow-md"
          style={{ backgroundColor: '#FFF8F0' }}
        >
          <h2 className="font-bold mb-3 text-center" style={{ color: '#5D4E37' }}>
            Sospechosos (toca para eliminar)
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {Object.entries(SUSPECTS).map(([key, suspect]) => (
              <CharacterCard
                key={key}
                suspect={suspect}
                isEliminated={eliminated[key]}
                onToggle={() => toggleEliminated(key)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Fixed Action Buttons */}
      <div 
        className="fixed bottom-0 left-0 right-0 p-4 shadow-lg"
        style={{ backgroundColor: '#C4956A' }}
      >
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={revealClue}
            disabled={revealedClues.length >= 12}
            className="flex-1 py-4 rounded-xl font-bold text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#2D8B6F' }}
          >
            🔍 Revelar Pista
          </button>
          <button
            onClick={() => setShowAccusation(true)}
            className="flex-1 py-4 rounded-xl font-bold text-white shadow-md"
            style={{ backgroundColor: '#D64545' }}
          >
            👆 ¡Acusar!
          </button>
        </div>
      </div>

      {/* Clue Reveal Modal */}
      {currentClue && (
        <ClueReveal
          trait={currentClue.trait}
          hasIt={currentClue.hasIt}
          onClose={() => setCurrentClue(null)}
        />
      )}

      {/* Accusation Modal */}
      {showAccusation && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div 
            className="rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            style={{ backgroundColor: '#FFF8F0' }}
          >
            <h2 className="text-xl font-bold text-center mb-4" style={{ color: '#5D4E37' }}>
              ¿Quién fue el culpable?
            </h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {Object.entries(SUSPECTS).map(([key, suspect]) => (
                <button
                  key={key}
                  onClick={() => accuse(key)}
                  className="flex flex-col items-center p-2 rounded-xl hover:bg-amber-100 transition-colors"
                >
                  <img
                    src={`${IMAGE_BASE_URL}${suspect.image}`}
                    alt={suspect.name}
                    className="w-16 h-16 rounded-lg object-cover mb-1"
                  />
                  <span className="text-xs font-medium" style={{ color: '#5D4E37' }}>
                    {suspect.name}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAccusation(false)}
              className="w-full py-3 rounded-xl font-bold"
              style={{ backgroundColor: '#E8D5C4', color: '#5D4E37' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
