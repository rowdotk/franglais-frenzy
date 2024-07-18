import React, { useState } from "react";
import Dashboard from "./Dashboard";
import WordInput from "./WordInput";

const Game: React.FC = (): React.ReactElement => {
  const [score, setScore] = useState(10);
  const [round, setRound] = useState(0);
  const [hasWonGame, setHasWonGame] = useState<boolean | undefined>(undefined);

  return (
    // TODO: is it a good idea to set states here and pass down to child?
    <div className="game-container">
      <Dashboard
        score={score}
        setScore={setScore}
        round={round}
        setRound={setRound}
        setHasWonGame={setHasWonGame}
      />
      <WordInput
        score={score}
        setScore={setScore}
        setRound={setRound}
        hasWonGame={hasWonGame}
        setHasWonGame={setHasWonGame}
      />
    </div>
  );
};

export default Game;
