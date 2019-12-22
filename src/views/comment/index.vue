<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">评论管理</template>
      </bread-crumb>
      <el-table :data="list">
          <el-table-column label="标题" width='600' prop='title'></el-table-column>
          <el-table-column label="评论状态" :formatter='formatterBoolean' prop="comment_status"></el-table-column>
          <el-table-column label="总评论数" prop='total_comment_count'></el-table-column>
          <el-table-column label="粉丝评论数" prop='fans_comment_count'></el-table-column>
          <el-table-column label="操作"></el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
      })
    },
    formatterBoolean (row, column, cellValue, index) {
    //   console.log(row, column, cellValue, index)
      console.log(cellValue)
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
