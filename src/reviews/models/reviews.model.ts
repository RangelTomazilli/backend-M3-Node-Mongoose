import { Schema, model, Model, InferSchemaType } from "mongoose";

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 24,
      unique: true,
    },
    review: {
      type: [String],
      required: true,
      maxlength: 200,
    },
    editDate: {
      type: [Date],
      required: true,
    },
    rate: {
      type: Number,
      min: 1,
      max: 5,
      require: true,
    },
  },
  {
    //cria atomaticamente as dates (createtedAt, UpdatedAt já temos salvo acima)
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export type Review = InferSchemaType<typeof reviewSchema>;

export const ReviewModel: Model<Review> = model("Review", reviewSchema);
