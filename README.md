##To run the app, run on command line:
npm run electron:serve

##How to create an app that uses both Electron and React:

1. Change directory to your development folder: **cd ~/development**
2. Create a React app: **npx create-react-app electron-react**
3. cd electron-react.
4. Install Electron and other packages: **npm install electron concurrently wait-on cross-env**
5. Add three scripts to scripts section of the package.json file:
```
    "electron:serve": "concurrently -k \"cross-env BROWSER=none npm run start\" \"npm run electron:start\"",
    "electron:build": "npm run build && electron-builder -c.extraMetadata.main=build/main.js",
    "electron:start": "wait-on http://localhost:3000 && electron ."
```
The **Concurrently npm package** allows us to spin up both React and Electron processes. The -k option kills the other processes if anyone of them fails.

Since we don't want React to open the app in the browser we can use the **cross-env npm package** to set the browser to none.

We use the **wait-on npm package** to make sure React is running on port 3000 before we start Electron.

6. When Electron starts it will look in the package.json file for the JavaScript entry point. Create a main.js file in the public folder and set the main property to it:
```
"main": "public/main.js",*
"homepage": "./",*
```
7. The main.js file should contain the following code:

```
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev')
const path = require('path');

// Electron's libarray to enable IPC communication snd allow a React process to send events to the Electron process. 
require('@electron/remote/main').initialize(); 

function createWindow() 
{
    const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        enableRemoteModule: true
    }
});

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () =>
{
    if (process.platform !== 'darwin')
    {
        app.quit();
    }
});

app.on('activate', () =>
{
    if (BrowserWindow.getAllWindows().length === 0)
    {
        createWindow();
    }
});
```
8. Install build npm packages: **npm install electron-builder electron-is-dev @electron/remote**
9. Add a build section to the package.json file:
```
"build": {
    "extends": null,
    "appId": "com.leon.electron-react",
    "files": [
      "dist/**/*",
      "build/**/*",
      "node_modules/**/*",
      "package.json"
    ],
    "directories": {
      "buildResources": "assets"
    }
  }
```
10. Delete the following redundant files:
```
    public/electron.js
    public/preload.js
    public/reportWebVitals.js
    public/logo192.png
    public/logo512.png
    public/manifest.json
    public/robots.txt
    public/favicon.ico
    src/App.css
    src/App.test.js
    src/index.css
    src/logo.svg
    src/reportWebVitals.js
    src/setupTests.js
```

11. Remove the above deleted file references from index.html and simplify html:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>INSERT APP NAME HERE</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

12. To build files in the ./build directory run command: **npm run electron:build**

13. To run the app, run on command line: **npm run electron:serve**


 


