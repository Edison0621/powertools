<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')

const modes = {
  uppercase: '全部大写',
  lowercase: '全部小写',
  capitalize: '首字母大写',
  camelCase: '驼峰命名',
  pascalCase: 'Pascal命名',
  snakeCase: '蛇形命名',
  kebabCase: '短横线命名',
  constantCase: '常量命名'
}

const convert = (mode) => {
  const text = input.value
  
  switch(mode) {
    case 'uppercase':
      output.value = text.toUpperCase()
      break
    case 'lowercase':
      output.value = text.toLowerCase()
      break
    case 'capitalize':
      output.value = text.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
      break
    case 'camelCase':
      output.value = text
        .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
        .replace(/^[A-Z]/, char => char.toLowerCase())
      break
    case 'pascalCase':
      output.value = text
        .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
        .replace(/^[a-z]/, char => char.toUpperCase())
      break
    case 'snakeCase':
      output.value = text
        .replace(/([A-Z])/g, '_$1')
        .replace(/[-\s]+/g, '_')
        .toLowerCase()
        .replace(/^_/, '')
      break
    case 'kebabCase':
      output.value = text
        .replace(/([A-Z])/g, '-$1')
        .replace(/[_\s]+/g, '-')
        .toLowerCase()
        .replace(/^-/, '')
      break
    case 'constantCase':
      output.value = text
        .replace(/([A-Z])/g, '_$1')
        .replace(/[-\s]+/g, '_')
        .toUpperCase()
        .replace(/^_/, '')
      break
  }
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const example = () => {
  input.value = 'hello world example'
}
</script>

<template>
  <div class="tool-container">
    <div class="input-section">
      <div class="section-header">
        <label>输入文本</label>
        <button @click="example" class="example-btn">📄 示例</button>
      </div>
      <textarea 
        v-model="input"
        placeholder="输入要转换的文本..."
        class="input-textarea"
      ></textarea>
    </div>

    <div class="converter-grid">
      <div 
        v-for="(label, mode) in modes" 
        :key="mode"
        class="converter-card"
        @click="convert(mode)"
      >
        <div class="card-header">
          <h4>{{ label }}</h4>
          <button 
            v-if="output && input"
            @click.stop="copy(output)" 
            class="mini-copy-btn"
          >
            📋
          </button>
        </div>
        <div class="card-content">
          <code>{{ output || '点击转换' }}</code>
        </div>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 命名规范说明</h4>
      <ul>
        <li><strong>驼峰命名 (camelCase):</strong> helloWorld - 常用于JavaScript变量</li>
        <li><strong>Pascal命名 (PascalCase):</strong> HelloWorld - 常用于类名</li>
        <li><strong>蛇形命名 (snake_case):</strong> hello_world - 常用于Python</li>
        <li><strong>短横线命名 (kebab-case):</strong> hello-world - 常用于CSS类名</li>
        <li><strong>常量命名 (CONSTANT_CASE):</strong> HELLO_WORLD - 常用于常量</li>
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

.input-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header label {
  font-weight: 600;
  font-size: 16px;
  color: var(--text-color);
}

.example-btn {
  padding: 6px 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.example-btn:hover {
  background: var(--border-color);
}

.input-textarea {
  width: 100%;
  min-height: 120px;
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.input-textarea:focus {
  border-color: var(--primary-color);
}

.converter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.converter-card {
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.converter-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-header h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.mini-copy-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
  padding: 4px;
}

.mini-copy-btn:hover {
  opacity: 1;
}

.card-content {
  padding: 12px;
  background: var(--card-bg);
  border-radius: 6px;
  min-height: 50px;
  display: flex;
  align-items: center;
}

.card-content code {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  color: var(--text-color);
  word-break: break-all;
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
