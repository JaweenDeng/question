<!--
 * @Author: djw
 * @Description: 问题卡片小组件
-->
<script setup lang="ts">
  const props = defineProps({
    data: Object
  })
</script>
<template>
  <router-link :to="`/detail?id=${data.id}`" class="card">
    <div class="card-name">
      {{ data.name }}
    </div>
    <div class="card-des oneLine">
      {{ data.des }}
    </div>
  </router-link>
</template>
<style lang="scss" scoped>
  .card-name {
    font-size: 16px;
    color:#000
  }
  .card-des {
    font-size: 14px;
    color:#666;
  }
  .oneLine {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .twoLine {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
  }
</style>
