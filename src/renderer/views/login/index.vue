<template>
  <div class="login-form-container">
    <div class="login-form-wrap">
      <el-card>
        <el-form autoComplete="on"
                 :model="loginForm"
                 :rules="loginRules"
                 ref="loginForm"
                 label-position="left">
          <div class="logo-avatar">
            <div class="pic"></div>
            <!--<svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>-->
          </div>
          <h2 class="login-title color-main">{{title}}</h2>
          <!--输入 登录区域-->
          <div class="form-container">
            <div class="form-wrap">
              <el-form-item prop="username">
                <el-input name="username"
                          type="text"
                          v-model="loginForm.username"
                          autoComplete="on"
                          placeholder="请输入用户名">
                  <span slot="prefix">
                    <svg-icon icon-class="user" class="color-main"></svg-icon>
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input name="password"
                          :type="pwdType"
                          @keyup.enter.native="handleLogin"
                          v-model="loginForm.password"
                          autoComplete="on"
                          placeholder="请输入密码">
                  <span slot="prefix">
                    <svg-icon icon-class="password" class="color-main"></svg-icon>
                  </span>
                  <span slot="suffix" @click="showPwd">
                    <svg-icon icon-class="eye" class="color-main"></svg-icon>
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 60px;text-align: center">
                <el-button class="btn-01 btn" type="primary" :loading="loading" @click.native.prevent="handleLogin">
                  {{login}}
                </el-button>
              </el-form-item>
            </div>

          </div>
        </el-form>
      </el-card>
    </div>
    <el-dialog
      title="公众号二维码"
      :visible.sync="dialogVisible"
      :show-close="false"
      :center="true"
      width="30%">
      <div style="text-align: center">
        <span class="font-title-large"><span class="color-main font-extra-large">关注公众号</span>回复<span class="color-main font-extra-large">体验</span>获取体验账号</span>
        <br>
        <img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/banner/qrcode_for_macrozheng_258.jpg" width="160" height="160" style="margin-top: 10px">
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import request from '@/utils/request'
// import { isvalidUsername } from '@/utils/validate'
// import { setSupport, setCookie, getCookie } from '@/utils/support'
import { setSupport, getCookie } from '@/utils/support'
import login_center_bg from '@/assets/images/login_center_bg.png'

export default {
  name: 'login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    }
    return {
      title: 'sign in to Kyos',
      login: '登录',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      login_center_bg,
      dialogVisible: false,
      supportDialogVisible: false
    }
  },
  created() {
    this.loginForm.username = getCookie('username')
    this.loginForm.password = getCookie('password')
    if (this.loginForm.username === undefined || this.loginForm.username == null || this.loginForm.username === '') {
      this.loginForm.username = '3348359@qq.com'
    }
    if (this.loginForm.password === undefined || this.loginForm.password == null) {
      this.loginForm.password = 'admin'
    }
  },
  methods: {
    ...mapActions([
      'Login'
    ]),
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      // request.post('/api/rbac/auth/login/', { email: '3348359@qq.com', password: 'admin' }).then(res => { console.log(res) })

      // axios.post('http://127.0.0.1:8000/api/rbac/auth/login/', { email: '3348359@qq.com', password: 'admin' }).then(res => { console.log(res) })
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.Login(this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    dialogConfirm() {
      this.dialogVisible = false
      setSupport(true)
    },
    dialogCancel() {
      this.dialogVisible = false
      setSupport(false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-form-container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url("../../assets/images/无解.jpg");
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-form-wrap {
    width: 40%;
  }
  .form-container {
    width: 100%;
    display: flex;
    justify-content: center;
    .form-wrap {
      width: 70%;
      display: inline-block;
      justify-content: center;
    }
  }
  .logo-avatar {
    display: flex;
    justify-content: center;
    .pic{
      border-radius: 50%;
      width: 56px;
      height: 56px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url("../../assets/images/my.jpg");
    }
    .pic:hover {
      transform: scale(1.05);
      transition: transform 1s ease-in-out;
    }
  }
  .login-title {
    text-align: center;
    text-transform: capitalize;
    font-family: cursive;
  }
  .btn {
    width: 100%;
  }
</style>
<!--重写element-ui-->
<style scoped>
  .login-form-container >>>  .el-card {
    background-color: transparent;
    border: 0;
  }
  .login-form-container >>> .el-card.is-always-shadow {
     -webkit-box-shadow: none;
     box-shadow: none
  }
</style>
