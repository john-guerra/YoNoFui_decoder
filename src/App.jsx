import React, { useState, useCallback, useEffect } from 'react';
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

const STORAGE_KEY = 'yonofui_game_state';

// Load saved game from localStorage
const loadSavedGame = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate that the saved culprit still exists
      if (parsed.culprit && SUSPECTS[parsed.culprit]) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading saved game:', e);
  }
  return null;
};

// Save game to localStorage
const saveGame = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving game:', e);
  }
};

// Clear saved game from localStorage
const clearSavedGame = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing saved game:', e);
  }
};

export default function YoNoFuiDecoder() {
  // Try to load saved game on initial render
  const savedGame = loadSavedGame();

  const [gameState, setGameState] = useState(savedGame?.gameState || 'menu');
  const [culprit, setCulprit] = useState(savedGame?.culprit || null);
  const [revealedClues, setRevealedClues] = useState(savedGame?.revealedClues || []);
  const [currentClue, setCurrentClue] = useState(null);
  const [currentDano, setCurrentDano] = useState(savedGame?.currentDano || null);
  const [introStep, setIntroStep] = useState(savedGame?.introStep || 0);

  // Save game state whenever it changes (only during active game)
  useEffect(() => {
    if (gameState === 'playing' || gameState === 'intro') {
      saveGame({
        gameState,
        culprit,
        revealedClues,
        currentDano,
        introStep,
      });
    } else if (gameState === 'menu') {
      // Clear saved game when returning to menu
      clearSavedGame();
    }
  }, [gameState, culprit, revealedClues, currentDano, introStep]);

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

  // Go back to menu (clears game)
  const goToMenu = useCallback(() => {
    clearSavedGame();
    setCulprit(null);
    setRevealedClues([]);
    setCurrentClue(null);
    setCurrentDano(null);
    setIntroStep(0);
    setGameState('menu');
  }, []);

  // End game early (with confirmation handled by PlayingScreen)
  const endGame = useCallback(() => {
    goToMenu();
  }, [goToMenu]);

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
    clearSavedGame(); // Clear saved game on victory/defeat
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
      return <VictoryScreen culprit={culprit} onPlayAgain={startGame} onGoToMenu={goToMenu} />;

    case 'defeat':
      return <DefeatScreen culprit={culprit} onPlayAgain={startGame} onGoToMenu={goToMenu} />;

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
          onEndGame={endGame}
        />
      );
  }
}
