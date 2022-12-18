import { Router } from "express";
import { review } from "../factories/reviews.factory";

const express = require("express");
const app = express();
app.use(express.json());

export const reviewsRoutes = Router();

reviewsRoutes.get("/", review.getAll.bind(review));
reviewsRoutes.get("/:id", review.getById.bind(review));
reviewsRoutes.post("/", review.create.bind(review));
reviewsRoutes.put("/:id", review.update.bind(review));
