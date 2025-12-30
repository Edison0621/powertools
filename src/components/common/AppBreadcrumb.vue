<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { toolCategories } from '../../data/categories.js'
import { tools } from '../../data/tools.js'

const route = useRoute()

const breadcrumbs = computed(() => {
  const crumbs = []
  const path = route.path
  
  if (path === '/') return []

  if (path.startsWith('/tools') || path.startsWith('/tool/')) {
    crumbs.push({ name: '开发工具', icon: '⚡', to: '/tools' })
    const catId = route.query.category
    if (catId && catId !== 'all') {
      const cat = toolCategories.find(c => c.id === catId)
      if (cat) crumbs.push({ name: cat.name, icon: cat.icon, to: `/tools?category=${catId}` })
    }
    if (path.startsWith('/tool/')) {
       const toolId = route.params.id
       const tool = tools.find(t => t.id === toolId)
       if (tool) crumbs.push({ name: tool.name, icon: tool.icon }) 
    }
  }

  return crumbs
})
</script>

<template>
  <div v-if="breadcrumbs.length > 0" class="breadcrumb-nav">
    <span v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
      <router-link v-if="crumb.to && index < breadcrumbs.length - 1" :to="crumb.to" class="breadcrumb-link">
        <span class="breadcrumb-icon">{{ crumb.icon }}</span>
        <span class="breadcrumb-text">{{ crumb.name }}</span>
      </router-link>
      <span v-else class="breadcrumb-current">
        <span class="breadcrumb-icon">{{ crumb.icon }}</span>
        <span class="breadcrumb-text">{{ crumb.name }}</span>
      </span>
      <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">/</span>
    </span>
  </div>
</template>

<style scoped>
.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  margin-bottom: 24px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  font-size: 14px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  font-weight: 500;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--primary-color);
}

.breadcrumb-current {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  font-weight: 600;
}

.breadcrumb-icon {
  font-size: 16px;
}

.breadcrumb-separator {
  color: var(--text-secondary);
  margin: 0 4px;
  font-weight: 300;
}

@media (max-width: 768px) {
  .breadcrumb-nav {
    padding: 12px 16px;
    margin-bottom: 16px;
    font-size: 13px;
  }
}
</style>
