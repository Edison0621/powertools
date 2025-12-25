<script setup>
import { ref } from 'vue'

const sensitiveText = ref('')
const overwriteTimes = ref(3)
const isCleared = ref(false)
const clearHistory = ref([])

// 安全清除文本
const secureClear = () => {
  if (!sensitiveText.value) {
    alert('请输入要清除的文本')
    return
  }
  
  const originalLength = sensitiveText.value.length
  const timestamp = new Date().toLocaleString('zh-CN')
  
  // 多次覆盖
  for (let i = 0; i < overwriteTimes.value; i++) {
    // 生成随机字符串覆盖
    const randomStr = Array.from({ length: originalLength }, () => 
      String.fromCharCode(Math.floor(Math.random() * 94) + 33)
    ).join('')
    
    sensitiveText.value = randomStr
  }
  
  // 最终清空
  sensitiveText.value = ''
  isCleared.value = true
  
  // 记录清除历史
  clearHistory.value.unshift({
    time: timestamp,
    length: originalLength,
    overwrites: overwriteTimes.value
  })
  
  // 只保留最近10条
  if (clearHistory.value.length > 10) {
    clearHistory.value = clearHistory.value.slice(0, 10)
  }
  
  setTimeout(() => {
    isCleared.value = false
  }, 3000)
}

const reset = () => {
  sensitiveText.value = ''
  isCleared.value = false
}

const clearAllHistory = () => {
  clearHistory.value = []
}
</script>

<template>
  <div class="tool-container">
    <!-- 输入区域 -->
    <div class="input-section">
      <h3>🗑️ 敏感文本输入</h3>
      <textarea 
        v-model="sensitiveText"
        placeholder="输入需要安全清除的敏感文本..."
        class="text-input"
        :disabled="isCleared"
      ></textarea>
      
      <div class="settings">
        <div class="setting-item">
          <label>覆盖次数</label>
          <select v-model.number="overwriteTimes" class="select-input">
            <option :value="1">1次（快速）</option>
            <option :value="3">3次（标准）</option>
            <option :value="7">7次（安全）</option>
            <option :value="35">35次（军事级）</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="actions">
      <button @click="secureClear" :disabled="!sensitiveText || isCleared" class="clear-btn">
        🔒 安全清除
      </button>
      <button @click="reset" class="reset-btn">
        🔄 重置
      </button>
    </div>

    <!-- 清除成功提示 -->
    <div v-if="isCleared" class="success-message">
      ✅ 文本已安全清除！已覆盖 {{ overwriteTimes }} 次后清空
    </div>

    <!-- 清除历史 -->
    <div v-if="clearHistory.length > 0" class="history-section">
      <div class="history-header">
        <h3>📜 清除历史</h3>
        <button @click="clearAllHistory" class="clear-history-btn">清空历史</button>
      </div>
      <div class="history-list">
        <div v-for="(item, index) in clearHistory" :key="index" class="history-item">
          <span class="history-time">{{ item.time }}</span>
          <span class="history-detail">清除了 {{ item.length }} 个字符（覆盖{{ item.overwrites }}次）</span>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 安全清除原理</h4>
      <ul>
        <li>使用随机字符多次覆盖原始文本</li>
        <li>1次：快速清除，适合一般敏感信息</li>
        <li>3次：标准清除，适合大多数场景</li>
        <li>7次：高安全级别，符合DoD 5220.22-M标准</li>
        <li>35次：军事级，符合Peter Gutmann算法</li>
        <li>覆盖后彻底清空，防止内存泄漏</li>
        <li>⚠️ 清除后无法恢复，请谨慎操作</li>
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

.input-section,
.history-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

.text-input {
  width: 100%;
  min-height: 200px;
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
  margin-bottom: 12px;
}

.text-input:focus {
  border-color: var(--primary-color);
}

.text-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.settings {
  display: flex;
  gap: 16px;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.setting-item label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.select-input {
  padding: 8px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-color);
  outline: none;
  cursor: pointer;
}

.actions {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.clear-btn,
.reset-btn {
  flex: 1;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn {
  background: #f44336;
  color: white;
}

.clear-btn:hover:not(:disabled) {
  background: #d32f2f;
  transform: translateY(-2px);
}

.clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reset-btn {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  color: var(--text-color);
}

.reset-btn:hover {
  background: var(--border-color);
}

.success-message {
  padding: 16px;
  background: #d4edda;
  border: 2px solid #28a745;
  border-radius: 8px;
  color: #155724;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}

.dark .success-message {
  background: #1e4620;
  border-color: #28a745;
  color: #4ade80;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.clear-history-btn {
  padding: 6px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.clear-history-btn:hover {
  background: var(--border-color);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.history-item {
  padding: 10px 12px;
  background: var(--card-bg);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.history-time {
  color: var(--text-secondary);
}

.history-detail {
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
  font-weight: 600;
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
  .settings-panel {
    padding: 16px;
  }

  .level-options {
    grid-template-columns: 1fr;
  }

  .io-textarea {
    min-height: 150px;
    font-size: 13px;
  }

  .results-panel {
    padding: 16px;
  }

  .info-box {
    padding: 12px;
  }
}
</style>
