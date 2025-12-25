<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const mode = ref('encode')

const htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
}

const encode = () => {
  output.value = input.value.replace(/[&<>"'\/]/g, char => htmlEntities[char])
}

const decode = () => {
  output.value = input.value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, '/')
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
  input.value = '<div class="example">Hello & "World"</div>'
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
      <button @click="swap" class="swap-btn">⇅ 交换</button>
      <button @click="example" class="example-btn">📄 示例</button>
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
          placeholder="输入HTML文本..."
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
          placeholder="转义结果..."
          class="io-textarea"
        ></textarea>
      </div>
    </div>

    <div class="entity-reference">
      <h4>常用HTML实体</h4>
      <div class="entity-grid">
        <div class="entity-item">
          <span class="entity-char">&lt;</span>
          <span class="entity-code">&amp;lt;</span>
        </div>
        <div class="entity-item">
          <span class="entity-char">&gt;</span>
          <span class="entity-code">&amp;gt;</span>
        </div>
        <div class="entity-item">
          <span class="entity-char">&amp;</span>
          <span class="entity-code">&amp;amp;</span>
        </div>
        <div class="entity-item">
          <span class="entity-char">&quot;</span>
          <span class="entity-code">&amp;quot;</span>
        </div>
        <div class="entity-item">
          <span class="entity-char">'</span>
          <span class="entity-code">&amp;#39;</span>
        </div>
        <div class="entity-item">
          <span class="entity-char">/</span>
          <span class="entity-code">&amp;#x2F;</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 说明</h4>
      <p>HTML实体转义用于在HTML中安全地显示特殊字符，防止XSS攻击。</p>
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

.entity-reference {
  padding: 20px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.entity-reference h4 {
  margin-bottom: 16px;
  color: var(--text-color);
  font-size: 15px;
}

.entity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.entity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.entity-char {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-color);
  min-width: 30px;
  text-align: center;
}

.entity-code {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
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
}

@media (max-width: 768px) {
  .io-container {
    grid-template-columns: 1fr;
  }
  
  .entity-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
