<template>
  <el-card class="zong">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部图片" name="all">
        <div class="img-list">
          <el-col class="img-card" v-for="item in list" :key="item.id">
            <img  :src="item.url" alt />
            <el-row class='operate' type="flex" justify="space-around">
                <i class="el-icon-star-on"></i>
                <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
          <div class="img-list">
          <el-col class="img-card" v-for="item in list" :key="item.id">
            <img  :src="item.url" alt />
            <el-row class='operate' type="flex" justify="space-around">
                <i class="el-icon-star-on"></i>
                <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-col>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      activeName: 'all'
    }
  },
  methods: {
    changeTab () {
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect' }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img-list {
    display: flex;
    flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 220px;
    margin: 20px 50px;
    position: relative;
    img{
        width: 100%;
        height: 100%;
    }
    .operate{
        height: 30px;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: #f4f5f6;
        i{
            line-height: 30px;
            font-size:20px;
        }
    }
  }
}
</style>
