<template>
    <div class="my-container">
      <van-cell-group class="my-info" v-if='user'>

        <van-cell center class="base-info" :border='false'>
          <van-image
            class='avatar'
            slot='icon'
            round
            width=50px
            height=50px
            fit="cover"
            :src="currentUser.photo"
          />
          <div class='name' slot="title">{{currentUser.name}}</div>
          <van-button class='update-btn' type="default" round>编辑资料</van-button>
        </van-cell>
        <van-grid class='data-info' :border='false'>
          <van-grid-item class='data-info-item'>
            <div slot="text" class='text-wrap'>
              <div class="count">{{currentUser.art_count}}</div>
              <div class="text">头条</div>
            </div>
          </van-grid-item>
          <van-grid-item class='data-info-item'>
            <div slot="text" class='text-wrap'>
              <div class="count">{{currentUser.follow_count}}</div>
              <div class="text">关注</div>
            </div>
          </van-grid-item>
          <van-grid-item class='data-info-item'>
            <div slot="text" class='text-wrap'>
              <div class="count">{{currentUser.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>
          </van-grid-item>
          <van-grid-item class='data-info-item'>
            <div slot="text" class='text-wrap'>
              <div class="count">{{currentUser.like_count}}</div>
              <div class="text">获赞</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <div class='not-login' v-else>
        <div class='log-wrap' @click="$router.push('/login')" >
          <van-icon name="user-circle-o" size="70" color='#fff' />
          <div class='text'>注册/登录</div>
        </div>
      </div>
      <van-grid :column-num="2" class='nav-grid mg-4'>
        <van-grid-item icon="star-o" text="收藏" class='nav-grid-item'/>
        <van-grid-item icon="browsing-history-o" text="历史" class='nav-grid-item'/>
      </van-grid>
      <van-cell title="消息通知" is-link to="/" />
      <van-cell class='mg-4' title="小智同学" is-link to="/" />
      <van-cell v-if='user' class='logout' title="退出登录" @click="onLogout" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { Dialog } from 'vant'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  data () {
    return {
      currentUser: {}
    }
  },
  created () {
    this.loadCurrentUser()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      console.log(data)
      this.currentUser = data.data
    },
    onLogout () {
      Dialog.confirm({
        title: '退出',
        message: '确认退出当前登录吗？'
      })
        .then(() => {
          // on confirm
          // 清空登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.my-container{
  .not-login{
    height:180px;
    background:url('./star.png') no-repeat;
    background-size:cover;//使背景图完全显示出来
    color:#fff;
    padding-top:20px;
    .log-wrap{
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      .text{
        font-size:18px;
      }
    }
  }
  .my-info{
    background:url('./star.png') no-repeat;
    background-size:cover;//使背景图完全显示出来
    height:170px;
    .base-info{
      background-color:unset;
      padding-top:38px;
      padding-bottom:11px;
      .avatar{
        height:66px;
        width:66px;
        box-sizing:border-box;
        margin-right:16px;
        border:1px solid #fff;
      }
      .name{
        color:#fff;
        font-size:16px
      }
      .update-btn{
        height:18px;
        font-size:10px;
        color:#666666;
      }
    }
    .data-info{
      .data-info-item{
        height:65px;
        color:#fff;
        .text-wrap{
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          .count{
            font-size:18px
          }
          .text{
            font-size:11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content{
      background-color:unset
    }
  }
  .nav-grid{
    .nav-grid-item{
      height:70px;
      /deep/.van-icon-star-o{
        font-size:22px;
        color:red
      }
      /deep/.van-icon-browsing-history-o{
        font-size:22px;
        color:blue
      }
    }
  }
  .logout{
    text-align:center;
    color:orange
  }
  .mg-4{
    margin-bottom:4px
  }
}
</style>
