<template>
  <el-card class="zong" v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>

    <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-row type="flex" justify="end">
            <el-upload :show-file-list="false" action="" :http-request="shangchuan">
      <el-button size="small" type="primary" >点击上传</el-button>
            </el-upload>
    </el-row>
      <el-tab-pane label="全部图片" name="all">
        <div class="img-list">
          <el-col class="img-card" v-for="(item,index) in list" :key="item.id">
            <img :src="item.url" alt  @click="lunbo(index)"/>
            <el-row class="operate" type="flex" justify="space-around">
              <i class="el-icon-star-on" :style="{color : item.is_collected ? 'red':'#000'}" @click="shoucang(item)"></i>
              <i class="el-icon-delete-solid" @click="shanchu(item.id)"></i>
            </el-row>
          </el-col>
        </div>

      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="img-list">
          <el-col class="img-card" v-for="(item,index) in list" :key="item.id">
            <img :src="item.url" alt @click="lunbo(index)" />

          </el-col>
        </div>
      </el-tab-pane>
              <el-row type="flex" justify="center">
          <el-pagination background layout="prev, pager, next"
          @current-change="changePage"
          :page-size='page.pageSize'
          :current-page='page.currentPage'
          :total="page.total"></el-pagination>
        </el-row>
    </el-tabs>
    <el-dialog :visible.sync="dialogVisible" @opened="openEnd">
  <el-carousel ref="zoumadeng" indicator-position="outside" height="500px">
    <el-carousel-item v-for="item in list" :key="item.id">
      <img :src="item.url" alt="" class="lunboImg">
    </el-carousel-item>
  </el-carousel>
    </el-dialog>
  </el-card>
</template>

<script>
// import { format } from 'path'
export default {
  data () {
    return {
      list: [],
      activeName: 'all',
      page: {
        total: 0, // 总条目数
        pageSize: 8, // 每页显示条目个数
        currentPage: 1 // 总页数
      },
      loading: false,
      dialogVisible: false, // 弹层
      xiabiao: ''
    }
  },
  methods: {
    openEnd () {
      this.$refs.zoumadeng.setActiveItem(this.xiabiao)
    },
    lunbo (index) {
      this.dialogVisible = true
      this.xiabiao = index
    },
    shangchuan (a) {
      // console.log(a)
      this.loading = true
      let data = new FormData()
      data.append('image', a.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      }).then(res => {
        this.loading = false
        this.getMaterial()
      })
    },
    shanchu (id) {
      // console.log(item)
      this.$confirm('您是否要删除？').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${id}`
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    shoucang (item) {
      // console.log(id)
      this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: { collect: !item.is_collected }
      }).then(res => {
        // console.log(res)
        this.getMaterial()
      })
    },
    changePage (newPage) {
      // console.log(newPage)
      this.page.currentPage = newPage
      this.getMaterial()
    },
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
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
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      height: 30px;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #f4f5f6;
      i {
        line-height: 30px;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
.lunboImg{
  height: 500px;
  width: 100%;
}
</style>
