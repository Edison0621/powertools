<script setup>
import { ref, computed } from 'vue'

const decimal = ref(42)
const binary = ref('')
const octal = ref('')
const hexadecimal = ref('')

const updateFromDecimal = () => {
  const num = parseInt(decimal.value) || 0
  binary.value = num.toString(2)
  octal.value = num.toString(8)
  hexadecimal.value = num.toString(16).toUpperCase()
}

const updateFromBinary = () => {
  const num = parseInt(binary.value, 2) || 0
  decimal.value = num
  octal.value = num.toString(8)
  hexadecimal.value = num.toString(16).toUpperCase()
}

const updateFromOctal = () => {
  const num = parseInt(octal.value, 8) || 0
  decimal.value = num
  binary.value = num.toString(2)
  hexadecimal.value = num.toString(16).toUpperCase()
}

const updateFromHex = () => {
  const num = parseInt(hexadecimal.value, 16) || 0
  decimal.value = num
  binary.value = num.toString(2)
  octal.value = num.toString(8)
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text.toString())
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

// 初始化
updateFromDecimal()
</script>

<template>
  <div class="tool-container">
    <div class="converter-grid">
      <div class="base-card">
        <div class="base-header">
          <h3>十进制 (DEC)</h3>
          <span class="base-info">Base 10</span>
        </div>
        <input 
          v-model.number="decimal"
          @input="updateFromDecimal"
          type="number"
          class="base-input"
          placeholder="42"
        />
        <div class="base-footer">
          <span class="base-desc">0-9</span>
          <button @click="copy(decimal)" class="copy-btn">📋</button>
        </div>
      </div>

      <div class="base-card">
        <div class="base-header">
          <h3>二进制 (BIN)</h3>
          <span class="base-info">Base 2</span>
        </div>
        <input 
          v-model="binary"
          @input="updateFromBinary"
          type="text"
          class="base-input"
          placeholder="101010"
        />
        <div class="base-footer">
          <span class="base-desc">0-1</span>
          <button @click="copy(binary)" class="copy-btn">📋</button>
        </div>
      </div>

      <div class="base-card">
        <div class="base-header">
          <h3>八进制 (OCT)</h3>
          <span class="base-info">Base 8</span>
        </div>
        <input 
          v-model="octal"
          @input="updateFromOctal"
          type="text"
          class="base-input"
          placeholder="52"
        />
        <div class="base-footer">
          <span class="base-desc">0-7</span>
          <button @click="copy(octal)" class="copy-btn">📋</button>
        </div>
      </div>

      <div class="base-card">
        <div class="base-header">
          <h3>十六进制 (HEX)</h3>
          <span class="base-info">Base 16</span>
        </div>
        <input 
          v-model="hexadecimal"
          @input="updateFromHex"
          type="text"
          class="base-input"
          placeholder="2A"
        />
        <div class="base-footer">
          <span class="base-desc">0-9, A-F</span>
          <button @click="copy(hexadecimal)" class="copy-btn">📋</button>
        </div>
      </div>
    </div>

    <div class="conversion-table">
      <h3>常用转换对照表</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>十进制</th>
              <th>二进制</th>
              <th>八进制</th>
              <th>十六进制</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 16" :key="i">
              <td>{{ i - 1 }}</td>
              <td>{{ (i - 1).toString(2) }}</td>
              <td>{{ (i - 1).toString(8) }}</td>
              <td>{{ (i - 1).toString(16).toUpperCase() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 进制说明</h4>
      <ul>
        <li><strong>二进制 (Binary):</strong> 计算机底层使用，只有0和1</li>
        <li><strong>八进制 (Octal):</strong> 3位二进制为1位八进制</li>
        <li><strong>十进制 (Decimal):</strong> 日常使用的数字系统</li>
        <li><strong>十六进制 (Hexadecimal):</strong> 常用于颜色码、内存地址等</li>
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

.converter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.base-card {
  padding: 20px;
  background: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.2s;
}

.base-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.base-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.base-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
}

.base-info {
  font-size: 12px;
  color: var(--text-secondary);
  background: var(--card-bg);
  padding: 4px 8px;
  border-radius: 4px;
}

.base-input {
  width: 100%;
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  outline: none;
  margin-bottom: 12px;
}

.base-input:focus {
  border-color: var(--primary-color);
}

.base-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base-desc {
  font-size: 13px;
  color: var(--text-secondary);
  font-family: 'Consolas', 'Monaco', monospace;
}

.copy-btn {
  padding: 6px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--border-color);
}

.conversion-table {
  padding: 20px;
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

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: var(--card-bg);
}

th {
  padding: 12px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  border-bottom: 2px solid var(--border-color);
}

td {
  padding: 10px 12px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
}

tbody tr:hover {
  background: var(--card-bg);
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
  .converter-grid {
    grid-template-columns: 1fr;
  }
}
</style>
