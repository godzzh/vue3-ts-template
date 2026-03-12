<template>
    <div class="px-8 py-8">
        <div class="flex gap-[8px]">
            <n-button type="primary" @click="toggleTheme">{{
            $t("system.changeTheme")
        }}</n-button>
        <n-button type="primary" @click="changeLanguage">{{
            $t("system.changeLanguage")
        }}</n-button>
        </div>

        <div>
            <DemoAsync />
            <n-select
                :options="options"
                class="w-[200px]"
                @scroll="handleScroll"
                :reset-menu-on-options-change="false"
            />

            <TransferSelect
                :data="treeData"
                checkable
                key-field="key"
                label-field="title"
                v-model:value="checkedKeys"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import useSystemStore from "@/stores/system";
import { useI18n } from "vue-i18n";
import AsyncComp from "@/utils/AsyncComp";
import { ref } from "vue";
import TransferSelect from "@/components/TransferSelect/index.vue";


const DemoAsync = AsyncComp(() => import("./demo.vue"));

const { locale } = useI18n();

const systemStore = useSystemStore();

const toggleTheme = () => {
    systemStore.toggleTheme();
};

const changeLanguage = () => {
    locale.value = locale.value === "en-US" ? "zh-CN" : "en-US";
};

const options = ref([]);

for (let i = 1; i <= 20; i++) {
    options.value.push({ label: `Option ${i}`, value: i });
}

const handleScroll = (e: Event) => {
    const currentTarget = e.currentTarget as HTMLElement;
    if (
        Math.ceil(currentTarget.scrollTop + currentTarget.offsetHeight) >=
        currentTarget.scrollHeight
    ) {
        let _List = [];
        for (
            let _i = options.value.length + 1;
            _i <= options.value.length + 20;
            _i++
        ) {
            _List.push({ label: `Option ${_i}`, value: _i });
        }
        options.value.push(..._List);
    }
};

const treeData = ref([
    {
        key: "1",
        title: "Node 1",
        children: [
            {
                key: "1-1",
                title: "Node 1-1",
            },
            {
                key: "1-2",
                title: "Node 1-2",
            },
        ],
    },
    {
        key: "2",
        title: "Node 2",
    },
])
const checkedKeys = ref<string[]>(['2']);
</script>
