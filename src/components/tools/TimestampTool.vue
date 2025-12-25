<script setup>
import { ref, computed } from 'vue'

const timestamp = ref(Date.now())
const dateString = ref('')
const mode = ref('toDate')

const updateDate = () => {
  try {
    const date = new Date(timestamp.value)
    dateString.value = date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  } catch (e) {
    dateString.value = '无效时间戳'
  }
}

const updateTimestamp = () => {
  try {
    const date = new Date(dateString.value)
    if (!isNaN(date.getTime())) {
      timestamp.value = date.getTime()
    }
  } catch (e) {
    // 忽略
  }
}

const now = () => {
  timestamp.value = Date.now()
  updateDate()
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text.toString())
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const formatDate = computed(() => {
  const date = new Date(timestamp.value)
  return {
    iso: date.toISOString(),
    utc: date.toUTCString(),
    local: date.toLocaleString('zh-CN'),
    date: date.toLocaleDateString('zh-CN'),
    time: date.toLocaleTimeString('zh-CN'),
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }
})

// 初始化
updateDate()
</script>

<template>
  <div class="tool-container">
    <div class="converter-section">
      <div class="input-section">
        <div class="section-header">
          <h3>时间戳</h3>
          <button @click="now" class="now-btn">📅 当前时间</button>
        </div>
        <input 
          v-model.number="timestamp"
          @input="updateDate"
          type="number"
          class="input-field"
          placeholder="输入时间戳（毫秒）"
        />
        <button @click="copy(timestamp)" class="copy-btn">📋 复制</button>
      </div>

      <div class="arrow">⇅</div>

      <div class="input-section">
        <div class="section-header">
          <h3>日期时间</h3>
        </div>
        <input 
          v-model="dateString"
          @input="updateTimestamp"
          type="text"
          class="input-field"
          placeholder="2026-01-01 12:00:00"
        />
        <button @click="copy(dateString)" class="copy-btn">📋 复制</button>
      </div>
    </div>

    <div class="formats-container">
      <h3>格式化输出</h3>
      
      <div class="format-grid">
        <div class="format-item">
          <label>ISO 8601</label>
          <div class="format-value" @click="copy(formatDate.iso)">
            {{ formatDate.iso }}
            <span class="copy-hint">📋</span>
          </div>
        </div>

        <div class="format-item">
          <label>UTC</label>
          <div class="format-value" @click="copy(formatDate.utc)">
            {{ formatDate.utc }}
            <span class="copy-hint">📋</span>
          </div>
        </div>

        <div class="format-item">
          <label>本地时间</label>
          <div class="format-value" @click="copy(formatDate.local)">
            {{ formatDate.local }}
            <span class="copy-hint">📋</span>
          </div>
        </div>

        <div class="format-item">
          <label>日期</label>
          <div class="format-value" @click="copy(formatDate.date)">
            {{ formatDate.date }}
            <span class="copy-hint">📋</span>
          </div>
        </div>

        <div class="format-item">
          <label>时间</label>
          <div class="format-value" @click="copy(formatDate.time)">
            {{ formatDate.time }}
            <span class="copy-hint">📋</span>
          </div>
        </div>

        <div class="format-item">
          <label>Unix时间戳（秒）</label>
          <div class="format-value" @click="copy(Math.floor(timestamp / 1000))">
            {{ Math.floor(timestamp / 1000) }}
            <span class="copy-hint">📋</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 说明</h4>
      <ul>
        <li><strong>时间戳：</strong>从1970年1月1日00:00:00 UTC起经过的毫秒数</li>
        <li><strong>Unix时间戳：</strong>秒数，JavaScript中需要乘以1000</li>
        <li><strong>ISO 8601：</strong>国际标准时间格式</li>
        <li>点击任意格式可快速复制</li>
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

.converter-section {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: center;
  padding: 24px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.arrow {
  font-size: 32px;
  color: var(--text-secondary);
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.now-btn {
  padding: 6px 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.now-btn:hover {
  background: var(--primary-hover);
}

.input-field {
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.input-field:focus {
  border-color: var(--primary-color);
}

.copy-btn {
  padding: 8px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--border-color);
}

.formats-container {
  padding: 24px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.formats-container h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 16px;
}

.format-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.format-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.format-item label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.format-value {
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.format-value:hover {
  background: var(--border-color);
}

.copy-hint {
  opacity: 0.3;
  transition: opacity 0.2s;
}

.format-value:hover .copy-hint {
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

.info-box li strong {
  color: var(--primary-color);
  font-weight: 600;
}

@media (max-width: 768px) {
  .converter-section {
    grid-template-columns: 1fr;
  }
  
  .arrow {
    transform: rotate(90deg);
  }
  
  .format-grid {
    grid-template-columns: 1fr;
  }
}
</style>
