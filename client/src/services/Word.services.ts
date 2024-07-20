import axios from "axios";

export async function getWord(difficultyLevel: number): Promise<any> {
  // TODO: handle error
  const {
    data: { data },
  } = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/word?difficultyLevel=${difficultyLevel}`
  );

  // intentionally expose answer here for testing purpose
  console.log("---answer", data);
  return data;

  return { word: "s'empaler", translation: "impale", difficultyLevel: 1 };
}

// TODO: check types
export async function optimiseWordLevel(data: {
  word: string;
  oldDifficultyLevel: number;
  newDifficultyLevel: number;
}): Promise<any> {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/word/optimise-level`,
      data
    );
    return response;
  } catch (e) {
    console.error(`optimiseWordLevel::Error::`, e);
    return null;
  }
}
