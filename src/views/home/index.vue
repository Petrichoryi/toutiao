<template>
    <div class="home-container">
       <van-nav-bar class="app-nav-bar">
         <van-button class="search-btn" icon="search" round slot="title" type="info" size="small">搜索</van-button>
       </van-nav-bar>
       <!-- 文章频道列表 -->
       <!-- 标签页组件有一个功能：只有第一次查看标签的时候才会渲染里面的内容 -->
       <van-tabs v-model="active" class="channel-tabs">
        <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id">
          <article-list :channel="channel"></article-list>
        </van-tab>
        <!-- 汉堡按钮定位把列表最后的位置给挡住了，解决办法就是在这里添加一个占位元素 -->
        <div slot="nav-right" class="wap-nav-placeholder"></div>
        <div slot="nav-right" class="wap-nav-wrap">
          <van-icon name="wap-nav"
          @click="isChannelEditShow=true"
          />
        </div>
      </van-tabs>
      <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
      style="height:100%">
      <!-- $event表示当前事件传递的参数 -->
        <channel-edit :userChannels="userChannels" :active="active" @close="isChannelEditShow=false"
        @update-active="active=$event"/>
      </van-popup>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: { ArticleList, ChannelEdit },
  data () {
    return {
      active: 0,
      userChannels: [],
      isChannelEditShow: true
    }
  },
  created () {
    this.loadUserChannels()
  },
  methods: {
    // 获取首页频道列表数据
    async loadUserChannels () {
      // 判断是否已经登录，若登录则从线上获取用户频道列表，
      // 没登录则判断是否有本地存储列表，若没有则请求获取推荐频道列表
      let channels = []
      if (this.user) {
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        const localChannels = getItem('user-channels')
        if (localChannels) {
          channels = localChannels
        } else {
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.userChannels = channels
    }

  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.home-container{
  /deep/ .van-nav-bar__title{
    max-width: none;
  }
  .search-btn{
    border: none;
    width: 277px;
    height: 32px;
    background: #5babfb;
    .van-button__text{
      font-size:14px
    }
    .van-icon{
      font-size:16px
    }
  }
  .channel-tabs{
    /deep/ .van-tab{
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line{
      height: 3px;
      width: 15px !important;
      background: #3296fa;
      bottom: 20px;
    }
  }
  .wap-nav-wrap{
    position: fixed;
    right: 0;
    height:43px;
    width:33px;
    background-color: #fff;
    opacity: .9;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-icon{
      font-size:24px;
    }
  }
  .wap-nav-placeholder{
    width: 33px;
    flex-shrink: 0;
  }

}
</style>
