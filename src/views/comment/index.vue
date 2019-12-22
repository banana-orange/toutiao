<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">评论管理</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column label="标题" width="600" prop="title"></el-table-column>
      <el-table-column label="评论状态" :formatter="formatterBoolean" prop="comment_status"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button
            size="small"
            type="text"
            @click="openOrCloseState(obj)"
          >{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" align="middle" style="height: 80px;">
      <el-pagination background layout="prev, pager, next"
      :total="page.total"
      :page-size="page.pageSize"
      :current-page="page.currentPage"
      @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0, // 总条目数
        pageSize: 10, // 每页显示条目个数
        currentPage: 1 // 默认页码
      },
      loading: false
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.page.pageSize = res.data.per_page
        this.loading = false
      })
    },
    formatterBoolean (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    openOrCloseState (obj) {
      let id = obj.row.id
      this.$confirm(
        `您是否确定要${obj.row.comment_status ? '关闭' : '打开'}评论?`,
        '提示'
      ).then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: id.toString() },
          data: { allow_comment: !obj.row.comment_status }
        }).then(res => {
          this.getComment()
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
