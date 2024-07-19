import React from "react";

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
      className="game-status-overlay"
      style={{
        backgroundColor: hasWonGame
          ? "rgba(240, 238, 238, 0.842)"
          : "rgba(0, 0, 0, 0.842)",
      }}
    >
      <div className="game-status-container">
        <div id="game-status">{`YOU HAVE ${hasWonGame ? "WON" : "LOST"}!`}</div>
        <button type="submit" id="play-again-button" onClick={restartGame}>
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
};

export default GameStatusOverlay;
