import { tools } from './tools.js'

export const mainCategories = [
  { id: 'home', name: '首页', icon: '🏠', description: '精选高质量AI工具推荐' },
  { id: 'powertools', name: '开发工具', icon: '⚡', description: '程序员必备的在线工具' }
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
