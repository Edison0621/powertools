<script setup>
import { ref, computed, watch } from 'vue'

const category = ref('length')
const fromValue = ref(1)
const fromUnit = ref('meter')
const toUnit = ref('kilometer')

// 单位转换配置
const units = {
  length: {
    name: '长度',
    icon: '📏',
    units: {
      meter: { name: '米 (m)', toBase: 1 },
      kilometer: { name: '千米 (km)', toBase: 1000 },
      centimeter: { name: '厘米 (cm)', toBase: 0.01 },
      millimeter: { name: '毫米 (mm)', toBase: 0.001 },
      mile: { name: '英里 (mi)', toBase: 1609.344 },
      yard: { name: '码 (yd)', toBase: 0.9144 },
      foot: { name: '英尺 (ft)', toBase: 0.3048 },
      inch: { name: '英寸 (in)', toBase: 0.0254 },
      nauticalMile: { name: '海里 (nmi)', toBase: 1852 }
    }
  },
  weight: {
    name: '重量',
    icon: '⚖️',
    units: {
      kilogram: { name: '千克 (kg)', toBase: 1 },
      gram: { name: '克 (g)', toBase: 0.001 },
      milligram: { name: '毫克 (mg)', toBase: 0.000001 },
      ton: { name: '吨 (t)', toBase: 1000 },
      pound: { name: '磅 (lb)', toBase: 0.453592 },
      ounce: { name: '盎司 (oz)', toBase: 0.0283495 },
      carat: { name: '克拉 (ct)', toBase: 0.0002 }
    }
  },
  temperature: {
    name: '温度',
    icon: '🌡️',
    units: {
      celsius: { name: '摄氏度 (°C)' },
      fahrenheit: { name: '华氏度 (°F)' },
      kelvin: { name: '开尔文 (K)' }
    }
  },
  volume: {
    name: '体积',
    icon: '🧊',
    units: {
      liter: { name: '升 (L)', toBase: 1 },
      milliliter: { name: '毫升 (mL)', toBase: 0.001 },
      cubicMeter: { name: '立方米 (m³)', toBase: 1000 },
      cubicCentimeter: { name: '立方厘米 (cm³)', toBase: 0.001 },
      gallon: { name: '加仑 (gal)', toBase: 3.78541 },
      quart: { name: '夸脱 (qt)', toBase: 0.946353 },
      pint: { name: '品脱 (pt)', toBase: 0.473176 },
      cup: { name: '杯 (cup)', toBase: 0.236588 },
      fluidOunce: { name: '液盎司 (fl oz)', toBase: 0.0295735 }
    }
  },
  area: {
    name: '面积',
    icon: '📐',
    units: {
      squareMeter: { name: '平方米 (m²)', toBase: 1 },
      squareKilometer: { name: '平方千米 (km²)', toBase: 1000000 },
      squareCentimeter: { name: '平方厘米 (cm²)', toBase: 0.0001 },
      hectare: { name: '公顷 (ha)', toBase: 10000 },
      acre: { name: '英亩 (ac)', toBase: 4046.86 },
      squareMile: { name: '平方英里 (mi²)', toBase: 2589988 },
      squareYard: { name: '平方码 (yd²)', toBase: 0.836127 },
      squareFoot: { name: '平方英尺 (ft²)', toBase: 0.092903 }
    }
  },
  time: {
    name: '时间',
    icon: '⏱️',
    units: {
      second: { name: '秒 (s)', toBase: 1 },
      minute: { name: '分钟 (min)', toBase: 60 },
      hour: { name: '小时 (h)', toBase: 3600 },
      day: { name: '天 (d)', toBase: 86400 },
      week: { name: '周 (wk)', toBase: 604800 },
      month: { name: '月 (mo)', toBase: 2592000 },
      year: { name: '年 (yr)', toBase: 31536000 }
    }
  },
  speed: {
    name: '速度',
    icon: '🏃',
    units: {
      meterPerSecond: { name: '米/秒 (m/s)', toBase: 1 },
      kilometerPerHour: { name: '千米/小时 (km/h)', toBase: 0.277778 },
      milePerHour: { name: '英里/小时 (mph)', toBase: 0.44704 },
      knot: { name: '节 (kn)', toBase: 0.514444 },
      footPerSecond: { name: '英尺/秒 (ft/s)', toBase: 0.3048 }
    }
  },
  data: {
    name: '数据',
    icon: '💾',
    units: {
      byte: { name: '字节 (B)', toBase: 1 },
      kilobyte: { name: '千字节 (KB)', toBase: 1024 },
      megabyte: { name: '兆字节 (MB)', toBase: 1048576 },
      gigabyte: { name: '吉字节 (GB)', toBase: 1073741824 },
      terabyte: { name: '太字节 (TB)', toBase: 1099511627776 },
      petabyte: { name: '拍字节 (PB)', toBase: 1125899906842624 }
    }
  }
}

// 温度转换特殊处理
const convertTemperature = (value, from, to) => {
  if (from === to) return value
  
  let celsius = value
  if (from === 'fahrenheit') {
    celsius = (value - 32) * 5 / 9
  } else if (from === 'kelvin') {
    celsius = value - 273.15
  }
  
  if (to === 'fahrenheit') {
    return celsius * 9 / 5 + 32
  } else if (to === 'kelvin') {
    return celsius + 273.15
  }
  return celsius
}

// 计算转换结果
const toValue = computed(() => {
  if (!fromValue.value || isNaN(fromValue.value)) return 0
  
  const currentCategory = units[category.value]
  
  // 温度特殊处理
  if (category.value === 'temperature') {
    return convertTemperature(parseFloat(fromValue.value), fromUnit.value, toUnit.value)
  }
  
  // 其他单位：先转换到基础单位，再转换到目标单位
  const fromUnitData = currentCategory.units[fromUnit.value]
  const toUnitData = currentCategory.units[toUnit.value]
  
  const baseValue = parseFloat(fromValue.value) * fromUnitData.toBase
  return baseValue / toUnitData.toBase
})

// 当分类改变时，重置单位选择
watch(category, (newCategory) => {
  const unitKeys = Object.keys(units[newCategory].units)
  fromUnit.value = unitKeys[0]
  toUnit.value = unitKeys[1] || unitKeys[0]
})

const swap = () => {
  const temp = fromUnit.value
  fromUnit.value = toUnit.value
  toUnit.value = temp
  fromValue.value = toValue.value
}

const copy = async (value) => {
  try {
    await navigator.clipboard.writeText(value.toString())
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const currentUnits = computed(() => units[category.value].units)
</script>

<template>
  <div class="tool-container">
    <!-- 分类选择 -->
    <div class="category-selector">
      <button
        v-for="(data, key) in units"
        :key="key"
        @click="category = key"
        :class="['category-btn', { active: category === key }]"
      >
        <span class="category-icon">{{ data.icon }}</span>
        <span>{{ data.name }}</span>
      </button>
    </div>

    <!-- 转换区域 -->
    <div class="converter-section">
      <!-- 源单位 -->
      <div class="unit-card">
        <label>从</label>
        <select v-model="fromUnit" class="unit-select">
          <option
            v-for="(unitData, key) in currentUnits"
            :key="key"
            :value="key"
          >
            {{ unitData.name }}
          </option>
        </select>
        <input
          v-model.number="fromValue"
          type="number"
          class="value-input"
          placeholder="输入数值"
        />
      </div>

      <!-- 交换按钮 -->
      <button @click="swap" class="swap-btn">
        ⇄
      </button>

      <!-- 目标单位 -->
      <div class="unit-card">
        <label>到</label>
        <select v-model="toUnit" class="unit-select">
          <option
            v-for="(unitData, key) in currentUnits"
            :key="key"
            :value="key"
          >
            {{ unitData.name }}
          </option>
        </select>
        <div class="result-display">
          <span class="result-value">{{ toValue.toFixed(6) }}</span>
          <button @click="copy(toValue.toFixed(6))" class="copy-icon">📋</button>
        </div>
      </div>
    </div>

    <!-- 常用转换表 -->
    <div class="conversion-table">
      <h3>{{ fromValue }} {{ currentUnits[fromUnit].name }} =</h3>
      <div class="table-grid">
        <div
          v-for="(unitData, key) in currentUnits"
          :key="key"
          class="table-item"
          @click="toUnit = key"
          :class="{ active: toUnit === key }"
        >
          <div class="table-unit">{{ unitData.name }}</div>
          <div class="table-value">
            {{ 
              category === 'temperature' 
                ? convertTemperature(parseFloat(fromValue) || 0, fromUnit, key).toFixed(2)
                : ((parseFloat(fromValue) || 0) * currentUnits[fromUnit].toBase / unitData.toBase).toFixed(6)
            }}
          </div>
        </div>
      </div>
    </div>

    <!-- 说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用提示</h4>
      <ul>
        <li>输入数值后自动计算转换结果</li>
        <li>点击 ⇄ 按钮可快速交换单位</li>
        <li>点击表格中的单位可快速设置为目标单位</li>
        <li>支持小数和负数</li>
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

.category-selector {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.category-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.category-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.category-icon {
  font-size: 18px;
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

.unit-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.unit-card label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}

.unit-select {
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  cursor: pointer;
  outline: none;
}

.unit-select:focus {
  border-color: var(--primary-color);
}

.value-input {
  padding: 16px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  outline: none;
  font-family: 'Consolas', 'Monaco', monospace;
}

.value-input:focus {
  border-color: var(--primary-color);
}

.result-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--primary-color);
  border-radius: 10px;
  min-height: 70px;
}

.result-value {
  font-size: 24px;
  font-weight: 700;
  color: white;
  font-family: 'Consolas', 'Monaco', monospace;
  word-break: break-all;
}

.copy-icon {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-icon:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.swap-btn {
  width: 48px;
  height: 48px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-color);
}

.swap-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: rotate(180deg);
}

.conversion-table {
  padding: 24px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.conversion-table h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 16px;
}

.table-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.table-item {
  padding: 12px 16px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.table-item:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.table-item.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.table-item.active .table-unit,
.table-item.active .table-value {
  color: white;
}

.table-unit {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
  font-weight: 600;
}

.table-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  font-family: 'Consolas', 'Monaco', monospace;
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
  padding: 6px 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

.info-box li::before {
  content: '✓ ';
  color: var(--primary-color);
  font-weight: bold;
  margin-right: 8px;
}

@media (max-width: 768px) {
  .converter-section {
    grid-template-columns: 1fr;
  }
  
  .swap-btn {
    transform: rotate(90deg);
  }
  
  .swap-btn:hover {
    transform: rotate(270deg);
  }
  
  .category-selector {
    gap: 6px;
  }
  
  .category-btn {
    padding: 8px 12px;
    font-size: 13px;
  }
  
  .table-grid {
    grid-template-columns: 1fr;
  }
}
</style>
