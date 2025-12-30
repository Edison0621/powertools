<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '../../stores/app'
import { storeToRefs } from 'pinia'
import { mainCategories, toolCategories, patternCategories, patternsByCategory } from '../../data/categories.js'

const route = useRoute()
const store = useAppStore()
const { isSidebarOpen } = storeToRefs(store)

const expandedPatternCategory = ref(null)

const activeMainCategory = computed(() => {
  if (route.path === '/') return 'home'
  if (route.path.startsWith('/tools') || route.path.startsWith('/tool/')) return 'powertools'
  if (route.path.startsWith('/patterns')) return 'design-pattern'
  if (route.path.startsWith('/tutorials/')) return route.params.category
  // Handle tutorial detail page if possible, or just highlight generic 'home' or specific category if known
  // If we are at /tutorial/:id, we might not know the category easily without looking it up.
  // For now, let's just leave it or try to find it.
  return 'home'
})

const activeToolCategory = computed(() => route.query.category || 'all')
const activePatternCategory = computed(() => route.query.category || 'all')
const activePatternId = computed(() => route.query.id)

const togglePatternCategory = (catId) => {
  if (expandedPatternCategory.value === catId) {
    expandedPatternCategory.value = null
  } else {
    expandedPatternCategory.value = catId
  }
}

const getCategoryLink = (id) => {
  if (id === 'home') return '/'
  if (id === 'powertools') return '/tools'
  if (id === 'design-pattern') return '/patterns'
  return `/tutorials/${id}`
}
</script>

<template>
  <aside class="sidebar" :class="{ open: isSidebarOpen }" role="navigation" aria-label="主导航">
    <div class="sidebar-header">
      <h2 class="sidebar-title">📚 教程分类</h2>
    </div>
    <div class="sidebar-content">
      <nav class="sidebar-nav">
        <div v-for="category in mainCategories" :key="category.id" class="nav-group">
          <router-link
            :to="getCategoryLink(category.id)"
            custom
            v-slot="{ navigate, href, isActive }"
          >
            <a
              :href="href"
              @click="navigate"
              :class="['nav-item', { active: activeMainCategory === category.id }]"
              :aria-label="`查看${category.name}`"
            >
              <span class="nav-icon" aria-hidden="true">{{ category.icon }}</span>
              <div class="nav-text">
                <div class="nav-name">{{ category.name }}</div>
                <div class="nav-desc">{{ category.description }}</div>
              </div>
            </a>
          </router-link>
          
          <!-- 工具的二级菜单 -->
          <div v-if="category.id === 'powertools' && activeMainCategory === 'powertools'" class="sub-nav">
            <router-link
              v-for="toolCat in toolCategories"
              :key="toolCat.id"
              :to="{ path: '/tools', query: { category: toolCat.id === 'all' ? undefined : toolCat.id } }"
              custom
              v-slot="{ navigate, href }"
            >
              <a
                :href="href"
                @click="navigate"
                :class="['sub-nav-item', { active: activeToolCategory === toolCat.id }]"
                :aria-label="`查看${toolCat.name}`"
              >
                <span class="sub-nav-icon">{{ toolCat.icon }}</span>
                <span class="sub-nav-name">{{ toolCat.name }}</span>
                <span class="sub-nav-count">({{ toolCat.count }})</span>
              </a>
            </router-link>
          </div>

          <!-- 设计模式的二级菜单 -->
          <div v-if="category.id === 'design-pattern' && activeMainCategory === 'design-pattern'" class="sub-nav">
            <div v-for="patternCat in patternCategories" :key="patternCat.id" class="sub-nav-group">
              <!-- 二级分类按钮 -->
              <template v-if="patternCat.id !== 'all'">
                <button
                  @click="togglePatternCategory(patternCat.id)"
                  :class="['sub-nav-item', 'expandable', { 
                    active: activePatternCategory === patternCat.id && expandedPatternCategory !== patternCat.id,
                    expanded: expandedPatternCategory === patternCat.id 
                  }]"
                  :aria-label="`查看${patternCat.name}`"
                >
                  <span class="sub-nav-icon">{{ patternCat.icon }}</span>
                  <span class="sub-nav-name">{{ patternCat.name }}</span>
                  <span class="sub-nav-count">({{ patternCat.count }})</span>
                  <span class="expand-icon">{{ expandedPatternCategory === patternCat.id ? '▼' : '▶' }}</span>
                </button>
              </template>
              
              <!-- 全部模式按钮（不可展开） -->
              <router-link
                v-else
                :to="{ path: '/patterns' }"
                custom
                v-slot="{ navigate, href }"
              >
                <a
                  :href="href"
                  @click="navigate"
                  :class="['sub-nav-item', { active: activePatternCategory === patternCat.id }]"
                  :aria-label="`查看${patternCat.name}`"
                >
                  <span class="sub-nav-icon">{{ patternCat.icon }}</span>
                  <span class="sub-nav-name">{{ patternCat.name }}</span>
                  <span class="sub-nav-count">({{ patternCat.count }})</span>
                </a>
              </router-link>

              <!-- 三级菜单：具体模式列表 -->
              <div 
                v-if="patternCat.id !== 'all' && expandedPatternCategory === patternCat.id" 
                class="third-nav"
              >
                <router-link
                  v-for="pattern in patternsByCategory[patternCat.id]"
                  :key="pattern.id"
                  :to="{ path: '/patterns', query: { category: patternCat.id, id: pattern.id } }"
                  custom
                  v-slot="{ navigate, href }"
                >
                  <a
                    :href="href"
                    @click="navigate"
                    :class="['third-nav-item', { active: activePatternId === pattern.id }]"
                  >
                    <span class="third-nav-name">{{ pattern.name }}</span>
                  </a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </aside>
  
  <div 
    v-if="isSidebarOpen" 
    class="sidebar-overlay" 
    @click="store.toggleSidebar"
    aria-hidden="true"
  ></div>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background: var(--card-bg);
  border-right: 1px solid var(--border-color);
  height: calc(100vh - var(--header-height));
  position: sticky;
  top: var(--header-height);
  flex-shrink: 0;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  flex-shrink: 0;
  padding: 32px 20px 0;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px 20px;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0;
  padding-bottom: 20px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 20px;
}

.nav-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 12px;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
  text-decoration: none;
  color: var(--text-color);
}

.nav-item:hover {
  background: var(--bg-color);
}

.nav-item.active {
  background: var(--primary-color);
  color: white;
}

.nav-item.active .nav-desc {
  color: rgba(255, 255, 255, 0.9);
}

.nav-icon {
  font-size: 22px;
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
  min-width: 0;
}

.nav-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 二级菜单 */
.nav-group {
  margin-bottom: 8px;
}

.sub-nav {
  margin-left: 32px;
  margin-top: 8px;
  padding-left: 12px;
  border-left: 2px solid var(--border-color);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sub-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
  font-size: 14px;
  color: var(--text-color);
  text-decoration: none;
}

.sub-nav-item:hover {
  background: var(--bg-color);
}

.sub-nav-item.active {
  background: var(--primary-color);
  color: white;
  font-weight: 600;
}

.sub-nav-item.active .sub-nav-count {
  color: rgba(255, 255, 255, 0.9);
}

.sub-nav-item.expanded {
  background: var(--bg-color);
  font-weight: 600;
}

.sub-nav-item.expandable {
  position: relative;
}

.expand-icon {
  margin-left: 4px;
  font-size: 10px;
  opacity: 0.6;
  transition: transform 0.2s;
}

.sub-nav-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.sub-nav-name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sub-nav-count {
  font-size: 12px;
  opacity: 0.7;
  margin-left: auto;
}

/* 三级菜单 */
.third-nav {
  margin-left: 32px;
  margin-top: 6px;
  padding-left: 12px;
  border-left: 2px solid var(--border-color);
  animation: slideDown 0.3s ease-out;
}

.third-nav-item {
  display: block;
  width: 100%;
  padding: 6px 12px;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  font-size: 13px;
  color: var(--text-color);
  margin-bottom: 4px;
  text-decoration: none;
}

.third-nav-item:hover {
  background: var(--bg-color);
}

.third-nav-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
}

.third-nav-name {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-overlay {
  display: none;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: var(--header-height);
    transform: translateX(-100%);
    z-index: 999;
    box-shadow: var(--shadow);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
}
</style>
