import React from "react";
import styles from "../styles/RuleModal.module.css";

interface Props {
  setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RuleModal: React.FC<Props> = (props: Props): React.ReactElement => {
  const { setDisplayModal } = props;

  const handleClose = () => {
    setDisplayModal(false);
  };

  return (
    <div className={styles.ruleModal}>
      <button className={styles.closeButton} onClick={handleClose}>
        X
      </button>
      <div className={styles.ruleText}>
        <p>You start with 10 points.</p>
        <p>- Correct answer: +1 point.</p>
        <p>- Wrong answer: -1 point.</p>
        <p>- Reach 20 points to win.</p>
        <p>- Drop to 0 points, you'll lose.</p>
      </div>
    </div>
  );
};

export default RuleModal;
