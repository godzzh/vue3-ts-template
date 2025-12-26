<template>
    <div class="loading-page" v-show="loading" :class="'loading-page-' + size" ref="contentRef">
        <div class="loading-span">
            <i class="item0"></i>
            <i class="item0"></i>
            <i class="item0"></i>
            <i class="item0"></i>
        </div>
        <span class="tip" v-if="tip">{{ tip }}</span>
    </div>
</template>
<script setup>
import { toRefs, ref, watch } from 'vue'
const props = defineProps({
    loading: {
        type: Boolean,
        default: () => false,
    },
    tip: {
        type: String,
        default: () => '',
    },
    size: {
        type: String,
        default: () => 'medium',
    },
})

const { loading, tip, size } = toRefs(props)

const contentRef = ref(null)

watch(
    () => props.loading,
    (newVal) => {
        let children = contentRef.value.parentNode.children
        for (let i = 0; i < children.length; i++) {
            children[i].style.opacity = newVal ? 0.48 : 1
        }
    },
)
</script>
<style lang="less" scoped>
.loading-page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: wait;
    z-index: 1011;
    user-select: none;
    transition: all 0.25s ease-in-out;
    opacity: 1 !important;
    .loading-span {
        display: inline-block;
        width: 22px;
        height: 22px;
        position: relative;
        animation: img-rotate 0.8s linear infinite;
        z-index: 1001;
        i {
            display: inline-block;
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: var(--primary-color);
            position: absolute;
            // &::after {
            //     content: "";
            //     position: absolute;
            //     width: 50%;
            //     height: 50%;
            //     background: var(--primary-color);
            //     border-radius: 1px;
            // }
            &:nth-child(1) {
                top: 0;
                left: 0;
                &::after {
                    right: 0;
                    bottom: 0;
                }
            }
            &:nth-child(2) {
                top: 0;
                right: 0;
                opacity: 0.8;
                &::after {
                    left: 0;
                    bottom: 0;
                }
            }
            &:nth-child(3) {
                bottom: 0;
                left: 0;
                opacity: 0.5;
                &::after {
                    right: 0;
                    top: 0;
                }
            }
            &:nth-child(4) {
                bottom: 0;
                right: 0;
                opacity: 0.3;
                &::after {
                    left: 0;
                    top: 0;
                }
            }
        }
    }
    .tip {
        margin-top: 4px;
        color: var(--primary-color);
    }
    &.loading-page-small {
        .loading-span {
            width: 17px;
            height: 17px;
            i {
                width: 7px;
                height: 7px;
            }
        }
        .tip {
            font-size: 12px;
            margin-top: 2px;
        }
    }
    &.loading-page-large {
        .loading-span {
            width: 28px;
            height: 28px;
            i {
                width: 12px;
                height: 12px;
            }
        }
        .tip {
            font-size: 16px;
            margin-top: 6px;
        }
    }
}
@keyframes img-rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
