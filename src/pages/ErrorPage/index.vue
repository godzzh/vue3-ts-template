<template>
    <div class="flex flex-col items-center justify-center gap-4 min-h-[calc(100vh-160px)]">
        <div class="text-7xl font-mono font-semibold text-primary-500 select-none">404</div>
        <div class="text-sm text-gray-500">页面不存在或已被移除</div>
        <n-button type="primary" @click="goHome">返回首页</n-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => router.replace('/');
</script>
