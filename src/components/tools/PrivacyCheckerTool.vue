<script setup>
import { ref, computed } from 'vue'

const inputText = ref('')

// 检测各类隐私信息
const detectedPrivacy = computed(() => {
  if (!inputText.value) return null
  
  const text = inputText.value
  const results = []
  
  // 手机号
  const phoneRegex = /1[3-9]\d{9}/g
  let match
  while ((match = phoneRegex.exec(text)) !== null) {
    results.push({
      type: 'phone',
      typeName: '手机号',
      icon: '📱',
      value: match[0],
      position: match.index,
      risk: 'high'
    })
  }
  
  // 身份证
  const idcardRegex = /\d{17}[\dXx]|\d{15}/g
  while ((match = idcardRegex.exec(text)) !== null) {
    results.push({
      type: 'idcard',
      typeName: '身份证',
      icon: '🆔',
      value: match[0],
      position: match.index,
      risk: 'critical'
    })
  }
  
  // 邮箱
  const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/g
  while ((match = emailRegex.exec(text)) !== null) {
    results.push({
      type: 'email',
      typeName: '邮箱地址',
      icon: '📧',
      value: match[0],
      position: match.index,
      risk: 'medium'
    })
  }
  
  // 银行卡
  const bankcardRegex = /\b\d{16,19}\b/g
  while ((match = bankcardRegex.exec(text)) !== null) {
    // 排除手机号和身份证
    if (match[0].length !== 11 && match[0].length !== 15 && match[0].length !== 18) {
      results.push({
        type: 'bankcard',
        typeName: '银行卡号',
        icon: '💳',
        value: match[0],
        position: match.index,
        risk: 'critical'
      })
    }
  }
  
  // IP地址
  const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g
  while ((match = ipRegex.exec(text)) !== null) {
    results.push({
      type: 'ip',
      typeName: 'IP地址',
      icon: '🌐',
      value: match[0],
      position: match.index,
      risk: 'low'
    })
  }
  
  // 网址
  const urlRegex = /https?:\/\/[^\s]+/g
  while ((match = urlRegex.exec(text)) !== null) {
    results.push({
      type: 'url',
      typeName: '网址',
      icon: '🔗',
      value: match[0],
      position: match.index,
      risk: 'low'
    })
  }
  
  return results.sort((a, b) => a.position - b.position)
})

// 统计
const statistics = computed(() => {
  if (!detectedPrivacy.value) return null
  
  const stats = {
    total: detectedPrivacy.value.length,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    byType: {}
  }
  
  detectedPrivacy.value.forEach(item => {
    stats[item.risk]++
    stats.byType[item.type] = (stats.byType[item.type] || 0) + 1
  })
  
  return stats
})

const getRiskColor = (risk) => {
  const colors = {
    critical: 'risk-critical',
    high: 'risk-high',
    medium: 'risk-medium',
    low: 'risk-low'
  }
  return colors[risk] || 'risk-low'
}

const getRiskLabel = (risk) => {
  const labels = {
    critical: '极高',
    high: '高',
    medium: '中',
    low: '低'
  }
  return labels[risk] || '未知'
}

const exportReport = () => {
  if (!detectedPrivacy.value || !detectedPrivacy.value.length) {
    alert('没有检测到隐私信息')
    return
  }
  
  let report = '隐私信息检测报告\n'
  report += '=' .repeat(50) + '\n\n'
  report += `检测时间: ${new Date().toLocaleString('zh-CN')}\n`
  report += `文本长度: ${inputText.value.length} 字符\n`
  report += `检测到: ${detectedPrivacy.value.length} 条隐私信息\n\n`
  
  report += '详细列表:\n'
  report += '-'.repeat(50) + '\n'
  
  detectedPrivacy.value.forEach((item, index) => {
    report += `${index + 1}. ${item.typeName} [风险: ${getRiskLabel(item.risk)}]\n`
    report += `   值: ${item.value}\n`
    report += `   位置: 第 ${item.position} 个字符\n\n`
  })
  
  const blob = new Blob([report], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `privacy-report-${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

const clear = () => {
  inputText.value = ''
}

const loadExample = () => {
  inputText.value = `张三的联系方式如下：
手机: 13812345678
邮箱: zhangsan@example.com
身份证号: 110101199001011234
银行卡: 6222021234567890123
公司网站: https://www.example.com
办公室IP: 192.168.1.100`
}
</script>

<template>
  <div class="tool-container">
    <!-- 快速示例 -->
    <div class="example-bar">
      <button @click="loadExample" class="example-btn">📖 加载示例</button>
      <button @click="clear" class="example-btn">🗑️ 清空</button>
    </div>

    <!-- 输入区域 -->
    <div class="input-section">
      <h3>🔎 输入待检测文本</h3>
      <textarea 
        v-model="inputText"
        placeholder="粘贴需要检测隐私信息的文本..."
        class="text-input"
      ></textarea>
    </div>

    <!-- 统计概览 -->
    <div v-if="statistics" class="stats-section">
      <h3>📊 检测结果概览</h3>
      <div class="stats-grid">
        <div class="stat-card total">
          <div class="stat-icon">🔍</div>
          <div class="stat-value">{{ statistics.total }}</div>
          <div class="stat-label">检测到</div>
        </div>
        <div class="stat-card critical">
          <div class="stat-icon">🚨</div>
          <div class="stat-value">{{ statistics.critical }}</div>
          <div class="stat-label">极高风险</div>
        </div>
        <div class="stat-card high">
          <div class="stat-icon">⚠️</div>
          <div class="stat-value">{{ statistics.high }}</div>
          <div class="stat-label">高风险</div>
        </div>
        <div class="stat-card medium">
          <div class="stat-icon">⚡</div>
          <div class="stat-value">{{ statistics.medium }}</div>
          <div class="stat-label">中风险</div>
        </div>
        <div class="stat-card low">
          <div class="stat-icon">ℹ️</div>
          <div class="stat-value">{{ statistics.low }}</div>
          <div class="stat-label">低风险</div>
        </div>
      </div>
    </div>

    <!-- 详细列表 -->
    <div v-if="detectedPrivacy && detectedPrivacy.length > 0" class="details-section">
      <div class="details-header">
        <h3>📋 隐私信息列表</h3>
        <button @click="exportReport" class="export-btn">📄 导出报告</button>
      </div>
      
      <div class="details-list">
        <div v-for="(item, index) in detectedPrivacy" :key="index" class="detail-item">
          <div class="item-header">
            <div class="item-type">
              <span class="item-icon">{{ item.icon }}</span>
              <span class="item-typename">{{ item.typeName }}</span>
            </div>
            <div :class="['risk-badge', getRiskColor(item.risk)]">
              {{ getRiskLabel(item.risk) }}风险
            </div>
          </div>
          <div class="item-value">{{ item.value }}</div>
          <div class="item-position">位置: 第 {{ item.position }} 个字符</div>
        </div>
      </div>
    </div>

    <!-- 无结果提示 -->
    <div v-if="inputText && (!detectedPrivacy || detectedPrivacy.length === 0)" class="no-result">
      ✅ 未检测到隐私信息
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 检测项目</h4>
      <ul>
        <li>📱 <strong>手机号</strong>：11位数字，1开头（风险：高）</li>
        <li>🆔 <strong>身份证</strong>：15或18位数字（风险：极高）</li>
        <li>📧 <strong>邮箱地址</strong>：标准邮箱格式（风险：中）</li>
        <li>💳 <strong>银行卡号</strong>：13-19位数字（风险：极高）</li>
        <li>🌐 <strong>IP地址</strong>：IPv4格式（风险：低）</li>
        <li>🔗 <strong>网址</strong>：http/https开头（风险：低）</li>
        <li>支持导出检测报告</li>
        <li>建议定期检查文档中的隐私信息泄露</li>
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

.input-section,
.stats-section,
.details-section {
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

.text-input {
  width: 100%;
  min-height: 200px;
  padding: 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.text-input:focus {
  border-color: var(--primary-color);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.stat-card {
  padding: 16px;
  background: var(--card-bg);
  border-radius: 8px;
  text-align: center;
  border: 2px solid var(--border-color);
}

.stat-card.total { border-color: #2196f3; }
.stat-card.critical { border-color: #f44336; }
.stat-card.high { border-color: #ff9800; }
.stat-card.medium { border-color: #ffc107; }
.stat-card.low { border-color: #4caf50; }

.stat-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 11px;
  color: var(--text-secondary);
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.export-btn {
  padding: 8px 16px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.export-btn:hover {
  background: var(--primary-hover);
}

.details-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-item {
  padding: 12px;
  background: var(--card-bg);
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.item-type {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-icon {
  font-size: 18px;
}

.item-typename {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.risk-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.risk-critical {
  background: #fee;
  color: #c33;
}

.risk-high {
  background: #ffe;
  color: #c93;
}

.risk-medium {
  background: #fef;
  color: #93c;
}

.risk-low {
  background: #efe;
  color: #3c3;
}

.dark .risk-critical {
  background: #400;
  color: #f88;
}

.dark .risk-high {
  background: #440;
  color: #fb8;
}

.dark .risk-medium {
  background: #404;
  color: #d8d;
}

.dark .risk-low {
  background: #040;
  color: #8f8;
}

.item-value {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 4px;
  word-break: break-all;
}

.item-position {
  font-size: 11px;
  color: var(--text-secondary);
}

.no-result {
  padding: 40px;
  text-align: center;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  font-size: 16px;
  color: #4caf50;
  font-weight: 600;
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

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
