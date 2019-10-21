// var _setImmediate = setImmediate;
// var _clearImmediate = clearImmediate;

// process.once('loaded', () => {
//   global.setImmediate = _setImmediate;
//   global.clearImmediate = _clearImmediate;
//   console.log('were');

//   const path = require("path");
//   const fs = require("fs");
//   const os = require("os");
//   const electron = require("electron");
//   const {
//     BrowserWindow
//   } = require('electron');
//   const shell = electron.shell;
//   const models = require('./models');
//   var ipc = electron.ipcRenderer;


//     ipc.on("print-to-pdf", function (event, arg) {
//       const pdfPath = path.join(os.homedir(), `${arg}.pdf`);
//       const wind = BrowserWindow.fromWebContents(event.sender);
//       wind.webContents.printToPDF({
//         printBackground: true,
//         marginsType: 1
//       }, function (error, data) {
//         if (error) {
//           throw error;
//         }
//         fs.writeFile(pdfPath, data, function (error) {
//           if (error) {
//             throw error;
//           }
//           shell.openExternal("file://" + pdfPath);
//           event.sender.send("wrote-pdf", pdfPath);
//         });
//       });
//     });

//     ipc.on('notify-user', function (event, arg) {
//       // models.notiFyUser(arg);
//     });
//   }
// );
