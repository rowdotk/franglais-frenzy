export interface IGetTranslationResponse {
  translation: string;
}

export default interface TranslationService {
  getTranslation(word: string): Promise<{
    ok: boolean;
    data: IGetTranslationResponse;
  }>;
}
