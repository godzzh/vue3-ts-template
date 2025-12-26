<template>
    <div class="error-page">
        <img src="/static/icon/404.svg" />
        <span>您访问的页面不存在或没有权限</span>
        <n-space>
            <n-button type="primary" @click="backHome">返回首页</n-button>
            <n-button @click="goLogin">重新登录</n-button>
        </n-space>
    </div>
</template>
<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const global = inject("global");
const router = useRouter();

const backHome = () => {
    router.replace('/');
};

const goLogin = () => {
    router.replace("Login");
};
</script>
<style lang="less" scoped>
.error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 16px 0;
    img {
        width: 480px;
    }
    span {
        color: var(--text-color-base-2);
    }
}
</style>
