import React, { useEffect, useState } from "react";
import { getWord, optimiseWordLevel } from "../services/Word.services";
import InputCell from "./InputCell";
import styles from "../styles/GamePanel.module.css";

interface Props {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setHasWonGame: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const GamePanel: React.FC<Props> = (props: Props): React.ReactElement => {
  const { score, setScore, setRound, setIsCorrect, setHasWonGame } = props;

  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(1);

  const fetchWord = async () => {
    const response = await getWord(difficultyLevel);
    setWord(response.word);
    setTranslation(response.translation);
  };

  const optimiseLevel = async (isCorrect: boolean) => {
    const newDifficultyLevel = isCorrect
      ? Math.max(1, difficultyLevel - 1)
      : Math.min(5, difficultyLevel + 1);

    if (newDifficultyLevel !== difficultyLevel) {
      await optimiseWordLevel({
        word,
        oldDifficultyLevel: difficultyLevel,
        newDifficultyLevel,
      });
    }
  };

  const checkScore = () => {
    if (score === 20) {
      setHasWonGame(true);
    }
    if (score === 0) {
      setHasWonGame(false);
    }
  };

  const findNextInput = (
    currentInput: HTMLInputElement
  ): HTMLInputElement | null => {
    // TODO: cannot go backwards if there is a symbol
    const focusInput = document.getElementById(
      (+currentInput.id + (currentInput.value.length === 0 ? -1 : 1)).toString()
    ) as HTMLInputElement;

    // if at the end of the input, return null
    if (!focusInput) {
      return null;
    }
    if (focusInput.disabled) {
      return findNextInput(focusInput);
    }
    return focusInput;
  };

  const onChange = (e: any) => {
    const currentInput = e.target;
    const nextInput = findNextInput(currentInput);
    if (nextInput) {
      nextInput!.focus();
    }
  };

  const onSubmit = () => {
    let answer = "";
    const inputs = Array.from(
      document.querySelectorAll(".InputCell_inputCell__wr89A")
    ) as HTMLInputElement[];

    inputs.forEach((input) => {
      answer += input.value;
      input.value = "";
    });

    const isCorrect = answer.toLowerCase() === translation;

    setIsCorrect(isCorrect);
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore - 1));
    setDifficultyLevel((prevDifficultyLevel) =>
      isCorrect
        ? Math.min(5, prevDifficultyLevel + 1)
        : Math.max(1, prevDifficultyLevel - 1)
    );
    setRound((prevRound) => (prevRound += 1));
    optimiseLevel(isCorrect);
  };

  useEffect(() => {
    fetchWord();
  }, []);

  useEffect(() => {
    checkScore();
    fetchWord();
  }, [score]);

  return (
    // TODO: button still pushes up the other elements
    <div>
      <div className={styles.wordInputContainer}>
        <div className={styles.word}>{word}</div>
        <div className={styles.inputContainer}>
          {[...Array(translation.length).keys()].map((index) => {
            // Prefill if its the first character or is a symbol
            const shouldPrefill =
              index === 0 || /[^a-z]/.test(translation[index]);
            return (
              <InputCell
                key={index}
                index={index}
                disabled={shouldPrefill}
                char={
                  shouldPrefill ? translation[index].toUpperCase() : undefined
                }
                autoFocus={index === 1}
                onChange={onChange}
              />
            );
          })}
        </div>
        <button type="submit" id={styles.confirmButton} onClick={onSubmit}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default GamePanel;