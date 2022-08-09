<!--
 * @Author: djw
 * @Description: 我的页面
-->
<script setup lang="ts">
  import { onMounted, reactive } from 'vue'
  import { getUserInfo, updateAvator } from "@/api/user"
  import { uploadImage } from "@/api/question"
  import config from '@/common/config'
  import TabBar from '@/components/TabBar.vue'
  const userInfo = reactive({})
  onMounted(async () => {
    const tokenStr:String|null = localStorage.getItem('token');//获取token值
    if(tokenStr) {
      getUserData()
    }
  }) 
  const getUserData = async () =>{
    const res = await getUserInfo()
    if(res.code === 0) {
      Object.assign(userInfo, { ...res.data })
    }
  }
  const afterRead = async (file) => {
    const formData = new FormData()
    formData.set('file', file.file)
    const res = await uploadImage(formData)
    if(res.code === 0) {
      const result = await updateAvator({avator:res.data})
      if(result.code === 0) {
        getUserData()
      }
    }
  }
</script>
<template>
  <div class="pages">
    <div class="userInfo">
      <van-uploader :after-read="afterRead">
        <img v-if="userInfo?.avator" :src="`${config.url}${userInfo.avator}`" class="avator" />
        <van-icon v-else center name="user-circle-o" class="icon" />
      </van-uploader>
      <div class="account">
        {{ userInfo.account }}
      </div>
    </div>
    <div class="content">
      <van-cell title="我的问题" is-link to="/myQuestion" />
    </div>
    <TabBar />
  </div>
</template>
<style lang="scss" scoped>
  .pages {
    min-height: 100vh;
    background: #f5f5f5;
  }
  .userInfo {
    display: flex;
    align-items: center;
    padding:10px;
    background:#fff;
  }
  .avator {
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }
  .icon {
    font-size: 50px;
    color:#d8d8d8;
  }
  .account {
    margin-left: 20px;
  }
  .content {
    margin-top: 20px;
    background: #fff;
  }
</style>
