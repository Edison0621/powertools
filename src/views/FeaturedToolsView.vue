<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 所有精选工具数据（与 HomeView 保持一致）
const allFeaturedTools = [
  {
    name: 'ChatGPT',
    desc: '全球最受欢迎的AI对话助手',
    icon: '🤖',
    tag: '免费',
    users: '编辑推荐',
    color: '#10a37f',
    rating: 4.9,
    category: 'AI对话'
  },
  {
    name: 'Midjourney',
    desc: '顶级AI绘画工具，艺术创作首选',
    icon: '🎨',
    tag: '付费',
    users: '编辑推荐',
    color: '#7c3aed',
    rating: 4.8,
    category: 'AI绘画'
  },
  {
    name: 'GitHub Copilot',
    desc: '最智能的编程助手，提升效率10倍',
    icon: '💻',
    tag: '付费',
    users: '编辑推荐',
    color: '#238636',
    rating: 4.7,
    category: 'AI编程'
  },
  {
    name: 'Notion AI',
    desc: '智能笔记工具，思维整理专家',
    icon: '✍️',
    tag: '免费试用',
    users: '编辑推荐',
    color: '#000000',
    rating: 4.6,
    category: 'AI写作'
  },
  {
    name: 'Google Gemini',
    desc: 'Google最强多模态AI，免费好用',
    icon: '💎',
    tag: '免费',
    users: '编辑推荐',
    color: '#4285f4',
    rating: 4.7,
    category: 'AI对话'
  },
  {
    name: 'OpenAI Sora',
    desc: '革命性AI视频生成，未来已来',
    icon: '🎬',
    tag: '内测中',
    users: '编辑推荐',
    color: '#ff6b6b',
    rating: 4.9,
    category: 'AI视频'
  },
  {
    name: 'DeepSeek',
    desc: '国产开源AI，数学代码强',
    icon: '🧠',
    tag: '免费',
    users: '编辑推荐',
    color: '#667eea',
    rating: 4.6,
    category: 'AI对话'
  },
  {
    name: '即梦',
    desc: '字节AI图片生成，中文友好',
    icon: '🎨',
    tag: '免费',
    users: '编辑推荐',
    color: '#f093fb',
    rating: 4.5,
    category: 'AI绘画'
  },
  {
    name: 'Qoder',
    desc: '智谱AI编程助手，国产好用',
    icon: '💻',
    tag: '免费',
    users: '编辑推荐',
    color: '#238636',
    rating: 4.5,
    category: 'AI编程'
  },
  {
    name: 'Antigravity',
    desc: '多功能AI助手，一站式解决',
    icon: '🚀',
    tag: '免费',
    users: '编辑推荐',
    color: '#4facfe',
    rating: 4.4,
    category: 'AI对话'
  },
  {
    name: 'Google AI Studio',
    desc: 'Google AI开发平台，强大免费',
    icon: '🧪',
    tag: '免费',
    users: '编辑推荐',
    color: '#4285f4',
    rating: 4.7,
    category: 'AI对话'
  },
  {
    name: 'Stable Diffusion',
    desc: '开源AI图像生成，本地部署',
    icon: '🌈',
    tag: '开源',
    users: '编辑推荐',
    color: '#8b5cf6',
    rating: 4.8,
    category: 'AI绘画'
  },
  {
    name: 'Hugging Face',
    desc: '全球最大AI模型社区',
    icon: '🤗',
    tag: '开源',
    users: '编辑推荐',
    color: '#ffcc00',
    rating: 4.9,
    category: 'AI开发'
  },
  {
    name: 'Kimi PPT',
    desc: 'AI一键生成PPT，完全免费',
    icon: '📊',
    tag: '免费',
    users: '编辑推荐',
    color: '#667eea',
    rating: 4.6,
    category: 'AI写作'
  },
  {
    name: 'Runway',
    desc: '专业AI视频创作平台',
    icon: '🎥',
    tag: '付费',
    users: '编辑推荐',
    color: '#00d4ff',
    rating: 4.8,
    category: 'AI视频'
  }
]

// 筛选条件
const selectedCategory = ref('全部')
const selectedTag = ref('全部')
const searchQuery = ref('')

const categories = ['全部', 'AI对话', 'AI绘画', 'AI编程', 'AI写作', 'AI视频', 'AI开发']
const tags = ['全部', '免费', '付费', '免费试用', '内测中', '开源']

// 筛选后的工具列表
const filteredTools = ref(allFeaturedTools)

const filterTools = () => {
  filteredTools.value = allFeaturedTools.filter(tool => {
    const matchCategory = selectedCategory.value === '全部' || tool.category === selectedCategory.value
    const matchTag = selectedTag.value === '全部' || tool.tag === selectedTag.value
    const matchSearch = !searchQuery.value || 
      tool.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    return matchCategory && matchTag && matchSearch
  })
}

const selectCategory = (category) => {
  selectedCategory.value = category
  filterTools()
}

const selectTag = (tag) => {
  selectedTag.value = tag
  filterTools()
}

const handleSearch = () => {
  filterTools()
}

// 跳转到工具详情
const goToToolReview = (toolName) => {
  const toolId = toolName.toLowerCase().replace(/\s+/g, '-')
  router.push(`/review/${toolId}`)
}
</script>

<template>
  <div class="featured-tools-view">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <span class="title-icon">🎯</span>
          精选优质工具
        </h1>
        <p class="page-subtitle">每个工具都经过团队严格测试，只推荐真正好用的</p>
      </div>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-section">
      <div class="filter-container">
        <!-- 搜索框 -->
        <div class="search-wrapper">
          <div class="search-icon">🔍</div>
          <input 
            v-model="searchQuery"
            @input="handleSearch"
            type="text" 
            placeholder="搜索工具名称或描述..."
            class="search-input"
          >
        </div>

        <!-- 筛选卡片组 -->
        <div class="filters-wrapper">
          <!-- 分类筛选 -->
          <div class="filter-card">
            <div class="filter-header">
              <span class="filter-icon">📁</span>
              <span class="filter-title">分类</span>
            </div>
            <div class="filter-options">
              <button
                v-for="category in categories"
                :key="category"
                :class="['option-btn', { active: selectedCategory === category }]"
                @click="selectCategory(category)"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <!-- 标签筛选 -->
          <div class="filter-card">
            <div class="filter-header">
              <span class="filter-icon">🏷️</span>
              <span class="filter-title">类型</span>
            </div>
            <div class="filter-options">
              <button
                v-for="tag in tags"
                :key="tag"
                :class="['option-btn', { active: selectedTag === tag }]"
                @click="selectTag(tag)"
              >
                {{ tag }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 工具列表 -->
    <div class="tools-section">
      <div class="tools-stats">
        <span class="stats-text">共找到 <strong>{{ filteredTools.length }}</strong> 个精选工具</span>
      </div>

      <div class="tools-grid">
        <div 
          v-for="tool in filteredTools" 
          :key="tool.name"
          class="tool-card"
          :style="{ '--tool-color': tool.color }"
          @click="goToToolReview(tool.name)"
        >
          <div class="card-header">
            <div class="tool-icon">{{ tool.icon }}</div>
            <span class="tool-tag" :class="getTagClass(tool.tag)">{{ tool.tag }}</span>
          </div>
          
          <h3 class="tool-name">{{ tool.name }}</h3>
          <p class="tool-desc">{{ tool.desc }}</p>
          
          <div class="card-footer">
            <div class="tool-rating">
              <span class="rating-stars">⭐</span>
              <span class="rating-value">{{ tool.rating }}</span>
            </div>
            <div class="tool-category">{{ tool.category }}</div>
          </div>

          <button class="view-btn">查看详情 →</button>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredTools.length === 0" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>未找到匹配的工具</h3>
        <p>试试调整筛选条件或搜索关键词</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getTagClass(tag) {
      const tagMap = {
        '免费': 'free',
        '付费': 'premium',
        '免费试用': 'trial',
        '内测中': 'beta'
      }
      return tagMap[tag] || ''
    }
  }
}
</script>

<style scoped>
.featured-tools-view {
  min-height: 100vh;
  background: var(--bg-color);
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 40px;
  text-align: center;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.title-icon {
  font-size: 56px;
}

.page-subtitle {
  font-size: 18px;
  opacity: 0.95;
}

/* 筛选栏 */
.filter-section {
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
  padding: 32px 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.filter-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* 搜索框 */
.search-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  pointer-events: none;
  opacity: 0.5;
}

.search-input {
  width: 100%;
  padding: 16px 20px 16px 52px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 15px;
  color: var(--text-color);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
}

.search-input::placeholder {
  color: #9ca3af;
}

/* 筛选卡片组 */
.filters-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.filter-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.filter-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.filter-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f3f4f6;
}

.filter-icon {
  font-size: 20px;
}

.filter-title {
  font-size: 15px;
  font-weight: 700;
  color: #374151;
  letter-spacing: 0.5px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.option-btn {
  padding: 10px 18px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.option-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s;
}

.option-btn:hover::before {
  left: 100%;
}

.option-btn:hover {
  border-color: #667eea;
  color: #667eea;
  background: #f0f4ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.15);
}

.option-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

.option-btn.active:hover {
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

/* 工具列表 */
.tools-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
}

.tools-stats {
  margin-bottom: 24px;
  color: var(--text-secondary);
  font-size: 14px;
}

.tools-stats strong {
  color: var(--primary-color);
  font-size: 16px;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.tool-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 28px;
  border: 2px solid var(--border-color);
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--tool-color);
  transform: scaleX(0);
  transition: transform 0.3s;
}

.tool-card:hover {
  transform: translateY(-8px);
  border-color: var(--tool-color);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
}

.tool-card:hover::before {
  transform: scaleX(1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.tool-icon {
  font-size: 56px;
}

.tool-tag {
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 700;
}

.tool-tag.free {
  background: linear-gradient(135deg, #5cb85c 0%, #4cae4c 100%);
  color: white;
}

.tool-tag.premium {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
}

.tool-tag.trial {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.tool-tag.beta {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
  color: white;
}

.tool-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 10px;
}

.tool-desc {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  font-size: 14px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.tool-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  color: var(--text-color);
}

.rating-stars {
  font-size: 16px;
}

.rating-value {
  font-size: 15px;
}

.tool-category {
  padding: 4px 12px;
  background: var(--bg-color);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.view-btn {
  width: 100%;
  padding: 12px;
  background: var(--tool-color);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.view-btn:hover {
  transform: translateX(4px);
  box-shadow: -4px 4px 0 rgba(0, 0, 0, 0.1);
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 24px;
  color: var(--text-color);
  margin-bottom: 10px;
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 16px;
}

/* 响应式 */
@media (max-width: 1400px) {
  .tools-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1200px) {
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 40px 20px;
  }

  .page-title {
    font-size: 32px;
  }

  .filter-section {
    padding: 20px;
  }

  .filters-wrapper {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .filter-card {
    padding: 16px;
  }

  .filter-header {
    margin-bottom: 12px;
  }

  .option-btn {
    padding: 8px 14px;
    font-size: 13px;
  }

  .tools-section {
    padding: 20px;
  }

  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
