import { IUser } from "@modules/user/domain/entities/user.entity";
export interface LoginResponseDTO extends Partial<IUser> {
  token: string;
}
