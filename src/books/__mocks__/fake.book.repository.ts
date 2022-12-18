import { fakeBookData, updatedBook } from "./fake.book.data";
import { BookRepository } from "../repositories/book.repository"; //usado apenas para tipar

export const fakeBookRepository = {
  getAll: () => Promise.resolve(fakeBookData),
  getById: () => Promise.resolve(fakeBookData[0]),
  getByAuthor: () => Promise.resolve(fakeBookData),
  create: () => Promise.resolve(fakeBookData[1]),
  update: () => Promise.resolve(updatedBook),
  updateStatusBook: () => Promise.resolve(updatedBook),
} as unknown as BookRepository;

/*
O Repositorio falso/mock é encarregado de simular um repositorio real,
ele não se conecta com o banco de dados, ele apenas simula o comportamento.
dessa forma, podemos testar o serviço sem precisar de um banco de dados
*/
