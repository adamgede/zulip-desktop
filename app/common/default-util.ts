import fs from "node:fs";

import {app} from "dragonchat:remote";

let setupCompleted = false;

const dragonChatDirectory = app.getPath("userData");
const logDirectory = `${dragonChatDirectory}/Logs/`;
const configDirectory = `${dragonChatDirectory}/config/`;
export const initSetUp = (): void => {
  // If it is the first time the app is running
  // create dragon chat dir in userData folder to
  // avoid errors
  if (!setupCompleted) {
    if (!fs.existsSync(dragonChatDirectory)) {
      fs.mkdirSync(dragonChatDirectory);
    }

    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    // Migrate config files from app data folder to config folder inside app
    // data folder. This will be done once when a user updates to the new version.
    if (!fs.existsSync(configDirectory)) {
      fs.mkdirSync(configDirectory);
      const domainJson = `${dragonChatDirectory}/domain.json`;
      const settingsJson = `${dragonChatDirectory}/settings.json`;
      const updatesJson = `${dragonChatDirectory}/updates.json`;
      const windowStateJson = `${dragonChatDirectory}/window-state.json`;
      const configData = [
        {
          path: domainJson,
          fileName: "domain.json",
        },
        {
          path: settingsJson,
          fileName: "settings.json",
        },
        {
          path: updatesJson,
          fileName: "updates.json",
        },
      ];
      for (const data of configData) {
        if (fs.existsSync(data.path)) {
          fs.copyFileSync(data.path, configDirectory + data.fileName);
          fs.unlinkSync(data.path);
        }
      }

      // `window-state.json` is only deleted not moved, as the electron-window-state
      // package will recreate the file in the config folder.
      if (fs.existsSync(windowStateJson)) {
        fs.unlinkSync(windowStateJson);
      }
    }

    setupCompleted = true;
  }
};
