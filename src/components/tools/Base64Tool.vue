<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const mode = ref('encode')

const encode = () => {
  try {
    output.value = btoa(unescape(encodeURIComponent(input.value)))
  } catch (e) {
    output.value = '编码失败: ' + e.message
  }
}

const decode = () => {
  try {
    output.value = decodeURIComponent(escape(atob(input.value)))
  } catch (e) {
    output.value = '解码失败: ' + e.message
  }
}

const process = () => {
  if (mode.value === 'encode') {
    encode()
  } else {
    decode()
  }
}

const swap = () => {
  const temp = input.value
  input.value = output.value
  output.value = temp
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}
</script>

<template>
  <div class="tool-container">
    <div class="tool-controls">
      <div class="mode-selector">
        <button 
          @click="mode = 'encode'; process()"
          :class="['mode-btn', { active: mode === 'encode' }]"
        >
          编码
        </button>
        <button 
          @click="mode = 'decode'; process()"
          :class="['mode-btn', { active: mode === 'decode' }]"
        >
          解码
        </button>
      </div>
      <button @click="swap" class="swap-btn">
        ⇅ 交换
      </button>
    </div>

    <div class="io-container">
      <div class="io-section">
        <div class="io-header">
          <label>输入</label>
          <button @click="input = ''" class="clear-btn">清空</button>
        </div>
        <textarea 
          v-model="input"
          @input="process"
          placeholder="输入文本..."
          class="io-textarea"
        ></textarea>
      </div>

      <div class="io-section">
        <div class="io-header">
          <label>输出</label>
          <button @click="copy(output)" class="copy-btn">📋 复制</button>
        </div>
        <textarea 
          v-model="output"
          readonly
          placeholder="输出结果..."
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
  gap: 16px;
  align-items: center;
}

.mode-selector {
  display: flex;
  gap: 8px;
  background: var(--bg-color);
  padding: 4px;
  border-radius: 10px;
}

.mode-btn {
  padding: 8px 20px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.mode-btn.active {
  background: var(--primary-color);
  color: white;
}

.swap-btn {
  padding: 8px 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.swap-btn:hover {
  background: var(--border-color);
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

.clear-btn,
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

.clear-btn:hover,
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
