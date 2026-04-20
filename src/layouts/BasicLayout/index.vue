<template>
  <div class="min-h-screen" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e8edf4 100%);">
    <TopNav />
    <main class="h-[calc(100vh-60px)] overflow-auto">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import TopNav from '@/layouts/TopNav/index.vue'
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
