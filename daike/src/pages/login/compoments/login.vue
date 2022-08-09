<!--
 * @Author: djw
 * @Description: 登录组件
-->
<template>
  <div class="header">
    {{ isLogin ? '登录' : '注册' }}
  </div>
  <van-form @submit="onSubmit" class="form">
    <van-field
      v-model="form.account"
      name="account"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="form.password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <van-button round block type="primary" native-type="submit"> 提交 </van-button>
  </van-form>
  <van-row justify="space-between" class="tips">
    <van-col v-if="isLogin" :span="6" @click="isLogin= false"> 注册账号 </van-col>
    <van-col v-else :span="6" @click="isLogin= true"> 去登录 </van-col>
  </van-row>
</template>
<script setup lang="ts">
  import { reactive, ref } from "vue"
  import { useRoute, useRouter } from 'vue-router'
  import { login, register } from '@/api/user'
  import { Toast } from 'vant'
  const router = useRouter()
  const route = useRoute()
  let form = reactive({
    account: "",
    password: ""
  })
  const isLogin = ref(true)
  const onSubmit = async (values) => {
    if(isLogin) {
      const res = await login(values)
      if(res.code === 0) {
        localStorage.setItem('token', res&&res.data)
        Toast.success('登录成功!')
        const url = route.query && route.query.url ? route.query.url : '/'
        router.replace(url)
      }
    } else {
      const res = await register(values)
      if(res.code === 0) {
        Toast.success('注册成功,请登录')
        isLogin.value = true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .header {
    padding:10px;
    text-align: center;
  }
  .form {
    padding: 0 10px;
  }
  .tips {
    margin: 10px;
    font-size: 12px;
  }
</style>
