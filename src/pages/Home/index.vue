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
        </div>
    </div>
</template>
<script setup lang="ts">
import useSystemStore from "@/stores/system";
import { useI18n } from "vue-i18n";
import AsyncComp from "@/utils/AsyncComp";
import { inject } from "vue";

const global: any = inject("global");

const DemoAsync = AsyncComp(() => import("./demo.vue"));

const { locale } = useI18n();

const systemStore = useSystemStore();

const toggleTheme = () => {
    systemStore.toggleTheme();
};

const changeLanguage = () => {
    locale.value = locale.value === "en-US" ? "zh-CN" : "en-US";
};
</script>
