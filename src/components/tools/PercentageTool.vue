<script setup>
import { ref, computed } from 'vue'

// 基础百分比计算
const value1 = ref(0)
const value2 = ref(0)

const percentOf = computed(() => {
  if (value2.value === 0) return 0
  return (value1.value / value2.value) * 100
})

const isWhatPercent = computed(() => {
  if (value2.value === 0) return 0
  return (value1.value / value2.value) * 100
})

// 百分比增减
const originalValue = ref(100)
const percentChange = ref(10)

const increaseResult = computed(() => {
  return originalValue.value * (1 + percentChange.value / 100)
})

const decreaseResult = computed(() => {
  return originalValue.value * (1 - percentChange.value / 100)
})

// 百分比变化
const oldValue = ref(100)
const newValue = ref(120)

const percentageChange = computed(() => {
  if (oldValue.value === 0) return 0
  return ((newValue.value - oldValue.value) / oldValue.value) * 100
})

const absoluteChange = computed(() => {
  return newValue.value - oldValue.value
})

// 折扣计算
const originalPrice = ref(100)
const discountPercent = ref(20)

const discountAmount = computed(() => {
  return originalPrice.value * (discountPercent.value / 100)
})

const finalPrice = computed(() => {
  return originalPrice.value - discountAmount.value
})

const savedAmount = computed(() => {
  return discountAmount.value
})

// 比例计算
const part = ref(25)
const whole = ref(100)

const ratio = computed(() => {
  if (whole.value === 0) return 0
  return (part.value / whole.value) * 100
})

const copy = async (value) => {
  try {
    await navigator.clipboard.writeText(value.toFixed(2))
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}
</script>

<template>
  <div class="tool-container">
    <!-- 基础百分比计算 -->
    <div class="calc-card">
      <h3>📊 X 是 Y 的百分之几？</h3>
      <div class="input-row">
        <input v-model.number="value1" type="number" class="input-field" placeholder="数值1" />
        <span class="operator">是</span>
        <input v-model.number="value2" type="number" class="input-field" placeholder="数值2" />
        <span class="operator">的</span>
      </div>
      <div class="result-box">
        <div class="result-value">{{ percentOf.toFixed(2) }}%</div>
        <button @click="copy(percentOf)" class="copy-btn">📋</button>
      </div>
    </div>

    <!-- 百分比增加 -->
    <div class="calc-card">
      <h3>📈 增加百分比</h3>
      <div class="input-row">
        <input v-model.number="originalValue" type="number" class="input-field" placeholder="原始值" />
        <span class="operator">增加</span>
        <input v-model.number="percentChange" type="number" class="input-field" placeholder="百分比" />
        <span class="operator">%</span>
      </div>
      <div class="result-box">
        <div class="result-label">增加后:</div>
        <div class="result-value">{{ increaseResult.toFixed(2) }}</div>
        <button @click="copy(increaseResult)" class="copy-btn">📋</button>
      </div>
      <div class="result-box secondary">
        <div class="result-label">增加量:</div>
        <div class="result-value">+{{ (increaseResult - originalValue).toFixed(2) }}</div>
      </div>
    </div>

    <!-- 百分比减少 -->
    <div class="calc-card">
      <h3>📉 减少百分比</h3>
      <div class="input-row">
        <input v-model.number="originalValue" type="number" class="input-field" placeholder="原始值" />
        <span class="operator">减少</span>
        <input v-model.number="percentChange" type="number" class="input-field" placeholder="百分比" />
        <span class="operator">%</span>
      </div>
      <div class="result-box">
        <div class="result-label">减少后:</div>
        <div class="result-value">{{ decreaseResult.toFixed(2) }}</div>
        <button @click="copy(decreaseResult)" class="copy-btn">📋</button>
      </div>
      <div class="result-box secondary">
        <div class="result-label">减少量:</div>
        <div class="result-value">-{{ (originalValue - decreaseResult).toFixed(2) }}</div>
      </div>
    </div>

    <!-- 百分比变化 -->
    <div class="calc-card">
      <h3>🔄 百分比变化</h3>
      <div class="input-row">
        <div class="input-group">
          <label>原值</label>
          <input v-model.number="oldValue" type="number" class="input-field" placeholder="原值" />
        </div>
        <span class="operator">→</span>
        <div class="input-group">
          <label>新值</label>
          <input v-model.number="newValue" type="number" class="input-field" placeholder="新值" />
        </div>
      </div>
      <div class="result-box">
        <div class="result-label">变化:</div>
        <div :class="['result-value', percentageChange >= 0 ? 'positive' : 'negative']">
          {{ percentageChange >= 0 ? '+' : '' }}{{ percentageChange.toFixed(2) }}%
        </div>
        <button @click="copy(percentageChange)" class="copy-btn">📋</button>
      </div>
      <div class="result-box secondary">
        <div class="result-label">绝对变化:</div>
        <div :class="['result-value', absoluteChange >= 0 ? 'positive' : 'negative']">
          {{ absoluteChange >= 0 ? '+' : '' }}{{ absoluteChange.toFixed(2) }}
        </div>
      </div>
    </div>

    <!-- 折扣计算 -->
    <div class="calc-card">
      <h3>💰 折扣计算</h3>
      <div class="input-row">
        <div class="input-group">
          <label>原价</label>
          <input v-model.number="originalPrice" type="number" class="input-field" placeholder="原价" />
        </div>
        <div class="input-group">
          <label>折扣</label>
          <input v-model.number="discountPercent" type="number" class="input-field" placeholder="折扣%" />
        </div>
      </div>
      <div class="result-grid">
        <div class="result-item">
          <div class="result-label">折扣金额</div>
          <div class="result-value discount">-{{ discountAmount.toFixed(2) }}</div>
        </div>
        <div class="result-item">
          <div class="result-label">最终价格</div>
          <div class="result-value final">{{ finalPrice.toFixed(2) }}</div>
          <button @click="copy(finalPrice)" class="copy-btn-small">📋</button>
        </div>
        <div class="result-item">
          <div class="result-label">节省</div>
          <div class="result-value saved">{{ savedAmount.toFixed(2) }}</div>
        </div>
      </div>
    </div>

    <!-- 比例计算 -->
    <div class="calc-card">
      <h3>📏 比例计算</h3>
      <div class="input-row">
        <input v-model.number="part" type="number" class="input-field" placeholder="部分" />
        <span class="operator">/</span>
        <input v-model.number="whole" type="number" class="input-field" placeholder="整体" />
        <span class="operator">=</span>
      </div>
      <div class="result-box">
        <div class="result-value">{{ ratio.toFixed(2) }}%</div>
        <button @click="copy(ratio)" class="copy-btn">📋</button>
      </div>
      <div class="visual-bar">
        <div class="bar-fill" :style="{ width: Math.min(ratio, 100) + '%' }"></div>
        <div class="bar-label">{{ ratio.toFixed(1) }}%</div>
      </div>
    </div>

    <!-- 快速参考 -->
    <div class="reference-card">
      <h3>🔢 快速参考</h3>
      <div class="reference-grid">
        <div class="ref-item">
          <div class="ref-percent">10%</div>
          <div class="ref-decimal">= 0.1</div>
        </div>
        <div class="ref-item">
          <div class="ref-percent">25%</div>
          <div class="ref-decimal">= 0.25</div>
        </div>
        <div class="ref-item">
          <div class="ref-percent">50%</div>
          <div class="ref-decimal">= 0.5</div>
        </div>
        <div class="ref-item">
          <div class="ref-percent">75%</div>
          <div class="ref-decimal">= 0.75</div>
        </div>
        <div class="ref-item">
          <div class="ref-percent">100%</div>
          <div class="ref-decimal">= 1.0</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
}

.calc-card,
.reference-card {
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.calc-card h3,
.reference-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 16px;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 100px;
}

.input-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.input-field {
  flex: 1;
  padding: 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  outline: none;
  min-width: 80px;
}

.input-field:focus {
  border-color: var(--primary-color);
}

.operator {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}

.result-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  margin-bottom: 8px;
}

.result-box.secondary {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  padding: 12px 16px;
}

.result-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.result-value {
  font-size: 24px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--primary-color);
  flex: 1;
  text-align: center;
}

.result-value.positive {
  color: #10b981;
}

.result-value.negative {
  color: #ef4444;
}

.result-value.discount {
  color: #ef4444;
  font-size: 18px;
}

.result-value.final {
  color: var(--primary-color);
  font-size: 20px;
}

.result-value.saved {
  color: #10b981;
  font-size: 18px;
}

.copy-btn {
  padding: 8px 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--primary-hover);
  transform: scale(1.05);
}

.copy-btn-small {
  padding: 4px 8px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn-small:hover {
  background: var(--border-color);
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.result-item {
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  text-align: center;
  position: relative;
}

.result-item .result-label {
  font-size: 11px;
  margin-bottom: 6px;
}

.result-item .result-value {
  font-size: 18px;
}

.visual-bar {
  position: relative;
  height: 40px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 12px;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), #2563eb);
  transition: width 0.3s ease;
}

.bar-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
}

.reference-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 12px;
}

.ref-item {
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  text-align: center;
}

.ref-percent {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.ref-decimal {
  font-size: 13px;
  color: var(--text-secondary);
  font-family: 'Consolas', 'Monaco', monospace;
}

@media (max-width: 768px) {
  .tool-container {
    grid-template-columns: 1fr;
  }
  
  .result-grid {
    grid-template-columns: 1fr;
  }
  
  .input-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .input-field {
    min-width: auto;
  }
}
</style>
