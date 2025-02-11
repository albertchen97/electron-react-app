import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { pollResources } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";

app.on("ready", () => {
  // Create a main browswer window when the app is ready
  const mainWindow = new BrowserWindow({
    webPreferences: {
      // use a preload script to handle IPC
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    // frontend DX improvement: load the Vite server HMR-hosted frontend part
    mainWindow.loadURL("http://localhost:5123");
  } else {
    // load from the distribution directory
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  pollResources(mainWindow);
});
