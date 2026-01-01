import React, { useState, useCallback, useEffect } from 'react';
import { rollDie } from '../../data/dice';

const DiceRoller = ({ onClose, onSuccess, onFail }) => {
  const [targetType, setTargetType] = useState(null); // 'paw' or 'eye'
  const [dice, setDice] = useState([null, null, null]);
  const [kept, setKept] = useState([false, false, false]);
  const [rollsLeft, setRollsLeft] = useState(3);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(null); // 'success' or 'fail'

  const rollDice = useCallback(() => {
    if (rollsLeft <= 0 || rolling) return;

    setRolling(true);

    // Animate rolling
    let animCount = 0;
    const animInterval = setInterval(() => {
      setDice(prev => prev.map((d, i) => kept[i] ? d : rollDie()));
      animCount++;
      if (animCount >= 8) {
        clearInterval(animInterval);
        setRolling(false);
        setRollsLeft(prev => prev - 1);
      }
    }, 80);
  }, [rollsLeft, rolling, kept]);

  const toggleKeep = (index) => {
    if (!dice[index] || rolling || result) return;
    // Only allow keeping if it matches target type
    if (dice[index].type === targetType) {
      setKept(prev => {
        const newKept = [...prev];
        newKept[index] = !newKept[index];
        return newKept;
      });
    }
  };

  // Check for success/failure
  useEffect(() => {
    if (rolling || !targetType || dice.some(d => d === null)) return;

    const allMatch = dice.every(d => d.type === targetType);
    if (allMatch) {
      setResult('success');
    } else if (rollsLeft === 0) {
      setResult('fail');
    }
  }, [dice, rollsLeft, rolling, targetType]);

  const handleComplete = () => {
    if (result === 'success') {
      const totalPaws = dice.reduce((sum, d) => sum + d.paws, 0);
      onSuccess(targetType, totalPaws);
    } else {
      onFail();
    }
  };

  // Choose action screen
  if (!targetType) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
        <div
          className="rounded-2xl p-6 max-w-md w-full text-center shadow-2xl"
          style={{ backgroundColor: '#FFF8F0' }}
        >
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#5D4E37' }}>
            🎲 Tirar los Dados
          </h2>
          <p className="text-sm mb-6" style={{ color: '#7D6E5D' }}>
            ¿Qué acción quieres intentar?
          </p>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => setTargetType('paw')}
              className="w-full py-4 rounded-xl font-bold text-white text-lg shadow-md transition-all hover:scale-105"
              style={{ backgroundColor: '#2D8B6F' }}
            >
              🐾 Buscar Pistas
              <span className="block text-sm font-normal opacity-90">
                Necesitas 3 huellas para moverte
              </span>
            </button>
            <button
              onClick={() => setTargetType('eye')}
              className="w-full py-4 rounded-xl font-bold text-white text-lg shadow-md transition-all hover:scale-105"
              style={{ backgroundColor: '#2A7B7B' }}
            >
              👁️ Revelar Sospechosos
              <span className="block text-sm font-normal opacity-90">
                Necesitas 3 ojos para revelar 2 cartas
              </span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full font-medium"
            style={{ backgroundColor: '#E8D5C4', color: '#5D4E37' }}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  // Result screen
  if (result) {
    const totalPaws = dice.reduce((sum, d) => sum + d.paws, 0);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
        <div
          className="rounded-2xl p-6 max-w-md w-full text-center shadow-2xl"
          style={{ backgroundColor: '#FFF8F0' }}
        >
          {result === 'success' ? (
            <>
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#2D8B6F' }}>
                ¡Éxito!
              </h2>
              <div className="text-5xl mb-4">
                {dice.map((d, i) => <span key={i} className="mx-1">{d.icon}</span>)}
              </div>
              {targetType === 'paw' ? (
                <p className="text-lg mb-6" style={{ color: '#5D4E37' }}>
                  Puedes moverte hasta <strong>{totalPaws} casillas</strong>
                </p>
              ) : (
                <p className="text-lg mb-6" style={{ color: '#5D4E37' }}>
                  ¡Revela <strong>2 sospechosos</strong>!
                </p>
              )}
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">😢</div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#D64545' }}>
                ¡Fallaste!
              </h2>
              <div className="text-5xl mb-4">
                {dice.map((d, i) => <span key={i} className="mx-1">{d.icon}</span>)}
              </div>
              <p className="text-lg mb-6" style={{ color: '#5D4E37' }}>
                El Padre Mejía avanza <strong>3 casillas</strong>
              </p>
            </>
          )}
          <button
            onClick={handleComplete}
            className="px-8 py-3 rounded-full font-bold text-white"
            style={{ backgroundColor: result === 'success' ? '#2D8B6F' : '#D64545' }}
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  // Rolling screen
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div
        className="rounded-2xl p-6 max-w-md w-full text-center shadow-2xl"
        style={{ backgroundColor: '#FFF8F0' }}
      >
        <h2 className="text-xl font-bold mb-1" style={{ color: '#5D4E37' }}>
          {targetType === 'paw' ? '🐾 Buscar Pistas' : '👁️ Revelar Sospechosos'}
        </h2>
        <p className="text-sm mb-4" style={{ color: '#7D6E5D' }}>
          Necesitas 3 {targetType === 'paw' ? 'huellas 🐾' : 'ojos 👁️'} • Intentos: {rollsLeft}/3
        </p>

        {/* Dice display */}
        <div className="flex justify-center gap-4 mb-6">
          {dice.map((d, i) => (
            <button
              key={i}
              onClick={() => toggleKeep(i)}
              disabled={!d || rolling}
              className={`w-20 h-20 rounded-xl text-4xl flex items-center justify-center transition-all ${
                kept[i]
                  ? 'ring-4 ring-green-500 bg-green-100 scale-110'
                  : 'bg-white hover:bg-gray-50'
              } ${rolling ? 'animate-pulse' : ''}`}
              style={{ border: '3px solid #5D4E37' }}
            >
              {d ? d.icon : '?'}
            </button>
          ))}
        </div>

        {dice[0] && !rolling && (
          <p className="text-xs mb-4" style={{ color: '#7D6E5D' }}>
            Toca un dado con {targetType === 'paw' ? '🐾' : '👁️'} para guardarlo
          </p>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={rollDice}
            disabled={rollsLeft === 0 || rolling}
            className="px-8 py-3 rounded-full font-bold text-white shadow-md disabled:opacity-50"
            style={{ backgroundColor: '#C4956A' }}
          >
            {rolling ? '🎲 Tirando...' : dice[0] ? `🎲 Tirar de nuevo (${rollsLeft})` : '🎲 Tirar Dados'}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 text-sm font-medium"
          style={{ color: '#7D6E5D' }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DiceRoller;
