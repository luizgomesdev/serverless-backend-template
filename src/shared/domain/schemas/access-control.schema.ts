import { AcessControlActionsEnum } from '../enums/actions.enum';
import { ResourcesEnum } from '../enums/resources.enum';
import { RolesEnum } from './../enums/roles.enum';

export interface AccessControlSchema {
    role?: RolesEnum;
    resource: ResourcesEnum;
    action: AcessControlActionsEnum;
}