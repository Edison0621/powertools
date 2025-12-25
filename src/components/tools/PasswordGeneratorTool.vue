<script setup>
import { ref, computed } from 'vue'

const passwords = ref([])
const length = ref(16)
const count = ref(5)
const includeUppercase = ref(true)
const includeLowercase = ref(true)
const includeNumbers = ref(true)
const includeSymbols = ref(true)

const charset = computed(() => {
  let chars = ''
  if (includeLowercase.value) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (includeUppercase.value) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (includeNumbers.value) chars += '0123456789'
  if (includeSymbols.value) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  return chars
})

const generatePassword = () => {
  if (!charset.value) return ''
  
  let password = ''
  const array = new Uint32Array(length.value)
  crypto.getRandomValues(array)
  
  for (let i = 0; i < length.value; i++) {
    password += charset.value[array[i] % charset.value.length]
  }
  
  return password
}

const generate = () => {
  passwords.value = []
  const num = Math.min(Math.max(1, count.value), 50)
  
  for (let i = 0; i < num; i++) {
    passwords.value.push(generatePassword())
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
  copy(passwords.value.join('\n'))
}

const strength = computed(() => {
  const len = length.value
  const types = [includeUppercase.value, includeLowercase.value, includeNumbers.value, includeSymbols.value].filter(Boolean).length
  
  if (len < 8 || types < 2) return { text: '弱', color: '#ef4444' }
  if (len < 12 || types < 3) return { text: '中等', color: '#f59e0b' }
  if (len < 16 || types < 4) return { text: '强', color: '#10b981' }
  return { text: '非常强', color: '#059669' }
})

// 初始生成
generate()
</script>

<template>
  <div class="tool-container">
    <div class="settings-panel">
      <div class="setting-row">
        <div class="setting-group">
          <label>密码长度: {{ length }}</label>
          <input 
            v-model.number="length" 
            type="range" 
            min="4" 
            max="64"
            class="range-input"
          />
        </div>

        <div class="setting-group">
          <label>生成数量</label>
          <input 
            v-model.number="count" 
            type="number" 
            min="1" 
            max="50"
            class="number-input"
          />
        </div>
      </div>

      <div class="checkbox-group">
        <label class="checkbox-label">
          <input v-model="includeUppercase" type="checkbox" />
          <span>大写字母 (A-Z)</span>
        </label>
        <label class="checkbox-label">
          <input v-model="includeLowercase" type="checkbox" />
          <span>小写字母 (a-z)</span>
        </label>
        <label class="checkbox-label">
          <input v-model="includeNumbers" type="checkbox" />
          <span>数字 (0-9)</span>
        </label>
        <label class="checkbox-label">
          <input v-model="includeSymbols" type="checkbox" />
          <span>符号 (!@#$...)</span>
        </label>
      </div>

      <div class="strength-indicator">
        <span>密码强度:</span>
        <span :style="{ color: strength.color, fontWeight: 'bold' }">
          {{ strength.text }}
        </span>
      </div>

      <div class="action-buttons">
        <button @click="generate" class="generate-btn">
          🎲 生成密码
        </button>
        <button 
          @click="copyAll" 
          class="copy-all-btn"
          :disabled="passwords.length === 0"
        >
          📋 复制全部
        </button>
      </div>
    </div>

    <div class="results-container">
      <div class="results-header">
        <h3>生成的密码 ({{ passwords.length }})</h3>
      </div>
      
      <div class="password-list">
        <div 
          v-for="(password, index) in passwords" 
          :key="index"
          class="password-item"
          @click="copy(password)"
        >
          <span class="password-text">{{ password }}</span>
          <span class="copy-icon">📋</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 安全建议</h4>
      <ul>
        <li>建议密码长度至少 12 位</li>
        <li>包含大小写字母、数字和符号</li>
        <li>不要在多个账户使用相同密码</li>
        <li>使用密码管理器保存密码</li>
      </ul>
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
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.setting-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.range-input {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--border-color);
  outline: none;
  cursor: pointer;
}

.range-input::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
}

.number-input {
  padding: 10px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.number-input:focus {
  border-color: var(--primary-color);
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
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

.strength-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: var(--card-bg);
  border-radius: 8px;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.generate-btn,
.copy-all-btn {
  flex: 1;
  padding: 12px 24px;
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
  background: var(--card-bg);
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

.password-list {
  max-height: 400px;
  overflow-y: auto;
}

.password-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s;
}

.password-item:last-child {
  border-bottom: none;
}

.password-item:hover {
  background: var(--card-bg);
}

.password-text {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  color: var(--text-color);
  letter-spacing: 1px;
}

.copy-icon {
  opacity: 0.3;
  transition: opacity 0.2s;
}

.password-item:hover .copy-icon {
  opacity: 1;
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

.info-box li::before {
  content: '✓ ';
  color: var(--primary-color);
  font-weight: bold;
  margin-right: 8px;
}

@media (max-width: 768px) {
  .setting-row {
    grid-template-columns: 1fr;
  }
  
  .checkbox-group {
    grid-template-columns: 1fr;
  }
  
  .password-text {
    font-size: 12px;
    word-break: break-all;
  }
}
</style>
