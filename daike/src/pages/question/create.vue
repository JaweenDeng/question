<!--
 * @Author: djw
 * @Description: 创建问题
-->
<script setup lang="ts">
  import { create, getAllQuestion } from "@/api/question"
  import { reactive, onMounted } from "vue"
  import { Toast } from 'vant'
  onMounted(async () => {
    const data = await getAllQuestion()
    console.log(data)
  })
  let form = reactive({
    name: "",
    des: ""
  })
  const onSubmit = async (values) => {
    const res = await create(values)
    Object.assign(form, {name:"", des: ""})
    Toast.success('发布成功!')
  }
</script>
<template>
  <div>
    发布问题
  </div>
  <van-form @submit="onSubmit">
    <van-field
      v-model="form.name"
      name="name"
      label="问题名称"
      placeholder="问题名称"
      :rules="[{ required: true, message: '请填写问题名称' }]"
    />
    <van-field
      v-model="form.des"
      name="des"
      label="问题描述"
      placeholder="问题描述"
      :rules="[{ required: false, message: '请填写问题描述' }]"
    />
    <van-button round block type="primary" native-type="submit"> 提交 </van-button>
  </van-form>
</template>
