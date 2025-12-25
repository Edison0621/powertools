<script setup>
import { ref, computed } from 'vue'

const inputText = ref('')
const maskType = ref('auto')
const customMaskChar = ref('*')
const keepStart = ref(3)
const keepEnd = ref(4)

const maskTypes = [
  { value: 'auto', label: '🔍 自动识别', desc: '自动检测并脱敏所有敏感信息' },
  { value: 'phone', label: '📱 手机号', desc: '13812345678 → 138****5678' },
  { value: 'idcard', label: '🆔 身份证', desc: '保留前6后4位' },
  { value: 'email', label: '📧 邮箱', desc: 'user@example.com → u***@example.com' },
  { value: 'bankcard', label: '💳 银行卡', desc: '保留前6后4位' },
  { value: 'name', label: '👤 姓名', desc: '张三 → 张*' },
  { value: 'custom', label: '⚙️ 自定义', desc: '自定义保留字符数' }
]

// 脱敏函数
const maskPhone = (phone) => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

const maskIdCard = (idcard) => {
  return idcard.replace(/(\d{6})\d+(\d{4})/, '$1**********$2')
}

const maskEmail = (email) => {
  const [name, domain] = email.split('@')
  if (name.length <= 2) {
    return name[0] + '***@' + domain
  }
  return name[0] + '***' + name[name.length - 1] + '@' + domain
}

const maskBankCard = (card) => {
  return card.replace(/(\d{6})\d+(\d{4})/, '$1 **** **** $2')
}

const maskName = (name) => {
  if (name.length === 2) {
    return name[0] + '*'
  }
  return name[0] + '*'.repeat(name.length - 1)
}

const maskCustom = (text) => {
  if (text.length <= keepStart.value + keepEnd.value) {
    return text
  }
  const start = text.substring(0, keepStart.value)
  const end = text.substring(text.length - keepEnd.value)
  const middle = customMaskChar.value.repeat(text.length - keepStart.value - keepEnd.value)
  return start + middle + end
}

// 自动识别并脱敏
const autoMask = (text) => {
  let result = text
  
  // 手机号 (11位数字)
  result = result.replace(/1[3-9]\d{9}/g, (match) => maskPhone(match))
  
  // 身份证 (15或18位)
  result = result.replace(/\d{17}[\dXx]|\d{15}/g, (match) => maskIdCard(match))
  
  // 邮箱
  result = result.replace(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/g, (match) => maskEmail(match))
  
  // 银行卡 (13-19位数字)
  result = result.replace(/\b\d{13,19}\b/g, (match) => {
    // 排除已经是手机号或身份证的
    if (match.length === 11 || match.length === 15 || match.length === 18) {
      return match
    }
    return maskBankCard(match)
  })
  
  return result
}

// 处理后的文本
const maskedText = computed(() => {
  if (!inputText.value) return ''
  
  if (maskType.value === 'auto') {
    return autoMask(inputText.value)
  } else if (maskType.value === 'phone') {
    return inputText.value.replace(/1[3-9]\d{9}/g, maskPhone)
  } else if (maskType.value === 'idcard') {
    return inputText.value.replace(/\d{17}[\dXx]|\d{15}/g, maskIdCard)
  } else if (maskType.value === 'email') {
    return inputText.value.replace(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/g, maskEmail)
  } else if (maskType.value === 'bankcard') {
    return inputText.value.replace(/\b\d{13,19}\b/g, maskBankCard)
  } else if (maskType.value === 'name') {
    return inputText.value.split(/\s+/).map(maskName).join(' ')
  } else if (maskType.value === 'custom') {
    return maskCustom(inputText.value)
  }
  
  return inputText.value
})

// 检测到的敏感信息统计
const detectedInfo = computed(() => {
  if (!inputText.value) return null
  
  const phones = (inputText.value.match(/1[3-9]\d{9}/g) || []).length
  const idcards = (inputText.value.match(/\d{17}[\dXx]|\d{15}/g) || []).length
  const emails = (inputText.value.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/g) || []).length
  const bankcards = (inputText.value.match(/\b\d{13,19}\b/g) || []).filter(m => 
    m.length !== 11 && m.length !== 15 && m.length !== 18
  ).length
  
  return {
    phones,
    idcards,
    emails,
    bankcards,
    total: phones + idcards + emails + bankcards
  }
})

const copy = async () => {
  try {
    await navigator.clipboard.writeText(maskedText.value)
    alert('已复制脱敏后的文本')
  } catch (e) {
    alert('复制失败')
  }
}

const clear = () => {
  inputText.value = ''
}

const loadExample = () => {
  inputText.value = `用户信息：
姓名：张三
手机：13812345678
邮箱：zhangsan@example.com
身份证：110101199001011234
银行卡：6222021234567890123`
}
</script>

<template>
  <div class="tool-container">
    <!-- 快速示例 -->
    <div class="example-bar">
      <button @click="loadExample" class="example-btn">📖 加载示例</button>
      <button @click="clear" class="example-btn">🗑️ 清空</button>
    </div>

    <!-- 脱敏模式选择 -->
    <div class="mode-section">
      <h3>🔍 脱敏模式</h3>
      <div class="mode-grid">
        <button 
          v-for="type in maskTypes" 
          :key="type.value"
          @click="maskType = type.value"
          :class="['mode-btn', { active: maskType === type.value }]"
        >
          <div class="mode-label">{{ type.label }}</div>
          <div class="mode-desc">{{ type.desc }}</div>
        </button>
      </div>
    </div>

    <!-- 自定义设置 -->
    <div v-if="maskType === 'custom'" class="custom-section">
      <h3>⚙️ 自定义设置</h3>
      <div class="custom-grid">
        <div class="custom-item">
          <label>保留开头</label>
          <input v-model.number="keepStart" type="number" min="0" class="custom-input" />
        </div>
        <div class="custom-item">
          <label>保留结尾</label>
          <input v-model.number="keepEnd" type="number" min="0" class="custom-input" />
        </div>
        <div class="custom-item">
          <label>遮罩字符</label>
          <input v-model="customMaskChar" type="text" maxlength="1" class="custom-input" />
        </div>
      </div>
    </div>

    <!-- 输入输出 -->
    <div class="io-section">
      <div class="io-panel">
        <h3>📝 原始文本</h3>
        <textarea 
          v-model="inputText"
          placeholder="输入包含敏感信息的文本..."
          class="io-textarea"
        ></textarea>
        <div v-if="detectedInfo && detectedInfo.total > 0" class="detect-info">
          检测到: 
          <span v-if="detectedInfo.phones">📱{{ detectedInfo.phones }}个手机号</span>
          <span v-if="detectedInfo.idcards">🆔{{ detectedInfo.idcards }}个身份证</span>
          <span v-if="detectedInfo.emails">📧{{ detectedInfo.emails }}个邮箱</span>
          <span v-if="detectedInfo.bankcards">💳{{ detectedInfo.bankcards }}个银行卡</span>
        </div>
      </div>

      <div class="io-panel">
        <div class="output-header">
          <h3>✨ 脱敏结果</h3>
          <button @click="copy" :disabled="!maskedText" class="copy-btn">📋 复制</button>
        </div>
        <textarea 
          :value="maskedText"
          readonly
          placeholder="脱敏后的文本将在这里显示..."
          class="io-textarea"
        ></textarea>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li><strong>自动识别</strong>：自动检测并脱敏手机号、身份证、邮箱、银行卡</li>
        <li><strong>手机号</strong>：保留前3位和后4位，中间4位用****替换</li>
        <li><strong>身份证</strong>：保留前6位和后4位</li>
        <li><strong>邮箱</strong>：用户名部分脱敏，保留@和域名</li>
        <li><strong>银行卡</strong>：保留前6位和后4位</li>
        <li><strong>姓名</strong>：保留姓氏，名字用*替换</li>
        <li><strong>自定义</strong>：自定义保留字符数和遮罩字符</li>
        <li>脱敏后的数据仅用于展示，请勿用于非法用途</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.example-bar {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.example-btn {
  padding: 8px 16px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.example-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.mode-section,
.custom-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

.mode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.mode-btn {
  padding: 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.mode-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.mode-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.mode-label {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.mode-desc {
  font-size: 11px;
  opacity: 0.8;
}

.custom-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.custom-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.custom-item label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
}

.custom-input {
  padding: 8px 10px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-color);
  outline: none;
}

.custom-input:focus {
  border-color: var(--primary-color);
}

.io-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.io-panel {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.copy-btn {
  padding: 6px 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover:not(:disabled) {
  background: var(--primary-hover);
}

.copy-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.io-textarea {
  width: 100%;
  min-height: 300px;
  padding: 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.io-textarea:focus {
  border-color: var(--primary-color);
}

.detect-info {
  margin-top: 8px;
  padding: 8px;
  background: #e3f2fd;
  border-radius: 6px;
  font-size: 12px;
  color: #1976d2;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.dark .detect-info {
  background: #1a2332;
  color: #64b5f6;
}

.info-box {
  padding: 10px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.info-box h4 {
  margin-bottom: 6px;
  color: var(--text-color);
  font-size: 12px;
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
  content: '• ';
  color: var(--primary-color);
  font-weight: bold;
  margin-right: 6px;
}

@media (max-width: 768px) {
  .mode-grid {
    grid-template-columns: 1fr;
  }
  
  .custom-grid {
    grid-template-columns: 1fr;
  }
  
  .io-section {
    grid-template-columns: 1fr;
  }
}
</style>
