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
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_AUTH_KEY}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${process.env.DEEPL_BASE_URL}`,
        {
          text: [word],
          source_lang: "FR",
          target_lang: "EN",
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
