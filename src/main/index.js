import { app, BrowserWindow } from 'electron'
const electron = require('electron')
const Menu = electron.Menu

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
    icon: '',
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
  let icon = ''
  if (process.platform === 'win32') {
    icon = 'D:\\前端\\program\\forudesigns\\electron-vue-admin\\src\\renderer\\assets\\灵能百分百第一季10.PNG'
  } else {
    icon = 'D:\\前端\\program\\forudesigns\\electron-vue-admin\\src\\renderer\\assets\\灵能百分百第一季10.PNG'
  }

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
  const template = [
    { label: '文件', submenu: [
      { label: '关于', role: 'about', // only mac
        click: () => {
          const aboutWin = new BrowserWindow({ width: 500, height: 300, parent: mainWindow, modal: true })
          aboutWin.loadURL('https://www.baidu.com')
        } },
      { type: 'separator' },
      { label: '关闭', accelerator: 'Command+Q', click: () => { mainWindow.close() } },
      { label: '打开', icon: icon },
      { label: '重做', role: 'rodo' }
    ] },
    { label: '编辑', submenu: [
      { label: '复制', click: () => { mainWindow.webContents.insertText('复制') } },
      { label: '剪贴', click: () => { mainWindow.webContents.insertText('剪贴') } },
      { type: 'separator' },
      { label: '查找', accelerator: 'Command+F', click: () => { mainWindow.webContents.insertText('查找') } },
      { label: '替换', accelerator: 'Command+R', click: () => { mainWindow.webContents.insertText('替换') } }
    ] },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function(item, focusedWindow) {
            if (focusedWindow) { focusedWindow.reload() }
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (function() {
            if (process.platform === 'darwin') { return 'Ctrl+Command+F' } else { return 'F11' }
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: (function() {
            if (process.platform === 'darwin') return 'Alt+Command+I'; else return 'Ctrl+Shift+I'
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow) focusedWindow.toggleDevTools()
          }
        }
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        }
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: function() { require('electron').shell.openExternal('http://electron.atom.io') }
        }
      ]
    },
    { label: '我的菜单',
      submenu: [
        // 多选
        {
          label: '多选1',
          type: 'checkbox'
        },
        {
          label: '多选2',
          type: 'checkbox'
        },
        // 单选
        {
          label: '单选1',
          type: 'radio'
        },
        {
          label: '单选2',
          type: 'radio'
        },
        {
          label: 'windows',
          type: 'submenu',
          role: 'windowMenu'
        }
      ]
    }
  ]
  // 如果是苹果系统
  if (process.platform === 'darwin') {
    // 添加mac 特有菜单页面
    var name = require('electron').remote.app.getName()
    template.unshift({
      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() {
            app.quit()
          }
        }
      ]
    })
    // Window menu.
    template[3].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    )
  }
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
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
