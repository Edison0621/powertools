<script setup>
import { ref, computed, watch } from 'vue'

const input = ref('')
const formatted = ref('')
const error = ref('')
const isValid = ref(null)
const jsonStats = ref(null)

// 实时校验JSON
const validateJson = () => {
  if (!input.value.trim()) {
    isValid.value = null
    error.value = ''
    jsonStats.value = null
    return
  }

  try {
    // 首先检查是否有重复的键
    const duplicateKeys = findDuplicateKeys(input.value)
    if (duplicateKeys.length > 0) {
      isValid.value = false
      error.value = `JSON格式错误: 发现重复的键名 "${duplicateKeys.join('", "')}"。JSON对象不允许有重复的键。`
      jsonStats.value = null
      return
    }

    const parsed = JSON.parse(input.value)
    isValid.value = true
    error.value = ''
    
    // 计算JSON统计信息
    calculateStats(parsed, input.value)
  } catch (e) {
    isValid.value = false
    
    // 详细的错误信息
    const errorMsg = e.message
    const position = errorMsg.match(/position (\d+)/)
    
    if (position) {
      const pos = parseInt(position[1])
      const lines = input.value.substring(0, pos).split('\n')
      const line = lines.length
      const column = lines[lines.length - 1].length + 1
      error.value = `JSON格式错误（第${line}行，第${column}列）: ${errorMsg}`
    } else {
      error.value = `JSON格式错误: ${errorMsg}`
    }
    
    jsonStats.value = null
  }
}

// 检测JSON字符串中的重复键
const findDuplicateKeys = (jsonString) => {
  const duplicates = new Set()
  
  try {
    // 使用自定义的reviver函数检测重复键
    const keys = new Map()
    let currentPath = []
    
    // 正则匹配所有的键值对
    // 这个方法检查JSON文本中的键，而不是解析后的对象
    const keyPattern = /"([^"]+)"\s*:/g
    let match
    const jsonLines = jsonString.split('\n')
    
    jsonLines.forEach((line, lineIndex) => {
      const lineKeys = new Set()
      let m
      const pattern = /"([^"]+)"\s*:/g
      
      while ((m = pattern.exec(line)) !== null) {
        const key = m[1]
        if (lineKeys.has(key)) {
          duplicates.add(key)
        }
        lineKeys.add(key)
      }
    })
    
    // 更严格的检查：在整个对象层级中查找重复
    const objectPattern = /\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g
    let objMatch
    
    while ((objMatch = objectPattern.exec(jsonString)) !== null) {
      const objContent = objMatch[1]
      const keysInObject = new Map()
      const keyValuePattern = /"([^"]+)"\s*:/g
      let kvMatch
      
      while ((kvMatch = keyValuePattern.exec(objContent)) !== null) {
        const key = kvMatch[1]
        if (keysInObject.has(key)) {
          duplicates.add(key)
        }
        keysInObject.set(key, true)
      }
    }
    
  } catch (e) {
    // 如果检测过程出错，返回空数组，让JSON.parse去处理
    return []
  }
  
  return Array.from(duplicates)
}

// 计算JSON统计信息
const calculateStats = (parsed, jsonString) => {
  const stats = {
    size: new Blob([jsonString]).size,
    lines: jsonString.split('\n').length,
    type: Array.isArray(parsed) ? '数组' : typeof parsed === 'object' ? '对象' : typeof parsed
  }

  // 递归计算深度和节点数
  let depth = 0
  let nodeCount = 0

  const traverse = (obj, level) => {
    depth = Math.max(depth, level)
    nodeCount++

    if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        traverse(obj[key], level + 1)
      })
    }
  }

  traverse(parsed, 1)

  stats.depth = depth
  stats.nodes = nodeCount

  // 如果是对象或数组，统计键数量
  if (Array.isArray(parsed)) {
    stats.items = parsed.length
  } else if (typeof parsed === 'object' && parsed !== null) {
    stats.keys = Object.keys(parsed).length
  }

  jsonStats.value = stats
}

// 监听输入变化，实时校验
watch(input, () => {
  validateJson()
}, { immediate: true })

const format = () => {
  try {
    const parsed = JSON.parse(input.value)
    formatted.value = JSON.stringify(parsed, null, 2)
    error.value = ''
    isValid.value = true
  } catch (e) {
    error.value = '无效的JSON: ' + e.message
    formatted.value = ''
    isValid.value = false
  }
}

const minify = () => {
  try {
    const parsed = JSON.parse(input.value)
    formatted.value = JSON.stringify(parsed)
    error.value = ''
    isValid.value = true
  } catch (e) {
    error.value = '无效的JSON: ' + e.message
    formatted.value = ''
    isValid.value = false
  }
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const clear = () => {
  input.value = ''
  formatted.value = ''
  error.value = ''
  isValid.value = null
  jsonStats.value = null
}

const example = () => {
  input.value = `{
  "name": "PowerTools",
  "version": "1.0.0",
  "description": "开发者工具集",
  "features": ["Base64", "JSON", "UUID", "Hash"],
  "active": true,
  "config": {
    "theme": "dark",
    "language": "zh-CN"
  }
}`
  format()
}

// 格式化文件大小
const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}
</script>

<template>
  <div class="tool-container">
    <!-- 状态栏 -->
    <div class="status-bar" v-if="isValid !== null">
      <div class="status-indicator" :class="{ valid: isValid, invalid: !isValid }">
        <span class="status-icon">{{ isValid ? '✓' : '✗' }}</span>
        <span class="status-text">{{ isValid ? 'JSON 有效' : 'JSON 无效' }}</span>
      </div>
      
      <div class="json-stats" v-if="isValid && jsonStats">
        <span class="stat-item" :title="'大小: ' + formatSize(jsonStats.size)">
          📦 {{ formatSize(jsonStats.size) }}
        </span>
        <span class="stat-item" :title="'行数: ' + jsonStats.lines">
          📄 {{ jsonStats.lines }} 行
        </span>
        <span class="stat-item" :title="'类型: ' + jsonStats.type">
          🏷️ {{ jsonStats.type }}
        </span>
        <span class="stat-item" v-if="jsonStats.keys" :title="'键数量: ' + jsonStats.keys">
          🔑 {{ jsonStats.keys }} 键
        </span>
        <span class="stat-item" v-if="jsonStats.items !== undefined" :title="'数组长度: ' + jsonStats.items">
          📋 {{ jsonStats.items }} 项
        </span>
        <span class="stat-item" :title="'嵌套深度: ' + jsonStats.depth">
          📊 深度 {{ jsonStats.depth }}
        </span>
        <span class="stat-item" :title="'节点数: ' + jsonStats.nodes">
          🔢 {{ jsonStats.nodes }} 节点
        </span>
      </div>
    </div>

    <div class="tool-controls">
      <button @click="format" class="action-btn primary" :disabled="!isValid">
        ✨ 格式化
      </button>
      <button @click="minify" class="action-btn" :disabled="!isValid">
        📦 压缩
      </button>
      <button @click="example" class="action-btn">
        📄 示例
      </button>
      <button @click="clear" class="action-btn">
        🗑️ 清空
      </button>
    </div>

    <div v-if="error" class="error-message">
      ⚠️ {{ error }}
    </div>

    <div class="io-container">
      <div class="io-section">
        <div class="io-header">
          <label>输入 JSON</label>
          <div class="validation-badge" v-if="isValid !== null">
            <span class="badge" :class="{ valid: isValid, invalid: !isValid }">
              {{ isValid ? '✓ 有效' : '✗ 无效' }}
            </span>
          </div>
        </div>
        <textarea 
          v-model="input"
          placeholder='{"key": "value"}'
          class="io-textarea"
          :class="{ 'textarea-valid': isValid === true, 'textarea-invalid': isValid === false }"
        ></textarea>
      </div>

      <div class="io-section">
        <div class="io-header">
          <label>格式化结果</label>
          <button 
            @click="copy(formatted)" 
            class="copy-btn"
            :disabled="!formatted"
          >
            📋 复制
          </button>
        </div>
        <textarea 
          v-model="formatted"
          readonly
          placeholder="格式化后的JSON将显示在这里..."
          class="io-textarea"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 10px 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  flex-wrap: wrap;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
}

.status-indicator.valid {
  color: #22c55e;
}

.status-indicator.invalid {
  color: #ef4444;
}

.status-icon {
  font-size: 16px;
  font-weight: bold;
}

.json-stats {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--text-secondary);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: var(--card-bg);
  border-radius: 4px;
  cursor: help;
}

.tool-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 6px 14px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
  height: 32px;
}

.action-btn:hover:not(:disabled) {
  background: var(--border-color);
  transform: translateY(-1px);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.action-btn.primary {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.action-btn.primary:hover:not(:disabled) {
  background: var(--primary-hover);
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 10px 14px;
  border-radius: 6px;
  border-left: 4px solid #c33;
  font-size: 13px;
  line-height: 1.5;
}

.dark .error-message {
  background: #4a1515;
  color: #ff6b6b;
  border-left-color: #ff6b6b;
}

.io-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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
  color: var(--text-color);
  font-size: 14px;
}

.validation-badge {
  display: flex;
  align-items: center;
}

.badge {
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}

.badge.valid {
  background: #dcfce7;
  color: #16a34a;
}

.badge.invalid {
  background: #fee2e2;
  color: #dc2626;
}

.dark .badge.valid {
  background: #14532d;
  color: #4ade80;
}

.dark .badge.invalid {
  background: #7f1d1d;
  color: #f87171;
}

.copy-btn {
  padding: 4px 10px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.copy-btn:hover:not(:disabled) {
  background: var(--border-color);
}

.copy-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.io-textarea {
  width: 100%;
  min-height: 350px;
  padding: 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-color);
  resize: vertical;
  outline: none;
  transition: all 0.2s;
}

.io-textarea:focus {
  border-color: var(--primary-color);
}

.io-textarea.textarea-valid {
  border-color: #22c55e;
}

.io-textarea.textarea-valid:focus {
  border-color: #16a34a;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

.io-textarea.textarea-invalid {
  border-color: #ef4444;
}

.io-textarea.textarea-invalid:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.io-textarea::placeholder {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .io-container {
    grid-template-columns: 1fr;
  }

  .status-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .json-stats {
    gap: 8px;
  }

  .stat-item {
    font-size: 12px;
  }
}
</style>
