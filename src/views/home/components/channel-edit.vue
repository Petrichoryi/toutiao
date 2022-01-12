<template>
 <div class="channel-edit">
     <van-cell center :border="false">
         <div slot="title" class="channel-title">我的频道</div>
         <van-button type="danger" plain round size="mini" @click="isEdit=!isEdit">
             {{isEdit?'完成':'编辑'}}
         </van-button>

     </van-cell>
      <van-grid :gutter="10">
             <van-grid-item
             class="grid-item"
             :class="{active:active===index}"
             :icon="(isEdit&&index!==0)?'clear':''"
             v-for="(channel,index) in userChannels"
             :key="index"
             :text="channel.name"
             @click="onUserChannelClick(channel,index)"/>
      </van-grid>

      <van-cell center :border="false">
         <div slot="title" class="channel-title">频道推荐</div>

     </van-cell>
      <van-grid :gutter="10">
             <van-grid-item @click="onAdd(item)" class="grid-item" v-for="(item,index) in recommendChannels" :key="index" :text="item.name"/>
      </van-grid>

 </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false// 控制编辑的显示状态
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    async onAdd (item) {
      this.userChannels.push(item)
      // 数据持久化
      // 用户登录了，数据存储到线上
      if (this.user) {
        await addUserChannel({
          channels: [{ id: item.id, seq: this.userChannels.length }]
        })
      } else {
        // 用户未登录的情况,数据存储到本地
        setItem('user-channels', this.userChannels)
      }
    },

    onUserChannelClick (channel, index) {
      // 编辑状态，删除操作
      if (this.isEdit && index !== 0) {
        this.deleteChannel(channel, index)
      } else {
        this.switchChannel(index)
      }// 非编辑状态，切换频道
    },
    async deleteChannel (channel, index) {
      // 如果删除的是当前激活频道之前的频道，更新父组件中的active，再把更新后的值传递给子组件
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      // 数据持久化un
      if (this.user) {
        // 登录了，持久化到线上
        await deleteUserChannel(channel.id)
      } else {
        // 没登录，持久化到本地
        setItem('user-channels', this.userChannels)
      }
    },
    switchChannel (index) {
      // 切换频道
      this.$emit('update-active', index)
      // 关闭弹出层
      this.$emit('close')
    }
  },
  computed: {
    ...mapState(['user']),
    // 计算属性会观测内部依赖数据的变化而重新求值
    recommendChannels () {
      // 所有频道-我的频道=剩下的推荐频道
      // return this.allChannels.filter(channel=>{
      //     return !this.userChannels.find(userChannel=>{
      //         return userChannel.id===channel.id
      //     })
      // })
      const arr = []
      this.allChannels.forEach(channel => {
        let flag = false
        for (let i = 0; i < this.userChannels.length; i++) {
          if (channel.id === this.userChannels[i].id) {
            flag = true
            break
          }
        }
        if (!flag) {
          arr.push(channel)
        }
      })
      return arr
    }
  }
}
</script>

<style scoped lang='less'>
.channel-edit{
    padding-top:40px;
    .channel-title{
        font-size: 16px;
        color: #333333;
    }
    .grid-item{
        width: 80px;
        height: 43px;
        /deep/ .van-grid-item__content{
            background-color: #f4f5f6;
            .van-grid-item__text{
                font-size: 14px;
                color: #222;
                margin-top: 0;
            }
        }
        /deep/ .van-grid-item__icon{
            position: absolute;
            right: -10px;
            top:-5px;
            font-size: 20px;
            color:#ccc;
        }
    }
    .active{
        /deep/ .van-grid-item__text{
            color: red !important;
        }
    }
}
</style>
