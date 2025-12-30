import { tools } from './tools.js'
import { patterns } from './patterns.js'

export const mainCategories = [
  { id: 'home', name: '首页', icon: '🏠', description: '欢迎来到在线教程平台' },
  { id: 'ai', name: '人工智能', icon: '🤖', description: '机器学习, 深度学习' },
  { id: 'frontend', name: '前端开发', icon: '🎨', description: 'HTML, CSS, JavaScript等' },
  { id: 'language', name: '编程语言', icon: '💻', description: 'Java, Python, Go, C++等' },
  { id: 'database', name: '数据库', icon: '💾', description: 'MySQL, PostgreSQL, MongoDB' },
  { id: 'mobile', name: '移动开发', icon: '📱', description: 'Android, iOS, Flutter' },
  { id: 'middleware', name: '中间件', icon: '🔌', description: 'Redis, Kafka, RabbitMQ等' },
  { id: 'devops', name: '运维开发', icon: '🛠️', description: 'Docker, K8s, CI/CD' },
  { id: 'algorithm', name: '算法', icon: '🧮', description: '排序, 查找, 动态规划等' },
  { id: 'data-structure', name: '数据结构', icon: '🗂️', description: '数组, 链表, 树, 图等' },
  { id: 'design-pattern', name: '设计模式', icon: '🏗️', description: '23种设计模式详解' },
  { id: 'powertools', name: '开发工具', icon: '⚡', description: '在线工具集合' }
]

export const toolCategories = [
  { id: 'all', name: '全部工具', icon: '📦', count: 0 },
  { id: 'crypto', name: '加密工具', icon: '🔐', count: 0 },
  { id: 'converter', name: '转换工具', icon: '🔄', count: 0 },
  { id: 'web', name: 'Web工具', icon: '🌐', count: 0 },
  { id: 'dev', name: '开发工具', icon: '💻', count: 0 },
  { id: 'network', name: '网络工具', icon: '📡', count: 0 },
  { id: 'text', name: '文本工具', icon: '📝', count: 0 },
  { id: 'image', name: '图片工具', icon: '🖼️', count: 0 },
  { id: 'api', name: 'API工具', icon: '🔌', count: 0 },
  { id: 'privacy', name: '隐私工具', icon: '🔒', count: 0 },
  { id: 'math', name: '数学工具', icon: '🔢', count: 0 },
  { id: 'datetime', name: '时间工具', icon: '📅', count: 0 },
  { id: 'other', name: '其他工具', icon: '🔧', count: 0 }
]

// Calculate counts
toolCategories.forEach(category => {
  if (category.id === 'all') {
    category.count = tools.length
  } else {
    category.count = tools.filter(tool => tool.category === category.id).length
  }
})

export const patternCategories = [
  { id: 'all', name: '全部模式', icon: '📦', count: 23 },
  { id: 'creational', name: '创建型模式', icon: '🏭', count: 5 },
  { id: 'structural', name: '结构型模式', icon: '🏛️', count: 7 },
  { id: 'behavioral', name: '行为型模式', icon: '🎭', count: 11 }
]

export const patternsByCategory = {
  creational: [],
  structural: [],
  behavioral: []
}

patterns.forEach(pattern => {
  if (patternsByCategory[pattern.category]) {
    patternsByCategory[pattern.category].push(pattern)
  }
})
