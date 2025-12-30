<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 热门 AI 工具分类
const aiCategories = [
  {
    id: 1,
    icon: '🎨',
    name: 'AI 绘画',
    desc: '文本生成图片、图像编辑',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    tools: ['Midjourney', 'DALL-E', 'Stable Diffusion'],
    hot: true
  },
  {
    id: 2,
    icon: '✍️',
    name: 'AI 写作',
    desc: '文案创作、文章生成',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    tools: ['ChatGPT', 'Notion AI', '文心一言'],
    hot: true
  },
  {
    id: 3,
    icon: '🎥',
    name: 'AI 视频',
    desc: '视频生成、编辑、特效',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    tools: ['Runway', 'Synthesia', 'D-ID']
  },
  {
    id: 4,
    icon: '🎵',
    name: 'AI 音频',
    desc: '音乐生成、语音合成',
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    tools: ['Mubert', 'AIVA', 'Soundraw']
  },
  {
    id: 5,
    icon: '💻',
    name: 'AI 编程',
    desc: '代码生成、代码审查',
    color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    tools: ['GitHub Copilot', 'Cursor', 'Tabnine']
  },
  {
    id: 6,
    icon: '📊',
    name: 'AI 数据',
    desc: '数据分析、智能报表',
    color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    tools: ['Julius AI', 'Tableau GPT', 'DataRobot']
  },
  {
    id: 7,
    icon: '🎓',
    name: 'AI 教育',
    desc: '智能家教、学习助手',
    color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    tools: ['Khan Academy', 'Duolingo', 'Quizlet']
  },
  {
    id: 8,
    icon: '👥',
    name: 'AI 营销',
    desc: '智能客服、营销自动化',
    color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    tools: ['Jasper', 'Copy.ai', 'HubSpot AI']
  }
]

// 精选优质工具推荐
const hotTools = [
  {
    name: 'ChatGPT',
    desc: '最强大的AI对话助手，工作学习必备',
    icon: '🤖',
    tag: '免费',
    users: '编辑推荐',
    color: '#10a37f',
    // 详细信息
    fullDesc: 'OpenAI 开发的大语言模型，能够进行自然对话、写作、编程、分析等多种任务。是目前全球最受欢迎的 AI 工具。',
    features: ['自然对话交流', '多语言支持', '代码生成与调试', '文案创作', '数据分析'],
    pricing: [
      { plan: '免费版', price: '$0/月', features: ['GPT-3.5 模型', '基础功能', '标准响应速度'] },
      { plan: 'Plus版', price: '$20/月', features: ['GPT-4 模型', '优先访问', '更快响应', '插件支持'] }
    ],
    pros: ['功能强大全面', '响应速度快', '社区资源丰富', '持续更新迭代'],
    cons: ['免费版有限制', '中文理解略逊色', '需要科学上网'],
    useCase: '写作、编程、学习、头脑风暴、数据分析',
    rating: 4.9,
    officialUrl: 'https://chat.openai.com'
  },
  {
    name: 'Midjourney',
    desc: '顶级AI绘画工具，艺术创作首选',
    icon: '🎨',
    tag: '付费',
    users: '编辑推荐',
    color: '#7c3aed',
    fullDesc: '业界领先的 AI 图像生成工具，通过文本描述即可生成高质量的艺术作品，深受设计师和创作者喜爱。',
    features: ['文本生成图像', '图像变体生成', '高分辨率输出', '风格迁移', '艺术风格多样'],
    pricing: [
      { plan: '基础版', price: '$10/月', features: ['200张图片/月', '基础分辨率', '社区使用'] },
      { plan: '标准版', price: '$30/月', features: ['无限张图片', '高分辨率', '私密模式'] },
      { plan: '专业版', price: '$60/月', features: ['所有功能', '最快生成', '商业授权'] }
    ],
    pros: ['图像质量顶级', '艺术性强', '社区活跃', '更新频繁'],
    cons: ['需要学习提示词', '价格较高', '需Discord使用'],
    useCase: '艺术创作、设计灵感、插画制作、概念设计',
    rating: 4.8,
    officialUrl: 'https://www.midjourney.com'
  },
  {
    name: 'GitHub Copilot',
    desc: '最智能的编程助手，提升效率10倍',
    icon: '💻',
    tag: '付费',
    users: '编辑推荐',
    color: '#238636',
    fullDesc: 'GitHub 和 OpenAI 联合开发的 AI 编程助手，基于海量代码训练，能够智能补全代码、生成函数、解释代码逻辑。',
    features: ['智能代码补全', '函数生成', '代码解释', '多语言支持', 'IDE 深度集成'],
    pricing: [
      { plan: '个人版', price: '$10/月', features: ['所有编辑器支持', '无限建议', '代码解释'] },
      { plan: '企业版', price: '$39/用户/月', features: ['企业级安全', '代码审查', '团队协作'] }
    ],
    pros: ['大幅提升效率', 'IDE集成完美', '代码质量高', '学习成本低'],
    cons: ['需要付费', '偶尔建议不准', '依赖网络'],
    useCase: '日常编程、学习新语言、代码重构、快速原型',
    rating: 4.7,
    officialUrl: 'https://github.com/features/copilot'
  },
  {
    name: 'Notion AI',
    desc: '智能笔记工具，思维整理专家',
    icon: '✍️',
    tag: '免费试用',
    users: '编辑推荐',
    color: '#000000',
    fullDesc: 'Notion 内置的 AI 助手，能够帮你写作、总结、翻译、头脑风暴，让笔记和知识管理更高效。',
    features: ['AI 写作辅助', '内容总结', '自动翻译', '头脑风暴', '文档优化'],
    pricing: [
      { plan: '免费试用', price: '$0', features: ['20次AI请求', '基础功能'] },
      { plan: 'AI订阅', price: '$10/月', features: ['无限AI请求', '所有AI功能'] }
    ],
    pros: ['与Notion完美集成', '中文支持好', '功能实用', '价格合理'],
    cons: ['需要Notion账户', 'AI功能单独收费', '响应偶尔较慢'],
    useCase: '笔记整理、会议纪要、文章写作、学习总结',
    rating: 4.6,
    officialUrl: 'https://www.notion.so/product/ai'
  },
  {
    name: 'Google Gemini',
    desc: 'Google最强多模态AI，免费好用',
    icon: '💎',
    tag: '免费',
    users: '编辑推荐',
    color: '#4285f4',
    fullDesc: 'Google 最新推出的多模态 AI 大模型，支持文本、图像、视频、音频等多种输入形式，在推理、编程、创意等方面表现出色。',
    features: ['多模态理解', '超长上下文', '高级推理能力', '代码生成', '实时信息检索'],
    pricing: [
      { plan: '免费版', price: '$0/月', features: ['Gemini Pro模型', '基础功能', '标准速度'] },
      { plan: 'Advanced版', price: '$19.99/月', features: ['Gemini Ultra模型', '优先访问', '更长上下文', '高级功能'] }
    ],
    pros: ['多模态能力强', '免费版额度充足', '与Google服务集成', '推理能力优秀'],
    cons: ['部分地区受限', '中文能力待提升', 'Ultra版价格较高'],
    useCase: '图文分析、代码编写、学习研究、创意设计、数据分析',
    rating: 4.7,
    officialUrl: 'https://gemini.google.com'
  },
  {
    name: 'OpenAI Sora',
    desc: '革命性AI视频生成，未来已来',
    icon: '🎬',
    tag: '内测中',
    users: '编辑推荐',
    color: '#ff6b6b',
    fullDesc: 'OpenAI 开发的革命性 AI 视频生成模型，可以根据文本描述生成长达60秒的高质量视频，具有惊人的物理世界模拟能力。',
    features: ['文本生成视频', '长视频生成', '物理规律模拟', '多场景切换', '高清画质输出'],
    pricing: [
      { plan: '内测版', price: '暂未公开', features: ['限量访问', '基础功能', '反馈优先'] },
      { plan: '正式版', price: '即将推出', features: ['完整功能', '商业授权', '优先支持'] }
    ],
    pros: ['视频质量惊艳', '物理模拟真实', '创意无限可能', 'OpenAI技术背书'],
    cons: ['尚未公开发布', '生成耗时较长', '价格未知', '需要排队等待'],
    useCase: '视频创作、广告制作、教育演示、概念展示、短视频生成',
    rating: 4.9,
    officialUrl: 'https://openai.com/sora'
  },
  {
    name: 'DeepSeek',
    desc: '国产开源AI，数学代码强',
    icon: '🧠',
    tag: '免费',
    users: '编辑推荐',
    color: '#667eea',
    rating: 4.6
  },
  {
    name: '即梦',
    desc: '字节AI图片生成，中文友好',
    icon: '🎨',
    tag: '免费',
    users: '编辑推荐',
    color: '#f093fb',
    rating: 4.5
  },
  {
    name: 'Qoder',
    desc: '智谱AI编程助手，国产好用',
    icon: '💻',
    tag: '免费',
    users: '编辑推荐',
    color: '#238636',
    rating: 4.5
  },
  {
    name: 'Antigravity',
    desc: '多功能AI助手，一站式解决',
    icon: '🚀',
    tag: '免费',
    users: '编辑推荐',
    color: '#4facfe',
    rating: 4.4
  },
  {
    name: 'Google AI Studio',
    desc: 'Google AI开发平台，强大免费',
    icon: '🧪',
    tag: '免费',
    users: '编辑推荐',
    color: '#4285f4',
    rating: 4.7
  },
  {
    name: 'Stable Diffusion',
    desc: '开源AI图像生成，本地部署',
    icon: '🌈',
    tag: '开源',
    users: '编辑推荐',
    color: '#8b5cf6',
    rating: 4.8
  },
  {
    name: 'Hugging Face',
    desc: '全球最大AI模型社区',
    icon: '🤗',
    tag: '开源',
    users: '编辑推荐',
    color: '#ffcc00',
    rating: 4.9
  },
  {
    name: 'Kimi PPT',
    desc: 'AI一键生成PPT，完全免费',
    icon: '📊',
    tag: '免费',
    users: '编辑推荐',
    color: '#667eea',
    rating: 4.6
  },
  {
    name: 'Runway',
    desc: '专业AI视频创作平台',
    icon: '🎥',
    tag: '付费',
    users: '编辑推荐',
    color: '#00d4ff',
    rating: 4.8
  }
]

// 精选评测与资讯
const news = [
  {
    title: 'ChatGPT vs Claude：哪个更适合你的工作场景？',
    date: '2小时前',
    tag: '深度评测',
    views: '8.2K'
  },
  {
    title: 'Midjourney V6 深度测评：图像质量提升有多大？',
    date: '1天前',
    tag: '工具评测',
    views: '12.5K'
  },
  {
    title: '5款AI视频工具横向对比：谁才是真正的王者',
    date: '2天前',
    tag: '横向对比',
    views: '6.8K'
  },
  {
    title: 'AI编程助手选购指南：从免费到付费全解析',
    date: '3天前',
    tag: '选购指南',
    views: '9.3K'
  }
]

// 当前选中的分类
const selectedCategory = ref(null)

const selectCategory = (category) => {
  selectedCategory.value = selectedCategory.value?.id === category.id ? null : category
}

// 工具详情跳转
const goToToolReview = (toolName) => {
  const toolId = toolName.toLowerCase().replace(/\s+/g, '-')
  router.push(`/review/${toolId}`)
}

// 跳转到精选工具列表页
const goToFeaturedTools = () => {
  router.push('/featured-tools')
}
</script>

<template>
  <div class="home-view">
    <!-- Hero Section - 更加炫酷的首屏 -->
    <div class="hero-section">
      <div class="hero-bg">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
        <div class="grid-overlay"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-badge" data-aos="fade-down">
          <span class="badge-icon">✨</span>
          <span>精选高质量 AI 工具</span>
        </div>
        
        <h1 class="hero-title" data-aos="fade-up">
          <span class="gradient-text">只推荐最好的 AI 工具</span>
          <br>
          <span class="typing-text">精选优于海选，质量胜过数量</span>
        </h1>
        
        <p class="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
          每一个工具都经过<strong>严格测试</strong> • 只收录<strong>真正好用</strong>的 • 持续<strong>深度评测</strong>
        </p>
        
        <div class="hero-search" data-aos="fade-up" data-aos-delay="200">
          <input 
            type="text" 
            placeholder="🔍 搜索你需要的 AI 工具..."
            class="search-input-large"
          >
          <button class="search-btn-large">搜索</button>
        </div>
        
        <div class="hero-features" data-aos="fade-up" data-aos-delay="300">
          <div class="feature-badge">
            <span class="badge-icon">✨</span>
            <span class="badge-text">严格筛选</span>
          </div>
          <div class="feature-badge">
            <span class="badge-icon">🔬</span>
            <span class="badge-text">深度测评</span>
          </div>
          <div class="feature-badge">
            <span class="badge-icon">🎯</span>
            <span class="badge-text">实用优先</span>
          </div>
          <div class="feature-badge">
            <span class="badge-icon">🚀</span>
            <span class="badge-text">持续更新</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Hot Tools - 精选工具推荐 -->
    <section class="hot-tools-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="fire-icon">🎯</span>
          精选优质工具
        </h2>
        <p class="section-desc">每个工具都经过团队亲测，确保真正好用</p>
      </div>
      
      <div class="hot-tools-grid">
        <div 
          v-for="tool in hotTools.slice(0, 4)" 
          :key="tool.name"
          class="hot-tool-card"
          :style="{ '--tool-color': tool.color }"
        >
          <div class="tool-header">
            <div class="tool-icon-large">{{ tool.icon }}</div>
            <span class="tool-tag" :class="tool.tag === '免费' ? 'free' : 'premium'">{{ tool.tag }}</span>
          </div>
          <h3 class="tool-name">{{ tool.name }}</h3>
          <p class="tool-desc">{{ tool.desc }}</p>
          <div class="tool-users">
            <span class="users-icon">✨</span>
            <span>{{ tool.users }}</span>
          </div>
          <button class="tool-btn" @click="goToToolReview(tool.name)">查看详情 →</button>
        </div>
      </div>

      <div class="more-tools-btn-wrapper">
        <button class="more-tools-btn" @click="goToFeaturedTools">
          <span>查看更多精选工具</span>
          <span class="arrow">→</span>
        </button>
      </div>
    </section>

    <!-- Categories - AI 工具分类 -->
    <section class="categories-section">
      <div class="section-header">
        <h2 class="section-title">🎯 8大核心分类</h2>
        <p class="section-desc">精选每个分类的TOP工具，不追求数量，只追求质量</p>
      </div>
      
      <div class="categories-grid">
        <div 
          v-for="category in aiCategories" 
          :key="category.id"
          class="category-card"
          :class="{ active: selectedCategory?.id === category.id, hot: category.hot }"
          @click="selectCategory(category)"
        >
          <div class="category-bg" :style="{ background: category.color }"></div>
          <div class="category-content">
            <div class="category-icon">{{ category.icon }}</div>
            <h3 class="category-name">{{ category.name }}</h3>
            <p class="category-desc">{{ category.desc }}</p>
            <div class="category-tools">
              <span 
                v-for="(tool, idx) in category.tools" 
                :key="idx"
                class="tool-tag-small"
              >
                {{ tool }}
              </span>
            </div>
            <div v-if="category.hot" class="hot-badge">🔥 HOT</div>
          </div>
        </div>
      </div>
    </section>

    <!-- News - 最新资讯 -->
    <section class="news-section">
      <div class="section-header">
        <h2 class="section-title">📰 精选评测与资讯</h2>
        <p class="section-desc">深度评测和行业洞察，帮你选对工具</p>
      </div>
      
      <div class="news-grid">
        <div 
          v-for="(item, idx) in news" 
          :key="idx"
          class="news-card"
        >
          <div class="news-header">
            <span class="news-tag" :class="item.tag">#{{ item.tag }}</span>
            <span class="news-date">🕒 {{ item.date }}</span>
          </div>
          <h3 class="news-title">{{ item.title }}</h3>
          <div class="news-footer">
            <span class="news-views">👁️ {{ item.views }} 阅读</span>
            <button class="news-link">查看详情 →</button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section - 行动召唤 -->
    <section class="cta-section">
      <div class="cta-bg">
        <div class="cta-particles"></div>
      </div>
      <div class="cta-content">
        <div class="cta-icon">🚀</div>
        <h2 class="cta-title">只推荐真正好用的</h2>
        <p class="cta-desc">订阅我们的周刊，获取最新精选工具和深度评测</p>
        <div class="cta-actions">
          <input 
            type="email" 
            placeholder="输入你的邮箱"
            class="cta-input"
          >
          <button class="cta-btn">免费订阅 ✨</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ==== Hero Section - 更加炫酷的首屏 ==== */
.hero-section {
  background: #0f0f23;
  border-radius: 0;
  padding: 100px 40px;
  margin-bottom: 80px;
  color: white;
  position: relative;
  overflow: hidden;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: float 15s infinite ease-in-out;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #667eea 0%, transparent 70%);
  top: -200px;
  right: -100px;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #f093fb 0%, transparent 70%);
  bottom: -150px;
  left: -100px;
  animation-delay: 5s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #4facfe 0%, transparent 70%);
  top: 50%;
  left: 50%;
  animation-delay: 10s;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(50px, -50px) scale(1.1); }
  66% { transform: translate(-30px, 30px) scale(0.9); }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 10px 24px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 32px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.badge-icon {
  font-size: 18px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.hero-title {
  font-size: 64px;
  font-weight: 900;
  margin-bottom: 24px;
  line-height: 1.2;
  letter-spacing: -2px;
}

.gradient-text {
  background: linear-gradient(135deg, #fff 0%, #a8edea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.typing-text {
  background: linear-gradient(135deg, #fed6e3 0%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 48px;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-search {
  max-width: 600px;
  margin: 0 auto 60px;
  display: flex;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 8px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-input-large {
  flex: 1;
  border: none;
  background: transparent;
  padding: 16px 24px;
  color: white;
  font-size: 16px;
  outline: none;
}

.search-input-large::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-btn-large {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 40px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.search-btn-large:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.feature-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 12px 24px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}

.feature-badge:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.3);
}

.badge-icon {
  font-size: 20px;
}

.badge-text {
  font-size: 15px;
  font-weight: 600;
  color: white;
  letter-spacing: 0.5px;
}

/* ==== Section Common ==== */
section {
  margin-bottom: 100px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 42px;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.fire-icon {
  animation: fire 1.5s infinite;
}

@keyframes fire {
  0%, 100% { transform: scale(1) rotate(-5deg); }
  50% { transform: scale(1.1) rotate(5deg); }
}

.section-desc {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* ==== Hot Tools Section ==== */
.hot-tools-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.hot-tool-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 32px;
  border: 2px solid var(--border-color);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.hot-tool-card::before {
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

.hot-tool-card:hover {
  transform: translateY(-8px);
  border-color: var(--tool-color);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.hot-tool-card:hover::before {
  transform: scaleX(1);
}

.tool-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tool-icon-large {
  font-size: 64px;
}

.tool-tag {
  padding: 6px 16px;
  border-radius: 20px;
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

.tool-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

.tool-desc {
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.6;
}

.tool-users {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.users-icon {
  font-size: 16px;
}

.tool-btn {
  width: 100%;
  padding: 14px;
  background: var(--tool-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.tool-btn:hover {
  transform: translateX(4px);
  box-shadow: -4px 4px 0 rgba(0, 0, 0, 0.1);
}

/* More Tools Button */
.more-tools-btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.more-tools-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.more-tools-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
}

.more-tools-btn .arrow {
  transition: transform 0.3s;
  font-size: 18px;
}

.more-tools-btn:hover .arrow {
  transform: translateX(4px);
}

/* ==== Categories Section ==== */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.category-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 0;
  border: 2px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  height: 280px;
}

.category-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  opacity: 0.9;
  transition: all 0.3s;
}

.category-card:hover .category-bg {
  height: 100%;
  opacity: 1;
}

.category-content {
  position: relative;
  z-index: 1;
  padding: 32px;
  color: var(--text-color);
  transition: color 0.3s;
}

.category-card:hover .category-content {
  color: white;
}

.category-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.category-name {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
}

.category-desc {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 16px;
}

.category-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tool-tag-small {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.hot-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 59, 48, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.category-card.active {
  transform: scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

/* ==== News Section ==== */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.news-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--border-color);
  transition: all 0.3s;
  cursor: pointer;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.news-tag {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
}

.news-tag.深度评测 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.news-tag.工具评测 {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.news-tag.横向对比 {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.news-tag.选购指南 {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
}

.news-date {
  font-size: 13px;
  color: var(--text-secondary);
}

.news-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 16px;
  line-height: 1.5;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-views {
  font-size: 14px;
  color: var(--text-secondary);
}

.news-link {
  background: none;
  border: none;
  color: var(--primary-color);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.news-link:hover {
  transform: translateX(4px);
}

/* ==== CTA Section ==== */
.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 80px 40px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.cta-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(2px 2px at 20% 30%, white, transparent),
                    radial-gradient(2px 2px at 60% 70%, white, transparent),
                    radial-gradient(1px 1px at 50% 50%, white, transparent),
                    radial-gradient(1px 1px at 80% 10%, white, transparent);
  background-size: 200% 200%;
  opacity: 0.2;
  animation: twinkle 5s infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-icon {
  font-size: 64px;
  margin-bottom: 24px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.cta-title {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.cta-desc {
  font-size: 18px;
  margin-bottom: 40px;
  opacity: 0.95;
}

.cta-actions {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 8px;
  border-radius: 50px;
}

.cta-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 14px 24px;
  color: white;
  font-size: 16px;
  outline: none;
}

.cta-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.cta-btn {
  background: white;
  color: #667eea;
  border: none;
  padding: 14px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(255, 255, 255, 0.4);
}

/* Responsive */
@media (max-width: 1400px) {
  .hot-tools-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1200px) {
  .hot-tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 20px;
    min-height: 600px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-features {
    gap: 12px;
  }

  .feature-badge {
    padding: 10px 20px;
  }

  .badge-text {
    font-size: 14px;
  }

  .section-title {
    font-size: 32px;
  }

  .hot-tools-grid {
    grid-template-columns: 1fr;
  }

  .categories-grid,
  .news-grid {
    grid-template-columns: 1fr;
  }

  .cta-title {
    font-size: 28px;
  }

  .cta-actions {
    flex-direction: column;
  }
}
</style>
