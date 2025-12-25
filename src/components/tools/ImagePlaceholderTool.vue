<script setup>
import { ref, computed } from 'vue'

const width = ref(400)
const height = ref(300)
const backgroundColor = ref('#cccccc')
const textColor = ref('#666666')
const text = ref('')
const fontSize = ref(24)
const format = ref('png')

// 预设尺寸
const presets = [
  { name: '方形', sizes: [
    { label: '100x100', width: 100, height: 100 },
    { label: '200x200', width: 200, height: 200 },
    { label: '300x300', width: 300, height: 300 },
    { label: '500x500', width: 500, height: 500 }
  ]},
  { name: '横向', sizes: [
    { label: '800x600', width: 800, height: 600 },
    { label: '1024x768', width: 1024, height: 768 },
    { label: '1280x720', width: 1280, height: 720 },
    { label: '1920x1080', width: 1920, height: 1080 }
  ]},
  { name: '纵向', sizes: [
    { label: '600x800', width: 600, height: 800 },
    { label: '768x1024', width: 768, height: 1024 },
    { label: '720x1280', width: 720, height: 1280 }
  ]},
  { name: '社交媒体', sizes: [
    { label: '头像 400x400', width: 400, height: 400 },
    { label: '封面 1200x630', width: 1200, height: 630 },
    { label: 'Instagram 1080x1080', width: 1080, height: 1080 }
  ]}
]

// 生成占位图
const placeholderUrl = computed(() => {
  const canvas = document.createElement('canvas')
  canvas.width = width.value
  canvas.height = height.value
  
  const ctx = canvas.getContext('2d')
  
  // 背景
  ctx.fillStyle = backgroundColor.value
  ctx.fillRect(0, 0, width.value, height.value)
  
  // 文字
  const displayText = text.value || `${width.value} × ${height.value}`
  ctx.fillStyle = textColor.value
  ctx.font = `${fontSize.value}px Arial, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(displayText, width.value / 2, height.value / 2)
  
  return canvas.toDataURL(`image/${format.value}`)
})

const usePreset = (preset) => {
  width.value = preset.width
  height.value = preset.height
}

const randomColor = () => {
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  backgroundColor.value = color
}

const downloadPlaceholder = () => {
  const link = document.createElement('a')
  link.href = placeholderUrl.value
  link.download = `placeholder-${width.value}x${height.value}.${format.value}`
  link.click()
}

const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(placeholderUrl.value)
    alert('已复制Base64 URL')
  } catch (e) {
    alert('复制失败')
  }
}
</script>

<template>
  <div class="tool-container">
    <!-- 设置面板 -->
    <div class="settings-panel">
      <div class="settings-grid">
        <div class="setting-group">
          <label>宽度 (px)</label>
          <input v-model.number="width" type="number" min="1" max="5000" class="setting-input" />
        </div>
        
        <div class="setting-group">
          <label>高度 (px)</label>
          <input v-model.number="height" type="number" min="1" max="5000" class="setting-input" />
        </div>
        
        <div class="setting-group">
          <label>背景颜色</label>
          <div class="color-input-group">
            <input v-model="backgroundColor" type="color" class="color-picker" />
            <input v-model="backgroundColor" type="text" class="color-text" />
            <button @click="randomColor" class="random-btn">🎲</button>
          </div>
        </div>
        
        <div class="setting-group">
          <label>文字颜色</label>
          <div class="color-input-group">
            <input v-model="textColor" type="color" class="color-picker" />
            <input v-model="textColor" type="text" class="color-text" />
          </div>
        </div>
        
        <div class="setting-group">
          <label>文字内容</label>
          <input v-model="text" type="text" placeholder="留空显示尺寸" class="setting-input" />
        </div>
        
        <div class="setting-group">
          <label>字体大小</label>
          <input v-model.number="fontSize" type="number" min="8" max="200" class="setting-input" />
        </div>
        
        <div class="setting-group">
          <label>输出格式</label>
          <select v-model="format" class="setting-select">
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WebP</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 预设尺寸 -->
    <div class="presets-section">
      <h3>📐 预设尺寸</h3>
      <div v-for="group in presets" :key="group.name" class="preset-group">
        <h4>{{ group.name }}</h4>
        <div class="preset-buttons">
          <button 
            v-for="size in group.sizes" 
            :key="size.label"
            @click="usePreset(size)"
            class="preset-btn"
          >
            {{ size.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- 预览 -->
    <div class="preview-section">
      <div class="preview-header">
        <h3>🖼️ 预览</h3>
        <div class="preview-info">
          {{ width }} × {{ height }} px
        </div>
      </div>
      
      <div class="preview-container">
        <img :src="placeholderUrl" :alt="`${width}x${height} 占位图`" class="preview-image" />
      </div>
      
      <div class="action-buttons">
        <button @click="downloadPlaceholder" class="action-btn primary">
          ⬇️ 下载图片
        </button>
        <button @click="copyUrl" class="action-btn">
          📋 复制Base64 URL
        </button>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li>设置图片尺寸、背景色、文字颜色和内容</li>
        <li>可选择预设的常用尺寸快速生成</li>
        <li>支持PNG、JPEG、WebP格式</li>
        <li>适用于前端开发、UI设计占位</li>
        <li>可下载图片或复制Base64编码直接使用</li>
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
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
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

.setting-input,
.setting-select {
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.setting-input:focus,
.setting-select:focus {
  border-color: var(--primary-color);
}

.color-input-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.color-picker {
  width: 50px;
  height: 40px;
  padding: 2px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
}

.color-text {
  flex: 1;
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
  outline: none;
}

.random-btn {
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.random-btn:hover {
  border-color: var(--primary-color);
}

.presets-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.presets-section h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 16px;
}

.preset-group {
  margin-bottom: 16px;
}

.preset-group:last-child {
  margin-bottom: 0;
}

.preset-group h4 {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.preset-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.preset-btn {
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

.preset-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
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

.preview-info {
  font-size: 14px;
  font-weight: 600;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-secondary);
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  padding: 20px;
  background: 
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
    linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
    linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  border-radius: 10px;
  margin-bottom: 16px;
  overflow: auto;
}

.dark .preview-container {
  background: 
    linear-gradient(45deg, #333 25%, transparent 25%),
    linear-gradient(-45deg, #333 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #333 75%),
    linear-gradient(-45deg, transparent 75%, #333 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.preview-image {
  max-width: 100%;
  max-height: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn.primary {
  background: var(--primary-color);
  color: white;
}

.action-btn.primary:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.action-btn:not(.primary) {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.action-btn:not(.primary):hover {
  background: var(--border-color);
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
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
