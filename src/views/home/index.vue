<template>

  <!-- 侧边栏 -->
  <el-container>
    <el-aside>
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧大容器 -->
    <el-container>
      <!-- 顶部容器 -->
      <el-header>
        <el-header>
          <layout-header></layout-header>
        </el-header>
      </el-header>

      <el-main>我是主体容器</el-main>
    </el-container>
  </el-container>

</template>

<script>
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  }
}
</script>

<style>

</style>
