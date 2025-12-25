<script setup>
const props = defineProps({
  tool: Object,
  isFavorite: Boolean
})

const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <div class="tool-card">
    <div class="tool-card-header">
      <div class="tool-icon">{{ tool.icon }}</div>
      <button 
        class="favorite-btn"
        :class="{ active: isFavorite }"
        @click.stop="emit('toggle-favorite')"
      >
        {{ isFavorite ? '⭐' : '☆' }}
      </button>
    </div>
    
    <h3 class="tool-name">{{ tool.name }}</h3>
    <p class="tool-description">{{ tool.description }}</p>
    
    <div class="tool-tags">
      <span v-for="tag in tool.tags" :key="tag" class="tag">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.tool-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: var(--shadow);
}

@media (max-width: 768px) {
  .tool-card {
    padding: 20px;
    border-radius: 12px;
  }
}

.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary-color);
}

.tool-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.tool-icon {
  font-size: 48px;
  line-height: 1;
}

@media (max-width: 768px) {
  .tool-icon {
    font-size: 40px;
  }
}

.favorite-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.2s;
  padding: 4px;
}

.favorite-btn:hover {
  opacity: 1;
  transform: scale(1.2);
}

.favorite-btn.active {
  opacity: 1;
}

.tool-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-color);
}

@media (max-width: 768px) {
  .tool-name {
    font-size: 18px;
  }
}

.tool-description {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.tool-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: var(--bg-color);
  color: var(--text-secondary);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}
</style>
