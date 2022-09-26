import { AnyItem } from "dynamoose/dist/Item";

export interface IGrant extends AnyItem {
  id: string;
  role: string;
  resource: string;
  action: string;
  attributes: string;
}
