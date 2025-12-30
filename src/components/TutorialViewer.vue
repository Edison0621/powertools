<template>
  <div class="tutorial-viewer">
    <!-- 顶部导航栏 -->
    <div class="tutorial-header">
      <button @click="$emit('close')" class="close-btn" aria-label="关闭教程">
        <span aria-hidden="true">←</span> 返回
      </button>
      <div class="tutorial-meta">
        <h1 class="tutorial-title">{{ tutorialData.name }}</h1>
        <div class="tutorial-info">
          <span class="badge">{{ tutorialData.version }}</span>
          <span class="badge level-badge">{{ tutorialData.level }}</span>
          <span class="tutorial-time">⏱️ 预计 {{ tutorialData.estimatedTime }}</span>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="tutorial-content">
      <!-- 侧边栏目录 -->
      <aside class="tutorial-sidebar">
        <h3 class="sidebar-title">📚 课程目录</h3>
        <nav class="chapter-nav">
          <div 
            v-for="chapter in tutorialData.chapters" 
            :key="chapter.id"
            class="chapter-item"
          >
            <div 
              class="chapter-header"
              :class="{ active: selectedChapter === chapter.id }"
              @click="selectChapter(chapter.id)"
            >
              <span class="chapter-title">{{ chapter.title }}</span>
              <span class="chapter-duration">{{ chapter.duration }}</span>
            </div>
            
            <div v-if="selectedChapter === chapter.id" class="section-list">
              <div
                v-for="section in chapter.sections"
                :key="section.id"
                class="section-item"
                :class="{ active: selectedSection === section.id }"
                @click.stop="selectSection(chapter.id, section.id)"
              >
                {{ section.title }}
              </div>
            </div>
          </div>
        </nav>

        <!-- 学习资源 -->
        <div class="resources-section">
          <h4>📖 学习资源</h4>
          <div class="resource-links">
            <a 
              v-for="resource in tutorialData.resources"
              :key="resource.name"
              :href="resource.url"
              target="_blank"
              rel="noopener noreferrer"
              class="resource-link"
            >
              {{ resource.name }} ↗
            </a>
          </div>
        </div>
      </aside>

      <!-- 主要内容 -->
      <main class="tutorial-main">
        <div v-if="currentSection" class="section-content">
          <h2 class="section-title">{{ currentSection.title }}</h2>
          
          <!-- Markdown 内容 -->
          <div class="content-text" v-html="renderMarkdown(currentSection.content)"></div>
          
          <!-- 代码示例 -->
          <div v-if="currentSection.code" class="code-example">
            <div class="code-header">
              <span class="code-lang">{{ detectLanguage(currentSection.code) }}</span>
              <button @click="copyCode(currentSection.code)" class="copy-btn">
                {{ copied ? '✓ 已复制' : '复制代码' }}
              </button>
            </div>
            <pre><code class="hljs" v-html="highlightCode(currentSection.code)"></code></pre>
          </div>

          <!-- 导航按钮 -->
          <div class="section-nav">
            <button 
              v-if="hasPrevSection"
              @click="gotoPrevSection"
              class="nav-btn prev-btn"
            >
              ← 上一节
            </button>
            <button 
              v-if="hasNextSection"
              @click="gotoNextSection"
              class="nav-btn next-btn"
            >
              下一节 →
            </button>
          </div>
        </div>

        <!-- 练习项目 -->
        <div v-if="showProjects" class="projects-section">
          <h2>🎯 练习项目</h2>
          <div class="projects-grid">
            <div 
              v-for="project in tutorialData.projects"
              :key="project.id"
              class="project-card"
            >
              <h3>{{ project.name }}</h3>
              <span class="difficulty-badge" :class="project.difficulty">
                {{ project.difficulty }}
              </span>
              <p>{{ project.description }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const props = defineProps({
  tutorialData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const selectedChapter = ref(null)
const selectedSection = ref(null)
const copied = ref(false)
const showProjects = ref(false)

// 当前章节和小节
const currentChapter = computed(() => {
  return props.tutorialData.chapters.find(c => c.id === selectedChapter.value)
})

const currentSection = computed(() => {
  if (!currentChapter.value) return null
  return currentChapter.value.sections.find(s => s.id === selectedSection.value)
})

// 导航辅助函数
const getAllSections = () => {
  const sections = []
  props.tutorialData.chapters.forEach(chapter => {
    chapter.sections.forEach(section => {
      sections.push({ chapterId: chapter.id, sectionId: section.id })
    })
  })
  return sections
}

const currentSectionIndex = computed(() => {
  const sections = getAllSections()
  return sections.findIndex(s => 
    s.chapterId === selectedChapter.value && s.sectionId === selectedSection.value
  )
})

const hasPrevSection = computed(() => currentSectionIndex.value > 0)
const hasNextSection = computed(() => {
  const sections = getAllSections()
  return currentSectionIndex.value < sections.length - 1
})

// 选择章节
const selectChapter = (chapterId) => {
  selectedChapter.value = chapterId
  const chapter = props.tutorialData.chapters.find(c => c.id === chapterId)
  if (chapter && chapter.sections.length > 0) {
    selectedSection.value = chapter.sections[0].id
  }
  showProjects.value = false
}

// 选择小节
const selectSection = (chapterId, sectionId) => {
  selectedChapter.value = chapterId
  selectedSection.value = sectionId
  showProjects.value = false
  // 滚动到顶部
  const mainContent = document.querySelector('.tutorial-main')
  if (mainContent) {
    mainContent.scrollTop = 0
  }
}

// 上一节/下一节
const gotoPrevSection = () => {
  const sections = getAllSections()
  const prevSection = sections[currentSectionIndex.value - 1]
  if (prevSection) {
    selectSection(prevSection.chapterId, prevSection.sectionId)
  }
}

const gotoNextSection = () => {
  const sections = getAllSections()
  const nextSection = sections[currentSectionIndex.value + 1]
  if (nextSection) {
    selectSection(nextSection.chapterId, nextSection.sectionId)
  }
}

// 简单的 Markdown 渲染
const renderMarkdown = (text) => {
  if (!text) return ''
  
  return text
    // 标题
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // 粗体
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 斜体
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // 代码
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    // 列表
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // 链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    // 段落
    .split('\n\n')
    .map(para => para.trim() ? `<p>${para}</p>` : '')
    .join('\n')
}

// 复制代码
const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 检测代码语言
const detectLanguage = (code) => {
  if (!code) return 'html'
  
  // Vue 单文件组件特征检测（优先级最高）
  const vuePatterns = [
    /<template>/i,
    /<script setup>/i,
    /<script>/i && /<\/script>/i,
    /defineProps|defineEmits|defineExpose/,
    /import.*from\s+['"]vue['"]/,
  ]
  
  const vueMatchCount = vuePatterns.filter(pattern => pattern.test(code)).length
  if (vueMatchCount >= 2) {
    return 'vue'
  }
  
  // JavaScript 特征检测
  const jsPatterns = [
    /\b(const|let|var)\s+\w+\s*=/,  // 变量声明
    /\bfunction\s+\w+\s*\(/,        // 函数声明
    /=>/,                            // 箭头函数
    /\bconsole\.(log|error|warn)/,  // console
    /\b(if|else|for|while)\s*\(/,   // 控制流
    /\/\/\s*.+/,                     // 单行注释
  ]
  
  // 如果匹配多个JS特征，很可能是JavaScript
  const jsMatchCount = jsPatterns.filter(pattern => pattern.test(code)).length
  if (jsMatchCount >= 2) {
    return 'javascript'
  }
  
  // CSS 特征检测
  if (code.includes('{') && code.includes('}') && 
      (code.includes(':') || code.match(/[.#][a-zA-Z-_]/))) {
    // 如果包含 HTML 标签，则是 HTML
    if (code.match(/&lt;[a-zA-Z]/) || code.match(/<[a-zA-Z]/)) {
      return 'html'
    }
    // 如果有JS关键字，可能是JavaScript
    if (jsMatchCount >= 1) {
      return 'javascript'
    }
    return 'css'
  }
  
  // HTML 特征检测
  if (code.includes('<!DOCTYPE') || code.includes('<html') || 
      code.match(/<[a-zA-Z]/) || code.match(/&lt;[a-zA-Z]/)) {
    return 'html'
  }
  
  return 'auto' // 默认
}

// 使用 highlight.js 进行高亮
const highlightCode = (code) => {
  if (!code) return ''
  
  const lang = detectLanguage(code)
  
  if (lang && lang !== 'auto' && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(code, { language: lang }).value
    } catch (e) {
      console.warn('Highlight error:', e)
    }
  }
  
  return hljs.highlightAuto(code).value
}

onMounted(() => {
  // 默认选中第一章第一节
  if (props.tutorialData.chapters.length > 0) {
    const firstChapter = props.tutorialData.chapters[0]
    selectedChapter.value = firstChapter.id
    if (firstChapter.sections.length > 0) {
      selectedSection.value = firstChapter.sections[0].id
    }
  }
})
</script>

<style scoped>
.tutorial-viewer {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.tutorial-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.close-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  font-size: 13px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s;
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 4px;
}

.close-btn:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.tutorial-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tutorial-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: var(--text-color);
  letter-spacing: -0.5px;
  background: linear-gradient(120deg, var(--primary-color), #8e44ad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: fit-content;
}

.tutorial-info {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.badge {
  padding: 4px 10px;
  background: var(--primary-color);
  color: white;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.level-badge {
  background: linear-gradient(135deg, #ff9800, #f57c00);
}

.tutorial-time {
  color: var(--text-secondary);
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}

.tutorial-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  background: var(--bg-color);
}

.tutorial-sidebar {
  width: 260px;
  background: var(--sidebar-bg, #f8f9fa);
  border-right: 1px solid var(--border-color);
  padding: 16px;
  overflow-y: auto;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.chapter-nav {
  margin-bottom: 24px;
}

.chapter-item {
  margin-bottom: 8px;
}

.chapter-header {
  padding: 10px 12px;
  background: var(--card-bg);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid transparent;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.chapter-header:hover {
  background: white;
  border-color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.chapter-header.active {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 2px 8px rgba(var(--primary-rgb), 0.3);
}

.chapter-title {
  font-weight: 600;
  font-size: 13px;
}

.chapter-duration {
  font-size: 11px;
  opacity: 0.8;
  background: rgba(0,0,0,0.1);
  padding: 1px 5px;
  border-radius: 3px;
}

.section-list {
  margin-top: 6px;
  margin-left: 10px;
  padding-left: 10px;
  border-left: 2px solid var(--border-color);
}

.section-item {
  padding: 8px 12px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  margin-bottom: 2px;
  position: relative;
}

.section-item:hover {
  background: rgba(var(--primary-rgb), 0.05);
  color: var(--primary-color);
}

.section-item.active {
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary-color);
  font-weight: 600;
}

.section-item.active::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 70%;
  background: var(--primary-color);
  border-radius: 2px;
}

.resources-section {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.resources-section h4 {
  font-size: 14px;
  margin-bottom: 12px;
  color: var(--text-color);
  font-weight: 600;
}

.resource-link {
  display: block;
  padding: 8px 12px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 13px;
  border-radius: 6px;
  transition: all 0.2s;
  margin-bottom: 6px;
  background: white;
  border: 1px solid var(--border-color);
}

.resource-link:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateX(4px);
}

.tutorial-main {
  flex: 1;
  padding: 24px 32px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.section-content {
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-color);
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
  letter-spacing: -0.5px;
}

.content-text {
  color: var(--text-color);
  line-height: 1.6;
  font-size: 15px;
  margin-bottom: 24px;
}

.content-text :deep(h2) {
  font-size: 18px;
  margin-top: 24px;
  margin-bottom: 12px;
  color: var(--text-color);
  font-weight: 700;
  display: flex;
  align-items: center;
}

.content-text :deep(h2)::before {
  content: '#';
  color: var(--primary-color);
  margin-right: 8px;
  font-weight: 400;
  opacity: 0.5;
  font-size: 0.8em;
}

.content-text :deep(h3) {
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: var(--text-color);
  font-weight: 600;
}

.content-text :deep(p) {
  margin-bottom: 10px;
  color: #4a5568;
}

.dark .content-text :deep(p) {
  color: #a0aec0;
}

.content-text :deep(ul) {
  margin-bottom: 12px;
  padding-left: 20px;
}

.content-text :deep(li) {
  margin-bottom: 4px;
  position: relative;
}

.content-text :deep(.inline-code) {
  background: rgba(var(--primary-rgb), 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.9em;
  color: var(--primary-color);
  margin: 0 2px;
}

.code-example {
  margin: 16px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  background: #282c34;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #21252b;
  border-bottom: 1px solid #181a1f;
}

.code-lang {
  color: #abb2bf;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.copy-btn {
  padding: 4px 10px;
  background: rgba(255,255,255,0.1);
  color: #abb2bf;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s;
  font-weight: 500;
}

.copy-btn:hover {
  background: rgba(255,255,255,0.2);
  color: white;
}

.code-example pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  background: #282c34;
}

.code-example code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.5;
  background: transparent;
}

/* 导航按钮 */
.section-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.nav-btn {
  padding: 10px 24px;
  background: white;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.nav-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.projects-section {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--border-color);
}

.projects-section h2 {
  font-size: 20px;
  margin-bottom: 24px;
  text-align: center;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.project-card {
  padding: 16px;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s;
}

.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  border-color: var(--primary-color);
}

.project-card h3 {
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--text-color);
}

.difficulty-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 12px;
}

.difficulty-badge.初级 {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
}

.difficulty-badge.中级 {
  background: rgba(255, 152, 0, 0.1);
  color: #ff9800;
}

.difficulty-badge.高级 {
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
}

.project-card p {
  color: var(--text-secondary);
  line-height: 1.5;
  font-size: 13px;
  margin: 0;
}

/* 响应式 */
@media (max-width: 900px) {
  .tutorial-content {
    flex-direction: column;
  }
  
  .tutorial-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    max-height: 250px;
  }
  
  .tutorial-main {
    padding: 20px;
  }
}
</style>
