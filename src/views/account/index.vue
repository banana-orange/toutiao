<template>

      <el-card v-loading="loading">
          <bread-crumb slot="header">
          <template slot="title">个人信息</template>
          </bread-crumb>
          <el-form ref="myForm" label-width="100px" style="margin-left:100px" :model="formData" :rules="rules">
              <el-form-item label="用户名：" prop="name">
                  <el-input style="width:40%" v-model="formData.name"></el-input>
              </el-form-item>
              <el-form-item label="简介：">
                  <el-input style="width:40%" v-model="formData.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：" prop="email">
                  <el-input style="width:40%" v-model="formData.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号：">
                  <el-input disabled style="width:40%"  v-model="formData.mobile"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button @click="saveUserInfo" type="primary">保存信息</el-button>
              </el-form-item>
          </el-form>

          <el-upload :http-request="modifyHead" action="" :show-file-list="false" class="shangchuan">
              <div >
                <p>更换头像</p>
                <img :src="formData.photo" alt="">
              </div>
          </el-upload>
      </el-card>

</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1, max: 7, message: '用户名长度在1到7个字符'
        }],
        email: [{ required: true, message: '邮箱不能为空' }, {
          pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '邮箱格式不正确'
        }]
      },
      loading: false
    }
  },
  methods: {
    saveUserInfo () {
      // 手动校验通过调取接口上传数据
      this.$refs.myForm.validate().then(() => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(res => {
          this.$message({
            type: 'success',
            message: '保存用户信息成功'
          })
          eventBus.$emit('UpdateInformation')
        })
      })
    },
    getUserInfo () {
      // 获取用户信息
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
      })
    },
    modifyHead (params) {
      // 修改头像
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        console.log(res)
        this.formData.photo = res.data.photo
        this.loading = false
        eventBus.$emit('UpdateInformation')
      })
    }
  },

  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>

    .shangchuan{
        div{
            position: absolute;
            right: 300px;
            top: 150px;
            p{
                margin: 0;
            }
        img{
            margin-top: 5px;
            width: 250px;
            height: 250px;
            border-radius: 50%;

        }
        }

    }
</style>
