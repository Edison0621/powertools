import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ToolsView from '../views/ToolsView.vue'
import ToolDetailView from '../views/ToolDetailView.vue'
import ToolReviewView from '../views/ToolReviewView.vue'
import FeaturedToolsView from '../views/FeaturedToolsView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/tools', component: ToolsView },
  { path: '/tool/:id', component: ToolDetailView },
  { path: '/review/:id', name: 'ToolReview', component: ToolReviewView },
  { path: '/featured-tools', name: 'FeaturedTools', component: FeaturedToolsView },
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
