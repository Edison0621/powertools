<template>
  <div class="pattern-viewer">
    <!-- 主体内容区域 -->
    <div class="content">
      <!-- 代码展示区域 -->
      <div class="code-area">
        <div v-if="selectedPattern" class="code-container">
          <!-- 模式信息（可滚动区域） -->
          <div class="pattern-info-wrapper" @scroll="handleScroll" ref="scrollContainer">
            <div class="pattern-info">
              <h2>{{ selectedPattern.name }} <span class="pattern-name-en">{{ selectedPattern.nameEn }}</span></h2>
              <p class="pattern-desc">{{ selectedPattern.description }}</p>
              
              <div class="info-section">
                <div class="section-label">💡 意图</div>
                <div class="section-content">{{ selectedPattern.intent }}</div>
              </div>
              
              <div class="info-section">
                <div class="section-label">✨ 适用性</div>
                <div class="section-content">
                  <div v-for="(item, index) in selectedPattern.applicability" :key="index" class="applicability-item">
                    <span class="bullet">•</span>
                    <span>{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 滚动提示指示器 -->
            <div v-if="showScrollHint" class="scroll-hint" @click="scrollToBottom">
              <div class="scroll-hint-content">
                <span class="scroll-icon">👇</span>
                <span class="scroll-text">向下滚动查看更多</span>
              </div>
            </div>
          </div>

          <!-- 语言切换标签 -->
          <div class="language-tabs">
            <div
              v-for="lang in languages"
              :key="lang.id"
              :class="['lang-tab', { active: selectedLanguage === lang.id }]"
              @click="selectedLanguage = lang.id"
            >
              <span class="lang-icon">{{ lang.icon }}</span>
              <span class="lang-name">{{ lang.name }}</span>
            </div>
          </div>

          <!-- 代码显示区 -->
          <div class="code-display">
            <div class="code-header">
              <span class="file-name">{{ selectedPattern.id }}.{{ currentLanguage.ext }}</span>
              <button class="copy-btn" @click="copyCode" :class="{ copied: codeCopied }">
                {{ codeCopied ? '✓ 已复制' : '📋 复制代码' }}
              </button>
            </div>
            <pre class="code-content" :data-language="selectedLanguage"><code class="hljs" v-html="highlightedCode"></code></pre>
          </div>
        </div>

        <!-- 未选择模式时的提示 -->
        <div v-else class="empty-state">
          <div class="empty-icon">💎</div>
          <h3>设计模式代码示例</h3>
          <p>23种经典设计模式的C#、Java、Go、Rust实现代码展示</p>
          <div class="empty-hint">← 请从左侧选择一个设计模式开始查看</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { patterns, categories, languages } from '../../data/patterns.js'
import { patternCodes } from '../../data/pattern-codes.js'
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// Props
const props = defineProps({
  category: {
    type: String,
    default: 'all'
  },
  initialPattern: {
    type: Object,
    default: null
  }
})

// 状态
const selectedPattern = ref(props.initialPattern)
const selectedLanguage = ref('csharp')
const codeCopied = ref(false)
const scrollContainer = ref(null)
const showScrollHint = ref(true)

// 监听 initialPattern 的变化
watch(() => props.initialPattern, (newPattern) => {
  if (newPattern) {
    selectedPattern.value = newPattern
  }
})

// 计算属性
const categorizedPatterns = computed(() => {
  const result = {
    creational: [],
    structural: [],
    behavioral: []
  }
  
  // 根据传入的category筛选模式
  const filteredPatterns = props.category === 'all' 
    ? patterns 
    : patterns.filter(p => p.category === props.category)
  
  filteredPatterns.forEach(pattern => {
    result[pattern.category].push(pattern)
  })
  
  // 如果某个分类没有模式，删除该分类
  Object.keys(result).forEach(key => {
    if (result[key].length === 0) {
      delete result[key]
    }
  })
  
  return result
})

// 所有模式的扁平化列表
const allPatterns = computed(() => {
  if (props.category === 'all') {
    return patterns
  }
  return patterns.filter(p => p.category === props.category)
})

const currentLanguage = computed(() => {
  return languages.find(lang => lang.id === selectedLanguage.value)
})

const currentCode = computed(() => {
  if (!selectedPattern.value) return ''
  const patternId = selectedPattern.value.id
  if (patternCodes[patternId] && patternCodes[patternId][selectedLanguage.value]) {
    return patternCodes[patternId][selectedLanguage.value]
  }
  return `// ${selectedPattern.value.name} 代码示例即将添加...\n// Coming soon...`
})

// 语法高亮
const highlightedCode = computed(() => {
  const code = currentCode.value
  if (!code) return ''
  
  const lang = selectedLanguage.value
  if (hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(code, { language: lang }).value
    } catch (e) {
      console.warn('Highlight error:', e)
      return hljs.highlightAuto(code).value
    }
  }
  return hljs.highlightAuto(code).value
})

// 方法
const selectPattern = (pattern) => {
  selectedPattern.value = pattern
  codeCopied.value = false
  // 重置滚动提示
  showScrollHint.value = true
  // 滚动到顶部
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = 0
  }
}

const handleScroll = (e) => {
  const container = e.target
  const scrollTop = container.scrollTop
  const scrollHeight = container.scrollHeight
  const clientHeight = container.clientHeight
  
  // 如果滚动超过20px或者已经到底部，隐藏提示
  if (scrollTop > 20 || scrollTop + clientHeight >= scrollHeight - 10) {
    showScrollHint.value = false
  } else {
    showScrollHint.value = true
  }
}

const scrollToBottom = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      top: scrollContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(currentCode.value)
    codeCopied.value = true
    setTimeout(() => {
      codeCopied.value = false
    }, 2000)
  } catch (error) {
    alert('复制失败，请手动复制')
  }
}

// 初始化
onMounted(() => {
  // 如果有初始模式，使用初始模式，否则选择第一个
  if (!selectedPattern.value && patterns.length > 0) {
    selectPattern(patterns[0])
  }
  
  // 检查是否需要显示滚动提示
  setTimeout(() => {
    if (scrollContainer.value) {
      const hasScroll = scrollContainer.value.scrollHeight > scrollContainer.value.clientHeight
      showScrollHint.value = hasScroll
    }
  }, 100)
})
</script>

<style scoped>
.pattern-viewer {
  padding: 0;
  max-width: 100%;
  margin: 0;
  height: 100%;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.content {
  display: flex;
  gap: 0;
  height: 100%;
  min-height: 500px;
}

/* 代码展示区域 */
.code-area {
  flex: 1;
  width: 100%;
  background: white;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.code-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pattern-info-wrapper {
  max-height: 220px;
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
  /* 添加渐变阴影提示有内容可滚动 */
  box-shadow: inset 0 -20px 15px -15px rgba(52, 152, 219, 0.1);
}

/* 滚动提示指示器 */
.scroll-hint {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to bottom, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.9) 40%,
    rgba(255, 255, 255, 0.98) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 6px;
  pointer-events: none;
  animation: scrollHintPulse 2s ease-in-out infinite;
  z-index: 10;
}

.scroll-hint-content {
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
  pointer-events: auto;
  cursor: pointer;
}

.scroll-icon {
  font-size: 14px;
  animation: scrollArrowBounce 1.5s ease-in-out infinite;
}

.scroll-text {
  letter-spacing: 0.3px;
}

@keyframes scrollHintPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.85;
  }
}

@keyframes scrollArrowBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
}

.pattern-info {
  padding: 0;
  background: white;
  flex-shrink: 0;
}

.pattern-info h2 {
  margin: 0;
  padding: 16px 20px 12px;
  font-size: 24px;
  color: #1a1a1a;
  font-weight: 700;
  background: white;
  border-bottom: 3px solid #3498db;
}

.pattern-info h2 .pattern-name-en {
  font-size: 14px;
  color: #95a5a6;
  font-weight: 400;
  margin-left: 10px;
}

.pattern-desc {
  margin: 0;
  padding: 16px 20px;
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  background: #f8f9fa;
  border-left: 4px solid #e74c3c;
}

.info-section {
  padding: 12px 20px;
  border-bottom: 1px solid #ecf0f1;
}

.info-section:last-child {
  border-bottom: none;
}

.section-label {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.section-content {
  font-size: 13px;
  color: #34495e;
  line-height: 1.6;
  text-align: left;
  padding-left: 0;
}

.applicability-item {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  align-items: flex-start;
}

.applicability-item:last-child {
  margin-bottom: 0;
}

.applicability-item .bullet {
  color: #3498db;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.6;
  flex-shrink: 0;
}

.applicability-item span:last-child {
  flex: 1;
  color: #555;
}

.language-tabs {
  display: flex;
  gap: 2px;
  padding: 12px 20px 0;
  background: #f8f9fa;
  flex-shrink: 0;
  border-top: 1px solid #e0e0e0;
}

.lang-tab {
  padding: 8px 16px;
  background: white;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid transparent;
  border-bottom: none;
}

.lang-tab:hover {
  background: #e8f4f8;
}

.lang-tab.active {
  background: #282c34;
  color: white;
  border-color: #282c34;
}

.lang-icon {
  font-size: 16px;
}

.lang-name {
  font-weight: 600;
  font-size: 13px;
}

.code-display {
  flex: 1;
  background: #f8f9fa;
  padding: 0 20px 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: #282c34;
  border-radius: 8px 8px 0 0;
  color: white;
}

.file-name {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
}

.copy-btn {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.copy-btn.copied {
  background: #27ae60;
}

.code-content {
  flex: 1;
  margin: 0;
  padding: 16px;
  background: #282c34;
  color: #abb2bf;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow: auto;
  border-radius: 0 0 8px 8px;
  text-align: left;
  white-space: pre;
  min-height: 0;
}

.code-content code {
  font-family: inherit;
  background: transparent;
}

/* 空状态 */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #95a5a6;
  padding: 40px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 20px;
  margin-bottom: 8px;
  color: #2c3e50;
}

.empty-state p {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 16px;
}

.empty-hint {
  font-size: 13px;
  color: #3498db;
  background: #e8f4f8;
  padding: 8px 16px;
  border-radius: 16px;
  font-weight: 500;
}

/* 滚动条样式 - 更显眼的样式 */
.pattern-list::-webkit-scrollbar,
.code-content::-webkit-scrollbar,
.pattern-info-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.pattern-list::-webkit-scrollbar-track,
.code-content::-webkit-scrollbar-track,
.pattern-info-wrapper::-webkit-scrollbar-track {
  background: #ecf0f1;
  border-radius: 4px;
}

.pattern-list::-webkit-scrollbar-thumb,
.code-content::-webkit-scrollbar-thumb,
.pattern-info-wrapper::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  border-radius: 4px;
  border: 1px solid #ecf0f1;
}

.pattern-list::-webkit-scrollbar-thumb:hover,
.code-content::-webkit-scrollbar-thumb:hover,
.pattern-info-wrapper::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #2980b9 0%, #1f6ba5 100%);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    height: auto;
  }

  .pattern-list {
    width: 100%;
    max-height: 300px;
  }

  .code-area {
    min-height: 400px;
  }

  .header h1 {
    font-size: 20px;
  }
  
  .scroll-hint {
    height: 40px;
    padding-bottom: 6px;
  }
  
  .scroll-hint-content {
    padding: 4px 12px;
    font-size: 12px;
  }
  
  .scroll-icon {
    font-size: 14px;
  }
}
</style>
