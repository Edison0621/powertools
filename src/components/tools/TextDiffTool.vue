<script setup>
import { ref, computed } from 'vue'

const input = ref('')
const removeDuplicates = ref(true)
const removeEmptyLines = ref(true)
const trimLines = ref(true)
const caseSensitive = ref(true)
const sortLines = ref(false)

const output = computed(() => {
  if (!input.value) return ''
  
  let lines = input.value.split('\n')
  
  // 修剪每行
  if (trimLines.value) {
    lines = lines.map(line => line.trim())
  }
  
  // 移除空行
  if (removeEmptyLines.value) {
    lines = lines.filter(line => line.length > 0)
  }
  
  // 去除重复行
  if (removeDuplicates.value) {
    if (caseSensitive.value) {
      lines = [...new Set(lines)]
    } else {
      const seen = new Set()
      lines = lines.filter(line => {
        const lower = line.toLowerCase()
        if (seen.has(lower)) return false
        seen.add(lower)
        return true
      })
    }
  }
  
  // 排序
  if (sortLines.value) {
    lines.sort((a, b) => {
      if (!caseSensitive.value) {
        return a.toLowerCase().localeCompare(b.toLowerCase())
      }
      return a.localeCompare(b)
    })
  }
  
  return lines.join('\n')
})

const stats = computed(() => {
  const inputLines = input.value.split('\n').filter(l => l.trim())
  const outputLines = output.value.split('\n').filter(l => l.trim())
  
  return {
    inputLines: inputLines.length,
    outputLines: outputLines.length,
    removed: inputLines.length - outputLines.length
  }
})

const copy = async () => {
  try {
    await navigator.clipboard.writeText(output.value)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const clear = () => {
  input.value = ''
}

const example = () => {
  input.value = `Apple
Banana
apple
Orange
Banana

Apple
Grape
orange`
}
</script>

<template>
  <div class="tool-container">
    <div class="options-panel">
      <h4>处理选项</h4>
      <div class="options-grid">
        <label class="option-checkbox">
          <input v-model="removeDuplicates" type="checkbox" />
          <span>去除重复行</span>
        </label>
        <label class="option-checkbox">
          <input v-model="removeEmptyLines" type="checkbox" />
          <span>删除空行</span>
        </label>
        <label class="option-checkbox">
          <input v-model="trimLines" type="checkbox" />
          <span>修剪空格</span>
        </label>
        <label class="option-checkbox">
          <input v-model="caseSensitive" type="checkbox" />
          <span>区分大小写</span>
        </label>
        <label class="option-checkbox">
          <input v-model="sortLines" type="checkbox" />
          <span>排序</span>
        </label>
      </div>
    </div>

    <div class="stats-bar">
      <div class="stat">
        <span class="stat-label">输入:</span>
        <span class="stat-value">{{ stats.inputLines }} 行</span>
      </div>
      <div class="stat-arrow">→</div>
      <div class="stat">
        <span class="stat-label">输出:</span>
        <span class="stat-value">{{ stats.outputLines }} 行</span>
      </div>
      <div class="stat removed">
        <span class="stat-label">删除:</span>
        <span class="stat-value">{{ stats.removed }} 行</span>
      </div>
    </div>

    <div class="io-container">
      <div class="io-section">
        <div class="io-header">
          <label>输入文本</label>
          <div class="header-actions">
            <button @click="example" class="action-btn">📄 示例</button>
            <button @click="clear" class="action-btn">🗑️ 清空</button>
          </div>
        </div>
        <textarea 
          v-model="input"
          placeholder="每行一条数据..."
          class="io-textarea"
        ></textarea>
      </div>

      <div class="io-section">
        <div class="io-header">
          <label>处理结果</label>
          <button @click="copy" class="copy-btn">📋 复制</button>
        </div>
        <textarea 
          :value="output"
          readonly
          placeholder="处理后的结果..."
          class="io-textarea"
        ></textarea>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 功能说明</h4>
      <ul>
        <li><strong>去除重复行:</strong> 删除完全相同的行（可选区分大小写）</li>
        <li><strong>删除空行:</strong> 移除空白行</li>
        <li><strong>修剪空格:</strong> 删除每行前后的空格</li>
        <li><strong>排序:</strong> 按字母顺序排列</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.options-panel {
  padding: 20px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.options-panel h4 {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.option-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  user-select: none;
}

.option-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.stats-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat.removed {
  margin-left: auto;
  padding: 8px 16px;
  background: var(--primary-color);
  border-radius: 8px;
}

.stat.removed .stat-label,
.stat.removed .stat-value {
  color: white;
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.stat-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
}

.stat-arrow {
  font-size: 20px;
  color: var(--text-secondary);
}

.io-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.io-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.io-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.io-header label {
  font-weight: 600;
  font-size: 16px;
  color: var(--text-color);
}

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--border-color);
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

.io-textarea {
  width: 100%;
  min-height: 300px;
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.io-textarea:focus {
  border-color: var(--primary-color);
}

.info-box {
  padding: 20px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-box h4 {
  margin-bottom: 12px;
  color: var(--text-color);
  font-size: 15px;
}

.info-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-box li {
  padding: 8px 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

.info-box li strong {
  color: var(--primary-color);
  font-weight: 600;
}

@media (max-width: 768px) {
  .io-container {
    grid-template-columns: 1fr;
  }
  
  .stats-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .stat.removed {
    margin-left: 0;
  }
}
</style>

