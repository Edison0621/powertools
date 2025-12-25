<script setup>
import { ref } from 'vue'

const domain = ref('')
const recordType = ref('A')
const loading = ref(false)
const error = ref('')
const results = ref(null)

const recordTypes = [
  { value: 'A', label: 'A - IPv4地址', description: 'IPv4地址记录' },
  { value: 'AAAA', label: 'AAAA - IPv6地址', description: 'IPv6地址记录' },
  { value: 'CNAME', label: 'CNAME - 别名', description: '规范名称记录' },
  { value: 'MX', label: 'MX - 邮件服务器', description: '邮件交换记录' },
  { value: 'NS', label: 'NS - 域名服务器', description: '名称服务器记录' },
  { value: 'TXT', label: 'TXT - 文本', description: '文本记录' },
  { value: 'SOA', label: 'SOA - 授权', description: '授权起始记录' },
  { value: 'PTR', label: 'PTR - 反向', description: '指针记录' }
]

const lookup = async () => {
  if (!domain.value.trim()) {
    error.value = '请输入域名'
    return
  }
  
  loading.value = true
  error.value = ''
  results.value = null
  
  try {
    // 使用Google DNS over HTTPS API
    const dnsType = getDnsTypeCode(recordType.value)
    const url = `https://dns.google/resolve?name=${encodeURIComponent(domain.value)}&type=${dnsType}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.Status !== 0) {
      error.value = `DNS查询失败: ${getDnsErrorMessage(data.Status)}`
      return
    }
    
    if (!data.Answer || data.Answer.length === 0) {
      error.value = `未找到 ${recordType.value} 记录`
      return
    }
    
    results.value = {
      domain: domain.value,
      type: recordType.value,
      records: data.Answer.map(record => ({
        name: record.name,
        type: getDnsTypeName(record.type),
        ttl: record.TTL,
        data: record.data
      })),
      authority: data.Authority || [],
      additional: data.Additional || []
    }
  } catch (e) {
    error.value = '查询失败: ' + e.message
  } finally {
    loading.value = false
  }
}

const getDnsTypeCode = (type) => {
  const types = {
    'A': 1,
    'AAAA': 28,
    'CNAME': 5,
    'MX': 15,
    'NS': 2,
    'TXT': 16,
    'SOA': 6,
    'PTR': 12
  }
  return types[type] || 1
}

const getDnsTypeName = (code) => {
  const types = {
    1: 'A',
    28: 'AAAA',
    5: 'CNAME',
    15: 'MX',
    2: 'NS',
    16: 'TXT',
    6: 'SOA',
    12: 'PTR'
  }
  return types[code] || code.toString()
}

const getDnsErrorMessage = (status) => {
  const messages = {
    1: '格式错误',
    2: '服务器失败',
    3: '域名不存在',
    4: '不支持的查询类型',
    5: '拒绝查询'
  }
  return messages[status] || `错误代码: ${status}`
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
  domain.value = ''
  results.value = null
  error.value = ''
}

const quickDomain = (d) => {
  domain.value = d
  lookup()
}
</script>

<template>
  <div class="tool-container">
    <div class="input-section">
      <div class="input-group">
        <label>域名</label>
        <input 
          v-model="domain"
          type="text"
          placeholder="例如: google.com"
          class="domain-input"
          @keyup.enter="lookup"
        />
      </div>
      
      <div class="input-group">
        <label>记录类型</label>
        <select v-model="recordType" class="type-select">
          <option v-for="type in recordTypes" :key="type.value" :value="type.value">
            {{ type.label }}
          </option>
        </select>
      </div>

      <button @click="lookup" class="lookup-btn" :disabled="loading">
        {{ loading ? '查询中...' : '🔍 查询' }}
      </button>
      
      <button @click="clear" class="clear-btn">🗑️ 清空</button>
    </div>

    <div class="quick-domains">
      <span class="quick-label">快速测试：</span>
      <button @click="quickDomain('google.com')" class="quick-btn">google.com</button>
      <button @click="quickDomain('github.com')" class="quick-btn">github.com</button>
      <button @click="quickDomain('cloudflare.com')" class="quick-btn">cloudflare.com</button>
    </div>

    <div v-if="error" class="error-message">
      ⚠️ {{ error }}
    </div>

    <div v-if="loading && !results" class="loading-state">
      <div class="spinner"></div>
      <p>正在查询DNS记录...</p>
    </div>

    <div v-if="results" class="results-section">
      <div class="result-header">
        <h3>📋 查询结果</h3>
        <div class="result-meta">
          <span class="meta-item">域名: {{ results.domain }}</span>
          <span class="meta-item">类型: {{ results.type }}</span>
          <span class="meta-item">记录数: {{ results.records.length }}</span>
        </div>
      </div>

      <div class="records-table">
        <div class="table-header">
          <div class="col-name">名称</div>
          <div class="col-type">类型</div>
          <div class="col-ttl">TTL</div>
          <div class="col-data">数据</div>
          <div class="col-action"></div>
        </div>
        
        <div 
          v-for="(record, index) in results.records" 
          :key="index"
          class="table-row"
        >
          <div class="col-name">{{ record.name }}</div>
          <div class="col-type">
            <span class="type-badge">{{ record.type }}</span>
          </div>
          <div class="col-ttl">{{ record.ttl }}s</div>
          <div class="col-data">{{ record.data }}</div>
          <div class="col-action">
            <button @click="copy(record.data)" class="copy-btn-mini">📋</button>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ DNS记录类型说明</h4>
      <div class="type-grid">
        <div v-for="type in recordTypes" :key="type.value" class="type-card">
          <div class="type-name">{{ type.value }}</div>
          <div class="type-desc">{{ type.description }}</div>
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

.input-section {
  display: grid;
  grid-template-columns: 2fr 1fr auto auto;
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

.domain-input,
.type-select {
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.domain-input:focus,
.type-select:focus {
  border-color: var(--primary-color);
}

.lookup-btn,
.clear-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.lookup-btn {
  background: var(--primary-color);
  color: white;
}

.lookup-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.lookup-btn:disabled {
  opacity: 0.6;
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

.quick-domains {
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

.error-message {
  padding: 12px;
  background: #fee;
  color: #c33;
  border-radius: 8px;
  border-left: 4px solid #c33;
  font-size: 14px;
}

.dark .error-message {
  background: #4a1515;
  color: #ff6b6b;
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
  margin-bottom: 8px;
}

.result-meta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 600;
}

.records-table {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 2fr 80px 80px 3fr 50px;
  gap: 12px;
  padding: 12px;
  align-items: center;
}

.table-header {
  background: var(--bg-color);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.table-row {
  background: var(--card-bg);
  font-size: 13px;
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
}

.table-row:last-child {
  border-bottom: none;
}

.col-name,
.col-data {
  font-family: 'Consolas', 'Monaco', monospace;
  word-break: break-all;
}

.type-badge {
  display: inline-block;
  padding: 4px 8px;
  background: var(--primary-color);
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
}

.col-ttl {
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-secondary);
}

.copy-btn-mini {
  padding: 4px 8px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn-mini:hover {
  background: var(--border-color);
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

.type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
}

.type-card {
  padding: 10px;
  background: var(--card-bg);
  border-radius: 6px;
}

.type-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.type-desc {
  font-size: 11px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .input-section {
    grid-template-columns: 1fr;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .table-header {
    display: none;
  }
  
  .table-row > div::before {
    content: attr(data-label);
    font-weight: 700;
    margin-right: 8px;
  }
}
</style>
