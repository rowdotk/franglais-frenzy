import React, { useEffect, useState } from "react";
import RestartButton from "../assets/restart-button.svg";
import InfoButton from "../assets/info-button.svg";
import styles from "../styles/Dashboard.module.css";
import ScoreChangeCard from "./ScoreChangeCard";
import RuleModal from "./RuleModal";

interface Props {
  score: number;
  round: number;
  isCorrect: boolean | undefined;
  restartGame: () => void;
}

const Dashboard: React.FC<Props> = (props: Props): React.ReactElement => {
  const { score, round, isCorrect, restartGame } = props;

  const [displayScoreChange, setDisplayScoreChange] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    setDisplayScoreChange(true);
    setTimeout(() => {
      setDisplayScoreChange(false);
    }, 1000);
  }, [score]);

  return (
    // TODO: make it responsive
    // TODO: use rem? vh?
    <div className={styles.dashboardContainer}>
      <div className={styles.scorePanel}>
        <div id={styles.scoreLabel}>Score</div>
        <div id={styles.score}>{score}</div>
        {displayScoreChange && typeof isCorrect !== "undefined" && (
          <ScoreChangeCard isCorrect={isCorrect} />
        )}
      </div>
      <div className={styles.gameRoundPanel}>
        <div id={styles.gameRoundLabel}>Round</div>
        <div id={styles.gameRound}>{round}</div>
      </div>
      <div className={styles.buttonGroups}>
        <button id={styles.restartButton} onClick={restartGame}>
          <img
            id={styles.restartButtonImage}
            src={RestartButton}
            alt="restart-button"
          />
        </button>
        <button
          id={styles.infoButton}
          onClick={() => {
            setDisplayModal(!displayModal);
          }}
        >
          <img id={styles.infoButtonImage} src={InfoButton} alt="info-button" />
        </button>
        {displayModal && <RuleModal setDisplayModal={setDisplayModal} />}
      </div>
    </div>
  );
};

export default Dashboard;
