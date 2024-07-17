import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";
import WordServiceImpl from "../services/WordServiceImpl.js";

class WordController {
  constructor(private readonly wordServiceImpl: WordServiceImpl) {}

  private getWordSchema = Joi.object().keys({
    difficultyLevel: Joi.number().required().min(1).max(5),
  });

  public getWord = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validatedQuery = await this.getWordSchema.validateAsync(req.query);
      const response = await this.wordServiceImpl.getWord(
        validatedQuery.difficultyLevel.toString()
      );
      res.status(200).send(response);
    } catch (error) {
      console.error(`WordController::getWord::error ${error}`);
      next(error);
    }
  };
}

export default WordController;
