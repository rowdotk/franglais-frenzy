import React, { useState } from "react";
import Dashboard from "./Dashboard";
import WordInput from "./WordInput";
import GameStatusOverlay from "./GameStatusOverlay";

const Game: React.FC = (): React.ReactElement => {
  const [score, setScore] = useState(10);
  const [round, setRound] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [hasWonGame, setHasWonGame] = useState<boolean | undefined>(undefined);

  const restartGame = () => {
    setScore(10);
    setRound(0);
    setIsCorrect(undefined);
    setHasWonGame(undefined);
  };

  return (
    <div>
      {typeof hasWonGame !== "undefined" && (
        <GameStatusOverlay hasWonGame={hasWonGame} restartGame={restartGame} />
      )}
      <div className="game-container">
        <Dashboard
          score={score}
          round={round}
          isCorrect={isCorrect}
          restartGame={restartGame}
        />
        <WordInput
          score={score}
          setScore={setScore}
          setRound={setRound}
          setIsCorrect={setIsCorrect}
          setHasWonGame={setHasWonGame}
        />
      </div>
    </div>
  );
};

export default Game;
