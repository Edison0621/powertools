<script setup>
import { ref } from 'vue'

const host = ref('')
const port = ref(80)
const results = ref([])
const scanning = ref(false)

const commonPorts = [
  { port: 21, name: 'FTP', description: 'File Transfer Protocol' },
  { port: 22, name: 'SSH', description: 'Secure Shell' },
  { port: 23, name: 'Telnet', description: 'Telnet' },
  { port: 25, name: 'SMTP', description: 'Simple Mail Transfer Protocol' },
  { port: 53, name: 'DNS', description: 'Domain Name System' },
  { port: 80, name: 'HTTP', description: 'Hypertext Transfer Protocol' },
  { port: 110, name: 'POP3', description: 'Post Office Protocol v3' },
  { port: 143, name: 'IMAP', description: 'Internet Message Access Protocol' },
  { port: 443, name: 'HTTPS', description: 'HTTP Secure' },
  { port: 465, name: 'SMTPS', description: 'SMTP Secure' },
  { port: 587, name: 'SMTP', description: 'SMTP (submission)' },
  { port: 993, name: 'IMAPS', description: 'IMAP Secure' },
  { port: 995, name: 'POP3S', description: 'POP3 Secure' },
  { port: 3306, name: 'MySQL', description: 'MySQL Database' },
  { port: 3389, name: 'RDP', description: 'Remote Desktop Protocol' },
  { port: 5432, name: 'PostgreSQL', description: 'PostgreSQL Database' },
  { port: 6379, name: 'Redis', description: 'Redis Database' },
  { port: 8080, name: 'HTTP-Alt', description: 'HTTP Alternate' },
  { port: 8443, name: 'HTTPS-Alt', description: 'HTTPS Alternate' },
  { port: 27017, name: 'MongoDB', description: 'MongoDB Database' }
]

const checkPort = async (targetHost, targetPort) => {
  // 注意：浏览器环境无法直接检测端口
  // 这里使用HTTP/HTTPS请求来间接检测常见的Web端口
  const isWebPort = [80, 443, 8080, 8443].includes(targetPort)
  
  if (!isWebPort) {
    return {
      port: targetPort,
      status: 'unknown',
      message: '浏览器环境无法检测非Web端口',
      time: 0
    }
  }
  
  const protocol = [443, 8443].includes(targetPort) ? 'https' : 'http'
  const url = `${protocol}://${targetHost}:${targetPort}`
  
  const startTime = Date.now()
  
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    const response = await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    const time = Date.now() - startTime
    
    return {
      port: targetPort,
      status: 'open',
      message: '端口开放',
      time: time
    }
  } catch (e) {
    const time = Date.now() - startTime
    
    if (e.name === 'AbortError') {
      return {
        port: targetPort,
        status: 'timeout',
        message: '连接超时',
        time: 5000
      }
    }
    
    // no-cors模式下，即使CORS错误也说明端口是开放的
    if (e.message.includes('CORS') || e.message.includes('NetworkError')) {
      return {
        port: targetPort,
        status: 'filtered',
        message: '可能开放（CORS限制）',
        time: time
      }
    }
    
    return {
      port: targetPort,
      status: 'closed',
      message: '端口关闭或无法访问',
      time: time
    }
  }
}

const scanSinglePort = async () => {
  if (!host.value.trim()) {
    alert('请输入主机地址')
    return
  }
  
  if (!port.value || port.value < 1 || port.value > 65535) {
    alert('请输入有效的端口号 (1-65535)')
    return
  }
  
  scanning.value = true
  const result = await checkPort(host.value, port.value)
  
  const portInfo = commonPorts.find(p => p.port === port.value)
  if (portInfo) {
    result.name = portInfo.name
    result.description = portInfo.description
  }
  
  results.value = [result]
  scanning.value = false
}

const scanCommonPorts = async () => {
  if (!host.value.trim()) {
    alert('请输入主机地址')
    return
  }
  
  scanning.value = true
  results.value = []
  
  // 只扫描可以通过浏览器检测的Web端口
  const webPorts = commonPorts.filter(p => [80, 443, 8080, 8443].includes(p.port))
  
  for (const portInfo of webPorts) {
    const result = await checkPort(host.value, portInfo.port)
    result.name = portInfo.name
    result.description = portInfo.description
    results.value.push(result)
  }
  
  scanning.value = false
}

const clear = () => {
  host.value = ''
  port.value = 80
  results.value = []
}

const quickHost = (h) => {
  host.value = h
}

const getStatusClass = (status) => {
  return {
    'open': 'status-open',
    'closed': 'status-closed',
    'filtered': 'status-filtered',
    'timeout': 'status-timeout',
    'unknown': 'status-unknown'
  }[status] || ''
}

const getStatusIcon = (status) => {
  return {
    'open': '✓',
    'closed': '✗',
    'filtered': '?',
    'timeout': '⏱',
    'unknown': '－'
  }[status] || '?'
}
</script>

<template>
  <div class="tool-container">
    <div class="warning-box">
      <h4>⚠️ 重要说明</h4>
      <p>由于浏览器安全限制，本工具只能检测 <strong>HTTP(80/8080)</strong> 和 <strong>HTTPS(443/8443)</strong> 端口。</p>
      <p>其他端口需要使用专业的网络工具（如 nmap, telnet）进行检测。</p>
    </div>

    <div class="input-section">
      <div class="input-group">
        <label>主机地址</label>
        <input 
          v-model="host"
          type="text"
          placeholder="例如: google.com 或 8.8.8.8"
          class="host-input"
        />
      </div>
      
      <div class="input-group">
        <label>端口号</label>
        <input 
          v-model.number="port"
          type="number"
          min="1"
          max="65535"
          class="port-input"
        />
      </div>

      <button @click="scanSinglePort" class="scan-btn" :disabled="scanning">
        {{ scanning ? '检测中...' : '🔍 检测单个端口' }}
      </button>
      
      <button @click="scanCommonPorts" class="scan-btn secondary" :disabled="scanning">
        {{ scanning ? '扫描中...' : '🔎 扫描Web端口' }}
      </button>
      
      <button @click="clear" class="clear-btn">🗑️ 清空</button>
    </div>

    <div class="quick-hosts">
      <span class="quick-label">快速测试：</span>
      <button @click="quickHost('google.com')" class="quick-btn">google.com</button>
      <button @click="quickHost('github.com')" class="quick-btn">github.com</button>
      <button @click="quickHost('cloudflare.com')" class="quick-btn">cloudflare.com</button>
      <button @click="quickHost('localhost')" class="quick-btn">localhost</button>
    </div>

    <div v-if="scanning" class="loading-state">
      <div class="spinner"></div>
      <p>正在检测端口...</p>
    </div>

    <div v-if="results.length > 0" class="results-section">
      <div class="result-header">
        <h3>📊 检测结果</h3>
        <div class="result-summary">
          <span class="summary-item open">
            开放: {{ results.filter(r => r.status === 'open').length }}
          </span>
          <span class="summary-item filtered">
            可能开放: {{ results.filter(r => r.status === 'filtered').length }}
          </span>
          <span class="summary-item closed">
            关闭: {{ results.filter(r => r.status === 'closed').length }}
          </span>
          <span class="summary-item unknown">
            未知: {{ results.filter(r => r.status === 'unknown').length }}
          </span>
        </div>
      </div>

      <div class="results-grid">
        <div 
          v-for="(result, index) in results" 
          :key="index"
          :class="['result-card', getStatusClass(result.status)]"
        >
          <div class="card-header">
            <div class="port-info">
              <span class="port-number">{{ result.port }}</span>
              <span v-if="result.name" class="port-name">{{ result.name }}</span>
            </div>
            <div class="status-badge">
              <span class="status-icon">{{ getStatusIcon(result.status) }}</span>
            </div>
          </div>
          
          <div class="card-body">
            <div v-if="result.description" class="port-desc">
              {{ result.description }}
            </div>
            <div class="status-message">{{ result.message }}</div>
            <div class="response-time">响应时间: {{ result.time }}ms</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <h4>📌 常用端口列表</h4>
      <div class="ports-grid">
        <div v-for="port in commonPorts" :key="port.port" class="port-item">
          <div class="port-header">
            <span class="port-num">{{ port.port }}</span>
            <span class="port-protocol">{{ port.name }}</span>
          </div>
          <div class="port-detail">{{ port.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.warning-box {
  padding: 16px;
  background: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 12px;
}

.dark .warning-box {
  background: #3d3000;
  border-color: #f59e0b;
}

.warning-box h4 {
  margin-bottom: 8px;
  color: #856404;
  font-size: 14px;
}

.dark .warning-box h4 {
  color: #fbbf24;
}

.warning-box p {
  margin: 6px 0;
  color: #856404;
  font-size: 13px;
  line-height: 1.6;
}

.dark .warning-box p {
  color: #fcd34d;
}

.warning-box strong {
  font-weight: 700;
}

.input-section {
  display: grid;
  grid-template-columns: 2fr 1fr auto auto auto;
  gap: 12px;
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  align-items: end;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.host-input,
.port-input {
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.host-input:focus,
.port-input:focus {
  border-color: var(--primary-color);
}

.scan-btn,
.clear-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.scan-btn {
  background: var(--primary-color);
  color: white;
}

.scan-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.scan-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.scan-btn.secondary {
  background: #10b981;
}

.scan-btn.secondary:hover:not(:disabled) {
  background: #059669;
}

.clear-btn {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.clear-btn:hover {
  background: var(--border-color);
}

.quick-hosts {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.quick-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.quick-btn {
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

.quick-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.loading-state {
  text-align: center;
  padding: 40px;
  color: var(--text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 16px;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.results-section {
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.result-header {
  margin-bottom: 16px;
}

.result-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

.result-summary {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.summary-item {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 6px;
}

.summary-item.open {
  background: #d1fae5;
  color: #065f46;
}

.dark .summary-item.open {
  background: #06402533;
  color: #10b981;
}

.summary-item.filtered {
  background: #fef3c7;
  color: #92400e;
}

.dark .summary-item.filtered {
  background: #78350f33;
  color: #f59e0b;
}

.summary-item.closed {
  background: #fee2e2;
  color: #991b1b;
}

.dark .summary-item.closed {
  background: #7f1d1d33;
  color: #ef4444;
}

.summary-item.unknown {
  background: var(--card-bg);
  color: var(--text-secondary);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.result-card {
  padding: 16px;
  border-radius: 10px;
  border: 2px solid;
}

.result-card.status-open {
  background: #d1fae5;
  border-color: #10b981;
}

.dark .result-card.status-open {
  background: #06402533;
  border-color: #10b981;
}

.result-card.status-filtered {
  background: #fef3c7;
  border-color: #f59e0b;
}

.dark .result-card.status-filtered {
  background: #78350f33;
  border-color: #f59e0b;
}

.result-card.status-closed,
.result-card.status-timeout {
  background: #fee2e2;
  border-color: #ef4444;
}

.dark .result-card.status-closed,
.dark .result-card.status-timeout {
  background: #7f1d1d33;
  border-color: #ef4444;
}

.result-card.status-unknown {
  background: var(--card-bg);
  border-color: var(--border-color);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.port-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.port-number {
  font-size: 24px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
}

.port-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.status-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  font-size: 20px;
}

.dark .status-badge {
  background: var(--bg-color);
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.port-desc {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 600;
}

.status-message {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.response-time {
  font-size: 11px;
  color: var(--text-secondary);
  font-family: 'Consolas', 'Monaco', monospace;
}

.info-box {
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-box h4 {
  margin-bottom: 12px;
  color: var(--text-color);
  font-size: 13px;
}

.ports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
}

.port-item {
  padding: 10px;
  background: var(--card-bg);
  border-radius: 6px;
}

.port-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.port-num {
  font-size: 16px;
  font-weight: 700;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--primary-color);
}

.port-protocol {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.port-detail {
  font-size: 10px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .input-section {
    grid-template-columns: 1fr;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .ports-grid {
    grid-template-columns: 1fr;
  }
}
</style>
