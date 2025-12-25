<script setup>
import { ref } from 'vue'

const mode = ref('toBase64')
const imageFile = ref(null)
const base64Input = ref('')
const base64Output = ref('')
const previewUrl = ref('')
const imageInfo = ref(null)
const loading = ref(false)

// 图片转Base64
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件')
    return
  }
  
  loading.value = true
  imageFile.value = file
  
  const reader = new FileReader()
  
  reader.onload = (e) => {
    base64Output.value = e.target.result
    previewUrl.value = e.target.result
    
    // 获取图片信息
    const img = new Image()
    img.onload = () => {
      imageInfo.value = {
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        type: file.type,
        width: img.naturalWidth,
        height: img.naturalHeight,
        base64Size: (base64Output.value.length / 1024).toFixed(2) + ' KB'
      }
      loading.value = false
    }
    img.src = e.target.result
  }
  
  reader.readAsDataURL(file)
}

// Base64转图片
const convertBase64ToImage = () => {
  if (!base64Input.value.trim()) {
    alert('请输入Base64编码')
    return
  }
  
  loading.value = true
  
  try {
    // 验证Base64格式
    let base64 = base64Input.value.trim()
    
    // 如果没有data:image前缀，自动添加
    if (!base64.startsWith('data:image')) {
      base64 = 'data:image/png;base64,' + base64
    }
    
    previewUrl.value = base64
    
    // 获取图片信息
    const img = new Image()
    img.onload = () => {
      imageInfo.value = {
        width: img.naturalWidth,
        height: img.naturalHeight,
        base64Size: (base64.length / 1024).toFixed(2) + ' KB'
      }
      loading.value = false
    }
    img.onerror = () => {
      alert('Base64解码失败，请检查格式')
      loading.value = false
    }
    img.src = base64
  } catch (e) {
    alert('Base64解码失败: ' + e.message)
    loading.value = false
  }
}

// 复制Base64
const copyBase64 = async () => {
  try {
    await navigator.clipboard.writeText(base64Output.value)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

// 下载图片
const downloadImage = () => {
  if (!previewUrl.value) return
  
  const link = document.createElement('a')
  link.href = previewUrl.value
  link.download = `image-${Date.now()}.png`
  link.click()
}

// 清空
const clear = () => {
  imageFile.value = null
  base64Input.value = ''
  base64Output.value = ''
  previewUrl.value = ''
  imageInfo.value = null
  
  // 清空文件选择器
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) fileInput.value = ''
}
</script>

<template>
  <div class="tool-container">
    <!-- 模式切换 -->
    <div class="mode-tabs">
      <button 
        :class="['mode-tab', { active: mode === 'toBase64' }]"
        @click="mode = 'toBase64'; clear()"
      >
        🖼️ 图片 → Base64
      </button>
      <button 
        :class="['mode-tab', { active: mode === 'toImage' }]"
        @click="mode = 'toImage'; clear()"
      >
        🔄 Base64 → 图片
      </button>
    </div>

    <!-- 图片转Base64 -->
    <div v-if="mode === 'toBase64'" class="conversion-section">
      <div class="upload-area">
        <input 
          type="file" 
          accept="image/*"
          @change="handleFileChange"
          class="file-input"
          id="imageInput"
        />
        <label for="imageInput" class="upload-label">
          <div class="upload-icon">📁</div>
          <div class="upload-text">点击选择图片</div>
          <div class="upload-hint">支持 JPG, PNG, GIF, WebP 等格式</div>
        </label>
      </div>

      <div v-if="base64Output" class="result-section">
        <div class="result-header">
          <h3>Base64 编码结果</h3>
          <div class="actions">
            <button @click="copyBase64" class="action-btn">📋 复制</button>
            <button @click="clear" class="action-btn">🗑️ 清空</button>
          </div>
        </div>
        <textarea 
          v-model="base64Output" 
          readonly 
          class="base64-output"
        ></textarea>
      </div>
    </div>

    <!-- Base64转图片 -->
    <div v-if="mode === 'toImage'" class="conversion-section">
      <div class="input-section">
        <label>粘贴 Base64 编码</label>
        <textarea 
          v-model="base64Input"
          placeholder="粘贴Base64编码（可以包含或不包含 data:image/... 前缀）"
          class="base64-input"
        ></textarea>
        <button @click="convertBase64ToImage" class="convert-btn">
          🔄 转换
        </button>
      </div>
    </div>

    <!-- 预览区域 -->
    <div v-if="previewUrl" class="preview-section">
      <div class="preview-header">
        <h3>图片预览</h3>
        <button @click="downloadImage" class="download-btn">
          ⬇️ 下载图片
        </button>
      </div>
      
      <div class="preview-container">
        <img :src="previewUrl" alt="预览图片" class="preview-image" />
      </div>
      
      <div v-if="imageInfo" class="info-grid">
        <div v-if="imageInfo.name" class="info-item">
          <span class="info-label">文件名</span>
          <span class="info-value">{{ imageInfo.name }}</span>
        </div>
        <div v-if="imageInfo.size" class="info-item">
          <span class="info-label">文件大小</span>
          <span class="info-value">{{ imageInfo.size }}</span>
        </div>
        <div v-if="imageInfo.type" class="info-item">
          <span class="info-label">文件类型</span>
          <span class="info-value">{{ imageInfo.type }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">图片尺寸</span>
          <span class="info-value">{{ imageInfo.width }} × {{ imageInfo.height }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Base64大小</span>
          <span class="info-value">{{ imageInfo.base64Size }}</span>
        </div>
      </div>
    </div>

    <!-- 说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li>图片转Base64：选择图片文件，自动生成Base64编码</li>
        <li>Base64转图片：粘贴Base64编码，点击转换查看图片</li>
        <li>Base64编码会比原图大约增加33%的体积</li>
        <li>适用于小图片嵌入HTML/CSS，减少HTTP请求</li>
        <li>支持复制Base64编码和下载转换后的图片</li>
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

.mode-tabs {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.mode-tab {
  flex: 1;
  padding: 12px 20px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.mode-tab:hover {
  border-color: var(--primary-color);
}

.mode-tab.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.conversion-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.upload-area {
  position: relative;
}

.file-input {
  display: none;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 40px;
  background: var(--bg-color);
  border: 3px dashed var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-label:hover {
  border-color: var(--primary-color);
  background: var(--card-bg);
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.upload-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.upload-hint {
  font-size: 13px;
  color: var(--text-secondary);
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.input-section label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.base64-input {
  width: 100%;
  min-height: 200px;
  padding: 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.base64-input:focus {
  border-color: var(--primary-color);
}

.convert-btn {
  padding: 12px 24px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.convert-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.result-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.result-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
}

.actions {
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

.base64-output {
  width: 100%;
  min-height: 150px;
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 11px;
  line-height: 1.6;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.preview-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.preview-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
}

.download-btn {
  padding: 8px 16px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.download-btn:hover {
  background: var(--primary-hover);
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  padding: 20px;
  background: var(--card-bg);
  border-radius: 10px;
  margin-bottom: 16px;
}

.preview-image {
  max-width: 100%;
  max-height: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: var(--card-bg);
  border-radius: 6px;
}

.info-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.info-value {
  font-size: 13px;
  font-weight: 600;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
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
  margin-right: 6px;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
