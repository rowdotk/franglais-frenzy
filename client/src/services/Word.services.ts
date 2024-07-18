import axios from "axios";

export async function getWord(difficultyLevel: number): Promise<any> {
  const {
    data: { data },
  } = await axios.get(
    `http://localhost:3001/api/v1/word?difficultyLevel=${difficultyLevel}`
  );
  return data;
}
