<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input>
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form  ref="publishForm" label-width="100px" style="margin-left:50px" :model="formData" :rules="rules">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="formData.title" placeholder="文章名称" style="width:60%"></el-input>
      </el-form-item>

      <el-form-item label="内容：" prop="content">
        <quill-editor v-model="formData.content" placeholder="请输入内容" style="height: 300px;"></quill-editor>
        <!-- <el-input v-model="formData.content" type="textarea" :rows="4" placeholder="请输入内容"></el-input> -->
      </el-form-item>
      <el-form-item label="封面：" prop="cover" style="margin-top: 120px;">
            <el-radio-group v-model="formData.cover.type" @change="changeType">
    <el-radio :label="1">单图</el-radio>
    <el-radio :label="3">三图</el-radio>
    <el-radio :label="0">无图</el-radio>
    <el-radio :label="-1">自动</el-radio>
  </el-radio-group>
  {{formData.cover}}
      </el-form-item>
      <cover-image :list="formData.cover.images"></cover-image>
      <el-form-item label="频道：" prop="channel_id">
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
    <el-button type="primary" @click="publishArticle(false)">发布</el-button>
      <el-button @click="publishArticle(true)">存为草稿</el-button>
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
      },
      rules: {
        title: [{ required: true, message: '文章标题不能为空' }, {
          min: 5,
          max: 30,
          message: '标题的长度在5到30个字符之间'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      },
      loading: false

    }
  },

  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    publishArticle (draft) {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData

          }).then(res => {
            // console.log(res)
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getArticleById (articleId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        // console.log(res)
        this.formData = res.data
        this.loading = false
      })
    },
    changeType () {
      // 封面类型 -1:自动，0-无图，1-1张，3-3张
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else {
        this.formData.cover.images = ['', '', '']
      }
    }

  },
  watch: {
    $route: function (to, from) {
      if (to.params.articleId) {

      } else {
        this.formData = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 图片地址
          }
        }
      }
    }
  },

  created () {
    this.getChannels()
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId)
  }
}

</script>

<style>
</style>
