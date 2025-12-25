# 贡献指南 | Contributing Guide

[English](#english) | [简体中文](#简体中文)

---

## 简体中文

感谢你对 PowerTools 项目的关注！我们欢迎所有形式的贡献。

### 🎯 贡献方式

你可以通过以下方式为项目做出贡献：

- 🐛 **报告 Bug** - 发现问题请创建 Issue
- 💡 **提出建议** - 功能建议或改进意见
- 📝 **改进文档** - 修正错误或补充说明
- 🔧 **提交代码** - 修复 Bug 或实现新功能
- 🌍 **翻译** - 帮助翻译文档或界面

### 📋 开发流程

#### 1. 准备工作

```bash
# Fork 项目到你的 GitHub 账号

# 克隆你的 Fork
git clone https://github.com/你的用户名/powertools.git
cd powertools

# 添加上游仓库
git remote add upstream https://github.com/原作者/powertools.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

#### 2. 创建分支

```bash
# 从 main 分支创建新分支
git checkout -b feature/your-feature-name

# 或修复 bug
git checkout -b fix/bug-description
```

#### 3. 开发和测试

- 遵循现有代码风格
- 确保代码可以正常运行
- 测试你的更改

#### 4. 提交更改

```bash
# 添加更改
git add .

# 提交（请使用清晰的提交信息）
git commit -m "feat: 添加新功能描述"
# 或
git commit -m "fix: 修复某个问题"

# 推送到你的 Fork
git push origin feature/your-feature-name
```

#### 5. 创建 Pull Request

1. 访问你的 GitHub Fork 页面
2. 点击 "New Pull Request"
3. 填写 PR 描述（说明改动内容和原因）
4. 等待代码审查

### 📝 提交信息规范

请使用以下格式的提交信息：

```
<type>: <subject>

[optional body]

[optional footer]
```

**Type 类型：**

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建或工具相关

**示例：**

```
feat: 添加 Markdown 转 PDF 工具

- 实现 Markdown 解析
- 添加 PDF 生成功能
- 支持自定义样式

Closes #123
```

### 🎨 代码风格

- 使用 2 空格缩进
- 使用单引号（字符串）
- 变量和函数使用 camelCase
- 组件使用 PascalCase
- 添加适当的注释
- 保持代码简洁易读

### 🔧 添加新工具

如果你想添加新工具，请按以下步骤：

#### 1. 在 `src/data/tools.js` 添加工具定义

```javascript
{
  id: 'your-tool-id',
  name: '你的工具名称',
  description: '工具描述',
  icon: '🔧',
  category: 'dev', // 选择合适的分类
  tags: ['标签1', '标签2']
}
```

#### 2. 创建工具组件

在 `src/components/tools/` 创建 `YourToolName.vue`：

```vue
<script setup>
import { ref } from 'vue'

// 工具逻辑
</script>

<template>
  <div class="tool-container">
    <!-- 工具界面 -->
  </div>
</template>

<style scoped>
/* 工具样式 */
@media (max-width: 768px) {
  /* 移动端响应式样式 */
}
</style>
```

#### 3. 在 `ToolPage.vue` 中注册

```javascript
import YourToolName from './tools/YourToolName.vue'

const toolComponents = {
  // ...
  'your-tool-id': YourToolName
}
```

### 🐛 报告 Bug

发现 Bug 请创建 Issue，并包含：

- **标题**: 简短描述问题
- **环境**: 浏览器、操作系统版本
- **重现步骤**: 详细的复现步骤
- **预期行为**: 你期望发生什么
- **实际行为**: 实际发生了什么
- **截图**: 如果可能，提供截图

### 💡 功能建议

提出功能建议请：

1. 先搜索是否已有类似建议
2. 清晰描述功能和使用场景
3. 说明为什么需要这个功能
4. 可以提供设计方案或原型

### ❓ 问题讨论

有任何问题或想法？欢迎：

- 💬 [GitHub Discussions](https://github.com/yourusername/powertools/discussions) - 讨论和交流
- 🐛 [GitHub Issues](https://github.com/yourusername/powertools/issues) - 报告 Bug 或建议

### 📜 行为准则

- 友善和尊重所有贡献者
- 接受建设性的批评
- 关注对项目最有利的事情
- 保持专业和包容的态度

### 🙏 感谢

感谢每一位贡献者的付出！你的贡献让 PowerTools 变得更好。

---

## English

Thank you for your interest in contributing to PowerTools! We welcome all forms of contributions.

### 🎯 Ways to Contribute

You can contribute in the following ways:

- 🐛 **Report Bugs** - Create an issue if you find a problem
- 💡 **Suggest Features** - Feature requests or improvement ideas
- 📝 **Improve Documentation** - Fix errors or add explanations
- 🔧 **Submit Code** - Fix bugs or implement new features
- 🌍 **Translate** - Help translate documentation or UI

### 📋 Development Workflow

#### 1. Setup

```bash
# Fork the project to your GitHub account

# Clone your fork
git clone https://github.com/your-username/powertools.git
cd powertools

# Add upstream repository
git remote add upstream https://github.com/original-author/powertools.git

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 2. Create Branch

```bash
# Create a new branch from main
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

#### 3. Develop and Test

- Follow existing code style
- Ensure code runs properly
- Test your changes

#### 4. Commit Changes

```bash
# Add changes
git add .

# Commit (use clear commit messages)
git commit -m "feat: add new feature description"
# or
git commit -m "fix: fix some issue"

# Push to your fork
git push origin feature/your-feature-name
```

#### 5. Create Pull Request

1. Visit your GitHub fork page
2. Click "New Pull Request"
3. Fill in PR description (explain changes and reasons)
4. Wait for code review

### 📝 Commit Message Convention

Please use the following format for commit messages:

```
<type>: <subject>

[optional body]

[optional footer]
```

**Type:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code formatting (no functional changes)
- `refactor`: Code refactoring
- `perf`: Performance optimization
- `test`: Testing related
- `chore`: Build or tooling related

**Example:**

```
feat: add Markdown to PDF converter

- Implement Markdown parsing
- Add PDF generation
- Support custom styling

Closes #123
```

### 🎨 Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Variables and functions use camelCase
- Components use PascalCase
- Add appropriate comments
- Keep code clean and readable

### 🔧 Adding New Tools

If you want to add a new tool, follow these steps:

#### 1. Add tool definition in `src/data/tools.js`

```javascript
{
  id: 'your-tool-id',
  name: 'Your Tool Name',
  description: 'Tool description',
  icon: '🔧',
  category: 'dev', // Choose appropriate category
  tags: ['tag1', 'tag2']
}
```

#### 2. Create tool component

Create `YourToolName.vue` in `src/components/tools/`:

```vue
<script setup>
import { ref } from 'vue'

// Tool logic
</script>

<template>
  <div class="tool-container">
    <!-- Tool UI -->
  </div>
</template>

<style scoped>
/* Tool styles */
@media (max-width: 768px) {
  /* Mobile responsive styles */
}
</style>
```

#### 3. Register in `ToolPage.vue`

```javascript
import YourToolName from './tools/YourToolName.vue'

const toolComponents = {
  // ...
  'your-tool-id': YourToolName
}
```

### 🐛 Reporting Bugs

When reporting bugs, please include:

- **Title**: Brief description
- **Environment**: Browser, OS version
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What you expected
- **Actual Behavior**: What actually happened
- **Screenshots**: If possible

### 💡 Feature Requests

When suggesting features:

1. Search for similar suggestions first
2. Clearly describe the feature and use cases
3. Explain why this feature is needed
4. Optionally provide design or prototype

### ❓ Questions and Discussions

Have questions or ideas? Welcome to:

- 💬 [GitHub Discussions](https://github.com/yourusername/powertools/discussions) - Discussions and exchanges
- 🐛 [GitHub Issues](https://github.com/yourusername/powertools/issues) - Report bugs or suggestions

### 📜 Code of Conduct

- Be friendly and respectful to all contributors
- Accept constructive criticism
- Focus on what's best for the project
- Maintain a professional and inclusive attitude

### 🙏 Thank You

Thanks to all contributors! Your contributions make PowerTools better.
