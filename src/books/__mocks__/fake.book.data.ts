import { Book } from "../models/book.model";

export const fakeId = "632130d41623c49bf7b1c7e9";

export const fakeBookData: Book[] = [
  {
    title: "O Hobbit",
    criationDate: "01/01/1937",
    language: ["Inglês", "Português", "Italiano"],
    status: true,
    author: "J.R. Tolkien",
  },
  {
    title: "O Senhor dos Anéis",
    criationDate: "01/01/1955",
    language: ["Inglês", "Português", "Italiano"],
    status: true,
    author: "J.R.R. Tolkien",
  },
  {
    title: "O Silmarillion",
    criationDate: "01/01/1977",
    language: ["Inglês", "Português", "Italiano"],
    status: true,
    author: "J.R.R. Tolkien",
  },
  {
    title: "Os Filhos de Húrin",
    criationDate: "01/01/2007",
    language: ["Inglês", "Português", "Italiano"],
    status: true,
    author: "J.R.R. Tolkien",
  },
  {
    title: "Beren e Lúthien",
    criationDate: "01/01/2017",
    language: ["Inglês", "Português", "Italiano"],
    status: true,
    author: "J.R.R. Tolkien",
  },
  {
    title: "A Queda de Gondolin",
    criationDate: "01/01/2018",
    language: ["Inglês", "Português", "Italiano"],
    status: true,
    author: "J.R.R. Tolkien",
  },
  {
    title: "Contos Inacabados",
    criationDate: "01/01/1980",
    language: ["Inglês", "Português", "Italiano"],
    status: true,
    author: "J.R.R. Tolkien",
  },
  {
    title: "H. P. e a Pedra Filosofal",
    criationDate: "01/01/2000",
    language: ["Inglês", "Português", "Italiano"],
    status: true,
    author: "J.K Rowling",
  },
  {
    title: "H. P. e a Câmara Secreta",
    criationDate: "19/06/2000",
    language: ["Inglês", "Português", "Italiano"],
    status: true,
    author: "J.K Rowling",
  },
  {
    title: "H. P. e o Prisioneiro de Azkaban",
    criationDate: "01/12/2000",
    language: ["Inglês", "Português", "Italiano"],
    status: true,
    author: "J.K Rowling",
  },
];

export const updatedBook: Book = {
  title: "H. P. e o Prisioneiro de Azkaban",
  criationDate: "01/12/2000",
  language: ["Inglês", "Português", "Italiano", "Alemão"],
  status: true,
  author: "J.K Rowling",
};
