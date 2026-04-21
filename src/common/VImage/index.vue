<template>
    <n-image
        :fallback-src="fallback"
        v-bind="{
            width: 120,
            'object-fit': 'cover',
            ...$attrs,
        }"
    >
        <template #placeholder>
            <div
                :style="{ width: $attrs.width + 'px' }"
                class="v-image-placeholder"
            >
                <div class="v-image-placeholder-text" v-if="$attrs.src">图片加载中</div>
                <img v-else :src="fallback" alt="图片加载中" />
            </div>
        </template>
    </n-image>
</template>
<script setup>
const props = defineProps({
    fallback: {
        type: String,
        default: () => "static/images/common/noImg.png",
    },
});
</script>
<style lang="less" scoped>
.v-image-placeholder {
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--image-error-bg-color);
    font-size: 12px;
    color: var(--placeholder-color);
    box-sizing: border-box;
    padding: 8px;
    &-text {
        position: relative;
        &::after {
            // position: absolute;
            // right: 0;
            // transform: translateX(100%);
            content: ".";
            animation: text 3s infinite ease-in-out;
        }
    }
}

@keyframes text {
    0% {
        content: ".";
    }
    50% {
        content: "..";
    }
    75% {
        content: "...";
    }
}
</style>
<style lang="less">
.n-image {
    img {
        &[data-error="true"] {
            background: var(--image-error-bg-color);
        }
    }
}
</style>
