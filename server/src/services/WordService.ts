export interface IVerbs {
  [difficultyLevel: string]: string[];
}

export default interface WordService {
  getWord(): {
    ok: boolean;
    data?: { word: string; translation: string; difficultyLevel: number };
  };
}
