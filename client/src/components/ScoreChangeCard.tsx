import React from "react";
import styles from "../styles/ScoreChangeCard.module.css";

interface Props {
  isCorrect: boolean | undefined;
}

const ScoreChangeCard: React.FC<Props> = (
  props: Props
): React.ReactElement | null => {
  const { isCorrect } = props;

  return (
    <div className={styles.scoreChangeCard}>{isCorrect ? "+1" : "-1"}</div>
  );
};

export default ScoreChangeCard;
