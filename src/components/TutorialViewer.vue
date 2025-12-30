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
              <span>💻 代码示例</span>
              <button @click="copyCode(currentSection.code)" class="copy-btn">
                {{ copied ? '✓ 已复制' : '复制代码' }}
              </button>
            </div>
            <pre><code v-html="highlightCode(currentSection.code)"></code></pre>
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
    .replace(/`([^`]+)`/g, '<code>$1</code>')
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
  
  // JavaScript 特征检测（优先级最高）
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
  
  return 'html' // 默认
}

// 多语言代码语法高亮
const highlightCode = (code) => {
  if (!code) return ''
  
  const lang = detectLanguage(code)
  
  if (lang === 'css') {
    return highlightCssCode(code)
  } else if (lang === 'javascript') {
    return highlightJsCode(code)
  } else {
    return highlightHtmlCode(code)
  }
}

// CSS 代码高亮
const highlightCssCode = (code) => {
  // 1. 转义 HTML 特殊字符
  let result = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // 标记需要保护的内容
  const protectedRanges = []
  
  // 2. 保存注释
  const commentRegex = /(\/\*[\s\S]*?\*\/)/g
  let match
  while ((match = commentRegex.exec(result)) !== null) {
    const start = match.index
    const end = start + match[0].length
    protectedRanges.push({ start, end, replacement: `<span class="comment">${match[0]}</span>` })
  }
  
  // 3. 保存字符串（单引号和双引号）
  const stringRegex = /(["'])(?:\\.|(?!\1)[^\\])*\1/g
  while ((match = stringRegex.exec(result)) !== null) {
    const start = match.index
    const end = start + match[0].length
    // 检查是否在保护区域内
    if (!protectedRanges.some(r => start >= r.start && end <= r.end)) {
      protectedRanges.push({ start, end, replacement: `<span class="string">${match[0]}</span>` })
    }
  }
  
  // 按位置排序，从后向前替换
  protectedRanges.sort((a, b) => b.start - a.start)
  protectedRanges.forEach(range => {
    result = result.substring(0, range.start) + range.replacement + result.substring(range.end)
  })
  
  // 4. CSS 关键字高亮
  const cssKeywords = [
    // At-rules
    '@import', '@media', '@charset', '@namespace', '@keyframes', '@font-face',
    '@supports', '@page', '@-webkit-keyframes', '@-moz-keyframes',
    // 重要关键字
    '!important',
    // 伪类
    'hover', 'active', 'focus', 'visited', 'link', 'first-child', 'last-child',
    'nth-child', 'nth-of-type', 'not', 'before', 'after', 'first-line', 'first-letter',
    // 值关键字
    'inherit', 'initial', 'unset', 'none', 'auto', 'block', 'inline', 'inline-block',
    'flex', 'grid', 'absolute', 'relative', 'fixed', 'sticky', 'static',
    'hidden', 'visible', 'scroll', 'center', 'left', 'right', 'top', 'bottom',
    'bold', 'normal', 'italic', 'underline', 'transparent', 'solid', 'dashed',
    'dotted', 'double', 'cover', 'contain', 'repeat', 'no-repeat', 'space', 'round'
  ]
  
  cssKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b(?![^<]*>)`, 'gi')
    result = result.replace(regex, '<span class="keyword">$1</span>')
  })
  
  // 5. 选择器高亮（类、ID、标签、属性选择器）
  // 类选择器
  result = result.replace(/(\.)[a-zA-Z_-][a-zA-Z0-9_-]*(?![^<]*>)/g, '<span class="selector">$&</span>')
  // ID选择器
  result = result.replace(/(#)[a-zA-Z_-][a-zA-Z0-9_-]*(?![^<]*>)/g, '<span class="selector">$&</span>')
  // 标签选择器（行首或逗号后的）
  result = result.replace(/(^|[,\n\r])\s*([a-z][a-z0-9-]*)(?=\s*[{,:]|\s+[.#:[>+~])(?![^<]*>)/gm, '$1<span class="selector">$2</span>')
  
  // 6. 属性名高亮
  result = result.replace(/([a-z-]+)(?=\s*:)(?![^<]*>)/g, '<span class="property">$1</span>')
  
  // 7. 数字和单位高亮
  result = result.replace(/\b(\d+(?:\.\d+)?)(px|em|rem|%|vh|vw|vmin|vmax|pt|cm|mm|in|deg|rad|turn|s|ms)?\b(?![^<]*>)/g, 
    '<span class="number">$1</span><span class="unit">$2</span>')
  
  // 8. 颜色值高亮
  result = result.replace(/(#[0-9a-fA-F]{3,8})(?![^<]*>)/g, '<span class="color">$1</span>')
  result = result.replace(/\b(rgb|rgba|hsl|hsla)(?=\()(?![^<]*>)/g, '<span class="color">$1</span>')
  
  return result
}

// JavaScript 代码高亮
const highlightJsCode = (code) => {
  // 1. 转义 HTML 特殊字符
  let result = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // 标记需要保护的内容
  const protectedRanges = []
  
  // 2. 保存注释
  // 多行注释
  const multiCommentRegex = /(\/\*[\s\S]*?\*\/)/g
  let match
  while ((match = multiCommentRegex.exec(result)) !== null) {
    const start = match.index
    const end = start + match[0].length
    protectedRanges.push({ start, end, replacement: `<span class="comment">${match[0]}</span>` })
  }
  
  // 单行注释
  const singleCommentRegex = /(\/\/[^\n]*)/g
  while ((match = singleCommentRegex.exec(result)) !== null) {
    const start = match.index
    const end = start + match[0].length
    // 检查是否在保护区域内
    if (!protectedRanges.some(r => start >= r.start && end <= r.end)) {
      protectedRanges.push({ start, end, replacement: `<span class="comment">${match[0]}</span>` })
    }
  }
  
  // 3. 保存字符串
  // 模板字符串
  const templateStringRegex = /(`(?:[^`\\]|\\.)*`)/g
  while ((match = templateStringRegex.exec(result)) !== null) {
    const start = match.index
    const end = start + match[0].length
    if (!protectedRanges.some(r => start >= r.start && end <= r.end)) {
      protectedRanges.push({ start, end, replacement: `<span class="string">${match[0]}</span>` })
    }
  }
  
  // 普通字符串
  const stringRegex = /(["'])(?:\\.|(?!\1)[^\\])*\1/g
  while ((match = stringRegex.exec(result)) !== null) {
    const start = match.index
    const end = start + match[0].length
    if (!protectedRanges.some(r => start >= r.start && end <= r.end)) {
      protectedRanges.push({ start, end, replacement: `<span class="string">${match[0]}</span>` })
    }
  }
  
  // 4. 正则表达式
  const regexRegex = /(\/(?![*\/])(?:\\.|[^\\\n\/])+\/[gimyus]*)/g
  while ((match = regexRegex.exec(result)) !== null) {
    const start = match.index
    const end = start + match[0].length
    if (!protectedRanges.some(r => start >= r.start && end <= r.end)) {
      protectedRanges.push({ start, end, replacement: `<span class="string">${match[0]}</span>` })
    }
  }
  
  // 按位置排序，从后向前替换
  protectedRanges.sort((a, b) => b.start - a.start)
  protectedRanges.forEach(range => {
    result = result.substring(0, range.start) + range.replacement + result.substring(range.end)
  })
  
  // 5. JavaScript 关键字高亮
  const jsKeywords = [
    // 声明
    'const', 'let', 'var', 'function', 'class', 'extends', 'import', 'export', 'default',
    'from', 'as', 'async', 'await',
    // 控制流
    'if', 'else', 'switch', 'case', 'break', 'default', 'for', 'while', 'do',
    'continue', 'return', 'try', 'catch', 'finally', 'throw',
    // 值
    'true', 'false', 'null', 'undefined', 'NaN', 'Infinity',
    // 其他
    'new', 'this', 'super', 'typeof', 'instanceof', 'delete', 'void',
    'in', 'of', 'with', 'yield', 'static', 'get', 'set'
  ]
  
  jsKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b(?![^<]*>)`, 'g')
    result = result.replace(regex, '<span class="keyword">$1</span>')
  })
  
  // 6. 数字高亮
  result = result.replace(/\b(\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[0-9a-fA-F]+|0o[0-7]+|0b[01]+)n?\b(?![^<]*>)/g, 
    '<span class="number">$1</span>')
  
  // 7. 函数调用高亮
  result = result.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()(?![^<]*>)/g, '<span class="function">$1</span>')
  
  // 8. 类名高亮（大写开头）
  result = result.replace(/\b([A-Z][a-zA-Z0-9_$]*)\b(?![^<]*>)/g, '<span class="type">$1</span>')
  
  return result
}

// HTML 代码高亮
const highlightHtmlCode = (code) => {
  // 1. 先转义 HTML 特殊字符
  let result = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // 2. 保存注释，用占位符替换
  const comments = []
  result = result.replace(/(&lt;!--[\s\S]*?--&gt;)/g, (match) => {
    const index = comments.length
    comments.push(`<span class="comment">${match}</span>`)
    return `___COMMENT_${index}___`
  })
  
  // 3. 处理标签（包含属性）
  // 匹配 &lt;...&gt; 块
  result = result.replace(/(&lt;[\s\S]*?&gt;)/g, (match) => {
    // 忽略占位符
    if (match.includes('___COMMENT_')) return match
    
    // DOCTYPE
    if (match.toLowerCase().startsWith('&lt;!doctype')) {
      return `<span class="doctype">${match}</span>`
    }
    
    // 解析标签结构: &lt; + (/) + TagName + (Attributes) + &gt;
    return match.replace(/^(&lt;\/?)([a-zA-Z0-9-]+)([\s\S]*)(&gt;)$/, (m, start, tagName, attrs, end) => {
      let processedAttrs = attrs
      
      if (processedAttrs && processedAttrs.trim()) {
        // 3.1 保护字符串
        const strings = []
        processedAttrs = processedAttrs.replace(/"[\s\S]*?"/g, (str) => {
          strings.push(`<span class="string">${str}</span>`)
          return `___STR${strings.length - 1}___`
        })
        processedAttrs = processedAttrs.replace(/'[\s\S]*?'/g, (str) => {
          strings.push(`<span class="string">${str}</span>`)
          return `___STR${strings.length - 1}___`
        })
        
        // 3.2 高亮属性名
        // 匹配 属性名= 或 仅属性名 (必须以空白或开头为前缀，避免匹配到占位符中间的字符)
        processedAttrs = processedAttrs.replace(/(^|\s)([a-zA-Z0-9-]+)(=?)/g, (attrMatch, space, name, equals) => {
           // 双重保险：忽略占位符相关
           if (name.includes('___')) return attrMatch
           return `${space}<span class="attr">${name}</span>${equals}`
        })
        
        // 3.3 恢复字符串
        processedAttrs = processedAttrs.replace(/___STR(\d+)___/g, (m, i) => strings[i])
      }
      
      return `${start}<span class="tag">${tagName}</span>${processedAttrs}${end}`
    })
  })
  
  // 4. 恢复注释
  comments.forEach((comment, index) => {
    result = result.replace(`___COMMENT_${index}___`, comment)
  })
  
  return result
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
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.tutorial-header {
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-color);
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.2s;
  margin-bottom: 12px;
}

.close-btn:hover {
  background: var(--border-color);
}

.tutorial-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-color);
}

.tutorial-info {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.badge {
  padding: 4px 12px;
  background: var(--primary-color);
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.level-badge {
  background: #ff9800;
}

.tutorial-time {
  color: var(--text-secondary);
  font-size: 14px;
}

.tutorial-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.tutorial-sidebar {
  width: 300px;
  background: var(--bg-color);
  border-right: 1px solid var(--border-color);
  padding: 24px;
  overflow-y: auto;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-color);
}

.chapter-nav {
  margin-bottom: 24px;
}

.chapter-item {
  margin-bottom: 8px;
}

.chapter-header {
  padding: 12px;
  background: var(--card-bg);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chapter-header:hover {
  background: var(--border-color);
}

.chapter-header.active {
  background: var(--primary-color);
  color: white;
}

.chapter-title {
  font-weight: 600;
  font-size: 14px;
}

.chapter-duration {
  font-size: 12px;
  opacity: 0.8;
}

.section-list {
  margin-top: 8px;
  margin-left: 12px;
}

.section-item {
  padding: 8px 12px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.section-item:hover {
  background: var(--border-color);
  color: var(--text-color);
}

.section-item.active {
  background: var(--primary-color);
  color: white;
  font-weight: 600;
}

.resources-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.resources-section h4 {
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--text-color);
}

.resource-link {
  display: block;
  padding: 8px 12px;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 14px;
  border-radius: 6px;
  transition: background 0.2s;
  margin-bottom: 4px;
}

.resource-link:hover {
  background: var(--border-color);
}

.tutorial-main {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}

.section-content {
  max-width: 900px;
  margin: 0 auto;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--text-color);
  padding-bottom: 16px;
  border-bottom: 2px solid var(--border-color);
}

.content-text {
  color: var(--text-color);
  line-height: 1.8;
  font-size: 16px;
  margin-bottom: 32px;
}

.content-text :deep(h2) {
  font-size: 24px;
  margin-top: 32px;
  margin-bottom: 16px;
  color: var(--text-color);
}

.content-text :deep(h3) {
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 12px;
  color: var(--text-color);
}

.content-text :deep(p) {
  margin-bottom: 16px;
}

.content-text :deep(ul) {
  margin-bottom: 16px;
  padding-left: 24px;
}

.content-text :deep(li) {
  margin-bottom: 8px;
}

.content-text :deep(code) {
  background: var(--bg-color);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  color: var(--primary-color);
}

.content-text :deep(strong) {
  font-weight: 600;
  color: var(--text-color);
}

.code-example {
  margin: 32px 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
}

.copy-btn {
  padding: 6px 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: opacity 0.2s;
}

.copy-btn:hover {
  opacity: 0.9;
}

.code-example pre {
  padding: 20px;
  margin: 0;
  background: var(--card-bg);
  overflow-x: auto;
}

.code-example code {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
}

/* 代码语法高亮 */
.code-example code :deep(.comment) {
  color: #6a9955;
  font-style: italic;
}

.code-example code :deep(.tag) {
  color: #22863a;
  font-weight: 600;
}

.code-example code :deep(.attr) {
  color: #005cc5;
}

.code-example code :deep(.string) {
  color: #ce9178;
}

.code-example code :deep(.doctype) {
  color: #c586c0;
}

/* CSS 语法高亮 */
.code-example code :deep(.selector) {
  color: #d7ba7d;
  font-weight: 600;
}

.code-example code :deep(.property) {
  color: #9cdcfe;
}

.code-example code :deep(.unit) {
  color: #b5cea8;
}

.code-example code :deep(.color) {
  color: #ce9178;
  font-weight: 600;
}

/* JavaScript 语法高亮 */
.code-example code :deep(.keyword) {
  color: #569cd6;
  font-weight: 600;
}

.code-example code :deep(.function) {
  color: #dcdcaa;
}

.code-example code :deep(.type) {
  color: #4ec9b0;
}

.code-example code :deep(.number) {
  color: #b5cea8;
}

/* 暗色模式下的语法高亮 */
.dark .code-example code :deep(.comment) {
  color: #6a9955;
}

.dark .code-example code :deep(.tag) {
  color: #4ec9b0;
}

.dark .code-example code :deep(.attr) {
  color: #9cdcfe;
}

.dark .code-example code :deep(.string) {
  color: #ce9178;
}

.dark .code-example code :deep(.doctype) {
  color: #c586c0;
}

/* 暗色模式下的 CSS 语法高亮 */
.dark .code-example code :deep(.selector) {
  color: #d7ba7d;
}

.dark .code-example code :deep(.property) {
  color: #9cdcfe;
}

.dark .code-example code :deep(.unit) {
  color: #b5cea8;
}

.dark .code-example code :deep(.color) {
  color: #ce9178;
}

/* 暗色模式下的 JavaScript 语法高亮 */
.dark .code-example code :deep(.keyword) {
  color: #569cd6;
}

.dark .code-example code :deep(.function) {
  color: #dcdcaa;
}

.dark .code-example code :deep(.type) {
  color: #4ec9b0;
}

.dark .code-example code :deep(.number) {
  color: #b5cea8;
}

.section-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.nav-btn {
  padding: 12px 24px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.2s;
}

.nav-btn:hover {
  opacity: 0.9;
}

.prev-btn {
  margin-right: auto;
}

.next-btn {
  margin-left: auto;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.project-card {
  padding: 24px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.project-card h3 {
  font-size: 18px;
  margin-bottom: 12px;
  color: var(--text-color);
}

.difficulty-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
}

.difficulty-badge.初级 {
  background: #4caf50;
  color: white;
}

.difficulty-badge.中级 {
  background: #ff9800;
  color: white;
}

.difficulty-badge.高级 {
  background: #f44336;
  color: white;
}

.project-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 响应式 */
@media (max-width: 768px) {
  .tutorial-content {
    flex-direction: column;
  }
  
  .tutorial-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
}
</style>
