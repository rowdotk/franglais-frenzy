import { describe, it, expect, beforeAll, afterEach, vitest, vi } from "vitest";
import WordService from "../services/WordService";
import TranslationService from "../services/TranslationService";
import TranslationServiceImpl from "../services/TranslationServiceImpl";
import WordServiceImpl from "../services/WordServiceImpl";
import fs from "fs";

const MOCK_OPTIMISE_LEVEL_DATA = {
  oldDifficultyLevel: 1,
  newDifficultyLevel: 2,
};

const MOCK_VERBS_STORAGE_LOCATION = "src/__fixtures__/verbs.json";

const FIXTURE_VERBS_JSON = {
  "1": ["hello"],
  "2": ["world"],
};

describe("WordServiceTest", () => {
  let mockWordService: WordService, mockTranslationService: TranslationService;

  beforeAll(async () => {
    mockTranslationService = new TranslationServiceImpl();
    mockWordService = new WordServiceImpl(mockTranslationService);
    // vi.mock is hoisted, therefore cannot use variable to store mock content, have to hard code it into the function
    vi.mock("../storage/verbs.json", () => ({
      default: {
        "1": ["hello"],
        "2": ["world"],
      },
    }));
    vi.mock("../utils/constants", () => ({
      verbsStorageLocation: "src/__fixtures__/verbs.json",
    }));
  });

  afterEach(async () => {
    // reset mock verbs.json after each test
    await fs.writeFileSync(
      MOCK_VERBS_STORAGE_LOCATION,
      JSON.stringify(FIXTURE_VERBS_JSON)
    );
    vi.resetAllMocks();
  });

  it("Should select a verb from the correct difficulty level", () => {
    const getTranslationSpy = vitest
      .spyOn(mockTranslationService, "getTranslation")
      .mockImplementationOnce(() =>
        Promise.resolve({ ok: true, data: { translation: "mockTranslation" } })
      );
    mockWordService.getWord("2").then(async (response) => {
      expect(getTranslationSpy).toBeCalledTimes(1);
      expect(response).toMatchObject({
        ok: true,
        data: {
          word: "world",
          translation: "mockTranslation",
          difficultyLevel: 2,
        },
      });
    });
  });

  it("Should move verb from oldDifficultyLevel to newDifficultyLevel", () => {
    mockWordService
      .optimiseWordLevel({
        word: "hello",
        ...MOCK_OPTIMISE_LEVEL_DATA,
      })
      .then(async (response) => {
        expect(response).toMatchObject({
          ok: true,
        });
        const verbsFixture = JSON.parse(
          fs.readFileSync(MOCK_VERBS_STORAGE_LOCATION, "utf8")
        );
        expect(verbsFixture).toEqual({ "1": [], "2": ["world", "hello"] });
      });
  });

  it("Should return error if verb does not exist", () => {
    mockWordService
      .optimiseWordLevel({
        word: "nonExistentWord",
        ...MOCK_OPTIMISE_LEVEL_DATA,
      })
      .then(async (response) => {
        expect(response).toMatchObject({
          ok: false,
          error: '"Word nonExistentWord is not found."',
        });
      });
  });
});
