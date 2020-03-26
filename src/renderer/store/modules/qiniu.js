import { qiniuToken, qiniuUpload, qiniuDelete } from '../../api/qiniu'

const state = {
  uploadToken: '',
  uploadImg: ''
}

const getters = {
  uploadToken: state => state.uploadToken,
  uploadImg: state => state.uploadImg
}

const mutations = {
  TOKEN(state, params) {
    state.uploadToken = params
  },
  UPLAODIMG(state, params) {
    state.uploadImg = params
  }
}

const actions = {
  QiniuToken(store, params) {
    return new Promise((resolve, reject) => {
      qiniuToken().then(res => {
        store.commit('TOKEN', res.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  QiniuUpload(store, params) {
    return new Promise((resolve, reject) => {
      qiniuUpload(params).then(res => {
        store.commit('UPLAODIMG', res.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  QiniuDelete(store, params) {
    return new Promise((resolve, reject) => {
      qiniuDelete(params).then(res => {
        // store.commit('UPLAODIMG', res.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
