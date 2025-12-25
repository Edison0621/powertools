<script setup>
import { ref } from 'vue'

const input = ref('')
const formatted = ref('')
const error = ref('')

const format = () => {
  try {
    const parsed = JSON.parse(input.value)
    formatted.value = JSON.stringify(parsed, null, 2)
    error.value = ''
  } catch (e) {
    error.value = '无效的JSON: ' + e.message
    formatted.value = ''
  }
}

const minify = () => {
  try {
    const parsed = JSON.parse(input.value)
    formatted.value = JSON.stringify(parsed)
    error.value = ''
  } catch (e) {
    error.value = '无效的JSON: ' + e.message
    formatted.value = ''
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
}

const example = () => {
  input.value = `{
  "name": "PowerTools",
  "version": "1.0.0",
  "description": "开发者工具集",
  "features": ["Base64", "JSON", "UUID", "Hash"],
  "active": true
}`
  format()
}
</script>

<template>
  <div class="tool-container">
    <div class="tool-controls">
      <button @click="format" class="action-btn primary">
        ✨ 格式化
      </button>
      <button @click="minify" class="action-btn">
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
        </div>
        <textarea 
          v-model="input"
          placeholder='{"key": "value"}'
          class="io-textarea"
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
  gap: 20px;
}

.tool-controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 10px 20px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--border-color);
  transform: translateY(-1px);
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
  background: #fee;
  color: #c33;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #c33;
}

.dark .error-message {
  background: #4a1515;
  color: #ff6b6b;
  border-left-color: #ff6b6b;
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
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
}

.io-textarea:focus {
  border-color: var(--primary-color);
}

.io-textarea::placeholder {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .io-container {
    grid-template-columns: 1fr;
  }
}
</style>
