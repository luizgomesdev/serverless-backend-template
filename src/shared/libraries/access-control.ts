import { getAllGrantsUseCase } from "@shared/use-cases/get-all-grants.usecase";
import { AccessControl } from "accesscontrol";

let grantsAcessControl: GrantsAcessControl;

class GrantsAcessControl {
  private accessControl = new AccessControl();

  async init() {
    if (this.accessControl) {
      console.info(`[GrantsAcessControl] Initializing grants.`);
      const grants = await getAllGrantsUseCase.execute();
      this.accessControl.setGrants(grants);
      console.info(`[GrantsAcessControl] Grants initialized.`);
    }
  }

  getAccessControl() {
    return this.accessControl;
  }
}

export const getAcessControl = async () => {
  if (!grantsAcessControl) {
    grantsAcessControl = new GrantsAcessControl();
    await grantsAcessControl.init();
  }

  return grantsAcessControl.getAccessControl();
};
