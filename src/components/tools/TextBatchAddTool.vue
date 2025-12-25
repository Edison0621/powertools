<script setup>
import { ref, computed } from 'vue'

const inputText = ref('')
const addPosition = ref('prefix') // prefix, suffix, custom
const prefixText = ref('')
const suffixText = ref('')
const customPosition = ref(0)
const customText = ref('')
const lineNumbering = ref(false)
const numberStart = ref(1)
const numberFormat = ref('1. ') // 1. , (1) , [1] , 1、

const outputText = computed(() => {
  if (!inputText.value.trim()) return ''
  
  const lines = inputText.value.split('\n')
  
  return lines.map((line, index) => {
    let result = line
    
    // 行号
    if (lineNumbering.value) {
      const num = numberStart.value + index
      const formattedNum = numberFormat.value
        .replace('1', num)
      result = formattedNum + result
    }
    
    // 根据位置添加文本
    if (addPosition.value === 'prefix') {
      result = prefixText.value + result
    } else if (addPosition.value === 'suffix') {
      result = result + suffixText.value
    } else if (addPosition.value === 'custom') {
      const pos = Math.max(0, Math.min(customPosition.value, result.length))
      result = result.slice(0, pos) + customText.value + result.slice(pos)
    } else if (addPosition.value === 'both') {
      result = prefixText.value + result + suffixText.value
    }
    
    return result
  }).join('\n')
})

const copy = async () => {
  try {
    await navigator.clipboard.writeText(outputText.value)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const clear = () => {
  inputText.value = ''
  prefixText.value = ''
  suffixText.value = ''
  customPosition.value = 0
  customText.value = ''
}

const loadExample = () => {
  inputText.value = `apple
banana
cherry
orange
grape`
  prefixText.value = '- '
  suffixText.value = ''
  addPosition.value = 'prefix'
}

// 预设模板
const templates = [
  { name: '无序列表', prefix: '- ', suffix: '', position: 'prefix' },
  { name: 'HTML列表', prefix: '<li>', suffix: '</li>', position: 'both' },
  { name: 'Markdown引用', prefix: '> ', suffix: '', position: 'prefix' },
  { name: 'CSS类', prefix: '.', suffix: ' {}', position: 'both' },
  { name: 'SQL值', prefix: '\'', suffix: '\',', position: 'both' },
  { name: 'JSON数组', prefix: '  "', suffix: '",', position: 'both' },
  { name: 'Python列表', prefix: '  \'', suffix: '\',', position: 'both' },
  { name: '注释', prefix: '// ', suffix: '', position: 'prefix' }
]

const useTemplate = (template) => {
  prefixText.value = template.prefix
  suffixText.value = template.suffix
  addPosition.value = template.position
}
</script>

<template>
  <div class="tool-container">
    <!-- 快速模板 -->
    <div class="templates-section">
      <h3>🎯 快速模板</h3>
      <div class="template-buttons">
        <button 
          v-for="template in templates" 
          :key="template.name"
          @click="useTemplate(template)"
          class="template-btn"
        >
          {{ template.name }}
        </button>
      </div>
    </div>

    <!-- 设置面板 -->
    <div class="settings-panel">
      <div class="settings-row">
        <label class="setting-label">添加位置</label>
        <div class="radio-group">
          <label class="radio-item">
            <input type="radio" v-model="addPosition" value="prefix" />
            <span>开头</span>
          </label>
          <label class="radio-item">
            <input type="radio" v-model="addPosition" value="suffix" />
            <span>结尾</span>
          </label>
          <label class="radio-item">
            <input type="radio" v-model="addPosition" value="both" />
            <span>开头+结尾</span>
          </label>
          <label class="radio-item">
            <input type="radio" v-model="addPosition" value="custom" />
            <span>指定位置</span>
          </label>
        </div>
      </div>

      <!-- 前缀设置 -->
      <div v-if="addPosition === 'prefix' || addPosition === 'both'" class="setting-group">
        <label>开头添加内容</label>
        <input 
          v-model="prefixText" 
          type="text" 
          placeholder="要添加到每行开头的文本"
          class="setting-input"
        />
      </div>

      <!-- 后缀设置 -->
      <div v-if="addPosition === 'suffix' || addPosition === 'both'" class="setting-group">
        <label>结尾添加内容</label>
        <input 
          v-model="suffixText" 
          type="text" 
          placeholder="要添加到每行结尾的文本"
          class="setting-input"
        />
      </div>

      <!-- 自定义位置 -->
      <div v-if="addPosition === 'custom'" class="custom-position-group">
        <div class="setting-group">
          <label>插入位置（字符索引）</label>
          <input 
            v-model.number="customPosition" 
            type="number" 
            min="0"
            placeholder="从0开始计数"
            class="setting-input"
          />
        </div>
        <div class="setting-group">
          <label>插入内容</label>
          <input 
            v-model="customText" 
            type="text" 
            placeholder="要插入的文本"
            class="setting-input"
          />
        </div>
      </div>

      <!-- 行号设置 -->
      <div class="setting-group">
        <label class="checkbox-label">
          <input type="checkbox" v-model="lineNumbering" />
          <span>添加行号</span>
        </label>
        
        <div v-if="lineNumbering" class="numbering-options">
          <div class="number-row">
            <label>起始数字</label>
            <input 
              v-model.number="numberStart" 
              type="number" 
              min="0"
              class="number-input"
            />
          </div>
          <div class="number-row">
            <label>格式</label>
            <select v-model="numberFormat" class="number-select">
              <option value="1. ">1. (点+空格)</option>
              <option value="1、">1、(顿号)</option>
              <option value="(1) ">(1) (括号+空格)</option>
              <option value="[1] ">[1] (方括号+空格)</option>
              <option value="1) ">1) (括号+空格)</option>
              <option value="1 ">1 (数字+空格)</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入输出区域 -->
    <div class="io-section">
      <div class="io-panel">
        <div class="io-header">
          <h3>📝 原始文本</h3>
          <div class="io-actions">
            <button @click="loadExample" class="action-btn">📋 示例</button>
            <button @click="clear" class="action-btn">🗑️ 清空</button>
          </div>
        </div>
        <textarea 
          v-model="inputText"
          placeholder="输入文本列表，每行一条&#10;例如：&#10;apple&#10;banana&#10;cherry"
          class="io-textarea"
        ></textarea>
        <div class="io-info">
          行数: {{ inputText.split('\n').filter(l => l.trim()).length }}
        </div>
      </div>

      <div class="io-panel">
        <div class="io-header">
          <h3>✨ 处理结果</h3>
          <div class="io-actions">
            <button @click="copy" class="action-btn primary">📋 复制</button>
          </div>
        </div>
        <textarea 
          :value="outputText"
          readonly
          placeholder="处理后的文本将在这里显示"
          class="io-textarea"
        ></textarea>
        <div class="io-info">
          行数: {{ outputText.split('\n').filter(l => l.trim()).length }}
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li><strong>开头</strong>：在每行文本的最前面添加指定内容</li>
        <li><strong>结尾</strong>：在每行文本的最后面添加指定内容</li>
        <li><strong>开头+结尾</strong>：同时在开头和结尾添加内容</li>
        <li><strong>指定位置</strong>：在每行的指定字符位置插入内容（从0开始）</li>
        <li><strong>添加行号</strong>：可以为每行添加自动递增的行号</li>
        <li><strong>快速模板</strong>：提供常用格式模板，一键应用</li>
        <li>支持空行保留，处理后行数保持一致</li>
      </ul>
    </div>

    <!-- 使用场景 -->
    <div class="examples-box">
      <h4>💡 使用场景</h4>
      <div class="example-grid">
        <div class="example-item">
          <div class="example-title">📝 Markdown列表</div>
          <div class="example-desc">添加 "- " 前缀生成无序列表</div>
        </div>
        <div class="example-item">
          <div class="example-title">💻 代码包装</div>
          <div class="example-desc">为变量名添加引号、括号等</div>
        </div>
        <div class="example-item">
          <div class="example-title">🗃️ SQL语句</div>
          <div class="example-desc">批量生成 INSERT 值列表</div>
        </div>
        <div class="example-item">
          <div class="example-title">🏷️ HTML标签</div>
          <div class="example-desc">为每行添加 &lt;li&gt; 标签</div>
        </div>
        <div class="example-item">
          <div class="example-title">📋 数据格式化</div>
          <div class="example-desc">统一添加前缀或后缀符号</div>
        </div>
        <div class="example-item">
          <div class="example-title">🔢 编号列表</div>
          <div class="example-desc">自动添加递增行号</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.templates-section {
  padding: 12px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.templates-section h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 10px;
}

.template-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.template-btn {
  padding: 8px 16px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.template-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.settings-panel {
  padding: 12px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.settings-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.radio-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color);
}

.radio-item input[type="radio"] {
  cursor: pointer;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.setting-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
}

.setting-input {
  padding: 8px 10px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-color);
  outline: none;
  font-family: 'Consolas', 'Monaco', monospace;
}

.setting-input:focus {
  border-color: var(--primary-color);
}

.custom-position-group {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.checkbox-label input[type="checkbox"] {
  cursor: pointer;
}

.numbering-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 10px;
  background: var(--card-bg);
  border-radius: 6px;
}

.number-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.number-row label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.number-input,
.number-select {
  padding: 8px 10px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-color);
  outline: none;
}

.io-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.io-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.io-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.io-header h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
}

.io-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--border-color);
}

.action-btn.primary {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.action-btn.primary:hover {
  background: var(--primary-hover);
}

.io-textarea {
  width: 100%;
  min-height: 450px;
  padding: 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.io-textarea:focus {
  border-color: var(--primary-color);
}

.io-info {
  font-size: 12px;
  color: var(--text-secondary);
  text-align: right;
  font-family: 'Consolas', 'Monaco', monospace;
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

.examples-box {
  padding: 10px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.examples-box h4 {
  margin-bottom: 8px;
  color: var(--text-color);
  font-size: 12px;
  font-weight: 700;
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 8px;
}

.example-item {
  padding: 8px 10px;
  background: var(--card-bg);
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.example-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 3px;
}

.example-desc {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.4;
}

@media (max-width: 1024px) {
  .io-section {
    grid-template-columns: 1fr;
  }
  
  .custom-position-group {
    grid-template-columns: 1fr;
  }
  
  .numbering-options {
    grid-template-columns: 1fr;
  }
}
</style>
