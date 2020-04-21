import { app, BrowserWindow } from 'electron'
// const electron = require('electron')
// const Menu = electron.Menu
// const menuTemplate = require('./menuTemplate')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  // 设置窗口
  mainWindow = new BrowserWindow({
    // 页面先隐藏，等装载
    show: false,
    // 设置 icon
    // icon: '',
    // 全屏窗口， 要充满这个桌面，请去除最大宽和最大高
    // fullscreen: true,
    // 锁定模式 需要配合fullscreen: true, .setkiosk()
    // kiosk: true,
    // 在mac os 上会阻止单击最大化隐藏
    // fullscreenable: false,
    // 指定宽高
    height: 563,
    width: 1000,
    useContentSize: true,
    minHeight: 400,
    minWidth: 700,
    // maxHeight: 600,
    // maxWidth: 1100,
    // 指定初始位置
    // x: 20,
    // y: 20,
    // 无边框
    // frame: false,
    // 透明
    // transparent: true,
    // 跨域请求
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })
  // 注意 图标按照原尺寸显示 建议16*16 像素比
  // let icon = ''
  // if (process.platform === 'win32') {
  //   icon = 'D:\\前端\\program\\forudesigns\\electron-vue-admin\\src\\renderer\\assets\\灵能百分百第一季10.PNG'
  // } else {
  //   icon = 'D:\\前端\\program\\forudesigns\\electron-vue-admin\\src\\renderer\\assets\\灵能百分百第一季10.PNG'
  // }

  // 绑定点击事件
  mainWindow.on('closed', () => {
    console.log('closed')
    mainWindow = null
  })

  // 页面装载完显示窗口
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 设置全屏
  // mainWindow.setFullScreen(true)

  mainWindow.loadURL(winURL)

  // 使用模板创建应用菜单
  // const menu = Menu.buildFromTemplate(menuTemplate)
  // Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow)
// 所有窗口关闭
app.on('window-all-closed', () => {
  // 表示不是苹果平台
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
// 激活 苹果系统触发
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
