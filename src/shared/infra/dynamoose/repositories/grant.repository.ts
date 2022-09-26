import { IGrant } from "@shared/domain/entities/grant.entity";
import { IGrantRepository } from "@shared/domain/repositories/grant.repository";
import { ConditionInitializer } from "dynamoose/dist/Condition";
import { ModelType } from "dynamoose/dist/General";
import * as createError from "http-errors";
import { GrantModel } from "../models/grant.model";

class GrantDynamooseRepository implements IGrantRepository {
  constructor(private readonly repository: ModelType<IGrant>) {}

  public async create(data: Partial<IGrant>): Promise<IGrant> {
    try {
      console.info(`[GrantRepository] Creating grant with role: ${data.role}`);
      const grant = await this.repository.create(data);
      return grant.toJSON() as IGrant;
    } catch (error) {
      console.error(`[GrantRepository] Error creating grant: ${JSON.stringify(error, null, 2)}`);
      throw new createError.BadRequest(error);
    }
  }
  public async update(data: IGrant): Promise<IGrant> {
    try {
      console.info(`[GrantRepository] Updating grant with role: ${data.role}`);
      const grant = await this.repository.update(data);
      return grant.toJSON() as IGrant;
    } catch (error) {
      console.error(`[GrantRepository] Error updating grant: ${JSON.stringify(error, null, 2)}`);
      throw new createError.BadRequest(error);
    }
  }
  public async delete(data: IGrant): Promise<string> {
    try {
      console.info(`[GrantRepository] Deleting grant with role: ${data.role}`);
      await this.repository.delete(data);
      return data.id;
    } catch (error) {
      console.error(`[GrantRepository] Error deleting grant id ${data.id}`);
      throw new createError.BadRequest(error);
    }
  }
  public async findOneByScan(condition: ConditionInitializer): Promise<IGrant> {
    try {
      const grant = await this.repository.scan(condition).exec();
      return grant.count != 0 ? (grant.toJSON() as IGrant) : null;
    } catch (error) {
      console.error(`[GrantRepository] Cannot find one by scan grant: ${JSON.stringify(error, null, 2)}`);
      throw new createError.BadRequest(error);
    }
  }
  public async findOneByQuery(condition: ConditionInitializer): Promise<IGrant> {
    try {
      const grant = await this.repository.query(condition).exec();
      return grant.count != 0 ? (grant.toJSON() as IGrant) : null;
    } catch (error) {
      console.error(`[GrantRepository] Cannot find one by query grant: ${JSON.stringify(error, null, 2)}`);
      throw new createError.BadRequest(error);
    }
  }
  public async findAll(): Promise<IGrant[]> {
    try {
      const grant = await this.repository.scan().all().exec();
      return grant.toJSON() as IGrant[];
    } catch (error) {
      console.error(`[GrantRepository] Cannot findAll grants: ${JSON.stringify(error, null, 2)}`);
      throw new createError.BadRequest(error);
    }
  }
}

export const grantDynamooseRepository = new GrantDynamooseRepository(GrantModel);
