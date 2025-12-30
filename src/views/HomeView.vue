<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// AI 学习路径
const learningPaths = [
  {
    icon: '🎯',
    title: 'AI 基础入门',
    desc: '从零开始学习人工智能基础知识',
    color: '#3b82f6'
  },
  {
    icon: '🧠',
    title: '机器学习',
    desc: '掌握机器学习核心算法与应用',
    color: '#8b5cf6'
  },
  {
    icon: '🤖',
    title: '深度学习',
    desc: '深入神经网络与深度学习框架',
    color: '#ec4899'
  },
  {
    icon: '💬',
    title: 'NLP & LLM',
    desc: '自然语言处理与大语言模型',
    color: '#f59e0b'
  }
]

// 特色功能
const features = [
  {
    icon: '📚',
    title: '系统化课程',
    desc: '从基础到进阶的完整学习路径'
  },
  {
    icon: '💻',
    title: '实战项目',
    desc: '真实案例驱动，边学边练'
  },
  {
    icon: '🚀',
    title: '前沿技术',
    desc: '紧跟 AI 技术发展趋势'
  },
  {
    icon: '🎓',
    title: '免费开源',
    desc: '所有教程完全免费开放'
  }
]
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-background">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">🤖 AI Learning Hub</div>
        <h1 class="hero-title">
          <span class="gradient-text">开启你的 AI 学习之旅</span>
        </h1>
        <p class="hero-subtitle">
          系统化的人工智能教程 • 从基础到实战 • 完全免费开源
        </p>
        <div class="hero-actions">
          <button class="primary-btn" @click="router.push('/tools')">
            <span>🚀 开发工具</span>
          </button>
          <button class="secondary-btn" @click="router.push('/tools')">
            <span>📖 浏览工具</span>
          </button>
        </div>
        
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">开发工具</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">10+</div>
            <div class="stat-label">工具分类</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">免费开源</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Learning Paths -->
    <section class="learning-paths-section">
      <div class="section-header">
        <h2 class="section-title">🎯 学习路径</h2>
        <p class="section-desc">选择适合你的学习路径，循序渐进掌握 AI 技能</p>
      </div>
      <div class="paths-grid">
        <div 
          v-for="path in learningPaths" 
          :key="path.title"
          class="path-card"
          :style="{ '--path-color': path.color }"
        >
          <div class="path-icon">{{ path.icon }}</div>
          <h3 class="path-title">{{ path.title }}</h3>
          <p class="path-desc">{{ path.desc }}</p>
          <div class="path-arrow">→</div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">✨ 平台特色</h2>
        <p class="section-desc">为什么选择我们的 AI 学习平台</p>
      </div>
      <div class="features-grid">
        <div 
          v-for="feature in features" 
          :key="feature.title"
          class="feature-card"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">准备好开始学习了吗？</h2>
        <p class="cta-desc">加入我们，一起探索人工智能的无限可能</p>
        <button class="cta-btn" @click="router.push('/tools')">
          <span>立即开始</span>
          <span class="arrow">→</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: 24px;
  padding: 80px 40px;
  margin-bottom: 60px;
  color: white;
  position: relative;
  overflow: hidden;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  left: 10%;
  animation-delay: 5s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 40%;
  left: -50px;
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-title {
  font-size: 56px;
  font-weight: 900;
  margin-bottom: 24px;
  line-height: 1.2;
  letter-spacing: -1px;
}

.gradient-text {
  background: linear-gradient(to right, #ffffff, #fef3c7, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s infinite linear;
  background-size: 200% auto;
}

@keyframes shimmer {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 40px;
  opacity: 0.95;
  font-weight: 400;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 60px;
}

.primary-btn, .secondary-btn {
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.primary-btn {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-top: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 8px;
  background: linear-gradient(to bottom, #ffffff, #fef3c7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 16px;
  opacity: 0.9;
  font-weight: 500;
}

/* Section Common Styles */
section {
  margin-bottom: 80px;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 36px;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.section-desc {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Learning Paths */
.paths-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.path-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 32px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.path-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--path-color);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.path-card:hover {
  border-color: var(--path-color);
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.path-card:hover::before {
  transform: scaleX(1);
}

.path-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.path-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

.path-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.path-arrow {
  font-size: 24px;
  color: var(--path-color);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.path-card:hover .path-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Features */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
}

.feature-card {
  text-align: center;
  padding: 32px;
}

.feature-icon {
  font-size: 56px;
  margin-bottom: 20px;
  display: inline-block;
  animation: bounce 2s infinite;
}

.feature-card:nth-child(1) .feature-icon {
  animation-delay: 0s;
}

.feature-card:nth-child(2) .feature-icon {
  animation-delay: 0.2s;
}

.feature-card:nth-child(3) .feature-icon {
  animation-delay: 0.4s;
}

.feature-card:nth-child(4) .feature-icon {
  animation-delay: 0.6s;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.feature-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

.feature-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 80px 40px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: moveBackground 20s linear infinite;
}

@keyframes moveBackground {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-title {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.cta-desc {
  font-size: 18px;
  margin-bottom: 32px;
  opacity: 0.95;
}

.cta-btn {
  background: white;
  color: #667eea;
  padding: 16px 40px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
}

.cta-btn .arrow {
  transition: transform 0.3s ease;
}

.cta-btn:hover .arrow {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: 60px 20px;
    border-radius: 0;
    min-height: 500px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 16px;
    margin-bottom: 32px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .primary-btn, .secondary-btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .hero-stats {
    flex-direction: column;
    gap: 32px;
  }

  .section-title {
    font-size: 28px;
  }

  .section-desc {
    font-size: 16px;
  }

  .paths-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .tutorials-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .cta-section {
    padding: 60px 20px;
    border-radius: 0;
  }

  .cta-title {
    font-size: 28px;
  }

  .cta-desc {
    font-size: 16px;
  }
}
</style>
