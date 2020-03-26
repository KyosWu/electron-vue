const Tray = require('electron').remote.Tray

tray() {
      const win = new BrowserWindow({ width: 800, height: 600 })
      // win.loadFile()
      // 添加托盘图标
      const tray = new Tray('D:\\前端\\program\\forudesigns\\electron-vue-admin\\src\\renderer\\assets\\灵能百分百第一季10.PNG')
      const tray2 = new Tray('D:\\前端\\program\\forudesigns\\electron-vue-admin\\src\\renderer\\assets\\灵能百分百第一季10.PNG')

      const contextMenu = Menu.buildFromTemplate([
        {
          label: '复制',
          role: 'copy'
        },
        {
          label: '粘贴',
          role: 'paste'
        },
        {
          label: '剪切',
          role: 'cut'
        }
      ])

      tray.setToolTip('这是一个托盘应用')
      tray2.setToolTip('这是一个托盘应用')
      tray.setContextMenu(contextMenu)
      tray2.setContextMenu(contextMenu)

      /*
      * altKey alt键
      * shiftKey shift键
      * ctrlKey ctrl键
      * metaKey meta键 macos(command键) windows(窗口键)
      * */
      tray.on('right-click', event => {
        if (event.shiftKey) { console.log(event.shiftKey) }
        tray.popUpContextMenu(contextMenu)
      })
      // 文件拖动到托盘上触发
      tray.on('drop', () => {
      })
      // 拖动文件
      tray.on('drop-files', (event, files) => {
      })
      // 拖动文本
      tray.on('drop-text', (event, text) => {
      })
      // 气泡消息显示事件
      tray.on('balloon-show', (event, text) => {
      })
      // 气泡消息单击事件
      tray.on('balloon-click', (event, text) => {
      })
      tray.on('balloon-closed', (event, text) => {
      })
      // 托盘图片
      // tray.setImage()
      // 托盘标题
      // tray.setTitle()
      // 托盘按下显示的图标
      // tray.setPressedImage()
      // 设置托盘提示文本
      // tray.setToolTip()
      // 移除图标
      // tray.destroy()
      // 显示气泡
      // tray.displayBalloon({ title: '有消息了', icon: '', content: '软件更新了'})

      win.on('closed', () => {
        console.log('closed')
        // win = null
      })
    },
