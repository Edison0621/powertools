<template>
  <div class="tool-review-view" v-if="tool">
    <!-- Hero Section with Gradient Background -->
    <div class="review-hero" :style="{ background: tool.color }">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="tool-icon-mega">{{ tool.icon }}</div>
        <h1 class="tool-name">{{ tool.name }}</h1>
        <p class="tool-tagline">{{ tool.fullDesc }}</p>
        <div class="hero-meta">
          <div class="meta-item">
            <span class="meta-icon">⭐</span>
            <span class="meta-text">{{ tool.rating }}/5.0</span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">💰</span>
            <span class="meta-text">{{ tool.tag }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">✨</span>
            <span class="meta-text">编辑精选</span>
          </div>
        </div>
        <div class="hero-actions">
          <a :href="tool.officialUrl" target="_blank" class="primary-action">
            立即体验 🚀
          </a>
          <button @click="scrollToSection('pricing')" class="secondary-action">
            查看价格
          </button>
        </div>
      </div>
      <div class="hero-decoration">
        <div class="float-circle circle-1"></div>
        <div class="float-circle circle-2"></div>
        <div class="float-circle circle-3"></div>
      </div>
    </div>

    <!-- Use Cases (Quick Overview) -->
    <section class="use-cases-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">💡 实际应用场景</h2>
          <p class="section-subtitle">看看 {{ tool.name }} 如何帮助你</p>
        </div>
        <div class="use-cases-horizontal">
          <div 
            v-for="(useCase, idx) in getUseCases()" 
            :key="idx"
            class="use-case-compact"
          >
            <div class="compact-icon">{{ useCase.icon }}</div>
            <h3 class="compact-title">{{ useCase.title }}</h3>
            <p class="compact-desc">{{ useCase.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">🎯 核心功能</h2>
          <p class="section-subtitle">为什么选择 {{ tool.name }}？</p>
        </div>
        <div class="features-showcase">
          <div 
            v-for="(feature, idx) in tool.features" 
            :key="idx"
            class="feature-card"
            :style="{ animationDelay: `${idx * 0.1}s` }"
          >
            <div class="feature-number">{{ String(idx + 1).padStart(2, '0') }}</div>
            <div class="feature-content">
              <h3 class="feature-title">{{ feature }}</h3>
              <p class="feature-desc">{{ getFeatureDesc(idx) }}</p>
            </div>
            <div class="feature-icon">✓</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="pricing-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">💰 价格方案</h2>
          <p class="section-subtitle">选择最适合你的套餐</p>
        </div>
        <div class="pricing-grid">
          <div 
            v-for="(plan, idx) in tool.pricing" 
            :key="idx"
            class="pricing-card"
            :class="{ recommended: idx === 1 }"
          >
            <div v-if="idx === 1" class="recommended-badge">🔥 推荐</div>
            <div class="plan-header">
              <h3 class="plan-name">{{ plan.plan }}</h3>
              <div class="plan-price">
                <span class="price-amount">{{ plan.price.split('/')[0] }}</span>
                <span class="price-period" v-if="plan.price.includes('/')">
                  /{{ plan.price.split('/')[1] }}
                </span>
              </div>
            </div>
            <ul class="plan-features">
              <li v-for="(feat, i) in plan.features" :key="i">
                <span class="check">✓</span>
                {{ feat }}
              </li>
            </ul>
            <a :href="tool.officialPriceUrl" target="_blank" class="plan-btn">
              选择此方案
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Pros & Cons -->
    <section class="pros-cons-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">⚖️ 优缺点分析</h2>
          <p class="section-subtitle">客观评价，帮你做决策</p>
        </div>
        <div class="pros-cons-container">
          <div class="pros-side">
            <div class="side-header">
              <span class="side-icon">✅</span>
              <h3 class="side-title">优点</h3>
            </div>
            <ul class="points-list">
              <li v-for="(pro, idx) in tool.pros" :key="idx">{{ pro }}</li>
            </ul>
          </div>
          <div class="vs-divider">
            <span>VS</span>
          </div>
          <div class="cons-side">
            <div class="side-header">
              <span class="side-icon">⚠️</span>
              <h3 class="side-title">缺点</h3>
            </div>
            <ul class="points-list">
              <li v-for="(con, idx) in tool.cons" :key="idx">{{ con }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta">
      <div class="cta-container">
        <h2 class="cta-title">准备好开始使用了吗？</h2>
        <p class="cta-subtitle">加入数百万用户，体验 {{ tool.name }} 的强大功能</p>
        <a :href="tool.officialUrl" target="_blank" class="cta-button">
          <span>免费开始使用</span>
          <span class="arrow">→</span>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 工具数据（从路由参数或后端获取）
const toolsData = {
  'chatgpt': {
    name: 'ChatGPT',
    icon: '🤖',
    tag: '免费',
    color: 'linear-gradient(135deg, #10a37f 0%, #1a7f64 100%)',
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
    officialUrl: 'https://chatgpt.com/',
    officialPriceUrl: 'https://chatgpt.com/#pricing'
  },
  'midjourney': {
    name: 'Midjourney',
    icon: '🎨',
    tag: '付费',
    color: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
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
  'github-copilot': {
    name: 'GitHub Copilot',
    icon: '💻',
    tag: '付费',
    color: 'linear-gradient(135deg, #238636 0%, #196127 100%)',
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
  'notion-ai': {
    name: 'Notion AI',
    icon: '✍️',
    tag: '免费试用',
    color: 'linear-gradient(135deg, #000000 0%, #2d2d2d 100%)',
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
  'gemini': {
    name: 'Google Gemini',
    icon: '💎',
    tag: '免费',
    color: 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)',
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
  'sora': {
    name: 'OpenAI Sora',
    icon: '🎬',
    tag: '内测中',
    color: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
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
  'deepseek': {
    name: 'DeepSeek',
    icon: '🧠',
    tag: '免费',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fullDesc: '国产开源大模型，在数学、代码、推理等方面表现优异，完全免费使用，无需科学上网。',
    features: ['高级推理能力', '数学问题求解', '代码生成与调试', '多轮对话', '开源可部署'],
    pricing: [
      { plan: '免费版', price: '$0/月', features: ['无限使用', '全部功能', '快速响应'] },
      { plan: 'API版', price: '按量计费', features: ['企业级服务', '技术支持', '私有化部署'] }
    ],
    pros: ['完全免费', '中文优化', '国产开源', '数学能力强'],
    cons: ['知名度较低', '生态建设中', '部分功能待完善'],
    useCase: '数学计算、代码编写、逻辑推理、学习研究、技术问答',
    rating: 4.6,
    officialUrl: 'https://www.deepseek.com'
  },
  'jimeng': {
    name: '即梦',
    icon: '🎨',
    tag: '免费',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    fullDesc: '字节跳动推出的AI图片生成工具，支持文生图、图生图，中文优化，完全免费使用。',
    features: ['文本生成图片', '图片生成图片', '中文提示词', '多风格选择', '高清输出'],
    pricing: [
      { plan: '免费版', price: '$0', features: ['每日100张', '基础功能', '标准画质'] },
      { plan: '会员版', price: '即将推出', features: ['无限生成', '高清画质', '优先队列'] }
    ],
    pros: ['完全免费', '中文友好', '生成速度快', '无需科学上网'],
    cons: ['免费有次数限制', '风格较少', '功能较简单'],
    useCase: 'UI设计、插画创作、营销物料、社交媒体、个人创作',
    rating: 4.5,
    officialUrl: 'https://jimeng.jianying.com'
  },
  'qoder': {
    name: 'Qoder',
    icon: '💻',
    tag: '免费',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fullDesc: '智谱AI推出的AI编程助手，支持多种编程语言，提供代码补全、代码解释、Bug修复等功能。',
    features: ['智能代码补全', '代码解释', 'Bug检测与修复', '多语言支持', 'IDE集成'],
    pricing: [
      { plan: '免费版', price: '$0/月', features: ['基础功能', '每日额度', '社区支持'] },
      { plan: '专业版', price: '即将推出', features: ['无限额度', '高级功能', '优先支持'] }
    ],
    pros: ['免费好用', '中文优化', '响应迅速', '支持多语言'],
    cons: ['功能较基础', '生态建设中', '免费有额度'],
    useCase: '日常编程、代码学习、Bug修复、代码审查、快速开发',
    rating: 4.5,
    officialUrl: 'https://qoder.zhipu.ai'
  },
  'antigravity': {
    name: 'Antigravity',
    icon: '🚀',
    tag: '免费',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    fullDesc: '创新的AI助手工具，集成多种功能，包括智能对话、代码生成、内容创作等，一站式解决方案。',
    features: ['智能对话', '代码辅助', '内容创作', '数据分析', '多模态支持'],
    pricing: [
      { plan: '免费版', price: '$0/月', features: ['基础功能', '每日额度', '社区支持'] },
      { plan: '专业版', price: '$15/月', features: ['无限使用', '高级功能', '优先支持'] }
    ],
    pros: ['功能全面', '界面简洁', '价格合理', '持续更新'],
    cons: ['知名度不高', '生态建设中', '部分功能待完善'],
    useCase: '日常办公、编程开发、内容创作、学习研究、数据处理',
    rating: 4.4,
    officialUrl: 'https://antigravity.ai'
  },
  'google-ai-studio': {
    name: 'Google AI Studio',
    icon: '🧪',
    tag: '免费',
    color: 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)',
    fullDesc: 'Google推出的AI开发平台，提供Gemini API调用、Prompt工程、模型调试等功能，完全免费使用。',
    features: ['Gemini API访问', 'Prompt调试', '模型对比', '代码生成', '免费配额'],
    pricing: [
      { plan: '免费版', price: '$0/月', features: ['每分钟60次请求', 'Gemini Pro', '所有功能'] },
      { plan: '付费版', price: '按量计费', features: ['更高配额', '企业级服务', '技术支持'] }
    ],
    pros: ['完全免费', 'Google生态', 'API简单易用', '配额充足'],
    cons: ['需要科学上网', '中文文档少', '部分地区限制'],
    useCase: 'AI应用开发、Prompt测试、模型调试、学习研究、原型开发',
    rating: 4.7,
    officialUrl: 'https://aistudio.google.com'
  },
  'stable-diffusion': {
    name: 'Stable Diffusion',
    icon: '🌈',
    tag: '开源',
    color: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    fullDesc: '开源的AI图像生成模型，可本地部署，完全免费，支持文生图、图生图、图像编辑等多种功能。',
    features: ['文本生成图片', '图片编辑', '本地部署', '开源免费', '高度可定制'],
    pricing: [
      { plan: '开源版', price: '$0', features: ['完全免费', '本地运行', '所有功能'] },
      { plan: '云服务', price: '第三方提供', features: ['在线使用', '无需配置', '按量计费'] }
    ],
    pros: ['完全开源', '本地部署', '高度可控', '社区活跃'],
    cons: ['需要技术能力', '对硬件要求高', '学习成本高'],
    useCase: '艺术创作、图片生成、图像编辑、AI研究、个性化定制',
    rating: 4.8,
    officialUrl: 'https://stability.ai'
  },
  'huggingface': {
    name: 'Hugging Face',
    icon: '🤗',
    tag: '开源',
    color: 'linear-gradient(135deg, #ffcc00 0%, #ff6b6b 100%)',
    fullDesc: '全球最大的AI模型社区平台，提供数百万开源模型、数据集、应用空间，是AI开发者必备平台。',
    features: ['模型仓库', '数据集管理', 'Spaces部署', 'API调用', '社区分享'],
    pricing: [
      { plan: '免费版', price: '$0/月', features: ['无限公开模型', '免费Spaces', '社区访问'] },
      { plan: 'Pro版', price: '$9/月', features: ['私有模型', '更高算力', '优先支持'] }
    ],
    pros: ['模型资源丰富', '社区活跃', '开源免费', '易于集成'],
    cons: ['需要技术背景', '部分功能收费', '需要科学上网'],
    useCase: '模型下载、AI应用开发、模型训练、学术研究、开源分享',
    rating: 4.9,
    officialUrl: 'https://huggingface.co'
  },
  'kimi-ppt': {
    name: 'Kimi PPT',
    icon: '📊',
    tag: '免费',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fullDesc: 'Kimi推出的AI PPT生成工具，只需输入主题或提供文档，即可自动生成精美的演示文稿，完全免费。',
    features: ['一键生成PPT', '智能排版', '多样式模板', '文档解析', '在线编辑'],
    pricing: [
      { plan: '免费版', price: '$0', features: ['每日50次', '所有模板', '基础功能'] },
      { plan: '会员版', price: '即将推出', features: ['无限生成', '高级模板', '优先支持'] }
    ],
    pros: ['完全免费', '操作简单', '生成快速', '模板丰富'],
    cons: ['免费有次数限制', '定制化不足', '需要联网使用'],
    useCase: '工作汇报、产品推介、教学课件、分享演讲、商业路演',
    rating: 4.6,
    officialUrl: 'https://kimi.moonshot.cn'
  },
  'runway': {
    name: 'Runway',
    icon: '🎥',
    tag: '付费',
    color: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
    fullDesc: '专业AI视频创作平台，提供文生视频、视频编辑、背景移除等多种功能，是视频创作者的必备工具。',
    features: ['文生视频', '图生视频', '视频编辑', '背景移除', '动作捕捉'],
    pricing: [
      { plan: '免费版', price: '$0/月', features: ['125积分/月', '基础功能', '低分辨率'] },
      { plan: '标准版', price: '$12/月', features: ['625积分/月', '高清输出', '所有功能'] },
      { plan: '专业版', price: '$28/月', features: ['2250积分/月', '无限编辑', '企业功能'] }
    ],
    pros: ['功能强大', '专业级输出', '操作简单', '持续更新'],
    cons: ['价格较高', '免费额度少', '需要学习成本'],
    useCase: '视频制作、内容创作、广告制作、短视频、产品宣传',
    rating: 4.8,
    officialUrl: 'https://runwayml.com'
  }
}

const tool = computed(() => {
  const toolId = route.params.id
  return toolsData[toolId] || null
})

const getFeatureDesc = (idx) => {
  const descs = [
    '强大而直观，让你快速上手',
    '支持多种场景，满足不同需求',
    '持续优化，保持领先地位',
    '简单高效，节省宝贵时间',
    '精准可靠，值得信赖'
  ]
  return descs[idx] || '强大的功能支持'
}

const getUseCases = () => {
  const cases = tool.value.useCase.split('、')
  const icons = ['📝', '💻', '📚', '💡', '📊', '🎨']
  return cases.map((c, idx) => ({
    icon: icons[idx] || '✨',
    title: c,
    desc: `使用 ${tool.value.name} ${c}，让工作更高效`
  }))
}

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.tool-review-view {
  min-height: 100vh;
}

/* Hero Section */
.review-hero {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: visible;
  padding-bottom: 30px;
  z-index: 10;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
}

.tool-icon-mega {
  font-size: 80px;
  margin-bottom: 16px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.tool-name {
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 12px;
  letter-spacing: -1px;
}

.tool-tagline {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
  opacity: 0.95;
}

.hero-meta {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
}

.meta-icon {
  font-size: 16px;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  position: relative;
  z-index: 100;
}

.primary-action,
.secondary-action {
  padding: 12px 32px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
  position: relative;
  z-index: 100;
}

.primary-action {
  background: white;
  color: #000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.primary-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
}

.secondary-action {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.secondary-action:hover {
  background: rgba(255, 255, 255, 0.3);
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
}

.float-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: floatCircle 20s infinite ease-in-out;
  pointer-events: none;
}

.float-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: floatCircle 20s infinite ease-in-out;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -100px;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  left: 10%;
  animation-delay: 5s;
}

.circle-3 {
  width: 150px;
  height: 150px;
  top: 40%;
  left: -50px;
  animation-delay: 10s;
}

@keyframes floatCircle {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, -30px); }
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Sections */
section {
  padding: 35px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 28px;
}

.section-title {
  font-size: 30px;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 8px;
}

.section-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
}

/* Use Cases Section (replaces Quick Overview) */
.use-cases-section {
  background: var(--bg-color);
  margin-top: 0;
  padding-top: 35px;
  position: relative;
  z-index: 1;
}

.use-cases-horizontal {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 10px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
}

.use-case-compact {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 14px;
  padding: 20px 18px;
  text-align: center;
  transition: all 0.3s;
  flex: 1 1 0;
  min-width: 160px;
  max-width: 220px;
}

.use-case-compact:hover {
  transform: translateY(-4px);
  border-color: var(--primary-color);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.2);
}

.compact-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.compact-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
}

.compact-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Features Showcase */
.features-showcase {
  display: grid;
  gap: 16px;
}

.feature-card {
  background: var(--card-bg);
  padding: 20px;
  border-radius: 14px;
  border: 2px solid var(--border-color);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: center;
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateX(4px);
  border-color: var(--primary-color);
  box-shadow: -3px 0 0 var(--primary-color);
}

.feature-number {
  font-size: 32px;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.5;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
}

.feature-desc {
  color: var(--text-secondary);
  line-height: 1.5;
  font-size: 13px;
}

.feature-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
}

/* Pricing Section */
.pricing-section {
  background: var(--bg-color);
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.pricing-card {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 18px;
  padding: 28px;
  position: relative;
  transition: all 0.3s;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
}

.pricing-card.recommended {
  border-color: var(--primary-color);
  border-width: 3px;
}

.recommended-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 5px 18px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.plan-header {
  margin-bottom: 20px;
  text-align: center;
}

.plan-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 10px;
}

.plan-price {
  font-size: 38px;
  font-weight: 900;
  color: var(--primary-color);
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.price-period {
  font-size: 15px;
  color: var(--text-secondary);
  margin-left: 4px;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.plan-features li {
  padding: 8px 0;
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.plan-features li:last-child {
  border-bottom: none;
}

.check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5cb85c 0%, #4cae4c 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.plan-btn {
  display: block;
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 14px;
}

.plan-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

/* Pros & Cons */
.pros-cons-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 40px;
  align-items: start;
  max-width: 1000px;
  margin: 0 auto;
}

.pros-side,
.cons-side {
  background: var(--card-bg);
  border-radius: 24px;
  padding: 40px;
  border: 2px solid var(--border-color);
}

.side-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.side-icon {
  font-size: 32px;
}

.side-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
}

.points-list {
  list-style: none;
  padding: 0;
}

.points-list li {
  padding: 16px 0;
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
  line-height: 1.6;
}

.points-list li:last-child {
  border-bottom: none;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 18px;
  font-weight: 900;
  margin-top: 80px;
}

/* Final CTA */
.final-cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 45px 20px;
  text-align: center;
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 34px;
  font-weight: 900;
  margin-bottom: 12px;
}

.cta-subtitle {
  font-size: 16px;
  margin-bottom: 24px;
  opacity: 0.95;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  background: white;
  color: #667eea;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.arrow {
  transition: transform 0.3s;
}

.cta-button:hover .arrow {
  transform: translateX(5px);
}

/* Responsive */
@media (max-width: 768px) {
  .tool-name {
    font-size: 36px;
  }

  .tool-tagline {
    font-size: 16px;
  }

  .hero-meta {
    gap: 12px;
  }

  .section-title {
    font-size: 32px;
  }

  .feature-card {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .feature-number {
    font-size: 36px;
  }

  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .pros-cons-container {
    grid-template-columns: 1fr;
  }

  .vs-divider {
    margin: 0 auto;
  }

  .cta-title {
    font-size: 32px;
  }
}
</style>
