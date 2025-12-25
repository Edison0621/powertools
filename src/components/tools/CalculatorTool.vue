<script setup>
import { ref, computed } from 'vue'

const display = ref('0')
const previousValue = ref(null)
const operator = ref(null)
const waitingForOperand = ref(false)
const memory = ref(0)

const scientificMode = ref(false)
const angleUnit = ref('deg') // deg, rad

const inputDigit = (digit) => {
  if (waitingForOperand.value) {
    display.value = String(digit)
    waitingForOperand.value = false
  } else {
    display.value = display.value === '0' ? String(digit) : display.value + digit
  }
}

const inputDecimal = () => {
  if (waitingForOperand.value) {
    display.value = '0.'
    waitingForOperand.value = false
  } else if (display.value.indexOf('.') === -1) {
    display.value += '.'
  }
}

const clear = () => {
  display.value = '0'
  previousValue.value = null
  operator.value = null
  waitingForOperand.value = false
}

const clearEntry = () => {
  display.value = '0'
}

const performOperation = (nextOperator) => {
  const inputValue = parseFloat(display.value)

  if (previousValue.value === null) {
    previousValue.value = inputValue
  } else if (operator.value) {
    const currentValue = previousValue.value || 0
    const newValue = calculate(currentValue, inputValue, operator.value)
    
    display.value = String(newValue)
    previousValue.value = newValue
  }

  waitingForOperand.value = true
  operator.value = nextOperator
}

const calculate = (firstValue, secondValue, operator) => {
  switch (operator) {
    case '+': return firstValue + secondValue
    case '-': return firstValue - secondValue
    case '×': return firstValue * secondValue
    case '÷': return secondValue !== 0 ? firstValue / secondValue : 'Error'
    case '%': return firstValue % secondValue
    case '^': return Math.pow(firstValue, secondValue)
    default: return secondValue
  }
}

const equals = () => {
  const inputValue = parseFloat(display.value)
  
  if (operator.value && previousValue.value !== null) {
    const newValue = calculate(previousValue.value, inputValue, operator.value)
    display.value = String(newValue)
    previousValue.value = null
    operator.value = null
    waitingForOperand.value = true
  }
}

const toggleSign = () => {
  const value = parseFloat(display.value)
  display.value = String(-value)
}

const percentage = () => {
  const value = parseFloat(display.value)
  display.value = String(value / 100)
}

// 科学计算功能
const toRadians = (degrees) => {
  return degrees * (Math.PI / 180)
}

const scientificFunction = (func) => {
  const value = parseFloat(display.value)
  let result
  
  switch(func) {
    case 'sin':
      result = angleUnit.value === 'deg' ? Math.sin(toRadians(value)) : Math.sin(value)
      break
    case 'cos':
      result = angleUnit.value === 'deg' ? Math.cos(toRadians(value)) : Math.cos(value)
      break
    case 'tan':
      result = angleUnit.value === 'deg' ? Math.tan(toRadians(value)) : Math.tan(value)
      break
    case 'sqrt':
      result = Math.sqrt(value)
      break
    case 'square':
      result = value * value
      break
    case 'cube':
      result = value * value * value
      break
    case 'log':
      result = Math.log10(value)
      break
    case 'ln':
      result = Math.log(value)
      break
    case 'exp':
      result = Math.exp(value)
      break
    case '1/x':
      result = 1 / value
      break
    case 'abs':
      result = Math.abs(value)
      break
    case 'factorial':
      result = factorial(Math.floor(value))
      break
    default:
      result = value
  }
  
  display.value = String(result)
  waitingForOperand.value = true
}

const factorial = (n) => {
  if (n < 0) return NaN
  if (n === 0 || n === 1) return 1
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}

const insertConstant = (constant) => {
  switch(constant) {
    case 'pi':
      display.value = String(Math.PI)
      break
    case 'e':
      display.value = String(Math.E)
      break
  }
  waitingForOperand.value = true
}

// 内存功能
const memoryClear = () => {
  memory.value = 0
}

const memoryRecall = () => {
  display.value = String(memory.value)
  waitingForOperand.value = true
}

const memoryAdd = () => {
  memory.value += parseFloat(display.value)
}

const memorySubtract = () => {
  memory.value -= parseFloat(display.value)
}

const memoryStore = () => {
  memory.value = parseFloat(display.value)
}

const hasMemory = computed(() => memory.value !== 0)
</script>

<template>
  <div class="calculator">
    <!-- 显示屏 -->
    <div class="display-section">
      <div class="memory-indicator" v-if="hasMemory">M</div>
      <div class="display">{{ display }}</div>
      <div class="operator-display" v-if="operator">{{ operator }}</div>
    </div>

    <!-- 模式切换 -->
    <div class="mode-toggle">
      <button 
        @click="scientificMode = !scientificMode"
        class="mode-btn"
      >
        {{ scientificMode ? '基础' : '科学' }}
      </button>
      <button 
        v-if="scientificMode"
        @click="angleUnit = angleUnit === 'deg' ? 'rad' : 'deg'"
        class="angle-btn"
      >
        {{ angleUnit.toUpperCase() }}
      </button>
    </div>

    <div class="calculator-body">
      <!-- 科学计算按钮 -->
      <div v-if="scientificMode" class="scientific-panel">
        <button @click="scientificFunction('sin')" class="sci-btn">sin</button>
        <button @click="scientificFunction('cos')" class="sci-btn">cos</button>
        <button @click="scientificFunction('tan')" class="sci-btn">tan</button>
        <button @click="scientificFunction('sqrt')" class="sci-btn">√</button>
        
        <button @click="scientificFunction('log')" class="sci-btn">log</button>
        <button @click="scientificFunction('ln')" class="sci-btn">ln</button>
        <button @click="scientificFunction('exp')" class="sci-btn">e^x</button>
        <button @click="performOperation('^')" class="sci-btn">x^y</button>
        
        <button @click="scientificFunction('square')" class="sci-btn">x²</button>
        <button @click="scientificFunction('cube')" class="sci-btn">x³</button>
        <button @click="scientificFunction('1/x')" class="sci-btn">1/x</button>
        <button @click="scientificFunction('abs')" class="sci-btn">|x|</button>
        
        <button @click="insertConstant('pi')" class="sci-btn">π</button>
        <button @click="insertConstant('e')" class="sci-btn">e</button>
        <button @click="scientificFunction('factorial')" class="sci-btn">n!</button>
        <button @click="performOperation('%')" class="sci-btn">mod</button>
      </div>

      <!-- 基础按钮区 -->
      <div class="buttons-grid">
        <!-- 第一行：内存和清除 -->
        <button @click="memoryClear" class="mem-btn">MC</button>
        <button @click="memoryRecall" class="mem-btn">MR</button>
        <button @click="memoryStore" class="mem-btn">MS</button>
        <button @click="memoryAdd" class="mem-btn">M+</button>
        <button @click="memorySubtract" class="mem-btn">M-</button>

        <!-- 第二行：功能按钮 + 除法 -->
        <button @click="clear" class="func-btn">C</button>
        <button @click="clearEntry" class="func-btn">CE</button>
        <button @click="toggleSign" class="func-btn">+/-</button>
        <button @click="percentage" class="func-btn">%</button>
        <button @click="performOperation('÷')" class="operator-btn">÷</button>

        <!-- 第三行：7 8 9 × -->
        <button @click="inputDigit(7)" class="num-btn">7</button>
        <button @click="inputDigit(8)" class="num-btn">8</button>
        <button @click="inputDigit(9)" class="num-btn">9</button>
        <button @click="inputDigit(0)" class="num-btn">0</button>
        <button @click="performOperation('×')" class="operator-btn">×</button>

        <!-- 第四行：4 5 6 - -->
        <button @click="inputDigit(4)" class="num-btn">4</button>
        <button @click="inputDigit(5)" class="num-btn">5</button>
        <button @click="inputDigit(6)" class="num-btn">6</button>
        <button @click="inputDecimal" class="num-btn">.</button>
        <button @click="performOperation('-')" class="operator-btn">-</button>

        <!-- 第五行：1 2 3 + -->
        <button @click="inputDigit(1)" class="num-btn">1</button>
        <button @click="inputDigit(2)" class="num-btn">2</button>
        <button @click="inputDigit(3)" class="num-btn">3</button>
        <button @click="equals" class="equals-btn" style="grid-row: span 2;">=</button>
        <button @click="performOperation('+')" class="operator-btn">+</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calculator {
  max-width: 400px;
  margin: 0 auto;
  background: var(--card-bg);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow);
}

.display-section {
  position: relative;
  margin-bottom: 16px;
}

.memory-indicator {
  position: absolute;
  top: 8px;
  left: 12px;
  font-size: 12px;
  font-weight: 700;
  color: var(--primary-color);
}

.display {
  background: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  text-align: right;
  font-size: 32px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
  min-height: 60px;
  word-break: break-all;
  overflow: auto;
}

.operator-display {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
}

.mode-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.mode-btn,
.angle-btn {
  flex: 1;
  padding: 8px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-btn:hover,
.angle-btn:hover {
  background: var(--primary-hover);
}

.calculator-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.scientific-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.sci-btn {
  padding: 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.sci-btn:hover {
  background: var(--border-color);
  transform: translateY(-1px);
}

.sci-btn:active {
  transform: translateY(0);
}

.buttons-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

button {
  padding: 16px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.mem-btn {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 13px;
}

.mem-btn:hover {
  background: var(--border-color);
}

.func-btn {
  background: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.func-btn:hover {
  background: var(--border-color);
}

.num-btn {
  background: var(--card-bg);
  color: var(--text-color);
  border: 2px solid var(--border-color);
}

.num-btn:hover {
  background: var(--bg-color);
  transform: translateY(-2px);
}

.num-btn:active {
  transform: translateY(0);
}

.operator-btn {
  background: var(--primary-color);
  color: white;
}

.operator-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}

.operator-btn:active {
  transform: translateY(0);
}

.equals-btn {
  background: #10b981;
  color: white;
}

.equals-btn:hover {
  background: #059669;
  transform: translateY(-2px);
}

.equals-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .calculator {
    max-width: 100%;
  }
  
  .buttons-grid {
    grid-template-columns: repeat(5, 1fr);
  }
  
  button {
    padding: 14px;
    font-size: 16px;
  }
}
</style>
