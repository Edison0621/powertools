<script setup>
import { ref, computed, onMounted } from 'vue'
import ToolCard from './components/ToolCard.vue'
import ToolPage from './components/ToolPage.vue'
import { tools } from './data/tools.js'

const isDark = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedTool = ref(null)
const favorites = ref([])

const categories = [
  { id: 'all', name: '全部工具', icon: '🔧' },
  { id: 'crypto', name: '加密工具', icon: '🔐' },
  { id: 'converter', name: '转换工具', icon: '🔄' },
  { id: 'web', name: 'Web工具', icon: '🌐' },
  { id: 'dev', name: '开发工具', icon: '💻' },
  { id: 'network', name: '网络工具', icon: '🌍' },
  { id: 'math', name: '数学工具', icon: '🔢' },
  { id: 'text', name: '文本工具', icon: '📝' },
  //{ id: 'text-processing', name: '文本处理', icon: '✍️' },
  { id: 'datetime', name: '日期时间', icon: '📅' },
  { id: 'api', name: 'API工具', icon: '🔌' },
  { id: 'privacy', name: '隐私安全', icon: '🔒' },
  { id: 'image', name: '图像工具', icon: '🖼️' }
]

const filteredTools = computed(() => {
  return tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || tool.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const toggleFavorite = (toolId) => {
  const index = favorites.value.indexOf(toolId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(toolId)
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

const openTool = (tool) => {
  selectedTool.value = tool
}

const closeTool = () => {
  selectedTool.value = null
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  const savedFavorites = localStorage.getItem('favorites')
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites)
  }
})
</script>

<template>
  <div class="app" :class="{ dark: isDark }">
    <!-- 顶部导航栏 -->
    <header class="header" role="banner">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <span class="logo-icon" aria-hidden="true">⚡</span>
            <h1>PowerTools</h1>
            <span class="beta" aria-label="测试版">Beta</span>
          </div>
          
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
    </header>

    <!-- 主内容区 -->
    <main class="main" role="main">
      <div class="container">
        <!-- 分类导航 -->
        <nav class="categories" role="navigation" aria-label="工具分类导航">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="['category-btn', { active: selectedCategory === category.id }]"
            :aria-label="`查看${category.name}`"
            :aria-pressed="selectedCategory === category.id"
          >
            <span class="category-icon" aria-hidden="true">{{ category.icon }}</span>
            <span>{{ category.name }}</span>
          </button>
        </nav>

        <!-- 工具网格 -->
        <section class="tools-grid" aria-label="工具列表">
          <ToolCard
            v-for="tool in filteredTools"
            :key="tool.id"
            :tool="tool"
            :is-favorite="favorites.includes(tool.id)"
            @click="openTool(tool)"
            @toggle-favorite="toggleFavorite(tool.id)"
          />
        </section>

        <!-- 空状态 -->
        <div v-if="filteredTools.length === 0" class="empty-state" role="status">
          <div class="empty-icon" aria-hidden="true">🔍</div>
          <h3>未找到工具</h3>
          <p>试试其他搜索词或选择不同的分类</p>
        </div>
      </div>
    </main>

    <!-- 工具详情页 -->
    <ToolPage
      v-if="selectedTool"
      :tool="selectedTool"
      @close="closeTool"
    />

    <!-- 页脚 -->
    <footer class="footer" role="contentinfo">
      <div class="container">
        <p>PowerTools - 开发者的便捷工具集 🚀</p>
        <nav class="footer-links" aria-label="页脚导航">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span aria-hidden="true">·</span>
          <a href="#" @click.prevent>关于</a>
          <span aria-hidden="true">·</span>
          <a href="#" @click.prevent>反馈</a>
        </nav>
      </div>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --text-color: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.dark {
  --bg-color: #0f172a;
  --card-bg: #1e293b;
  --text-color: #f1f5f9;
  --text-secondary: #94a3b8;
  --border-color: #334155;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.5);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

/* Header */
.header {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 24px;
}

.logo-icon {
  font-size: 32px;
}

.beta {
  background: var(--primary-color);
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.search-bar {
  flex: 1;
  max-width: 500px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0 16px;
}

.search-icon {
  font-size: 18px;
}

.search-input {
  flex: 1;
  border: none;
  background: none;
  padding: 12px 0;
  font-size: 15px;
  color: var(--text-color);
  outline: none;
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.theme-toggle {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.theme-toggle:hover {
  background: var(--border-color);
  transform: scale(1.05);
}

/* Main */
.main {
  flex: 1;
  padding: 40px 0;
}

/* Categories */
.categories {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.category-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.category-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.category-icon {
  font-size: 18px;
}

/* Tools Grid */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 24px;
  margin-bottom: 8px;
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 16px;
}

/* Footer */
.footer {
  background: var(--card-bg);
  border-top: 1px solid var(--border-color);
  padding: 32px 0;
  text-align: center;
  margin-top: 60px;
}

.footer p {
  margin-bottom: 8px;
  color: var(--text-secondary);
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.footer-links a {
  color: var(--primary-color);
  text-decoration: none;
  transition: opacity 0.2s;
}

.footer-links a:hover {
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }

  .header-content {
    gap: 12px;
    padding: 12px 0;
    flex-wrap: wrap;
  }

  .logo {
    gap: 8px;
    font-size: 18px;
  }

  .logo-icon {
    font-size: 24px;
  }

  .beta {
    font-size: 10px;
    padding: 2px 6px;
  }

  .search-bar {
    order: 3;
    max-width: 100%;
    width: 100%;
    margin-top: 8px;
  }

  .theme-toggle {
    padding: 8px 12px;
    font-size: 18px;
  }

  .main {
    padding: 24px 0;
  }

  .categories {
    flex-wrap: wrap;
    overflow-x: visible;
    overflow-y: visible;
    margin-bottom: 20px;
    padding-bottom: 0;
    gap: 8px;
  }

  .category-btn {
    padding: 10px 16px;
    font-size: 13px;
    flex-shrink: 0;
  }

  .category-icon {
    font-size: 16px;
  }

  .tools-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .empty-state {
    padding: 60px 20px;
  }

  .empty-icon {
    font-size: 48px;
  }

  .empty-state h3 {
    font-size: 20px;
  }

  .empty-state p {
    font-size: 14px;
  }

  .footer {
    padding: 24px 0;
    margin-top: 40px;
  }

  .footer p {
    font-size: 14px;
  }
}
</style>
