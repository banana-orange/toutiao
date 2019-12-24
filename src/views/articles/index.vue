<template>
  <el-card class="zong">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>

    <el-form style="padding-left:50px">
      <el-form-item label="文章状态">
        <el-radio-group v-model="searchForm.status">
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
        <el-select placeholder="请选择" v-model="searchForm.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
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

    <el-row class="xiahe" type="flex" justify="space-between" v-for="item in 100" :key="item">
      <div class="lift">
        <img src="../../assets/img/beijing.jpg" alt />
        <div class="wenzi">
          <span>嘎迪恩：总有一天会活成自己讨厌的样子</span>
          <el-tag style="width: 60px;">标签一</el-tag>
          <span class="shijian">2019-12-24 20:25:48</span>
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
      channels: []
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
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
