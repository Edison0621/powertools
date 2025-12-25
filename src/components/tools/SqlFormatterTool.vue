<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const indentSize = ref(2)
const uppercase = ref(true)

const keywords = [
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER',
  'ON', 'AND', 'OR', 'IN', 'NOT', 'NULL', 'IS', 'AS', 'ORDER', 'BY',
  'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'INTO', 'VALUES',
  'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER',
  'INDEX', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'DISTINCT',
  'UNION', 'ALL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'EXISTS',
  'BETWEEN', 'LIKE', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN'
]

const formatSQL = () => {
  if (!input.value.trim()) {
    output.value = ''
    return
  }

  try {
    let sql = input.value.trim()
    
    // 移除多余空格
    sql = sql.replace(/\s+/g, ' ')
    
    // 在关键字前后添加换行
    const indent = ' '.repeat(indentSize.value)
    
    // 处理主要子句
    sql = sql.replace(/\b(SELECT|FROM|WHERE|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|ORDER BY|GROUP BY|HAVING|UNION)\b/gi, '\n$1')
    sql = sql.replace(/\b(INSERT INTO|UPDATE|DELETE FROM|CREATE TABLE|DROP TABLE|ALTER TABLE)\b/gi, '\n$1')
    
    // 处理逗号
    sql = sql.replace(/,\s*/g, ',\n' + indent)
    
    // 处理AND/OR
    sql = sql.replace(/\b(AND|OR)\b/gi, '\n' + indent + '$1')
    
    // 处理VALUES
    sql = sql.replace(/\bVALUES\b/gi, '\nVALUES')
    
    // 转换大小写
    if (uppercase.value) {
      keywords.forEach(keyword => {
        const regex = new RegExp('\\b' + keyword + '\\b', 'gi')
        sql = sql.replace(regex, keyword.toUpperCase())
      })
    } else {
      keywords.forEach(keyword => {
        const regex = new RegExp('\\b' + keyword + '\\b', 'gi')
        sql = sql.replace(regex, keyword.toLowerCase())
      })
    }
    
    // 清理多余换行
    sql = sql.replace(/\n\s*\n/g, '\n')
    sql = sql.trim()
    
    output.value = sql
  } catch (e) {
    output.value = '格式化失败: ' + e.message
  }
}

const minify = () => {
  if (!input.value.trim()) {
    output.value = ''
    return
  }

  let sql = input.value.trim()
  // 移除多余空格和换行
  sql = sql.replace(/\s+/g, ' ')
  sql = sql.replace(/\s*([(),;])\s*/g, '$1')
  output.value = sql
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const clear = () => {
  input.value = ''
  output.value = ''
}

const example = () => {
  input.value = `SELECT u.id, u.name, u.email, o.order_id, o.total FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.status = 'active' AND o.total > 100 ORDER BY o.created_at DESC LIMIT 10`
  formatSQL()
}
</script>

<template>
  <div class="tool-container">
    <div class="settings-panel">
      <div class="setting-group">
        <label>缩进空格数</label>
        <input 
          v-model.number="indentSize" 
          type="number" 
          min="2" 
          max="8"
          class="number-input"
        />
      </div>
      
      <label class="checkbox-label">
        <input v-model="uppercase" type="checkbox" />
        <span>关键字大写</span>
      </label>

      <div class="button-group">
        <button @click="formatSQL" class="action-btn primary">✨ 格式化</button>
        <button @click="minify" class="action-btn">📦 压缩</button>
        <button @click="example" class="action-btn">📄 示例</button>
        <button @click="clear" class="action-btn">🗑️ 清空</button>
      </div>
    </div>

    <div class="io-container">
      <div class="io-section">
        <div class="io-header">
          <label>输入 SQL</label>
        </div>
        <textarea 
          v-model="input"
          placeholder="输入SQL语句..."
          class="io-textarea"
        ></textarea>
      </div>

      <div class="io-section">
        <div class="io-header">
          <label>格式化结果</label>
          <button @click="copy(output)" class="copy-btn" :disabled="!output">
            📋 复制
          </button>
        </div>
        <textarea 
          v-model="output"
          readonly
          placeholder="格式化后的SQL..."
          class="io-textarea"
        ></textarea>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 支持的功能</h4>
      <ul>
        <li>自动格式化SQL语句，提升可读性</li>
        <li>支持主流SQL关键字（SELECT, JOIN, WHERE等）</li>
        <li>可调整缩进空格数（2-8）</li>
        <li>关键字大小写转换</li>
        <li>SQL压缩（去除空格和换行）</li>
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

.settings-panel {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.setting-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.setting-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  white-space: nowrap;
}

.number-input {
  width: 60px;
  padding: 6px 8px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  cursor: pointer;
  user-select: none;
}

.checkbox-label input {
  cursor: pointer;
}

.button-group {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.action-btn {
  padding: 6px 12px;
  background: var(--bg-color);
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

.io-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.io-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.io-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.io-header label {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-color);
}

.copy-btn {
  padding: 6px 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.copy-btn:hover:not(:disabled) {
  background: var(--border-color);
}

.copy-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.io-textarea {
  width: 100%;
  min-height: 350px;
  padding: 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
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
  content: '✓ ';
  color: var(--primary-color);
  font-weight: bold;
  margin-right: 6px;
}

@media (max-width: 768px) {
  .io-container {
    grid-template-columns: 1fr;
  }
  
  .button-group {
    margin-left: 0;
    width: 100%;
  }
  
  .action-btn {
    flex: 1;
  }
}
</style>
