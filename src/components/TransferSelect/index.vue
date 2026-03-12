<template>
    <div class="flex gap-[8px] px-3 py-3">
        <div class="flex-1">
            <n-tree
                :data="data"
                v-bind="$attrs"
                :checked-keys="value"
                @update:checked-keys="handleCheckedKeysChange"
                ref="treeRef"
            />
        </div>
        <div class="flex-[2]">
            <div class="text-gray-400/100 mb-2">已选择 {{ props.value.length }} 项</div>
            <n-data-table
                :data="dataSource"
                :columns="columns"
                class="w-full"
                size="small"
                :min-height="300"
                :max-height="300"
                :pagination="pagination"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, h, reactive, nextTick, watch } from "vue";

const props = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
    value: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(["update:value"]);

const treeRef = ref(null);
const dataSource = ref([]);
const pagination = reactive({
    "item-count": 0,
    "page-size": 10,
    "page-sizes": [10, 20, 50, 100],
    "show-size-picker": true,
});

const columns = [
    {
        title: "标题",
        key: "title",
        render: (row) => {
            return h("span", {}, row.title);
        },
    },
    {
        title: "操作",
        width: 120,
        render: (row) => {
            return h("i", {
                onClick: () => {
                    emit(
                        "update:value",
                        props.value.filter((item) => item !== row.key),
                    );
                },
                class: "iconfont icon-delete text-red-500 cursor-pointer",
            });
        },
    },
];

const handleCheckedKeysChange = async (_keys) => {
    emit("update:value", _keys);
};

watch(
    () => props.value,
    () => {
        nextTick(() => {
            getSourceData();
        });
    },
    { immediate: true },
);

const getSourceData = async () => {
    const { options } = await treeRef.value.getCheckedData();
    dataSource.value = options.map((item) => ({
        title: item.title,
        key: item.key,
    }));
    pagination["item-count"] = dataSource.value.length;
};
</script>
