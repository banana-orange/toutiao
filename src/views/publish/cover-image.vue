<template>
<div class="cover-image">
    <div @click="openDialog" class="cover-image-item" v-for="item in list" :key="item">
        <img :src="item?item:defaultImg" alt="">
    </div>
    <el-dialog :visible="dialogVisible" title="提示" @close="closeDialog" ></el-dialog>
</div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
    .cover-image{
             margin: 20px 100px;
             display: flex;
        .cover-image-item{
             margin-left: 10px;
            border: 1px solid #ccc;
            width: 250px;
            height: 250px;
            padding: 20px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
