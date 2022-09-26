import { Schema } from "dynamoose";
import { v4 as uuid } from "uuid";

export const grantSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: uuid(),
    },
    role: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    attributes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    saveUnknown: false,
  }
);
