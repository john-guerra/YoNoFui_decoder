import React, { useState } from 'react';
import { TRAITS } from '../../data/traits';
import { SUSPECTS } from '../../data/suspects';
import DetectivePets from '../shared/DetectivePets';
import ClueReveal from '../game/ClueReveal';
import AccusationModal from '../game/AccusationModal';
import DiceRoller from '../game/DiceRoller';

const IMAGE_BASE_URL = `${import.meta.env.BASE_URL}imgs/`;

const PlayingScreen = ({
  culprit,
  currentDano,
  revealedClues,
  currentClue,
  onRevealClue,
  onCloseClue,
  onAccuse,
  onEndGame,
}) => {
  const [showAccusation, setShowAccusation] = useState(false);
  const [showDiceRoller, setShowDiceRoller] = useState(false);
  const [showEndGameConfirm, setShowEndGameConfirm] = useState(false);
  const [lastDiceResult, setLastDiceResult] = useState(null);

  const handleDiceSuccess = (type, paws) => {
    setLastDiceResult({ type, paws, success: true });
    setShowDiceRoller(false);
  };

  const handleDiceFail = () => {
    setLastDiceResult({ success: false });
    setShowDiceRoller(false);
  };

  const handleEndGameConfirm = () => {
    setShowEndGameConfirm(false);
    onEndGame();
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url(${IMAGE_BASE_URL}board_with_dog.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Detective pets roaming */}
      <DetectivePets />

      {/* Header with Nes and the daño */}
      <header
        className="sticky top-0 z-40 p-3 shadow-md"
        style={{ backgroundColor: 'rgba(196, 149, 106, 0.95)' }}
      >
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <img
            src={`${IMAGE_BASE_URL}Nes.png`}
            alt="Nes"
            className="w-12 h-12 rounded-full object-cover shadow-md flex-shrink-0"
            style={{ border: '2px solid white' }}
          />
          {currentDano && (
            <p className="text-white text-sm font-medium leading-tight flex-1">
              "¿Quién me {currentDano.verbo} {currentDano.objeto} de {currentDano.lugar}?"
            </p>
          )}
          {/* End Game Button */}
          <button
            onClick={() => setShowEndGameConfirm(true)}
            className="px-3 py-1 rounded-lg text-xs font-medium shadow-sm flex-shrink-0"
            style={{ backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }}
          >
            Salir
          </button>
        </div>
      </header>

      {/* Main content - scrollable */}
      <main className="flex-1 overflow-y-auto p-4 pb-32 flex flex-col items-center justify-center">
        {/* Last dice result notification */}
        {lastDiceResult && (
          <div
            className={`mb-4 px-4 py-2 rounded-xl text-sm font-medium ${
              lastDiceResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {lastDiceResult.success
              ? lastDiceResult.type === 'paw'
                ? `🐾 ¡Muévete hasta ${lastDiceResult.paws} casillas!`
                : '👁️ ¡Revela 2 sospechosos!'
              : '😢 El Padre Mejía avanza 3 casillas'}
          </div>
        )}

        {/* Revealed Clues */}
        <div
          className="rounded-xl p-6 shadow-lg w-full max-w-md"
          style={{ backgroundColor: 'rgba(255, 248, 240, 0.95)' }}
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
        <div className="flex gap-2 max-w-lg mx-auto flex-wrap">
          <button
            onClick={() => setShowDiceRoller(true)}
            className="flex-1 py-3 rounded-xl font-bold text-white shadow-md text-sm"
            style={{ backgroundColor: '#E67E22' }}
          >
            🎲 Tirar Dados
          </button>
          <button
            onClick={onRevealClue}
            disabled={revealedClues.length >= 12}
            className="flex-1 py-3 rounded-xl font-bold text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            style={{ backgroundColor: '#2D8B6F' }}
          >
            🔍 Revelar Pista
          </button>
          <button
            onClick={() => setShowAccusation(true)}
            className="flex-1 py-3 rounded-xl font-bold text-white shadow-md text-sm"
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
          onClose={onCloseClue}
        />
      )}

      {/* Accusation Modal */}
      {showAccusation && (
        <AccusationModal
          onAccuse={(key) => {
            setShowAccusation(false);
            onAccuse(key);
          }}
          onClose={() => setShowAccusation(false)}
        />
      )}

      {/* Dice Roller Modal */}
      {showDiceRoller && (
        <DiceRoller
          onClose={() => setShowDiceRoller(false)}
          onSuccess={handleDiceSuccess}
          onFail={handleDiceFail}
        />
      )}

      {/* End Game Confirmation Modal */}
      {showEndGameConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl"
            style={{ backgroundColor: '#FFF8F0' }}
          >
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#5D4E37' }}>
              ¿Terminar partida?
            </h3>
            <p className="text-sm mb-6" style={{ color: '#7D6E5D' }}>
              Se perderá todo el progreso de esta partida y volverás al menú principal.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEndGameConfirm(false)}
                className="flex-1 py-3 rounded-xl font-bold text-sm"
                style={{ backgroundColor: '#E8D5C4', color: '#5D4E37' }}
              >
                Cancelar
              </button>
              <button
                onClick={handleEndGameConfirm}
                className="flex-1 py-3 rounded-xl font-bold text-white text-sm"
                style={{ backgroundColor: '#D64545' }}
              >
                Sí, terminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayingScreen;
