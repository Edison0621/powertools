<script setup>
import { ref, computed } from 'vue'

const curlCommand = ref('')
const targetLang = ref('javascript')

const languages = [
  { value: 'javascript', label: 'JavaScript (Fetch)', icon: '📜' },
  { value: 'python', label: 'Python (Requests)', icon: '🐍' },
  { value: 'go', label: 'Go', icon: '🔷' },
  { value: 'java', label: 'Java', icon: '☕' },
  { value: 'php', label: 'PHP', icon: '🐘' },
  { value: 'rust', label: 'Rust', icon: '🦀' }
]

// 解析cURL命令
const parseCurl = (curl) => {
  const result = {
    url: '',
    method: 'GET',
    headers: {},
    body: null
  }
  
  // 提取URL
  const urlMatch = curl.match(/curl\s+(?:-X\s+\w+\s+)?['"]?([^'" ]+)['"]?/)
  if (urlMatch) {
    result.url = urlMatch[1]
  }
  
  // 提取方法
  const methodMatch = curl.match(/-X\s+(\w+)/)
  if (methodMatch) {
    result.method = methodMatch[1]
  }
  
  // 提取headers
  const headerMatches = curl.matchAll(/-H\s+['"]([^:]+):\s*([^'"]+)['"]/g)
  for (const match of headerMatches) {
    result.headers[match[1].trim()] = match[2].trim()
  }
  
  // 提取body
  const bodyMatch = curl.match(/-d\s+['"](.+?)['"]/s) || curl.match(/--data\s+['"](.+?)['"]/s)
  if (bodyMatch) {
    result.body = bodyMatch[1]
  }
  
  return result
}

// 生成代码
const generatedCode = computed(() => {
  if (!curlCommand.value.trim()) return ''
  
  try {
    const parsed = parseCurl(curlCommand.value)
    
    switch (targetLang.value) {
      case 'javascript':
        return generateJavaScript(parsed)
      case 'python':
        return generatePython(parsed)
      case 'go':
        return generateGo(parsed)
      case 'java':
        return generateJava(parsed)
      case 'php':
        return generatePHP(parsed)
      case 'rust':
        return generateRust(parsed)
      default:
        return ''
    }
  } catch (e) {
    return '解析失败，请检查cURL命令格式'
  }
})

// JavaScript
const generateJavaScript = (parsed) => {
  let code = `fetch('${parsed.url}', {\n`
  code += `  method: '${parsed.method}',\n`
  
  if (Object.keys(parsed.headers).length > 0) {
    code += `  headers: {\n`
    Object.entries(parsed.headers).forEach(([key, value], idx, arr) => {
      code += `    '${key}': '${value}'${idx < arr.length - 1 ? ',' : ''}\n`
    })
    code += `  }`
  }
  
  if (parsed.body) {
    code += `,\n  body: '${parsed.body}'\n`
  } else {
    code += `\n`
  }
  
  code += `})\n`
  code += `  .then(response => response.json())\n`
  code += `  .then(data => console.log(data))\n`
  code += `  .catch(error => console.error('Error:', error));`
  
  return code
}

// Python
const generatePython = (parsed) => {
  let code = `import requests\n\n`
  code += `url = '${parsed.url}'\n`
  
  if (Object.keys(parsed.headers).length > 0) {
    code += `headers = {\n`
    Object.entries(parsed.headers).forEach(([key, value]) => {
      code += `    '${key}': '${value}',\n`
    })
    code += `}\n`
  }
  
  if (parsed.body) {
    code += `data = '${parsed.body}'\n\n`
  }
  
  code += `response = requests.${parsed.method.toLowerCase()}(url`
  if (Object.keys(parsed.headers).length > 0) {
    code += `, headers=headers`
  }
  if (parsed.body) {
    code += `, data=data`
  }
  code += `)\n\n`
  code += `print(response.json())`
  
  return code
}

// Go
const generateGo = (parsed) => {
  let code = `package main\n\n`
  code += `import (\n`
  code += `    "fmt"\n`
  code += `    "net/http"\n`
  code += `    "strings"\n`
  code += `)\n\n`
  code += `func main() {\n`
  code += `    url := "${parsed.url}"\n`
  
  if (parsed.body) {
    code += `    payload := strings.NewReader(\`${parsed.body}\`)\n`
  }
  
  code += `    req, _ := http.NewRequest("${parsed.method}", url, `
  code += parsed.body ? `payload` : `nil`
  code += `)\n\n`
  
  Object.entries(parsed.headers).forEach(([key, value]) => {
    code += `    req.Header.Add("${key}", "${value}")\n`
  })
  
  code += `\n    res, _ := http.DefaultClient.Do(req)\n`
  code += `    defer res.Body.Close()\n`
  code += `    // Process response...\n`
  code += `    fmt.Println(res)\n`
  code += `}`
  
  return code
}

// Java
const generateJava = (parsed) => {
  let code = `import java.net.http.*;\n`
  code += `import java.net.URI;\n\n`
  code += `public class ApiRequest {\n`
  code += `    public static void main(String[] args) throws Exception {\n`
  code += `        HttpClient client = HttpClient.newHttpClient();\n\n`
  code += `        HttpRequest.Builder builder = HttpRequest.newBuilder()\n`
  code += `            .uri(URI.create("${parsed.url}"))\n`
  code += `            .${parsed.method}(`
  
  if (parsed.body) {
    code += `HttpRequest.BodyPublishers.ofString("${parsed.body}")`
  } else {
    code += `HttpRequest.BodyPublishers.noBody()`
  }
  code += `)`
  
  Object.entries(parsed.headers).forEach(([key, value]) => {
    code += `\n            .header("${key}", "${value}")`
  })
  
  code += `;\n\n`
  code += `        HttpRequest request = builder.build();\n`
  code += `        HttpResponse<String> response = client.send(request,\n`
  code += `            HttpResponse.BodyHandlers.ofString());\n\n`
  code += `        System.out.println(response.body());\n`
  code += `    }\n`
  code += `}`
  
  return code
}

// PHP
const generatePHP = (parsed) => {
  let code = `<?php\n\n`
  code += `$curl = curl_init();\n\n`
  code += `curl_setopt_array($curl, [\n`
  code += `    CURLOPT_URL => '${parsed.url}',\n`
  code += `    CURLOPT_RETURNTRANSFER => true,\n`
  code += `    CURLOPT_CUSTOMREQUEST => '${parsed.method}',\n`
  
  if (Object.keys(parsed.headers).length > 0) {
    code += `    CURLOPT_HTTPHEADER => [\n`
    Object.entries(parsed.headers).forEach(([key, value]) => {
      code += `        '${key}: ${value}',\n`
    })
    code += `    ],\n`
  }
  
  if (parsed.body) {
    code += `    CURLOPT_POSTFIELDS => '${parsed.body}',\n`
  }
  
  code += `]);\n\n`
  code += `$response = curl_exec($curl);\n`
  code += `curl_close($curl);\n\n`
  code += `echo $response;\n`
  code += `?>`
  
  return code
}

// Rust
const generateRust = (parsed) => {
  let code = `use reqwest;\n\n`
  code += `#[tokio::main]\n`
  code += `async fn main() -> Result<(), Box<dyn std::error::Error>> {\n`
  code += `    let client = reqwest::Client::new();\n`
  code += `    let res = client\n`
  code += `        .${parsed.method.toLowerCase()}("${parsed.url}")\n`
  
  Object.entries(parsed.headers).forEach(([key, value]) => {
    code += `        .header("${key}", "${value}")\n`
  })
  
  if (parsed.body) {
    code += `        .body("${parsed.body}")\n`
  }
  
  code += `        .send()\n`
  code += `        .await?;\n\n`
  code += `    let body = res.text().await?;\n`
  code += `    println!("{}", body);\n`
  code += `    Ok(())\n`
  code += `}`
  
  return code
}

// 加载示例
const loadExample = () => {
  curlCommand.value = `curl -X POST 'https://api.example.com/v1/users' \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer token123' \\
  -d '{"name":"John","email":"john@example.com"}'`
}

// 复制代码
const copy = async () => {
  try {
    await navigator.clipboard.writeText(generatedCode.value)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

// 清空
const clear = () => {
  curlCommand.value = ''
}
</script>

<template>
  <div class="tool-container">
    <!-- 快速示例 -->
    <div class="example-bar">
      <button @click="loadExample" class="example-btn">📖 加载示例</button>
      <button @click="clear" class="example-btn">🗑️ 清空</button>
    </div>

    <!-- cURL输入 -->
    <div class="input-section">
      <h3>🔧 粘贴cURL命令</h3>
      <textarea 
        v-model="curlCommand"
        placeholder="粘贴cURL命令，例如：&#10;curl -X POST 'https://api.example.com/users' \&#10;  -H 'Content-Type: application/json' \&#10;  -d '{&quot;name&quot;:&quot;John&quot;}'"
        class="curl-textarea"
      ></textarea>
    </div>

    <!-- 语言选择 -->
    <div class="lang-section">
      <h3>🌐 选择目标语言</h3>
      <div class="lang-grid">
        <button 
          v-for="lang in languages" 
          :key="lang.value"
          @click="targetLang = lang.value"
          :class="['lang-btn', { active: targetLang === lang.value }]"
        >
          <span class="lang-icon">{{ lang.icon }}</span>
          <span class="lang-name">{{ lang.label }}</span>
        </button>
      </div>
    </div>

    <!-- 生成的代码 -->
    <div v-if="generatedCode" class="output-section">
      <div class="output-header">
        <h3>✨ 生成的代码</h3>
        <button @click="copy" class="copy-btn">📋 复制代码</button>
      </div>
      <pre class="code-output">{{ generatedCode }}</pre>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li>粘贴cURL命令到输入框</li>
        <li>选择要转换的目标编程语言</li>
        <li>自动解析URL、方法、请求头、请求体</li>
        <li>生成对应语言的HTTP请求代码</li>
        <li>支持JavaScript、Python、Go、Java、PHP、Rust</li>
        <li>一键复制生成的代码</li>
        <li>支持多行cURL命令（使用\换行）</li>
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
  display: flex;
  gap: 8px;
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

.input-section,
.lang-section,
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

.curl-textarea {
  width: 100%;
  min-height: 150px;
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

.curl-textarea:focus {
  border-color: var(--primary-color);
}

.lang-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.lang-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.lang-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.lang-icon {
  font-size: 24px;
}

.lang-name {
  font-size: 13px;
  font-weight: 600;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.copy-btn {
  padding: 8px 16px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--primary-hover);
}

.code-output {
  max-height: 500px;
  overflow: auto;
  padding: 16px;
  background: var(--card-bg);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 12px;
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
  .lang-grid {
    grid-template-columns: 1fr;
  }
}
</style>
