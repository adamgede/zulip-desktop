import {app} from "electron/main";
import process from "node:process";

import AutoLaunch from "auto-launch";

import * as ConfigUtil from "../common/config-util.js";

export const setAutoLaunch = async (
  AutoLaunchValue: boolean,
): Promise<void> => {
  // Don't run this in development
  if (!app.isPackaged) {
    return;
  }

  const autoLaunchOption = ConfigUtil.getConfigItem(
    "startAtLogin",
    AutoLaunchValue,
  );

  // `setLoginItemSettings` doesn't support linux
  if (process.platform === "linux") {
    const dragonChatAutoLauncher = new AutoLaunch({
      name: "Dragon Chat",
      isHidden: false,
    });
    await (autoLaunchOption
      ? dragonChatAutoLauncher.enable()
      : dragonChatAutoLauncher.disable());
  } else {
    app.setLoginItemSettings({
      openAtLogin: autoLaunchOption,
      openAsHidden: false,
    });
  }
};
