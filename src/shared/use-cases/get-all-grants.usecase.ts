import { IGrantRepository } from "@shared/domain/repositories/grant.repository";
import { grantDynamooseRepository } from "@shared/infra/dynamoose/repositories/grant.repository";


export class GetAllGrantsUseCase {
  constructor(private readonly grantRepository: IGrantRepository) {}

  execute() {
    return this.grantRepository.findAll();
  }
}

export const getAllGrantsUseCase = new GetAllGrantsUseCase(grantDynamooseRepository);
