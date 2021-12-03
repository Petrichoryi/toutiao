<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar
            title="注册/登录"
            left-arrow
            @click-left="$router.back()"
            class="app-nav-bar"
        />
        <!-- 登录表单 -->
        <!-- 基于vant的表单验证
            1.使用van-form组件包裹所有的表单项
            2.给van-form绑定submit事件
            当表单提交的时候会触发submit事件
            提示：只有表单验证通过，它才会调用submit
            3.使用field的rules属性定义校验规则
         -->
        <van-form @submit="onLogin" @failed="onFailed"
        :show-error="false"
        :show-error-message="false"
        validate-first
        ref='login-form'
        >
            <van-field
                v-model="user.mobile"
                left-icon="user-o"
                placeholder="请输入手机号"
                :rules="formRules.mobile"
                name="mobile"
            />
            <van-field
                v-model="user.code"
                clearable
                name="code"
                left-icon="closed-eye"
                placeholder="请输入验证码"
                :rules="formRules.code"
            >
             <template #button>
                <van-count-down v-if="isCountDownShow" :time="1000*10" format="ss s"
                @finish="isCountDownShow=false"/>
                <van-button v-else class="send-btn" size="small" round
                @click.prevent='onSendSms'
                :loading="isSendSmsLoading">发送验证码</van-button>
            </template>
            </van-field>
            <div class="login-btn-wrap">
            <van-button class="login-btn" type="info" block>登录</van-button>
            </div>
        </van-form>

    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        this.$toast.success('登录成功！')

        // 将后端返回的用户登录状态放到vuex中
        this.$store.commit('setUser', data.data)
        // 登录成功，跳转会原来的页面
        this.$router.back()
      } catch (err) {
        this.$toast.fail('登录失败！')
        console.log('登录失败！', err)
      }
    },
    onFailed (err) {
      console.log(err)
      if (err.errors[0]) {
        this.$toast({
          message: err.errors[0].message,
          position: 'top'
        })
      }
    },
    // 发送验证码
    async onSendSms () {
      try {
        // 校验手机号码的格式
        await this.$refs['login-form'].validate('mobile')
        // 展示按钮的loading状态，防止网络慢用户多次点击触发发送行为
        this.isSendSmsLoading = true
        await sendSms(this.user.mobile)
        // 隐藏发送按钮，显示倒计时
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.name === 'mobile') {
          message = err.message
        } else if (err && err.response) {
          message = '发送验证码过于频繁，请稍后再试！'
        } else {
          // 其他未知错误
          message = '发送验证码失败，稍后再试！'
        }
        // console.log(err.response)
        this.$toast({ message, position: top })
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
    .login-btn-wrap{
        padding:26px 16px;
        .login-btn{
            background-color: #6db4fb;
            border:none;
        }

    }
    .send-btn{
        background-color: rgb(223, 215, 215);
    }
}
</style>
