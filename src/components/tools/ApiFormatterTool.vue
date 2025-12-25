<script setup>
import { ref, computed } from 'vue'

const apiName = ref('')
const apiPath = ref('')
const apiMethod = ref('GET')
const apiDescription = ref('')
const apiParams = ref([{ name: '', type: 'string', required: true, description: '' }])
const apiHeaders = ref([{ name: 'Content-Type', value: 'application/json', description: '内容类型' }])
const apiResponse = ref('')
const docFormat = ref('markdown')

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
const paramTypes = ['string', 'number', 'boolean', 'object', 'array']

// 添加参数
const addParam = () => {
  apiParams.value.push({ name: '', type: 'string', required: true, description: '' })
}

// 删除参数
const removeParam = (index) => {
  apiParams.value.splice(index, 1)
}

// 添加请求头
const addHeader = () => {
  apiHeaders.value.push({ name: '', value: '', description: '' })
}

// 删除请求头
const removeHeader = (index) => {
  apiHeaders.value.splice(index, 1)
}

// 生成文档
const generatedDoc = computed(() => {
  if (!apiName.value || !apiPath.value) return ''
  
  if (docFormat.value === 'markdown') {
    return generateMarkdown()
  } else {
    return generateJSON()
  }
})

// 生成Markdown文档
const generateMarkdown = () => {
  let doc = `# ${apiName.value}\n\n`
  
  if (apiDescription.value) {
    doc += `${apiDescription.value}\n\n`
  }
  
  doc += `## 基本信息\n\n`
  doc += `- **接口路径**: \`${apiPath.value}\`\n`
  doc += `- **请求方法**: \`${apiMethod.value}\`\n\n`
  
  // 请求头
  if (apiHeaders.value.some(h => h.name)) {
    doc += `## 请求头\n\n`
    doc += `| 参数名 | 示例值 | 说明 |\n`
    doc += `| --- | --- | --- |\n`
    apiHeaders.value.forEach(header => {
      if (header.name) {
        doc += `| ${header.name} | ${header.value} | ${header.description} |\n`
      }
    })
    doc += `\n`
  }
  
  // 请求参数
  if (apiParams.value.some(p => p.name)) {
    doc += `## 请求参数\n\n`
    doc += `| 参数名 | 类型 | 必填 | 说明 |\n`
    doc += `| --- | --- | --- | --- |\n`
    apiParams.value.forEach(param => {
      if (param.name) {
        doc += `| ${param.name} | ${param.type} | ${param.required ? '是' : '否'} | ${param.description} |\n`
      }
    })
    doc += `\n`
  }
  
  // 响应示例
  if (apiResponse.value) {
    doc += `## 响应示例\n\n`
    doc += `\`\`\`json\n`
    doc += apiResponse.value
    doc += `\n\`\`\`\n\n`
  }
  
  // 请求示例
  doc += `## 请求示例\n\n`
  doc += `### cURL\n\n`
  doc += `\`\`\`bash\n`
  doc += `curl -X ${apiMethod.value} '${apiPath.value}'`
  
  apiHeaders.value.forEach(header => {
    if (header.name) {
      doc += ` \\\n  -H '${header.name}: ${header.value}'`
    }
  })
  
  if (['POST', 'PUT', 'PATCH'].includes(apiMethod.value) && apiParams.value.some(p => p.name)) {
    doc += ` \\\n  -d '`
    const body = {}
    apiParams.value.forEach(param => {
      if (param.name) {
        body[param.name] = param.type === 'number' ? 0 : param.type === 'boolean' ? false : ''
      }
    })
    doc += JSON.stringify(body, null, 2).replace(/\n/g, '\n    ')
    doc += `'`
  }
  
  doc += `\n\`\`\`\n\n`
  
  // JavaScript示例
  doc += `### JavaScript (Fetch)\n\n`
  doc += `\`\`\`javascript\n`
  doc += `fetch('${apiPath.value}', {\n`
  doc += `  method: '${apiMethod.value}',\n`
  doc += `  headers: {\n`
  apiHeaders.value.forEach((header, idx) => {
    if (header.name) {
      doc += `    '${header.name}': '${header.value}'${idx < apiHeaders.value.length - 1 ? ',' : ''}\n`
    }
  })
  doc += `  }`
  
  if (['POST', 'PUT', 'PATCH'].includes(apiMethod.value) && apiParams.value.some(p => p.name)) {
    doc += `,\n  body: JSON.stringify({\n`
    apiParams.value.forEach((param, idx) => {
      if (param.name) {
        const value = param.type === 'number' ? 0 : param.type === 'boolean' ? false : `''`
        doc += `    ${param.name}: ${value}${idx < apiParams.value.length - 1 ? ',' : ''}\n`
      }
    })
    doc += `  })`
  }
  
  doc += `\n})\n`
  doc += `  .then(res => res.json())\n`
  doc += `  .then(data => console.log(data))\n`
  doc += `\`\`\`\n`
  
  return doc
}

// 生成JSON文档
const generateJSON = () => {
  const doc = {
    name: apiName.value,
    path: apiPath.value,
    method: apiMethod.value,
    description: apiDescription.value,
    headers: apiHeaders.value.filter(h => h.name),
    parameters: apiParams.value.filter(p => p.name),
    response: apiResponse.value ? JSON.parse(apiResponse.value) : null
  }
  return JSON.stringify(doc, null, 2)
}

// 复制文档
const copyDoc = async () => {
  try {
    await navigator.clipboard.writeText(generatedDoc.value)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

// 下载文档
const downloadDoc = () => {
  const ext = docFormat.value === 'markdown' ? 'md' : 'json'
  const blob = new Blob([generatedDoc.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${apiName.value || 'api-doc'}.${ext}`
  a.click()
  URL.revokeObjectURL(url)
}

// 加载示例
const loadExample = () => {
  apiName.value = '获取用户信息'
  apiPath.value = 'https://api.example.com/v1/users/:id'
  apiMethod.value = 'GET'
  apiDescription.value = '根据用户ID获取用户详细信息'
  apiParams.value = [
    { name: 'id', type: 'string', required: true, description: '用户ID' }
  ]
  apiHeaders.value = [
    { name: 'Content-Type', value: 'application/json', description: '内容类型' },
    { name: 'Authorization', value: 'Bearer {token}', description: '认证令牌' }
  ]
  apiResponse.value = JSON.stringify({
    code: 200,
    message: 'Success',
    data: {
      id: '12345',
      name: '张三',
      email: 'zhangsan@example.com',
      createdAt: '2025-01-01T00:00:00Z'
    }
  }, null, 2)
}
</script>

<template>
  <div class="tool-container">
    <!-- 快速示例 -->
    <div class="example-bar">
      <button @click="loadExample" class="example-btn">📖 加载示例</button>
    </div>

    <!-- API信息配置 -->
    <div class="config-section">
      <h3>📝 API基本信息</h3>
      
      <div class="form-grid">
        <div class="form-group">
          <label>接口名称 *</label>
          <input v-model="apiName" type="text" placeholder="例如：获取用户信息" class="form-input" />
        </div>
        
        <div class="form-group">
          <label>请求方法 *</label>
          <select v-model="apiMethod" class="form-select">
            <option v-for="m in methods" :key="m" :value="m">{{ m }}</option>
          </select>
        </div>
      </div>
      
      <div class="form-group">
        <label>接口路径 *</label>
        <input v-model="apiPath" type="text" placeholder="例如：https://api.example.com/v1/users/:id" class="form-input" />
      </div>
      
      <div class="form-group">
        <label>接口描述</label>
        <textarea v-model="apiDescription" placeholder="描述这个接口的作用..." class="form-textarea" rows="2"></textarea>
      </div>
    </div>

    <!-- 请求头配置 -->
    <div class="config-section">
      <div class="section-header">
        <h3>📋 请求头</h3>
        <button @click="addHeader" class="add-btn">➕ 添加</button>
      </div>
      
      <div class="params-list">
        <div v-for="(header, index) in apiHeaders" :key="index" class="param-row">
          <input v-model="header.name" type="text" placeholder="参数名" class="param-input" />
          <input v-model="header.value" type="text" placeholder="示例值" class="param-input" />
          <input v-model="header.description" type="text" placeholder="说明" class="param-input" />
          <button @click="removeHeader(index)" class="remove-btn">🗑️</button>
        </div>
      </div>
    </div>

    <!-- 请求参数配置 -->
    <div class="config-section">
      <div class="section-header">
        <h3>📊 请求参数</h3>
        <button @click="addParam" class="add-btn">➕ 添加</button>
      </div>
      
      <div class="params-list">
        <div v-for="(param, index) in apiParams" :key="index" class="param-row">
          <input v-model="param.name" type="text" placeholder="参数名" class="param-input" />
          <select v-model="param.type" class="param-select">
            <option v-for="t in paramTypes" :key="t" :value="t">{{ t }}</option>
          </select>
          <label class="checkbox-label">
            <input type="checkbox" v-model="param.required" />
            <span>必填</span>
          </label>
          <input v-model="param.description" type="text" placeholder="说明" class="param-input flex-1" />
          <button @click="removeParam(index)" class="remove-btn">🗑️</button>
        </div>
      </div>
    </div>

    <!-- 响应示例 -->
    <div class="config-section response-section">
      <h3>📨 响应示例</h3>
      <textarea 
        v-model="apiResponse"
        placeholder="输入JSON格式的响应示例..."
        class="form-textarea response-textarea"
        rows="12"
      ></textarea>
    </div>

    <!-- 生成文档 -->
    <div class="output-section">
      <div class="output-header">
        <h3>📄 生成的文档</h3>
        <div class="output-controls">
          <select v-model="docFormat" class="format-select">
            <option value="markdown">Markdown</option>
            <option value="json">JSON</option>
          </select>
          <button @click="copyDoc" class="action-btn">📋 复制</button>
          <button @click="downloadDoc" class="action-btn">⬇️ 下载</button>
        </div>
      </div>
      
      <pre class="doc-output">{{ generatedDoc || '请填写API基本信息...' }}</pre>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li>填写API的基本信息（名称、路径、方法）</li>
        <li>添加请求头和请求参数</li>
        <li>输入JSON格式的响应示例</li>
        <li>自动生成Markdown或JSON格式的API文档</li>
        <li>包含cURL和JavaScript请求示例</li>
        <li>支持复制和下载文档</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.example-bar {
  padding: 12px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.example-btn {
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

.example-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.config-section,
.output-section {
  padding: 16px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.add-btn {
  padding: 6px 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.add-btn:hover {
  background: var(--primary-hover);
}

.form-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
}

.form-input,
.form-select,
.form-textarea {
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 13px;
  color: var(--text-color);
  outline: none;
  font-family: 'Consolas', 'Monaco', monospace;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: var(--primary-color);
}

.form-textarea {
  resize: vertical;
  line-height: 1.6;
  min-height: 120px;
}

.response-textarea {
  min-height: 200px;
  width: 100%;
  max-width: 100%;
}

.response-section {
  padding: 20px;
}

.params-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.param-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 80px 2fr auto;
  gap: 8px;
  align-items: center;
}

.param-input,
.param-select {
  padding: 8px 10px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 6px;
  font-size: 12px;
  color: var(--text-color);
  outline: none;
  font-family: 'Consolas', 'Monaco', monospace;
}

.param-input.flex-1 {
  grid-column: span 1;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-color);
  cursor: pointer;
}

.remove-btn {
  padding: 6px 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.remove-btn:hover {
  color: #f66;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.output-controls {
  display: flex;
  gap: 8px;
}

.format-select {
  padding: 6px 10px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 6px;
  font-size: 12px;
  color: var(--text-color);
  outline: none;
}

.action-btn {
  padding: 6px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--border-color);
}

.doc-output {
  max-height: 600px;
  overflow: auto;
  padding: 12px;
  background: var(--card-bg);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 11px;
  line-height: 1.6;
  color: var(--text-color);
  margin: 0;
  white-space: pre-wrap;
}

.info-box {
  padding: 10px;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.info-box h4 {
  margin-bottom: 6px;
  color: var(--text-color);
  font-size: 12px;
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
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .param-row {
    grid-template-columns: 1fr;
  }
}
</style>
