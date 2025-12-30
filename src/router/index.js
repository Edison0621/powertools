import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ToolsView from '../views/ToolsView.vue'
import ToolDetailView from '../views/ToolDetailView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/tools', component: ToolsView },
  { path: '/tool/:id', component: ToolDetailView },
]

const router = createRouter({
  history: createWebHashHistory(),
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
