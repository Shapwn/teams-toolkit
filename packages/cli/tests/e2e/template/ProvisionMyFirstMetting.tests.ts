// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @author Ivan Chen <v-ivanchen@microsoft.com>
 */

import { expect } from "chai";
import fs from "fs-extra";
import path from "path";
import { it } from "@microsoft/extra-shot-mocha";
import {
  getTestFolder,
  cleanUp,
  setSimpleAuthSkuNameToB1Bicep,
  getSubscriptionId,
  readContextMultiEnv,
  readContextMultiEnvV3,
  getUniqueAppName,
} from "../commonUtils";
import { FrontendValidator } from "../../commonlib";
import { TemplateProject } from "../../commonlib/constants";
import { CliHelper } from "../../commonlib/cliHelper";
import { environmentManager } from "@microsoft/teamsfx-core/build/core/environment";
import { isV3Enabled } from "@microsoft/teamsfx-core";
describe("teamsfx new template", function () {
  const testFolder = getTestFolder();
  const subscription = getSubscriptionId();
  const appName = getUniqueAppName();
  const projectPath = path.resolve(testFolder, appName);
  const env = environmentManager.getDefaultEnvName();

  it(`${TemplateProject.MyFirstMetting}`, { testPlanCaseId: 15277468 }, async function () {
    if (isV3Enabled()) {
      await CliHelper.openTemplateProject(appName, testFolder, TemplateProject.MyFirstMetting);
      expect(fs.pathExistsSync(projectPath)).to.be.true;
      expect(fs.pathExistsSync(path.resolve(projectPath, "infra"))).to.be.true;
    } else {
      await CliHelper.createTemplateProject(appName, testFolder, TemplateProject.MyFirstMetting);
      expect(fs.pathExistsSync(projectPath)).to.be.true;
      expect(fs.pathExistsSync(path.resolve(projectPath, ".fx"))).to.be.true;
    }

    // Provision
    if (isV3Enabled()) {
    } else {
      await setSimpleAuthSkuNameToB1Bicep(projectPath, env);
      await CliHelper.setSubscription(subscription, projectPath);
    }
    await CliHelper.provisionProject(projectPath);

    // Validate Provision
    const context = isV3Enabled()
      ? await readContextMultiEnvV3(projectPath, env)
      : await readContextMultiEnv(projectPath, env);
    const frontend = FrontendValidator.init(context);
    await FrontendValidator.validateProvision(frontend);

    // deploy
    await CliHelper.deployAll(projectPath);
  });

  after(async () => {
    await cleanUp(appName, projectPath, false, false, false);
  });
});