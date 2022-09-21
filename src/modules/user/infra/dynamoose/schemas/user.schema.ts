import { Schema } from "dynamoose";
import { v4 as uuid } from "uuid";
export const userSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: uuid(),
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    saveUnknown: false,
  }
);
