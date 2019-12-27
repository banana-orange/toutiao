<template>
  <div>
      <el-card>
          <bread-crumb slot="header">
          <template slot="title">个人信息</template>
          </bread-crumb>
          <el-form label-width="100px" style="margin-left:100px">
              <el-form-item label="用户名：">
                  <el-input style="width:40%"></el-input>
              </el-form-item>
              <el-form-item label="简介：">
                  <el-input style="width:40%"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：">
                  <el-input style="width:40%"></el-input>
              </el-form-item>
              <el-form-item label="手机号：">
                  <el-input style="width:40%"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary">保存信息</el-button>
              </el-form-item>
          </el-form>

          <el-upload action="" :show-file-list="false" class="shangchuan">
              <div>
                                <p>更换头像</p>
              <img src="../../assets/img/beijing.jpg" alt="">
              </div>
          </el-upload>
      </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

    .shangchuan{
        div{
            position: absolute;
                        left: 67%;
            bottom: 50%;
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
