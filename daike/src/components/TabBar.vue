<!--
 * @Author: djw
 * @Description: 底部导航区
-->
<script setup lang="ts">
  import { ref } from 'vue'
  const active = ref(0)
</script>
<template>
  <van-tabbar fixed route>
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/create" icon="question-o">提问</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar >
</template>
<style lang="scss" scoped>

</style>
