import request from '@/utils/request'

// 获取七牛云token
export function qiniuToken(params) {
  return request({
    url: '/api/goods/qntoken',
    method: 'get'
  })
}
// 七牛云上传
export function qiniuUpload(params) {
  return request({
    url: '/api/goods/qnupload',
    method: 'post',
    data: {
      params
    }
  })
}
// 七牛云删除
export function qiniuDelete(params) {
  return request({
    url: '/api/goods/qndelete',
    method: 'post',
    data: {
      params
    }
  })
}
