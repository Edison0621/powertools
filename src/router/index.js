import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ToolsView from '../views/ToolsView.vue'
import ToolDetailView from '../views/ToolDetailView.vue'
import ToolReviewView from '../views/ToolReviewView.vue'
import FeaturedToolsView from '../views/FeaturedToolsView.vue'
import CategoryDetailView from '../views/CategoryDetailView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/tools', component: ToolsView },
  { path: '/tool/:id', component: ToolDetailView },
  { path: '/review/:id', name: 'ToolReview', component: ToolReviewView },
  { path: '/featured-tools', name: 'FeaturedTools', component: FeaturedToolsView },
  { path: '/category/:id', name: 'CategoryDetail', component: CategoryDetailView },
  { path: '/article/:id', name: 'ArticleDetail', component: ArticleDetailView },
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
