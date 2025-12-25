<script setup>
import { ref, computed } from 'vue'

const startDate = ref('')
const endDate = ref('')
const targetDate = ref('')
const workdays = ref(0)
const mode = ref('count') // count, add

// 初始化
const today = new Date().toISOString().split('T')[0]
startDate.value = today
endDate.value = today
targetDate.value = today

// 判断是否是工作日
const isWorkday = (date) => {
  const day = date.getDay()
  return day !== 0 && day !== 6 // 0=周日, 6=周六
}

// 计算两个日期之间的工作日数量
const countWorkdays = (start, end) => {
  let count = 0
  const current = new Date(start)
  const endDate = new Date(end)
  
  while (current <= endDate) {
    if (isWorkday(current)) {
      count++
    }
    current.setDate(current.getDate() + 1)
  }
  
  return count
}

// 计算结果 - 工作日数量
const workdayCount = computed(() => {
  if (!startDate.value || !endDate.value) return null
  
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  
  const total = countWorkdays(start, end)
  const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1
  const weekends = totalDays - total
  
  return {
    workdays: total,
    weekends: weekends,
    totalDays: totalDays,
    percentage: ((total / totalDays) * 100).toFixed(1)
  }
})

// 计算结果 - 添加工作日后的日期
const targetWorkdayDate = computed(() => {
  if (!targetDate.value || workdays.value < 1) return null
  
  let current = new Date(targetDate.value)
  let remaining = workdays.value
  
  while (remaining > 0) {
    current.setDate(current.getDate() + 1)
    if (isWorkday(current)) {
      remaining--
    }
  }
  
  return {
    date: current.toISOString().split('T')[0],
    formatted: current.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }),
    dayOfWeek: current.getDay()
  }
})

const setToday = (field) => {
  const today = new Date().toISOString().split('T')[0]
  if (field === 'start') startDate.value = today
  if (field === 'end') endDate.value = today
  if (field === 'target') targetDate.value = today
}

const getDayName = (dayNum) => {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return days[dayNum]
}
</script>

<template>
  <div class="tool-container">
    <!-- 模式选择 -->
    <div class="mode-tabs">
      <button 
        :class="['mode-tab', { active: mode === 'count' }]"
        @click="mode = 'count'"
      >
        📊 计算工作日数量
      </button>
      <button 
        :class="['mode-tab', { active: mode === 'add' }]"
        @click="mode = 'add'"
      >
        ➕ 添加工作日
      </button>
    </div>

    <!-- 计算工作日数量 -->
    <div v-if="mode === 'count'" class="calc-section">
      <div class="date-range">
        <div class="date-group">
          <label>起始日期</label>
          <div class="input-row">
            <input v-model="startDate" type="date" class="date-input" />
            <button @click="setToday('start')" class="today-btn">今天</button>
          </div>
        </div>
        
        <div class="date-group">
          <label>结束日期</label>
          <div class="input-row">
            <input v-model="endDate" type="date" class="date-input" />
            <button @click="setToday('end')" class="today-btn">今天</button>
          </div>
        </div>
      </div>

      <div v-if="workdayCount" class="result-panel">
        <h3>📊 计算结果</h3>
        <div class="result-cards">
          <div class="result-card primary">
            <div class="card-icon">💼</div>
            <div class="card-value">{{ workdayCount.workdays }}</div>
            <div class="card-label">工作日</div>
          </div>
          
          <div class="result-card">
            <div class="card-icon">🏖️</div>
            <div class="card-value">{{ workdayCount.weekends }}</div>
            <div class="card-label">周末</div>
          </div>
          
          <div class="result-card">
            <div class="card-icon">📅</div>
            <div class="card-value">{{ workdayCount.totalDays }}</div>
            <div class="card-label">总天数</div>
          </div>
          
          <div class="result-card">
            <div class="card-icon">📈</div>
            <div class="card-value">{{ workdayCount.percentage }}%</div>
            <div class="card-label">工作日占比</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加工作日 -->
    <div v-if="mode === 'add'" class="calc-section">
      <div class="add-workday-inputs">
        <div class="date-group">
          <label>起始日期</label>
          <div class="input-row">
            <input v-model="targetDate" type="date" class="date-input" />
            <button @click="setToday('target')" class="today-btn">今天</button>
          </div>
        </div>
        
        <div class="number-group">
          <label>添加工作日数</label>
          <input 
            v-model.number="workdays" 
            type="number" 
            min="1" 
            class="number-input"
            placeholder="输入工作日天数"
          />
        </div>
      </div>

      <div v-if="targetWorkdayDate && workdays > 0" class="result-panel">
        <h3>📅 计算结果</h3>
        <div class="result-date-card">
          <div class="date-large">{{ targetWorkdayDate.date }}</div>
          <div class="date-formatted">{{ targetWorkdayDate.formatted }}</div>
          <div class="date-badge">
            {{ getDayName(targetWorkdayDate.dayOfWeek) }}
          </div>
          <div class="date-info">
            从 <strong>{{ targetDate }}</strong> 开始，<strong>{{ workdays }}</strong> 个工作日后
          </div>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li><strong>计算工作日数量</strong>：计算两个日期之间有多少个工作日（排除周六、周日）</li>
        <li><strong>添加工作日</strong>：从指定日期开始，计算N个工作日后的日期</li>
        <li>工作日定义：周一至周五</li>
        <li>周末定义：周六、周日</li>
        <li>不包含法定节假日，仅按周末计算</li>
        <li>适用于项目排期、任务计划等场景</li>
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

.mode-tabs {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.mode-tab {
  flex: 1;
  padding: 10px 16px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.mode-tab:hover {
  border-color: var(--primary-color);
}

.mode-tab.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.calc-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.date-range,
.add-workday-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.date-group,
.number-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.date-group label,
.number-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.input-row {
  display: flex;
  gap: 8px;
}

.date-input,
.number-input {
  flex: 1;
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.date-input:focus,
.number-input:focus {
  border-color: var(--primary-color);
}

.today-btn {
  padding: 10px 16px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
  white-space: nowrap;
}

.today-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.result-panel {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.result-panel h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 16px;
}

.result-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.result-card {
  padding: 20px 16px;
  background: var(--card-bg);
  border-radius: 8px;
  border: 2px solid var(--border-color);
  text-align: center;
  transition: all 0.2s;
}

.result-card:hover {
  transform: translateY(-2px);
}

.result-card.primary {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, var(--primary-color)10, var(--card-bg));
}

.card-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.card-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
}

.result-card.primary .card-value {
  color: var(--primary-color);
}

.card-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.result-date-card {
  padding: 30px;
  background: var(--card-bg);
  border-radius: 10px;
  text-align: center;
}

.date-large {
  font-size: 36px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--primary-color);
  margin-bottom: 12px;
}

.date-formatted {
  font-size: 18px;
  color: var(--text-color);
  margin-bottom: 12px;
}

.date-badge {
  display: inline-block;
  padding: 8px 16px;
  background: var(--primary-color);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}

.date-info {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.date-info strong {
  color: var(--text-color);
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

@media (max-width: 768px) {
  .date-range,
  .add-workday-inputs {
    grid-template-columns: 1fr;
  }
  
  .result-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
