<script setup>
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { isDark, searchQuery } = storeToRefs(store)
const { toggleTheme } = store
</script>

<template>
  <header class="header" role="banner">
    <div class="header-container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <span class="logo-icon" aria-hidden="true">✨</span>
          <h1>AI工具箱</h1>
          <span class="tagline">发现最好的AI工具</span>
        </router-link>
        
        <div class="header-right">
          <div class="search-bar" role="search">
            <span class="search-icon" aria-hidden="true">🔍</span>
            <input 
              v-model="searchQuery" 
              type="search" 
              placeholder="搜索工具..."
              class="search-input"
              aria-label="搜索开发工具"
              autocomplete="off"
            />
          </div>

          <button 
            @click="toggleTheme" 
            class="theme-toggle"
            :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
          >
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: var(--header-height);
  box-shadow: var(--shadow);
}

.header-container {
  width: 100%;
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
  height: var(--header-height);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 22px;
  white-space: nowrap;
  text-decoration: none;
  color: var(--text-color);
}

.logo h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.logo-icon {
  font-size: 32px;
}

.tagline {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 400;
  padding: 3px 10px;
  background: var(--bg-color);
  border-radius: 6px;
}

.header-right {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
}

.search-bar {
  max-width: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 0 16px;
  transition: border-color 0.2s;
}

.search-bar:focus-within {
  border-color: var(--primary-color);
}

.search-icon {
  font-size: 16px;
  color: var(--text-secondary);
}

.search-input {
  flex: 1;
  border: none;
  background: none;
  padding: 8px 0;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.theme-toggle {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.theme-toggle:hover {
  background: var(--border-color);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .header-content {
    gap: 12px;
  }
  .logo {
    font-size: 16px;
  }
  .logo-icon {
    font-size: 24px;
  }
  .tagline {
    display: none;
  }
  .search-bar {
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .search-bar {
    max-width: 150px;
  }
  .search-input {
    font-size: 13px;
  }
}
</style>
