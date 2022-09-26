import { CreateUserDTO } from "@modules/user/domain/dtos/createUser.dto";
import { IUser } from "@modules/user/domain/entities/user.entity";
import { ModelType } from "dynamoose/dist/General";
import * as createError from "http-errors";
import { UserModel } from "../models/user.model";
import { IUserRepository } from "./../../../domain/repositories/user.repository";

export default class UserRepository implements IUserRepository {
  constructor(private readonly repository: ModelType<IUser>) {}

  async create(data: Partial<CreateUserDTO>): Promise<Partial<IUser>> {
    try {
      console.info(`[UserRepository] Creating user with email: ${data.email}`);
      const user = await this.repository.create(data);
      return user.toJSON() as IUser;
    } catch (error) {
      console.error(`[UserRepository] Error creating user: ${JSON.stringify(error, null, 2)}`);
      throw new createError.BadRequest(error);
    }
  }

  async findByEmail(email: string): Promise<Partial<IUser> | null> {
    try {
      console.info(`[UserRepository] Finding user with email: ${email}`);
      const user = await this.repository.query("email").eq(email).exec();
      return user.count != 0 ? (user.toJSON()[0] as IUser) : null;
    } catch (error) {
      console.error(`[UserRepository] Error finding user: ${JSON.stringify(error, null, 2)}`);
      throw new createError.BadRequest(error);
    }
  }

  async findById(id: string): Promise<Partial<IUser> | null> {
    try {
      console.info(`[UserRepository] Finding user with id: ${id}`);
      const user = await this.repository.query("id").eq(id).exec();
      return user.count != 0 ? (user.toJSON()[0] as IUser) : null;
    } catch (error) {
      console.error(`[UserRepository] Error finding user: ${JSON.stringify(error, null, 2)}`);
      throw new createError.BadRequest(error);
    }
  }
}

export const userRepository = new UserRepository(UserModel);
