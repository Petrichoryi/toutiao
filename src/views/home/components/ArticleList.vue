<template>
    <div class="article-list">
      <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="successText"
      :success-duration='1500'
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- <van-cell v-for="(item,index) in articles" :key="index" :title="item.title">

          </van-cell> -->
          <article-item v-for="(item,index) in articles" :key="index" :article="item"/>
        </van-list>
      </van-pull-refresh>
    </div>
</template>

<script>

import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [], // 数据列表
      loading: false, // 控制加载中的loading状态
      finished: false, // 控制加载结束的状态，当加载结束，不再触发加载更多
      timestamp: null, // 获取下一页数据的时间戳
      isRefreshLoading: false, // 下拉刷新的loading状态
      successText: ''// 下拉刷新的提示文本
    }
  },
  methods: {
    // 上拉加载更多
    async onRefresh () {
      this.isRefreshLoading = true
      // 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now()// 请求最新数据使用当前最新事件戳
      })

      const { results } = data.data
      this.articles.unshift(...results)
      // 往数组头部加入最新的数据
      this.successText = `更新了${results.length}条数据`
      // 关闭刷新的状态loading
      this.isRefreshLoading = false
    },
    async onLoad () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now()// 请求最新数据使用当前最新事件戳，下一页数据使用上一次返回的数据中的时间戳
      })
      // console.log(data)
      const { results } = data.data
      this.articles.push(...results)

      // 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远停在这里
      this.loading = false
      if (results.length) {
        // 更新下一页数据的页码
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了，把加载状态设置结束，不能触发加载更多
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list{
  position: fixed;
  top:90px;
  bottom: 50px;
  left:0;
  right:0;
  overflow-y:auto;
}
</style>
