<template>
  <div>
      <div class="block">
    <el-carousel height="700px">
      <el-carousel-item v-for="item in list" :key="item">
        <img :src="item" alt="" class="tupian">
      </el-carousel-item>
    </el-carousel>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: ['http://www.boruisz.com/images/oazs44linfwwoltdn5wq/t01d39a5b9395f2e72c.jpg', 'http://b-ssl.duitang.com/uploads/item/201502/17/20150217053615_xTuWF.jpeg', 'http://b-ssl.duitang.com/uploads/item/201902/11/20190211160720_mpcbb.thumb.700_0.jpeg', 'http://www.desktx.com/d/file/wallpaper/comic/20180423/2198f321386b1541a9dbc900e4a03ea4.jpg']
    }
  }
}
</script>

<style>
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .tupian{
    width: 100%;
  }
</style>
