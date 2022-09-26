import { CreateUserDTO } from "../dtos/createUser.dto";
import { IUser } from "../entities/user.entity";

export interface IUserRepository {
  create(data: Partial<CreateUserDTO>): Promise<Partial<IUser>>;
  findByEmail(email: string): Promise<Partial<IUser> | null>;
  findById(id: string): Promise<Partial<IUser> | null>;
}
