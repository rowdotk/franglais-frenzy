import axios from "axios";
import {
  IGetWordResponse,
  IOptimiseWordLevelData,
  IOptimiseWordLevelResponse,
} from "./Word.interface";

export async function getWord(
  difficultyLevel: number
): Promise<IGetWordResponse> {
  const {
    data: { data },
  } = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/word?difficultyLevel=${difficultyLevel}`
  );

  // intentionally expose answer here for testing purpose
  console.log("---answer", data);
  return data;
}

// TODO: check types
export async function optimiseWordLevel(
  data: IOptimiseWordLevelData
): Promise<IOptimiseWordLevelResponse> {
  try {
    const response: IOptimiseWordLevelResponse = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/word/optimise-levels`,
      data
    );
    return response;
  } catch (e) {
    console.error(`optimiseWordLevel::error::`, e);
    return { ok: false, error: JSON.stringify(e) };
  }
}
