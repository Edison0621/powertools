<script setup>
import { ref, computed } from 'vue'

const dataType = ref('user')
const count = ref(5)
const format = ref('json')
const output = ref('')

// Mock数据模板
const templates = {
  user: () => ({
    id: Math.floor(Math.random() * 10000),
    name: generateName(),
    email: generateEmail(),
    age: Math.floor(Math.random() * 50) + 18,
    phone: generatePhone(),
    address: generateAddress(),
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
  }),
  product: () => ({
    id: Math.floor(Math.random() * 10000),
    name: generateProductName(),
    price: (Math.random() * 1000 + 10).toFixed(2),
    category: ['电子', '服装', '食品', '家居', '运动'][Math.floor(Math.random() * 5)],
    stock: Math.floor(Math.random() * 1000),
    description: '这是一个优质的商品',
    image: `https://picsum.photos/200/200?random=${Math.random()}`
  }),
  article: () => ({
    id: Math.floor(Math.random() * 10000),
    title: generateTitle(),
    content: generateContent(),
    author: generateName(),
    views: Math.floor(Math.random() * 100000),
    likes: Math.floor(Math.random() * 10000),
    createdAt: generateDate(),
    tags: generateTags()
  }),
  order: () => ({
    orderId: 'ORD' + Date.now() + Math.floor(Math.random() * 1000),
    userId: Math.floor(Math.random() * 10000),
    amount: (Math.random() * 5000 + 100).toFixed(2),
    status: ['pending', 'paid', 'shipped', 'completed'][Math.floor(Math.random() * 4)],
    items: Math.floor(Math.random() * 5) + 1,
    createdAt: generateDate(),
    shippingAddress: generateAddress()
  }),
  comment: () => ({
    id: Math.floor(Math.random() * 10000),
    userId: Math.floor(Math.random() * 1000),
    userName: generateName(),
    content: generateComment(),
    rating: Math.floor(Math.random() * 5) + 1,
    createdAt: generateDate(),
    likes: Math.floor(Math.random() * 1000)
  })
}

// 辅助生成函数
const surnames = ['张', '李', '王', '刘', '陈', '杨', '黄', '赵', '周', '吴']
const names = ['伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋']

const generateName = () => {
  return surnames[Math.floor(Math.random() * surnames.length)] + 
         names[Math.floor(Math.random() * names.length)] +
         (Math.random() > 0.5 ? names[Math.floor(Math.random() * names.length)] : '')
}

const generateEmail = () => {
  const domains = ['gmail.com', 'qq.com', '163.com', 'hotmail.com']
  const username = 'user' + Math.floor(Math.random() * 10000)
  return `${username}@${domains[Math.floor(Math.random() * domains.length)]}`
}

const generatePhone = () => {
  return '1' + Math.floor(Math.random() * 9000000000 + 1000000000)
}

const generateAddress = () => {
  const provinces = ['北京市', '上海市', '广东省', '浙江省', '江苏省']
  const cities = ['海淀区', '浦东新区', '天河区', '西湖区', '玄武区']
  const streets = ['中关村大街', '陆家嘴', '天河路', '文一路', '中山路']
  return provinces[Math.floor(Math.random() * provinces.length)] +
         cities[Math.floor(Math.random() * cities.length)] +
         streets[Math.floor(Math.random() * streets.length)] +
         Math.floor(Math.random() * 500) + '号'
}

const generateProductName = () => {
  const adjectives = ['经典', '时尚', '高端', '实用', '精美']
  const products = ['手机', '笔记本', 'T恤', '咖啡', '台灯']
  return adjectives[Math.floor(Math.random() * adjectives.length)] +
         products[Math.floor(Math.random() * products.length)]
}

const generateTitle = () => {
  const titles = [
    '如何提升编程技能',
    'Vue 3 最佳实践',
    'JavaScript高级技巧',
    'Web开发趋势',
    'React vs Vue对比'
  ]
  return titles[Math.floor(Math.random() * titles.length)]
}

const generateContent = () => {
  return '这是一篇关于技术的文章，内容丰富，深入浅出，适合各个层次的开发者阅读学习。文章详细介绍了相关技术的核心概念、使用方法和最佳实践。'
}

const generateComment = () => {
  const comments = [
    '非常好，很有帮助！',
    '写得很详细，感谢分享',
    '学到了很多东西',
    '内容很棒，继续加油',
    '很实用的教程'
  ]
  return comments[Math.floor(Math.random() * comments.length)]
}

const generateDate = () => {
  const now = new Date()
  const days = Math.floor(Math.random() * 365)
  now.setDate(now.getDate() - days)
  return now.toISOString()
}

const generateTags = () => {
  const allTags = ['JavaScript', 'Vue', 'React', 'Node.js', 'CSS', 'HTML', 'TypeScript']
  const num = Math.floor(Math.random() * 3) + 1
  const selected = []
  for (let i = 0; i < num; i++) {
    const tag = allTags[Math.floor(Math.random() * allTags.length)]
    if (!selected.includes(tag)) selected.push(tag)
  }
  return selected
}

// 生成Mock数据
const generate = () => {
  const generator = templates[dataType.value]
  if (!generator) {
    output.value = ''
    return
  }
  
  const data = []
  for (let i = 0; i < count.value; i++) {
    data.push(generator())
  }
  
  if (format.value === 'json') {
    output.value = JSON.stringify(data, null, 2)
  } else if (format.value === 'json-compact') {
    output.value = JSON.stringify(data)
  } else if (format.value === 'csv') {
    output.value = convertToCSV(data)
  }
}

// 转换为CSV
const convertToCSV = (data) => {
  if (!data.length) return ''
  
  const headers = Object.keys(data[0])
  const rows = data.map(item => 
    headers.map(header => {
      const value = item[header]
      if (Array.isArray(value)) return value.join(';')
      if (typeof value === 'object') return JSON.stringify(value)
      return value
    }).join(',')
  )
  
  return [headers.join(','), ...rows].join('\n')
}

const copy = async () => {
  try {
    await navigator.clipboard.writeText(output.value)
    alert('已复制到剪贴板')
  } catch (e) {
    alert('复制失败')
  }
}

const download = () => {
  const blob = new Blob([output.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `mock-${dataType.value}-${Date.now()}.${format.value === 'csv' ? 'csv' : 'json'}`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="tool-container">
    <!-- 配置面板 -->
    <div class="config-panel">
      <h3>🎲 Mock数据配置</h3>
      
      <div class="config-grid">
        <div class="config-group">
          <label>数据类型</label>
          <select v-model="dataType" class="config-select">
            <option value="user">👤 用户信息</option>
            <option value="product">📦 商品数据</option>
            <option value="article">📝 文章数据</option>
            <option value="order">🛒 订单数据</option>
            <option value="comment">💬 评论数据</option>
          </select>
        </div>
        
        <div class="config-group">
          <label>生成数量</label>
          <input v-model.number="count" type="number" min="1" max="100" class="config-input" />
        </div>
        
        <div class="config-group">
          <label>输出格式</label>
          <select v-model="format" class="config-select">
            <option value="json">JSON (格式化)</option>
            <option value="json-compact">JSON (压缩)</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        
        <div class="config-group">
          <button @click="generate" class="generate-btn">🎲 生成数据</button>
        </div>
      </div>
    </div>

    <!-- 数据预览 -->
    <div v-if="output" class="output-panel">
      <div class="output-header">
        <h3>📊 生成结果</h3>
        <div class="output-actions">
          <button @click="copy" class="action-btn">📋 复制</button>
          <button @click="download" class="action-btn">⬇️ 下载</button>
        </div>
      </div>
      
      <textarea 
        :value="output"
        readonly
        class="output-textarea"
      ></textarea>
      
      <div class="output-info">
        生成了 {{ count }} 条数据，共 {{ (output.length / 1024).toFixed(2) }} KB
      </div>
    </div>

    <!-- 数据字段说明 -->
    <div class="fields-panel">
      <h3>📋 字段说明</h3>
      <div class="fields-grid">
        <div v-if="dataType === 'user'" class="field-list">
          <div class="field-item">id - 用户ID</div>
          <div class="field-item">name - 姓名</div>
          <div class="field-item">email - 邮箱</div>
          <div class="field-item">age - 年龄</div>
          <div class="field-item">phone - 手机号</div>
          <div class="field-item">address - 地址</div>
          <div class="field-item">avatar - 头像URL</div>
        </div>
        
        <div v-if="dataType === 'product'" class="field-list">
          <div class="field-item">id - 商品ID</div>
          <div class="field-item">name - 商品名称</div>
          <div class="field-item">price - 价格</div>
          <div class="field-item">category - 分类</div>
          <div class="field-item">stock - 库存</div>
          <div class="field-item">description - 描述</div>
          <div class="field-item">image - 图片URL</div>
        </div>
        
        <div v-if="dataType === 'article'" class="field-list">
          <div class="field-item">id - 文章ID</div>
          <div class="field-item">title - 标题</div>
          <div class="field-item">content - 内容</div>
          <div class="field-item">author - 作者</div>
          <div class="field-item">views - 浏览量</div>
          <div class="field-item">likes - 点赞数</div>
          <div class="field-item">createdAt - 创建时间</div>
          <div class="field-item">tags - 标签数组</div>
        </div>
        
        <div v-if="dataType === 'order'" class="field-list">
          <div class="field-item">orderId - 订单号</div>
          <div class="field-item">userId - 用户ID</div>
          <div class="field-item">amount - 金额</div>
          <div class="field-item">status - 状态</div>
          <div class="field-item">items - 商品数量</div>
          <div class="field-item">createdAt - 下单时间</div>
          <div class="field-item">shippingAddress - 收货地址</div>
        </div>
        
        <div v-if="dataType === 'comment'" class="field-list">
          <div class="field-item">id - 评论ID</div>
          <div class="field-item">userId - 用户ID</div>
          <div class="field-item">userName - 用户名</div>
          <div class="field-item">content - 评论内容</div>
          <div class="field-item">rating - 评分</div>
          <div class="field-item">createdAt - 评论时间</div>
          <div class="field-item">likes - 点赞数</div>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="info-box">
      <h4>ℹ️ 使用说明</h4>
      <ul>
        <li>选择需要的数据类型（用户、商品、文章、订单、评论）</li>
        <li>设置生成数量（1-100条）</li>
        <li>选择输出格式（JSON格式化、JSON压缩、CSV）</li>
        <li>点击生成按钮获取Mock数据</li>
        <li>可复制到剪贴板或下载为文件</li>
        <li>适用于前端开发、接口测试、数据展示等场景</li>
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

.config-panel,
.output-panel,
.fields-panel {
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

.config-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.config-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.config-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
}

.config-select,
.config-input {
  padding: 10px 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 13px;
  color: var(--text-color);
  outline: none;
}

.config-select:focus,
.config-input:focus {
  border-color: var(--primary-color);
}

.generate-btn {
  width: 100%;
  height: 40px;
  margin-top: 24px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.generate-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.output-actions {
  display: flex;
  gap: 8px;
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

.output-textarea {
  width: 100%;
  min-height: 400px;
  padding: 12px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 11px;
  line-height: 1.6;
  color: var(--text-color);
  resize: vertical;
  outline: none;
}

.output-info {
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-secondary);
  text-align: right;
}

.field-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
}

.field-item {
  padding: 8px 12px;
  background: var(--card-bg);
  border-radius: 6px;
  font-size: 12px;
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-color);
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
  .config-grid {
    grid-template-columns: 1fr;
  }
  
  .field-list {
    grid-template-columns: 1fr;
  }
}
</style>
