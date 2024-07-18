import React, { useEffect, useState } from "react";
import { getWord, optimiseWordLevel } from "../services/Word.services";
import InputCell from "./InputCell";

interface Props {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  hasWonGame: boolean | undefined;
  setHasWonGame: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const WordInput: React.FC<Props> = (props: Props): React.ReactElement => {
  const { score, setScore, setRound, hasWonGame, setHasWonGame } = props;

  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [focusedCellId, setFocusedCellId] = useState<number>(1);

  const fetchWord = async () => {
    const response = await getWord(difficultyLevel);
    setWord(response.word);
    setTranslation(response.translation);
  };

  const optimiseLevel = async (isCorrect: boolean) => {
    const newDifficultyLevel = isCorrect
      ? Math.min(5, difficultyLevel + 1)
      : Math.max(1, difficultyLevel - 1);
    if (newDifficultyLevel != difficultyLevel) {
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

  const onChange = (e: any) => {
    setFocusedCellId(+e.target.id + 1);
  };

  const onSubmit = () => {
    // TODO: how to get join inputs
    // const inputValues = Array.from(document.querySelectorAll(".input-cell"));

    // const answer = document.getElementsByTagName("input")[0].value;
    const answer = translation;
    const isCorrect = answer === translation;
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
    <div>
      {hasWonGame && <div>WON!!!</div>}
      <div className="word-input-container">
        <div className="word">{word}</div>
        <div className="input">
          {[...Array(translation.length).keys()].map((index) => {
            const isSymbol = /[^a-z]/.test(translation[index]);
            const isFirstChar = index === 0;
            const shouldPrefill = isSymbol || isFirstChar;
            return (
              <InputCell
                key={index}
                index={index}
                disabled={shouldPrefill}
                char={
                  shouldPrefill ? translation[index].toUpperCase() : undefined
                }
                // why is autofocus not working when state of focusedCellId has changed
                autoFocus={index === focusedCellId}
                onChange={onChange}
              />
            );
          })}
        </div>
      </div>
      <button type="submit" id="confirm-button" onClick={onSubmit}>
        Confirm
      </button>
    </div>
  );
};

export default WordInput;
