<script setup>
import { ref, computed } from 'vue'

const text1 = ref('')
const text2 = ref('')
const ignoreWhitespace = ref(false)
const ignoreCase = ref(false)

const MAX_LENGTH = 3000

const charCount1 = computed(() => text1.value.length)
const charCount2 = computed(() => text2.value.length)

// 简单的文本差异算法
const computeDiff = () => {
  let t1 = text1.value
  let t2 = text2.value
  
  if (ignoreWhitespace.value) {
    t1 = t1.replace(/\s+/g, ' ').trim()
    t2 = t2.replace(/\s+/g, ' ').trim()
  }
  
  if (ignoreCase.value) {
    t1 = t1.toLowerCase()
    t2 = t2.toLowerCase()
  }
  
  const lines1 = t1.split('\n')
  const lines2 = t2.split('\n')
  
  return diffLines(lines1, lines2)
}

const diffLines = (lines1, lines2) => {
  const result = []
  const len1 = lines1.length
  const len2 = lines2.length
  const maxLen = Math.max(len1, len2)
  
  for (let i = 0; i < maxLen; i++) {
    const line1 = i < len1 ? lines1[i] : null
    const line2 = i < len2 ? lines2[i] : null
    
    if (line1 === null) {
      // 右侧新增
      result.push({ type: 'added', left: '', right: line2, lineNum: i + 1 })
    } else if (line2 === null) {
      // 左侧删除
      result.push({ type: 'removed', left: line1, right: '', lineNum: i + 1 })
    } else if (line1 === line2) {
      // 相同
      result.push({ type: 'equal', left: line1, right: line2, lineNum: i + 1 })
    } else {
      // 修改
      result.push({ type: 'modified', left: line1, right: line2, lineNum: i + 1 })
    }
  }
  
  return result
}

const diff = computed(() => computeDiff())

const stats = computed(() => {
  const total = diff.value.length
  const equal = diff.value.filter(d => d.type === 'equal').length
  const modified = diff.value.filter(d => d.type === 'modified').length
  const added = diff.value.filter(d => d.type === 'added').length
  const removed = diff.value.filter(d => d.type === 'removed').length
  
  return { total, equal, modified, added, removed }
})

const clear = () => {
  text1.value = ''
  text2.value = ''
}

const swap = () => {
  const temp = text1.value
  text1.value = text2.value
  text2.value = temp
}

const loadExample = () => {
  text1.value = `function hello() {
  console.log("Hello World");
  return true;
}

const name = "John";
const age = 25;`

  text2.value = `function hello() {
  console.log("Hello Universe");
  console.log("Welcome!");
  return true;
}

const name = "Jane";
const age = 30;
const city = "Tokyo";`
}

const handleInput1 = () => {
  if (text1.value.length > MAX_LENGTH) {
    text1.value = text1.value.substring(0, MAX_LENGTH)
  }
}

const handleInput2 = () => {
  if (text2.value.length > MAX_LENGTH) {
    text2.value = text2.value.substring(0, MAX_LENGTH)
  }
}
</script>

<template>
  <div class="tool-container">
    <div class="controls">
      <div class="options">
        <label class="checkbox-label">
          <input v-model="ignoreWhitespace" type="checkbox" />
          <span>忽略空格</span>
        </label>
        <label class="checkbox-label">
          <input v-model="ignoreCase" type="checkbox" />
          <span>忽略大小写</span>
        </label>
      </div>

      <div class="actions">
        <button @click="swap" class="action-btn">⇄ 交换</button>
        <button @click="loadExample" class="action-btn">📄 示例</button>
        <button @click="clear" class="action-btn">🗑️ 清空</button>
      </div>
    </div>

    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-label">总行数</span>
        <span class="stat-value">{{ stats.total }}</span>
      </div>
      <div class="stat-item equal">
        <span class="stat-label">相同</span>
        <span class="stat-value">{{ stats.equal }}</span>
      </div>
      <div class="stat-item modified">
        <span class="stat-label">修改</span>
        <span class="stat-value">{{ stats.modified }}</span>
      </div>
      <div class="stat-item added">
        <span class="stat-label">新增</span>
        <span class="stat-value">{{ stats.added }}</span>
      </div>
      <div class="stat-item removed">
        <span class="stat-label">删除</span>
        <span class="stat-value">{{ stats.removed }}</span>
      </div>
    </div>

    <div class="input-section">
      <div class="text-column">
        <div class="column-header">
          <label>文本1（原始）</label>
          <span :class="['char-count', { warning: charCount1 > MAX_LENGTH * 0.9 }]">
            {{ charCount1 }} / {{ MAX_LENGTH }}
          </span>
        </div>
        <textarea 
          v-model="text1"
          @input="handleInput1"
          placeholder="输入第一段文本..."
          class="text-input"
          :maxlength="MAX_LENGTH"
        ></textarea>
      </div>

      <div class="text-column">
        <div class="column-header">
          <label>文本2（对比）</label>
          <span :class="['char-count', { warning: charCount2 > MAX_LENGTH * 0.9 }]">
            {{ charCount2 }} / {{ MAX_LENGTH }}
          </span>
        </div>
        <textarea 
          v-model="text2"
          @input="handleInput2"
          placeholder="输入第二段文本..."
          class="text-input"
          :maxlength="MAX_LENGTH"
        ></textarea>
      </div>
    </div>

    <div v-if="diff.length > 0" class="diff-result">
      <div class="result-header">
        <h3>📊 对比结果</h3>
      </div>

      <div class="diff-view">
        <div class="diff-line" v-for="(item, index) in diff" :key="index" :class="item.type">
          <div class="line-number">{{ item.lineNum }}</div>
          <div class="line-content left">
            <span v-if="item.left" class="line-text">{{ item.left }}</span>
            <span v-else class="empty-line">（空行）</span>
          </div>
          <div class="line-indicator">
            <span v-if="item.type === 'equal'">═</span>
            <span v-else-if="item.type === 'modified'">≠</span>
            <span v-else-if="item.type === 'added'">+</span>
            <span v-else-if="item.type === 'removed'">-</span>
          </div>
          <div class="line-content right">
            <span v-if="item.right" class="line-text">{{ item.right }}</span>
            <span v-else class="empty-line">（空行）</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li>在左右两侧输入需要对比的文本</li>
        <li>每个文本框最多支持3000字符</li>
        <li>绿色表示新增内容，红色表示删除内容，黄色表示修改内容</li>
        <li>可以选择忽略空格或忽略大小写进行对比</li>
        <li>支持交换两侧文本内容</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  flex-wrap: wrap;
  gap: 12px;
}

.options {
  display: flex;
  gap: 16px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  cursor: pointer;
  user-select: none;
}

.checkbox-label input {
  cursor: pointer;
}

.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--border-color);
}

.stats-bar {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: var(--card-bg);
  border-radius: 8px;
  min-width: 80px;
}

.stat-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
}

.stat-item.equal .stat-value {
  color: #6b7280;
}

.stat-item.modified .stat-value {
  color: #f59e0b;
}

.stat-item.added .stat-value {
  color: #10b981;
}

.stat-item.removed .stat-value {
  color: #ef4444;
}

.input-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.text-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-header label {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-color);
}

.char-count {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  font-family: 'Consolas', 'Monaco', monospace;
}

.char-count.warning {
  color: #f59e0b;
}

.text-input {
  width: 100%;
  min-height: 300px;
  padding: 12px;
  background: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.text-input:focus {
  border-color: var(--primary-color);
}

.diff-result {
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.result-header {
  margin-bottom: 16px;
}

.result-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
}

.diff-view {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 500px;
  overflow-y: auto;
}

.diff-line {
  display: grid;
  grid-template-columns: 40px 1fr 40px 1fr;
  gap: 8px;
  padding: 8px;
  border-radius: 6px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
}

.diff-line.equal {
  background: var(--card-bg);
}

.diff-line.modified {
  background: #fef3c7;
}

.dark .diff-line.modified {
  background: #78350f33;
}

.diff-line.added {
  background: #d1fae5;
}

.dark .diff-line.added {
  background: #06402533;
}

.diff-line.removed {
  background: #fee2e2;
}

.dark .diff-line.removed {
  background: #7f1d1d33;
}

.line-number {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
  text-align: center;
  padding-top: 2px;
}

.line-content {
  padding: 4px 8px;
  background: var(--bg-color);
  border-radius: 4px;
  word-break: break-all;
  min-height: 24px;
}

.line-text {
  color: var(--text-color);
}

.empty-line {
  color: var(--text-secondary);
  font-style: italic;
  font-size: 11px;
}

.line-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}

.diff-line.equal .line-indicator {
  color: #6b7280;
}

.diff-line.modified .line-indicator {
  color: #f59e0b;
}

.diff-line.added .line-indicator {
  color: #10b981;
}

.diff-line.removed .line-indicator {
  color: #ef4444;
}

.info-box {
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-box h4 {
  margin-bottom: 8px;
  color: var(--text-color);
  font-size: 13px;
}

.info-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-box li {
  padding: 4px 0;
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.6;
}

.info-box li::before {
  content: '• ';
  color: var(--primary-color);
  font-weight: bold;
  margin-right: 6px;
}

@media (max-width: 768px) {
  .input-section {
    grid-template-columns: 1fr;
  }
  
  .stats-bar {
    justify-content: center;
  }
  
  .stat-item {
    flex: 1;
    min-width: 70px;
  }
  
  .diff-line {
    grid-template-columns: 30px 1fr;
    grid-template-rows: auto auto;
  }
  
  .line-indicator {
    display: none;
  }
}
</style>
