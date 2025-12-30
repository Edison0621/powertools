<script setup>
import { useRouter } from 'vue-router'
import { tutorialsList } from '../data/tutorials/list.js'
import TutorialCard from '../components/TutorialCard.vue'

const router = useRouter()

const openTutorial = (tutorial) => {
  router.push(`/tutorial/${tutorial.id}`)
}
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <div class="hero-section">
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

    <!-- Tutorials Grid -->
    <section class="content-section" aria-label="教程列表">
      <div class="section-header">
        <h3>📚 精选教程</h3>
      </div>
      <div class="tutorials-grid">
        <TutorialCard
          v-for="tutorial in tutorialsList"
          :key="tutorial.id"
          :tutorial="tutorial"
          @click="openTutorial(tutorial)"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
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

.content-section {
  margin-bottom: 48px;
}

.section-header {
  margin-bottom: 24px;
}

.section-header h3 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
}

.tutorials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
}

@media (max-width: 768px) {
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

  .tutorials-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
