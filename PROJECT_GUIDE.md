# PowerTools 项目结构说明

## 📁 目录结构

```
powertools/
├── src/
│   ├── App.vue                      # 主应用组件
│   ├── main.js                      # 应用入口
│   ├── style.css                    # 全局样式
│   ├── data/
│   │   └── tools.js                 # 工具数据定义
│   └── components/
│       ├── ToolCard.vue             # 工具卡片组件
│       ├── ToolPage.vue             # 工具详情页组件
│       └── tools/                   # 各个工具实现
│           ├── Base64Tool.vue       # Base64编解码
│           ├── JsonFormatterTool.vue # JSON格式化
│           ├── UuidGeneratorTool.vue # UUID生成器
│           ├── HashTool.vue         # Hash生成器
│           ├── UrlEncoderTool.vue   # URL编解码
│           └── ColorConverterTool.vue # 颜色转换
├── public/                          # 静态资源
├── index.html                       # HTML模板
├── package.json                     # 项目配置
└── vite.config.js                   # Vite配置
```

## 🎯 核心组件说明

### App.vue (主应用)
主应用组件，包含：
- 顶部导航栏（Logo、搜索、主题切换）
- 分类导航栏
- 工具网格展示
- 工具详情模态窗口
- 页脚

主要功能：
- 主题切换（深色/浅色）
- 搜索过滤
- 分类筛选
- 收藏管理
- 本地存储

### ToolCard.vue (工具卡片)
展示单个工具的卡片组件：
- 工具图标
- 工具名称和描述
- 标签
- 收藏按钮

### ToolPage.vue (工具详情页)
模态窗口，显示工具的详细界面：
- 动态加载对应的工具组件
- 关闭按钮
- 全屏展示

### 工具组件 (tools/)
每个工具都是独立的Vue组件，包含：
- 输入输出界面
- 转换逻辑
- 复制功能
- 说明文档

## 🎨 设计系统

### CSS变量
使用CSS自定义属性实现主题系统：

```css
/* 浅色主题 */
--primary-color: #3b82f6
--bg-color: #f8fafc
--card-bg: #ffffff
--text-color: #1e293b
--text-secondary: #64748b
--border-color: #e2e8f0

/* 深色主题 */
--bg-color: #0f172a
--card-bg: #1e293b
--text-color: #f1f5f9
--text-secondary: #94a3b8
--border-color: #334155
```

### 响应式断点
- 移动端: < 768px
- 平板: 768px - 1024px
- 桌面: > 1024px

## 🔧 添加新工具

### 1. 在 tools.js 中添加工具定义

```javascript
{
  id: 'my-tool',
  name: '我的工具',
  description: '工具描述',
  icon: '🔧',
  category: 'dev',
  tags: ['标签1', '标签2']
}
```

### 2. 创建工具组件

在 `src/components/tools/` 下创建 `MyTool.vue`：

```vue
<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')

const process = () => {
  // 处理逻辑
  output.value = input.value
}
</script>

<template>
  <div class="tool-container">
    <!-- 工具界面 -->
  </div>
</template>

<style scoped>
/* 工具样式 */
</style>
```

### 3. 在 ToolPage.vue 中注册

```javascript
import MyTool from './tools/MyTool.vue'

const toolComponents = {
  'my-tool': MyTool,
  // ...其他工具
}
```

## 🎨 设计原则

### 1. 一致性
- 统一的间距和圆角
- 一致的颜色使用
- 统一的交互方式

### 2. 可访问性
- 足够的对比度
- 清晰的视觉层级
- 易于理解的图标

### 3. 性能
- 按需加载组件
- 本地存储偏好
- 无外部依赖

### 4. 用户友好
- 即时反馈
- 一键复制
- 错误提示
- 示例数据

## 🚀 开发建议

### 推荐的开发流程
1. 确定工具功能
2. 设计界面布局
3. 实现核心逻辑
4. 添加错误处理
5. 完善用户体验
6. 测试各种场景

### 常用模式

#### 输入输出模式
适用于转换类工具（Base64、URL编码等）：
- 左侧输入框
- 右侧输出框
- 顶部操作按钮
- 实时处理

#### 生成器模式
适用于生成类工具（UUID、密码等）：
- 顶部配置选项
- 生成按钮
- 结果列表
- 批量复制

#### 计算器模式
适用于计算类工具（子网计算、进制转换等）：
- 表单输入
- 计算按钮
- 结果展示
- 说明文档

## 📝 代码规范

### Vue组件
- 使用 `<script setup>` 语法
- Props和Emits类型定义
- 合理的组件拆分

### CSS
- 使用scoped样式
- 使用CSS变量
- 移动优先的响应式设计

### JavaScript
- 使用ES6+语法
- 清晰的变量命名
- 适当的注释

## 🔍 调试技巧

### Vue DevTools
安装Vue DevTools浏览器扩展，可以：
- 查看组件树
- 检查props和state
- 追踪事件

### 本地存储查看
在浏览器DevTools中：
- Application → Local Storage
- 查看theme和favorites

### 主题切换测试
快速测试两种主题下的显示效果。

## 🎯 下一步

1. **完善现有工具** - 添加更多功能和错误处理
2. **实现更多工具** - 按优先级逐个实现
3. **优化性能** - 代码分割、懒加载
4. **添加测试** - 单元测试和E2E测试
5. **PWA支持** - 离线可用、可安装
6. **国际化** - 多语言支持

---

快乐编码！ 🚀
