<!--
 * @Author: djw
 * @Description: 创建问题
-->
<script setup lang="ts">
  import { reactive, onMounted } from "vue"
  import { Toast } from 'vant'
  import TabBar from '@/components/TabBar.vue'
  import { create, getAllQuestion, uploadImage } from "@/api/question"
  onMounted(async () => {
    const data = await getAllQuestion()
    console.log(data)
  })
  let form = reactive({
    name: "",
    des: ""
  })
  //文件上传
  const afterRead = async (file) => {
    console.log(file.file)
    const formData = new FormData()
    formData.set('file', file.file)
    const res = await uploadImage(formData)
  }

  //提交
  const onSubmit = async (values) => {
    const res = await create(values)
    Object.assign(form, {name:"", des: ""})
    Toast.success('发布成功!')
  }
</script>
<template>
  <div class="title">
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
    <van-field
      v-model="form.poster"
      name="name"
      label="问题图片"
      placeholder="问题图片"
      :rules="[{ required: true, message: '请填写问题名称' }]"
    >
      <template #input>
        <van-uploader :after-read="afterRead" />
      </template>
    </van-field>
    <div class="btnWrap">
      <van-button round block type="primary" size="normal" native-type="submit" class="btn"> 提交 </van-button>
    </div>
  </van-form>
  <TabBar />
</template>
<style lang="scss" scoped>
  .title {
    padding: 10px;
    font-size: 16px;
    text-align: center;
  }
  .btnWrap {
    padding: 20px;
  }
</style>
