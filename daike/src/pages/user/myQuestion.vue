<!--
 * @Author: djw
 * @Description: 我的问题
-->
<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import { getMyQuestion } from "@/api/user"
  import Question from '@/components/Question.vue'
  const loading = ref(false)
  const list = ref([])
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const finished = ref(false)
  const getListHand = async () => {
    const data = await getMyQuestion({page:page.value, pageSize:pageSize.value})
    list.value = page.value === 1 ? data.data : [...list.value, ...data.data]
    total.value = data.total
    finished.value = list.value.length >= data.total
    loading.value = false
  }

  const updateList = () => {
    finished.value = false
    page.value = 1
    getListHand()
  }

  onMounted(async () => {
    getListHand()
    loading.value = true
  }); 

  const onLoad = () => {
    if(!finished.value) {
      page.value ++
      getListHand()
    }
  }
</script>
<template>
  <div class="pages">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      immediate-check="false"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <div v-for="item in list" :key="item.id" class="list-item">
        <Question :data="item" isEdit @update="updateList" />
      </div>
    </van-list>
  </div>
</template>
<style lang="scss" scoped>
  .list-item {
    padding: 10px;
    border-bottom: 1px solid #d8d8d8;
  }
</style>
