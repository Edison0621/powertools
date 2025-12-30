<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tutorialsList } from '../data/tutorials/list.js'
import TutorialCard from '../components/TutorialCard.vue'

const route = useRoute()
const router = useRouter()
const categoryId = computed(() => route.params.category)

const filteredTutorials = computed(() => {
  return tutorialsList.filter(t => t.category === categoryId.value)
})

const openTutorial = (tutorial) => {
  router.push(`/tutorial/${tutorial.id}`)
}
</script>

<template>
  <div class="tutorials-view">
    <div class="section-header">
      <h3>📚 {{ categoryId }} 教程</h3>
    </div>
    <div class="tutorials-grid" v-if="filteredTutorials.length > 0">
      <TutorialCard
        v-for="tutorial in filteredTutorials"
        :key="tutorial.id"
        :tutorial="tutorial"
        @click="openTutorial(tutorial)"
      />
    </div>
     <div v-else class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3>该分类下暂无教程</h3>
    </div>
  </div>
</template>

<style scoped>
.section-header {
  margin-bottom: 24px;
}

.section-header h3 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
}

.tutorials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}
.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}
</style>
