<template>
    <div class="all-check-box" :class="{ vertical }">
        <n-checkbox
            :label="props.text"
            v-model:checked="isAllCheck"
            :indeterminate="checkIndeterminate"
            @update:checked="onChange"
            :size="size"
        />
        <n-checkbox
            v-for="item in props.options"
            :key="item.value"
            :value="item.value"
            :label="item.label"
            @update:checked="(checed) => onChecked(checed, item.value)"
            :checked="isChecked(item.value)"
            :disabled="item.disabled"
            :size="size"
        />
    </div>
</template>
<script setup>
import { computed, toRefs } from "vue";

const props = defineProps({
    text: {
        type: String,
        default: () => "全部",
    },
    options: {
        type: Array,
        default: () => [],
    },
    value: {
        type: Array,
        default: () => [],
    },
    size: {
        type: String,
        default: () => "medium",
    },
    vertical: {
        type: Boolean,
        default: () => false,
    },
});

const { value, size } = toRefs(props);

const emits = defineEmits(["update:value"]);

//是否部分选中
const checkIndeterminate = computed(() => {
    if (value.value && value.value.length && !isAllCheck.value) return true;
    return false;
});

//是否全选
const isAllCheck = computed(() => {
    if (value.value && value.value.length === props.options.length) return true;
    return false;
});

//选项是否选中
const isChecked = (val) => {
    let _res = false;
    if (props.value && props.value.indexOf(val) > -1) _res = true;
    return _res;
};

//点击选项
const onChecked = (checked, val) => {
    let _list = props.value;
    if (checked) _list.push(val);
    else _list = _list.filter((v) => v !== val);
    emits("update:value", _list);
};

//点击全部
const onChange = (checked) => {
    let _list = [],
        _list2 = [];
    props.options.map((v) => {
        _list.push(v.value);
        if (v.disabled) _list2.push(v.value);
    });
    if (checked) {
        emits("update:value", _list);
    } else {
        emits("update:value", _list2);
    }
};
</script>
<style lang="less" scoped>
.all-check-box {
    margin-bottom: 4px;
    &.vertical {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 4px 4px;
    }
    :deep(.n-checkbox-group) {
        margin-top: 2px;
        display: inline;
        // display: inline-flex;
        // flex-wrap: wrap;
        gap: 2px 2px;
    }
}
</style>
