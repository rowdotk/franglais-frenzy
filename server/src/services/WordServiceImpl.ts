import verbsJson from "../storage/verbs.json";
import TranslationServiceImpl from "./TranslationServiceImpl";
import { IVerbs } from "./WordService";

export default class WordService {
  constructor(
    private readonly translationServiceImpl: TranslationServiceImpl
  ) {}

  public randomise(max: number): number {
    return Math.floor(Math.random() * max);
  }

  public async getWord(difficultyLevel: string): Promise<{
    ok: boolean;
    data?: { word: string; translation: string; difficultyLevel: number };
  }> {
    try {
      const verbs: IVerbs = verbsJson;
      const wordGroupSize = verbs[difficultyLevel].length;
      const selectedWord =
        verbs[difficultyLevel][this.randomise(wordGroupSize)];

      const {
        data: { translation },
      } = await this.translationServiceImpl.getTranslation(selectedWord);

      return {
        ok: true,
        data: {
          word: selectedWord,
          translation,
          difficultyLevel: +difficultyLevel,
        },
      };
    } catch (error) {
      console.error(`WordServiceImpl::getWord::error ${error}`);
      return { ok: false };
    }
  }
}
