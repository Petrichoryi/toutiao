import request from '../utils/request'

// 注册/登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送验证码
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`

  })
}

// 获取用户资料
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers:{
    //   Authorization:`Bearer ${store.state.user.token}`
    // }

  })
}
