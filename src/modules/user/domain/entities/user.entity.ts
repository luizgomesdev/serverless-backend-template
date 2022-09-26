import { Exclude } from "class-transformer";
import { AnyItem } from "dynamoose/dist/Item";
import { RolesEnum } from "./../../../../shared/domain/enums/roles.enum";

export interface IUser extends AnyItem {
  id: string;
  name: string;
  email: string;
  password: string;
  role: RolesEnum;
  createdAt: Date;
  updatedAt: Date;
}

export class User implements Partial<IUser> {
  id: string;

  name: string;

  email: string;

  @Exclude()
  password: string;

  role: RolesEnum;

  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(data: Partial<IUser>) {
    Object.assign(this, data);
  }
}
