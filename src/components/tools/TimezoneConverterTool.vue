<script setup>
import { ref, computed } from 'vue'

const sourceTime = ref('')
const sourceTimezone = ref('Asia/Shanghai')
const targetTimezones = ref(['America/New_York', 'Europe/London', 'Asia/Tokyo'])

// 初始化当前时间
const initNow = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  sourceTime.value = `${hours}:${minutes}`
}

initNow()

// 主要时区列表
const timezones = [
  { value: 'Asia/Shanghai', label: '北京 (UTC+8)', offset: 8 },
  { value: 'Asia/Tokyo', label: '东京 (UTC+9)', offset: 9 },
  { value: 'Asia/Seoul', label: '首尔 (UTC+9)', offset: 9 },
  { value: 'Asia/Hong_Kong', label: '香港 (UTC+8)', offset: 8 },
  { value: 'Asia/Singapore', label: '新加坡 (UTC+8)', offset: 8 },
  { value: 'Asia/Dubai', label: '迪拜 (UTC+4)', offset: 4 },
  { value: 'Europe/London', label: '伦敦 (UTC+0)', offset: 0 },
  { value: 'Europe/Paris', label: '巴黎 (UTC+1)', offset: 1 },
  { value: 'Europe/Berlin', label: '柏林 (UTC+1)', offset: 1 },
  { value: 'Europe/Moscow', label: '莫斯科 (UTC+3)', offset: 3 },
  { value: 'America/New_York', label: '纽约 (UTC-5)', offset: -5 },
  { value: 'America/Los_Angeles', label: '洛杉矶 (UTC-8)', offset: -8 },
  { value: 'America/Chicago', label: '芝加哥 (UTC-6)', offset: -6 },
  { value: 'America/Toronto', label: '多伦多 (UTC-5)', offset: -5 },
  { value: 'Pacific/Auckland', label: '奥克兰 (UTC+12)', offset: 12 },
  { value: 'Australia/Sydney', label: '悉尼 (UTC+10)', offset: 10 }
]

// 转换时区
const convertedTimes = computed(() => {
  if (!sourceTime.value) return []
  
  const [hours, minutes] = sourceTime.value.split(':').map(Number)
  const sourceOffset = timezones.find(tz => tz.value === sourceTimezone.value)?.offset || 0
  
  return targetTimezones.value.map(targetTz => {
    const target = timezones.find(tz => tz.value === targetTz)
    if (!target) return null
    
    const offsetDiff = target.offset - sourceOffset
    let targetHours = hours + offsetDiff
    
    // 处理跨天
    let dayDiff = 0
    if (targetHours >= 24) {
      dayDiff = Math.floor(targetHours / 24)
      targetHours = targetHours % 24
    } else if (targetHours < 0) {
      dayDiff = Math.ceil(targetHours / 24) - 1
      targetHours = 24 + (targetHours % 24)
    }
    
    const dayLabel = dayDiff > 0 ? ' (+1天)' : dayDiff < 0 ? ' (-1天)' : ''
    
    return {
      timezone: targetTz,
      label: target.label,
      time: `${String(targetHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
      dayDiff: dayLabel,
      offset: target.offset
    }
  }).filter(Boolean)
})

const addTimezone = (tz) => {
  if (!targetTimezones.value.includes(tz)) {
    targetTimezones.value.push(tz)
  }
}

const removeTimezone = (tz) => {
  targetTimezones.value = targetTimezones.value.filter(t => t !== tz)
}

const setNow = () => {
  initNow()
}
</script>

<template>
  <div class="tool-container">
    <!-- 源时间输入 -->
    <div class="source-panel">
      <h3>🕐 源时间</h3>
      <div class="source-inputs">
        <div class="input-group">
          <label>时间</label>
          <div class="time-row">
            <input v-model="sourceTime" type="time" class="time-input" />
            <button @click="setNow" class="now-btn">当前时间</button>
          </div>
        </div>
        <div class="input-group">
          <label>时区</label>
          <select v-model="sourceTimezone" class="timezone-select">
            <option v-for="tz in timezones" :key="tz.value" :value="tz.value">
              {{ tz.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- 转换结果 -->
    <div class="result-panel">
      <h3>🌍 转换结果</h3>
      <div class="result-list">
        <div v-for="result in convertedTimes" :key="result.timezone" class="result-item">
          <div class="result-header">
            <span class="result-city">{{ result.label }}</span>
            <button @click="removeTimezone(result.timezone)" class="remove-btn">×</button>
          </div>
          <div class="result-time">
            {{ result.time }}<span class="day-diff">{{ result.dayDiff }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加时区 -->
    <div class="add-panel">
      <h3>➕ 添加时区</h3>
      <div class="timezone-grid">
        <button 
          v-for="tz in timezones" 
          :key="tz.value"
          @click="addTimezone(tz.value)"
          :disabled="targetTimezones.includes(tz.value)"
          class="tz-btn"
        >
          {{ tz.label.split(' (')[0] }}
        </button>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li>选择源时间和时区</li>
        <li>自动转换为其他时区的对应时间</li>
        <li>支持添加/删除目标时区</li>
        <li>自动计算跨天情况</li>
        <li>适用于跨国会议、国际协作等场景</li>
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

.source-panel,
.result-panel,
.add-panel {
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

.source-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.time-row {
  display: flex;
  gap: 8px;
}

.time-input,
.timezone-select {
  flex: 1;
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.time-input:focus,
.timezone-select:focus {
  border-color: var(--primary-color);
}

.now-btn {
  padding: 10px 16px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.now-btn:hover {
  background: var(--primary-hover);
}

.result-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 12px;
}

.result-item {
  padding: 16px;
  background: var(--card-bg);
  border-radius: 8px;
  border: 2px solid var(--border-color);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.result-city {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.remove-btn {
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  font-size: 20px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.remove-btn:hover {
  color: #f66;
}

.result-time {
  font-size: 28px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--primary-color);
}

.day-diff {
  font-size: 14px;
  color: var(--text-secondary);
  margin-left: 8px;
}

.timezone-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
}

.tz-btn {
  padding: 10px 14px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.tz-btn:not(:disabled):hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.tz-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  .source-inputs {
    grid-template-columns: 1fr;
  }
  
  .result-list {
    grid-template-columns: 1fr;
  }
}
</style>
