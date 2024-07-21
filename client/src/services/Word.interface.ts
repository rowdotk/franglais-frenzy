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

export interface IOptimiseWordLevelResponse {
  ok: boolean;
  error?: string;
}
