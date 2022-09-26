import { ConditionInitializer } from "dynamoose/dist/Condition";
import { IGrant } from "../entities/grant.entity";

export interface IGrantRepository {
  create(data: Partial<IGrant>): Promise<IGrant>;
  update(data: IGrant): Promise<IGrant>;
  delete(data: IGrant): Promise<string>;
  findOneByScan(condition: ConditionInitializer): Promise<IGrant>;
  findOneByQuery(condition: ConditionInitializer): Promise<IGrant>;
  findAll(): Promise<IGrant[]>;
}
