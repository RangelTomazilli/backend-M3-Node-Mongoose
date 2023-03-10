import { ReviewService } from "../services/review.service";
import { StatusCode } from "../../utils/status.code";
import { Request, Response } from "express";
import {
  invalidBodyNewReview,
  invalidBodyEditReview,
} from "../ultils/review.body.validator";
import { invalidBodyError } from "../../utils/error.handler";

export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  async getAll(req: Request, res: Response) {
    const result = await this.reviewService.getAll();

    //existe reviews.promiseError??
    if ("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);
    }
    return res.status(StatusCode.OK).json(result);
  }

  async getById(req: Request, res: Response) {
    //req.params refere-se a um parâmetro de rota
    //exemplo: /reviews/:id -> wwww.reviews.com/reviews/123 -> req.params.id = 123
    const { id } = req.params;

    const result = await this.reviewService.getById(id);

    if ("invalidIdError" in result) {
      return res.status(StatusCode.BAD_REQUEST).json(result);
    }

    if ("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);
    }

    return res.status(StatusCode.OK).json(result);
  }

  async create(req: Request, res: Response) {
    if (invalidBodyNewReview(req)) {
      res.status(StatusCode.BAD_REQUEST).json(invalidBodyError(req.body));
      return;
    }

    const { body } = req;

    //é uma linha tradicional de validação de dados

    const result = await this.reviewService.create(body, "");
    if ("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);
    }

    return res.status(StatusCode.CREATED).json(result);
  }

  async update(req: Request, res: Response) {
    // req.body -> Body/JSON
    // req.params -> URL Params
    // req.query  -> Query Params

    if (invalidBodyEditReview(req)) {
      res.status(StatusCode.BAD_REQUEST).json(invalidBodyError(req.body));
      return;
    }

    const { id } = req.params;
    const { body } = req;

    const result = await this.reviewService.update(id, body);

    if ("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);
    }

    if ("invalidIdError" in result) {
      return res.status(StatusCode.BAD_REQUEST).json(result);
    }

    return res.status(StatusCode.OK).json(result);
  }
}
