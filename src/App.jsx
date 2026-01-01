import React, { useState, useCallback } from 'react';

const IMAGE_BASE_URL = `${import.meta.env.BASE_URL}imgs/`;

// Random "daños" generator - each action has compatible objects
const DANOS = [
  // Quebrar - things that can break
  { verbo: 'quebró', objetos: ['la porcelana', 'el florero', 'el espejo', 'las gafas', 'los platos', 'la taza favorita', 'el jarrón antiguo'] },
  // Perder - things that can be lost
  { verbo: 'perdió', objetos: ['el control remoto', 'las gafas', 'el celular', 'las llaves', 'los aretes', 'la cartera', 'las chanclas'] },
  // Derramar - liquids/spillable things
  { verbo: 'derramó', objetos: ['el café', 'la sopa', 'el jugo', 'el chocolate', 'el tinto', 'la aguapanela', 'el caldo'] },
  // Desordenar - things that can be messed up
  { verbo: 'desordenó', objetos: ['las fotos', 'la ropa', 'las cobijas', 'los cajones', 'el armario', 'la cocina', 'los papeles'] },
  // Manchar - things that can be stained
  { verbo: 'manchó', objetos: ['el mantel', 'el vestido', 'la cobija', 'las cortinas', 'el sofá', 'la alfombra', 'el tapete'] },
  // Esconder - things that can be hidden
  { verbo: 'escondió', objetos: ['el control remoto', 'el celular', 'las llaves', 'las gafas', 'los dulces', 'el chocolate', 'la billetera'] },
  // Rayar - things that can be scratched
  { verbo: 'rayó', objetos: ['la mesa', 'el espejo', 'la pared', 'el piso', 'el mueble', 'la puerta', 'el carro'] },
  // Mojar - things that can get wet
  { verbo: 'mojó', objetos: ['el mantel', 'el vestido', 'la cobija', 'la almohada', 'el sofá', 'los zapatos', 'el celular'] },
  // Quemar - things that can burn
  { verbo: 'quemó', objetos: ['el arroz', 'el mantel', 'la olla', 'las arepas', 'los fríjoles', 'el sancocho', 'la sartén'] },
  // Descomponer - things that can break down
  { verbo: 'descompuso', objetos: ['la licuadora', 'el televisor', 'el celular', 'el control remoto', 'la lavadora', 'el computador', 'la nevera'] },
];

const LUGARES = [
  'la sala', 'la cocina', 'la alcoba', 'el comedor',
  'el baño', 'el patio', 'el balcón', 'la terraza'
];

// Generate a random "daño"
const generarDano = () => {
  const dano = DANOS[Math.floor(Math.random() * DANOS.length)];
  const objeto = dano.objetos[Math.floor(Math.random() * dano.objetos.length)];
  const lugar = LUGARES[Math.floor(Math.random() * LUGARES.length)];
  return { verbo: dano.verbo, objeto, lugar };
};

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

// Animated detective pets component
const DetectivePets = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Dog detective */}
      <div
        className="absolute text-4xl"
        style={{
          animation: 'roamDog 12s ease-in-out infinite',
          top: '20%',
          left: '0%',
        }}
      >
        <span style={{ display: 'inline-block', animation: 'bounce 0.5s ease-in-out infinite' }}>
          🐕🔍
        </span>
      </div>

      {/* Cat detective */}
      <div
        className="absolute text-4xl"
        style={{
          animation: 'roamCat 15s ease-in-out infinite',
          top: '60%',
          right: '0%',
        }}
      >
        <span style={{ display: 'inline-block', animation: 'bounce 0.6s ease-in-out infinite alternate' }}>
          🔎🐈
        </span>
      </div>

      {/* Cockatoo detective */}
      <div
        className="absolute text-4xl"
        style={{
          animation: 'roamBird 10s ease-in-out infinite',
          top: '40%',
          left: '50%',
        }}
      >
        <span style={{ display: 'inline-block', animation: 'flutter 0.3s ease-in-out infinite alternate' }}>
          🦜🔍
        </span>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes roamDog {
          0% { transform: translateX(-50px); }
          25% { transform: translateX(calc(100vw - 100px)) translateY(30px); }
          50% { transform: translateX(calc(50vw)) translateY(-20px); }
          75% { transform: translateX(calc(80vw - 80px)) translateY(50px); }
          100% { transform: translateX(-50px); }
        }
        @keyframes roamCat {
          0% { transform: translateX(50px) scaleX(-1); }
          33% { transform: translateX(calc(-100vw + 100px)) translateY(-40px) scaleX(-1); }
          66% { transform: translateX(calc(-50vw)) translateY(30px) scaleX(-1); }
          100% { transform: translateX(50px) scaleX(-1); }
        }
        @keyframes roamBird {
          0% { transform: translate(0, 0); }
          20% { transform: translate(-40vw, -20vh); }
          40% { transform: translate(30vw, 10vh); }
          60% { transform: translate(-20vw, 20vh); }
          80% { transform: translate(40vw, -10vh); }
          100% { transform: translate(0, 0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes flutter {
          0% { transform: translateY(0) rotate(-5deg); }
          100% { transform: translateY(-5px) rotate(5deg); }
        }
      `}</style>
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
  const [gameState, setGameState] = useState('menu'); // menu, intro, playing, victory, defeat
  const [culprit, setCulprit] = useState(null);
  const [revealedClues, setRevealedClues] = useState([]);
  const [currentClue, setCurrentClue] = useState(null);
  const [showAccusation, setShowAccusation] = useState(false);
  const [currentDano, setCurrentDano] = useState(null);
  const [introStep, setIntroStep] = useState(0); // 0: Nes asks, 1: Everyone responds, 2: Padre Mejía

  // Start new game
  const startGame = useCallback(() => {
    const suspectKeys = Object.keys(SUSPECTS);
    const randomCulprit = suspectKeys[Math.floor(Math.random() * suspectKeys.length)];
    setCulprit(randomCulprit);
    setRevealedClues([]);
    setCurrentClue(null);
    setShowAccusation(false);
    setCurrentDano(generarDano());
    setIntroStep(0);
    setGameState('intro');
  }, []);

  // Advance intro sequence
  const advanceIntro = useCallback(() => {
    if (introStep < 2) {
      setIntroStep(prev => prev + 1);
    } else {
      setGameState('playing');
    }
  }, [introStep]);

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

  // Intro sequence
  if (gameState === 'intro' && currentDano) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{ backgroundColor: '#E8D5C4' }}
        onClick={advanceIntro}
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
      className="min-h-screen flex flex-col relative"
      style={{ backgroundColor: '#E8D5C4' }}
    >
      {/* Detective pets roaming */}
      <DetectivePets />

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
      <main className="flex-1 overflow-y-auto p-4 pb-32 flex flex-col items-center justify-center">
        {/* Revealed Clues */}
        <div
          className="rounded-xl p-6 shadow-md w-full max-w-md"
          style={{ backgroundColor: '#FFF8F0' }}
        >
          <h2 className="font-bold mb-4 text-center text-lg" style={{ color: '#5D4E37' }}>
            Pistas Reveladas ({revealedClues.length}/12)
          </h2>
          {revealedClues.length === 0 ? (
            <p className="text-center py-8" style={{ color: '#7D6E5D' }}>
              Toca "Revelar Pista" para obtener una pista
            </p>
          ) : (
            <div className="space-y-2">
              {revealedClues.map(trait => {
                const hasIt = SUSPECTS[culprit].traits.includes(trait);
                return (
                  <div
                    key={trait}
                    className={`px-4 py-3 rounded-xl font-medium flex items-center gap-3 ${
                      hasIt ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <span className="text-2xl">{TRAITS[trait].icon}</span>
                    <span className="flex-1">{TRAITS[trait].name}</span>
                    <span className="font-bold text-lg">{hasIt ? 'SÍ' : 'NO'}</span>
                  </div>
                );
              })}
            </div>
          )}
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
                  onClick={() => accuse(key)}
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
              onClick={() => setShowAccusation(false)}
              className="w-full py-4 rounded-xl font-bold text-lg"
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
