<!--
 * @Author: djw
 * @Description: 问题卡片小组件
-->
<script setup lang="ts">
  import { Dialog, Toast } from 'vant'
  import { deleteQuestion } from '@/api/question'
  import config from '@/common/config'
  const props = defineProps({
    data: Object,
    isEdit:Boolean
  })
  const emit = defineEmits(["update"]);
  const handleDelete = () => {
    Dialog.confirm({
      title: '您确定要输出这条问题吗',
    }).then(async () => {
    // on confirm
      const res = await deleteQuestion({id:props.data.id})
      if(res.code === 0) {
        Toast.success('删除成功!')
        emit('update')
      }
    })
  }
</script>
<template>
  <router-link :to="`/detail?id=${data.id}`" class="card">
    <div class="card-content">
      <div class="card-name">
        {{ data.name }}
      </div>
      <div class="card-des oneLine">
        {{ data.des }}
      </div>
    </div>
    <div v-if="isEdit" class="imgWrap">
      <router-link :to="`/create?id=${data.id}`">
        <van-icon name="edit" class="icon" />
      </router-link>
      <van-icon name="delete-o" class="icon" @click.stop.prevent="handleDelete()" />
    </div>
    <img v-else-if="data.poster" :src="`${config.url}${data.poster}`" class="imgWrap" />
  </router-link>
</template>
<style lang="scss" scoped>
  .card {
    display: flex;
  }
  .card-content {
    flex:1;
  }
  .card-name {
    font-size: 16px;
    color:#000
  }
  .card-des {
    font-size: 14px;
    color:#666;
  }
  .oneLine {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .twoLine {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
  }
  .imgWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex:0 0 50px;
    max-height: 50px;
  }
  .imgWrap .icon {
    margin: 0 10px;
    color:#000;
    font-size: 20px;
  }
</style>
