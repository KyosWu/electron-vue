import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import qiniu from './modules/qiniu'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import getters from './getters'

// product pms 模块
import product from './modules/product'

Vue.use(Vuex)

const modules = {
  app,
  user,
  qiniu,
  permission,
  product,
  tagsView
}

const store = new Vuex.Store({
  modules,
  getters
})

export default store
