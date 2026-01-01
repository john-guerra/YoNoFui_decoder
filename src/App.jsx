import React, { useState, useCallback } from 'react';
import './styles/animations.css';

// Data imports
import { SUSPECTS } from './data/suspects';
import { TRAITS } from './data/traits';
import { generarDano } from './data/danos';

// Screen components
import MenuScreen from './components/screens/MenuScreen';
import IntroScreen from './components/screens/IntroScreen';
import PlayingScreen from './components/screens/PlayingScreen';
import VictoryScreen from './components/screens/VictoryScreen';
import DefeatScreen from './components/screens/DefeatScreen';

export default function YoNoFuiDecoder() {
  const [gameState, setGameState] = useState('menu'); // menu, intro, playing, victory, defeat
  const [culprit, setCulprit] = useState(null);
  const [revealedClues, setRevealedClues] = useState([]);
  const [currentClue, setCurrentClue] = useState(null);
  const [currentDano, setCurrentDano] = useState(null);
  const [introStep, setIntroStep] = useState(0); // 0: Nes asks, 1: Everyone responds, 2: Padre Mejía

  // Start new game
  const startGame = useCallback(() => {
    const suspectKeys = Object.keys(SUSPECTS);
    const randomCulprit = suspectKeys[Math.floor(Math.random() * suspectKeys.length)];
    setCulprit(randomCulprit);
    setRevealedClues([]);
    setCurrentClue(null);
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
  }, [culprit]);

  // Render based on game state
  switch (gameState) {
    case 'menu':
      return <MenuScreen onStartGame={startGame} />;

    case 'intro':
      return currentDano ? (
        <IntroScreen
          currentDano={currentDano}
          introStep={introStep}
          onAdvance={advanceIntro}
        />
      ) : null;

    case 'victory':
      return <VictoryScreen culprit={culprit} onPlayAgain={startGame} />;

    case 'defeat':
      return <DefeatScreen culprit={culprit} onPlayAgain={startGame} />;

    case 'playing':
    default:
      return (
        <PlayingScreen
          culprit={culprit}
          currentDano={currentDano}
          revealedClues={revealedClues}
          currentClue={currentClue}
          onRevealClue={revealClue}
          onCloseClue={() => setCurrentClue(null)}
          onAccuse={accuse}
        />
      );
  }
}
