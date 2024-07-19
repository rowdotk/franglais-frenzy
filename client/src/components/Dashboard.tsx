import React, { useEffect, useState } from "react";
import RestartButton from "../assets/restart-button.svg";
import InfoButton from "../assets/info-button.svg";
import ScoreChangeCard from "./ScoreChangeCard";

interface Props {
  score: number;
  round: number;
  isCorrect: boolean | undefined;
  restartGame: () => void;
}

const Dashboard: React.FC<Props> = (props: Props): React.ReactElement => {
  const { score, round, isCorrect, restartGame } = props;

  const [displayScoreChange, setDisplayScoreChange] = useState(false);

  useEffect(() => {
    setDisplayScoreChange(true);
    setTimeout(() => {
      setDisplayScoreChange(false);
    }, 1000);
  }, [score]);

  return (
    // TODO: make it responsive
    // TODO: dashboard width changes with the length of the word
    // TODO: use rem? vh?
    // if import font is in the right place
    // TODO: use className or id?
    //TODO: make button closer together, and do not affect neighbouring elements
    // TODO: specify client PORT to 3000
    // use fix width for container
    <div className="dashboard-container">
      <div className="score-panel">
        <div id="score-label">Score</div>
        <div id="score">{score}</div>
        {displayScoreChange && <ScoreChangeCard isCorrect={isCorrect} />}
      </div>
      <div className="game-round-panel">
        <div id="game-round-label">Round</div>
        <div id="game-round">{round}</div>
      </div>
      <div className="button-groups">
        <button id="restart-button" onClick={restartGame}>
          <img id="restart-button-image" src={RestartButton} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
