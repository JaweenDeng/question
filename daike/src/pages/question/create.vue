<!--
 * @Author: djw
 * @Description: 创建问题
-->
<script setup lang="ts">
  import { reactive } from "vue"
  import { useRoute, useRouter } from 'vue-router'
  import { Toast } from 'vant'
  import config from '@/common/config'
  import { create, uploadImage, getQuestionDetail, updateQuestion } from "@/api/question"
  import TabBar from '@/components/TabBar.vue'
  const Route = useRoute()
  const Router = useRouter()
  const id:string|null = Route.query.id
  let form = reactive({
    name: "",
    des: ""
  })

  
  //获取问题详情
  const getDetail = async () => {
    const res = await getQuestionDetail({id})
    if(res.code === 0) {
      const { des, id, name, poster } = res.data
      Object.assign(form, {...form, des, id, name, poster})
    }
  }

  if(id) {
    getDetail()
  }

  //文件上传
  const afterRead = async (file) => {
    const formData = new FormData()
    formData.set('file', file.file)
    const res = await uploadImage(formData)
    if(res.code === 0) {
      Object.assign(form, {...form, poster:res.data})
    }
  }

  //提交
  const onSubmit = async (values) => {
    if(id) {
      const res = await updateQuestion({...values, poster:form.poster, id})
      if(res.code === 0) {
        Object.assign(form, {name:"", des:"", poster:""})
        Toast.success('修改成功!')
        Router.push('/myQuestion')
      }
    } else {
      const res = await create({...values, poster:form.poster})
      if(res.code === 0) {
        Object.assign(form, {name:"", des:"", poster:""})
        Toast.success('发布成功!')
        Router.push('/')
      }
    }
  }
</script>
<template>
  <div class="title">
    {{ !id ? '发布问题' : '编辑问题' }}
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
      name="poster"
      label="问题图片"
      placeholder="问题图片"
    >
      <template #input>
        <van-uploader :after-read="afterRead" />
        <img v-if="form.poster" :src="`${config.url}${form.poster}`" class="poster" />
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
  .poster {
    width: 100px;
    height: 100px;
  }
  .btnWrap {
    padding: 20px;
  }
</style>
