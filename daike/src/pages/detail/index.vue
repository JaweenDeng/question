<!--
 * @Author: djw
 * @Description: 详情
-->
<script setup lang="ts">
  import { getQuestionDetail } from '@/api/home'
  import { onMounted, reactive, ref } from 'vue'
  import { useRoute  } from "vue-router"
  import { ansQuestion, getAnswer } from '@/api/question'
  import { IAnswerList } from '@/types/question'
  import { IAnswer } from '@/types/question'
  import { Toast } from 'vant'
  const route = useRoute()
  const id:string = route.query.id
  let detail = reactive({data:{}})
  let value = ref('')
  const getAnsList = async () => {
    let params:IAnswerList = {
      page:1,
      pageSize:10,
      id
    }
    const res = await getAnswer(params)
  }
  const handleClick = async () => {
    let params:IAnswer = {
      id,
      content:value.value
    }
    const { data } = await ansQuestion(params)
    Toast.success('回复成功!')
  }
  onMounted(async () =>{
    const { data } = await getQuestionDetail(id)
    detail.data = data
    getAnsList()
  })
</script>
<template>
  <div>
    {{ detail.data.name }}
  </div>
  <div>
    {{ detail.data.des }}
  </div>
  <div class="bottomBtn">
    <div>回答:</div>
    <van-field v-model="value" placeholder="请输入问题" />
    <van-button @click="handleClick">发送</van-button>
  </div>
</template>
<style lang="scss" scoped>
  .bottomBtn {
    position: fixed;
    left: 0px;
    bottom: 0px;
    right: 0px;
    display: flex;
  }
</style>
