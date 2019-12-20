<template>

    <el-row class="layout-header"  type="flex" align="middle">
        <el-col :span="12" class="left">
            <i class="el-icon-s-fold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="12" class="right">
            <el-row  type="flex" justify="end"  align="middle" >
                <el-input v-model="neirong" placeholder="请输入搜索的文章内容" class="right_input" style="width:190px;" prefix-icon='el-input__icon el-icon-search'></el-input>
                 <el-tooltip effect="dark" content="消息" placement="bottom"  >
                    <el-button>消息</el-button>
                </el-tooltip>
                <img src="../../assets/img/beijing.jpg" alt="">
                <el-dropdown>
                    <span >可口可乐</span>
                    <i class="el-icon-caret-bottom"></i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>git地址</el-dropdown-item>
                    <el-dropdown-item divided>退出</el-dropdown-item>
                    </el-dropdown-menu>

                </el-dropdown>

            </el-row>
        </el-col>
    </el-row>

</template>

<script>
export default {
  data () {
    return {
      neirong: ''
    }
  }
}
</script >

<style lang='less' scoped>
.layout-header{
    height: 60px;

    .left{
        font-size: 20px;

        span{
            color: #2c3e50;
            font-size: 16px;
            margin-left:4px;
        }
    }
    .right{
        .right_input{
            margin-right: 8px;

        }
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 5px;
            margin-left: 5px;
        }
    }
}
</style>
