<template>
  <div class="zong">
    <el-card class="card">
        <div style="text-align: center; margin-bottom: 10px; ">
            <img src="../../assets/img/logo_index.png" alt="" style="width:40%">
        </div>
        <!-- 表单部分 -->
        <el-form  :model="loginForm" :rules="loginRules" ref="myForm">
            <el-form-item prop="mobile">
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:70%"></el-input>
                <el-button plain style="float:right">发送验证码</el-button>
            </el-form-item>
            <el-form-item prop="check">
                <el-checkbox  v-model="loginForm.check" class="homeCheckbox"></el-checkbox>我已阅读并同意<el-button type="text" @click="open">用户协议</el-button>和<el-button type="text" @click="open">隐私条款</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选 同意被坑
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入您的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }],
        code: [{ required: true, message: '请输入您的验证码' }, { pattern: /^\d{6}$/, message: '验证码格式不正确' }],
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('您应该同意我们的霸王条款,让我们欺负你'))
          }
        } }]
      }
    }
  },
  methods: {
    submitLogin () {
      // console.log()
      this.$refs.myForm.validate((isok, no) => {
        if (isok) {
          // console.log('校验通过,开始调用登录接口')
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(res => {
            window.localStorage.setItem('user-token', res.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            // console.log('失败了')
            this.$message({
              message: '请输入正确的手机号或验证码',
              type: 'warning'
            })
          })
        }
      })
    },
    open () {
      this.$alert('反正你就得点对勾就好了', '用户协议', {
        confirmButtonText: '同意',
        // showCancelButton: true,
        callback: action => {
          this.loginForm.check = true
        }

      })
    }
  }

}
</script>

<style lang='less' scoped>
    .zong{
        height: 100vh;
        background-image: url('../../assets/img/beijing.jpg');
        background-size: 100%;
        position: relative;

        .card{
            width: 30%;
            height: 300px;
            padding: 10px 0 20px 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            opacity: 0.8;
            .homeCheckbox{
                margin-right: 10px;
            }
            .el-button--text{
              margin: 0;
            }
            a{
                color:#3296fa;
            }
        }
    }
</style>
