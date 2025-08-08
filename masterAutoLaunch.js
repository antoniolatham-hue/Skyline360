// Cobex App Launcher Script (Easy Setup)
// Place this in your main workspace folder and run: `node masterAutoLaunch.js`
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Add all your app folders here
const apps = ['Vault360', 'SkyLink360', 'CoreEngineerAI'];

apps.forEach(app => {
  const appPath = path.join(__dirname, app);
  const packageJsonPath = path.join(appPath, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.log(`Skipping ${app}: No package.json found.`);
    return;
  }

  console.log(`Installing dependencies for ${app}...`);
  exec(`cd ${appPath} && npm install`, (installErr, installOut, installErrOut) => {
    if (installErr) {
      console.error(`Failed to install ${app}:`, installErrOut);
      return;
    }

    console.log(`Installed ${app}:\n`, installOut);
    console.log(`Starting ${app}...`);
    exec(`cd ${appPath} && npm start`, (startErr, startOut, startErrOut) => {
      if (startErr) {
        console.error(`Failed to start ${app}:`, startErrOut);
        return;
      }

      console.log(`Running ${app}:\n`, startOut);
    });
  });
});
