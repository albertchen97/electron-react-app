import { app, BrowserWindow } from "electron";
import path from "path";

type test = string;

app.on("ready", () => {
    // Create a main browswer window when the app is ready
    const mainWindow = new BrowserWindow({});

    // Load the index.html page
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
});
