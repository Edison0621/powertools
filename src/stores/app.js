import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // Theme
  const isDark = ref(localStorage.getItem('theme') === 'dark')
  
  const initTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  // Sidebar
  const isSidebarOpen = ref(window.innerWidth >= 768)
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }
  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 768) {
      isSidebarOpen.value = false
    }
  }

  // Favorites
  const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))
  const toggleFavorite = (toolId) => {
    const index = favorites.value.indexOf(toolId)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(toolId)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  // Search
  const searchQuery = ref('')

  return {
    isDark,
    initTheme,
    toggleTheme,
    isSidebarOpen,
    toggleSidebar,
    closeSidebarOnMobile,
    favorites,
    toggleFavorite,
    searchQuery
  }
})
