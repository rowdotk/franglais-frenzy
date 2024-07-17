import { Router } from "express";
import WordController from "../controllers/WordController";
import WordServiceImpl from "../services/WordServiceImpl";
import TranslationServiceImpl from "../services/TranslationServiceImpl";

class WordRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.createRouter();
  }

  createRouter(): void {
    const translationServiceImpl = new TranslationServiceImpl();
    const wordServiceImpl = new WordServiceImpl(translationServiceImpl);
    const wordController = new WordController(wordServiceImpl);

    this.router.route("/").get(wordController.getWord);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default new WordRouter().getRouter();
