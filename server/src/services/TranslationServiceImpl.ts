import axios from "axios";
import TranslationService from "./TranslationService";

export default class TranslationServiceImpl implements TranslationService {
  constructor() {}

  public async getTranslation(word: string): Promise<{
    ok: boolean;
    data: { translation: string };
  }> {
    try {
      const headers = {
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_TOKEN}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${process.env.DEEPL_BASE_URL}`,
        {
          text: [word],
          target_lang: "EN",
          source_lang: "FR",
        },
        { headers }
      );

      return {
        ok: true,
        data: { translation: response.data["translations"][0]["text"] },
      };
    } catch (error) {
      console.error(
        `TranslationServiceImpl::getTranslation::error ${JSON.stringify(error)}`
      );
      return Promise.reject(error);
    }
  }
}
