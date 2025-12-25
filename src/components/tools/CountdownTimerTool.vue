<script setup>
import { ref, computed, onUnmounted } from 'vue'

const mode = ref('countdown') // countdown, timer, target
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const targetDate = ref('')
const targetTime = ref('00:00')

const isRunning = ref(false)
const elapsed = ref(0)
let intervalId = null

// 倒计时剩余时间
const remainingTime = computed(() => {
  const total = hours.value * 3600 + minutes.value * 60 + seconds.value - elapsed.value
  if (total <= 0) {
    stop()
    return { hours: 0, minutes: 0, seconds: 0, total: 0 }
  }
  
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    total
  }
})

// 计时器已用时间
const elapsedTime = computed(() => {
  return {
    hours: Math.floor(elapsed.value / 3600),
    minutes: Math.floor((elapsed.value % 3600) / 60),
    seconds: elapsed.value % 60,
    total: elapsed.value
  }
})

// 目标日期倒计时
const targetCountdown = computed(() => {
  if (!targetDate.value) return null
  
  const target = new Date(`${targetDate.value}T${targetTime.value}`)
  const now = new Date()
  const diff = Math.floor((target - now) / 1000)
  
  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
      isPast: true
    }
  }
  
  return {
    days: Math.floor(diff / 86400),
    hours: Math.floor((diff % 86400) / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: diff % 60,
    total: diff,
    isPast: false
  }
})

const start = () => {
  if (isRunning.value) return
  
  isRunning.value = true
  intervalId = setInterval(() => {
    elapsed.value++
    
    // 倒计时模式检查是否结束
    if (mode.value === 'countdown' && elapsed.value >= hours.value * 3600 + minutes.value * 60 + seconds.value) {
      stop()
      alert('⏰ 倒计时结束！')
    }
  }, 1000)
}

const pause = () => {
  isRunning.value = false
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const stop = () => {
  pause()
  elapsed.value = 0
}

const reset = () => {
  stop()
  hours.value = 0
  minutes.value = 0
  seconds.value = 0
}

// 预设时间
const presets = [
  { label: '5分钟', h: 0, m: 5, s: 0 },
  { label: '10分钟', h: 0, m: 10, s: 0 },
  { label: '15分钟', h: 0, m: 15, s: 0 },
  { label: '30分钟', h: 0, m: 30, s: 0 },
  { label: '1小时', h: 1, m: 0, s: 0 },
  { label: '2小时', h: 2, m: 0, s: 0 }
]

const usePreset = (preset) => {
  hours.value = preset.h
  minutes.value = preset.m
  seconds.value = preset.s
  stop()
}

// 初始化目标日期为今天
const today = new Date().toISOString().split('T')[0]
targetDate.value = today

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="tool-container">
    <!-- 模式选择 -->
    <div class="mode-tabs">
      <button 
        :class="['mode-tab', { active: mode === 'countdown' }]"
        @click="mode = 'countdown'; stop()"
      >
        ⏱️ 倒计时
      </button>
      <button 
        :class="['mode-tab', { active: mode === 'timer' }]"
        @click="mode = 'timer'; stop()"
      >
        ⏲️ 正计时
      </button>
      <button 
        :class="['mode-tab', { active: mode === 'target' }]"
        @click="mode = 'target'; stop()"
      >
        📅 目标日期
      </button>
    </div>

    <!-- 倒计时模式 -->
    <div v-if="mode === 'countdown'" class="timer-section">
      <div class="presets">
        <button 
          v-for="preset in presets" 
          :key="preset.label"
          @click="usePreset(preset)"
          class="preset-btn"
        >
          {{ preset.label }}
        </button>
      </div>

      <div class="time-inputs">
        <div class="input-group">
          <label>小时</label>
          <input v-model.number="hours" type="number" min="0" max="23" class="time-num-input" />
        </div>
        <div class="input-group">
          <label>分钟</label>
          <input v-model.number="minutes" type="number" min="0" max="59" class="time-num-input" />
        </div>
        <div class="input-group">
          <label>秒</label>
          <input v-model.number="seconds" type="number" min="0" max="59" class="time-num-input" />
        </div>
      </div>

      <div class="display-time">
        <span class="time-digit">{{ String(remainingTime.hours).padStart(2, '0') }}</span>
        <span class="time-sep">:</span>
        <span class="time-digit">{{ String(remainingTime.minutes).padStart(2, '0') }}</span>
        <span class="time-sep">:</span>
        <span class="time-digit">{{ String(remainingTime.seconds).padStart(2, '0') }}</span>
      </div>

      <div class="controls">
        <button v-if="!isRunning" @click="start" class="control-btn start">▶️ 开始</button>
        <button v-if="isRunning" @click="pause" class="control-btn pause">⏸️ 暂停</button>
        <button @click="stop" class="control-btn stop">⏹️ 停止</button>
        <button @click="reset" class="control-btn reset">🔄 重置</button>
      </div>
    </div>

    <!-- 正计时模式 -->
    <div v-if="mode === 'timer'" class="timer-section">
      <div class="display-time">
        <span class="time-digit">{{ String(elapsedTime.hours).padStart(2, '0') }}</span>
        <span class="time-sep">:</span>
        <span class="time-digit">{{ String(elapsedTime.minutes).padStart(2, '0') }}</span>
        <span class="time-sep">:</span>
        <span class="time-digit">{{ String(elapsedTime.seconds).padStart(2, '0') }}</span>
      </div>

      <div class="controls">
        <button v-if="!isRunning" @click="start" class="control-btn start">▶️ 开始</button>
        <button v-if="isRunning" @click="pause" class="control-btn pause">⏸️ 暂停</button>
        <button @click="stop" class="control-btn stop">⏹️ 停止</button>
      </div>
    </div>

    <!-- 目标日期模式 -->
    <div v-if="mode === 'target'" class="timer-section">
      <div class="date-inputs">
        <div class="input-group">
          <label>目标日期</label>
          <input v-model="targetDate" type="date" class="date-input" />
        </div>
        <div class="input-group">
          <label>目标时间</label>
          <input v-model="targetTime" type="time" class="date-input" />
        </div>
      </div>

      <div v-if="targetCountdown && !targetCountdown.isPast" class="countdown-display">
        <div class="countdown-item">
          <div class="countdown-num">{{ targetCountdown.days }}</div>
          <div class="countdown-label">天</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-num">{{ targetCountdown.hours }}</div>
          <div class="countdown-label">小时</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-num">{{ targetCountdown.minutes }}</div>
          <div class="countdown-label">分钟</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-num">{{ targetCountdown.seconds }}</div>
          <div class="countdown-label">秒</div>
        </div>
      </div>

      <div v-if="targetCountdown && targetCountdown.isPast" class="past-notice">
        目标时间已过
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li><strong>倒计时</strong>：设置时长，从设定时间倒数至零，到时提醒</li>
        <li><strong>正计时</strong>：从零开始累计计时，记录已用时间</li>
        <li><strong>目标日期</strong>：显示距离指定日期时间还有多久</li>
        <li>支持快速预设常用时长</li>
        <li>可暂停/恢复/停止/重置</li>
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

.timer-section {
  padding: 20px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.presets {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.preset-btn {
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

.preset-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.time-inputs,
.date-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
}

.input-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.time-num-input,
.date-input {
  padding: 10px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  color: var(--text-color);
  outline: none;
}

.time-num-input:focus,
.date-input:focus {
  border-color: var(--primary-color);
}

.display-time {
  text-align: center;
  padding: 40px 20px;
  background: var(--card-bg);
  border-radius: 10px;
}

.time-digit {
  font-size: 72px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--primary-color);
}

.time-sep {
  font-size: 72px;
  font-weight: 700;
  color: var(--text-secondary);
  margin: 0 8px;
}

.controls {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.control-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn.start {
  background: #4caf50;
  color: white;
}

.control-btn.pause {
  background: #ff9800;
  color: white;
}

.control-btn.stop {
  background: #f44336;
  color: white;
}

.control-btn.reset {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  color: var(--text-color);
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.countdown-display {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.countdown-item {
  text-align: center;
  padding: 20px;
  background: var(--card-bg);
  border-radius: 10px;
  border: 2px solid var(--border-color);
}

.countdown-num {
  font-size: 48px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.countdown-label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 600;
}

.past-notice {
  text-align: center;
  padding: 40px;
  font-size: 20px;
  color: var(--text-secondary);
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
  .time-digit,
  .time-sep {
    font-size: 48px;
  }
  
  .countdown-display {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .countdown-num {
    font-size: 36px;
  }
}
</style>
