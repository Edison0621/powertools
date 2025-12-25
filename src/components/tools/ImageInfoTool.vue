<script setup>
import { ref } from 'vue'

const imageFile = ref(null)
const previewUrl = ref('')
const basicInfo = ref(null)
const exifData = ref(null)
const loading = ref(false)

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
    previewUrl.value = e.target.result
    
    const img = new Image()
    img.onload = () => {
      // 基本信息
      basicInfo.value = {
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        fileSizeBytes: file.size,
        fileType: file.type,
        mimeType: file.type,
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: (img.naturalWidth / img.naturalHeight).toFixed(2),
        megapixels: ((img.naturalWidth * img.naturalHeight) / 1000000).toFixed(2),
        lastModified: new Date(file.lastModified).toLocaleString('zh-CN')
      }
      
      // 尝试读取EXIF（简化版，实际需要专业库）
      exifData.value = {
        note: '注意：浏览器环境无法直接读取EXIF数据',
        suggestion: '建议使用专业工具或后端服务读取完整EXIF信息',
        commonFields: [
          '相机型号', '镜头信息', '拍摄时间', 
          '光圈', '快门速度', 'ISO', 
          'GPS坐标', '白平衡', '曝光补偿'
        ]
      }
      
      loading.value = false
    }
    img.src = e.target.result
  }
  
  reader.readAsDataURL(file)
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
}

const getImageOrientation = () => {
  if (!basicInfo.value) return ''
  const ratio = parseFloat(basicInfo.value.aspectRatio)
  if (ratio > 1.2) return '横向'
  if (ratio < 0.8) return '纵向'
  return '方形'
}

const getImageQuality = () => {
  if (!basicInfo.value) return ''
  const mp = parseFloat(basicInfo.value.megapixels)
  if (mp < 1) return '低分辨率'
  if (mp < 5) return '中等分辨率'
  if (mp < 12) return '高分辨率'
  return '超高分辨率'
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
  imageFile.value = null
  previewUrl.value = ''
  basicInfo.value = null
  exifData.value = null
  
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) fileInput.value = ''
}
</script>

<template>
  <div class="tool-container">
    <!-- 上传区域 -->
    <div class="upload-section">
      <input 
        type="file" 
        accept="image/*"
        @change="handleFileChange"
        class="file-input"
        id="imageInput"
      />
      <label for="imageInput" class="upload-label">
        <div class="upload-icon">📷</div>
        <div class="upload-text">选择图片查看信息</div>
        <div class="upload-hint">支持 JPG, PNG, GIF, WebP 等格式</div>
      </label>
    </div>

    <!-- 预览和信息 -->
    <div v-if="previewUrl && basicInfo" class="content-grid">
      <!-- 图片预览 -->
      <div class="preview-section">
        <h3>📷 图片预览</h3>
        <div class="preview-container">
          <img :src="previewUrl" alt="预览" class="preview-image" />
        </div>
        <button @click="clear" class="clear-btn">🗑️ 清空</button>
      </div>

      <!-- 基本信息 -->
      <div class="info-section">
        <h3>📊 基本信息</h3>
        
        <div class="info-table">
          <div class="info-row">
            <span class="info-key">文件名</span>
            <span class="info-value">{{ basicInfo.fileName }}</span>
            <button @click="copy(basicInfo.fileName)" class="mini-copy">📋</button>
          </div>
          
          <div class="info-row">
            <span class="info-key">文件大小</span>
            <span class="info-value">{{ basicInfo.fileSize }}</span>
            <button @click="copy(basicInfo.fileSizeBytes.toString())" class="mini-copy">📋</button>
          </div>
          
          <div class="info-row">
            <span class="info-key">文件类型</span>
            <span class="info-value">{{ basicInfo.fileType }}</span>
            <button @click="copy(basicInfo.fileType)" class="mini-copy">📋</button>
          </div>
          
          <div class="info-row">
            <span class="info-key">图片尺寸</span>
            <span class="info-value">{{ basicInfo.width }} × {{ basicInfo.height }} px</span>
            <button @click="copy(`${basicInfo.width}x${basicInfo.height}`)" class="mini-copy">📋</button>
          </div>
          
          <div class="info-row">
            <span class="info-key">宽高比</span>
            <span class="info-value">{{ basicInfo.aspectRatio }}:1</span>
          </div>
          
          <div class="info-row">
            <span class="info-key">方向</span>
            <span class="info-value">{{ getImageOrientation() }}</span>
          </div>
          
          <div class="info-row">
            <span class="info-key">总像素</span>
            <span class="info-value">{{ basicInfo.megapixels }} MP</span>
          </div>
          
          <div class="info-row">
            <span class="info-key">质量评估</span>
            <span class="info-value">{{ getImageQuality() }}</span>
          </div>
          
          <div class="info-row">
            <span class="info-key">最后修改</span>
            <span class="info-value">{{ basicInfo.lastModified }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- EXIF说明 -->
    <div v-if="exifData" class="exif-section">
      <h3>📸 EXIF 信息</h3>
      <div class="exif-note">
        <p><strong>⚠️ {{ exifData.note }}</strong></p>
        <p>{{ exifData.suggestion }}</p>
      </div>
      
      <div class="exif-fields">
        <h4>常见EXIF字段：</h4>
        <div class="fields-grid">
          <div v-for="field in exifData.commonFields" :key="field" class="field-chip">
            {{ field }}
          </div>
        </div>
      </div>
    </div>

    <!-- 说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li>选择图片文件，自动读取并显示基本信息</li>
        <li>包含文件大小、尺寸、格式、修改时间等</li>
        <li>计算宽高比、像素数、图片方向</li>
        <li>浏览器环境无法直接读取EXIF数据</li>
        <li>如需完整EXIF信息，建议使用专业软件</li>
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

.upload-section {
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
  min-height: 180px;
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

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.preview-section,
.info-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.preview-section h3,
.info-section h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  padding: 16px;
  background: var(--card-bg);
  border-radius: 10px;
  margin-bottom: 12px;
}

.preview-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.clear-btn {
  width: 100%;
  padding: 10px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.clear-btn:hover {
  background: var(--border-color);
}

.info-table {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 10px;
  background: var(--card-bg);
  border-radius: 6px;
}

.info-key {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.info-value {
  font-size: 13px;
  font-weight: 600;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
  word-break: break-all;
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

.exif-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.exif-section h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

.exif-note {
  padding: 12px;
  background: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 8px;
  margin-bottom: 16px;
}

.dark .exif-note {
  background: #3d3000;
  border-color: #f59e0b;
}

.exif-note p {
  margin: 4px 0;
  font-size: 13px;
  color: #856404;
}

.dark .exif-note p {
  color: #fcd34d;
}

.exif-fields h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
}

.fields-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
}

.field-chip {
  padding: 8px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
  text-align: center;
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
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .info-row {
    grid-template-columns: 80px 1fr auto;
  }
}
</style>
