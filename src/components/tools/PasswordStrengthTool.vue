<script setup>
import { ref, computed } from 'vue'

const password = ref('')

// 密码强度评分
const passwordAnalysis = computed(() => {
  if (!password.value) return null
  
  const pwd = password.value
  let score = 0
  const feedback = []
  const details = {
    length: pwd.length,
    hasLower: /[a-z]/.test(pwd),
    hasUpper: /[A-Z]/.test(pwd),
    hasNumber: /\d/.test(pwd),
    hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
    hasSpace: /\s/.test(pwd)
  }
  
  // 长度评分
  if (pwd.length >= 12) {
    score += 30
    feedback.push('✅ 长度充足 (≥12位)')
  } else if (pwd.length >= 8) {
    score += 20
    feedback.push('⚠️ 长度一般 (8-11位)')
  } else {
    score += 10
    feedback.push('❌ 长度太短 (<8位)')
  }
  
  // 字符类型评分
  if (details.hasLower) {
    score += 10
    feedback.push('✅ 包含小写字母')
  } else {
    feedback.push('❌ 缺少小写字母')
  }
  
  if (details.hasUpper) {
    score += 10
    feedback.push('✅ 包含大写字母')
  } else {
    feedback.push('❌ 缺少大写字母')
  }
  
  if (details.hasNumber) {
    score += 10
    feedback.push('✅ 包含数字')
  } else {
    feedback.push('❌ 缺少数字')
  }
  
  if (details.hasSpecial) {
    score += 20
    feedback.push('✅ 包含特殊字符')
  } else {
    feedback.push('❌ 缺少特殊字符')
  }
  
  // 多样性加分
  const typeCount = [details.hasLower, details.hasUpper, details.hasNumber, details.hasSpecial].filter(Boolean).length
  if (typeCount >= 4) {
    score += 20
    feedback.push('✅ 字符类型丰富')
  } else if (typeCount >= 3) {
    score += 10
  }
  
  // 空格扣分
  if (details.hasSpace) {
    score -= 10
    feedback.push('❌ 包含空格（不推荐）')
  }
  
  // 常见模式检测
  const commonPatterns = [
    { pattern: /^123/, message: '以123开头（不安全）' },
    { pattern: /123$/, message: '以123结尾（不安全）' },
    { pattern: /password/i, message: '包含password（不安全）' },
    { pattern: /admin/i, message: '包含admin（不安全）' },
    { pattern: /(.)\1{2,}/, message: '包含连续重复字符（不安全）' },
    { pattern: /^[a-z]+$/, message: '仅小写字母（不安全）' },
    { pattern: /^\d+$/, message: '仅数字（不安全）' }
  ]
  
  const weakPatterns = []
  commonPatterns.forEach(({ pattern, message }) => {
    if (pattern.test(pwd)) {
      score -= 15
      weakPatterns.push(message)
    }
  })
  
  score = Math.max(0, Math.min(100, score))
  
  // 强度等级
  let level = ''
  let levelColor = ''
  let levelDesc = ''
  
  if (score >= 80) {
    level = '强'
    levelColor = 'strong'
    levelDesc = '密码强度很高，非常安全'
  } else if (score >= 60) {
    level = '中等'
    levelColor = 'medium'
    levelDesc = '密码强度一般，建议进一步增强'
  } else if (score >= 40) {
    level = '弱'
    levelColor = 'weak'
    levelDesc = '密码强度较弱，容易被破解'
  } else {
    level = '非常弱'
    levelColor = 'very-weak'
    levelDesc = '密码强度极弱，强烈建议更换'
  }
  
  // 破解时间估算
  const crackTime = estimateCrackTime(pwd)
  
  return {
    score,
    level,
    levelColor,
    levelDesc,
    feedback,
    weakPatterns,
    details,
    crackTime
  }
})

// 估算破解时间
const estimateCrackTime = (pwd) => {
  const charsetSize = getCharsetSize(pwd)
  const combinations = Math.pow(charsetSize, pwd.length)
  
  // 假设每秒尝试100亿次（现代GPU）
  const attemptsPerSecond = 10000000000
  const seconds = combinations / attemptsPerSecond
  
  if (seconds < 1) return '瞬间'
  if (seconds < 60) return `${seconds.toFixed(0)}秒`
  if (seconds < 3600) return `${(seconds / 60).toFixed(0)}分钟`
  if (seconds < 86400) return `${(seconds / 3600).toFixed(0)}小时`
  if (seconds < 31536000) return `${(seconds / 86400).toFixed(0)}天`
  if (seconds < 31536000 * 100) return `${(seconds / 31536000).toFixed(0)}年`
  if (seconds < 31536000 * 1000000) return `${(seconds / 31536000 / 1000).toFixed(0)}千年`
  return '数百万年以上'
}

const getCharsetSize = (pwd) => {
  let size = 0
  if (/[a-z]/.test(pwd)) size += 26
  if (/[A-Z]/.test(pwd)) size += 26
  if (/\d/.test(pwd)) size += 10
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) size += 32
  return size || 1
}

// 生成强密码
const generatePassword = () => {
  const length = 16
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  const all = lowercase + uppercase + numbers + special
  let pwd = ''
  
  // 确保每种类型至少有一个
  pwd += lowercase[Math.floor(Math.random() * lowercase.length)]
  pwd += uppercase[Math.floor(Math.random() * uppercase.length)]
  pwd += numbers[Math.floor(Math.random() * numbers.length)]
  pwd += special[Math.floor(Math.random() * special.length)]
  
  // 填充剩余长度
  for (let i = pwd.length; i < length; i++) {
    pwd += all[Math.floor(Math.random() * all.length)]
  }
  
  // 打乱顺序
  password.value = pwd.split('').sort(() => Math.random() - 0.5).join('')
}

const copy = async () => {
  try {
    await navigator.clipboard.writeText(password.value)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const clear = () => {
  password.value = ''
}
</script>

<template>
  <div class="tool-container">
    <!-- 密码输入 -->
    <div class="input-section">
      <h3>🔑 输入密码</h3>
      <div class="input-row">
        <input 
          v-model="password" 
          type="text" 
          placeholder="输入要检测的密码..."
          class="password-input"
        />
        <button @click="generatePassword" class="generate-btn">🎲 生成强密码</button>
        <button @click="copy" :disabled="!password" class="copy-btn">📋 复制</button>
        <button @click="clear" class="clear-btn">🗑️ 清空</button>
      </div>
    </div>

    <!-- 分析结果 -->
    <div v-if="passwordAnalysis" class="result-section">
      <!-- 强度评分 -->
      <div class="strength-panel">
        <div class="strength-header">
          <h3>💪 密码强度</h3>
          <div :class="['strength-badge', passwordAnalysis.levelColor]">
            {{ passwordAnalysis.level }}
          </div>
        </div>
        
        <div class="score-bar">
          <div 
            class="score-fill" 
            :class="passwordAnalysis.levelColor"
            :style="{ width: passwordAnalysis.score + '%' }"
          ></div>
        </div>
        
        <div class="score-text">
          得分: {{ passwordAnalysis.score }} / 100
        </div>
        
        <div class="level-desc">
          {{ passwordAnalysis.levelDesc }}
        </div>
      </div>

      <!-- 详细信息 -->
      <div class="details-grid">
        <div class="detail-card">
          <div class="detail-icon">📏</div>
          <div class="detail-label">密码长度</div>
          <div class="detail-value">{{ passwordAnalysis.details.length }} 位</div>
        </div>
        
        <div class="detail-card">
          <div class="detail-icon">⏱️</div>
          <div class="detail-label">破解时间</div>
          <div class="detail-value">{{ passwordAnalysis.crackTime }}</div>
        </div>
        
        <div class="detail-card">
          <div class="detail-icon">🔤</div>
          <div class="detail-label">字符类型</div>
          <div class="detail-value">
            {{ [passwordAnalysis.details.hasLower, passwordAnalysis.details.hasUpper, 
                passwordAnalysis.details.hasNumber, passwordAnalysis.details.hasSpecial]
                .filter(Boolean).length }} 种
          </div>
        </div>
      </div>

      <!-- 反馈建议 -->
      <div class="feedback-section">
        <h4>📋 详细反馈</h4>
        <div class="feedback-list">
          <div v-for="(item, index) in passwordAnalysis.feedback" :key="index" class="feedback-item">
            {{ item }}
          </div>
        </div>
      </div>

      <!-- 弱点警告 -->
      <div v-if="passwordAnalysis.weakPatterns.length > 0" class="warning-section">
        <h4>⚠️ 安全警告</h4>
        <div class="warning-list">
          <div v-for="(item, index) in passwordAnalysis.weakPatterns" :key="index" class="warning-item">
            ❌ {{ item }}
          </div>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 密码安全建议</h4>
      <ul>
        <li>密码长度至少12位，越长越安全</li>
        <li>使用大小写字母、数字和特殊字符的组合</li>
        <li>避免使用常见单词、生日、电话号码</li>
        <li>不要使用连续或重复的字符</li>
        <li>为不同网站使用不同的密码</li>
        <li>定期更换密码，建议3-6个月一次</li>
        <li>使用密码管理器管理多个密码</li>
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

.input-section,
.result-section {
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

.input-row {
  display: flex;
  gap: 8px;
}

.password-input {
  flex: 1;
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
  outline: none;
}

.password-input:focus {
  border-color: var(--primary-color);
}

.generate-btn,
.copy-btn,
.clear-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.generate-btn {
  background: var(--primary-color);
  color: white;
}

.generate-btn:hover {
  background: var(--primary-hover);
}

.copy-btn {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.copy-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.clear-btn {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.copy-btn:hover:not(:disabled),
.clear-btn:hover {
  background: var(--border-color);
}

.strength-panel {
  padding: 20px;
  background: var(--card-bg);
  border-radius: 10px;
  margin-bottom: 16px;
}

.strength-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.strength-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
}

.strength-badge.very-weak {
  background: #fee;
  color: #c33;
}

.strength-badge.weak {
  background: #ffe;
  color: #c93;
}

.strength-badge.medium {
  background: #fef;
  color: #93c;
}

.strength-badge.strong {
  background: #efe;
  color: #3c3;
}

.dark .strength-badge.very-weak {
  background: #400;
  color: #f88;
}

.dark .strength-badge.weak {
  background: #440;
  color: #fb8;
}

.dark .strength-badge.medium {
  background: #404;
  color: #d8d;
}

.dark .strength-badge.strong {
  background: #040;
  color: #8f8;
}

.score-bar {
  height: 12px;
  background: var(--border-color);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 12px;
}

.score-fill {
  height: 100%;
  transition: width 0.3s;
}

.score-fill.very-weak { background: #f44; }
.score-fill.weak { background: #fa4; }
.score-fill.medium { background: #a4f; }
.score-fill.strong { background: #4f4; }

.score-text {
  font-size: 18px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
  margin-bottom: 8px;
}

.level-desc {
  font-size: 13px;
  color: var(--text-secondary);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.detail-card {
  padding: 16px;
  background: var(--card-bg);
  border-radius: 8px;
  text-align: center;
}

.detail-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.detail-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.detail-value {
  font-size: 16px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
}

.feedback-section,
.warning-section {
  padding: 12px;
  background: var(--card-bg);
  border-radius: 8px;
  margin-bottom: 12px;
}

.feedback-section:last-child,
.warning-section:last-child {
  margin-bottom: 0;
}

h4 {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.feedback-list,
.warning-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.feedback-item,
.warning-item {
  padding: 8px 12px;
  background: var(--bg-color);
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.5;
}

.warning-section {
  background: #fee;
  border: 2px solid #f88;
}

.dark .warning-section {
  background: #400;
  border-color: #a00;
}

.warning-item {
  color: #c33;
}

.dark .warning-item {
  color: #f88;
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
  .input-row {
    flex-wrap: wrap;
  }
  
  .password-input {
    flex-basis: 100%;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style>
