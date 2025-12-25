<script setup>
import { ref, computed } from 'vue'

const imageUrl = ref('')
const imageList = ref([])
const loading = ref(false)
const error = ref('')
const currentIndex = ref(0)

const currentImage = computed(() => {
  return imageList.value[currentIndex.value] || null
})

const hasMultipleImages = computed(() => {
  return imageList.value.length > 1
})

const addImage = () => {
  const url = imageUrl.value.trim()
  
  if (!url) {
    error.value = '请输入图片链接'
    return
  }
  
  // 简单的URL验证
  try {
    new URL(url)
  } catch (e) {
    error.value = '无效的URL格式'
    return
  }
  
  // 检查是否已存在
  if (imageList.value.some(img => img.url === url)) {
    error.value = '该图片已添加'
    return
  }
  
  loading.value = true
  error.value = ''
  
  const img = new Image()
  
  img.onload = () => {
    imageList.value.push({
      url: url,
      width: img.naturalWidth,
      height: img.naturalHeight,
      loaded: true,
      error: false
    })
    imageUrl.value = ''
    currentIndex.value = imageList.value.length - 1
    loading.value = false
  }
  
  img.onerror = () => {
    error.value = '图片加载失败，请检查链接是否有效'
    loading.value = false
  }
  
  img.src = url
}

const removeImage = (index) => {
  imageList.value.splice(index, 1)
  if (currentIndex.value >= imageList.value.length) {
    currentIndex.value = Math.max(0, imageList.value.length - 1)
  }
}

const clearAll = () => {
  imageList.value = []
  currentIndex.value = 0
  imageUrl.value = ''
  error.value = ''
}

const previous = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const next = () => {
  if (currentIndex.value < imageList.value.length - 1) {
    currentIndex.value++
  }
}

const viewImage = (index) => {
  currentIndex.value = index
}

const downloadImage = async () => {
  if (!currentImage.value) return
  
  try {
    const response = await fetch(currentImage.value.url)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `image-${Date.now()}.${blob.type.split('/')[1] || 'jpg'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (e) {
    alert('下载失败: ' + e.message)
  }
}

const copyUrl = async () => {
  if (!currentImage.value) return
  
  try {
    await navigator.clipboard.writeText(currentImage.value.url)
    alert('已复制图片链接')
  } catch (e) {
    alert('复制失败')
  }
}

const loadExample = () => {
  imageUrl.value = 'https://picsum.photos/800/600'
  addImage()
}
</script>

<template>
  <div class="tool-container">
    <div class="input-section">
      <div class="input-row">
        <input 
          v-model="imageUrl"
          type="text"
          placeholder="输入图片URL，例如: https://example.com/image.jpg"
          class="url-input"
          @keyup.enter="addImage"
        />
        <button @click="addImage" class="add-btn" :disabled="loading">
          {{ loading ? '加载中...' : '➕ 添加' }}
        </button>
        <button @click="loadExample" class="example-btn">📄 示例</button>
        <button @click="clearAll" class="clear-btn" :disabled="imageList.length === 0">
          🗑️ 清空
        </button>
      </div>
    </div>

    <div v-if="error" class="error-message">
      ⚠️ {{ error }}
    </div>

    <div v-if="currentImage" class="preview-section">
      <div class="preview-header">
        <div class="image-info">
          <h3>图片预览 ({{ currentIndex + 1 }}/{{ imageList.length }})</h3>
          <span class="image-size">
            {{ currentImage.width }} × {{ currentImage.height }}
          </span>
        </div>
        <div class="preview-actions">
          <button @click="copyUrl" class="action-btn">📋 复制链接</button>
          <button @click="downloadImage" class="action-btn">⬇️ 下载</button>
        </div>
      </div>

      <div class="image-viewer">
        <img 
          :src="currentImage.url" 
          :alt="`图片 ${currentIndex + 1}`"
          class="preview-image"
        />
      </div>

      <div v-if="hasMultipleImages" class="navigation">
        <button 
          @click="previous" 
          class="nav-btn"
          :disabled="currentIndex === 0"
        >
          ◀ 上一张
        </button>
        <span class="nav-text">{{ currentIndex + 1 }} / {{ imageList.length }}</span>
        <button 
          @click="next" 
          class="nav-btn"
          :disabled="currentIndex === imageList.length - 1"
        >
          下一张 ▶
        </button>
      </div>
    </div>

    <div v-if="imageList.length > 0" class="thumbnail-section">
      <h4>图片列表 ({{ imageList.length }})</h4>
      <div class="thumbnail-grid">
        <div 
          v-for="(image, index) in imageList" 
          :key="index"
          :class="['thumbnail-item', { active: index === currentIndex }]"
          @click="viewImage(index)"
        >
          <img :src="image.url" :alt="`缩略图 ${index + 1}`" class="thumbnail-img" />
          <div class="thumbnail-overlay">
            <button @click.stop="removeImage(index)" class="remove-btn">✕</button>
          </div>
          <div class="thumbnail-info">
            {{ image.width }} × {{ image.height }}
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li>输入图片的完整URL链接（支持http://和https://）</li>
        <li>支持添加多张图片，可以在列表中切换查看</li>
        <li>显示图片的原始尺寸信息</li>
        <li>支持复制链接和下载图片</li>
        <li>点击缩略图快速切换预览</li>
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
  padding: 16px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.input-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.url-input {
  flex: 1;
  padding: 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.url-input:focus {
  border-color: var(--primary-color);
}

.add-btn,
.example-btn,
.clear-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.add-btn {
  background: var(--primary-color);
  color: white;
}

.add-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.add-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.example-btn {
  background: #10b981;
  color: white;
}

.example-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}

.clear-btn {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.clear-btn:hover:not(:disabled) {
  background: var(--border-color);
}

.clear-btn:disabled {
  opacity: 0.5;
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

.preview-section {
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.image-info h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
}

.image-size {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  font-family: 'Consolas', 'Monaco', monospace;
}

.preview-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 8px 16px;
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

.image-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: var(--card-bg);
  border-radius: 10px;
  padding: 20px;
  overflow: auto;
}

.preview-image {
  max-width: 100%;
  max-height: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark .preview-image {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 16px;
}

.nav-btn {
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

.nav-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.nav-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  font-family: 'Consolas', 'Monaco', monospace;
}

.thumbnail-section {
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.thumbnail-section h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.thumbnail-item {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.2s;
}

.thumbnail-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.thumbnail-item.active {
  border-color: var(--primary-color);
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-overlay {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.thumbnail-item:hover .thumbnail-overlay {
  opacity: 1;
}

.remove-btn {
  width: 24px;
  height: 24px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.thumbnail-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
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
  .input-row {
    flex-direction: column;
  }
  
  .url-input {
    width: 100%;
  }
  
  .preview-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .thumbnail-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}
</style>
