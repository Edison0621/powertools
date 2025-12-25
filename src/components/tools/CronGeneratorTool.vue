<script setup>
import { ref, computed } from 'vue'

const cronExpression = ref('* * * * *')
const selectedTab = ref('simple')

// 简单模式选项
const minute = ref('*')
const hour = ref('*')
const day = ref('*')
const month = ref('*')
const weekday = ref('*')

// 预设模板
const templates = [
  { name: '每分钟', value: '* * * * *', desc: '每分钟执行一次' },
  { name: '每小时', value: '0 * * * *', desc: '每小时整点执行' },
  { name: '每天午夜', value: '0 0 * * *', desc: '每天00:00执行' },
  { name: '每天中午', value: '0 12 * * *', desc: '每天12:00执行' },
  { name: '每周一', value: '0 0 * * 1', desc: '每周一00:00执行' },
  { name: '每月1号', value: '0 0 1 * *', desc: '每月1号00:00执行' },
  { name: '工作日早9点', value: '0 9 * * 1-5', desc: '周一到周五09:00执行' },
  { name: '每15分钟', value: '*/15 * * * *', desc: '每15分钟执行一次' },
  { name: '每6小时', value: '0 */6 * * *', desc: '每6小时执行一次' }
]

// 生成Cron表达式
const generateCron = () => {
  cronExpression.value = `${minute.value} ${hour.value} ${day.value} ${month.value} ${weekday.value}`
}

// 使用模板
const useTemplate = (template) => {
  cronExpression.value = template.value
  parseCron(template.value)
}

// 解析Cron表达式
const parseCron = (expr) => {
  const parts = expr.trim().split(/\s+/)
  if (parts.length === 5) {
    minute.value = parts[0]
    hour.value = parts[1]
    day.value = parts[2]
    month.value = parts[3]
    weekday.value = parts[4]
  }
}

// 解释Cron表达式
const explanation = computed(() => {
  const parts = cronExpression.value.split(/\s+/)
  if (parts.length !== 5) return '无效的Cron表达式'
  
  const [m, h, d, mon, w] = parts
  
  let desc = '执行时间: '
  
  // 分钟
  if (m === '*') desc += '每分钟'
  else if (m.includes('/')) desc += `每${m.split('/')[1]}分钟`
  else if (m.includes(',')) desc += `第${m}分钟`
  else if (m.includes('-')) desc += `第${m}分钟`
  else desc += `第${m}分钟`
  
  // 小时
  if (h === '*') desc += ', 每小时'
  else if (h.includes('/')) desc += `, 每${h.split('/')[1]}小时`
  else if (h.includes(',')) desc += `, ${h}点`
  else if (h.includes('-')) desc += `, ${h}点`
  else desc += `, ${h}点`
  
  // 日期
  if (d === '*') desc += ', 每天'
  else if (d.includes('/')) desc += `, 每${d.split('/')[1]}天`
  else if (d.includes(',')) desc += `, 第${d}日`
  else if (d.includes('-')) desc += `, 第${d}日`
  else desc += `, 第${d}日`
  
  // 月份
  if (mon === '*') desc += ', 每月'
  else if (mon.includes(',')) desc += `, 第${mon}月`
  else if (mon.includes('-')) desc += `, 第${mon}月`
  else desc += `, 第${mon}月`
  
  // 星期
  if (w === '*') desc += ''
  else if (w.includes(',')) desc += `, 星期${w}`
  else if (w.includes('-')) desc += `, 星期${w}`
  else desc += `, 星期${w}`
  
  return desc
})

// 下次执行时间（模拟）
const nextExecutions = computed(() => {
  const times = []
  const now = new Date()
  
  // 简单模拟，实际应使用专业库如cron-parser
  for (let i = 0; i < 5; i++) {
    const next = new Date(now.getTime() + (i + 1) * 60000)
    times.push(next.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }))
  }
  
  return times
})

const copy = async () => {
  try {
    await navigator.clipboard.writeText(cronExpression.value)
    alert('已复制Cron表达式')
  } catch (e) {
    alert('复制失败')
  }
}

// 监听变化
const handleManualChange = () => {
  generateCron()
}
</script>

<template>
  <div class="tool-container">
    <!-- Tab切换 -->
    <div class="tabs">
      <button 
        :class="['tab-btn', { active: selectedTab === 'simple' }]"
        @click="selectedTab = 'simple'"
      >
        🎯 简单模式
      </button>
      <button 
        :class="['tab-btn', { active: selectedTab === 'template' }]"
        @click="selectedTab = 'template'"
      >
        📋 预设模板
      </button>
      <button 
        :class="['tab-btn', { active: selectedTab === 'advanced' }]"
        @click="selectedTab = 'advanced'"
      >
        ⚙️ 高级模式
      </button>
    </div>

    <!-- 简单模式 -->
    <div v-show="selectedTab === 'simple'" class="panel">
      <div class="fields-grid">
        <div class="field-group">
          <label>分钟 (0-59)</label>
          <input v-model="minute" @input="handleManualChange" class="field-input" placeholder="* 或 0-59" />
          <span class="field-hint">* = 每分钟</span>
        </div>
        
        <div class="field-group">
          <label>小时 (0-23)</label>
          <input v-model="hour" @input="handleManualChange" class="field-input" placeholder="* 或 0-23" />
          <span class="field-hint">* = 每小时</span>
        </div>
        
        <div class="field-group">
          <label>日期 (1-31)</label>
          <input v-model="day" @input="handleManualChange" class="field-input" placeholder="* 或 1-31" />
          <span class="field-hint">* = 每天</span>
        </div>
        
        <div class="field-group">
          <label>月份 (1-12)</label>
          <input v-model="month" @input="handleManualChange" class="field-input" placeholder="* 或 1-12" />
          <span class="field-hint">* = 每月</span>
        </div>
        
        <div class="field-group">
          <label>星期 (0-6)</label>
          <input v-model="weekday" @input="handleManualChange" class="field-input" placeholder="* 或 0-6" />
          <span class="field-hint">0 = 周日</span>
        </div>
      </div>
    </div>

    <!-- 预设模板 -->
    <div v-show="selectedTab === 'template'" class="panel">
      <div class="templates-grid">
        <button 
          v-for="template in templates" 
          :key="template.value"
          @click="useTemplate(template)"
          class="template-btn"
        >
          <div class="template-name">{{ template.name }}</div>
          <div class="template-value">{{ template.value }}</div>
          <div class="template-desc">{{ template.desc }}</div>
        </button>
      </div>
    </div>

    <!-- 高级模式 -->
    <div v-show="selectedTab === 'advanced'" class="panel">
      <div class="advanced-section">
        <label>直接编辑Cron表达式</label>
        <input 
          v-model="cronExpression" 
          @input="parseCron(cronExpression)"
          class="cron-input" 
          placeholder="* * * * *" 
        />
        <div class="format-hint">
          <strong>格式:</strong> 分钟 小时 日期 月份 星期
        </div>
      </div>
    </div>

    <!-- 结果显示 -->
    <div class="result-section">
      <div class="result-header">
        <h3>📝 生成的Cron表达式</h3>
        <button @click="copy" class="copy-btn">📋 复制</button>
      </div>
      
      <div class="cron-output">
        {{ cronExpression }}
      </div>
      
      <div class="explanation">
        <strong>说明:</strong> {{ explanation }}
      </div>
    </div>

    <!-- 下次执行时间 -->
    <div class="execution-section">
      <h4>⏰ 预计执行时间（示例）</h4>
      <div class="execution-list">
        <div v-for="(time, index) in nextExecutions" :key="index" class="execution-item">
          {{ index + 1 }}. {{ time }}
        </div>
      </div>
    </div>

    <!-- 说明 -->
    <div class="info-box">
      <h4>ℹ️ Cron表达式语法</h4>
      <div class="syntax-table">
        <div class="syntax-row">
          <span class="syntax-symbol">*</span>
          <span class="syntax-desc">任意值（每...）</span>
        </div>
        <div class="syntax-row">
          <span class="syntax-symbol">,</span>
          <span class="syntax-desc">列举多个值（如: 1,3,5）</span>
        </div>
        <div class="syntax-row">
          <span class="syntax-symbol">-</span>
          <span class="syntax-desc">范围（如: 1-5）</span>
        </div>
        <div class="syntax-row">
          <span class="syntax-symbol">/</span>
          <span class="syntax-desc">步长（如: */15 表示每15...）</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tabs {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.tab-btn {
  flex: 1;
  padding: 10px 16px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.tab-btn:hover {
  border-color: var(--primary-color);
}

.tab-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.panel {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.fields-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.field-input {
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
  outline: none;
}

.field-input:focus {
  border-color: var(--primary-color);
}

.field-hint {
  font-size: 11px;
  color: var(--text-secondary);
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.template-btn {
  padding: 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.template-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.template-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 6px;
}

.template-value {
  font-size: 12px;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.template-desc {
  font-size: 11px;
  color: var(--text-secondary);
}

.advanced-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.advanced-section label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.cron-input {
  padding: 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-weight: 600;
  color: var(--text-color);
  outline: none;
}

.cron-input:focus {
  border-color: var(--primary-color);
}

.format-hint {
  font-size: 12px;
  color: var(--text-secondary);
}

.result-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.result-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
}

.copy-btn {
  padding: 6px 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--primary-hover);
}

.cron-output {
  padding: 16px;
  background: var(--card-bg);
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  font-size: 20px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-weight: 700;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 12px;
}

.explanation {
  padding: 12px;
  background: var(--card-bg);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
}

.execution-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.execution-section h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

.execution-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.execution-item {
  padding: 10px;
  background: var(--card-bg);
  border-radius: 6px;
  font-size: 13px;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
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

.syntax-table {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
}

.syntax-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: var(--card-bg);
  border-radius: 6px;
}

.syntax-symbol {
  font-size: 18px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--primary-color);
  min-width: 30px;
}

.syntax-desc {
  font-size: 12px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
  }
  
  .fields-grid {
    grid-template-columns: 1fr;
  }
  
  .templates-grid {
    grid-template-columns: 1fr;
  }
}
</style>
