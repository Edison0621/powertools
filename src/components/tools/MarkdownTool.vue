<script setup>
import { ref, computed } from 'vue'

const input = ref('')
const showPreview = ref(true)

// Markdown转HTML
const renderMarkdown = (text) => {
  if (!text) return ''
  
  const lines = text.split('\n')
  const tokens = []
  let i = 0
  
  while (i < lines.length) {
    const line = lines[i]
    
    // 代码块
    if (line.startsWith('```')) {
      const lang = line.substring(3).trim()
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      tokens.push({ type: 'code', lang, content: codeLines.join('\n') })
      i++
      continue
    }
    
    // 标题
    if (line.startsWith('# ')) {
      tokens.push({ type: 'h1', content: line.substring(2) })
      i++
      continue
    }
    if (line.startsWith('## ')) {
      tokens.push({ type: 'h2', content: line.substring(3) })
      i++
      continue
    }
    if (line.startsWith('### ')) {
      tokens.push({ type: 'h3', content: line.substring(4) })
      i++
      continue
    }
    
    // 水平线
    if (line === '---' || line === '***') {
      tokens.push({ type: 'hr' })
      i++
      continue
    }
    
    // 引用
    if (line.startsWith('> ')) {
      const quoteLines = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].substring(2))
        i++
      }
      tokens.push({ type: 'blockquote', content: quoteLines.join(' ') })
      continue
    }
    
    // 无序列表
    if (line.startsWith('* ') || line.startsWith('- ')) {
      const items = []
      while (i < lines.length && (lines[i].startsWith('* ') || lines[i].startsWith('- '))) {
        items.push(lines[i].substring(2))
        i++
      }
      tokens.push({ type: 'ul', items })
      continue
    }
    
    // 有序列表
    if (/^\d+\. /.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i++
      }
      tokens.push({ type: 'ol', items })
      continue
    }
    
    // 空行
    if (line.trim() === '') {
      i++
      continue
    }
    
    // 段落
    const paraLines = []
    while (i < lines.length && lines[i].trim() !== '' && 
           !lines[i].startsWith('#') && !lines[i].startsWith('```') &&
           !lines[i].startsWith('* ') && !lines[i].startsWith('- ') &&
           !lines[i].startsWith('> ') && !/^\d+\. /.test(lines[i]) &&
           lines[i] !== '---' && lines[i] !== '***') {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length > 0) {
      tokens.push({ type: 'p', content: paraLines.join(' ') })
    }
  }
  
  // 渲染tokens为HTML
  return tokens.map(token => {
    switch (token.type) {
      case 'h1':
        return `<h1>${renderInline(token.content)}</h1>`
      case 'h2':
        return `<h2>${renderInline(token.content)}</h2>`
      case 'h3':
        return `<h3>${renderInline(token.content)}</h3>`
      case 'p':
        return `<p>${renderInline(token.content)}</p>`
      case 'code':
        return `<pre><code class="language-${token.lang || 'text'}">${escapeHtml(token.content)}</code></pre>`
      case 'ul':
        return `<ul>${token.items.map(item => `<li>${renderInline(item)}</li>`).join('')}</ul>`
      case 'ol':
        return `<ol>${token.items.map(item => `<li>${renderInline(item)}</li>`).join('')}</ol>`
      case 'blockquote':
        return `<blockquote>${renderInline(token.content)}</blockquote>`
      case 'hr':
        return '<hr />'
      default:
        return ''
    }
  }).join('\n')
}

// 渲染行内元素
const renderInline = (text) => {
  let html = text
  
  // 图片（先处理，避免和链接冲突）
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
  
  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
  
  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // 粗体（先处理双星号，避免被斜体吃掉）
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>')
  
  // 斜体
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>')
  
  // 删除线
  html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>')
  
  return html
}

const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

const preview = computed(() => renderMarkdown(input.value))

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const copyHtml = async () => {
  await copy(preview.value)
}

const clear = () => {
  input.value = ''
}

const loadExample = () => {
  input.value = `# Markdown 示例文档

## 这是二级标题

### 这是三级标题

这是一个普通段落，支持**粗体**、*斜体*和~~删除线~~。

你可以使用\`行内代码\`来标记代码。

## 列表

### 无序列表
* 列表项 1
* 列表项 2
* 列表项 3

### 有序列表
1. 第一项
2. 第二项
3. 第三项

## 引用

> 这是一个引用块
> 可以包含多行

## 代码块

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## 链接和图片

[访问GitHub](https://github.com)

![示例图片](https://via.placeholder.com/150)

---

**版权所有 © 2024**`
}
</script>

<template>
  <div class="tool-container">
    <div class="controls">
      <div class="view-toggle">
        <button 
          @click="showPreview = false"
          :class="['view-btn', { active: !showPreview }]"
        >
          📝 编辑
        </button>
        <button 
          @click="showPreview = true"
          :class="['view-btn', { active: showPreview }]"
        >
          👁️ 预览
        </button>
      </div>

      <div class="actions">
        <button @click="copyHtml" class="action-btn">📋 复制HTML</button>
        <button @click="loadExample" class="action-btn">📄 示例</button>
        <button @click="clear" class="action-btn">🗑️ 清空</button>
      </div>
    </div>

    <div class="editor-container">
      <div v-show="!showPreview" class="editor-section">
        <textarea 
          v-model="input"
          placeholder="输入Markdown..."
          class="markdown-input"
        ></textarea>
      </div>

      <div v-show="showPreview" class="preview-section">
        <div class="markdown-preview" v-html="preview"></div>
      </div>
    </div>

    <div class="info-box">
      <h4>ℹ️ 支持的语法</h4>
      <div class="syntax-grid">
        <div class="syntax-item">
          <code># 标题</code>
          <span>一级标题</span>
        </div>
        <div class="syntax-item">
          <code>**粗体**</code>
          <span>粗体文字</span>
        </div>
        <div class="syntax-item">
          <code>*斜体*</code>
          <span>斜体文字</span>
        </div>
        <div class="syntax-item">
          <code>~~删除~~</code>
          <span>删除线</span>
        </div>
        <div class="syntax-item">
          <code>`代码`</code>
          <span>行内代码</span>
        </div>
        <div class="syntax-item">
          <code>[链接](url)</code>
          <span>超链接</span>
        </div>
        <div class="syntax-item">
          <code>* 列表</code>
          <span>无序列表</span>
        </div>
        <div class="syntax-item">
          <code>> 引用</code>
          <span>引用块</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.view-toggle {
  display: flex;
  gap: 8px;
}

.view-btn {
  padding: 8px 16px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.view-btn:hover {
  border-color: var(--primary-color);
}

.view-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  background: var(--bg-color);
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

.editor-container {
  min-height: 500px;
}

.editor-section,
.preview-section {
  min-height: 500px;
}

.markdown-input {
  width: 100%;
  min-height: 500px;
  padding: 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.markdown-input:focus {
  border-color: var(--primary-color);
}

.markdown-preview {
  padding: 20px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  min-height: 500px;
  color: var(--text-color);
  line-height: 1.8;
}

.markdown-preview :deep(h1) {
  font-size: 28px;
  font-weight: 700;
  margin: 20px 0 12px;
  color: var(--text-color);
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 8px;
}

.markdown-preview :deep(h2) {
  font-size: 24px;
  font-weight: 700;
  margin: 16px 0 10px;
  color: var(--text-color);
}

.markdown-preview :deep(h3) {
  font-size: 20px;
  font-weight: 700;
  margin: 14px 0 8px;
  color: var(--text-color);
}

.markdown-preview :deep(p) {
  margin: 12px 0;
  line-height: 1.8;
}

.markdown-preview :deep(strong) {
  font-weight: 700;
  color: var(--primary-color);
}

.markdown-preview :deep(em) {
  font-style: italic;
}

.markdown-preview :deep(del) {
  text-decoration: line-through;
  color: var(--text-secondary);
}

.markdown-preview :deep(code) {
  padding: 2px 6px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  color: #e83e8c;
}

.markdown-preview :deep(pre) {
  padding: 16px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow-x: auto;
  margin: 12px 0;
}

.markdown-preview :deep(pre code) {
  padding: 0;
  background: none;
  border: none;
  color: var(--text-color);
}

.markdown-preview :deep(ul) {
  margin: 12px 0;
  padding-left: 24px;
}

.markdown-preview :deep(ol) {
  margin: 12px 0;
  padding-left: 24px;
}

.markdown-preview :deep(li) {
  margin: 6px 0;
  line-height: 1.6;
}

.markdown-preview :deep(blockquote) {
  margin: 12px 0;
  padding: 12px 16px;
  background: var(--card-bg);
  border-left: 4px solid var(--primary-color);
  color: var(--text-secondary);
}

.markdown-preview :deep(a) {
  color: var(--primary-color);
  text-decoration: none;
}

.markdown-preview :deep(a:hover) {
  text-decoration: underline;
}

.markdown-preview :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 12px 0;
}

.markdown-preview :deep(hr) {
  margin: 20px 0;
  border: none;
  border-top: 2px solid var(--border-color);
}

.info-box {
  padding: 12px;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-box h4 {
  margin-bottom: 12px;
  color: var(--text-color);
  font-size: 13px;
}

.syntax-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
}

.syntax-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  background: var(--card-bg);
  border-radius: 6px;
}

.syntax-item code {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 12px;
  color: var(--primary-color);
  font-weight: 600;
}

.syntax-item span {
  font-size: 11px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    gap: 12px;
  }
  
  .actions {
    width: 100%;
  }
  
  .action-btn {
    flex: 1;
  }
}
</style>
