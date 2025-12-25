<script setup>
import { ref } from 'vue'

const ipAddress = ref('')
const ipInfo = ref(null)
const loading = ref(false)
const error = ref('')

// 获取用户自己的IP
const getMyIP = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    ipAddress.value = data.ip
    await lookupIP()
  } catch (e) {
    error.value = '获取IP失败: ' + e.message
  } finally {
    loading.value = false
  }
}

// 查询IP信息
const lookupIP = async () => {
  if (!ipAddress.value.trim()) {
    error.value = '请输入IP地址'
    return
  }
  
  loading.value = true
  error.value = ''
  ipInfo.value = null
  
  try {
    // 使用免费的IP地理位置API
    const response = await fetch(`https://ipapi.co/${ipAddress.value}/json/`)
    const data = await response.json()
    
    if (data.error) {
      error.value = data.reason || '查询失败'
      return
    }
    
    ipInfo.value = {
      ip: data.ip,
      version: data.version,
      city: data.city,
      region: data.region,
      country: data.country_name,
      countryCode: data.country_code,
      postal: data.postal,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      org: data.org,
      asn: data.asn,
      isp: data.org
    }
  } catch (e) {
    error.value = '查询失败: ' + e.message
  } finally {
    loading.value = false
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

const clear = () => {
  ipAddress.value = ''
  ipInfo.value = null
  error.value = ''
}
</script>

<template>
  <div class="tool-container">
    <div class="input-section">
      <div class="section-header">
        <label>IP地址查询</label>
        <div class="header-actions">
          <button @click="getMyIP" class="action-btn">🌐 查询我的IP</button>
          <button @click="clear" class="action-btn">🗑️ 清空</button>
        </div>
      </div>
      
      <div class="input-row">
        <input 
          v-model="ipAddress"
          type="text"
          placeholder="输入IP地址，如: 8.8.8.8"
          class="ip-input"
          @keyup.enter="lookupIP"
        />
        <button @click="lookupIP" class="lookup-btn" :disabled="loading">
          {{ loading ? '查询中...' : '🔍 查询' }}
        </button>
      </div>
    </div>

    <div v-if="error" class="error-message">
      ⚠️ {{ error }}
    </div>

    <div v-if="loading && !ipInfo" class="loading-state">
      <div class="spinner"></div>
      <p>查询中...</p>
    </div>

    <div v-if="ipInfo" class="result-section">
      <div class="result-header">
        <h3>📍 IP信息</h3>
        <button @click="copy(JSON.stringify(ipInfo, null, 2))" class="copy-btn">
          📋 复制全部
        </button>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">IP地址</span>
          <span class="info-value">{{ ipInfo.ip }}</span>
          <button @click="copy(ipInfo.ip)" class="mini-copy">📋</button>
        </div>

        <div class="info-item">
          <span class="info-label">IP版本</span>
          <span class="info-value">IPv{{ ipInfo.version }}</span>
        </div>

        <div class="info-item">
          <span class="info-label">国家</span>
          <span class="info-value">{{ ipInfo.country }} ({{ ipInfo.countryCode }})</span>
        </div>

        <div class="info-item">
          <span class="info-label">地区</span>
          <span class="info-value">{{ ipInfo.region }}</span>
        </div>

        <div class="info-item">
          <span class="info-label">城市</span>
          <span class="info-value">{{ ipInfo.city || 'N/A' }}</span>
        </div>

        <div class="info-item">
          <span class="info-label">邮编</span>
          <span class="info-value">{{ ipInfo.postal || 'N/A' }}</span>
        </div>

        <div class="info-item">
          <span class="info-label">时区</span>
          <span class="info-value">{{ ipInfo.timezone }}</span>
        </div>

        <div class="info-item">
          <span class="info-label">ISP</span>
          <span class="info-value">{{ ipInfo.isp }}</span>
        </div>

        <div class="info-item">
          <span class="info-label">ASN</span>
          <span class="info-value">{{ ipInfo.asn }}</span>
        </div>

        <div class="info-item full-width">
          <span class="info-label">坐标</span>
          <span class="info-value">
            {{ ipInfo.latitude }}, {{ ipInfo.longitude }}
          </span>
          <button 
            @click="copy(`${ipInfo.latitude}, ${ipInfo.longitude}`)" 
            class="mini-copy"
          >
            📋
          </button>
        </div>
      </div>

      <div class="map-link">
        <a 
          :href="`https://www.google.com/maps?q=${ipInfo.latitude},${ipInfo.longitude}`"
          target="_blank"
          class="map-btn"
        >
          🗺️ 在地图中查看
        </a>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 说明</h4>
      <ul>
        <li>支持查询任何公网IPv4和IPv6地址</li>
        <li>显示地理位置、ISP、时区等信息</li>
        <li>点击"查询我的IP"可以查看您当前的公网IP</li>
        <li>数据来源于免费的IP地理位置数据库</li>
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

.input-row {
  display: flex;
  gap: 12px;
}

.ip-input {
  flex: 1;
  padding: 12px;
  background: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 15px;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
  outline: none;
}

.ip-input:focus {
  border-color: var(--primary-color);
}

.lookup-btn {
  padding: 12px 24px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.lookup-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.lookup-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

.result-section {
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.result-header h3 {
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

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  gap: 8px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 60px;
}

.info-value {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  font-family: 'Consolas', 'Monaco', monospace;
}

.mini-copy {
  padding: 4px 8px;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.mini-copy:hover {
  opacity: 1;
}

.map-link {
  margin-top: 16px;
  text-align: center;
}

.map-btn {
  display: inline-block;
  padding: 10px 20px;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.map-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
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
  margin-right: 8px;
}

@media (max-width: 768px) {
  .input-row {
    flex-direction: column;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
