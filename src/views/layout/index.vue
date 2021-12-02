<template>
    <div class="layout-container">
        <!-- 子路由出口 -->
        <router-view />
        <!-- 底部导航栏 -->
        <van-tabbar v-model="active" route>
            <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/qa" icon="search">问答</van-tabbar-item>
            <van-tabbar-item to="/video" icon="friends-o">视频</van-tabbar-item>
            <van-tabbar-item to="/my" icon="setting-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">

</style>
