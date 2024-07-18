import React from "react";
import RestartButton from "../assets/restart-button.svg";
import InfoButton from "../assets/info-button.svg";

interface Props {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  setHasWonGame: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const Dashboard: React.FC<Props> = (props: Props): React.ReactElement => {
  const { score, setScore, round, setRound, setHasWonGame } = props;

  const restartGame = () => {
    setScore(10);
    setRound(0);
    setHasWonGame(undefined);
  };

  return (
    // TODO: use className or id?
    <div className="dashboard-container">
      <div className="score-panel">
        <div id="score-label">Score</div>
        <div id="score">{score}</div>
      </div>
      <div className="game-round-panel">
        <div id="game-round-label">Round</div>
        <div id="game-round">{round}</div>
      </div>
      <div className="button-groups">
        <button id="restart-button" onClick={restartGame}>
          <img src={RestartButton} />
        </button>
        <button id="info-button" onClick={restartGame}>
          <img src={InfoButton} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
