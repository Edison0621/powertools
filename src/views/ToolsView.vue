<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tools } from '../data/tools.js'
import { useAppStore } from '../stores/app'
import { storeToRefs } from 'pinia'
import ToolCard from '../components/ToolCard.vue'

const route = useRoute()
const router = useRouter()
const store = useAppStore()
const { searchQuery, favorites } = storeToRefs(store)
const { toggleFavorite } = store

const selectedCategory = computed(() => route.query.category || 'all')

const filteredTools = computed(() => {
  let result = tools
  
  // Filter by category
  if (selectedCategory.value !== 'all') {
    result = result.filter(t => t.category === selectedCategory.value)
  }

  // Filter by search
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.description.toLowerCase().includes(q)
    )
  }
  
  return result
})

const openTool = (tool) => {
  router.push(`/tool/${tool.id}`)
}
</script>

<template>
  <div class="tools-view">
    <div class="tools-grid" v-if="filteredTools.length > 0">
      <ToolCard
        v-for="tool in filteredTools"
        :key="tool.id"
        :tool="tool"
        :is-favorite="favorites.includes(tool.id)"
        @click="openTool(tool)"
        @toggle-favorite="toggleFavorite(tool.id)"
      />
    </div>
    <div v-else class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3>未找到相关工具</h3>
      <p>试试其他搜索词或选择不同的分类</p>
    </div>
  </div>
</template>

<style scoped>
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
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
@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
