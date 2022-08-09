<!--
 * @Author: djw
 * @Description: 详情
-->
<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { Toast } from 'vant'
  import { useRoute  } from "vue-router"
  import { getQuestionDetail } from '@/api/home'
  import { ansQuestion, getAnswer } from '@/api/question'
  import { IAnswerList, IAnswer } from '@/types/question'
  import config from '@/common/config' 
  import { changeTime } from '@/utils/utils'
  const route = useRoute()
  const id:string = route.query.id
  let detail = reactive({data:{}})
  let answerList = ref([])
  const loading = ref(false)
  const finished = ref(false)
  const total = ref(0)
  const page = ref(1)
  let value = ref('')
  const getAnsList = async () => {
    let params:IAnswerList = {
      page:page.value,
      pageSize:10,
      id:id
    }
    const res = await getAnswer(params)
    if(res.code == 0) {
      answerList.value = params.page === 1 ? [...res.data] : [...answerList.value, ...res.data]
      total.value = res.data.total
      finished.value = answerList.value.length >= res.data.total || !res.data.total
      loading.value = false
    }
  }
  const onLoad = () => {
    if(!finished.value) {
      page.value ++
      getAnsList()
    }
    
  }
  const handleClick = async () => {
    let params:IAnswer = {
      id,
      content:value.value
    }
    const res = await ansQuestion(params)
    if(res.code === 0) {
      Toast.success('回复成功!')
      page.value = 1
      finished.value = false
      value.value = ''
      getAnsList()
    }
  }
  onMounted(async () =>{
    const { data } = await getQuestionDetail(id)
    detail.data = data
    getAnsList()
  })
</script>
<template>
  <div class="pages">
    <div class="name">
      {{ detail.data.name }}
    </div>
    <div v-if="detail.data.poster" class="poster">
      <img :src="`${config.url}${detail.data.poster}`" />
    </div>
    <div class="des">
      {{ detail.data.des }}
    </div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :immediate-check="false"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <div v-for="(item, index) in answerList" :key="item.id" class="list-item">
        <div>{{`${index+1}楼` }}  {{`${item.userName}`}}:</div>
        <div class="content">{{item.content}}</div>
        <div>{{changeTime(item.createTime)}}</div>
      </div>
    </van-list>
    <div class="bottomBtn">
      <div class="title">回答:</div>
      <van-field v-model="value" placeholder="请输入回复" />
      <div class="title" @click="handleClick">发送</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .pages {
    min-height: 100vh;
    padding-bottom: 50px;
    box-sizing: border-box;
  }
  .name {
    padding:10px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    border-bottom: 2px solid #f5f5f5;
  }
  .poster {
    padding:10px;
    text-align: center;
    border-bottom: 2px solid #f5f5f5;
  }
  .poster img {
    max-width: 100%;
  }
  .des {
    padding:10px;
    border-bottom: 2px solid #f5f5f5;
  }
  .list-item {
    padding:10px;
    border-bottom: 1px solid #f5f5f5;
    color:#666;
  }
  .list-item .content {
    padding:10px;
    color:#333;
  }
  .bottomBtn {
    position: fixed;
    left: 0px;
    bottom: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    border-top: 2px solid #f5f5f5;
    padding: 0 5px;
    box-sizing: border-box;
  }
  .title {
    flex: 0 0 35px;
  }
</style>
