import { fakeReviewData, updatedReview } from "./fake.review.data";
import { ReviewRepository } from "../repositories/reviews.repository"; //usado apenas para tipar

export const fakeReviewRepository = {
  getAll: () => Promise.resolve(fakeReviewData),
  getById: () => Promise.resolve(fakeReviewData[0]),
  create: () => Promise.resolve(fakeReviewData[1]),
  update: () => Promise.resolve(updatedReview),
} as unknown as ReviewRepository;

/*
O Repositorio falso/mock é encarregado de simular um repositorio real,
ele não se conecta com o banco de dados, ele apenas simula o comportamento.
dessa forma, podemos testar o serviço sem precisar de um banco de dados
*/
