import React from "react";

interface Props {
  isCorrect: boolean | undefined;
}

const ScoreChangeCard: React.FC<Props> = (
  props: Props
): React.ReactElement | null => {
  const { isCorrect } = props;

  if (typeof isCorrect === "undefined") {
    return null;
  }

  return <div className="score-change-card">{isCorrect ? "+1" : "-1"}</div>;
};

export default ScoreChangeCard;
