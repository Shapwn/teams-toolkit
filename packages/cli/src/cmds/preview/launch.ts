// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Colors, FxError, Result, err, ok } from "@microsoft/teamsfx-api";
import { HubTypes } from "@microsoft/teamsfx-core";
import { logger } from "../../commonlib/logger";
import { TelemetryEvent } from "../../telemetry/cliTelemetryEvents";
import CLIUIInstance from "../../userInteraction";
import { getColorizedString } from "../../utils";
import * as commonUtils from "./commonUtils";
import * as constants from "./constants";
import { OpeningBrowserFailed } from "./errors";
import { localTelemetryReporter } from "./localTelemetryReporter";

export async function openHubWebClientNew(
  hub: HubTypes,
  url: string,
  browser: constants.Browser,
  browserArguments: string[] = [],
  telemetryProperties?: { [key: string]: string } | undefined
): Promise<void> {
  if (telemetryProperties !== undefined) {
    await localTelemetryReporter.runWithTelemetryProperties(
      TelemetryEvent.PreviewSideloading,
      telemetryProperties,
      () => _openHubWebClientNew(hub, url, browser, browserArguments)
    );
  } else {
    await _openHubWebClientNew(hub, url, browser, browserArguments);
  }
}

async function _openHubWebClientNew(
  hub: HubTypes,
  url: string,
  browser: constants.Browser,
  browserArguments: string[] = []
): Promise<Result<undefined, FxError>> {
  const message = [
    {
      content: `${hub} web client is being launched for you to preview the app: `,
      color: Colors.WHITE,
    },
    {
      content: url,
      color: Colors.BRIGHT_CYAN,
    },
  ];
  logger.info(getColorizedString(message));

  const previewBar = CLIUIInstance.createProgressBar(constants.previewTitle, 1);
  await previewBar.start(constants.previewStartMessage);
  await previewBar.next(constants.previewStartMessage);
  try {
    await commonUtils.openBrowser(browser, url, browserArguments);
  } catch {
    const error = OpeningBrowserFailed(browser);
    logger.warning(constants.openBrowserHintMessage);
    await previewBar.end(false);
    return err(error);
  }
  await previewBar.end(true);
  return ok(undefined);
}

export async function openTeamsDesktopClient(
  url: string,
  username: string,
  telemetryProperties?: { [key: string]: string } | undefined
): Promise<void> {
  if (telemetryProperties !== undefined) {
    await localTelemetryReporter.runWithTelemetryProperties(
      TelemetryEvent.PreviewTeamsDesktopClient,
      telemetryProperties,
      () => _openTeamsDesktopClient(url, username)
    );
  } else {
    await _openTeamsDesktopClient(url, username);
  }
}

async function _openTeamsDesktopClient(
  url: string,
  username: string
): Promise<Result<undefined, FxError>> {
  const message = [
    {
      content: `Teams desktop client is being launched for you to preview the app: `,
      color: Colors.WHITE,
    },
    {
      content: url,
      color: Colors.BRIGHT_CYAN,
    },
  ];
  logger.info(getColorizedString(message));

  const desktopDebugHelpMessage = [
    {
      content: `Before proceeding, make sure your Teams desktop login matches your current Microsoft 365 account${username} used in Teams Toolkit.`,
      color: Colors.WHITE,
    },
  ];
  logger.info(getColorizedString(desktopDebugHelpMessage));

  const previewBar = CLIUIInstance.createProgressBar(constants.previewTitle, 1);
  await previewBar.start(constants.previewTeamsDesktopClientMessage);
  await previewBar.next(constants.previewTeamsDesktopClientMessage);
  try {
    await commonUtils.openBrowser(browser, url, browserArguments);
  } catch {
    const error = OpeningBrowserFailed(browser);
    logger.warning(constants.openBrowserHintMessage);
    await previewBar.end(false);
    return err(error);
  }
  await previewBar.end(true);
  return ok(undefined);
}