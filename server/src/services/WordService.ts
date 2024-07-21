export interface IVerbs {
  [difficultyLevel: string]: string[];
}

export interface IGetWordResponse {
  word: string;
  translation: string;
  difficultyLevel: number;
}

export interface IOptimiseWordLevelData {
  word: string;
  oldDifficultyLevel: number;
  newDifficultyLevel: number;
}

export default interface WordService {
  getWord(difficultyLevel: string): Promise<{
    ok: boolean;
    data?: IGetWordResponse;
    error?: string;
  }>;
  optimiseWordLevel(data: IOptimiseWordLevelData): Promise<{
    ok: boolean;
    error?: string;
  }>;
}
