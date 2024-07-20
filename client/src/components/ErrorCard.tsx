import React from "react";
import styles from "../styles/ErrorCard.module.css";
import ErrorIcon from "../assets/thumb-down.svg";

const ErrorCard: React.FC = (): React.ReactElement => {
  return (
    <div className={styles.errorCard}>
      <img id={styles.errorIcon} src={ErrorIcon} alt="error-icon" />
      <div id={styles.errorMessage}>Something went wrong!</div>
    </div>
  );
};

export default ErrorCard;
