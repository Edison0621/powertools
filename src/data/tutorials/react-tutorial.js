// React 完整教程 - 基于最新的 React 18+ 和现代最佳实践
export const reactTutorial = {
  id: 'react',
  name: 'React 完整教程',
  version: 'React 18+',
  lastUpdated: '2024-12',
  level: '中级',
  estimatedTime: '32小时',
  
  // 课程大纲
  chapters: [
    {
      id: 'intro',
      title: '第一章：React 入门',
      description: '了解 React 的基本概念和核心特性',
      duration: '3小时',
      sections: [
        {
          id: 'what-is-react',
          title: '1.1 什么是 React',
          content: `
## 什么是 React

React 是一个用于构建用户界面的 **JavaScript 库**，由 Facebook（现 Meta）开发和维护。它专注于构建快速、可扩展的 Web 应用。

### React 的核心概念

- **组件化**: 将 UI 拆分成独立、可复用的组件
- **声明式**: 描述 UI 应该是什么样，React 负责更新
- **虚拟 DOM**: 高效的 DOM 更新机制
- **单向数据流**: 数据自上而下流动
- **JSX**: JavaScript 和 HTML 的混合语法

### React 的特点

**优势**:
✅ **组件复用**: 高度可复用的组件系统
✅ **虚拟 DOM**: 极快的渲染性能
✅ **生态丰富**: 大量第三方库和工具
✅ **单向数据流**: 数据流向清晰，易于调试
✅ **React Native**: 可用于移动应用开发
✅ **强大社区**: 活跃的开发者社区

**适用场景**:
- 单页应用（SPA）
- 复杂的交互式界面
- 数据频繁变化的应用
- 移动应用（React Native）
- 桌面应用（Electron）

### React 发展历史

- **2013**: React 开源，Facebook 创建
- **2015**: React Native 发布
- **2016**: React 15，改进错误处理
- **2017**: React 16（Fiber 架构），Fragment、Portal
- **2019**: React 16.8，Hooks 发布
- **2020**: React 17，渐进式升级
- **2022**: React 18，并发特性、自动批处理、Suspense
- **2024**: React 19（开发中），React Compiler、Server Components

### React 18+ 的重要特性

✅ **并发渲染**: Concurrent Rendering，提升性能
✅ **自动批处理**: Automatic Batching，减少渲染次数
✅ **Transitions**: 区分紧急和非紧急更新
✅ **Suspense SSR**: 服务端渲染的 Suspense
✅ **新 Hooks**: useId、useTransition、useDeferredValue
✅ **Strict Mode 改进**: 更严格的开发模式检查
✅ **React Server Components**: 服务端组件（实验性）
          `,
          code: `// React 基本示例

import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. 函数组件
function Welcome(props) {
  return <h1>你好，{props.name}！</h1>;
}

// 2. 使用 JSX
function App() {
  return (
    <div className="app">
      <Welcome name="React" />
      <p>欢迎来到 React 世界！</p>
    </div>
  );
}

// 3. React 18 渲染方式
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// ========================================

// 4. 组件示例
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}

// 5. Props 和事件处理
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}

function UserCard({ user }) {
  const handleClick = () => {
    alert(\`你好，\${user.name}！\`);
  };

  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p>年龄: {user.age}</p>
      <Button onClick={handleClick}>打招呼</Button>
    </div>
  );
}

// 6. 列表渲染
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// 7. 条件渲染
function Greeting({ isLoggedIn, username }) {
  if (isLoggedIn) {
    return <h1>欢迎回来，{username}！</h1>;
  }
  return <h1>请先登录</h1>;
}

// 或使用三元运算符
function Status({ isOnline }) {
  return (
    <div>
      状态: {isOnline ? '在线' : '离线'}
    </div>
  );
}

// 8. 表单处理
function LoginForm() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('登录:', username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="用户名"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="密码"
      />
      <button type="submit">登录</button>
    </form>
  );
}

// 9. useEffect 示例
function DataFetcher() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []); // 空依赖数组，只在挂载时执行

  if (loading) return <div>加载中...</div>;
  return <div>数据: {JSON.stringify(data)}</div>;
}`
        },
        {
          id: 'environment-setup',
          title: '1.2 开发环境搭建',
          content: `
## 开发环境搭建

### 安装 Node.js

React 开发需要 Node.js 环境：

1. 访问 [nodejs.org](https://nodejs.org)
2. 下载并安装 LTS 版本（推荐 16.x 或更高）
3. 验证安装：\`node -v\` 和 \`npm -v\`

### 创建 React 项目

**方式一：使用 Create React App**（传统方式）

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

**方式二：使用 Vite**（推荐，更快）

\`\`\`bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
\`\`\`

**方式三：使用 Next.js**（全栈框架）

\`\`\`bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
\`\`\`

### 项目结构（Vite）

\`\`\`
my-react-app/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
\`\`\`

### 开发工具推荐

**编辑器**:
- **Visual Studio Code**（最推荐）
  - React 代码片段
  - 自动导入
  - JSX 语法高亮

**VS Code 扩展**:
- **ES7+ React/Redux/React-Native snippets** - 代码片段
- **Simple React Snippets** - React 代码片段
- **Prettier** - 代码格式化
- **ESLint** - 代码检查
- **React Developer Tools** - 浏览器扩展

**浏览器扩展**:
- **React Developer Tools** - 调试 React 应用
- **Redux DevTools** - 调试 Redux 状态

### package.json 配置

\`\`\`json
{
  "name": "my-react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.4.0"
  }
}
\`\`\`

### 运行项目

**开发模式**:
\`\`\`bash
npm run dev
\`\`\`

**生产构建**:
\`\`\`bash
npm run build
\`\`\`

**预览构建结果**:
\`\`\`bash
npm run preview
\`\`\`

### CDN 方式（快速体验）

不需要构建工具，直接在 HTML 中使用：

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    function App() {
      return <h1>Hello React!</h1>;
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
\`\`\`
          `,
          code: `// ========== vite.config.js ==========
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})

// ========================================

// ========== src/main.jsx - 入口文件 ==========
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// React 18 渲染方式
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// ========================================

// ========== src/App.jsx - 根组件 ==========
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React</h1>
        <div className="card">
          <button onClick={() => setCount(count + 1)}>
            count is {count}
          </button>
        </div>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </header>
    </div>
  )
}

export default App

// ========================================

// ========== src/components/Counter.jsx ==========
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)

  return (
    <div className="counter">
      <h2>计数器</h2>
      <p className="count">当前计数: {count}</p>
      <div className="buttons">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>重置</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  )
}

// ========================================

// ========== package.json ==========
{
  "name": "my-react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "vite": "^5.0.8"
  }
}

// ========================================

// ========== .eslintrc.cjs - ESLint 配置 ==========
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off' // 如果使用 TypeScript，可以关闭
  },
}`
        }
      ]
    },
    {
      id: 'components',
      title: '第二章：组件基础',
      description: '掌握 React 组件的创建和使用',
      duration: '5小时',
      sections: [
        {
          id: 'jsx',
          title: '2.1 JSX 语法',
          content: `
## JSX 语法

JSX 是 JavaScript 的语法扩展，允许在 JavaScript 中编写类似 HTML 的代码。

### JSX 基础

**基本语法**:
\`\`\`jsx
const element = <h1>Hello, React!</h1>;
\`\`\`

**嵌入表达式**:
\`\`\`jsx
const name = "张三";
const element = <h1>你好，{name}！</h1>;
\`\`\`

**JSX 也是表达式**:
\`\`\`jsx
function getGreeting(user) {
  if (user) {
    return <h1>你好，{user}！</h1>;
  }
  return <h1>你好，陌生人！</h1>;
}
\`\`\`

### JSX 属性

**字符串字面量**:
\`\`\`jsx
<img src="logo.png" alt="Logo" />
\`\`\`

**JavaScript 表达式**:
\`\`\`jsx
<img src={user.avatarUrl} alt={user.name} />
\`\`\`

**className 和 htmlFor**:
\`\`\`jsx
<div className="container">
  <label htmlFor="name">名称</label>
  <input id="name" type="text" />
</div>
\`\`\`

### JSX 子元素

**字符串**:
\`\`\`jsx
<div>Hello World</div>
\`\`\`

**JSX 元素**:
\`\`\`jsx
<div>
  <h1>标题</h1>
  <p>段落</p>
</div>
\`\`\`

**JavaScript 表达式**:
\`\`\`jsx
<div>
  {user.isAdmin ? <AdminPanel /> : <UserPanel />}
</div>
\`\`\`

**数组**:
\`\`\`jsx
const items = ['苹果', '香蕉', '橙子'];
<ul>
  {items.map((item, index) => <li key={index}>{item}</li>)}
</ul>
\`\`\`

### JSX 注意事项

**1. 必须有一个根元素**:
\`\`\`jsx
// ❌ 错误
return (
  <h1>标题</h1>
  <p>段落</p>
);

// ✅ 正确 - 使用 div
return (
  <div>
    <h1>标题</h1>
    <p>段落</p>
  </div>
);

// ✅ 正确 - 使用 Fragment
return (
  <>
    <h1>标题</h1>
    <p>段落</p>
  </>
);
\`\`\`

**2. 标签必须闭合**:
\`\`\`jsx
<img src="logo.png" />  // ✅
<br />                  // ✅
\`\`\`

**3. camelCase 属性名**:
\`\`\`jsx
<div className="box" onClick={handleClick}>
\`\`\`

### 条件渲染

**if/else**:
\`\`\`jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
\`\`\`

**三元运算符**:
\`\`\`jsx
<div>
  {isLoggedIn ? <UserPanel /> : <GuestPanel />}
</div>
\`\`\`

**逻辑与 &&**:
\`\`\`jsx
{isLoggedIn && <UserPanel />}
\`\`\`
          `,
          code: `// ========== JSX 语法示例 ==========

import { useState } from 'react'

function JSXDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [count, setCount] = useState(0)
  
  // 1. JSX 中嵌入表达式
  const user = {
    name: '张三',
    age: 25,
    avatar: 'https://via.placeholder.com/50'
  }
  
  // 2. 样式对象
  const boxStyle = {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '20px'
  }
  
  // 3. 类名动态计算
  const buttonClass = \`btn \${isLoggedIn ? 'btn-primary' : 'btn-secondary'}\`
  
  // 4. 列表数据
  const fruits = ['苹果', '香蕉', '橙子', '葡萄']
  
  return (
    <div className="jsx-demo">
      {/* 注释：JSX 中的注释使用 {/* */} */}
      
      {/* 1. 基本 JSX 语法 */}
      <section style={boxStyle}>
        <h2>基本 JSX</h2>
        <p>你好，{user.name}！</p>
        <p>你今年 {user.age} 岁</p>
        <img src={user.avatar} alt={user.name} />
      </section>
      
      {/* 2. 条件渲染 - if/else */}
      <section style={boxStyle}>
        <h2>条件渲染</h2>
        {isLoggedIn ? (
          <div>
            <p>欢迎回来，{user.name}！</p>
            <button onClick={() => setIsLoggedIn(false)}>
              登出
            </button>
          </div>
        ) : (
          <div>
            <p>请先登录</p>
            <button onClick={() => setIsLoggedIn(true)}>
              登录
            </button>
          </div>
        )}
      </section>
      
      {/* 3. 逻辑与运算符 */}
      <section style={boxStyle}>
        <h2>逻辑与运算符</h2>
        <p>计数: {count}</p>
        <button onClick={() => setCount(count + 1)}>增加</button>
        {count > 5 && (
          <p style={{ color: 'red' }}>
            计数已超过 5！
          </p>
        )}
      </section>
      
      {/* 4. 列表渲染 */}
      <section style={boxStyle}>
        <h2>列表渲染</h2>
        <ul>
          {fruits.map((fruit, index) => (
            <li key={index}>
              {index + 1}. {fruit}
            </li>
          ))}
        </ul>
      </section>
      
      {/* 5. Fragment 短语法 */}
      <section style={boxStyle}>
        <h2>Fragment</h2>
        <>
          <p>这是第一段</p>
          <p>这是第二段</p>
          <p>使用 Fragment 可以避免额外的 div</p>
        </>
      </section>
      
      {/* 6. 动态样式和类名 */}
      <section style={boxStyle}>
        <h2>动态样式和类名</h2>
        <button 
          className={buttonClass}
          style={{
            backgroundColor: isLoggedIn ? '#4CAF50' : '#2196F3',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isLoggedIn ? '已登录' : '未登录'}
        </button>
      </section>
      
      {/* 7. 事件处理 */}
      <section style={boxStyle}>
        <h2>事件处理</h2>
        <button onClick={() => alert('按钮被点击！')}>
          点击我
        </button>
        <button onClick={(e) => {
          e.preventDefault()
          console.log('事件对象:', e)
        }}>
          查看事件对象
        </button>
      </section>
      
      {/* 8. 表达式计算 */}
      <section style={boxStyle}>
        <h2>表达式计算</h2>
        <p>1 + 1 = {1 + 1}</p>
        <p>数组长度: {fruits.length}</p>
        <p>字符串方法: {user.name.toUpperCase()}</p>
        <p>模板字符串: {\`\${user.name}今年\${user.age}岁\`}</p>
      </section>
    </div>
  )
}

// ========================================

// 条件渲染组件示例
function UserStatus({ user }) {
  // 多条件渲染
  if (!user) {
    return <div>用户未找到</div>
  }
  
  if (!user.isActive) {
    return <div>用户未激活</div>
  }
  
  if (user.isAdmin) {
    return (
      <div className="admin-badge">
        <span>👑 管理员</span>
        <span>{user.name}</span>
      </div>
    )
  }
  
  return (
    <div className="user-badge">
      <span>👤 {user.name}</span>
    </div>
  )
}

// ========================================

// 列表渲染最佳实践
function TaskList({ tasks }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>暂无任务</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li 
              key={task.id}
              className={task.completed ? 'completed' : ''}
            >
              <span>{task.title}</span>
              <span>{task.completed ? '✓' : '○'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default JSXDemo`
        }
      ]
    }
  ],

  // 学习资源
  resources: [
    {
      name: 'React 官方文档',
      url: 'https://react.dev/'
    },
    {
      name: 'React 中文文档',
      url: 'https://zh-hans.react.dev/'
    },
    {
      name: 'Create React App',
      url: 'https://create-react-app.dev/'
    },
    {
      name: 'Vite',
      url: 'https://vitejs.dev/'
    },
    {
      name: 'Next.js',
      url: 'https://nextjs.org/'
    },
    {
      name: 'React Router',
      url: 'https://reactrouter.com/'
    }
  ],

  // 练习项目
  projects: [
    {
      id: 'todo-app',
      name: 'Todo 应用',
      difficulty: '初级',
      description: '创建一个待办事项应用，练习组件和状态管理'
    },
    {
      id: 'weather-app',
      name: '天气应用',
      difficulty: '中级',
      description: '使用 API 获取天气数据并展示'
    },
    {
      id: 'blog-platform',
      name: '博客平台',
      difficulty: '中级',
      description: '完整的博客系统，包含路由和状态管理'
    },
    {
      id: 'e-commerce',
      name: '电商网站',
      difficulty: '高级',
      description: '完整的电商应用，包含购物车、支付等功能'
    }
  ]
}
