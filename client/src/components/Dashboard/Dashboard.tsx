import React from "react";

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
    <div className="dashboard-container">
      <div className="score-board">Current Score: {score} </div>
      <div className="game-round">Round: {round}</div>
      <button className="restart-button" onClick={restartGame}>
        Restart button
      </button>
    </div>
  );
};

export default Dashboard;
