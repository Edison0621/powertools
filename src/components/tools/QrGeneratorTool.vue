<script setup>
import { ref, watch } from 'vue'

const text = ref('')
const size = ref(256)
const errorLevel = ref('M')
const qrCodeDataUrl = ref('')
const isGenerating = ref(false)

// 错误纠正级别
const errorLevels = {
  L: { name: '低 (7%)', value: 'L' },
  M: { name: '中 (15%)', value: 'M' },
  Q: { name: '高 (25%)', value: 'Q' },
  H: { name: '最高 (30%)', value: 'H' }
}

// 预设模板
const templates = [
  { name: 'URL', value: 'https://example.com' },
  { name: '邮箱', value: 'mailto:example@email.com' },
  { name: '电话', value: 'tel:+86-138-0000-0000' },
  { name: 'WiFi', value: 'WIFI:T:WPA;S:NetworkName;P:Password;;' },
  { name: '名片', value: 'BEGIN:VCARD\nVERSION:3.0\nFN:张三\nTEL:138-0000-0000\nEMAIL:zhangsan@email.com\nEND:VCARD' },
  { name: '短信', value: 'sms:138-0000-0000?body=Hello' }
]

// 使用免费的二维码API生成
const generateQRCode = async () => {
  if (!text.value.trim()) {
    qrCodeDataUrl.value = ''
    return
  }
  
  isGenerating.value = true
  
  try {
    // 使用 QR Server API (免费且不需要API密钥)
    const encodedText = encodeURIComponent(text.value)
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size.value}x${size.value}&data=${encodedText}&ecc=${errorLevel.value}`
    
    qrCodeDataUrl.value = apiUrl
  } catch (error) {
    console.error('生成二维码失败:', error)
    alert('生成二维码失败，请重试')
  } finally {
    isGenerating.value = false
  }
}

const downloadQRCode = async () => {
  if (!qrCodeDataUrl.value) return
  
  try {
    const response = await fetch(qrCodeDataUrl.value)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `qrcode-${Date.now()}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (e) {
    alert('下载失败: ' + e.message)
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(text.value)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const useTemplate = (template) => {
  text.value = template.value
  generateQRCode()
}

const clear = () => {
  text.value = ''
  qrCodeDataUrl.value = ''
}

// 监听变化自动生成
watch([text, size, errorLevel], () => {
  generateQRCode()
}, { immediate: true })
</script>

<template>
  <div class="tool-container">
    <!-- 输入区域 -->
    <div class="input-section">
      <div class="section-header">
        <label>输入内容</label>
        <div class="header-actions">
          <button @click="copyToClipboard" class="action-btn" :disabled="!text">
            📋 复制
          </button>
          <button @click="clear" class="action-btn">
            🗑️ 清空
          </button>
        </div>
      </div>
      <textarea 
        v-model="text"
        placeholder="输入要生成二维码的内容（URL、文本、WiFi配置等）..."
        class="text-input"
      ></textarea>
    </div>

    <!-- 快速模板 -->
    <div class="templates-section">
      <h4>快速模板</h4>
      <div class="templates-grid">
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

    <!-- 设置 -->
    <div class="settings-section">
      <div class="setting-group">
        <label>尺寸: {{ size }}x{{ size }} px</label>
        <input 
          v-model.number="size" 
          type="range" 
          min="128" 
          max="512"
          step="64"
          class="range-input"
        />
        <div class="size-labels">
          <span>128</span>
          <span>256</span>
          <span>512</span>
        </div>
      </div>

      <div class="setting-group">
        <label>容错级别</label>
        <div class="error-level-btns">
          <button
            v-for="(level, key) in errorLevels"
            :key="key"
            @click="errorLevel = key"
            :class="['level-btn', { active: errorLevel === key }]"
          >
            {{ level.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- 二维码预览 -->
    <div class="preview-section">
      <div class="section-header">
        <h3>二维码预览</h3>
        <button 
          @click="downloadQRCode" 
          class="download-btn"
          :disabled="!qrCodeDataUrl"
        >
          💾 下载
        </button>
      </div>
      
      <div class="qrcode-container">
        <div v-if="isGenerating" class="loading">
          生成中...
        </div>
        <img 
          v-else-if="qrCodeDataUrl" 
          :src="qrCodeDataUrl" 
          alt="QR Code"
          class="qrcode-image"
          crossorigin="anonymous"
        />
        <div v-else class="empty-state">
          <div class="empty-icon">📱</div>
          <p>输入内容后将自动生成二维码</p>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 支持的内容类型</h4>
      <table class="info-table">
        <thead>
          <tr>
            <th>类型</th>
            <th>格式</th>
            <th>示例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>URL</strong></td>
            <td>https://...</td>
            <td>https://example.com</td>
          </tr>
          <tr>
            <td><strong>文本</strong></td>
            <td>任意文本</td>
            <td>Hello World</td>
          </tr>
          <tr>
            <td><strong>邮箱</strong></td>
            <td>mailto:邮箱</td>
            <td>mailto:example@email.com</td>
          </tr>
          <tr>
            <td><strong>电话</strong></td>
            <td>tel:号码</td>
            <td>tel:+86-138-0000-0000</td>
          </tr>
          <tr>
            <td><strong>WiFi</strong></td>
            <td>WIFI:T:类型;S:名称;P:密码;;</td>
            <td>WIFI:T:WPA;S:MyWiFi;P:12345678;;</td>
          </tr>
          <tr>
            <td><strong>短信</strong></td>
            <td>sms:号码?body=内容</td>
            <td>sms:138-0000-0000?body=Hi</td>
          </tr>
        </tbody>
      </table>

      <h4>容错级别说明</h4>
      <ul>
        <li><strong>低 (L - 7%):</strong> 最小容错，适合清晰环境</li>
        <li><strong>中 (M - 15%):</strong> 平衡选择，推荐使用</li>
        <li><strong>高 (Q - 25%):</strong> 较高容错，可覆盖部分图案</li>
        <li><strong>最高 (H - 30%):</strong> 最高容错，可添加Logo</li>
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

.section-header label,
.section-header h3 {
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

.action-btn:hover:not(:disabled) {
  background: var(--border-color);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.text-input {
  width: 100%;
  min-height: 80px;
  padding: 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.text-input:focus {
  border-color: var(--primary-color);
}

.templates-section {
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.templates-section h4 {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
}

.template-btn {
  padding: 6px 10px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.template-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.settings-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.range-input {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--border-color);
  outline: none;
  cursor: pointer;
}

.range-input::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
}

.size-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-secondary);
}

.error-level-btns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.level-btn {
  padding: 8px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.level-btn:hover {
  border-color: var(--primary-color);
}

.level-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.preview-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.download-btn {
  padding: 8px 16px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.download-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.download-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qrcode-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  padding: 24px;
  background: var(--bg-color);
  border: 2px dashed var(--border-color);
  border-radius: 12px;
}

.qrcode-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.loading {
  font-size: 16px;
  color: var(--text-secondary);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.empty-state {
  text-align: center;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-state p {
  font-size: 13px;
}

.info-box {
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-box h4 {
  margin-bottom: 8px;
  margin-top: 12px;
  color: var(--text-color);
  font-size: 13px;
}

.info-box h4:first-child {
  margin-top: 0;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0;
  background: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
}

.info-table thead {
  background: var(--primary-color);
}

.info-table th {
  padding: 8px 10px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.info-table td {
  padding: 8px 10px;
  font-size: 12px;
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
}

.info-table tbody tr:last-child td {
  border-bottom: none;
}

.info-table tbody tr:hover {
  background: var(--bg-color);
}

.info-box ul {
  list-style: none;
  padding: 0;
  margin: 6px 0;
}

.info-box li {
  padding: 4px 0;
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.6;
}

.info-box li strong {
  color: var(--primary-color);
  font-weight: 600;
}

@media (max-width: 768px) {
  .settings-section {
    grid-template-columns: 1fr;
  }
  
  .templates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
