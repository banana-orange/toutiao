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
        <el-header>我是顶部容器</el-header>
      </el-header>

      <el-main>我是主体容器</el-main>
    </el-container>
  </el-container>

</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
