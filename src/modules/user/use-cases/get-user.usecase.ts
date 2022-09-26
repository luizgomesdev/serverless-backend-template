import { IUser } from "@modules/user/domain/entities/user.entity";
import { userRepository } from "@modules/user/infra/dynamoose/repositories/user.repository";
import * as createHttpError from "http-errors";
import { IUserRepository } from "../domain/repositories/user.repository";

class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<Partial<IUser>> {
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new createHttpError.NotFound("User not found");
    }

    return user;
  }
}

export const getUserUseCase = new GetUserUseCase(userRepository);
