<!--
 * @Author: djw
 * @Description: 
-->
<script setup lang="ts">
import { getUserList } from "@/api/user";
import { onMounted } from "vue";
import login from "./compoments/login.vue";
onMounted(async () => {
  const res = await getUserList();
});
</script>
<template>
  <div class="page">
    <login />
  </div>
</template>
<style lang="scss" scoped>
</style>