// import { Menu, Tray, BrowserWindow } from 'electron'
// const remote = require('electron').remote
// const win = remote.getCurrentWindow()
// const dialog = remote.dialog
// const electron = require('electron')
// const { webFrame } = require('electron')
// const MenuItem = remote.MenuItem
// const fs = require('fs')
//
// // Browserwindow创建父子窗口
// function createWindow() {
//   const parentWin = new BrowserWindow()
//   const childWin = new BrowserWindow({ parent: parentWin, width: 100, height: 100 })
//   // model窗口
//   // const childWin = new BrowserWindow({ parent: parentWin, width: 100, height: 100 ， model: true})
//   parentWin.loadFile('')
//   childWin.loadFile('')
//
//   parentWin.on('closed', () => {
//     console.log('closed')
//     // parentWin = null
//   })
//   childWin.on('closed', () => {
//     console.log('closed')
//     // childWin = null
//   })
// }
// // eval方法向子窗口传递数据
// function evalMessage() {
//   win.eval()
// }
// // Browserwindow创建一个窗口,并跳转到指定页面
// function createWin() {
//   if (global.windows === undefined) {
//     global.windows = []
//   }
//   const win = new BrowserWindow({
//     show: false,
//     x: 10,
//     y: 20,
//     width: 400,
//     heght: 400
//   })
//   global.windows.push(win)
//   const windowsHref = window.location.href
//   const locationURL = windowsHref.substring(0, windowsHref.indexOf('#') + 1)
//   const url = `/pms/product`
//   win.loadURL(locationURL + url)
//   // win.loadURL('https://github.com')
//   win.on('ready-to-show', () => {
//     win.show()
//   })
// }
// // window.open 创建一个窗口
// function WindowOpen() {
//   const windowsHref = window.location.href
//   const locationURL = windowsHref.substring(0, windowsHref.indexOf('#') + 1)
//   const url = `/pms/product`
//   window.open(locationURL + url)
// }
// // 关闭主窗口外的窗口
// function close_allWin_exceptMain() {
//   if (global.windows !== undefined) {
//     for (let i = 0; i < global.windows.length; i++) {
//       global.windows[i].close()
//     }
//     global.windows.length = 0
//     global.windows = undefined
//   }
// }
// // 获取当前窗口
// function GetSizePosition() {
//   // 获取窗口宽度
//   console.log('宽度:' + win.getSize()[0])
//   // 获取窗口高度
//   console.log('高度:' + win.getSize()[1])
//   // 获取窗口位置X
//   console.log('X:' + win.getPosition()[0])
//   // 获取窗口位置Y
//   console.log('Y:' + win.getPosition()[1])
// }
// // 切换全屏
// export function fullscreen() {
//   if (win.isKiosk()) {
//     console.log('dfsf')
//     win.setKiosk(false)
//   } else {
//     console.log('dfsf')
//     win.setKiosk(true)
//   }
// }
// // 动态设置图片
// export function changeIcon() {
//   // 非苹果系统适用
//   if (process.platform !== 'darwin') {
//     win.setIcon('..\\renderer\\灵能百分百第一季10.PNG')
//   }
// }
// // 系统通知
// const myNotification = new Notification('标题', {
//   body: '通知正文内容'
// })
// myNotification.onclick = () => {
//   console.log('通知被点击')
// }
// // 关闭当前窗口
// function closeWin() {
//   const win = remote.getCurrentWindow()
//   win.close()
// }
// // 打开dialog对话框
// function openDialog() {
//   dialog.showOpenDialog({
//     // 只打开文件
//     properties: ['openfile']
//   })
// }
// // 打开定制对话框 选择文件
// function CustomOpenFile() {
//   const options = {}
//   // 设置windows标题
//   options.title = '打开文件'
//   // 设置苹果标题
//   options.message = '打开我的文件'
//   options.buttonLabel = '选择'
//   // 设置默认路径
//   options.defaultPath = 'D:\\'
//   options.properties = ['openfile']
//   options.filters = [
//     { name: '图像文件', extensions: ['jpg', 'bmp', 'png', 'gif'] },
//     { name: '视频文件', extensions: ['mp4', 'mkv', 'avi'] },
//     { name: '音频文件', extensions: ['mp3', 'wav'] },
//     { name: '所有文件（*.*）', extensions: ['*'] }
//   ]
//   dialog.showOpenDialog(options)
// }
// // 选择目录
// function chooseDirectory() {
//   const options = {}
//   // 设置windows标题
//   options.title = '选择目录'
//   // 设置苹果标题
//   options.message = '选择目录'
//   options.buttonLabel = '选择'
//   // createDirectory 只针对mac
//   options.properties = ['openDirectory', 'createDirectory']
//   dialog.showOpenDialog(options)
// }
// // 选择多个文件
// function multiSelection() {
//   const options = {}
//   // 设置windows标题
//   options.title = '选择多个文件和目录'
//   // 设置苹果标题
//   options.message = '选择多个文件和目录'
//   options.buttonLabel = '选择'
//   // createDirectory 只针对mac
//   options.properties = ['openFile', 'openDirectory', 'createDirectory', 'multiSelections']
//   if (process.platform === 'darwin') {
//     options.properties = ['openDirectory']
//   }
//   dialog.showOpenDialog(options)
// }
// // 通过回调函数返回选择结果
// function chooseCallback() {
//   const options = {}
//   // 设置windows标题
//   options.title = '选择多个文件和目录'
//   // 设置苹果标题
//   options.message = '选择多个文件和目录'
//   options.buttonLabel = '选择'
//   // createDirectory 只针对mac
//   options.properties = ['openFile', 'openDirectory', 'createDirectory', 'multiSelections']
//   if (process.platform === 'darwin') {
//     options.properties = ['openDirectory']
//   }
//   dialog.showOpenDialog(options, (filePaths) => {
//     for (let i = 0; i < filePaths.length; i++) {
//       console.log(filePaths[i] + '\r\n')
//     }
//   })
// }
// // 保存文件
// function saveFile() {
//   const options = {}
//   options.title = '保存文件'
//   options.buttonLabel = '保存'
//   options.defaultPath = '.'
//   options.nameFieldLabel = '输入文件名:'
//   options.filters = [
//     { name: '图像文件', extensions: ['jpg', 'bmp', 'png', 'gif'] },
//     { name: '视频文件', extensions: ['mp4', 'mkv', 'avi'] },
//     { name: '音频文件', extensions: ['mp3', 'wav'] },
//     { name: '所有文件（*.*）', extensions: ['*'] }
//   ]
//   dialog.showSaveDialog(options, filename => {
//     console.log(filename)
//   })
// }
// // 消息对话框
// function MessageBox() {
//   const options = {}
//   options.title = '信息'
//   options.message = '这是一个消息对话框'
//   options.buttons = ['按钮1', '按钮2']
//   options.icon = 'D:\\前端\program\forudesigns\electron-vue-admin\src\renderer\assets\\灵能百分百第一季10.PNG'
//   options.type = 'info'
//   // options.type = 'error'
//   // options.type = 'question'
//   // options.type = 'warning'
//   dialog.showMessageBox(options, res => {
//     console.log(res)
//   })
// }
// // 错误对话框
// function ErrorBox() {
//   dialog.showErrorBox('错误', '这是个错误')
// }
// // win获取窗口焦点
// function winFocus() {
//   win.focus()
// }
// // win失去窗口焦点
// function winBlur() {
//   win.blur()
// }
// // 打印对话框
// function winPrint() {
//   win.print()
// }
// // postMessage 发送数据
// function postMessage() {
//   win.postMessage()
// }
// // 放大页面
// function ZoomIn() {
//   // 每增加或减少1 放大或缩小20%
//   webFrame.setZoomLevel(webFrame.getZoomLevel() + 1)
// }
// // 缩小页面
// function ZoomOut() {
//   // 每增加或减少1 放大或缩小20%
//   webFrame.setZoomLevel(webFrame.getZoomLevel() - 1)
// }
// // 获取屏幕尺寸
// function getScreen() {
//   const win = remote.getCurrentWindow()
//   const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
//   console.log('width:' + width)
//   console.log('height' + height)
//   win.setSize(width, height, true)
//   // win.setPosition(0, 0)
//   // 获取鼠标绝对值
//   console.log('x:' + electron.screen.getCursorScreenPoint().x)
//   console.log('y:' + electron.screen.getCursorScreenPoint().y)
// }
// // 设置进度条
// function setProgress() {
//   const win = remote.getCurrentWindow()
//   win.setProgressBar(0.3)
// }
//
// function saveClick() {
//   const win = new BrowserWindow({ width: 300, height: 200 })
//   win.loadURL('http://www.baidu.com')
// }
//
// const customMenu = new Menu()
// // 动态创建菜单-1
// function AllOriginenu() {
//   const menu = new Menu()
//   const icon = 'D:\\前端\\program\\forudesigns\\electron-vue-admin\\src\\renderer\\assets\\灵能百分百第一季10.PNG'
//   const menuitemOpen = new MenuItem({ label: '打开', icon: icon })
//   const menuitemSave = new MenuItem({ label: '保存', click: saveClick() })
//   const menuitemFile = new MenuItem({ label: '文件', submenu: [menuitemOpen, menuitemSave] })
//
//   const menuItemCustom = new MenuItem({ label: '定制菜单', submenu: customMenu })
//   menu.append(menuitemFile)
//   menu.append(menuItemCustom)
//   Menu.setApplicationMenu(menu)
// }
// // 动态创建菜单-2
// function AddMenuItem() {
//   const type = 'normal'
//   if (radio.checked) {
//     type = 'radio'
//   }
//   if (checkbox.checked) {
//     type = 'checked'
//   }
//   customMenu.append(new MenuItem({ label: '菜单'.value, type: type }))
//   // menuitem.value = ''
//   radios.checked = false
//   checkbox.checked = false
//   Menu.setApplicationMenu(Menu.getApplicationMenu())
// }
//
// // 上下文菜单
// function onload() {
//   const menu = new Menu()
//   let icon = ''
//   if (process.platform === 'win32') {
//     icon = 'D:\\前端\\program\\forudesigns\\electron-vue-admin\\src\\renderer\\assets\\灵能百分百第一季10.PNG'
//   } else {
//     icon = 'D:\\前端\\program\\forudesigns\\electron-vue-admin\\src\\renderer\\assets\\灵能百分百第一季10.PNG'
//   }
//   const win = remote.getCurrentWindow()
//   const menuItemOpen = new MenuItem({ label: '打开', icon: icon,
//     click: () => {
//       const paths = dialog.showOpenDialog({ properties: ['openFile'] })
//       if (paths !== undefined) {
//         win.setTitle(paths[0])
//       }
//     }
//   })
//   const menuItemSave = new MenuItem({ label: '保存', click: saveClick })
//   const menuItemFile = new MenuItem({ label: '文件', submenu: [menuItemOpen, menuItemSave] })
//   const menuItemInsertImage = new MenuItem({ label: '插入图像' })
//   const menuItemremoveImage = new MenuItem({ label: '删除图像' })
//
//   menu.append(menuItemFile)
//   menu.append(menuItemInsertImage)
//   menu.append(menuItemremoveImage)
//   // Menu.setApplicationMenu(menu)
//
//   window.addEventListener('contextmenu', event => {
//     event.preventDefault()
//     const x = event.x
//     const y = event.y
//     menu.popup({ x: x, y: y })
//     return false
//   })
// }
//
// // 创建托盘图标
// let tray
// let tray2
// let contextMenu
// function createTray() {
//   const win = new BrowserWindow({ width: 800, height: 600 })
//   // win.loadFile()
//   // 添加托盘图标
//   tray = new Tray('D:\\前端\\program\\forudesigns\\electron-vue-admin\\src\\renderer\\assets\\灵能百分百第一季10.PNG')
//   tray2 = new Tray('D:\\前端\\program\\forudesigns\\electron-vue-admin\\src\\renderer\\assets\\灵能百分百第一季10.PNG')
//
//   contextMenu = Menu.buildFromTemplate([
//     {
//       label: '复制',
//       role: 'copy'
//     },
//     {
//       label: '粘贴',
//       role: 'paste'
//     },
//     {
//       label: '剪切',
//       role: 'cut'
//     }
//   ])
//
//   tray.setToolTip('这是一个托盘应用')
//   tray2.setToolTip('这是一个托盘应用')
//   tray.setContextMenu(contextMenu)
//   tray2.setContextMenu(contextMenu)
//
//   /*
//   * altKey alt键
//   * shiftKey shift键
//   * ctrlKey ctrl键
//   * metaKey meta键 macos(command键) windows(窗口键)
//   * */
//   tray.on('right-click', event => {
//     if (event.shiftKey) { console.log(event.shiftKey) }
//     tray.popUpContextMenu(contextMenu)
//   })
//   // 文件拖动到托盘上触发
//   tray.on('drop', () => {
//   })
//   // 拖动文件
//   tray.on('drop-files', (event, files) => {
//   })
//   // 拖动文本
//   tray.on('drop-text', (event, text) => {
//   })
//   // 气泡消息显示事件
//   tray.on('balloon-show', (event, text) => {
//   })
//   // 气泡消息单击事件
//   tray.on('balloon-click', (event, text) => {
//   })
//   tray.on('balloon-closed', (event, text) => {
//   })
//   // 托盘图片
//   // tray.setImage()
//   // 托盘标题
//   // tray.setTitle()
//   // 托盘按下显示的图标
//   // tray.setPressedImage()
//   // 设置托盘提示文本
//   // tray.setToolTip()
//   // 移除图标
//   // tray.destroy()
//   // 显示气泡
//   // tray.displayBalloon({ title: '有消息了', icon: '', content: '软件更新了'})
//
//   win.on('closed', () => {
//     console.log('closed')
//     // win = null
//   })
// }
//
// // 生成图标的尺寸大小
// function stopDefaultEvent(event) {
//   event.preventDefault()
//   return false
// }
// window.ondragover = stopDefaultEvent
// function displayImageInIconSet(filePath) {
//   const images = document.querySelectorAll('')
//   for (let i = 0; i < images.length; i++) {
//     images[i].src = filePath
//   }
// }
// function init(e) {
//   e.ondrop = function(event) {
//     event.preventDefault()
//     if (event.dataTransfer.files.length !== 1) {
//       alert('只能拖动一个图像文件')
//     } else {
//       console.log('哈哈')
//       const file = event.dataTransfer.files[0]
//       displayImageInIconSet(file.path)
//     }
//     return false
//   }
// }
// window.onload = function() {
//   init()
// }
//
// // 使用摄像头 拍照
// // const electron = require('electron')
// // const dialog = electron.remote.dialog
// // const fs = require('fs')
// let photoData
// function openVideo() {
//   const video = this.$refs.video
//   const errorCallback = (error) => {
//     console.log(`'连接视频流错误:' ${error.message}`)
//   }
//   // 获取视频流
//   window.navigator.webkitGetUserMedia({ video: true }, (localMediaStream) => {
//     video.src = window.URL.createObjectURL(localMediaStream)
//   }, errorCallback)
// }
// function savePhoto(filePath) {
//   if (filePath) {
//     fs.writeFile(filePath, photoData, 'base64', err => {
//       if (err) {
//         alert(`'保存图像有问题:' ${err.message}`)
//         photoData = null
//       }
//     })
//   }
// }
// function takePhoto() {
//   const canvas = this.$refs.canvas
//   const video = this.$refs.video
//   console.log(canvas)
//   canvas.getContext('2d').drawImage(video, 0, 0, 800, 600)
//   photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
//   console.log(photoData)
//   dialog.showSaveDialog({
//     title: '保存图像',
//     defaultPath: 'face.png',
//     buttonLabel: '保存'
//   }, this.savePhoto())
// }
// window.onload = openVideo()
//
// // 判断操作系统
// function platform() {
//   const os = require('os')
//   const platform = os.platform()
//   switch (platform) {
//     case 'darwin':
//       console.log('darwin')
//       break
//     case 'linux':
//       console.log('linux')
//       break
//     case 'win32':
//       console.log('win32')
//       break
//     default:
//       console.log('无法检测当前的操作系统')
//   }
// }
//
// // localstorage
// function localStorage() {
//   const setNotes = window.localStorage.setItem('key', 'value')
//   const getNotes = window.localStorage.getItem('key', 'value')
//   console.log(setNotes, getNotes)
// }
