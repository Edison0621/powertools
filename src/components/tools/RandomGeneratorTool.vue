<script setup>
import { ref } from 'vue'

const dataType = ref('number')
const count = ref(10)
const output = ref('')

// 数字选项
const numberMin = ref(1)
const numberMax = ref(100)
const numberDecimals = ref(0)

// 字符串选项
const stringLength = ref(10)
const includeUpper = ref(true)
const includeLower = ref(true)
const includeNumbers = ref(true)
const includeSymbols = ref(false)

// 日期选项
const dateStart = ref('2025-01-01')
const dateEnd = ref('2025-12-31')
const dateFormat = ref('YYYY-MM-DD')

// 生成随机数字
const generateNumbers = () => {
  const results = []
  for (let i = 0; i < count.value; i++) {
    const num = Math.random() * (numberMax.value - numberMin.value) + numberMin.value
    results.push(numberDecimals.value > 0 ? num.toFixed(numberDecimals.value) : Math.floor(num))
  }
  output.value = results.join('\n')
}

// 生成随机字符串
const generateStrings = () => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  let chars = ''
  if (includeUpper.value) chars += upper
  if (includeLower.value) chars += lower
  if (includeNumbers.value) chars += numbers
  if (includeSymbols.value) chars += symbols
  
  if (!chars) {
    output.value = '请至少选择一种字符类型'
    return
  }
  
  const results = []
  for (let i = 0; i < count.value; i++) {
    let str = ''
    for (let j = 0; j < stringLength.value; j++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    results.push(str)
  }
  output.value = results.join('\n')
}

// 生成随机日期
const generateDates = () => {
  const start = new Date(dateStart.value).getTime()
  const end = new Date(dateEnd.value).getTime()
  
  const results = []
  for (let i = 0; i < count.value; i++) {
    const timestamp = start + Math.random() * (end - start)
    const date = new Date(timestamp)
    
    let formatted = dateFormat.value
    formatted = formatted.replace('YYYY', date.getFullYear())
    formatted = formatted.replace('MM', String(date.getMonth() + 1).padStart(2, '0'))
    formatted = formatted.replace('DD', String(date.getDate()).padStart(2, '0'))
    formatted = formatted.replace('HH', String(date.getHours()).padStart(2, '0'))
    formatted = formatted.replace('mm', String(date.getMinutes()).padStart(2, '0'))
    formatted = formatted.replace('ss', String(date.getSeconds()).padStart(2, '0'))
    
    results.push(formatted)
  }
  output.value = results.join('\n')
}

// 生成邮箱
const generateEmails = () => {
  const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'qq.com', '163.com', 'hotmail.com']
  const results = []
  
  for (let i = 0; i < count.value; i++) {
    const username = 'user' + Math.random().toString(36).substring(2, 10)
    const domain = domains[Math.floor(Math.random() * domains.length)]
    results.push(`${username}@${domain}`)
  }
  output.value = results.join('\n')
}

// 生成电话号码
const generatePhones = () => {
  const results = []
  const prefixes = ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139',
                    '150', '151', '152', '153', '155', '156', '157', '158', '159',
                    '180', '181', '182', '183', '184', '185', '186', '187', '188', '189']
  
  for (let i = 0; i < count.value; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0')
    results.push(`${prefix}${number}`)
  }
  output.value = results.join('\n')
}

// 生成姓名
const generateNames = () => {
  const surnames = ['王', '李', '张', '刘', '陈', '杨', '黄', '赵', '周', '吴', '徐', '孙', '马', '朱', '胡', '郭', '何', '高', '林', '罗']
  const names = ['伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '涛', '明', '超', '秀', '华', '文', '玲']
  
  const results = []
  for (let i = 0; i < count.value; i++) {
    const surname = surnames[Math.floor(Math.random() * surnames.length)]
    const name1 = names[Math.floor(Math.random() * names.length)]
    const name2 = Math.random() > 0.5 ? names[Math.floor(Math.random() * names.length)] : ''
    results.push(surname + name1 + name2)
  }
  output.value = results.join('\n')
}

// 生成颜色
const generateColors = () => {
  const results = []
  for (let i = 0; i < count.value; i++) {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    results.push(color.toUpperCase())
  }
  output.value = results.join('\n')
}

// 生成UUID
const generateUUIDs = () => {
  const results = []
  for (let i = 0; i < count.value; i++) {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
    results.push(uuid)
  }
  output.value = results.join('\n')
}

// 生成
const generate = () => {
  switch (dataType.value) {
    case 'number':
      generateNumbers()
      break
    case 'string':
      generateStrings()
      break
    case 'date':
      generateDates()
      break
    case 'email':
      generateEmails()
      break
    case 'phone':
      generatePhones()
      break
    case 'name':
      generateNames()
      break
    case 'color':
      generateColors()
      break
    case 'uuid':
      generateUUIDs()
      break
  }
}

const copy = async () => {
  try {
    await navigator.clipboard.writeText(output.value)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const clear = () => {
  output.value = ''
}

// 初始生成
generate()
</script>

<template>
  <div class="tool-container">
    <!-- 类型选择 -->
    <div class="type-section">
      <label>数据类型</label>
      <select v-model="dataType" @change="generate" class="type-select">
        <option value="number">🔢 随机数字</option>
        <option value="string">🔤 随机字符串</option>
        <option value="date">📅 随机日期</option>
        <option value="email">📧 邮箱地址</option>
        <option value="phone">📱 手机号码</option>
        <option value="name">👤 中文姓名</option>
        <option value="color">🎨 颜色代码</option>
        <option value="uuid">🆔 UUID</option>
      </select>
    </div>

    <!-- 通用设置 -->
    <div class="settings-section">
      <div class="setting-item">
        <label>生成数量</label>
        <input v-model.number="count" type="number" min="1" max="1000" class="count-input" />
      </div>
    </div>

    <!-- 数字选项 -->
    <div v-if="dataType === 'number'" class="options-section">
      <h4>数字选项</h4>
      <div class="options-grid">
        <div class="option-item">
          <label>最小值</label>
          <input v-model.number="numberMin" type="number" class="option-input" />
        </div>
        <div class="option-item">
          <label>最大值</label>
          <input v-model.number="numberMax" type="number" class="option-input" />
        </div>
        <div class="option-item">
          <label>小数位数</label>
          <input v-model.number="numberDecimals" type="number" min="0" max="10" class="option-input" />
        </div>
      </div>
    </div>

    <!-- 字符串选项 -->
    <div v-if="dataType === 'string'" class="options-section">
      <h4>字符串选项</h4>
      <div class="options-grid">
        <div class="option-item">
          <label>字符串长度</label>
          <input v-model.number="stringLength" type="number" min="1" max="100" class="option-input" />
        </div>
      </div>
      <div class="checkboxes">
        <label class="checkbox-label">
          <input v-model="includeUpper" type="checkbox" />
          <span>大写字母</span>
        </label>
        <label class="checkbox-label">
          <input v-model="includeLower" type="checkbox" />
          <span>小写字母</span>
        </label>
        <label class="checkbox-label">
          <input v-model="includeNumbers" type="checkbox" />
          <span>数字</span>
        </label>
        <label class="checkbox-label">
          <input v-model="includeSymbols" type="checkbox" />
          <span>特殊符号</span>
        </label>
      </div>
    </div>

    <!-- 日期选项 -->
    <div v-if="dataType === 'date'" class="options-section">
      <h4>日期选项</h4>
      <div class="options-grid">
        <div class="option-item">
          <label>开始日期</label>
          <input v-model="dateStart" type="date" class="option-input" />
        </div>
        <div class="option-item">
          <label>结束日期</label>
          <input v-model="dateEnd" type="date" class="option-input" />
        </div>
        <div class="option-item">
          <label>日期格式</label>
          <select v-model="dateFormat" class="option-input">
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            <option value="YYYY/MM/DD">YYYY/MM/DD</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD HH:mm:ss">YYYY-MM-DD HH:mm:ss</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 生成按钮 -->
    <div class="action-section">
      <button @click="generate" class="generate-btn">🎲 生成</button>
      <button @click="copy" class="copy-btn" :disabled="!output">📋 复制</button>
      <button @click="clear" class="clear-btn">🗑️ 清空</button>
    </div>

    <!-- 结果 -->
    <div class="result-section">
      <div class="result-header">
        <h3>📊 生成结果 ({{ output.split('\n').filter(l => l).length }} 条)</h3>
      </div>
      <textarea 
        v-model="output" 
        readonly 
        class="result-output"
        placeholder="点击生成按钮生成随机数据..."
      ></textarea>
    </div>

    <!-- 说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li>选择数据类型，设置生成数量和相关选项</li>
        <li>支持生成1-1000条随机数据</li>
        <li>每种数据类型都有专门的配置选项</li>
        <li>生成的数据可以直接复制用于测试</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.type-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.type-section label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.type-select {
  width: 100%;
  padding: 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  cursor: pointer;
  outline: none;
}

.type-select:focus {
  border-color: var(--primary-color);
}

.settings-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.setting-item label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  min-width: 80px;
}

.count-input {
  flex: 1;
  max-width: 200px;
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.count-input:focus {
  border-color: var(--primary-color);
}

.options-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.options-section h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.option-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.option-item label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.option-input {
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.option-input:focus {
  border-color: var(--primary-color);
}

.checkboxes {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  cursor: pointer;
  user-select: none;
}

.checkbox-label input {
  cursor: pointer;
}

.action-section {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.generate-btn,
.copy-btn,
.clear-btn {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.generate-btn {
  background: var(--primary-color);
  color: white;
}

.generate-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.copy-btn {
  background: #10b981;
  color: white;
}

.copy-btn:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-1px);
}

.copy-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.clear-btn {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.clear-btn:hover {
  background: var(--border-color);
}

.result-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.result-header {
  margin-bottom: 12px;
}

.result-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
}

.result-output {
  width: 100%;
  min-height: 300px;
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.result-output:focus {
  border-color: var(--primary-color);
}

.info-box {
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-box h4 {
  margin-bottom: 8px;
  color: var(--text-color);
  font-size: 13px;
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
  .options-grid {
    grid-template-columns: 1fr;
  }
  
  .action-section {
    flex-direction: column;
  }
}
</style>
