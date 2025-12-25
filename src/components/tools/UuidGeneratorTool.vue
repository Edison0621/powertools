<script setup>
import { ref } from 'vue'

const uuids = ref([])
const count = ref(5)
const version = ref('v4')
const uppercase = ref(false)
const withBraces = ref(false)

const generateV4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const generate = () => {
  uuids.value = []
  const num = Math.min(Math.max(1, count.value), 100)
  
  for (let i = 0; i < num; i++) {
    let uuid = generateV4()
    
    if (uppercase.value) {
      uuid = uuid.toUpperCase()
    }
    
    if (withBraces.value) {
      uuid = `{${uuid}}`
    }
    
    uuids.value.push(uuid)
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

const copyAll = () => {
  copy(uuids.value.join('\n'))
}

// 初始生成
generate()
</script>

<template>
  <div class="tool-container">
    <div class="settings-panel">
      <div class="setting-group horizontal">
        <label>生成数量</label>
        <input 
          v-model.number="count" 
          type="number" 
          min="1" 
          max="100"
          class="number-input"
        />
      </div>

      <div class="setting-group">
        <label class="checkbox-label">
          <input v-model="uppercase" type="checkbox" />
          <span>大写</span>
        </label>
      </div>

      <div class="setting-group">
        <label class="checkbox-label">
          <input v-model="withBraces" type="checkbox" />
          <span>包含大括号</span>
        </label>
      </div>

      <button @click="generate" class="generate-btn">
        🎲 生成 UUID
      </button>

      <button 
        @click="copyAll" 
        class="copy-all-btn"
        :disabled="uuids.length === 0"
      >
        📋 复制全部
      </button>
    </div>

    <div class="results-container">
      <div class="results-header">
        <h3>生成的 UUID ({{ uuids.length }})</h3>
      </div>
      
      <div class="uuid-list">
        <div 
          v-for="(uuid, index) in uuids" 
          :key="index"
          class="uuid-item"
          @click="copy(uuid)"
        >
          <span class="uuid-text">{{ uuid }}</span>
          <span class="copy-icon">📋</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.settings-panel {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-group.horizontal {
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.setting-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.number-input {
  padding: 8px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  color: var(--text-color);
  width: 100px;
  outline: none;
}

.number-input:focus {
  border-color: var(--primary-color);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  user-select: none;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.generate-btn,
.copy-all-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.generate-btn {
  background: var(--primary-color);
  color: white;
}

.generate-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.copy-all-btn {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.copy-all-btn:hover:not(:disabled) {
  background: var(--border-color);
}

.copy-all-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.results-container {
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.results-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.results-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.uuid-list {
  max-height: 400px;
  overflow-y: auto;
}

.uuid-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s;
}

.uuid-item:last-child {
  border-bottom: none;
}

.uuid-item:hover {
  background: var(--card-bg);
}

.uuid-text {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  color: var(--text-color);
}

.copy-icon {
  opacity: 0.3;
  transition: opacity 0.2s;
}

.uuid-item:hover .copy-icon {
  opacity: 1;
}

@media (max-width: 768px) {
  .uuid-text {
    font-size: 12px;
    word-break: break-all;
  }
}
</style>
