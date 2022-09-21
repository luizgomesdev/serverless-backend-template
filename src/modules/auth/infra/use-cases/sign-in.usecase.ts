import { LoginDTO } from "@modules/auth/domain/dtos/login.dto";
import { LoginResponseDTO } from "@modules/auth/domain/dtos/loginResponse.dto";
import { IUserRepository } from "@modules/user/domain/repositories/user.repository";
import { userRepository } from "@modules/user/infra/dynamoose/repositories/user.repository";
import * as bycrypt from "bcryptjs";
import * as createError from "http-errors";
import { sign } from "jsonwebtoken";

export class SignInUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email, password }: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new createError.BadRequest("Email or password is incorrect.");
    }

    const isPasswordValid = await bycrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new createError.BadRequest("Email or password is incorrect. ");
    }

    const token = sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export const signInUseCase = new SignInUseCase(userRepository);
