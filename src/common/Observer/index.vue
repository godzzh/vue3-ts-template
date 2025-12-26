<template>
    <div ref="target" class="observer-content" :class="{ show: showSlot }">
        <template v-if="showSlot">
            <slot />
        </template>
        <n-empty v-else />
    </div>
</template>
<script setup>
import { ref, defineEmits } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const emits = defineEmits(["show"]);
const target = ref(null);
const showSlot = ref(false);

let isFirst = false;

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (isIntersecting && !isFirst) {
        isFirst = true;
        showSlot.value = true;
    }
    emits("show", isIntersecting);
});
</script>
<style lang="less" scoped>
.observer-content {
    min-height: 1200px;
    &.show {
        min-height: auto;
    }
}
</style>
