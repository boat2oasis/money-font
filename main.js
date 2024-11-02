const { app, BrowserWindow } = require('electron')
const path = require('path');
const { useCookie } = require('./useCookie');
useCookie();
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false, // 关闭 Web 安全性检查
    },
    autoHideMenuBar: true, // 隐藏菜单栏
  })
// win.loadURL('http://127.0.0.1:4000/') // 启动该项目的服务地址
   win.loadFile('dist/index.html') // 指向打包后的地址，使用vite需要build后再preview才能正常显示
   //win.loadFile(path.join(__dirname, './dist/index.html'));
 //  const devServerURL = 'http://localhost:4200';
 // win.loadURL(devServerURL);
}

app.whenReady().then(() => {
  createWindow()
})