import React, { useEffect, useState } from "react";
import { getWord } from "../../services/Word.services";

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

  const fetchWord = async () => {
    const response = await getWord(difficultyLevel);
    setWord(response.word);
    setTranslation(response.translation);
  };

  const checkScore = () => {
    if (score === 20) {
      setHasWonGame(true);
    }
    if (score === 0) {
      setHasWonGame(false);
    }
  };

  const onSubmit = () => {
    const answer = document.getElementsByTagName("input")[0].value;
    const isCorrect = answer === translation;
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore - 1));
    setDifficultyLevel((prevDifficultyLevel) =>
      isCorrect ? prevDifficultyLevel + 1 : prevDifficultyLevel - 1
    );
    setRound((prevRound) => (prevRound += 1));
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
          <input type="text" id="input-answer"></input>
        </div>
      </div>
      <button type="submit" onClick={onSubmit}>
        Confirm
      </button>
    </div>
  );
};

export default WordInput;
