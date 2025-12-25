<script setup>
import { ref, computed } from 'vue'

const mode = ref('diff') // diff, add, subtract
const date1 = ref('')
const date2 = ref('')
const baseDate = ref('')
const days = ref(0)
const unit = ref('days') // days, weeks, months, years

// 初始化为今天
const initToday = () => {
  const today = new Date().toISOString().split('T')[0]
  date1.value = today
  date2.value = today
  baseDate.value = today
}

initToday()

// 计算日期差
const dateDifference = computed(() => {
  if (!date1.value || !date2.value) return null
  
  const d1 = new Date(date1.value)
  const d2 = new Date(date2.value)
  
  const diffTime = Math.abs(d2 - d1)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30.44)
  const diffYears = Math.floor(diffDays / 365.25)
  
  const totalHours = Math.floor(diffTime / (1000 * 60 * 60))
  const totalMinutes = Math.floor(diffTime / (1000 * 60))
  const totalSeconds = Math.floor(diffTime / 1000)
  
  return {
    days: diffDays,
    weeks: diffWeeks,
    months: diffMonths,
    years: diffYears,
    totalHours,
    totalMinutes,
    totalSeconds,
    isAfter: d2 > d1
  }
})

// 日期加减
const calculatedDate = computed(() => {
  if (!baseDate.value) return null
  
  const date = new Date(baseDate.value)
  let daysToAdd = Number(days.value)
  
  if (unit.value === 'weeks') daysToAdd *= 7
  if (unit.value === 'months') daysToAdd *= 30.44
  if (unit.value === 'years') daysToAdd *= 365.25
  
  if (mode.value === 'subtract') daysToAdd = -daysToAdd
  
  date.setDate(date.getDate() + daysToAdd)
  
  return {
    date: date.toISOString().split('T')[0],
    formatted: date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    }),
    dayOfWeek: date.getDay(),
    isWeekend: date.getDay() === 0 || date.getDay() === 6
  }
})

const setToday = (target) => {
  const today = new Date().toISOString().split('T')[0]
  if (target === 'date1') date1.value = today
  if (target === 'date2') date2.value = today
  if (target === 'base') baseDate.value = today
}

const swapDates = () => {
  [date1.value, date2.value] = [date2.value, date1.value]
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
        :class="['mode-tab', { active: mode === 'diff' }]"
        @click="mode = 'diff'"
      >
        📊 计算日期间隔
      </button>
      <button 
        :class="['mode-tab', { active: mode === 'add' }]"
        @click="mode = 'add'"
      >
        ➕ 日期加法
      </button>
      <button 
        :class="['mode-tab', { active: mode === 'subtract' }]"
        @click="mode = 'subtract'"
      >
        ➖ 日期减法
      </button>
    </div>

    <!-- 计算日期间隔 -->
    <div v-if="mode === 'diff'" class="calc-section">
      <div class="date-inputs">
        <div class="date-input-group">
          <label>起始日期</label>
          <div class="input-with-btn">
            <input v-model="date1" type="date" class="date-input" />
            <button @click="setToday('date1')" class="today-btn">今天</button>
          </div>
        </div>
        
        <button @click="swapDates" class="swap-btn">⇄</button>
        
        <div class="date-input-group">
          <label>结束日期</label>
          <div class="input-with-btn">
            <input v-model="date2" type="date" class="date-input" />
            <button @click="setToday('date2')" class="today-btn">今天</button>
          </div>
        </div>
      </div>

      <div v-if="dateDifference" class="result-panel">
        <h3>📊 计算结果</h3>
        <div class="result-grid">
          <div class="result-item primary">
            <div class="result-value">{{ dateDifference.days }}</div>
            <div class="result-label">天</div>
          </div>
          <div class="result-item">
            <div class="result-value">{{ dateDifference.weeks }}</div>
            <div class="result-label">周</div>
          </div>
          <div class="result-item">
            <div class="result-value">{{ dateDifference.months }}</div>
            <div class="result-label">月</div>
          </div>
          <div class="result-item">
            <div class="result-value">{{ dateDifference.years }}</div>
            <div class="result-label">年</div>
          </div>
        </div>
        
        <div class="detail-info">
          <div class="info-row">
            <span class="info-key">总小时数</span>
            <span class="info-val">{{ dateDifference.totalHours.toLocaleString() }} 小时</span>
          </div>
          <div class="info-row">
            <span class="info-key">总分钟数</span>
            <span class="info-val">{{ dateDifference.totalMinutes.toLocaleString() }} 分钟</span>
          </div>
          <div class="info-row">
            <span class="info-key">总秒数</span>
            <span class="info-val">{{ dateDifference.totalSeconds.toLocaleString() }} 秒</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 日期加减 -->
    <div v-if="mode === 'add' || mode === 'subtract'" class="calc-section">
      <div class="add-subtract-inputs">
        <div class="date-input-group">
          <label>基准日期</label>
          <div class="input-with-btn">
            <input v-model="baseDate" type="date" class="date-input" />
            <button @click="setToday('base')" class="today-btn">今天</button>
          </div>
        </div>
        
        <div class="amount-group">
          <label>{{ mode === 'add' ? '增加' : '减少' }}</label>
          <div class="amount-inputs">
            <input v-model.number="days" type="number" min="0" class="amount-input" />
            <select v-model="unit" class="unit-select">
              <option value="days">天</option>
              <option value="weeks">周</option>
              <option value="months">月</option>
              <option value="years">年</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="calculatedDate" class="result-panel">
        <h3>📅 计算结果</h3>
        <div class="result-date">
          <div class="date-display">{{ calculatedDate.date }}</div>
          <div class="date-formatted">{{ calculatedDate.formatted }}</div>
          <div class="date-meta">
            <span class="day-badge" :class="{ weekend: calculatedDate.isWeekend }">
              {{ getDayName(calculatedDate.dayOfWeek) }}
            </span>
            <span v-if="calculatedDate.isWeekend" class="weekend-tag">周末</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li><strong>计算日期间隔</strong>：计算两个日期之间相差多少天、周、月、年</li>
        <li><strong>日期加法</strong>：在指定日期基础上增加天数、周数、月数或年数</li>
        <li><strong>日期减法</strong>：在指定日期基础上减少天数、周数、月数或年数</li>
        <li>支持快速设置为今天，方便日常使用</li>
        <li>自动识别周末，便于工作日安排</li>
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

.date-inputs {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: end;
  padding: 16px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.date-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.date-input-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.input-with-btn {
  display: flex;
  gap: 8px;
}

.date-input {
  flex: 1;
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.date-input:focus {
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

.swap-btn {
  padding: 10px 16px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.swap-btn:hover {
  border-color: var(--primary-color);
  transform: rotate(180deg);
}

.add-subtract-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.amount-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.amount-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.amount-inputs {
  display: flex;
  gap: 8px;
}

.amount-input {
  flex: 1;
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.amount-input:focus {
  border-color: var(--primary-color);
}

.unit-select {
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
  cursor: pointer;
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

.result-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.result-item {
  padding: 16px;
  background: var(--card-bg);
  border-radius: 8px;
  text-align: center;
  border: 2px solid var(--border-color);
}

.result-item.primary {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, var(--primary-color)10, var(--card-bg));
}

.result-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
}

.result-item.primary .result-value {
  color: var(--primary-color);
}

.result-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.detail-info {
  padding: 12px;
  background: var(--card-bg);
  border-radius: 8px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}

.info-row:last-child {
  border-bottom: none;
}

.info-key {
  font-size: 13px;
  color: var(--text-secondary);
}

.info-val {
  font-size: 13px;
  font-weight: 600;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
}

.result-date {
  text-align: center;
  padding: 20px;
  background: var(--card-bg);
  border-radius: 10px;
}

.date-display {
  font-size: 32px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.date-formatted {
  font-size: 16px;
  color: var(--text-color);
  margin-bottom: 12px;
}

.date-meta {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.day-badge {
  padding: 6px 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.day-badge.weekend {
  background: #fee;
  border-color: #f66;
  color: #c33;
}

.dark .day-badge.weekend {
  background: #400;
  border-color: #a00;
  color: #f88;
}

.weekend-tag {
  padding: 4px 10px;
  background: #f66;
  color: white;
  border-radius: 12px;
  font-size: 11px;
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
  .date-inputs {
    grid-template-columns: 1fr;
  }
  
  .swap-btn {
    transform: rotate(90deg);
  }
  
  .result-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .add-subtract-inputs {
    grid-template-columns: 1fr;
  }
}
</style>
