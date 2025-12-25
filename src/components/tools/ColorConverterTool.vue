<script setup>
import { ref, watch } from 'vue'

const hexInput = ref('#3b82f6')
const rgbR = ref(59)
const rgbG = ref(130)
const rgbB = ref(246)
const hslH = ref(217)
const hslS = ref(91)
const hslL = ref(60)

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

const rgbToHsl = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

const updateFromHex = () => {
  const rgb = hexToRgb(hexInput.value)
  if (rgb) {
    rgbR.value = rgb.r
    rgbG.value = rgb.g
    rgbB.value = rgb.b
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    hslH.value = hsl.h
    hslS.value = hsl.s
    hslL.value = hsl.l
  }
}

const updateFromRgb = () => {
  hexInput.value = rgbToHex(rgbR.value, rgbG.value, rgbB.value)
  const hsl = rgbToHsl(rgbR.value, rgbG.value, rgbB.value)
  hslH.value = hsl.h
  hslS.value = hsl.s
  hslL.value = hsl.l
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}
</script>

<template>
  <div class="tool-container">
    <div class="color-preview" :style="{ backgroundColor: hexInput }">
      <div class="preview-label">颜色预览</div>
    </div>

    <div class="color-formats">
      <!-- HEX -->
      <div class="format-section">
        <div class="format-header">
          <h3>HEX</h3>
          <button @click="copy(hexInput)" class="copy-btn">📋</button>
        </div>
        <input 
          v-model="hexInput"
          @input="updateFromHex"
          type="text"
          class="format-input"
          placeholder="#000000"
        />
      </div>

      <!-- RGB -->
      <div class="format-section">
        <div class="format-header">
          <h3>RGB</h3>
          <button @click="copy(`rgb(${rgbR}, ${rgbG}, ${rgbB})`)" class="copy-btn">📋</button>
        </div>
        <div class="rgb-inputs">
          <div class="rgb-input-group">
            <label>R</label>
            <input 
              v-model.number="rgbR"
              @input="updateFromRgb"
              type="number"
              min="0"
              max="255"
              class="number-input"
            />
          </div>
          <div class="rgb-input-group">
            <label>G</label>
            <input 
              v-model.number="rgbG"
              @input="updateFromRgb"
              type="number"
              min="0"
              max="255"
              class="number-input"
            />
          </div>
          <div class="rgb-input-group">
            <label>B</label>
            <input 
              v-model.number="rgbB"
              @input="updateFromRgb"
              type="number"
              min="0"
              max="255"
              class="number-input"
            />
          </div>
        </div>
        <div class="format-output">
          rgb({{ rgbR }}, {{ rgbG }}, {{ rgbB }})
        </div>
      </div>

      <!-- HSL -->
      <div class="format-section">
        <div class="format-header">
          <h3>HSL</h3>
          <button @click="copy(`hsl(${hslH}, ${hslS}%, ${hslL}%)`)" class="copy-btn">📋</button>
        </div>
        <div class="hsl-info">
          <div class="hsl-item">
            <span class="hsl-label">H:</span>
            <span>{{ hslH }}°</span>
          </div>
          <div class="hsl-item">
            <span class="hsl-label">S:</span>
            <span>{{ hslS }}%</span>
          </div>
          <div class="hsl-item">
            <span class="hsl-label">L:</span>
            <span>{{ hslL }}%</span>
          </div>
        </div>
        <div class="format-output">
          hsl({{ hslH }}, {{ hslS }}%, {{ hslL }}%)
        </div>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 说明</h4>
      <ul>
        <li><strong>HEX:</strong> 十六进制颜色码，如 #3b82f6</li>
        <li><strong>RGB:</strong> 红绿蓝颜色模型，每个值范围 0-255</li>
        <li><strong>HSL:</strong> 色相(0-360°)、饱和度(0-100%)、亮度(0-100%)</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.color-preview {
  height: 200px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--border-color);
  transition: all 0.3s;
}

.preview-label {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
}

.color-formats {
  display: grid;
  gap: 20px;
}

.format-section {
  padding: 20px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.format-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.format-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
}

.copy-btn {
  padding: 6px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--border-color);
}

.format-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
  outline: none;
}

.format-input:focus {
  border-color: var(--primary-color);
}

.rgb-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 12px;
}

.rgb-input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rgb-input-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.number-input {
  padding: 10px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  color: var(--text-color);
  outline: none;
}

.number-input:focus {
  border-color: var(--primary-color);
}

.format-output {
  padding: 12px 16px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  color: var(--text-color);
}

.hsl-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 12px;
}

.hsl-item {
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: var(--text-color);
}

.hsl-label {
  font-weight: 700;
  margin-right: 4px;
  color: var(--primary-color);
}

.info-box {
  padding: 20px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-box h4 {
  margin-bottom: 12px;
  color: var(--text-color);
  font-size: 15px;
}

.info-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-box li {
  padding: 8px 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

.info-box li strong {
  color: var(--primary-color);
  font-weight: 600;
}

@media (max-width: 768px) {
  .color-picker-wrapper {
    padding: 16px;
  }

  .color-preview {
    height: 120px;
  }

  .picker-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .formats-grid {
    grid-template-columns: 1fr;
  }

  .hsl-info {
    grid-template-columns: 1fr;
  }

  .info-box {
    padding: 16px;
  }
}
</style>
