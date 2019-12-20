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

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>

export default {

}
</script>

<style>

</style>
