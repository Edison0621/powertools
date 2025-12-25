<script setup>
import { ref, computed } from 'vue'

const text = ref('')

const stats = computed(() => {
  const content = text.value
  
  return {
    characters: content.length,
    charactersNoSpaces: content.replace(/\s/g, '').length,
    words: content.trim() ? content.trim().split(/\s+/).length : 0,
    lines: content ? content.split('\n').length : 0,
    paragraphs: content.trim() ? content.trim().split(/\n\n+/).length : 0,
    sentences: content.trim() ? (content.match(/[.!?]+/g) || []).length : 0,
    readTime: Math.ceil((content.trim() ? content.trim().split(/\s+/).length : 0) / 200) // 假设每分钟200字
  }
})

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text.value)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const clear = () => {
  text.value = ''
}

const example = () => {
  text.value = `这是一个示例文本。
  
它包含多个段落，用于演示字数统计功能。

您可以在这里输入任何文本，工具会实时统计各项数据。

支持中英文混合统计！`
}
</script>

<template>
  <div class="tool-container">
    <div class="editor-section">
      <div class="editor-header">
        <label>输入文本</label>
        <div class="header-actions">
          <button @click="example" class="action-btn">📄 示例</button>
          <button @click="clear" class="action-btn">🗑️ 清空</button>
        </div>
      </div>
      <textarea 
        v-model="text"
        placeholder="在此输入或粘贴文本..."
        class="editor-textarea"
      ></textarea>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">🔤</div>
        <div class="stat-value">{{ stats.characters.toLocaleString() }}</div>
        <div class="stat-label">字符数</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-value">{{ stats.charactersNoSpaces.toLocaleString() }}</div>
        <div class="stat-label">字符数（无空格）</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">📄</div>
        <div class="stat-value">{{ stats.words.toLocaleString() }}</div>
        <div class="stat-label">单词/词数</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">📑</div>
        <div class="stat-value">{{ stats.lines.toLocaleString() }}</div>
        <div class="stat-label">行数</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">📋</div>
        <div class="stat-value">{{ stats.paragraphs.toLocaleString() }}</div>
        <div class="stat-label">段落数</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">💬</div>
        <div class="stat-value">{{ stats.sentences.toLocaleString() }}</div>
        <div class="stat-label">句子数</div>
      </div>

      <div class="stat-card highlight">
        <div class="stat-icon">⏱️</div>
        <div class="stat-value">{{ stats.readTime }} 分钟</div>
        <div class="stat-label">预估阅读时间</div>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 说明</h4>
      <ul>
        <li>阅读时间基于平均阅读速度 200 字/分钟计算</li>
        <li>支持中英文混合统计</li>
        <li>实时更新统计数据</li>
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

.editor-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-header label {
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

.editor-textarea {
  width: 100%;
  min-height: 300px;
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.editor-textarea:focus {
  border-color: var(--primary-color);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  padding: 20px;
  background: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  text-align: center;
  transition: all 0.2s;
}

.stat-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.stat-card.highlight {
  background: linear-gradient(135deg, var(--primary-color) 0%, #2563eb 100%);
  border-color: var(--primary-color);
}

.stat-card.highlight .stat-icon,
.stat-card.highlight .stat-value,
.stat-card.highlight .stat-label {
  color: white;
}

.stat-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
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
  padding: 6px 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

.info-box li::before {
  content: '• ';
  color: var(--primary-color);
  font-weight: bold;
  margin-right: 8px;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
