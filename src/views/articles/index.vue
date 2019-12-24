<template>
  <el-card class="zong">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>

    <el-form style="padding-left:50px">
      <el-form-item label="文章状态">
        <el-radio-group v-model="searchForm.status" @change="changeCondition">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
        {{searchForm.status }}
        {{searchForm.channel_id}}
        {{searchForm.dateRange}}
      </el-form-item>
      <el-form-item label="频道列表">
        <el-select placeholder="请选择" v-model="searchForm.channel_id" @change="changeCondition">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
        @change="changeCondition"
          v-model="searchForm.dateRange"
          value-format="yyyy-MM-dd"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <el-row type="flex" align="middle" class="total">
      <span>共找到111条符合条件的内容</span>
    </el-row>

    <el-row class="xiahe" type="flex" justify="space-between" v-for="item in list" :key="item.id.toString()">
      <div class="lift">
        <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt />
        <div class="wenzi">
          <span>{{item.title}}</span>
          <el-tag style="width: 60px;" :type="item.status|filterType">{{item.status | filterStatus}}</el-tag>
          <span class="shijian">{{item.pubdate}}</span>
        </div>
      </div>

      <div class="right">
        <span><i class="el-icon-edit"></i>修改</span>
        <span><i class="el-icon-delete"></i>删除</span>
      </div>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 文章状态
        channel_id: null, // 频道
        dateRange: [] // 时间
      },
      channels: [],
      list: [], // 接收内容管理数据
      defaultImg: require('../../assets/img/beijing.jpg')
    }
  },
  filters: {
    //   文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '全部'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    changeCondition () {
    //   alert(this.searchForm.status)
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      this.getArticles(params)
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        console.log(res.data.results)
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script >

<style lang="less" scoped>
.zong {
  .total {
    height: 60px;
    border-bottom: 1px dashed #ccc;
  }
  .xiahe {
    padding: 20px 0;
    border-bottom: 1px solid #f2f3f5;
    .lift {
      display: flex;
      .wenzi {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 7px;
        .shijian {
          color: #999;
          font-size: 12px;
        }
      }
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
      }
    }
    .right{
        span{
        font-size: 14px;
    margin-right: 8px;
    cursor: pointer;
        }

    }
  }
}
</style>
