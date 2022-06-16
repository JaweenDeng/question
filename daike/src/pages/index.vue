<!--
 * @Author: djw
 * @Description: 
-->
<script setup lang="ts">
import { getHomeIndex } from "@/api/home";
import { onMounted, ref } from "vue";
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
  //loading.value = false
  finished.value = list.value.length >= data.total
  loading.value = false
}

onMounted(async () => {
  getListHand()
  loading.value = true
}); 

const onLoad = () => {
  page.value ++
  console.log(page.value)
  getListHand()
}
</script>
<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
  >
    <div v-for="item in list" :key="item.id" class="list-item">
      <router-link :to="`/detail?id=${item.id}`">
        <div>
          name:{{ item.name}}
        </div>
        <div>
          des:{{ item.des }}
        </div>
      </router-link>
    </div>
  </van-list>
</template>
<style lang="scss" scoped>
  .list-item {
    height: 100px;
  }
</style>
