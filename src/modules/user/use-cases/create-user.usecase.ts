import { userRepository } from "@modules/user/infra/dynamoose/repositories/user.repository";
import * as bcrypt from "bcryptjs";
import * as createError from "http-errors";
import { CreateUserDTO } from "../domain/dtos/createUser.dto";
import { IUser } from "../domain/entities/user.entity";
import { IUserRepository } from "../domain/repositories/user.repository";

class CreateUserUseCase {
  constructor(private readonly usersRepository: IUserRepository) {}

  async execute({ name, email, password }: CreateUserDTO): Promise<Partial<IUser>> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    console.info(`[CreateUserUseCase] User already exists: ${!!userAlreadyExists}`);
    if (userAlreadyExists) {
      throw new createError.BadRequest("Cannot create user, try again later.");
    }

    console.info(`[CreateUserUseCase] Creating user with email: ${email}`);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    console.info(`[CreateUserUseCase] User created with id: ${user.id}`);
    return user;
  }
}

export const createUserUseCase = new CreateUserUseCase(userRepository);
