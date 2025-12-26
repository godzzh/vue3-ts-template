<template>
    <div class="flex align-center gap-[8px]">
        <n-button type="primary" @click="toggleTheme">{{
            $t("system.changeTheme")
        }}</n-button>
        <n-button type="primary" @click="changeLanguage">{{
            $t("system.changeLanguage")
        }}</n-button>
    </div>
</template>
<script setup lang="ts">
import useSystemStore from "@/stores/system";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const systemStore = useSystemStore();

const toggleTheme = () => {
    systemStore.toggleTheme();
};

const changeLanguage = () => {
    locale.value = locale.value === "en-US" ? "zh-CN" : "en-US";
};
</script>
