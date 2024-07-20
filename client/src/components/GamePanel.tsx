import React, { useEffect, useState } from "react";
import { getWord, optimiseWordLevel } from "../services/Word.services";
import InputCell from "./InputCell";
import styles from "../styles/GamePanel.module.css";
import ErrorCard from "./ErrorCard";

interface Props {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  wordHistory: string[];
  setWordHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setHasWonGame: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const GamePanel: React.FC<Props> = (props: Props): React.ReactElement => {
  const {
    score,
    setScore,
    setRound,
    wordHistory,
    setWordHistory,
    setIsCorrect,
    setHasWonGame,
  } = props;

  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [hasError, setHasError] = useState(false);

  const fetchWord = async () => {
    try {
      const response = await getWord(difficultyLevel);
      if (!response) {
        setHasError(true);
        return;
      }
      if (wordHistory.includes(response.word)) {
        fetchWord();
      }
      setWord(response.word);
      setTranslation(response.translation);
    } catch (e) {
      setHasError(true);
    }
  };

  const optimiseLevel = (isCorrect: boolean) => {
    const newDifficultyLevel = isCorrect
      ? Math.max(1, difficultyLevel - 1)
      : Math.min(5, difficultyLevel + 1);

    if (newDifficultyLevel !== difficultyLevel) {
      optimiseWordLevel({
        word,
        oldDifficultyLevel: difficultyLevel,
        newDifficultyLevel,
      });
    }
  };

  const checkScore = () => {
    if (score === 20 || score === 0) {
      setHasWonGame(score === 20 ? true : false);
    }
  };

  const findNextInput = (
    currentInput: HTMLInputElement,
    direction?: "forward" | "backward"
  ): HTMLInputElement | null => {
    const type =
      direction || (currentInput.value.length === 0 ? "backward" : "forward");

    const focusInput = document.getElementById(
      (+currentInput.id + (type === "backward" ? -1 : 1)).toString()
    ) as HTMLInputElement;

    //if at the end of the input, return null
    if (!focusInput) {
      return null;
    }
    if (focusInput.disabled) {
      return findNextInput(focusInput, type);
    }
    return focusInput;
  };

  const handleChange = (e: any) => {
    const currentInput = e.target;
    const nextInput = findNextInput(currentInput);
    if (nextInput) {
      nextInput!.focus();
    }
  };

  const handleSubmit = () => {
    const inputs = Array.from(
      document.querySelectorAll(".InputCell_inputCell__wr89A")
    ) as HTMLInputElement[];

    let answer = "";
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
    setWordHistory((prevWordHistory) => [...prevWordHistory, word]);
    optimiseLevel(isCorrect);
  };

  useEffect(() => {
    fetchWord();
  }, []);

  useEffect(() => {
    checkScore();
    fetchWord();
  }, [score]);

  if (hasError) {
    return <ErrorCard />;
  }

  return (
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
                handleChange={handleChange}
              />
            );
          })}
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            id={styles.confirmButton}
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePanel;
