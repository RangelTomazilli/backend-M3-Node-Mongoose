import { book } from "../factories/book.factory";
import { Router } from "express";

const express = require("express");
const app = express();
app.use(express.json());

export const booksRoutes = Router();

booksRoutes.get("/", book.getAll.bind(book));
booksRoutes.get("/:id", book.getById.bind(book));
booksRoutes.post("/", book.create.bind(book));
booksRoutes.put("/:id", book.update.bind(book));
booksRoutes.put("/:id/status", book.updateStatusBook.bind(book));
