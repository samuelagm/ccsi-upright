// if (require("electron-squirrel-startup")) return;

const electron = require("electron");
const {
  app,
  BrowserWindow,
  Menu
} = require("electron");
const path = require("path");
const url = require("url");
const handleSquirrelEvent = require("./installer");
const models = require("./models");

if (handleSquirrelEvent(app)) {
  return;
}

let win;

let menu = models.menu;

function createWindow() {
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

  win = new BrowserWindow({
    center: true,
    darkTheme: true,
    width: 1000,
    height: 600,
    backgroundColor: "#39b34a",
    icon: `file://${__dirname}/dist/favicon.png`,
    show: false,
    autoHideMenuBar: false,
    webPreferences: {
      contextIsolation: false,
      webSecurity: false,
      nodeIntegration: false,
      // devTools: true,
      // preload: path.join(__dirname, 'preload.js')
    }
  });

  win.flashFrame(true);

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist", "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  win.once("focus", () => {
    win.flashFrame(true);
  });

  win.on("ready-to-show", function () {
    win.show();
    win.focus();
  });

  win.on("closed", function () {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (win === null) {
    createWindow();
  }
});
