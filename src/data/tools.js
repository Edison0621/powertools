export const tools = [
  // 加密工具
  {
    id: 'hash',
    name: 'Hash生成器',
    description: '生成文本的MD5、SHA-1、SHA-256等哈希值',
    icon: '#️⃣',
    category: 'crypto',
    tags: ['MD5', 'SHA', '哈希']
  },
  {
    id: 'uuid-generator',
    name: 'UUID生成器',
    description: '生成UUID/GUID唯一标识符',
    icon: '🆔',
    category: 'crypto',
    tags: ['UUID', 'GUID', '唯一ID']
  },
  {
    id: 'password-generator',
    name: '密码生成器',
    description: '生成安全的随机密码',
    icon: '🔑',
    category: 'crypto',
    tags: ['密码', '安全', '随机']
  },
  {
    id: 'bcrypt',
    name: 'Bcrypt加密',
    description: 'Bcrypt密码哈希和验证',
    icon: '🔐',
    category: 'crypto',
    tags: ['Bcrypt', '加密', '验证']
  },
  {
    id: 'text-encrypt',
    name: '文本加密',
    description: 'AES文本加密和解密',
    icon: '🔒',
    category: 'crypto',
    tags: ['AES', '加密', '解密']
  },

  // 转换工具
  {
    id: 'base64',
    name: 'Base64编解码',
    description: '对文本或文件进行Base64编码和解码',
    icon: '📝',
    category: 'converter',
    tags: ['Base64', '编码', '解码']
  },
  {
    id: 'url-encoder',
    name: 'URL编解码',
    description: 'URL编码和解码工具',
    icon: '🔗',
    category: 'converter',
    tags: ['URL', '编码', '解码']
  },
  {
    id: 'color-converter',
    name: '颜色转换',
    description: 'HEX、RGB、HSL颜色格式转换',
    icon: '🎨',
    category: 'converter',
    tags: ['颜色', 'HEX', 'RGB']
  },
  {
    id: 'timestamp',
    name: '时间戳转换',
    description: '时间戳与日期时间相互转换',
    icon: '⏰',
    category: 'converter',
    tags: ['时间戳', '日期', '时间']
  },
  {
    id: 'unit-converter',
    name: '单位转换',
    description: '长度、重量、温度等单位转换',
    icon: '📏',
    category: 'converter',
    tags: ['单位', '转换', '计算']
  },

  // Web工具
  {
    id: 'json-formatter',
    name: 'JSON格式化',
    description: '格式化、验证和压缩JSON数据',
    icon: '{ }',
    category: 'web',
    tags: ['JSON', '格式化', '验证']
  },
  {
    id: 'html-encoder',
    name: 'HTML转义',
    description: 'HTML实体编码和解码',
    icon: '🏷️',
    category: 'web',
    tags: ['HTML', '转义', '实体']
  },
  {
    id: 'jwt-decoder',
    name: 'JWT解析',
    description: '解析和验证JWT令牌',
    icon: '🎫',
    category: 'web',
    tags: ['JWT', 'Token', '解析']
  },
  {
    id: 'qr-generator',
    name: '二维码生成',
    description: '生成自定义二维码',
    icon: '📱',
    category: 'web',
    tags: ['二维码', 'QR', '生成']
  },

  // 开发工具
  {
    id: 'regex-tester',
    name: '正则测试',
    description: '测试和调试正则表达式',
    icon: '🔍',
    category: 'dev',
    tags: ['正则', '测试', '匹配']
  },
  {
    id: 'sql-formatter',
    name: 'SQL格式化',
    description: '格式化和美化SQL语句',
    icon: '🗃️',
    category: 'dev',
    tags: ['SQL', '格式化', '数据库']
  },
  {
    id: 'yaml-json',
    name: 'YAML ⇄ JSON',
    description: 'YAML和JSON格式互转',
    icon: '🔄',
    category: 'dev',
    tags: ['YAML', 'JSON', '转换']
  },
  {
    id: 'markdown-preview',
    name: 'Markdown预览',
    description: 'Markdown实时预览和编辑',
    icon: '📄',
    category: 'dev',
    tags: ['Markdown', '预览', '编辑']
  },
  {
    id: 'cron-generator',
    name: 'Cron表达式',
    description: '可视化生成Cron表达式',
    icon: '⏰',
    category: 'dev',
    tags: ['Cron', '定时', '表达式']
  },
  {
    id: 'random-generator',
    name: '随机数据生成',
    description: '生成各种随机数据',
    icon: '🎲',
    category: 'dev',
    tags: ['随机', '测试', '数据']
  },

  // 网络工具
  {
    id: 'ip-lookup',
    name: 'IP查询',
    description: '查询IP地址的详细信息',
    icon: '🌐',
    category: 'network',
    tags: ['IP', '查询', '定位']
  },
  {
    id: 'ipv4-calc',
    name: 'IPv4子网计算',
    description: '计算IPv4子网信息',
    icon: '🧮',
    category: 'network',
    tags: ['IPv4', '子网', '计算']
  },
  {
    id: 'dns-lookup',
    name: 'DNS查询',
    description: '查询域名DNS记录',
    icon: '📡',
    category: 'network',
    tags: ['DNS', '域名', '查询']
  },
  {
    id: 'port-checker',
    name: '端口检测',
    description: '检查端口开放状态',
    icon: '🚪',
    category: 'network',
    tags: ['端口', '检测', '网络']
  },

  // 数学工具
  {
    id: 'calculator',
    name: '科学计算器',
    description: '强大的科学计算器',
    icon: '🔢',
    category: 'math',
    tags: ['计算器', '科学', '数学']
  },
  {
    id: 'percentage',
    name: '百分比计算',
    description: '各种百分比计算',
    icon: '%',
    category: 'math',
    tags: ['百分比', '计算', '比例']
  },
  {
    id: 'number-base',
    name: '进制转换',
    description: '二进制、八进制、十进制、十六进制转换',
    icon: '🔣',
    category: 'math',
    tags: ['进制', '转换', '二进制']
  },

  // 文本工具
  {
    id: 'case-converter',
    name: '大小写转换',
    description: '转换文本的大小写格式',
    icon: 'Aa',
    category: 'text',
    tags: ['大小写', '转换', '格式']
  },
  {
    id: 'word-counter',
    name: '字数统计',
    description: '统计文本的字数、行数等',
    icon: '📝',
    category: 'text',
    tags: ['统计', '字数', '文本']
  },
  {
    id: 'text-diff',
    name: '文本去重',
    description: '去除重复行和空行',
    icon: '🧹',
    category: 'text',
    tags: ['去重', '清理', '文本']
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum',
    description: '生成占位文本',
    icon: '📃',
    category: 'text',
    tags: ['占位', '生成', '文本']
  },

  // 文本处理
  {
    id: 'diff-checker',
    name: '文本对比',
    description: '对比两段文本的差异',
    icon: '📊',
    category: 'text',
    tags: ['对比', 'Diff', '差异']
  },
  {
    id: 'text-batch-add',
    name: '文本批量添加',
    description: '批量在文本前后或指定位置添加内容',
    icon: '➕',
    category: 'text',
    tags: ['批量', '添加', '前缀', '后缀']
  },

  // 日期时间工具
  {
    id: 'date-calculator',
    name: '日期计算器',
    description: '计算日期间隔、加减天数',
    icon: '📅',
    category: 'datetime',
    tags: ['日期', '计算', '间隔']
  },
  {
    id: 'workday-calculator',
    name: '工作日计算',
    description: '计算工作日，排除周末',
    icon: '📆',
    category: 'datetime',
    tags: ['工作日', '周末', '计算']
  },
  {
    id: 'timezone-converter',
    name: '时区转换',
    description: '不同时区时间转换',
    icon: '🌍',
    category: 'datetime',
    tags: ['时区', '转换', '时间']
  },
  {
    id: 'countdown-timer',
    name: '倒计时/计时器',
    description: '倒计时和正计时工具',
    icon: '⏱️',
    category: 'datetime',
    tags: ['倒计时', '计时器', '提醒']
  },

  // API工具
  {
    id: 'http-request',
    name: 'HTTP请求测试',
    description: '发送HTTP请求并查看响应',
    icon: '🔌',
    category: 'api',
    tags: ['HTTP', '请求', '测试', 'API']
  },
  {
    id: 'mock-data',
    name: 'Mock数据生成',
    description: '生成模拟测试数据',
    icon: '🎲',
    category: 'api',
    tags: ['Mock', '测试', '数据']
  },
  {
    id: 'api-formatter',
    name: 'API文档生成',
    description: '生成API接口文档',
    icon: '📝',
    category: 'api',
    tags: ['文档', 'API', 'Markdown']
  },
  {
    id: 'curl-converter',
    name: 'cURL转换器',
    description: 'cURL命令转代码',
    icon: '🔄',
    category: 'api',
    tags: ['cURL', '转换', '代码']
  },

  // 隐私安全工具
  {
    id: 'password-strength',
    name: '密码强度检测',
    description: '检测密码强度和安全性',
    icon: '🔑',
    category: 'privacy',
    tags: ['密码', '安全', '检测']
  },
  {
    id: 'data-masking',
    name: '数据脱敏',
    description: '敏感信息脱敏处理',
    icon: '🔍',
    category: 'privacy',
    tags: ['脱敏', '隐私', '安全']
  },
  {
    id: 'secure-delete',
    name: '安全文本清除',
    description: '安全地清除敏感文本',
    icon: '🗑️',
    category: 'privacy',
    tags: ['清除', '安全', '隐私']
  },
  {
    id: 'privacy-checker',
    name: '隐私信息检测',
    description: '检测文本中的隐私信息',
    icon: '🔎',
    category: 'privacy',
    tags: ['检测', '隐私', '识别']
  },

  // 图像工具
  {
    id: 'image-preview',
    name: '图片预览',
    description: '预览图片链接',
    icon: '🖼️',
    category: 'image',
    tags: ['预览', '图片', '链接']
  },
  {
    id: 'image-base64',
    name: '图片Base64转换',
    description: '图片与Base64互转',
    icon: '🔄',
    category: 'image',
    tags: ['Base64', '转换', '编码']
  },
  {
    id: 'image-info',
    name: '图片信息查看',
    description: '查看图片EXIF信息',
    icon: '📊',
    category: 'image',
    tags: ['EXIF', '信息', '属性']
  },
  {
    id: 'image-placeholder',
    name: '图片占位符',
    description: '生成占位图片',
    icon: '📊',
    category: 'image',
    tags: ['占位符', '生成', '测试']
  }
]
