const electron = require("electron");
// expose the main process's context in main world via "electronApi"
electron.contextBridge.exposeInMainWorld("electronApi", {
  // subscribe to statistics events and render the window with statistics wrapped in the callback
  subscribeStatistics: (callback: (statisticsEvents: any) => void) => {
    electron.ipcRenderer.on("statisticsEvents", (_, stats) => {
      callback(stats);
    });
  },
  // when invoked, send an async requst to main process via the "getStaticData" channel and return with the resolved value
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
});
