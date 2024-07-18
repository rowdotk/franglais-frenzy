import axios from "axios";

export async function getWord(difficultyLevel: number): Promise<any> {
  // const {
  //   data: { data },
  // } = await axios.get(
  //   `http://localhost:3001/api/v1/word?difficultyLevel=${difficultyLevel}`
  // );

  // console.log("---data", data);
  // return data;
  return { word: "laitonner", translation: "milk", difficultyLevel: 1 };
}

export async function optimiseWordLevel(data: {
  word: string;
  oldDifficultyLevel: number;
  newDifficultyLevel: number;
}): Promise<any> {
  // TODO: how to import server url for dotenv
  const response = await axios.post(
    `http://localhost:3001/api/v1/word/optimise-level`,
    data
  );
  return response;
}
