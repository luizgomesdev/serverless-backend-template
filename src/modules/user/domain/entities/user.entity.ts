import { AnyItem } from "dynamoose/dist/Item";

export interface IUser extends AnyItem {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
