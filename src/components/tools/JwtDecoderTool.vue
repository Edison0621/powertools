<script setup>
import { ref, computed } from 'vue'

const jwtToken = ref('')
const header = ref(null)
const payload = ref(null)
const signature = ref('')
const error = ref('')

const parseJWT = () => {
  error.value = ''
  header.value = null
  payload.value = null
  signature.value = ''
  
  if (!jwtToken.value.trim()) {
    return
  }
  
  try {
    const parts = jwtToken.value.trim().split('.')
    
    if (parts.length !== 3) {
      error.value = 'JWT格式错误：应包含3个部分（Header.Payload.Signature）'
      return
    }
    
    // 解析 Header
    try {
      const headerDecoded = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'))
      header.value = JSON.parse(headerDecoded)
    } catch (e) {
      error.value = 'Header 解析失败：' + e.message
      return
    }
    
    // 解析 Payload
    try {
      const payloadDecoded = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
      payload.value = JSON.parse(payloadDecoded)
    } catch (e) {
      error.value = 'Payload 解析失败：' + e.message
      return
    }
    
    // 保存 Signature
    signature.value = parts[2]
    
  } catch (e) {
    error.value = '解析失败：' + e.message
  }
}

const isExpired = computed(() => {
  if (!payload.value || !payload.value.exp) return null
  const now = Math.floor(Date.now() / 1000)
  return now > payload.value.exp
})

const expiryTime = computed(() => {
  if (!payload.value || !payload.value.exp) return null
  return new Date(payload.value.exp * 1000).toLocaleString('zh-CN')
})

const issuedTime = computed(() => {
  if (!payload.value || !payload.value.iat) return null
  return new Date(payload.value.iat * 1000).toLocaleString('zh-CN')
})

const notBeforeTime = computed(() => {
  if (!payload.value || !payload.value.nbf) return null
  return new Date(payload.value.nbf * 1000).toLocaleString('zh-CN')
})

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const copyJson = (obj) => {
  copy(JSON.stringify(obj, null, 2))
}

const clear = () => {
  jwtToken.value = ''
  header.value = null
  payload.value = null
  signature.value = ''
  error.value = ''
}

const example = () => {
  // 示例 JWT（仅用于演示，已过期）
  jwtToken.value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  parseJWT()
}
</script>

<template>
  <div class="tool-container">
    <div class="input-section">
      <div class="section-header">
        <label>JWT Token</label>
        <div class="header-actions">
          <button @click="example" class="action-btn">📄 示例</button>
          <button @click="clear" class="action-btn">🗑️ 清空</button>
        </div>
      </div>
      <textarea 
        v-model="jwtToken"
        @input="parseJWT"
        placeholder="粘贴 JWT Token..."
        class="jwt-input"
      ></textarea>
      <button @click="parseJWT" class="parse-btn">🔍 解析</button>
    </div>

    <div v-if="error" class="error-message">
      ⚠️ {{ error }}
    </div>

    <div v-if="header || payload" class="results-container">
      <!-- Header -->
      <div v-if="header" class="result-card">
        <div class="card-header">
          <h3>📋 Header</h3>
          <button @click="copyJson(header)" class="copy-btn">📋 复制</button>
        </div>
        <pre class="json-display">{{ JSON.stringify(header, null, 2) }}</pre>
        
        <div class="info-grid">
          <div class="info-item" v-if="header.alg">
            <span class="info-label">算法 (alg):</span>
            <span class="info-value">{{ header.alg }}</span>
          </div>
          <div class="info-item" v-if="header.typ">
            <span class="info-label">类型 (typ):</span>
            <span class="info-value">{{ header.typ }}</span>
          </div>
          <div class="info-item" v-if="header.kid">
            <span class="info-label">密钥ID (kid):</span>
            <span class="info-value">{{ header.kid }}</span>
          </div>
        </div>
      </div>

      <!-- Payload -->
      <div v-if="payload" class="result-card">
        <div class="card-header">
          <h3>📦 Payload</h3>
          <button @click="copyJson(payload)" class="copy-btn">📋 复制</button>
        </div>
        <pre class="json-display">{{ JSON.stringify(payload, null, 2) }}</pre>
        
        <div class="claims-section">
          <h4>标准声明 (Claims)</h4>
          
          <div class="claim-item" v-if="payload.iss">
            <span class="claim-label">签发者 (iss):</span>
            <span class="claim-value">{{ payload.iss }}</span>
          </div>
          
          <div class="claim-item" v-if="payload.sub">
            <span class="claim-label">主题 (sub):</span>
            <span class="claim-value">{{ payload.sub }}</span>
          </div>
          
          <div class="claim-item" v-if="payload.aud">
            <span class="claim-label">受众 (aud):</span>
            <span class="claim-value">{{ payload.aud }}</span>
          </div>
          
          <div class="claim-item" v-if="payload.exp">
            <span class="claim-label">过期时间 (exp):</span>
            <span :class="['claim-value', isExpired ? 'expired' : 'valid']">
              {{ expiryTime }}
              <span class="status-badge" v-if="isExpired">已过期</span>
              <span class="status-badge valid" v-else>有效</span>
            </span>
          </div>
          
          <div class="claim-item" v-if="payload.iat">
            <span class="claim-label">签发时间 (iat):</span>
            <span class="claim-value">{{ issuedTime }}</span>
          </div>
          
          <div class="claim-item" v-if="payload.nbf">
            <span class="claim-label">生效时间 (nbf):</span>
            <span class="claim-value">{{ notBeforeTime }}</span>
          </div>
          
          <div class="claim-item" v-if="payload.jti">
            <span class="claim-label">JWT ID (jti):</span>
            <span class="claim-value">{{ payload.jti }}</span>
          </div>
        </div>
      </div>

      <!-- Signature -->
      <div v-if="signature" class="result-card">
        <div class="card-header">
          <h3>🔐 Signature</h3>
          <button @click="copy(signature)" class="copy-btn">📋 复制</button>
        </div>
        <div class="signature-display">{{ signature }}</div>
        <div class="signature-note">
          ⚠️ 签名验证需要密钥，此工具仅解析不验证
        </div>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 关于 JWT</h4>
      <p><strong>JWT (JSON Web Token)</strong> 是一种开放标准 (RFC 7519)，用于在各方之间安全地传输信息。</p>
      
      <h4>JWT 结构</h4>
      <table class="info-table">
        <thead>
          <tr>
            <th>部分</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Header</strong></td>
            <td>包含令牌类型和签名算法</td>
          </tr>
          <tr>
            <td><strong>Payload</strong></td>
            <td>包含声明（claims）- 实际传输的数据</td>
          </tr>
          <tr>
            <td><strong>Signature</strong></td>
            <td>用于验证令牌的签名</td>
          </tr>
        </tbody>
      </table>
      
      <h4>标准声明字段</h4>
      <table class="info-table">
        <thead>
          <tr>
            <th>字段</th>
            <th>名称</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>iss</code></td>
            <td>Issuer</td>
            <td>签发者</td>
          </tr>
          <tr>
            <td><code>sub</code></td>
            <td>Subject</td>
            <td>主题/用户ID</td>
          </tr>
          <tr>
            <td><code>aud</code></td>
            <td>Audience</td>
            <td>接收方</td>
          </tr>
          <tr>
            <td><code>exp</code></td>
            <td>Expiration Time</td>
            <td>过期时间</td>
          </tr>
          <tr>
            <td><code>iat</code></td>
            <td>Issued At</td>
            <td>签发时间</td>
          </tr>
          <tr>
            <td><code>nbf</code></td>
            <td>Not Before</td>
            <td>生效时间</td>
          </tr>
          <tr>
            <td><code>jti</code></td>
            <td>JWT ID</td>
            <td>JWT唯一标识</td>
          </tr>
        </tbody>
      </table>
      
      <p class="warning">⚠️ <strong>安全提示:</strong> JWT中的数据是Base64编码而非加密，不要在Payload中存储敏感信息！</p>
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

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--border-color);
}

.jwt-input {
  width: 100%;
  min-height: 80px;
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
  word-break: break-all;
}

.jwt-input:focus {
  border-color: var(--primary-color);
}

.parse-btn {
  align-self: flex-start;
  padding: 10px 20px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.parse-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
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
  border-left-color: #ff6b6b;
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-card {
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
}

.copy-btn {
  padding: 6px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--border-color);
}

.json-display {
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-color);
  overflow-x: auto;
  margin-bottom: 12px;
  white-space: pre;
  text-align: left;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
}

.info-item {
  padding: 10px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 600;
}

.info-value {
  font-size: 14px;
  color: var(--text-color);
  font-family: 'Consolas', 'Monaco', monospace;
}

.claims-section {
  margin-top: 12px;
}

.claims-section h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.claim-item {
  padding: 10px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.claim-label {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 600;
  min-width: 140px;
}

.claim-value {
  font-size: 14px;
  color: var(--text-color);
  font-family: 'Consolas', 'Monaco', monospace;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: flex-end;
}

.claim-value.expired {
  color: #c33;
}

.claim-value.valid {
  color: #3c3;
}

.status-badge {
  padding: 4px 8px;
  background: #fee;
  color: #c33;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.status-badge.valid {
  background: #efe;
  color: #3c3;
}

.dark .status-badge {
  background: #4a1515;
  color: #ff6b6b;
}

.dark .status-badge.valid {
  background: #1a4a1a;
  color: #5cff5c;
}

.signature-display {
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 12px;
  color: var(--text-color);
  word-break: break-all;
  line-height: 1.5;
  margin-bottom: 10px;
}

.signature-note {
  padding: 10px;
  background: #fff8dc;
  color: #856404;
  border-radius: 6px;
  font-size: 13px;
  border-left: 4px solid #ffc107;
}

.dark .signature-note {
  background: #3a3a1a;
  color: #ffc107;
}

.info-box {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  text-align: left;
}

.info-box h4 {
  margin-bottom: 8px;
  margin-top: 12px;
  color: var(--text-color);
  font-size: 14px;
  text-align: left;
}

.info-box h4:first-child {
  margin-top: 0;
}

.info-box p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin: 8px 0;
  text-align: left;
}

.info-box ul {
  list-style: none;
  padding: 0;
  margin: 8px 0;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  background: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
}

.info-table thead {
  background: var(--primary-color);
}

.info-table th {
  padding: 10px 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: white;
}

.info-table td {
  padding: 10px 12px;
  font-size: 13px;
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
}

.info-table tbody tr:last-child td {
  border-bottom: none;
}

.info-table tbody tr:hover {
  background: var(--bg-color);
}

.info-table code {
  background: var(--bg-color);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  color: var(--primary-color);
  font-weight: 600;
}

.info-box li {
  padding: 6px 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  text-align: left;
}

.info-box li strong {
  color: var(--primary-color);
  font-weight: 600;
}

.warning {
  padding: 10px;
  background: #fff3cd;
  color: #856404;
  border-radius: 6px;
  border-left: 4px solid #ffc107;
  margin-top: 10px;
}

.dark .warning {
  background: #3a3a1a;
  color: #ffc107;
}

@media (max-width: 768px) {
  .claim-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .claim-label {
    min-width: auto;
  }
  
  .claim-value {
    justify-content: flex-start;
  }
}
</style>
