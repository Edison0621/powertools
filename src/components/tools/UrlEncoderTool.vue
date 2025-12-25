<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const mode = ref('encode')

const encode = () => {
  try {
    output.value = encodeURIComponent(input.value)
  } catch (e) {
    output.value = '编码失败: ' + e.message
  }
}

const decode = () => {
  try {
    output.value = decodeURIComponent(input.value)
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

const example = () => {
  input.value = 'https://example.com/search?q=Hello World&lang=中文'
  encode()
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
      <button @click="example" class="example-btn">
        📄 示例
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
          placeholder="输入URL或文本..."
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
          placeholder="结果将显示在这里..."
          class="io-textarea"
        ></textarea>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 说明</h4>
      <p>URL编码用于将特殊字符转换为 %XX 格式，以便在URL中安全传输。</p>
      <ul>
        <li>空格 → %20</li>
        <li>中文 → %E4%B8%AD%E6%96%87</li>
        <li>特殊字符如 &, ?, =, # 等会被编码</li>
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

.tool-controls {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
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

.swap-btn,
.example-btn {
  padding: 8px 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.swap-btn:hover,
.example-btn:hover {
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
  min-height: 250px;
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

.info-box p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
}

.info-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-box li {
  padding: 6px 0;
  color: var(--text-secondary);
  font-size: 14px;
  font-family: 'Consolas', 'Monaco', monospace;
}

@media (max-width: 768px) {
  .io-container {
    grid-template-columns: 1fr;
  }
}
</style>
