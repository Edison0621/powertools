<script setup>
import { ref, computed } from 'vue'

const count = ref(5)
const unit = ref('paragraphs')
const startWithLorem = ref(true)

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
]

const generateWord = () => {
  return loremWords[Math.floor(Math.random() * loremWords.length)]
}

const generateSentence = (wordCount = null) => {
  const count = wordCount || (Math.floor(Math.random() * 10) + 5)
  const words = []
  for (let i = 0; i < count; i++) {
    words.push(generateWord())
  }
  const sentence = words.join(' ')
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.'
}

const generateParagraph = () => {
  const sentenceCount = Math.floor(Math.random() * 4) + 3
  const sentences = []
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence())
  }
  return sentences.join(' ')
}

const output = computed(() => {
  let result = []
  
  if (unit.value === 'words') {
    const words = []
    for (let i = 0; i < count.value; i++) {
      words.push(generateWord())
    }
    if (startWithLorem.value && count.value >= 2) {
      words[0] = 'Lorem'
      words[1] = 'ipsum'
    }
    result = [words.join(' ')]
  } else if (unit.value === 'sentences') {
    for (let i = 0; i < count.value; i++) {
      result.push(generateSentence())
    }
    if (startWithLorem.value && result.length > 0) {
      result[0] = 'Lorem ipsum ' + result[0].toLowerCase()
    }
  } else {
    for (let i = 0; i < count.value; i++) {
      result.push(generateParagraph())
    }
    if (startWithLorem.value && result.length > 0) {
      result[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + result[0]
    }
  }
  
  return result.join('\n\n')
})

const copy = async () => {
  try {
    await navigator.clipboard.writeText(output.value)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}
</script>

<template>
  <div class="tool-container">
    <div class="settings-panel">
      <div class="settings-grid">
        <div class="setting-group">
          <label>数量: {{ count }}</label>
          <input 
            v-model.number="count" 
            type="range" 
            min="1" 
            max="20"
            class="range-input"
          />
        </div>

        <div class="setting-group">
          <label>单位</label>
          <select v-model="unit" class="select-input">
            <option value="paragraphs">段落</option>
            <option value="sentences">句子</option>
            <option value="words">单词</option>
          </select>
        </div>
      </div>

      <label class="checkbox-label">
        <input v-model="startWithLorem" type="checkbox" />
        <span>以 "Lorem ipsum" 开头</span>
      </label>
    </div>

    <div class="output-section">
      <div class="output-header">
        <label>生成的文本</label>
        <button @click="copy" class="copy-btn">📋 复制</button>
      </div>
      <div class="output-text">{{ output }}</div>
    </div>

    <div class="quick-actions">
      <h4>快速生成</h4>
      <div class="actions-grid">
        <button @click="count = 1; unit = 'paragraphs'" class="quick-btn">
          1 段落
        </button>
        <button @click="count = 3; unit = 'paragraphs'" class="quick-btn">
          3 段落
        </button>
        <button @click="count = 5; unit = 'paragraphs'" class="quick-btn">
          5 段落
        </button>
        <button @click="count = 10; unit = 'sentences'" class="quick-btn">
          10 句子
        </button>
        <button @click="count = 50; unit = 'words'" class="quick-btn">
          50 单词
        </button>
        <button @click="count = 100; unit = 'words'" class="quick-btn">
          100 单词
        </button>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 关于 Lorem Ipsum</h4>
      <p>Lorem Ipsum 是印刷和排版行业的标准占位文本，自16世纪以来一直被使用。它源于古罗马哲学家西塞罗的著作。</p>
      <p>使用占位文本可以让设计师专注于视觉设计，而不被实际内容分散注意力。</p>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.settings-panel {
  padding: 24px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-group label {
  font-size: 14px;
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

.select-input {
  padding: 10px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  cursor: pointer;
  outline: none;
}

.select-input:focus {
  border-color: var(--primary-color);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  user-select: none;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.output-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.output-header label {
  font-weight: 600;
  font-size: 16px;
  color: var(--text-color);
}

.copy-btn {
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

.copy-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.output-text {
  padding: 24px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-color);
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
  white-space: pre-wrap;
}

.quick-actions {
  padding: 20px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.quick-actions h4 {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.quick-btn {
  padding: 10px 16px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.quick-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-2px);
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

.info-box p {
  padding: 8px 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
