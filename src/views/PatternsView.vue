<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PatternViewer from '../components/patterns/PatternViewer.vue'
import { patterns } from '../data/patterns.js'

const route = useRoute()
const category = computed(() => route.query.category || 'all')
const patternId = computed(() => route.query.id)
const initialPattern = computed(() => {
  if (patternId.value) {
    return patterns.find(p => p.id === patternId.value)
  }
  return null
})
</script>

<template>
  <div class="patterns-view">
    <PatternViewer :category="category" :initial-pattern="initialPattern" />
  </div>
</template>

<style scoped>
.patterns-view {
  height: 100%;
}
</style>
