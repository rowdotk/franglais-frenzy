import React from "react";
import styles from "../styles/InputCell.module.css";

interface Props {
  index: number;
  char: string | undefined;
  disabled: boolean;
  autoFocus: boolean;
  onChange: any;
}

const InputCell: React.FC<Props> = (props: Props): React.ReactElement => {
  const { index, char, disabled, autoFocus, onChange } = props;
  const maxLength = 1;
  return (
    <input
      className={styles.inputCell}
      id={index.toString()}
      type="text"
      maxLength={maxLength}
      disabled={disabled}
      value={char}
      autoFocus={autoFocus}
      onChange={onChange}
    />
  );
};

export default InputCell;
