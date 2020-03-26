/* 商品列表 */

import {
  fetchList, fetchCategorys
} from '../../api/product'

import {
  FETCHLIST, FETCHCATEGORYS
} from '../types/pms'

const state = {
  list: null,
  total: null,
  defaultListQuery: {
    keyword: null,
    page: 1,
    page_size: 10,
    publishStatus: null,
    verifyStatus: null,
    productSn: null,
    productCategoryId: null,
    brandId: null
  },
  brandOptions: [],
  categorysOptions: []
}

const getters = {
  list: state => state.list,
  total: state => state.total,
  defaultListQuery: state => state.defaultListQuery,
  brandOptions: state => state.brandOptions,
  categorysOptions: state => state.categorysOptions
}

const mutations = {
  [FETCHLIST](state, params) {
    state.list = params.data.results
    state.total = params.data.count
  },
  [FETCHCATEGORYS](state, params) {
    for (let i = 0; i < params.data.length; i++) {
      state.brandOptions.push({ label: params.data[i].name, value: params.data[i].id })
      for (const j in params.data[i].sub_cat) {
        state.categorysOptions.push({ label: params.data[i].sub_cat[j].name, value: params.data[i].sub_cat[j].id })
      }
    }
  }
}

const actions = {
  Fetch_List(store, params) {
    return new Promise((resolve, reject) => {
      fetchList(params).then(res => {
        store.commit('FETCHLIST', res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  Fetch_Categorys(store, params) {
    return new Promise((resolve, reject) => {
      fetchCategorys().then(res => {
        store.commit('FETCHCATEGORYS', res)
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
