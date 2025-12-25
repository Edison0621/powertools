<script setup>
import { ref, computed } from 'vue'

const pattern = ref('\\d+')
const flags = ref('g')
const testString = ref('Test 123 string 456 with 789 numbers')
const replaceWith = ref('')

const flagOptions = {
  g: '全局匹配',
  i: '忽略大小写',
  m: '多行模式',
  s: '单行模式',
  u: 'Unicode',
  y: '粘性匹配'
}

const regex = computed(() => {
  try {
    return new RegExp(pattern.value, flags.value)
  } catch (e) {
    return null
  }
})

const matches = computed(() => {
  if (!regex.value || !testString.value) return []
  
  try {
    return [...testString.value.matchAll(regex.value)]
  } catch (e) {
    return []
  }
})

const highlightedText = computed(() => {
  if (!regex.value || !testString.value || matches.value.length === 0) {
    return testString.value
  }
  
  let result = testString.value
  let offset = 0
  
  matches.value.forEach(match => {
    const start = match.index + offset
    const end = start + match[0].length
    const highlighted = `<mark>${match[0]}</mark>`
    result = result.slice(0, start) + highlighted + result.slice(end)
    offset += highlighted.length - match[0].length
  })
  
  return result
})

const replaced = computed(() => {
  if (!regex.value || !testString.value) return ''
  
  try {
    return testString.value.replace(regex.value, replaceWith.value)
  } catch (e) {
    return ''
  }
})

const isValid = computed(() => regex.value !== null)

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const toggleFlag = (flag) => {
  if (flags.value.includes(flag)) {
    flags.value = flags.value.replace(flag, '')
  } else {
    flags.value += flag
  }
}

const examples = [
  { name: '邮箱', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
  { name: '手机号', pattern: '1[3-9]\\d{9}' },
  { name: 'URL', pattern: 'https?:\\/\\/[^\\s]+' },
  { name: 'IP地址', pattern: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b' },
  { name: '数字', pattern: '\\d+' },
  { name: '中文', pattern: '[\\u4e00-\\u9fa5]+' }
]

const useExample = (ex) => {
  pattern.value = ex.pattern
}
</script>

<template>
  <div class="tool-container">
    <div class="pattern-section">
      <div class="pattern-header">
        <label>正则表达式</label>
        <span v-if="!isValid" class="error-badge">❌ 无效</span>
        <span v-else class="success-badge">✅ 有效</span>
      </div>
      <div class="pattern-input-wrapper">
        <span class="delimiter">/</span>
        <input 
          v-model="pattern"
          type="text"
          class="pattern-input"
          placeholder="输入正则表达式..."
        />
        <span class="delimiter">/</span>
        <input 
          v-model="flags"
          type="text"
          class="flags-input"
          placeholder="flags"
        />
      </div>
      
      <div class="flags-checkboxes">
        <label 
          v-for="(label, flag) in flagOptions" 
          :key="flag"
          class="flag-checkbox"
        >
          <input 
            type="checkbox" 
            :checked="flags.includes(flag)"
            @change="toggleFlag(flag)"
          />
          <span>{{ flag }} - {{ label }}</span>
        </label>
      </div>
    </div>

    <div class="examples-section">
      <h4>快速示例</h4>
      <div class="examples-grid">
        <button 
          v-for="ex in examples" 
          :key="ex.name"
          @click="useExample(ex)"
          class="example-btn"
        >
          {{ ex.name }}
        </button>
      </div>
    </div>

    <div class="test-section">
      <div class="section-header">
        <label>测试字符串</label>
        <span v-if="matches.length > 0" class="match-count">
          {{ matches.length }} 个匹配
        </span>
      </div>
      <textarea 
        v-model="testString"
        placeholder="输入要测试的文本..."
        class="test-textarea"
      ></textarea>
    </div>

    <div v-if="matches.length > 0" class="results-section">
      <div class="section-header">
        <label>高亮显示</label>
        <button @click="copy(testString)" class="copy-btn">📋 复制</button>
      </div>
      <div class="highlighted-text" v-html="highlightedText"></div>
    </div>

    <div v-if="matches.length > 0" class="matches-section">
      <h4>匹配结果</h4>
      <div class="matches-list">
        <div 
          v-for="(match, index) in matches" 
          :key="index"
          class="match-item"
        >
          <div class="match-header">
            <span class="match-index">匹配 #{{ index + 1 }}</span>
            <button @click="copy(match[0])" class="mini-copy">📋</button>
          </div>
          <div class="match-content">
            <span class="match-text">{{ match[0] }}</span>
            <span class="match-position">位置: {{ match.index }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="replace-section">
      <div class="section-header">
        <label>替换</label>
      </div>
      <input 
        v-model="replaceWith"
        type="text"
        class="replace-input"
        placeholder="替换为..."
      />
      <div v-if="replaced && replaceWith" class="replace-result">
        <div class="section-header">
          <label>替换结果</label>
          <button @click="copy(replaced)" class="copy-btn">📋 复制</button>
        </div>
        <div class="result-text">{{ replaced }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pattern-section {
  padding: 20px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.pattern-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.pattern-header label {
  font-weight: 600;
  font-size: 16px;
  color: var(--text-color);
}

.error-badge {
  padding: 4px 8px;
  background: #fee;
  color: #c33;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.success-badge {
  padding: 4px 8px;
  background: #efe;
  color: #3c3;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.dark .error-badge {
  background: #4a1515;
  color: #ff6b6b;
}

.dark .success-badge {
  background: #1a4a1a;
  color: #5cff5c;
}

.pattern-input-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 16px;
}

.pattern-input-wrapper:focus-within {
  border-color: var(--primary-color);
}

.delimiter {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
  font-family: 'Consolas', 'Monaco', monospace;
}

.pattern-input {
  flex: 1;
  border: none;
  background: none;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 16px;
  color: var(--text-color);
  outline: none;
}

.flags-input {
  width: 60px;
  border: none;
  background: none;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 16px;
  color: var(--text-color);
  outline: none;
}

.flags-checkboxes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
}

.flag-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  user-select: none;
}

.flag-checkbox input {
  cursor: pointer;
}

.examples-section {
  padding: 16px 20px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.examples-section h4 {
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--text-color);
}

.examples-grid {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.example-btn {
  padding: 6px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.example-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.test-section,
.results-section,
.replace-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header label {
  font-weight: 600;
  font-size: 16px;
  color: var(--text-color);
}

.match-count {
  padding: 4px 12px;
  background: var(--primary-color);
  color: white;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.test-textarea {
  width: 100%;
  min-height: 150px;
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.test-textarea:focus {
  border-color: var(--primary-color);
}

.highlighted-text {
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-color);
  word-break: break-all;
}

.highlighted-text :deep(mark) {
  background: #ffd700;
  color: #000;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 600;
}

.matches-section {
  padding: 20px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.matches-section h4 {
  margin-bottom: 16px;
  font-size: 16px;
  color: var(--text-color);
}

.matches-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.match-item {
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.match-index {
  font-size: 13px;
  font-weight: 600;
  color: var(--primary-color);
}

.mini-copy {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.mini-copy:hover {
  opacity: 1;
}

.match-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.match-text {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.match-position {
  font-size: 12px;
  color: var(--text-secondary);
}

.replace-input {
  width: 100%;
  padding: 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.replace-input:focus {
  border-color: var(--primary-color);
}

.replace-result {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-text {
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  color: var(--text-color);
  word-break: break-all;
}

.copy-btn {
  padding: 6px 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--border-color);
}

@media (max-width: 768px) {
  .settings-panel {
    padding: 16px;
  }

  .io-textarea {
    min-height: 150px;
    font-size: 13px;
  }

  .results-panel {
    padding: 16px;
  }

  .matches-grid {
    grid-template-columns: 1fr;
  }

  .result-text {
    font-size: 13px;
  }
}
</style>
