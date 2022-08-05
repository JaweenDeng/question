<!--
 * @Author: djw
 * @Description: 
-->
<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getHomeIndex } from "@/api/home"
import Question from '@/components/Question.vue'
import TabBar from '@/components/TabBar.vue'
const loading = ref(false)
const list = ref([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const finished = ref(false)
const getListHand = async () => {
  const data = await getHomeIndex({page:page.value, pageSize:pageSize.value})
  list.value = page.value === 1 ? data.data : [...list.value, ...data.data]
  total.value = data.total
  finished.value = list.value.length >= data.total
  loading.value = false
}

onMounted(async () => {
  getListHand()
  loading.value = true
}); 

const onLoad = () => {
  page.value ++
  getListHand()
}
</script>
<template>
  <div class="pages">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <div v-for="item in list" :key="item.id" class="list-item">
        <Question :data="item" />
      </div>
    </van-list>
  </div>
  <TabBar />
</template>
<style lang="scss" scoped>
  .list-item {
    padding: 10px;
    border-bottom: 1px solid #d8d8d8;
  }
</style>
