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
            <pre class="code-content" :data-language="selectedLanguage"><code v-html="highlightedCode"></code></pre>
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
  
  return highlightCode(code, selectedLanguage.value)
})

function highlightCode(code, lang) {
  // HTML 转义
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // 关键字高亮
  const keywords = {
    csharp: ['using', 'namespace', 'class', 'public', 'private', 'protected', 'static', 'readonly', 'sealed', 'abstract', 'interface', 'void', 'int', 'string', 'bool', 'var', 'new', 'return', 'if', 'else', 'for', 'foreach', 'while', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'get', 'set', 'override', 'virtual', 'async', 'await', 'lock', 'this', 'base', 'null', 'true', 'false'],
    java: ['package', 'import', 'class', 'public', 'private', 'protected', 'static', 'final', 'abstract', 'interface', 'implements', 'extends', 'void', 'int', 'String', 'boolean', 'new', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'throws', 'this', 'super', 'null', 'true', 'false', 'synchronized', 'volatile', 'enum'],
    go: ['package', 'import', 'func', 'type', 'struct', 'interface', 'var', 'const', 'return', 'if', 'else', 'for', 'range', 'switch', 'case', 'break', 'continue', 'defer', 'go', 'chan', 'select', 'map', 'nil', 'true', 'false', 'make', 'new', 'len', 'cap', 'append', 'copy', 'delete'],
    rust: ['use', 'mod', 'fn', 'pub', 'struct', 'enum', 'trait', 'impl', 'let', 'mut', 'const', 'static', 'return', 'if', 'else', 'for', 'while', 'loop', 'match', 'break', 'continue', 'self', 'Self', 'true', 'false', 'unsafe', 'async', 'await', 'move', 'ref', 'Box', 'Option', 'Result', 'Some', 'None', 'Ok', 'Err']
  }
  
  const langKeywords = keywords[lang] || keywords.csharp
  
  // 标记需要保护的内容
  const protectedRanges = []
  
  // 1. 注释高亮（单行 // 和多行 /* */）
  const commentRegex = /(\/\/[^\n]*)|((\/\*[\s\S]*?\*\/))/g
  let match
  while ((match = commentRegex.exec(highlighted)) !== null) {
    const start = match.index
    const end = start + match[0].length
    protectedRanges.push({ start, end, replacement: `<span class="comment">${match[0]}</span>` })
  }
  
  // 2. 字符串高亮
  const stringRegex = /"(?:[^"\\]|\\.)*"/g
  while ((match = stringRegex.exec(highlighted)) !== null) {
    const start = match.index
    const end = start + match[0].length
    // 检查是否在保护区域内
    if (!protectedRanges.some(r => start >= r.start && end <= r.end)) {
      protectedRanges.push({ start, end, replacement: `<span class="string">${match[0]}</span>` })
    }
  }
  
  // 按位置排序
  protectedRanges.sort((a, b) => b.start - a.start)
  
  // 从后向前替换，避免位置偏移
  protectedRanges.forEach(range => {
    highlighted = highlighted.substring(0, range.start) + range.replacement + highlighted.substring(range.end)
  })
  
  // 3. 数字高亮（不在保护区域内）
  highlighted = highlighted.replace(/\b(\d+)\b(?![^<]*>)/g, '<span class="number">$1</span>')
  
  // 4. 关键字高亮（不在保护区域内）
  langKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b(?![^<]*>)`, 'g')
    highlighted = highlighted.replace(regex, '<span class="keyword">$1</span>')
  })
  
  // 5. 类型高亮（大写开头的单词，不在标签内）
  highlighted = highlighted.replace(/\b([A-Z][a-zA-Z0-9_]*)\b(?![^<]*>)/g, '<span class="type">$1</span>')
  
  // 6. 函数调用高亮（不在标签内）
  highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()(?![^<]*>)/g, '<span class="function">$1</span>')
  
  return highlighted
}

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
  border-radius: 16px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.content {
  display: flex;
  gap: 0;
  height: 100%;
  min-height: 600px;
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
  max-height: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
  /* 添加渐变阴影提示有内容可滚动 */
  box-shadow: inset 0 -30px 20px -20px rgba(52, 152, 219, 0.15);
}

/* 滚动提示指示器 */
.scroll-hint {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to bottom, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.8) 30%,
    rgba(255, 255, 255, 0.95) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  pointer-events: none;
  animation: scrollHintPulse 2s ease-in-out infinite;
  z-index: 10;
}

.scroll-hint-content {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
  pointer-events: auto;
  cursor: pointer;
}

.scroll-icon {
  font-size: 18px;
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
    transform: translateY(4px);
  }
}

.pattern-info {
  padding: 0;
  background: white;
  flex-shrink: 0;
}

.pattern-info h2 {
  margin: 0;
  padding: 24px 24px 16px;
  font-size: 28px;
  color: #1a1a1a;
  font-weight: 700;
  background: white;
  border-bottom: 3px solid #3498db;
}

.pattern-info h2 .pattern-name-en {
  font-size: 16px;
  color: #95a5a6;
  font-weight: 400;
  margin-left: 12px;
}

.pattern-desc {
  margin: 0;
  padding: 20px 24px;
  font-size: 16px;
  color: #555;
  line-height: 1.8;
  background: #f8f9fa;
  border-left: 4px solid #e74c3c;
}

.info-section {
  padding: 20px 24px;
  border-bottom: 1px solid #ecf0f1;
}

.info-section:last-child {
  border-bottom: none;
}

.section-label {
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.section-content {
  font-size: 14px;
  color: #34495e;
  line-height: 1.7;
  text-align: left;
  padding-left: 0;
}

.applicability-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: flex-start;
}

.applicability-item:last-child {
  margin-bottom: 0;
}

.applicability-item .bullet {
  color: #3498db;
  font-weight: bold;
  font-size: 18px;
  line-height: 1.7;
  flex-shrink: 0;
}

.applicability-item span:last-child {
  flex: 1;
  color: #555;
}

.language-tabs {
  display: flex;
  gap: 4px;
  padding: 16px 24px 0;
  background: #f8f9fa;
  flex-shrink: 0;
  border-top: 1px solid #e0e0e0;
}

.lang-tab {
  padding: 10px 20px;
  background: white;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 2px solid transparent;
  border-bottom: none;
}

.lang-tab:hover {
  background: #e8f4f8;
}

.lang-tab.active {
  background: #2c3e50;
  color: white;
  border-color: #2c3e50;
}

.lang-icon {
  font-size: 18px;
}

.lang-name {
  font-weight: 600;
  font-size: 14px;
}

.code-display {
  flex: 1;
  background: #f8f9fa;
  padding: 0 24px 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #2c3e50;
  border-radius: 8px 8px 0 0;
  color: white;
}

.file-name {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
}

.copy-btn {
  padding: 6px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: #2980b9;
}

.copy-btn.copied {
  background: #27ae60;
}

.code-content {
  flex: 1;
  margin: 0;
  padding: 20px;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  overflow: auto;
  border-radius: 0 0 8px 8px;
  text-align: left;
  white-space: pre;
  min-height: 0;
}

.code-content code {
  font-family: inherit;
}

/* 语法高亮颜色 */
.code-content :deep(.keyword) {
  color: #569cd6; /* 蓝色 - 关键字 */
  font-weight: 500;
}

.code-content :deep(.string) {
  color: #ce9178; /* 橙色 - 字符串 */
}

.code-content :deep(.comment) {
  color: #6a9955; /* 绿色 - 注释 */
  font-style: italic;
}

.code-content :deep(.number) {
  color: #b5cea8; /* 浅绿色 - 数字 */
}

.code-content :deep(.function) {
  color: #dcdcaa; /* 黄色 - 函数 */
}

.code-content :deep(.type) {
  color: #4ec9b0; /* 青色 - 类型 */
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
  font-size: 80px;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #2c3e50;
}

.empty-state p {
  font-size: 15px;
  color: #7f8c8d;
  margin-bottom: 20px;
}

.empty-hint {
  font-size: 14px;
  color: #3498db;
  background: #e8f4f8;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 500;
}

/* 滚动条样式 - 更显眼的样式 */
.pattern-list::-webkit-scrollbar,
.code-content::-webkit-scrollbar,
.pattern-info-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.pattern-list::-webkit-scrollbar-track,
.code-content::-webkit-scrollbar-track,
.pattern-info-wrapper::-webkit-scrollbar-track {
  background: #ecf0f1;
  border-radius: 5px;
}

.pattern-list::-webkit-scrollbar-thumb,
.code-content::-webkit-scrollbar-thumb,
.pattern-info-wrapper::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  border-radius: 5px;
  border: 2px solid #ecf0f1;
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
    max-height: 400px;
  }

  .code-area {
    min-height: 500px;
  }

  .header h1 {
    font-size: 24px;
  }
  
  .scroll-hint {
    height: 50px;
    padding-bottom: 8px;
  }
  
  .scroll-hint-content {
    padding: 6px 16px;
    font-size: 13px;
  }
  
  .scroll-icon {
    font-size: 16px;
  }
}
</style>
