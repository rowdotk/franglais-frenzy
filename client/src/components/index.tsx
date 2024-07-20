import React, { useState } from "react";
import Dashboard from "./Dashboard";
import GamePanel from "./GamePanel";
import GameStatusOverlay from "./GameStatusOverlay";
import styles from "../styles/index.module.css";

const GameContainer: React.FC = (): React.ReactElement => {
  const [score, setScore] = useState(10);
  const [round, setRound] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [hasWonGame, setHasWonGame] = useState<boolean | undefined>(undefined);
  const [wordHistory, setWordHistory] = useState<string[]>([]);

  const restartGame = () => {
    setScore(10);
    setRound(0);
    setIsCorrect(undefined);
    setHasWonGame(undefined);
    setWordHistory([]);
  };

  return (
    <div className={styles.gameContainer}>
      {typeof hasWonGame !== "undefined" && (
        <GameStatusOverlay hasWonGame={hasWonGame} restartGame={restartGame} />
      )}

      <Dashboard
        score={score}
        round={round}
        isCorrect={isCorrect}
        restartGame={restartGame}
      />
      <GamePanel
        score={score}
        setScore={setScore}
        setRound={setRound}
        wordHistory={wordHistory}
        setWordHistory={setWordHistory}
        setIsCorrect={setIsCorrect}
        setHasWonGame={setHasWonGame}
      />
    </div>
  );
};

export default GameContainer;
