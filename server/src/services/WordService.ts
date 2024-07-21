export interface IVerbs {
  [difficultyLevel: string]: string[];
}

export interface IGetWordResponse {
  word: string;
  translation: string;
  difficultyLevel: number;
}

export default interface WordService {
  getWord(): {
    ok: boolean;
    data?: IGetWordResponse;
  };
}
