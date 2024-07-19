import React from "react";
import styles from "../styles/GameStatusOverlay.module.css";

interface Props {
  hasWonGame: boolean | undefined;
  restartGame: () => void;
}

const GameStatusOverlay: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  const { hasWonGame, restartGame } = props;

  return (
    <div
      className={styles.gameStatusOverlay}
      style={{
        backgroundColor: hasWonGame
          ? "rgba(240, 238, 238, 0.842)"
          : "rgba(0, 0, 0, 0.842)",
      }}
    >
      <div className={styles.gameStatusContainer}>
        <div id={styles.gameStatus}>{`YOU HAVE ${
          hasWonGame ? "WON" : "LOST"
        }!`}</div>
        <button type="submit" id={styles.playAgainButton} onClick={restartGame}>
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
};

export default GameStatusOverlay;
