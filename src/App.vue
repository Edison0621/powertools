<script setup>
import { onMounted } from 'vue'
import { useAppStore } from './stores/app'
import TheHeader from './components/layout/TheHeader.vue'
import TheSidebar from './components/layout/TheSidebar.vue'
import TheFooter from './components/layout/TheFooter.vue'
import AppBreadcrumb from './components/common/AppBreadcrumb.vue'

const store = useAppStore()

onMounted(() => {
  store.initTheme()
})
</script>

<template>
  <div class="app" :class="{ dark: store.isDark }">
    <TheHeader />
    <div class="layout">
      <TheSidebar />
      <main class="main-content" role="main">
        <div class="content-wrapper">
          <AppBreadcrumb />
          <router-view v-slot="{ Component }">
            <component :is="Component" :key="$route.fullPath" />
          </router-view>
        </div>
      </main>
    </div>
    <TheFooter />
  </div>
</template>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #5cb85c;
  --primary-hover: #4cae4c;
  --bg-color: #f4f4f4;
  --card-bg: #ffffff;
  --text-color: #333333;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
  --sidebar-width: 240px;
  --header-height: 72px;
  --page-max-width: 1440px;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.dark {
  --primary-color: #5cb85c;
  --primary-hover: #6cc76c;
  --bg-color: #0f0f0f;
  --card-bg: #1a1a1a;
  --text-color: #e8e8e8;
  --text-secondary: #a0a0a0;
  --border-color: #2a2a2a;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.6);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
  line-height: 1.6;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  background: var(--card-bg);
}

.layout {
  display: flex;
  flex: 1;
  position: relative;
  width: 100%;
  max-width: var(--page-max-width);
  margin: 0 auto;
}

.main-content {
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
}

.content-wrapper {
  width: 100%;
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 20px 24px;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 0;
  }
}
</style>
