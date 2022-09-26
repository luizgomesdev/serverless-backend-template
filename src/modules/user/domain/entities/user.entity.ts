import { AnyItem } from "dynamoose/dist/Item";
import { RolesEnum } from './../../../../shared/domain/enums/roles.enum';

export interface IUser extends AnyItem {
  id: string;
  name: string;
  email: string;
  password: string;
  role: RolesEnum;
  createdAt: Date;
  updatedAt: Date;
}
