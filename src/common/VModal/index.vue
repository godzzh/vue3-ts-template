<template>
    <n-modal :show="show" v-bind="$attrs" :auto-focus="false">
        <div class="modal-page">
            <div class="modal-page-title" v-drag>
                <div class="modal-page-title-tt">{{ title }}</div>
                <i class="iconfont icon-close" @click="onClose" />
            </div>
            <div class="modal-page-content">
                <n-scrollbar style="max-height: calc(100vh - 300px)">
                    <slot></slot>
                </n-scrollbar>
                <div class="modal-page-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </n-modal>
</template>
<script setup>
import { ref, toRefs } from 'vue'

const emits = defineEmits(['update:show', 'close'])
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
    title: {
        type: String,
        default: () => '',
    },
})

const { show } = toRefs(props)

const onClose = () => {
    emits('close')
    emits('update:show', false)
}
</script>
<style lang="less" scoped>
.modal-page {
    min-width: 360px;
    // box-shadow: 0 0 3px var(--box-shadow-color);
    border-radius: var(--border-radius);
    &-title {
        padding: 0 16px;
        height: 40px;
        background: var(--modal-title-bg-color);
        // background: var(--primary-color);
        // color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        &-tt {
            font-size: 15px;
        }
        i {
            opacity: 0.7;
            cursor: pointer;
            transition: all 0.15s ease-in-out;
            &:hover {
                opacity: 1;
            }
        }
    }
    &-content {
        background: var(--bg-color-1);
        padding: 16px 20px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        border: 1px solid var(--border-color);
    }
    &-footer {
        margin-top: 12px;
        display: flex;
        justify-content: flex-end;
        gap: 12px 12px;
    }
}
</style>
