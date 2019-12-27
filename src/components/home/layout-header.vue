<template>

    <el-row class="layout-header"  type="flex" align="middle">
        <el-col :span="12" class="left">
            <i class="el-icon-s-fold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="12" class="right">
            <el-row  type="flex" justify="end"  align="middle" >
                <el-input v-model="sousuo" placeholder="请输入搜索的文章内容" class="right_input" style="width:190px;" prefix-icon='el-input__icon el-icon-search'></el-input>
                 <el-tooltip effect="dark" content="消息" placement="bottom"  >
                    <el-button>消息</el-button>
                </el-tooltip>
                <img :src="userInfo.photo?userInfo.photo:defaultImg" alt="">

                <el-dropdown @command='clickMenu'>
                    <span >{{userInfo.name}}</span>
                    <i class="el-icon-caret-bottom"></i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                    <el-dropdown-item command='git'>git地址</el-dropdown-item>
                    <el-dropdown-item divided command='lgout'>退出</el-dropdown-item>
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
      sousuo: '', // 顶部搜索栏变量
      toke: '', // 令牌
      userInfo: {}, // 请求回来的用户数据
      defaultImg: require('../../assets/img/beijing.jpg')
    }
  },
  methods: {
    clickMenu (command) {
    //   console.log('aaa')
      if (command === 'info') {
        this.$router.push('/home/account')
      } else if (command === 'git') {
        window.location.herf = 'https://github.com/banana-orange/toutiao'
      } else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.toke = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${this.toke}`
      }
    }).then(res => {
    //   console.log()
      this.userInfo = res.data
    })
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
