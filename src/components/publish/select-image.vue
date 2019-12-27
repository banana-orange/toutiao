<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <div class="select-image-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img @click="clickImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
    <el-row type="flex" justify="center">
              <el-pagination background layout="prev, pager, next"
              :total="page.total"
              :current-page="page.currentPage"
              :page-size="page.pageSize"
              @current-change="changePage"
              ></el-pagination>
    </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
<!-- <el-upload
  :show-file-list="false">
    <i class="el-icon-plus"></i>
</el-upload> -->
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [], // 接收素材数据
      page: {
        pageSize: 10, // 每页数目
        total: 0, // 总数
        currentPage: 1 // 当前页
      }
    }
  },
  methods: {
    clickImg (url) {
    //   console.log(url)
      this.$emit('selectOneImg', url)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    getAllImg () {
      //   获取所以素材
      this.$axios({
        url: '/user/images',
        params: { page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
.select-image-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-card {
    width: 150px;
    height: 150px;
    margin: 20px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
