<script setup>
import { ref, computed } from 'vue'

const method = ref('GET')
const url = ref('https://jsonplaceholder.typicode.com/posts/1')
const headers = ref('Content-Type: application/json')
const body = ref('')
const response = ref(null)
const loading = ref(false)
const statusColor = ref('')

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']

// 解析headers
const parseHeaders = () => {
  const headerObj = {}
  const lines = headers.value.split('\n')
  lines.forEach(line => {
    const [key, ...values] = line.split(':')
    if (key && values.length) {
      headerObj[key.trim()] = values.join(':').trim()
    }
  })
  return headerObj
}

// 发送请求
const sendRequest = async () => {
  if (!url.value.trim()) {
    alert('请输入URL')
    return
  }
  
  loading.value = true
  response.value = null
  
  const startTime = performance.now()
  
  try {
    const options = {
      method: method.value,
      headers: parseHeaders()
    }
    
    if (['POST', 'PUT', 'PATCH'].includes(method.value) && body.value) {
      options.body = body.value
    }
    
    const res = await fetch(url.value, options)
    const endTime = performance.now()
    
    let responseData
    const contentType = res.headers.get('content-type')
    
    if (contentType && contentType.includes('application/json')) {
      responseData = await res.json()
    } else {
      responseData = await res.text()
    }
    
    // 获取响应头
    const responseHeaders = {}
    res.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })
    
    response.value = {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
      data: responseData,
      time: Math.round(endTime - startTime),
      size: new Blob([JSON.stringify(responseData)]).size
    }
    
    // 设置状态颜色
    if (res.status >= 200 && res.status < 300) {
      statusColor.value = 'success'
    } else if (res.status >= 300 && res.status < 400) {
      statusColor.value = 'redirect'
    } else if (res.status >= 400 && res.status < 500) {
      statusColor.value = 'client-error'
    } else {
      statusColor.value = 'server-error'
    }
    
  } catch (error) {
    response.value = {
      error: true,
      message: error.message,
      stack: error.stack
    }
    statusColor.value = 'error'
  } finally {
    loading.value = false
  }
}

// 格式化响应数据
const formattedResponse = computed(() => {
  if (!response.value) return ''
  if (response.value.error) return JSON.stringify(response.value, null, 2)
  
  if (typeof response.value.data === 'object') {
    return JSON.stringify(response.value.data, null, 2)
  }
  return response.value.data
})

// 快速示例
const loadExample = (type) => {
  if (type === 'get') {
    method.value = 'GET'
    url.value = 'https://jsonplaceholder.typicode.com/posts/1'
    headers.value = 'Content-Type: application/json'
    body.value = ''
  } else if (type === 'post') {
    method.value = 'POST'
    url.value = 'https://jsonplaceholder.typicode.com/posts'
    headers.value = 'Content-Type: application/json'
    body.value = JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1
    }, null, 2)
  }
}

const copyResponse = async () => {
  try {
    await navigator.clipboard.writeText(formattedResponse.value)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const clear = () => {
  response.value = null
  url.value = ''
  headers.value = 'Content-Type: application/json'
  body.value = ''
}
</script>

<template>
  <div class="tool-container">
    <!-- 快速示例 -->
    <div class="examples">
      <button @click="loadExample('get')" class="example-btn">📖 GET示例</button>
      <button @click="loadExample('post')" class="example-btn">📤 POST示例</button>
    </div>

    <!-- 请求配置 -->
    <div class="request-section">
      <h3>🔌 请求配置</h3>
      
      <div class="url-row">
        <select v-model="method" class="method-select">
          <option v-for="m in methods" :key="m" :value="m">{{ m }}</option>
        </select>
        <input 
          v-model="url" 
          type="text" 
          placeholder="输入URL，例如：https://api.example.com/users"
          class="url-input"
        />
        <button @click="sendRequest" :disabled="loading" class="send-btn">
          {{ loading ? '⏳ 发送中...' : '🚀 发送' }}
        </button>
      </div>

      <div class="config-row">
        <div class="config-group">
          <label>请求头 (Headers)</label>
          <textarea 
            v-model="headers"
            placeholder="每行一个header，格式：Key: Value&#10;例如：&#10;Content-Type: application/json&#10;Authorization: Bearer token"
            class="config-textarea"
            rows="4"
          ></textarea>
        </div>

        <div v-if="['POST', 'PUT', 'PATCH'].includes(method)" class="config-group">
          <label>请求体 (Body)</label>
          <textarea 
            v-model="body"
            placeholder="输入请求体内容（JSON格式）"
            class="config-textarea"
            rows="4"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- 响应结果 -->
    <div v-if="response" class="response-section">
      <div class="response-header">
        <h3>📨 响应结果</h3>
        <div class="response-actions">
          <button @click="copyResponse" class="action-btn">📋 复制</button>
          <button @click="clear" class="action-btn">🗑️ 清空</button>
        </div>
      </div>

      <!-- 状态信息 -->
      <div v-if="!response.error" class="status-bar">
        <div class="status-item">
          <span class="status-badge" :class="statusColor">
            {{ response.status }} {{ response.statusText }}
          </span>
        </div>
        <div class="status-item">
          <span class="status-label">⏱️ 耗时</span>
          <span class="status-value">{{ response.time }}ms</span>
        </div>
        <div class="status-item">
          <span class="status-label">📦 大小</span>
          <span class="status-value">{{ (response.size / 1024).toFixed(2) }}KB</span>
        </div>
      </div>

      <!-- 响应头 -->
      <div v-if="!response.error && response.headers" class="headers-panel">
        <h4>📋 响应头</h4>
        <div class="headers-list">
          <div v-for="(value, key) in response.headers" :key="key" class="header-item">
            <span class="header-key">{{ key }}:</span>
            <span class="header-value">{{ value }}</span>
          </div>
        </div>
      </div>

      <!-- 响应体 -->
      <div class="body-panel">
        <h4>{{ response.error ? '❌ 错误信息' : '📄 响应体' }}</h4>
        <pre class="response-body">{{ formattedResponse }}</pre>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li>选择HTTP方法（GET、POST、PUT、PATCH、DELETE等）</li>
        <li>输入完整的URL地址</li>
        <li>可选：添加请求头（每行一个，格式：Key: Value）</li>
        <li>POST/PUT/PATCH：可添加请求体（支持JSON格式）</li>
        <li>点击发送按钮查看响应结果</li>
        <li>支持查看状态码、响应头、响应体、耗时等信息</li>
        <li>注意：某些API可能有跨域限制（CORS）</li>
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

.examples {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.example-btn {
  padding: 8px 16px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.example-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.request-section,
.response-section {
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

.url-row {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.method-select {
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  outline: none;
  cursor: pointer;
}

.url-input {
  flex: 1;
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 13px;
  color: var(--text-color);
  outline: none;
}

.url-input:focus {
  border-color: var(--primary-color);
}

.send-btn {
  padding: 10px 24px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.send-btn:hover:not(:disabled) {
  background: var(--primary-hover);
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.config-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.config-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.config-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
}

.config-textarea {
  width: 100%;
  padding: 10px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 12px;
  color: var(--text-color);
  outline: none;
  resize: vertical;
}

.config-textarea:focus {
  border-color: var(--primary-color);
}

.response-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.response-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
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

.action-btn:hover {
  background: var(--border-color);
}

.status-bar {
  display: flex;
  gap: 16px;
  padding: 12px;
  background: var(--card-bg);
  border-radius: 8px;
  margin-bottom: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.success {
  background: #d4edda;
  color: #155724;
}

.dark .status-badge.success {
  background: #1e4620;
  color: #4ade80;
}

.status-badge.client-error,
.status-badge.server-error,
.status-badge.error {
  background: #f8d7da;
  color: #721c24;
}

.dark .status-badge.client-error,
.dark .status-badge.server-error,
.dark .status-badge.error {
  background: #4a1a1e;
  color: #f87171;
}

.status-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.status-value {
  font-size: 12px;
  font-weight: 600;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
}

.headers-panel,
.body-panel {
  margin-bottom: 12px;
}

h4 {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.headers-list {
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
  background: var(--card-bg);
  border-radius: 6px;
}

.header-item {
  padding: 4px 0;
  font-size: 11px;
  font-family: 'Consolas', 'Monaco', monospace;
}

.header-key {
  color: var(--text-secondary);
  margin-right: 6px;
}

.header-value {
  color: var(--text-color);
}

.response-body {
  max-height: 400px;
  overflow: auto;
  padding: 12px;
  background: var(--card-bg);
  border-radius: 6px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 11px;
  line-height: 1.6;
  color: var(--text-color);
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
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
  .config-row {
    grid-template-columns: 1fr;
  }
  
  .url-row {
    flex-direction: column;
  }
}
</style>
