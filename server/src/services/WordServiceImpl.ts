import verbsJson from "../storage/verbs.json";
import { verbsStorageLocation } from "../utils/constants";
import TranslationServiceImpl from "./TranslationServiceImpl";
import WordService, {
  IGetWordResponse,
  IOptimiseWordLevelData,
  IVerbs,
} from "./WordService";
import fs from "fs";

export default class WordServiceImpl implements WordService {
  verbs: IVerbs;

  constructor(private readonly translationServiceImpl: TranslationServiceImpl) {
    this.verbs = verbsJson;
  }

  public randomise(max: number): number {
    return Math.floor(Math.random() * max);
  }

  public async getWord(difficultyLevel: string): Promise<{
    ok: boolean;
    data?: IGetWordResponse;
    error?: string;
  }> {
    try {
      const levelGroupSize = this.verbs[difficultyLevel].length;
      const selectedWord =
        this.verbs[difficultyLevel][this.randomise(levelGroupSize)];

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
      return { ok: false, error: JSON.stringify(error.message || error) };
    }
  }

  public async optimiseWordLevel(data: IOptimiseWordLevelData): Promise<{
    ok: boolean;
    error?: string;
  }> {
    try {
      const { word, oldDifficultyLevel, newDifficultyLevel } = data;
      const index = this.verbs[oldDifficultyLevel].indexOf(word);
      if (index === -1) {
        throw Error(`Word ${word} is not found.`);
      }
      this.verbs[oldDifficultyLevel].splice(index, 1);
      this.verbs[newDifficultyLevel].push(word);
      await fs.writeFileSync(verbsStorageLocation, JSON.stringify(this.verbs));
      return { ok: true };
    } catch (error) {
      console.error(`WordServiceImpl::optimiseWordLevel::error ${error}`);
      return { ok: false, error: JSON.stringify(error.message || error) };
    }
  }
}
