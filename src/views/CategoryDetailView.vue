<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 获取分类信息
const categoryData = {
  'ai-painting': {
    id: 'ai-painting',
    name: 'AI 绘画',
    icon: '🎨',
    desc: '文本生成图片、图像编辑',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    tools: [
      {
        name: 'Midjourney',
        icon: '🎨',
        desc: '顶级AI绘画工具，艺术创作首选',
        rating: 4.8,
        tag: '付费',
        price: '$10-60/月',
        features: ['文生图', '图像变体', '高分辨率'],
        color: '#7c3aed'
      },
      {
        name: 'DALL-E',
        icon: '🖼️',
        desc: 'OpenAI出品，创意图像生成',
        rating: 4.7,
        tag: '付费',
        price: '按量计费',
        features: ['精准控制', 'API调用', '商业授权'],
        color: '#10a37f'
      },
      {
        name: 'Stable Diffusion',
        icon: '🌈',
        desc: '开源AI图像生成，本地部署',
        rating: 4.8,
        tag: '开源',
        price: '免费',
        features: ['开源免费', '本地部署', '高度定制'],
        color: '#8b5cf6'
      },
      {
        name: 'Leonardo AI',
        icon: '🎭',
        desc: '游戏美术专用AI绘画工具',
        rating: 4.6,
        tag: '免费试用',
        price: '$0-48/月',
        features: ['游戏素材', '3D模型', '批量生成'],
        color: '#ec4899'
      },
      {
        name: 'Adobe Firefly',
        icon: '🔥',
        desc: 'Adobe官方AI，创意云集成',
        rating: 4.5,
        tag: '免费试用',
        price: '订阅制',
        features: ['商业授权', 'PS集成', '矢量生成'],
        color: '#ff0000'
      },
      {
        name: 'Ideogram',
        icon: '📝',
        desc: 'AI文字图像生成，海报设计',
        rating: 4.4,
        tag: '免费',
        price: '$0-48/月',
        features: ['文字渲染', '海报设计', '品牌设计'],
        color: '#3b82f6'
      }
    ]
  },
  'ai-writing': {
    id: 'ai-writing',
    name: 'AI 写作',
    icon: '✍️',
    desc: '文案创作、文章生成',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    tools: [
      {
        name: 'ChatGPT',
        icon: '🤖',
        desc: '最强大的AI对话助手，工作学习必备',
        rating: 4.9,
        tag: '免费',
        price: '$0-20/月',
        features: ['对话交流', '写作辅助', '代码生成'],
        color: '#10a37f'
      },
      {
        name: 'Notion AI',
        icon: '✍️',
        desc: '智能笔记工具，思维整理专家',
        rating: 4.6,
        tag: '免费试用',
        price: '$10/月',
        features: ['笔记整理', '内容总结', '文档优化'],
        color: '#000000'
      },
      {
        name: '文心一言',
        icon: '📖',
        desc: '百度出品，中文AI助手',
        rating: 4.5,
        tag: '免费',
        price: '免费',
        features: ['中文优化', '多轮对话', '文案生成'],
        color: '#4e6ef2'
      }
    ]
  },
  'ai-video': {
    id: 'ai-video',
    name: 'AI 视频',
    icon: '🎥',
    desc: '视频生成、编辑、特效',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    tools: [
      {
        name: 'Runway',
        icon: '🎥',
        desc: '专业AI视频创作平台',
        rating: 4.8,
        tag: '付费',
        price: '$12-28/月',
        features: ['文生视频', '视频编辑', '背景移除'],
        color: '#00d4ff'
      },
      {
        name: 'Synthesia',
        icon: '👤',
        desc: 'AI虚拟主播视频生成',
        rating: 4.6,
        tag: '付费',
        price: '$30/月起',
        features: ['虚拟主播', '多语言配音', '企业视频'],
        color: '#6366f1'
      },
      {
        name: 'D-ID',
        icon: '🗣️',
        desc: 'AI数字人视频制作',
        rating: 4.5,
        tag: '免费试用',
        price: '$0-300/月',
        features: ['数字人', '口型同步', '多语言'],
        color: '#f59e0b'
      }
    ]
  },
  'ai-audio': {
    id: 'ai-audio',
    name: 'AI 音频',
    icon: '🎵',
    desc: '音乐生成、语音合成',
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    tools: [
      {
        name: 'Mubert',
        icon: '🎵',
        desc: 'AI音乐生成，商用授权',
        rating: 4.5,
        tag: '免费试用',
        price: '$0-199/月',
        features: ['音乐生成', '商用授权', '多种风格'],
        color: '#ec4899'
      },
      {
        name: 'AIVA',
        icon: '🎹',
        desc: 'AI作曲，古典音乐专家',
        rating: 4.6,
        tag: '免费试用',
        price: '$0-33/月',
        features: ['古典音乐', '配乐生成', '情绪控制'],
        color: '#8b5cf6'
      },
      {
        name: 'Soundraw',
        icon: '🎼',
        desc: 'AI背景音乐生成器',
        rating: 4.4,
        tag: '付费',
        price: '$16.99/月',
        features: ['背景音乐', '无版权', '自定义'],
        color: '#3b82f6'
      }
    ]
  },
  'ai-coding': {
    id: 'ai-coding',
    name: 'AI 编程',
    icon: '💻',
    desc: '代码生成、代码审查',
    color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    tools: [
      {
        name: 'GitHub Copilot',
        icon: '💻',
        desc: '最智能的编程助手，提升效率10倍',
        rating: 4.7,
        tag: '付费',
        price: '$10/月',
        features: ['代码补全', '函数生成', '多语言'],
        color: '#238636'
      },
      {
        name: 'Cursor',
        icon: '⌨️',
        desc: 'AI代码编辑器，开发神器',
        rating: 4.8,
        tag: '免费试用',
        price: '$0-20/月',
        features: ['AI对话', '代码生成', '项目理解'],
        color: '#000000'
      },
      {
        name: 'Tabnine',
        icon: '🔧',
        desc: 'AI代码补全，全IDE支持',
        rating: 4.5,
        tag: '免费',
        price: '$0-39/月',
        features: ['代码补全', '团队训练', '私有部署'],
        color: '#ff6154'
      }
    ]
  },
  'ai-data': {
    id: 'ai-data',
    name: 'AI 数据',
    icon: '📊',
    desc: '数据分析、智能报表',
    color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    tools: [
      {
        name: 'Julius AI',
        icon: '📊',
        desc: 'AI数据分析助手',
        rating: 4.5,
        tag: '免费试用',
        price: '$0-99/月',
        features: ['数据分析', '可视化', '自然语言'],
        color: '#3b82f6'
      },
      {
        name: 'Tableau GPT',
        icon: '📈',
        desc: 'Tableau AI数据洞察',
        rating: 4.6,
        tag: '企业版',
        price: '企业定价',
        features: ['数据可视化', 'AI洞察', '报表生成'],
        color: '#e97627'
      },
      {
        name: 'DataRobot',
        icon: '🤖',
        desc: '自动化机器学习平台',
        rating: 4.7,
        tag: '企业版',
        price: '企业定价',
        features: ['AutoML', '模型部署', '预测分析'],
        color: '#00d4b5'
      }
    ]
  },
  'ai-education': {
    id: 'ai-education',
    name: 'AI 教育',
    icon: '🎓',
    desc: '智能家教、学习助手',
    color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    tools: [
      {
        name: 'Khan Academy',
        icon: '🎓',
        desc: 'AI个性化学习平台',
        rating: 4.8,
        tag: '免费',
        price: '免费',
        features: ['个性化学习', '智能辅导', '全学科'],
        color: '#14bf96'
      },
      {
        name: 'Duolingo',
        icon: '🦜',
        desc: 'AI语言学习应用',
        rating: 4.6,
        tag: '免费',
        price: '$0-13/月',
        features: ['语言学习', '游戏化', '口语练习'],
        color: '#58cc02'
      },
      {
        name: 'Quizlet',
        icon: '📚',
        desc: 'AI学习卡片和测试',
        rating: 4.5,
        tag: '免费',
        price: '$0-36/年',
        features: ['记忆卡片', '智能测试', '学习模式'],
        color: '#4255ff'
      }
    ]
  },
  'ai-marketing': {
    id: 'ai-marketing',
    name: 'AI 营销',
    icon: '👥',
    desc: '智能客服、营销自动化',
    color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    tools: [
      {
        name: 'Jasper',
        icon: '📝',
        desc: 'AI营销文案生成器',
        rating: 4.6,
        tag: '付费',
        price: '$39-125/月',
        features: ['文案生成', 'SEO优化', '多语言'],
        color: '#8b5cf6'
      },
      {
        name: 'Copy.ai',
        icon: '✍️',
        desc: 'AI营销内容创作',
        rating: 4.5,
        tag: '免费试用',
        price: '$0-186/月',
        features: ['广告文案', '社媒内容', '邮件营销'],
        color: '#3d4eac'
      },
      {
        name: 'HubSpot AI',
        icon: '🎯',
        desc: 'AI营销自动化平台',
        rating: 4.7,
        tag: '免费试用',
        price: '$0-3600/月',
        features: ['营销自动化', 'CRM集成', '智能客服'],
        color: '#ff7a59'
      }
    ]
  }
}

const categoryId = computed(() => route.params.id)
const category = computed(() => categoryData[categoryId.value] || {})

// 筛选条件
const selectedTag = ref('全部')
const selectedSort = ref('rating')
const searchQuery = ref('')

const tags = ['全部', '免费', '付费', '免费试用', '开源', '企业版']
const sortOptions = [
  { value: 'rating', label: '评分最高' },
  { value: 'name', label: '名称排序' },
  { value: 'price', label: '价格排序' }
]

// 筛选和排序工具
const filteredTools = computed(() => {
  let tools = category.value.tools || []
  
  // 标签筛选
  if (selectedTag.value !== '全部') {
    tools = tools.filter(tool => tool.tag === selectedTag.value)
  }
  
  // 搜索筛选
  if (searchQuery.value) {
    tools = tools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  // 排序
  if (selectedSort.value === 'rating') {
    tools = [...tools].sort((a, b) => b.rating - a.rating)
  } else if (selectedSort.value === 'name') {
    tools = [...tools].sort((a, b) => a.name.localeCompare(b.name))
  }
  
  return tools
})

// 工具对比
const compareList = ref([])

const toggleCompare = (tool) => {
  const index = compareList.value.findIndex(t => t.name === tool.name)
  if (index > -1) {
    compareList.value.splice(index, 1)
  } else {
    if (compareList.value.length < 3) {
      compareList.value.push(tool)
    }
  }
}

const isInCompare = (tool) => {
  return compareList.value.some(t => t.name === tool.name)
}

// 跳转到工具详情
const goToToolDetail = (toolName) => {
  const toolId = toolName.toLowerCase().replace(/\s+/g, '-')
  router.push(`/review/${toolId}`)
}

// 返回首页
const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="category-detail-view">
    <!-- 页面头部 -->
    <div class="page-hero" :style="{ background: category.color }">
      <div class="hero-content">
        <button class="back-btn" @click="goBack">
          <span class="back-arrow">←</span>
          <span>返回首页</span>
        </button>
        
        <div class="hero-main">
          <div class="category-icon-large">{{ category.icon }}</div>
          <h1 class="category-name">{{ category.name }}</h1>
          <p class="category-desc">{{ category.desc }}</p>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-value">{{ category.tools?.length || 0 }}</span>
              <span class="stat-label">精选工具</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">严格测试</span>
              <span class="stat-label">质量保证</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">持续更新</span>
              <span class="stat-label">最新推荐</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <div class="filter-container">
        <!-- 搜索框 -->
        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="搜索工具..."
            class="search-input"
          >
        </div>

        <!-- 标签筛选 -->
        <div class="filter-group">
          <span class="filter-label">类型：</span>
          <div class="filter-tags">
            <button
              v-for="tag in tags"
              :key="tag"
              :class="['tag-btn', { active: selectedTag === tag }]"
              @click="selectedTag = tag"
            >
              {{ tag }}
            </button>
          </div>
        </div>

        <!-- 排序 -->
        <div class="sort-group">
          <span class="sort-label">排序：</span>
          <select v-model="selectedSort" class="sort-select">
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- 工具列表 -->
    <div class="tools-section">
      <div class="tools-header">
        <h2 class="section-title">
          共找到 <span class="highlight">{{ filteredTools.length }}</span> 个工具
        </h2>
        <div v-if="compareList.length > 0" class="compare-info">
          <span class="compare-text">已选择 {{ compareList.length }}/3 个工具对比</span>
          <button class="compare-btn">开始对比</button>
        </div>
      </div>

      <div class="tools-grid">
        <div
          v-for="tool in filteredTools"
          :key="tool.name"
          class="tool-card"
          :style="{ '--tool-color': tool.color }"
        >
          <!-- 工具卡片顶部 -->
          <div class="card-top">
            <div class="tool-icon">{{ tool.icon }}</div>
            <div class="tool-tags">
              <span class="tool-tag" :class="getTagClass(tool.tag)">{{ tool.tag }}</span>
              <button 
                class="compare-toggle"
                :class="{ active: isInCompare(tool) }"
                @click.stop="toggleCompare(tool)"
              >
                <span v-if="isInCompare(tool)">✓</span>
                <span v-else>+</span>
              </button>
            </div>
          </div>

          <!-- 工具信息 -->
          <h3 class="tool-name">{{ tool.name }}</h3>
          <p class="tool-desc">{{ tool.desc }}</p>

          <!-- 评分和价格 -->
          <div class="tool-meta">
            <div class="tool-rating">
              <span class="rating-star">⭐</span>
              <span class="rating-value">{{ tool.rating }}</span>
            </div>
            <div class="tool-price">{{ tool.price }}</div>
          </div>

          <!-- 特性标签 -->
          <div class="tool-features">
            <span
              v-for="(feature, idx) in tool.features"
              :key="idx"
              class="feature-badge"
            >
              {{ feature }}
            </span>
          </div>

          <!-- 查看详情按钮 -->
          <button class="detail-btn" @click="goToToolDetail(tool.name)">
            <span>查看详情</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredTools.length === 0" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">未找到匹配的工具</h3>
        <p class="empty-desc">试试调整筛选条件或搜索关键词</p>
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
        '开源': 'opensource',
        '企业版': 'enterprise'
      }
      return tagMap[tag] || ''
    }
  }
}
</script>

<style scoped>
.category-detail-view {
  min-height: 100vh;
  background: var(--bg-color);
}

/* 页面头部 */
.page-hero {
  position: relative;
  padding: 32px 40px 40px;
  color: white;
  overflow: hidden;
}

.page-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(100px);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 24px;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-4px);
}

.back-arrow {
  font-size: 16px;
}

.hero-main {
  text-align: center;
}

.category-icon-large {
  font-size: 56px;
  margin-bottom: 16px;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
}

.category-name {
  font-size: 42px;
  font-weight: 900;
  margin-bottom: 10px;
  letter-spacing: -1.5px;
}

.category-desc {
  font-size: 16px;
  opacity: 0.95;
  margin-bottom: 24px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: 800;
}

.stat-label {
  font-size: 12px;
  opacity: 0.9;
}

.stat-divider {
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.3);
}

/* 筛选栏 */
.filter-bar {
  background: white;
  border-bottom: 2px solid #e5e7eb;
  padding: 24px 40px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.filter-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.search-wrapper {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  opacity: 0.5;
}

.search-input {
  width: 100%;
  padding: 12px 20px 12px 48px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-label {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
}

.filter-tags {
  display: flex;
  gap: 8px;
}

.tag-btn {
  padding: 8px 18px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s;
}

.tag-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.tag-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
}

.sort-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sort-label {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
}

.sort-select {
  padding: 8px 16px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s;
}

.sort-select:focus {
  outline: none;
  border-color: #667eea;
}

/* 工具列表 */
.tools-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
}

.tools-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
}

.highlight {
  color: #667eea;
  font-size: 28px;
}

.compare-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.compare-text {
  font-size: 14px;
  color: var(--text-secondary);
}

.compare-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.compare-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.tool-card {
  background: white;
  border-radius: 20px;
  padding: 28px;
  border: 2px solid #e5e7eb;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.tool-card:hover::before {
  transform: scaleX(1);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tool-icon {
  font-size: 56px;
}

.tool-tags {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tool-tag {
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  color: white;
}

.tool-tag.free {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.tool-tag.premium {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.tool-tag.trial {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.tool-tag.opensource {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.tool-tag.enterprise {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
}

.compare-toggle {
  width: 32px;
  height: 32px;
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
}

.compare-toggle:hover {
  background: #e5e7eb;
}

.compare-toggle.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
}

.tool-name {
  font-size: 22px;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 10px;
}

.tool-desc {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  font-size: 14px;
}

.tool-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f3f4f6;
}

.tool-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
}

.rating-star {
  font-size: 18px;
}

.rating-value {
  font-size: 16px;
  color: var(--text-color);
}

.tool-price {
  font-size: 14px;
  font-weight: 700;
  color: #667eea;
}

.tool-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.feature-badge {
  padding: 6px 12px;
  background: #f0f4ff;
  color: #667eea;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}

.detail-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: var(--tool-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.detail-btn:hover {
  transform: translateX(4px);
  box-shadow: -4px 4px 0 rgba(0, 0, 0, 0.1);
}

.btn-arrow {
  font-size: 18px;
  transition: transform 0.3s;
}

.detail-btn:hover .btn-arrow {
  transform: translateX(4px);
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

.empty-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 10px;
}

.empty-desc {
  font-size: 16px;
  color: var(--text-secondary);
}

/* 响应式 */
@media (max-width: 1200px) {
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-hero {
    padding: 24px 20px 32px;
  }

  .back-btn {
    padding: 6px 16px;
    font-size: 13px;
    margin-bottom: 20px;
  }

  .category-icon-large {
    font-size: 48px;
    margin-bottom: 12px;
  }

  .category-name {
    font-size: 28px;
    margin-bottom: 8px;
  }

  .category-desc {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .hero-stats {
    flex-direction: column;
    gap: 12px;
  }

  .stat-divider {
    display: none;
  }

  .stat-item {
    gap: 2px;
  }

  .stat-value {
    font-size: 18px;
  }

  .stat-label {
    font-size: 11px;
  }

  .filter-bar {
    padding: 20px;
  }

  .filter-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-wrapper {
    min-width: auto;
  }

  .filter-group,
  .sort-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .tools-section {
    padding: 20px;
  }

  .tools-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
