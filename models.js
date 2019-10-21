// const path = require("path");
const electron = require("electron");
const { app } = require("electron");
// const { app, BrowserWindow, Menu } = require("electron");

module.exports = {
  menu: [
    {
      label: "View",
      submenu: [
        {
          role: "resetzoom",
          accelerator: "CmdOrCtrl+R"
        },
        {
          role: "zoomin",
          accelerator: "CmdOrCtrl+up"
        },
        {
          role: "zoomout",
          accelerator: "CmdOrCtrl+down"
        },
        {
          type: "separator"
        },
        {
          role: "togglefullscreen",
          accelerator: "CmdOrCtrl+F"
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        {
          label: "Cut",
          accelerator: "CmdOrCtrl+X",
          role: "cut"
        },
        {
          label: "Copy",
          accelerator: "CmdOrCtrl+C",
          role: "copy"
        },
        {
          label: "Paste",
          accelerator: "CmdOrCtrl+V",
          role: "paste"
        },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          role: "selectall"
        }
      ]
    },
    {
      label: "Window",
      role: "window",
      submenu: [
        {
          label: "Minimize",
          accelerator: "CmdOrCtrl+M",
          role: "minimize"
        },
        {
          label: "Quit",
          accelerator: "CmdOrCtrl+W",
          role: "close"
        },
        {
          type: "separator"
        },
        {
          label: "Reopen Window",
          accelerator: "CmdOrCtrl+Shift+T",
          enabled: true,
          key: "reopenMenuItem",
          click: function() {
            app.emit("activate");
          }
        }
      ]
    },
    {
      label: "Help",
      role: "help",
      submenu: [
        {
          label: "About Us",
          click: function() {
            electron.shell.openExternal("https://www.google.com/search?sxsrf=ACYBGNSuW-nkSs5o8GTnpPM4a3NH1SD30g%3A1571653470511&source=hp&ei=XoetXa_LHIOwkwW6jZjgBQ&q=ccsi+nigeria&oq=ccsi+nigeria&gs_l=psy-ab.12...0.0..5747...0.0..0.0.0.......0......gws-wiz.&ved=0ahUKEwiv8sS2ka3lAhUD2KQKHboGBlwQ4dUDCAo");
          }
        }
      ]
    }
  ]
};
