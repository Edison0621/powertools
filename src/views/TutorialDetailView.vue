<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tutorialDataMap } from '../data/tutorials/index.js'
import TutorialViewer from '../components/TutorialViewer.vue'

const route = useRoute()
const router = useRouter()
const tutorialId = computed(() => route.params.id)
const tutorialData = computed(() => tutorialDataMap[tutorialId.value])

const closeTutorial = () => {
  router.back()
}
</script>

<template>
  <TutorialViewer v-if="tutorialData" :tutorialData="tutorialData" @close="closeTutorial" />
  <div v-else class="not-found">Tutorial not found (Developing...)</div>
</template>

<style scoped>
.not-found {
  padding: 40px;
  text-align: center;
}
</style>
