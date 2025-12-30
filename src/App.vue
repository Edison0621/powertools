<script setup>
import { ref, computed, onMounted } from 'vue'
import ToolCard from './components/ToolCard.vue'
import ToolPage from './components/ToolPage.vue'
import PatternViewer from './components/patterns/PatternViewer.vue'
import TutorialViewer from './components/TutorialViewer.vue'
import { tools } from './data/tools.js'
import { patterns } from './data/patterns.js'
import { htmlTutorial } from './data/tutorials/html-tutorial.js'
import { cssTutorial } from './data/tutorials/css-tutorial.js'
import { javascriptTutorial } from './data/tutorials/javascript-tutorial.js'
import { vueTutorial } from './data/tutorials/vue-tutorial.js'
import { typescriptTutorial } from './data/tutorials/typescript-tutorial.js'
import { reactTutorial } from './data/tutorials/react-tutorial.js'
import { angularTutorial } from './data/tutorials/angular-tutorial.js'

const isDark = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('home')
const selectedToolCategory = ref('all') // 工具子分类
const selectedPatternCategory = ref('all') // 设计模式子分类
const expandedPatternCategory = ref(null) // 展开的设计模式二级分类
const selectedPattern = ref(null) // 选中的具体模式
const selectedTool = ref(null)
const selectedTutorial = ref(null)
const favorites = ref([])
const isSidebarOpen = ref(true)

// 教程数据映射
const tutorialDataMap = {
  'html': htmlTutorial,
  'css': cssTutorial,
  'javascript': javascriptTutorial,
  'vue': vueTutorial,
  'typescript': typescriptTutorial,
  'react': reactTutorial,
  'angular': angularTutorial,
  // 后续添加其他教程
}

// 主导航分类
const mainCategories = [
  { id: 'home', name: '首页', icon: '🏠', description: '欢迎来到在线教程平台' },
  { id: 'ai', name: '人工智能', icon: '🤖', description: '机器学习, 深度学习' },
  { id: 'frontend', name: '前端开发', icon: '🎨', description: 'HTML, CSS, JavaScript等' },
  { id: 'language', name: '编程语言', icon: '💻', description: 'Java, Python, Go, C++等' },
  { id: 'database', name: '数据库', icon: '💾', description: 'MySQL, PostgreSQL, MongoDB' },
  { id: 'mobile', name: '移动开发', icon: '📱', description: 'Android, iOS, Flutter' },
  { id: 'middleware', name: '中间件', icon: '🔌', description: 'Redis, Kafka, RabbitMQ等' },
  { id: 'devops', name: '运维开发', icon: '🛠️', description: 'Docker, K8s, CI/CD' },
  { id: 'algorithm', name: '算法', icon: '🧮', description: '排序, 查找, 动态规划等' },
  { id: 'data-structure', name: '数据结构', icon: '🗂️', description: '数组, 链表, 树, 图等' },
  { id: 'design-pattern', name: '设计模式', icon: '🏗️', description: '23种设计模式详解' },
  { id: 'powertools', name: '开发工具', icon: '⚡', description: '在线工具集合' }
]

// 工具子分类
const toolCategories = [
  { id: 'all', name: '全部工具', icon: '📦', count: 0 },
  { id: 'crypto', name: '加密工具', icon: '🔐', count: 0 },
  { id: 'converter', name: '转换工具', icon: '🔄', count: 0 },
  { id: 'web', name: 'Web工具', icon: '🌐', count: 0 },
  { id: 'dev', name: '开发工具', icon: '💻', count: 0 },
  { id: 'network', name: '网络工具', icon: '📡', count: 0 },
  { id: 'text', name: '文本工具', icon: '📝', count: 0 },
  { id: 'image', name: '图片工具', icon: '🖼️', count: 0 },
  { id: 'other', name: '其他工具', icon: '🔧', count: 0 }
]

// 统计每个分类的工具数量
toolCategories.forEach(category => {
  if (category.id === 'all') {
    category.count = tools.length
  } else {
    category.count = tools.filter(tool => tool.category === category.id).length
  }
})

// 设计模式分类
const patternCategories = [
  { id: 'all', name: '全部模式', icon: '📦', count: 23 },
  { id: 'creational', name: '创建型模式', icon: '🏭', count: 5 },
  { id: 'structural', name: '结构型模式', icon: '🏛️', count: 7 },
  { id: 'behavioral', name: '行为型模式', icon: '🎭', count: 11 }
]

// 按分类组织设计模式
const patternsByCategory = computed(() => {
  const result = {
    creational: [],
    structural: [],
    behavioral: []
  }
  patterns.forEach(pattern => {
    result[pattern.category].push(pattern)
  })
  return result
})

// 教程卡片数据
const tutorials = [
  // 前端开发
  {
    id: 'html',
    name: 'HTML 教程',
    category: 'frontend',
    icon: '📑',
    color: '#E34F26',
    description: '学习 HTML5 网页结构语言',
    level: '初级'
  },
  {
    id: 'css',
    name: 'CSS 教程',
    category: 'frontend',
    icon: '🎨',
    color: '#1572B6',
    description: '掌握网页样式设计',
    level: '初级'
  },
  {
    id: 'javascript',
    name: 'JavaScript 教程',
    category: 'frontend',
    icon: '📜',
    color: '#F7DF1E',
    description: '前端编程语言基础',
    level: '中级'
  },
  {
    id: 'typescript',
    name: 'TypeScript 教程',
    category: 'frontend',
    icon: '📜',
    color: '#3178C6',
    description: 'JavaScript 超集，类型安全，企业级',
    level: '中级'
  },
  {
    id: 'vue',
    name: 'Vue.js 教程',
    category: 'frontend',
    icon: '📚',
    color: '#42B883',
    description: '渐进式 JavaScript 框架',
    level: '中级'
  },
  {
    id: 'react',
    name: 'React 教程',
    category: 'frontend',
    icon: '⚛️',
    color: '#61DAFB',
    description: '用于构建用户界面的 JS 库',
    level: '中级'
  },
    {
    id: 'angular',
    name: 'Angular 教程',
    category: 'frontend',
    icon: '📚',
    color: '#DD0031',
    description: 'TypeScript 框架，企业级应用开发',
    level: '中级'
  },
  // 后端开发
   {
    id: 'csharp',
    name: 'C#  教程',
    category: 'backend',
    icon: '☕',
    color: '#007396',
    description: '面向对象编程语言',
    level: '中级'
  },
  {
    id: 'java',
    name: 'Java 教程',
    category: 'backend',
    icon: '☕',
    color: '#007396',
    description: '面向对象编程语言',
    level: '中级'
  },
  {
    id: 'python',
    name: 'Python 教程',
    category: 'backend',
    icon: '🐍',
    color: '#3776AB',
    description: '简单易学的编程语言',
    level: '初级'
  },
  {
    id: 'go',
    name: 'Go 教程',
    category: 'backend',
    icon: '🐹',
    color: '#00ADD8',
    description: 'Google 开发的编程语言',
    level: '中级'
  },
  {
    id: 'rust',
    name: 'Rust 教程',
    category: 'language',
    icon: '🦀',
    color: '#CE422B',
    description: '系统级编程，内存安全，无GC',
    level: '高级'
  },
  {
    id: 'nodejs',
    name: 'Node.js 教程',
    category: 'backend',
    icon: '🟢',
    color: '#339933',
    description: 'JavaScript 运行时环境',
    level: '中级'
  },
  
  // 数据库
  {
    id: 'mysql',
    name: 'MySQL 教程',
    category: 'database',
    icon: '💾',
    color: '#4479A1',
    description: '最流行的关系型数据库',
    level: '中级'
  },
  {
    id: 'mssql',
    name: 'SQL Server 教程',
    category: 'database',
    icon: '💾',
    color: '#CC2927',
    description: 'Microsoft 关系型数据库，企业级',
    level: '中级'
  },
 {
    id: 'postgresql',
    name: 'PostgreSQL 教程',
    category: 'database',
    icon: '🐘',
    color: '#336791',
    description: '先进开源数据库，ACID支持，JSON',
    level: '中级'
  },
  {
    id: 'doris',
    name: 'Doris 教程',
    category: 'database',
    icon: '⚡',
    color: '#FF6600',
    description: 'MPP 分析型数据库，实时OLAP',
    level: '高级'
  },
  {
    id: 'redis',
    name: 'Redis 教程',
    category: 'database',
    icon: '📊',
    color: '#DC382D',
    description: '高性能缓存数据库',
    level: '中级'
  },
  {
    id: 'mongodb',
    name: 'MongoDB 教程',
    category: 'database',
    icon: '🍃',
    color: '#47A248',
    description: 'NoSQL 文档数据库',
    level: '中级'
  },
  
  // 移动开发
  {
    id: 'android',
    name: 'Android 教程',
    category: 'mobile',
    icon: '🤖',
    color: '#3DDC84',
    description: 'Android 应用开发',
    level: '中级'
  },
  {
    id: 'flutter',
    name: 'Flutter 教程',
    category: 'mobile',
    icon: '👦',
    color: '#02569B',
    description: '跨平台移动应用框架',
    level: '中级'
  },
  
  // 运维开发
  {
    id: 'docker',
    name: 'Docker 教程',
    category: 'devops',
    icon: '🐳',
    color: '#2496ED',
    description: '容器化应用部署',
    level: '中级'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes 教程',
    category: 'devops',
    icon: '☸️',
    color: '#326CE5',
    description: '容器编排平台',
    level: '高级'
  },
  {
    id: 'git',
    name: 'Git 教程',
    category: 'devops',
    icon: '🌳',
    color: '#F05032',
    description: '版本控制系统',
    level: '初级'
  },
  
  // 人工智能
  {
    id: 'machine-learning',
    name: '机器学习',
    category: 'ai',
    icon: '🧠',
    color: '#FF6F00',
    description: 'ML 算法与应用',
    level: '高级'
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow 教程',
    category: 'ai',
    icon: '🔥',
    color: '#FF6F00',
    description: '深度学习框架',
    level: '高级'
  }
]

const filteredContent = computed(() => {
  if (selectedCategory.value === 'home') {
    return tutorials
  }
  if (selectedCategory.value === 'powertools') {
    // 根据工具子分类筛选
    if (selectedToolCategory.value === 'all') {
      return tools
    }
    return tools.filter(tool => tool.category === selectedToolCategory.value)
  }
  if (selectedCategory.value === 'design-pattern') {
    return []
  }
  
  return tutorials.filter(item => {
    const matchesSearch = searchQuery.value === '' || 
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = item.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const currentCategory = computed(() => {
  return mainCategories.find(cat => cat.id === selectedCategory.value) || mainCategories[0]
})

// 面包屑导航路径
const breadcrumbs = computed(() => {
  const crumbs = []
  
  // 如果在开发工具分类
  if (selectedCategory.value === 'powertools') {
    crumbs.push({
      name: '开发工具',
      icon: '⚡'
    })
    
    // 如果选了子分类
    if (selectedToolCategory.value !== 'all') {
      const toolCat = toolCategories.find(cat => cat.id === selectedToolCategory.value)
      if (toolCat) {
        crumbs.push({
          name: toolCat.name,
          icon: toolCat.icon
        })
      }
    }
  }
  
  // 如果在设计模式分类
  if (selectedCategory.value === 'design-pattern') {
    crumbs.push({
      name: '设计模式',
      icon: '🏗️'
    })
    
    // 如果选了子分类
    if (selectedPatternCategory.value !== 'all') {
      const patternCat = patternCategories.find(cat => cat.id === selectedPatternCategory.value)
      if (patternCat) {
        crumbs.push({
          name: patternCat.name,
          icon: patternCat.icon
        })
      }
    }
  }
  
  // 如果在教程页面
  if (showTutorialPage.value && selectedTutorial.value) {
    const category = mainCategories.find(cat => cat.id === selectedCategory.value)
    if (category) {
      crumbs.push({
        name: category.name,
        icon: category.icon
      })
    }
    crumbs.push({
      name: selectedTutorial.value.name,
      icon: '📖'
    })
  }
  
  return crumbs
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleFavorite = (toolId) => {
  const index = favorites.value.indexOf(toolId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(toolId)
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

const openTool = (tool) => {
  selectedTool.value = tool
}

const closeTool = () => {
  selectedTool.value = null
}

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  searchQuery.value = ''
  // 切换分类时，关闭当前打开的教程
  if (selectedTutorial.value) {
    selectedTutorial.value = null
  }
  // 切换到开发工具时，重置子分类为全部
  if (categoryId === 'powertools') {
    selectedToolCategory.value = 'all'
  }
  // 切换到设计模式时，重置子分类为全部
  if (categoryId === 'design-pattern') {
    selectedPatternCategory.value = 'all'
  }
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false
  }
}

const selectToolCategory = (categoryId) => {
  selectedToolCategory.value = categoryId
  // 关闭教程，返回工具列表
  if (selectedTutorial.value) {
    selectedTutorial.value = null
  }
  selectedTool.value = null // 关闭工具详情页，返回工具列表
}

const selectPatternCategory = (categoryId) => {
  selectedPatternCategory.value = categoryId
  // 关闭教程，返回设计模式列表
  if (selectedTutorial.value) {
    selectedTutorial.value = null
  }
  expandedPatternCategory.value = null
  selectedPattern.value = null
}

const togglePatternCategory = (categoryId) => {
  if (expandedPatternCategory.value === categoryId) {
    // 如果已经展开，则收起
    expandedPatternCategory.value = null
    selectedPatternCategory.value = categoryId
  } else {
    // 展开该分类
    expandedPatternCategory.value = categoryId
    selectedPatternCategory.value = categoryId
  }
  // 关闭教程，返回设计模式列表
  if (selectedTutorial.value) {
    selectedTutorial.value = null
  }
  selectedPattern.value = null
}

const selectSpecificPattern = (categoryId, pattern) => {
  selectedPatternCategory.value = categoryId
  selectedPattern.value = pattern
}

const openTutorial = (tutorial) => {
  const tutorialData = tutorialDataMap[tutorial.id]
  if (tutorialData) {
    // 自动切换到教程所属的分类
    if (tutorial.category) {
      selectedCategory.value = tutorial.category
    }
    selectedTutorial.value = tutorialData
  } else {
    alert(`教程内容开发中: ${tutorial.name}`)
  }
}

const closeTutorial = () => {
  selectedTutorial.value = null
}

// 计算属性: 是否显示开发工具页
const showPowerTools = computed(() => {
  return selectedCategory.value === 'powertools' && !selectedTool.value
})

// 计算属性: 是否显示工具详情页
const showToolPage = computed(() => {
  return selectedTool.value !== null
})

// 计算属性: 是否显示设计模式页
const showDesignPattern = computed(() => {
  return selectedCategory.value === 'design-pattern'
})

// 计算属性: 是否显示教程页
const showTutorialPage = computed(() => {
  return selectedTutorial.value !== null
})

// 计算属性: 是否显示教程列表
const showTutorials = computed(() => {
  return !showPowerTools.value && !showDesignPattern.value && !selectedTool.value && !showTutorialPage.value
})

// 计算属性: 获取当前教程数据
const currentTutorialData = computed(() => {
  return selectedTutorial.value
})

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  const savedFavorites = localStorage.getItem('favorites')
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites)
  }
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false
  }
})
</script>

<template>
  <div class="app" :class="{ dark: isDark }">
    <!-- 顶部导航栏 -->
    <header class="header" role="banner">
      <div class="header-container">
        <div class="header-content">
          <!-- 汉堡包菜单 -->
          <button class="menu-toggle" @click="toggleSidebar" aria-label="切换菜单">
            <span class="menu-icon">{{ isSidebarOpen ? '✕' : '☰' }}</span>
          </button>
          
          <div class="logo">
            <span class="logo-icon" aria-hidden="true">🤖</span>
            <h1>AI追梦者</h1>
            <span class="tagline">在线教程库</span>
          </div>
          
          <div class="header-right">
            <div class="search-bar" role="search">
              <span class="search-icon" aria-hidden="true">🔍</span>
              <input 
                v-model="searchQuery" 
                type="search" 
                placeholder="搜索工具..."
                class="search-input"
                aria-label="搜索开发工具"
                autocomplete="off"
              />
            </div>

            <button 
              @click="toggleTheme" 
              class="theme-toggle"
              :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
            >
              {{ isDark ? '☀️' : '🌙' }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="layout">
      <!-- 左侧边栏导航 -->
          <aside class="sidebar" :class="{ open: isSidebarOpen }" role="navigation" aria-label="主导航">
        <div class="sidebar-header">
          <h2 class="sidebar-title">📚 教程分类</h2>
        </div>
        <div class="sidebar-content">
          <nav class="sidebar-nav">
            <div v-for="category in mainCategories" :key="category.id" class="nav-group">
              <button
                @click="selectCategory(category.id)"
                :class="['nav-item', { active: selectedCategory === category.id }]"
                :aria-label="`查看${category.name}`"
                :aria-pressed="selectedCategory === category.id"
              >
                <span class="nav-icon" aria-hidden="true">{{ category.icon }}</span>
                <div class="nav-text">
                  <div class="nav-name">{{ category.name }}</div>
                  <div class="nav-desc">{{ category.description }}</div>
                </div>
              </button>
              
              <!-- 工具的二级菜单 -->
              <div v-if="category.id === 'powertools' && selectedCategory === 'powertools'" class="sub-nav">
                <button
                  v-for="toolCat in toolCategories"
                  :key="toolCat.id"
                  @click="selectToolCategory(toolCat.id)"
                  :class="['sub-nav-item', { active: selectedToolCategory === toolCat.id }]"
                  :aria-label="`查看${toolCat.name}`"
                >
                  <span class="sub-nav-icon">{{ toolCat.icon }}</span>
                  <span class="sub-nav-name">{{ toolCat.name }}</span>
                  <span class="sub-nav-count">({{ toolCat.count }})</span>
                </button>
              </div>

              <!-- 设计模式的二级菜单 -->
              <div v-if="category.id === 'design-pattern' && selectedCategory === 'design-pattern'" class="sub-nav">
                <div v-for="patternCat in patternCategories" :key="patternCat.id" class="sub-nav-group">
                  <!-- 二级分类按钮 -->
                  <button
                    v-if="patternCat.id !== 'all'"
                    @click="togglePatternCategory(patternCat.id)"
                    :class="['sub-nav-item', 'expandable', { 
                      active: selectedPatternCategory === patternCat.id && expandedPatternCategory !== patternCat.id,
                      expanded: expandedPatternCategory === patternCat.id 
                    }]"
                    :aria-label="`查看${patternCat.name}`"
                  >
                    <span class="sub-nav-icon">{{ patternCat.icon }}</span>
                    <span class="sub-nav-name">{{ patternCat.name }}</span>
                    <span class="sub-nav-count">({{ patternCat.count }})</span>
                    <span class="expand-icon">{{ expandedPatternCategory === patternCat.id ? '▼' : '▶' }}</span>
                  </button>
                  
                  <!-- 全部模式按钮（不可展开） -->
                  <button
                    v-else
                    @click="selectPatternCategory(patternCat.id)"
                    :class="['sub-nav-item', { active: selectedPatternCategory === patternCat.id }]"
                    :aria-label="`查看${patternCat.name}`"
                  >
                    <span class="sub-nav-icon">{{ patternCat.icon }}</span>
                    <span class="sub-nav-name">{{ patternCat.name }}</span>
                    <span class="sub-nav-count">({{ patternCat.count }})</span>
                  </button>

                  <!-- 三级菜单：具体模式列表 -->
                  <div 
                    v-if="patternCat.id !== 'all' && expandedPatternCategory === patternCat.id" 
                    class="third-nav"
                  >
                    <button
                      v-for="pattern in patternsByCategory[patternCat.id]"
                      :key="pattern.id"
                      @click="selectSpecificPattern(patternCat.id, pattern)"
                      :class="['third-nav-item', { active: selectedPattern?.id === pattern.id }]"
                    >
                      <span class="third-nav-name">{{ pattern.name }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      <!-- 遮罩层(移动端) -->
      <div 
        v-if="isSidebarOpen" 
        class="sidebar-overlay" 
        @click="toggleSidebar"
        aria-hidden="true"
      ></div>

          <!-- 主内容区 -->
      <main class="main-content" role="main">
        <div class="content-wrapper">
          <!-- 面包屑导航 -->
          <div v-if="breadcrumbs.length > 0" class="breadcrumb-nav">
            <span v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
              <span class="breadcrumb-icon">{{ crumb.icon }}</span>
              <span class="breadcrumb-text">{{ crumb.name }}</span>
              <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">/</span>
            </span>
          </div>

          <!-- 首页欢迎区 -->
          <div v-if="selectedCategory === 'home'" class="hero-section">
            <div class="hero-content">
              <h1 class="hero-title">
                <span class="gradient-text">欢迎来到在线教程平台</span>
              </h1>
              <p class="hero-subtitle">学习编程，从这里开始 • 涵盖前端、后端、数据库、移动开发等多个领域</p>
              <div class="hero-stats">
                <div class="stat-item">
                  <div class="stat-number">50+</div>
                  <div class="stat-label">技术教程</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">100+</div>
                  <div class="stat-label">实用工具</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">1000+</div>
                  <div class="stat-label">代码示例</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 教程网格 -->
          <section v-if="showTutorials" class="content-section" aria-label="教程列表">
            <div class="section-header" v-if="selectedCategory !== 'home'">
              <h3>📚 精选教程</h3>
            </div>
            <div class="tutorials-grid">
              <div
                v-for="tutorial in filteredContent"
                :key="tutorial.id"
                class="tutorial-card"
                @click="openTutorial(tutorial)"
              >
                <div class="tutorial-header">
                  <div class="tutorial-icon" :style="{ background: tutorial.color }">
                    {{ tutorial.icon }}
                  </div>
                  <span class="tutorial-level" :class="tutorial.level">
                    {{ tutorial.level }}
                  </span>
                </div>
                <div class="tutorial-body">
                  <h3 class="tutorial-name">{{ tutorial.name }}</h3>
                  <p class="tutorial-desc">{{ tutorial.description }}</p>
                </div>
                <div class="tutorial-footer">
                  <span class="tutorial-link">开始学习 →</span>
                </div>
              </div>
            </div>
          </section>

          <!-- PowerTools 工具网格 -->
          <section v-if="showPowerTools" class="content-section" aria-label="工具列表">
            <div class="tools-grid">
              <ToolCard
                v-for="tool in filteredContent"
                :key="tool.id"
                :tool="tool"
                :is-favorite="favorites.includes(tool.id)"
                @click="openTool(tool)"
                @toggle-favorite="toggleFavorite(tool.id)"
              />
            </div>
          </section>

          <!-- 工具详情页 -->
          <section v-if="showToolPage" class="content-section" aria-label="工具详情">
            <ToolPage
              :tool="selectedTool"
              @close="closeTool"
            />
          </section>

          <!-- 设计模式页面 -->
          <section v-if="showDesignPattern" class="content-section pattern-section" aria-label="设计模式">
            <PatternViewer :category="selectedPatternCategory" :initial-pattern="selectedPattern" />
          </section>

          <!-- 教程详情页 -->
          <section v-if="showTutorialPage" class="content-section tutorial-section" aria-label="教程详情">
            <TutorialViewer
              :tutorialData="currentTutorialData"
              @close="closeTutorial"
            />
          </section>

          <!-- 空状态 -->
          <div v-if="filteredContent.length === 0 && !showDesignPattern" class="empty-state" role="status">
            <div class="empty-icon" aria-hidden="true">🔍</div>
            <h3>未找到相关内容</h3>
            <p>试试其他搜索词或选择不同的分类</p>
          </div>
        </div>
      </main>
    </div>

    <!-- 页脚 -->
    <footer class="footer" role="contentinfo">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="footer-logo">
              <span class="logo-icon">🤖</span>
              <span class="logo-text">AI追梦者</span>
            </div>
            <p class="footer-desc">在线教程平台，提供丰富的编程教程和开发工具，助力每一位开发者实现梦想</p>
          </div>
          
          <div class="footer-links">
            <div class="footer-column">
              <h4>快速导航</h4>
              <a href="#" @click.prevent>全部工具</a>
              <a href="#" @click.prevent>热门教程</a>
              <a href="#" @click.prevent>开发文档</a>
            </div>
            <div class="footer-column">
              <h4>关于我们</h4>
              <a href="#" @click.prevent>关于项目</a>
              <a href="#" @click.prevent>联系我们</a>
              <a href="#" @click.prevent>反馈建议</a>
            </div>
            <div class="footer-column">
              <h4>社区</h4>
              <a href="https://github.com/Edison0621/powertools" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="#" @click.prevent>加入我们</a>
              <a href="#" @click.prevent>贡献指南</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2025 AI追梦者. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #5cb85c;
  --primary-hover: #4cae4c;
  --bg-color: #f4f4f4;
  --card-bg: #ffffff;
  --text-color: #333333;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
  --sidebar-width: 240px;
  --header-height: 72px;
  --page-max-width: 1440px;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.dark {
  --primary-color: #5cb85c;
  --primary-hover: #6cc76c;
  --bg-color: #0f0f0f;
  --card-bg: #1a1a1a;
  --text-color: #e8e8e8;
  --text-secondary: #a0a0a0;
  --border-color: #2a2a2a;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.6);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
  line-height: 1.6;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  background: var(--card-bg);
}

/* Header */
.header {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: var(--header-height);
  box-shadow: var(--shadow);
}

.header-container {
  width: 100%;
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
  height: var(--header-height);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-color);
  padding: 8px;
  border-radius: 4px;
  transition: background 0.2s;
}

.menu-toggle:hover {
  background: var(--bg-color);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 22px;
  white-space: nowrap;
}

.logo h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.logo-icon {
  font-size: 32px;
}

.tagline {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 400;
  padding: 3px 10px;
  background: var(--bg-color);
  border-radius: 6px;
}

.header-right {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
}

.search-bar {
  max-width: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 0 16px;
  transition: border-color 0.2s;
}

.search-bar:focus-within {
  border-color: var(--primary-color);
}

.search-icon {
  font-size: 16px;
  color: var(--text-secondary);
}

.search-input {
  flex: 1;
  border: none;
  background: none;
  padding: 8px 0;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.theme-toggle {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.theme-toggle:hover {
  background: var(--border-color);
  transform: scale(1.05);
}

/* Layout */
.layout {
  display: flex;
  flex: 1;
  position: relative;
  width: 100%;
  max-width: var(--page-max-width);
  margin: 0 auto;
}

/* Sidebar */
.sidebar {
  width: var(--sidebar-width);
  background: var(--card-bg);
  border-right: 1px solid var(--border-color);
  height: calc(100vh - var(--header-height));
  position: sticky;
  top: var(--header-height);
  flex-shrink: 0;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  flex-shrink: 0;
  padding: 32px 20px 0;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px 20px;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0;
  padding-bottom: 20px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 20px;
}

.nav-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 12px;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
}

.nav-item:hover {
  background: var(--bg-color);
}

.nav-item.active {
  background: var(--primary-color);
  color: white;
}

.nav-item.active .nav-desc {
  color: rgba(255, 255, 255, 0.9);
}

.nav-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
  min-width: 0;
}

.nav-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-desc {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 二级菜单 */
.nav-group {
  margin-bottom: 8px;
}

.sub-nav {
  margin-left: 32px;
  margin-top: 8px;
  padding-left: 12px;
  border-left: 2px solid var(--border-color);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sub-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
  font-size: 13px;
  color: var(--text-color);
}

.sub-nav-item:hover {
  background: var(--bg-color);
}

.sub-nav-item.active {
  background: var(--primary-color);
  color: white;
  font-weight: 600;
}

.sub-nav-item.active .sub-nav-count {
  color: rgba(255, 255, 255, 0.9);
}

.sub-nav-item.expanded {
  background: var(--bg-color);
  font-weight: 600;
}

.sub-nav-item.expandable {
  position: relative;
}

.expand-icon {
  margin-left: 4px;
  font-size: 10px;
  opacity: 0.6;
  transition: transform 0.2s;
}

.sub-nav-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.sub-nav-name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sub-nav-count {
  font-size: 11px;
  opacity: 0.7;
  margin-left: auto;
}

/* 三级菜单 */
.third-nav {
  margin-left: 32px;
  margin-top: 6px;
  padding-left: 12px;
  border-left: 2px solid var(--border-color);
  animation: slideDown 0.3s ease-out;
}

.third-nav-item {
  display: block;
  width: 100%;
  padding: 6px 12px;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  font-size: 12px;
  color: var(--text-color);
  margin-bottom: 4px;
}

.third-nav-item:hover {
  background: var(--bg-color);
}

.third-nav-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
}

.third-nav-name {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-overlay {
  display: none;
}

/* Main Content */
.main-content {
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
}

.content-wrapper {
  width: 100%;
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 20px 24px;
}

/* Breadcrumb Navigation */
.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  margin-bottom: 24px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  font-size: 14px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  font-weight: 500;
}

.breadcrumb-icon {
  font-size: 16px;
}

.breadcrumb-text {
  color: var(--text-color);
}

.breadcrumb-separator {
  color: var(--text-secondary);
  margin: 0 4px;
  font-weight: 300;
}

/* Old Breadcrumb (legacy) */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--text-secondary);
}

.breadcrumb-item {
  transition: color 0.2s;
}

.breadcrumb-item.active {
  color: var(--text-color);
  font-weight: 600;
}

.breadcrumb-separator {
  color: var(--text-secondary);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, var(--primary-color) 0%, #4a9d5f 100%);
  border-radius: 16px;
  padding: 60px 0;
  margin-bottom: 40px;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.1)"/></svg>');
  opacity: 0.1;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(to right, #ffffff, #f0f9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 48px;
  opacity: 0.95;
  font-weight: 400;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 8px;
  background: linear-gradient(to bottom, #ffffff, #e0f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 16px;
  opacity: 0.9;
  font-weight: 500;
}

/* Category Header */
.category-header {
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--border-color);
}

.category-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.category-icon {
  font-size: 32px;
}

.category-title h2 {
  font-size: 28px;
  font-weight: 700;
}

.category-desc {
  color: var(--text-secondary);
  font-size: 16px;
}

/* Content Section */
.content-section {
  margin-bottom: 48px;
}

.pattern-section {
  margin-bottom: 0;
  padding: 0;
}

.section-header {
  margin-bottom: 24px;
}

.section-header h3 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
}

/* Tools Section */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

/* Tutorial Cards */
.tutorials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
}

.tutorial-card {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tutorial-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border-color: var(--primary-color);
}

.tutorial-header {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: linear-gradient(135deg, var(--bg-color) 0%, var(--card-bg) 100%);
}

.tutorial-icon {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  flex-shrink: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.tutorial-card:hover .tutorial-icon {
  transform: scale(1.1) rotate(5deg);
}

.tutorial-body {
  padding: 0 24px 20px;
  flex: 1;
}

.tutorial-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-color);
  line-height: 1.3;
}

.tutorial-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.tutorial-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tutorial-link {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}

.tutorial-card:hover .tutorial-link {
  transform: translateX(4px);
}

.tutorial-level {
  font-size: 12px;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 600;
  white-space: nowrap;
}

.tutorial-level.初级 {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  color: #2e7d32;
  border: 1px solid #81c784;
}

.dark .tutorial-level.初级 {
  background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
  color: #a5d6a7;
  border: 1px solid #388e3c;
}

.tutorial-level.中级 {
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  color: #ef6c00;
  border: 1px solid #ffb74d;
}

.dark .tutorial-level.中级 {
  background: linear-gradient(135deg, #e65100 0%, #ef6c00 100%);
  color: #ffcc80;
  border: 1px solid #f57c00;
}

.tutorial-level.高级 {
  background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%);
  color: #c2185b;
  border: 1px solid #f06292;
}

.dark .tutorial-level.高级 {
  background: linear-gradient(135deg, #880e4f 0%, #ad1457 100%);
  color: #f48fb1;
  border: 1px solid #c2185b;
}

/* Design Pattern Banner */
.design-pattern-banner {
  background: linear-gradient(135deg, var(--card-bg) 0%, var(--bg-color) 100%);
  border: 2px solid var(--primary-color);
  border-radius: 0;
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.design-pattern-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, var(--primary-color) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.05;
  z-index: 0;
}

.banner-icon {
  font-size: 72px;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.design-pattern-banner h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-color);
  position: relative;
  z-index: 1;
}

.design-pattern-banner p {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
}

.design-pattern-banner strong {
  color: var(--primary-color);
  font-weight: 700;
}

.banner-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 12px rgba(92, 184, 92, 0.3);
}

.banner-button:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(92, 184, 92, 0.4);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 24px;
  margin-bottom: 8px;
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 16px;
}

/* Footer */
.footer {
  background: var(--card-bg);
  border-top: 1px solid var(--border-color);
  margin-top: 60px;
}

.footer-container {
  width: 100%;
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 60px 24px 30px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;
}

.footer-brand {
  max-width: 350px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text-color);
}

.footer-logo .logo-icon {
  font-size: 36px;
}

.footer-logo .logo-text {
  letter-spacing: 0.5px;
}

.footer-desc {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
  max-width: 450px;
}

.footer-links {
  display: contents;
}

.footer-column h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-color);
}

.footer-column a {
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 10px;
  transition: all 0.2s;
  padding: 4px 0;
}

.footer-column a:hover {
  color: var(--primary-color);
  padding-left: 4px;
}

.footer-bottom {
  text-align: center;
  padding-top: 24px;
  margin-top: 40px;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 13px;
}

/* 黑夜模式特殊优化 */
.dark .breadcrumb-nav {
  background: rgba(26, 26, 26, 0.6);
  border-color: #2a2a2a;
}

.dark .tutorial-card {
  background: var(--card-bg);
  border-color: #2a2a2a;
}

.dark .tutorial-card:hover {
  border-color: var(--primary-color);
  background: #202020;
}

.dark .tutorial-header {
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
}

.dark .tutorial-footer {
  border-top-color: #2a2a2a;
}

.dark .search-bar {
  background: rgba(15, 15, 15, 0.8);
  border-color: #2a2a2a;
}

.dark .search-bar:focus-within {
  border-color: var(--primary-color);
  background: rgba(15, 15, 15, 1);
}

.dark .theme-toggle:hover {
  background: #2a2a2a;
}

/* 侧边栏菜单黑夜模式优化 */
.dark .nav-item {
  color: var(--text-color);
}

.dark .nav-item .nav-name {
  color: var(--text-color);
}

.dark .nav-item .nav-desc {
  color: var(--text-secondary);
}

.dark .nav-item:hover {
  background: rgba(26, 26, 26, 0.8);
}

.dark .nav-item.active {
  background: var(--primary-color);
  box-shadow: 0 2px 8px rgba(92, 184, 92, 0.3);
  color: white;
}

.dark .nav-item.active .nav-name {
  color: white;
}

.dark .nav-item.active .nav-desc {
  color: rgba(255, 255, 255, 0.9);
}

.dark .sub-nav-item {
  color: var(--text-color);
}

.dark .sub-nav-item .sub-nav-name {
  color: var(--text-color);
}

.dark .sub-nav-item:hover {
  background: rgba(26, 26, 26, 0.8);
}

.dark .sub-nav-item.active {
  background: var(--primary-color);
  box-shadow: 0 2px 6px rgba(92, 184, 92, 0.25);
  color: white;
}

.dark .sub-nav-item.active .sub-nav-name {
  color: white;
}

.dark .sub-nav-item.expanded {
  background: rgba(26, 26, 26, 0.6);
  color: var(--text-color);
}

.dark .third-nav-item {
  color: var(--text-color);
}

.dark .third-nav-item:hover {
  background: rgba(26, 26, 26, 0.8);
}

.dark .third-nav-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
  color: white;
}

.dark .sub-nav {
  border-left-color: #2a2a2a;
}

.dark .third-nav {
  border-left-color: #2a2a2a;
}

/* 级别徽标黑夜模式优化 */
.dark .tutorial-level {
  background: rgba(92, 184, 92, 0.2);
  color: #7cd97c;
  border: 1px solid rgba(92, 184, 92, 0.3);
}

.dark .tutorial-level.beginner {
  background: rgba(92, 184, 92, 0.2);
  color: #7cd97c;
  border-color: rgba(92, 184, 92, 0.3);
}

.dark .tutorial-level.intermediate {
  background: rgba(255, 165, 0, 0.2);
  color: #ffb84d;
  border-color: rgba(255, 165, 0, 0.3);
}

.dark .tutorial-level.advanced {
  background: rgba(220, 53, 69, 0.2);
  color: #ff6b7a;
  border-color: rgba(220, 53, 69, 0.3);
}

/* 卡片边框增强 */
.dark .tutorial-card {
  border: 1px solid #333333;
}

.dark .tutorial-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 16px rgba(92, 184, 92, 0.15);
}

.dark .category-header {
  border-bottom-color: #2a2a2a;
}

/* 底部黑夜模式优化 */
.dark .footer {
  background: var(--bg-color);
  border-top-color: #2a2a2a;
}

.dark .footer-logo {
  color: var(--text-color);
}

.dark .footer-column h4 {
  color: var(--text-color);
}

.dark .footer-bottom {
  border-top-color: #2a2a2a;
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: var(--header-height);
    transform: translateX(-100%);
    z-index: 999;
    box-shadow: var(--shadow);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }

  .header-content {
    gap: 12px;
  }

  .logo {
    font-size: 16px;
  }

  .logo-icon {
    font-size: 24px;
  }

  .tagline {
    display: none;
  }

  .search-bar {
    max-width: 200px;
  }

  .content-wrapper {
    padding: 0;
  }

  /* Hero Section Mobile */
  .hero-section {
    padding: 48px 20px;
    border-radius: 0;
    min-height: 320px;
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
    margin-bottom: 32px;
  }

  .hero-stats {
    flex-direction: column;
    gap: 24px;
  }

  .stat-number {
    font-size: 36px;
  }

  .stat-label {
    font-size: 14px;
  }

  .category-header {
    margin-bottom: 0;
    padding: 32px 20px 24px;
  }

  .category-title h2 {
    font-size: 24px;
  }

  .category-icon {
    font-size: 28px;
  }

  .content-section {
    padding: 32px 20px 48px;
  }

  .section-header h3 {
    font-size: 22px;
  }

  .tutorials-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .tutorial-card {
    border-radius: 12px;
  }

  .tutorial-header {
    padding: 20px;
  }

  .tutorial-icon {
    width: 56px;
    height: 56px;
    font-size: 28px;
  }

  .tutorial-body {
    padding: 0 20px 16px;
  }

  .tutorial-name {
    font-size: 18px;
  }

  .tutorial-footer {
    padding: 12px 20px;
  }

  .tools-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .design-pattern-banner {
    padding: 48px 20px;
    border-radius: 0;
    min-height: 400px;
  }

  .banner-icon {
    font-size: 56px;
  }

  .design-pattern-banner h2 {
    font-size: 24px;
  }

  .design-pattern-banner p {
    font-size: 14px;
  }

  .banner-button {
    padding: 12px 24px;
    font-size: 14px;
  }

  .footer-container {
    padding: 40px 20px 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer-brand {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .search-bar {
    max-width: 150px;
  }

  .search-input {
    font-size: 13px;
  }
}
</style>
