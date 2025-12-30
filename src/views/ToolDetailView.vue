<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tools } from '../data/tools.js'
import ToolPage from '../components/ToolPage.vue'

const route = useRoute()
const router = useRouter()
const toolId = computed(() => route.params.id)
const tool = computed(() => tools.find(t => t.id === toolId.value))

const closeTool = () => {
  router.back()
}
</script>

<template>
  <ToolPage v-if="tool" :tool="tool" @close="closeTool" />
  <div v-else class="not-found">Tool not found</div>
</template>

<style scoped>
.not-found {
  padding: 40px;
  text-align: center;
}
</style>
