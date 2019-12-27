<template>
  <div>
      <el-card>
          <bread-crumb slot="header">
          <template slot="title">个人信息</template>
          </bread-crumb>
          <el-form label-width="100px" style="margin-left:100px">
              <el-form-item label="用户名：">
                  <el-input style="width:40%" v-model="data.name"></el-input>
              </el-form-item>
              <el-form-item label="简介：">
                  <el-input style="width:40%" v-model="data.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：">
                  <el-input style="width:40%" v-model="data.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号：">
                  <el-input disabled style="width:40%"  v-model="data.mobile"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary">保存信息</el-button>
              </el-form-item>
          </el-form>

          <el-upload action="" :show-file-list="false" class="shangchuan">
              <div>
                                <p>更换头像</p>
              <img :src="data.photo" alt="">
              </div>
          </el-upload>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        console.log(res)
        this.data = res.data
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
            bottom: -80px;
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
