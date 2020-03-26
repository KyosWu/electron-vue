<template>
    <div>
        <label class="article">文章内容</label>
        <mavon-editor ref="mavonEditor" @change="changeContent" class="article_content" v-model="content" fontSize="18px"
                      @imgDel="imgDel" @imgAdd="imgAdd"
                      placeholder="开始编写文章内容(上传图片为七牛云，删除功能暂无)..."
                      style="min-height:600px;" />
        <Button type="success" class="article_button" @click="submitArticle">发布文章</Button>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
      data() {
        return {
          title: '',
          content: '',
          htmlContent: '',
          date: FormatDate(new Date()),
          radio: 'Front',
          tag: '',
          des: '',
          originalContent: '',
          source: ''
        }
      },
      created() {
        // 获取七牛云上传token
        this.getUploadToken()
      },
      computed: {
        ...mapGetters([
          'uploadToken',
          'uploadImg'
        ])
      },
      methods: {
        ...mapActions([
          'QiniuToken',
          'QiniuUpload',
          'QiniuDelete'
        ]),
        changeContent(value, render) {
          this.htmlContent = render
          this.originalContent = value
        },
        submitArticle() {
          this.insertArticle()
        },
        dateContent(val) {
          this.date = FormatDate(val)
        },
        insertArticle() {
          const param = {
            title: this.title,
            htmlContent: this.htmlContent,
            date: this.date,
            tag: this.tag,
            des: this.des,
            original: this.originalContent,
            radio: this.radio
          }
          if (Object.is(this.title, '')) {
            this.error('文章标题留空无法保存', '请仔细检查文章标题', false)
          } else {
            this.$axios.post(`/article/insert${this.radio}`, param).then(res => {
              const { error } = res.data
              if (Object.is(error, 0)) {
                this.success('文章发布成功', '文章发布成功', false);
                [this.title, this.des, this.original, this.content] = ['']
              } else {
                this.error('发布失败', '未知原因', false)
              }
            })
          }
        },
        // 添加图片
        imgAdd(pos, file) {
          const name = file.name
          const path = file.path
          const params = {
            token: this.uploadToken,
            name: name,
            path: path
          }
          this.QiniuUpload(params)
          console.log(this.uploadImg)
          // this.$refs.mavonEditor.$img2Url(pos, this.uploadImg)
        },
        // 删除图片
        imgDel(pos, file) {
          /* 删除暂时无效 */
          const name = pos[1].name
          const path = pos[1].path
          const params = {
            token: this.uploadToken,
            name: name,
            path: path
          }
          this.QiniuDelete(params)
        },
        // 获取七牛云上传token
        getUploadToken() {
          this.QiniuToken()
        }
      }
    }
    /* 封装格式化日期 */
    function FormatDate(strTime) {
      var date = new Date(strTime)
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    }
</script>
