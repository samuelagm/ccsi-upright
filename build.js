var electronInstaller = require("electron-winstaller");

var settings = {
  appDirectory: "./UPRIGHTNGwin32ia32",
  outputDirectory: "releases",
  exe: 'UPRIGHTNG.exe',
  title: 'UPRIGHT_NG_DASHBOARD',
  description: 'Demo App',
  arch: 'ia32',
  name: "UPRIGHT_NG_DASHBOARD"
};

// version: '1.1.0.0'
resultPromise = electronInstaller.createWindowsInstaller(settings);

resultPromise.then(
  () => {
    console.log("The installers of your application were succesfully created !");
  },
  e => {
    console.log(`Installer couldn't be created: ${e.message}`);
  }
);
