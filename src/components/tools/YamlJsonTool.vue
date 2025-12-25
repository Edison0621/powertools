<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const mode = ref('yaml-to-json') // yaml-to-json or json-to-yaml
const error = ref('')
const indentSize = ref(2)

// 简单的YAML解析器（基础功能）
const parseYAML = (yamlString) => {
  const lines = yamlString.split('\n')
  const result = {}
  const stack = [{ obj: result, indent: -1 }]
  
  lines.forEach(line => {
    if (!line.trim() || line.trim().startsWith('#')) return
    
    const indent = line.search(/\S/)
    const content = line.trim()
    
    // 检测数组项
    if (content.startsWith('- ')) {
      const value = content.substring(2).trim()
      const parent = stack[stack.length - 1].obj
      
      if (!Array.isArray(parent)) {
        const key = Object.keys(parent).pop()
        parent[key] = []
      }
      
      const arr = Array.isArray(parent) ? parent : parent[Object.keys(parent).pop()]
      
      // 尝试解析值
      if (value.includes(':')) {
        const obj = {}
        const [k, v] = value.split(':').map(s => s.trim())
        obj[k] = parseValue(v)
        arr.push(obj)
      } else {
        arr.push(parseValue(value))
      }
      return
    }
    
    // 键值对
    if (content.includes(':')) {
      const colonIndex = content.indexOf(':')
      const key = content.substring(0, colonIndex).trim()
      const value = content.substring(colonIndex + 1).trim()
      
      // 弹出栈直到找到正确的父级
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop()
      }
      
      const parent = stack[stack.length - 1].obj
      
      if (value === '') {
        // 空值表示嵌套对象
        parent[key] = {}
        stack.push({ obj: parent[key], indent })
      } else {
        parent[key] = parseValue(value)
      }
    }
  })
  
  return result
}

const parseValue = (value) => {
  if (!value) return null
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === 'null') return null
  if (/^-?\d+$/.test(value)) return parseInt(value)
  if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value)
  
  // 移除引号
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1)
  }
  
  return value
}

// JSON转YAML
const jsonToYAML = (obj, indent = 0) => {
  const spaces = ' '.repeat(indent * indentSize.value)
  let result = ''
  
  if (Array.isArray(obj)) {
    obj.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        result += spaces + '-\n'
        result += jsonToYAML(item, indent + 1)
      } else {
        result += spaces + '- ' + formatValue(item) + '\n'
      }
    })
  } else if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      
      if (typeof value === 'object' && value !== null) {
        result += spaces + key + ':\n'
        result += jsonToYAML(value, indent + 1)
      } else {
        result += spaces + key + ': ' + formatValue(value) + '\n'
      }
    })
  }
  
  return result
}

const formatValue = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'boolean') return value.toString()
  if (typeof value === 'number') return value.toString()
  if (typeof value === 'string') {
    // 如果包含特殊字符，加引号
    if (value.includes(':') || value.includes('#') || value.includes('\n')) {
      return '"' + value.replace(/"/g, '\\"') + '"'
    }
    return value
  }
  return String(value)
}

const convert = () => {
  error.value = ''
  output.value = ''
  
  if (!input.value.trim()) {
    error.value = '请输入内容'
    return
  }
  
  try {
    if (mode.value === 'yaml-to-json') {
      const obj = parseYAML(input.value)
      output.value = JSON.stringify(obj, null, indentSize.value)
    } else {
      const obj = JSON.parse(input.value)
      output.value = jsonToYAML(obj, 0)
    }
  } catch (e) {
    error.value = '转换失败: ' + e.message
  }
}

const swap = () => {
  const temp = input.value
  input.value = output.value
  output.value = temp
  mode.value = mode.value === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json'
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
  output.value = ''
  error.value = ''
}

const loadExample = () => {
  if (mode.value === 'yaml-to-json') {
    input.value = `name: John Doe
age: 30
email: john@example.com
address:
  street: 123 Main St
  city: New York
  zip: 10001
skills:
  - JavaScript
  - Python
  - SQL
active: true`
  } else {
    input.value = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": 10001
  },
  "skills": [
    "JavaScript",
    "Python",
    "SQL"
  ],
  "active": true
}`
  }
  convert()
}
</script>

<template>
  <div class="tool-container">
    <div class="controls">
      <div class="mode-selector">
        <button 
          @click="mode = 'yaml-to-json'; clear()"
          :class="['mode-btn', { active: mode === 'yaml-to-json' }]"
        >
          YAML → JSON
        </button>
        <button 
          @click="mode = 'json-to-yaml'; clear()"
          :class="['mode-btn', { active: mode === 'json-to-yaml' }]"
        >
          JSON → YAML
        </button>
      </div>

      <div class="settings">
        <div class="setting-item">
          <label>缩进空格</label>
          <input 
            v-model.number="indentSize" 
            type="number" 
            min="2" 
            max="8"
            class="number-input"
          />
        </div>
      </div>

      <div class="actions">
        <button @click="convert" class="action-btn primary">🔄 转换</button>
        <button @click="swap" class="action-btn">⇄ 交换</button>
        <button @click="loadExample" class="action-btn">📄 示例</button>
        <button @click="clear" class="action-btn">🗑️ 清空</button>
      </div>
    </div>

    <div v-if="error" class="error-message">
      ⚠️ {{ error }}
    </div>

    <div class="io-container">
      <div class="io-section">
        <div class="io-header">
          <label>{{ mode === 'yaml-to-json' ? 'YAML输入' : 'JSON输入' }}</label>
        </div>
        <textarea 
          v-model="input"
          :placeholder="mode === 'yaml-to-json' ? '输入YAML...' : '输入JSON...'"
          class="io-textarea"
          @input="convert"
        ></textarea>
      </div>

      <div class="io-section">
        <div class="io-header">
          <label>{{ mode === 'yaml-to-json' ? 'JSON输出' : 'YAML输出' }}</label>
          <button @click="copy(output)" class="copy-btn" :disabled="!output">
            📋 复制
          </button>
        </div>
        <textarea 
          v-model="output"
          readonly
          :placeholder="mode === 'yaml-to-json' ? 'JSON输出...' : 'YAML输出...'"
          class="io-textarea"
        ></textarea>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 说明</h4>
      <ul>
        <li>支持YAML和JSON双向转换</li>
        <li>自动检测并转换数据类型（字符串、数字、布尔值等）</li>
        <li>支持嵌套对象和数组</li>
        <li>实时转换，输入即转换</li>
        <li>可自定义缩进空格数</li>
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
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.mode-selector {
  display: flex;
  gap: 8px;
}

.mode-btn {
  padding: 8px 16px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.mode-btn:hover {
  border-color: var(--primary-color);
}

.mode-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.settings {
  display: flex;
  gap: 12px;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.setting-item label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  white-space: nowrap;
}

.number-input {
  width: 60px;
  padding: 6px 8px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
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

.action-btn.primary {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.action-btn.primary:hover {
  background: var(--primary-hover);
}

.error-message {
  padding: 12px;
  background: #fee;
  color: #c33;
  border-radius: 8px;
  border-left: 4px solid #c33;
  font-size: 14px;
}

.dark .error-message {
  background: #4a1515;
  color: #ff6b6b;
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
  font-size: 14px;
  color: var(--text-color);
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

.copy-btn:hover:not(:disabled) {
  background: var(--border-color);
}

.copy-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.io-textarea {
  width: 100%;
  min-height: 400px;
  padding: 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.io-textarea:focus {
  border-color: var(--primary-color);
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
  content: '✓ ';
  color: var(--primary-color);
  font-weight: bold;
  margin-right: 6px;
}

@media (max-width: 768px) {
  .io-container {
    grid-template-columns: 1fr;
  }
  
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .actions {
    margin-left: 0;
    width: 100%;
  }
  
  .action-btn {
    flex: 1;
  }
}
</style>
