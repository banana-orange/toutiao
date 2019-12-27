<template >
  <el-tabs v-model="activeName" v-loading="loading">
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
    <el-tab-pane  label="上传图片" name="upload">
<el-upload
    :http-request="uploadImg"
    action=""
  :show-file-list="false" class='upload-img'>
    <i class="el-icon-plus"></i>
</el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
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
    uploadImg (params) {
      // 上传图片
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'POST',
        data
      }).then(res => {
        // console.log(res)
        this.$emit('selectOneImg', res.data.url)
        this.loading = false
      })
    },
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
.upload-img{

    display: flex;
      justify-content: center;

    i{
 padding: 50px;
        border: 1px dashed #ccc;
        display: block;
        font-size: 100px;
        border-radius: 4px;
    }
}
</style>
