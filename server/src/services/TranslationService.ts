export default interface TranslationService {
  getTranslation(word: string): Promise<{
    ok: boolean;
    data: { translation: string };
  }>;
}
