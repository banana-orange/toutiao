<template>
  <el-card>
    <bread-crumb slot="header">
      <el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input>
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form label-width="100px" style="margin-left:50px">
      <el-form-item label="标题：">
        <!-- label-width="150px" -->
        <el-input v-model="input" placeholder="文章名称" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <el-input type="textarea" :rows="4" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="封面：">
            <el-radio-group v-model="radio">
    <el-radio :label="3">单图</el-radio>
    <el-radio :label="6">三图</el-radio>
    <el-radio :label="9">无图</el-radio>
    <el-radio :label="9">自动</el-radio>
  </el-radio-group>
      </el-form-item>
      <el-form-item label="频道：">
            <el-select v-model="formData.channel_id" placeholder="请选择">
    <el-option
      v-for="item in channels"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>

      </el-form-item>
      <el-row style="margin-left:95px">
    <el-button type="primary">发布</el-button>
      <el-button>存为草稿</el-button>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道信息
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 图片地址
        },
        channel_id: null // 文章id
      }
    }
  },

  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        console.log(res.data.channels)
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
