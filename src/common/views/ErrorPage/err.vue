<template>
    <div class="err-page">
        <img src="/static/icon/502.svg" />
        <span>当前路由组件不存在，请联系管理员确认路径地址</span>
    </div>
</template>
<style lang="less" scoped>
.err-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666;
    img {
        width: 400px;
        margin-bottom: 8px;
    }
}
</style>
