<template>
  <div class="zong">
    <el-card class="card">
        <div style="text-align: center; margin-bottom: 10px; ">
            <img src="../../assets/img/logo_index.png" alt="" style="width:40%">
        </div>
        <!-- 表单部分 -->
        <el-form >
            <el-form-item>
                <el-input placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入验证码" style="width:70%"></el-input>
                <el-button plain style="float:right">发送验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-checkbox class="homeCheckbox"></el-checkbox>我已阅读并同意<span>用户协议</span>和<span>隐私条款</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>

  </div>
</template>

<script>
export default {

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
            span{
                color:#3296fa;
            }
        }
    }
</style>
