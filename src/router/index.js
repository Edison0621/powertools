import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ToolsView from '../views/ToolsView.vue'
import ToolDetailView from '../views/ToolDetailView.vue'
import PatternsView from '../views/PatternsView.vue'
import TutorialsListView from '../views/TutorialsListView.vue'
import TutorialDetailView from '../views/TutorialDetailView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/tools', component: ToolsView },
  { path: '/tool/:id', component: ToolDetailView },
  { path: '/patterns', component: PatternsView },
  { path: '/tutorials/:category', component: TutorialsListView },
  { path: '/tutorial/:id', component: TutorialDetailView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
