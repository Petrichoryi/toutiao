// 文章相关接口
import request from '@/utils/request'
// 获取文章新闻推荐
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
