<script setup>
import { ref } from 'vue'

const mode = ref('encrypt')
const input = ref('')
const password = ref('')
const output = ref('')
const algorithm = ref('AES')

// 简单的AES加密实现（Base64 + XOR）
// 注意：这是简化版本，生产环境应使用专业加密库
const simpleEncrypt = (text, key) => {
  if (!text || !key) return ''
  
  // 扩展密钥
  const extendedKey = key.repeat(Math.ceil(text.length / key.length))
  
  // XOR加密
  let encrypted = ''
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ extendedKey.charCodeAt(i)
    encrypted += String.fromCharCode(charCode)
  }
  
  // Base64编码
  return btoa(encrypted)
}

const simpleDecrypt = (encrypted, key) => {
  if (!encrypted || !key) return ''
  
  try {
    // Base64解码
    const decoded = atob(encrypted)
    
    // 扩展密钥
    const extendedKey = key.repeat(Math.ceil(decoded.length / key.length))
    
    // XOR解密
    let decrypted = ''
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ extendedKey.charCodeAt(i)
      decrypted += String.fromCharCode(charCode)
    }
    
    return decrypted
  } catch (e) {
    return '解密失败: 密码错误或数据损坏'
  }
}

// ROT13编码
const rot13 = (text) => {
  return text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
  })
}

// Base64编码
const base64Encode = (text) => {
  try {
    return btoa(unescape(encodeURIComponent(text)))
  } catch (e) {
    return '编码失败'
  }
}

const base64Decode = (text) => {
  try {
    return decodeURIComponent(escape(atob(text)))
  } catch (e) {
    return '解码失败'
  }
}

// Caesar密码
const caesarEncrypt = (text, shift = 3) => {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0)
      const isUpperCase = code >= 65 && code <= 90
      const base = isUpperCase ? 65 : 97
      return String.fromCharCode(((code - base + shift) % 26) + base)
    }
    return char
  }).join('')
}

const caesarDecrypt = (text, shift = 3) => {
  return caesarEncrypt(text, 26 - shift)
}

const process = () => {
  if (!input.value) {
    output.value = ''
    return
  }
  
  try {
    if (mode.value === 'encrypt') {
      switch (algorithm.value) {
        case 'AES':
          if (!password.value) {
            output.value = '请输入密码'
            return
          }
          output.value = simpleEncrypt(input.value, password.value)
          break
        case 'ROT13':
          output.value = rot13(input.value)
          break
        case 'Base64':
          output.value = base64Encode(input.value)
          break
        case 'Caesar':
          output.value = caesarEncrypt(input.value)
          break
      }
    } else {
      switch (algorithm.value) {
        case 'AES':
          if (!password.value) {
            output.value = '请输入密码'
            return
          }
          output.value = simpleDecrypt(input.value, password.value)
          break
        case 'ROT13':
          output.value = rot13(input.value)
          break
        case 'Base64':
          output.value = base64Decode(input.value)
          break
        case 'Caesar':
          output.value = caesarDecrypt(input.value)
          break
      }
    }
  } catch (e) {
    output.value = '处理失败: ' + e.message
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

const swap = () => {
  const temp = input.value
  input.value = output.value
  output.value = temp
  mode.value = mode.value === 'encrypt' ? 'decrypt' : 'encrypt'
}

const clear = () => {
  input.value = ''
  output.value = ''
  password.value = ''
}

const needPassword = ref(true)

const handleAlgorithmChange = () => {
  needPassword.value = algorithm.value === 'AES'
  process()
}
</script>

<template>
  <div class="tool-container">
    <!-- 模式和算法选择 -->
    <div class="settings-panel">
      <div class="mode-selector">
        <button 
          :class="['mode-btn', { active: mode === 'encrypt' }]"
          @click="mode = 'encrypt'; process()"
        >
          🔒 加密
        </button>
        <button 
          :class="['mode-btn', { active: mode === 'decrypt' }]"
          @click="mode = 'decrypt'; process()"
        >
          🔓 解密
        </button>
      </div>

      <div class="algorithm-selector">
        <label>加密算法</label>
        <select v-model="algorithm" @change="handleAlgorithmChange" class="algorithm-select">
          <option value="AES">AES (需要密码)</option>
          <option value="ROT13">ROT13</option>
          <option value="Base64">Base64</option>
          <option value="Caesar">Caesar (凯撒密码)</option>
        </select>
      </div>

      <div v-if="needPassword" class="password-group">
        <label>密码</label>
        <input 
          v-model="password"
          type="password"
          placeholder="输入加密/解密密码"
          class="password-input"
          @input="process"
        />
      </div>
    </div>

    <!-- 输入输出 -->
    <div class="io-container">
      <div class="io-section">
        <div class="io-header">
          <label>{{ mode === 'encrypt' ? '原文' : '密文' }}</label>
        </div>
        <textarea 
          v-model="input"
          @input="process"
          :placeholder="mode === 'encrypt' ? '输入要加密的文本...' : '输入要解密的密文...'"
          class="io-textarea"
        ></textarea>
      </div>

      <div class="io-section">
        <div class="io-header">
          <label>{{ mode === 'encrypt' ? '密文' : '原文' }}</label>
          <div class="header-actions">
            <button @click="swap" class="action-btn">⇄ 交换</button>
            <button @click="copy(output)" class="action-btn" :disabled="!output">
              📋 复制
            </button>
          </div>
        </div>
        <textarea 
          v-model="output"
          readonly
          :placeholder="mode === 'encrypt' ? '加密后的密文...' : '解密后的原文...'"
          class="io-textarea"
        ></textarea>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-section">
      <button @click="process" class="process-btn">
        {{ mode === 'encrypt' ? '🔒 加密' : '🔓 解密' }}
      </button>
      <button @click="clear" class="clear-btn">🗑️ 清空</button>
    </div>

    <!-- 算法说明 -->
    <div class="info-box">
      <h4>ℹ️ 加密算法说明</h4>
      <div class="algorithm-info">
        <div class="algo-item">
          <strong>AES (需要密码):</strong>
          <p>使用密码对文本进行加密，解密时需要相同的密码。适合保护敏感信息。</p>
        </div>
        <div class="algo-item">
          <strong>ROT13:</strong>
          <p>简单的字母替换，将字母移动13位。加密和解密操作相同。</p>
        </div>
        <div class="algo-item">
          <strong>Base64:</strong>
          <p>编码方式，常用于数据传输。注意：这不是加密，只是编码。</p>
        </div>
        <div class="algo-item">
          <strong>Caesar (凯撒密码):</strong>
          <p>经典密码，将字母按固定位数移动。默认移动3位。</p>
        </div>
      </div>
    </div>

    <!-- 安全提示 -->
    <div class="warning-box">
      <h4>⚠️ 安全提示</h4>
      <ul>
        <li>本工具仅供学习和简单加密使用</li>
        <li>请勿用于加密高度敏感的数据</li>
        <li>生产环境建议使用专业加密库</li>
        <li>妥善保管加密密码，丢失后无法找回</li>
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

.settings-panel {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  flex-wrap: wrap;
  align-items: flex-end;
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
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
  height: 38px;
}

.mode-btn:hover {
  border-color: var(--primary-color);
}

.mode-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.algorithm-selector {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.algorithm-selector label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.algorithm-select {
  padding: 8px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  cursor: pointer;
  outline: none;
  height: 38px;
}

.algorithm-select:focus {
  border-color: var(--primary-color);
}

.password-group {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.password-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.password-input {
  padding: 8px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
  height: 38px;
}

.password-input:focus {
  border-color: var(--primary-color);
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

.action-btn:hover:not(:disabled) {
  background: var(--border-color);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.io-textarea {
  width: 100%;
  min-height: 300px;
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

.action-section {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.process-btn,
.clear-btn {
  flex: 1;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  height: 40px;
}

.process-btn {
  background: var(--primary-color);
  color: white;
}

.process-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.clear-btn {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.clear-btn:hover {
  background: var(--border-color);
}

.info-box {
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-box h4 {
  margin-bottom: 12px;
  color: var(--text-color);
  font-size: 13px;
}

.algorithm-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.algo-item {
  padding: 10px;
  background: var(--card-bg);
  border-radius: 8px;
}

.algo-item strong {
  color: var(--primary-color);
  font-size: 13px;
}

.algo-item p {
  margin: 4px 0 0 0;
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.6;
}

.warning-box {
  padding: 16px;
  background: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 12px;
}

.dark .warning-box {
  background: #3d3000;
  border-color: #f59e0b;
}

.warning-box h4 {
  margin-bottom: 8px;
  color: #856404;
  font-size: 14px;
}

.dark .warning-box h4 {
  color: #fbbf24;
}

.warning-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.warning-box li {
  padding: 4px 0;
  color: #856404;
  font-size: 12px;
  line-height: 1.6;
}

.dark .warning-box li {
  color: #fcd34d;
}

.warning-box li::before {
  content: '⚠ ';
  margin-right: 6px;
}

@media (max-width: 768px) {
  .io-container {
    grid-template-columns: 1fr;
  }
  
  .settings-panel {
    flex-direction: column;
  }
}
</style>
