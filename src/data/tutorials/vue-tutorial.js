// Vue.js 完整教程 - 基于最新的 Vue 3.4+ 和 Composition API
export const vueTutorial = {
  id: 'vue',
  name: 'Vue.js 完整教程',
  version: 'Vue 3.4+',
  lastUpdated: '2024-12',
  level: '中级',
  estimatedTime: '35小时',
  
  // 课程大纲
  chapters: [
    {
      id: 'intro',
      title: '第一章：Vue.js 入门',
      description: '了解 Vue.js 的基本概念和核心特性',
      duration: '3小时',
      sections: [
        {
          id: 'what-is-vue',
          title: '1.1 什么是 Vue.js',
          content: `
## 什么是 Vue.js

Vue.js 是一套用于构建用户界面的**渐进式 JavaScript 框架**。它专注于视图层，易于上手，同时也能与其他库或现有项目整合。

### Vue 的核心概念

- **渐进式框架**: 可以从简单的库逐步扩展到完整的框架
- **响应式数据绑定**: 数据变化自动更新 DOM
- **组件化**: 将 UI 拆分成可复用的独立部分
- **声明式渲染**: 通过模板语法描述 UI
- **虚拟 DOM**: 高效的 DOM 更新机制

### Vue 的特点

**优势**:
- ✅ **易学易用**: 简洁的 API 和清晰的文档
- ✅ **灵活性强**: 可以是库也可以是框架
- ✅ **性能优秀**: 虚拟 DOM 和编译器优化
- ✅ **生态丰富**: Vue Router、Pinia、Vite 等官方工具
- ✅ **TypeScript 支持**: 完整的 TS 类型定义

**适用场景**:
- 单页应用（SPA）
- 渐进式 Web 应用（PWA）
- 服务端渲染（SSR）
- 静态站点生成（SSG）
- 桌面应用（Electron）
- 移动应用（配合原生渲染）

### Vue 发展历史

- **2014**: Vue 1.0 发布，尤雨溪创建
- **2016**: Vue 2.0 发布，引入虚拟 DOM
- **2020**: Vue 3.0 发布，Composition API、性能提升
- **2022**: Vue 3 成为默认版本
- **2024**: Vue 3.4+，优化响应式系统和编译器

### Vue 3 的重要特性

✅ **Composition API**: 更灵活的逻辑组织方式
✅ **\`<script setup>\`**: 更简洁的单文件组件语法
✅ **性能提升**: 更快的渲染和更小的打包体积
✅ **TypeScript 支持**: 原生 TypeScript 支持
✅ **Teleport**: 传送组件到 DOM 的其他位置
✅ **Suspense**: 异步组件的加载状态管理
✅ **Fragment**: 支持多个根节点
✅ **Emits 组件选项**: 更好的事件声明
          `,
          code: `<!-- Vue 3 基本示例 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 3 Hello World</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
    <div id="app">
        <h1>{{ message }}</h1>
        <p>计数器: {{ count }}</p>
        <button @click="increment">增加</button>
    </div>

    <script>
        const { createApp, ref } = Vue;

        createApp({
            setup() {
                // 响应式数据
                const message = ref('Hello Vue 3!');
                const count = ref(0);

                // 方法
                const increment = () => {
                    count.value++;
                };

                // 暴露给模板
                return {
                    message,
                    count,
                    increment
                };
            }
        }).mount('#app');
    </script>
</body>
</html>`
        },
        {
          id: 'environment-setup',
          title: '1.2 开发环境搭建',
          content: `
## 开发环境搭建

### 方式一：使用 CDN（快速体验）

适合学习和原型开发：

\`\`\`html
<!-- 开发版本 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- 生产版本 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
\`\`\`

### 方式二：使用 npm（推荐）

**1. 安装 Node.js**
- 访问 [nodejs.org](https://nodejs.org)
- 下载并安装 LTS 版本
- 验证安装：\`node -v\` 和 \`npm -v\`

**2. 使用 create-vue 创建项目**（推荐）

\`\`\`bash
npm create vue@latest
\`\`\`

选择配置：
- ✅ TypeScript
- ✅ Vue Router
- ✅ Pinia
- ✅ ESLint
- ✅ Prettier

**3. 使用 Vite 手动创建**

\`\`\`bash
npm create vite@latest my-vue-app -- --template vue
cd my-vue-app
npm install
npm run dev
\`\`\`

### 开发工具推荐

**编辑器**:
- **Visual Studio Code** + Volar 插件（推荐）
- WebStorm

**浏览器扩展**:
- **Vue Devtools** - 调试 Vue 应用

**VS Code 插件**:
- Volar（Vue 语言支持）
- Vue VSCode Snippets（代码片段）
- ESLint（代码检查）
- Prettier（代码格式化）

### 项目结构

\`\`\`
my-vue-app/
├── node_modules/      # 依赖包
├── public/            # 静态资源
├── src/
│   ├── assets/        # 项目资源
│   ├── components/    # 组件
│   ├── views/         # 页面
│   ├── router/        # 路由配置
│   ├── stores/        # 状态管理
│   ├── App.vue        # 根组件
│   └── main.js        # 入口文件
├── index.html         # HTML 模板
├── package.json       # 项目配置
└── vite.config.js     # Vite 配置
\`\`\`
          `,
          code: `// main.js - Vue 3 应用入口文件

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// 创建 Vue 应用实例
const app = createApp(App)

// 使用插件
app.use(createPinia())  // 状态管理
app.use(router)         // 路由

// 全局配置
app.config.errorHandler = (err, vm, info) => {
    console.error('全局错误:', err, info)
}

// 全局属性
app.config.globalProperties.$appName = 'My Vue App'

// 挂载应用
app.mount('#app')

// ===================================

// App.vue - 根组件
<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
      </nav>
    </header>
    
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'

onMounted(() => {
  console.log('应用已挂载')
})
</script>

<style scoped>
header {
  background-color: #42b983;
  padding: 1rem;
}

nav a {
  margin-right: 1rem;
  color: white;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}
</style>`
        }
      ]
    },
    {
      id: 'basics',
      title: '第二章：Vue 基础',
      description: '掌握 Vue 的核心概念和基本用法',
      duration: '6小时',
      sections: [
        {
          id: 'template-syntax',
          title: '2.1 模板语法',
          content: `
## 模板语法

Vue 使用基于 HTML 的模板语法，允许你声明式地将数据渲染到 DOM。

### 文本插值

使用双大括号（Mustache 语法）：

\`\`\`vue
<span>{{ message }}</span>
\`\`\`

### 原始 HTML

使用 \`v-html\` 指令：

\`\`\`vue
<div v-html="rawHtml"></div>
\`\`\`

⚠️ **安全警告**: 永远不要在用户输入的内容上使用 v-html，防止 XSS 攻击。

### 属性绑定

使用 \`v-bind\` 或简写 \`:\`：

\`\`\`vue
<div v-bind:id="dynamicId"></div>
<div :id="dynamicId"></div>  <!-- 简写 -->

<button :disabled="isButtonDisabled">按钮</button>
\`\`\`

### 使用 JavaScript 表达式

模板内支持 JavaScript 表达式：

\`\`\`vue
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}

<div :id="\`list-\${id}\`"></div>
\`\`\`

**限制**:
- 只能包含单一表达式
- 不能使用语句（如 if、for）
- 只能访问有限的全局对象

### 指令

指令是带有 \`v-\` 前缀的特殊属性：

- \`v-if\`: 条件渲染
- \`v-for\`: 列表渲染
- \`v-on\`: 事件监听
- \`v-bind\`: 属性绑定
- \`v-model\`: 双向绑定

### 动态参数

\`\`\`vue
<a v-bind:[attributeName]="url">链接</a>
<a v-on:[eventName]="handler">按钮</a>
\`\`\`

### 修饰符

修饰符是以点开头的特殊后缀：

\`\`\`vue
<form @submit.prevent="onSubmit">
  <button @click.stop="handleClick">点击</button>
</form>
\`\`\`
          `,
          code: `<template>
  <div class="template-demo">
    <!-- 1. 文本插值 -->
    <h2>{{ title }}</h2>
    <p>{{ message }}</p>

    <!-- 2. 原始 HTML -->
    <div v-html="htmlContent"></div>

    <!-- 3. 属性绑定 -->
    <img :src="imageSrc" :alt="imageAlt">
    <a :href="url" target="_blank">{{ linkText }}</a>
    
    <!-- 动态 class -->
    <div :class="{ active: isActive, 'text-danger': hasError }">
      动态 class
    </div>
    
    <!-- 动态 style -->
    <div :style="{ color: textColor, fontSize: fontSize + 'px' }">
      动态 style
    </div>

    <!-- 4. JavaScript 表达式 -->
    <p>反转消息: {{ message.split('').reverse().join('') }}</p>
    <p>{{ number * 2 + 1 }}</p>
    <p>{{ ok ? '是' : '否' }}</p>

    <!-- 5. 指令 -->
    <p v-if="seen">现在你看到我了</p>
    <button v-on:click="handleClick">点击我</button>
    <button @click="handleClick">点击我（简写）</button>

    <!-- 6. 动态参数 -->
    <a :[attributeName]="url">动态属性</a>
    <button @[eventName]="handleEvent">动态事件</button>

    <!-- 7. 修饰符 -->
    <form @submit.prevent="onSubmit">
      <input v-model.trim="username" placeholder="用户名">
      <input v-model.number="age" type="number" placeholder="年龄">
      <button type="submit">提交</button>
    </form>

    <div @click="handleOuterClick">
      <button @click.stop="handleInnerClick">
        阻止冒泡
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const title = ref('Vue 3 模板语法')
const message = ref('Hello Vue!')
const htmlContent = ref('<strong style="color: red;">HTML 内容</strong>')

const imageSrc = ref('https://vuejs.org/images/logo.png')
const imageAlt = ref('Vue Logo')
const url = ref('https://vuejs.org')
const linkText = ref('Vue 官网')

const isActive = ref(true)
const hasError = ref(false)
const textColor = ref('#42b983')
const fontSize = ref(16)

const number = ref(10)
const ok = ref(true)
const seen = ref(true)

// 动态参数
const attributeName = ref('href')
const eventName = ref('click')

// 表单数据
const username = ref('')
const age = ref(0)

// 方法
const handleClick = () => {
  alert('按钮被点击了！')
}

const handleEvent = () => {
  alert('动态事件触发')
}

const onSubmit = () => {
  console.log('表单提交:', { username: username.value, age: age.value })
}

const handleOuterClick = () => {
  console.log('外层点击')
}

const handleInnerClick = () => {
  console.log('内层点击（不会冒泡）')
}
</script>

<style scoped>
.template-demo {
  padding: 20px;
}

.active {
  font-weight: bold;
}

.text-danger {
  color: #f56c6c;
}

button {
  margin: 5px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>`
        },
        {
          id: 'reactive-fundamentals',
          title: '2.2 响应式基础',
          content: `
## 响应式基础

Vue 3 的响应式系统是基于 JavaScript Proxy 实现的。

### ref()

用于声明响应式的原始值：

\`\`\`javascript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
\`\`\`

**特点**:
- 包装原始值（number、string、boolean）
- 通过 \`.value\` 访问和修改
- 在模板中自动解包，不需要 \`.value\`
- 可以包装任何类型，包括对象

### reactive()

用于声明响应式的对象：

\`\`\`javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello'
})

state.count++ // 直接访问，不需要 .value
\`\`\`

**特点**:
- 只能用于对象类型（对象、数组、Map、Set）
- 返回对象的响应式代理
- 解构会失去响应性
- 直接访问属性，不需要 \`.value\`

### ref vs reactive

| 特性 | ref | reactive |
|------|-----|----------|
| 适用类型 | 任何类型 | 对象类型 |
| 访问方式 | .value | 直接访问 |
| 解构 | 保持响应性 | 失去响应性 |
| 替换整个对象 | 可以 | 不可以 |
| TypeScript 推断 | 更好 | 一般 |

**推荐**:
- 使用 \`ref()\` 声明所有响应式状态（Vue 官方推荐）
- 使用 \`reactive()\` 声明明确的对象结构

### computed()

计算属性，基于响应式依赖进行缓存：

\`\`\`javascript
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)
\`\`\`

**特点**:
- 自动追踪依赖
- 结果会被缓存
- 依赖变化时自动更新
- 默认只读，可设置 getter 和 setter

### watch() 和 watchEffect()

监听响应式数据的变化：

\`\`\`javascript
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)

// watch - 明确指定监听源
watch(count, (newValue, oldValue) => {
  console.log(\`count 从 \${oldValue} 变为 \${newValue}\`)
})

// watchEffect - 自动追踪依赖
watchEffect(() => {
  console.log(\`count 是 \${count.value}\`)
})
\`\`\`
          `,
          code: `<template>
  <div class="reactive-demo">
    <h2>响应式基础示例</h2>

    <!-- 1. ref 示例 -->
    <section>
      <h3>ref() 示例</h3>
      <p>计数: {{ count }}</p>
      <p>消息: {{ message }}</p>
      <button @click="incrementCount">增加计数</button>
      <button @click="changeMessage">改变消息</button>
    </section>

    <!-- 2. reactive 示例 -->
    <section>
      <h3>reactive() 示例</h3>
      <p>用户名: {{ user.name }}</p>
      <p>年龄: {{ user.age }}</p>
      <p>城市: {{ user.address.city }}</p>
      <button @click="updateUser">更新用户</button>
    </section>

    <!-- 3. computed 示例 -->
    <section>
      <h3>computed() 示例</h3>
      <p>原始计数: {{ count }}</p>
      <p>双倍计数: {{ doubleCount }}</p>
      <p>计数是否为偶数: {{ isEven }}</p>
      
      <p>全名: {{ fullName }}</p>
      <input v-model="firstName" placeholder="名">
      <input v-model="lastName" placeholder="姓">
    </section>

    <!-- 4. watch 示例 -->
    <section>
      <h3>watch() 示例</h3>
      <input v-model="searchQuery" placeholder="搜索...">
      <p>搜索查询: {{ searchQuery }}</p>
      <p>搜索结果: {{ searchResults }}</p>
    </section>

    <!-- 5. 数组响应式 -->
    <section>
      <h3>数组响应式</h3>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item }}
          <button @click="removeItem(index)">删除</button>
        </li>
      </ul>
      <button @click="addItem">添加项目</button>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue'

// ========== ref 示例 ==========
const count = ref(0)
const message = ref('Hello Vue 3')

const incrementCount = () => {
  count.value++
}

const changeMessage = () => {
  message.value = message.value === 'Hello Vue 3' 
    ? 'Vue 3 is awesome!' 
    : 'Hello Vue 3'
}

// ========== reactive 示例 ==========
const user = reactive({
  name: '张三',
  age: 25,
  address: {
    city: '北京',
    street: '长安街'
  }
})

const updateUser = () => {
  user.name = '李四'
  user.age++
  user.address.city = '上海'
}

// ========== computed 示例 ==========
const doubleCount = computed(() => {
  console.log('计算 doubleCount')
  return count.value * 2
})

const isEven = computed(() => count.value % 2 === 0)

const firstName = ref('三')
const lastName = ref('张')

// 可写的计算属性
const fullName = computed({
  get() {
    return lastName.value + firstName.value
  },
  set(newValue) {
    // 假设格式是 "姓名"
    if (newValue.length >= 2) {
      lastName.value = newValue[0]
      firstName.value = newValue.slice(1)
    }
  }
})

// ========== watch 示例 ==========
const searchQuery = ref('')
const searchResults = ref('')

// 监听单个 ref
watch(searchQuery, (newQuery, oldQuery) => {
  console.log(\`搜索从 "\${oldQuery}" 变为 "\${newQuery}"\`)
  // 模拟搜索
  searchResults.value = newQuery ? \`找到 \${newQuery.length} 个结果\` : ''
}, {
  immediate: false, // 是否立即执行
  deep: false       // 是否深度监听
})

// 监听多个源
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  console.log('count 或 message 变化了')
})

// watchEffect - 自动追踪依赖
watchEffect(() => {
  console.log(\`watchEffect: count = \${count.value}\`)
})

// ========== 数组响应式 ==========
const items = ref(['项目 1', '项目 2', '项目 3'])

const addItem = () => {
  items.value.push(\`项目 \${items.value.length + 1}\`)
}

const removeItem = (index) => {
  items.value.splice(index, 1)
}
</script>

<style scoped>
.reactive-demo {
  padding: 20px;
}

section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h3 {
  color: #42b983;
  margin-top: 0;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #35a372;
}

input {
  margin: 5px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px;
  margin: 5px 0;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>`
        },
        {
          id: 'conditional-rendering',
          title: '2.3 条件渲染',
          content: `
## 条件渲染

### v-if、v-else-if、v-else

用于条件性地渲染元素：

\`\`\`vue
<template>
  <div v-if="type === 'A'">A</div>
  <div v-else-if="type === 'B'">B</div>
  <div v-else>C</div>
</template>
\`\`\`

**特点**:
- "真正"的条件渲染
- 条件为假时，元素不会被渲染到 DOM
- 有更高的切换开销
- 适合运行时条件很少改变的情况

### v-show

根据条件显示或隐藏元素：

\`\`\`vue
<template>
  <h1 v-show="isVisible">Hello!</h1>
</template>
\`\`\`

**特点**:
- 元素始终会被渲染到 DOM
- 只是切换 CSS 的 \`display\` 属性
- 有更高的初始渲染开销
- 适合频繁切换的情况

### v-if vs v-show

| 特性 | v-if | v-show |
|------|------|--------|
| 渲染 | 条件性渲染 | 始终渲染 |
| 切换开销 | 较高 | 较低 |
| 初始开销 | 较低 | 较高 |
| 适用场景 | 运行时条件很少改变 | 频繁切换 |
| 支持 \`<template>\` | ✅ | ❌ |
| 事件监听器和子组件 | 销毁和重建 | 保留 |

### 在 \`<template>\` 上使用 v-if

可以在 \`<template>\` 元素上使用 v-if 渲染多个元素：

\`\`\`vue
<template v-if="loginType === 'username'">
  <label>用户名</label>
  <input placeholder="请输入用户名">
</template>
\`\`\`

### v-if 与 v-for

⚠️ **不推荐**同时使用 v-if 和 v-for。

当它们同时存在于一个元素上时，v-if 的优先级更高。
          `,
          code: `<template>
  <div class="conditional-demo">
    <h2>条件渲染示例</h2>

    <!-- 1. v-if / v-else-if / v-else -->
    <section>
      <h3>v-if / v-else-if / v-else</h3>
      <select v-model="type">
        <option value="A">类型 A</option>
        <option value="B">类型 B</option>
        <option value="C">类型 C</option>
      </select>

      <div v-if="type === 'A'" class="type-box">
        <h4>类型 A</h4>
        <p>这是类型 A 的内容</p>
      </div>
      <div v-else-if="type === 'B'" class="type-box">
        <h4>类型 B</h4>
        <p>这是类型 B 的内容</p>
      </div>
      <div v-else class="type-box">
        <h4>类型 C</h4>
        <p>这是类型 C 的内容</p>
      </div>
    </section>

    <!-- 2. v-show -->
    <section>
      <h3>v-show</h3>
      <button @click="toggleVisibility">切换显示</button>
      <p v-show="isVisible">
        这段文字使用 v-show 控制显示（{{ isVisible ? '显示' : '隐藏' }}）
      </p>
      <p>v-show 元素始终在 DOM 中，只是切换 display 属性</p>
    </section>

    <!-- 3. v-if vs v-show 对比 -->
    <section>
      <h3>v-if vs v-show 对比</h3>
      <button @click="toggleComparison">切换（{{ comparisonVisible ? '隐藏' : '显示' }}）</button>
      
      <div class="comparison">
        <div>
          <h4>使用 v-if</h4>
          <div v-if="comparisonVisible" class="box">
            <p>v-if 控制</p>
            <p>不显示时，DOM 中不存在</p>
          </div>
          <p v-else class="placeholder">元素未渲染</p>
        </div>

        <div>
          <h4>使用 v-show</h4>
          <div v-show="comparisonVisible" class="box">
            <p>v-show 控制</p>
            <p>不显示时，DOM 中仍存在</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. template 与 v-if -->
    <section>
      <h3>&lt;template&gt; 与 v-if</h3>
      <select v-model="loginType">
        <option value="username">用户名</option>
        <option value="email">邮箱</option>
      </select>

      <template v-if="loginType === 'username'">
        <label>用户名</label>
        <input v-model="username" placeholder="请输入用户名" key="username">
      </template>
      <template v-else>
        <label>邮箱</label>
        <input v-model="email" placeholder="请输入邮箱" type="email" key="email">
      </template>
    </section>

    <!-- 5. 复杂条件 -->
    <section>
      <h3>复杂条件示例</h3>
      <div>
        <label>
          <input type="checkbox" v-model="isLoggedIn">
          已登录
        </label>
        <label>
          <input type="checkbox" v-model="isAdmin">
          管理员
        </label>
      </div>

      <div v-if="!isLoggedIn" class="message info">
        请先登录
      </div>
      <div v-else-if="isAdmin" class="message success">
        欢迎，管理员！您有完全访问权限。
      </div>
      <div v-else class="message warning">
        欢迎，普通用户！您有有限访问权限。
      </div>
    </section>

    <!-- 6. 性能对比 -->
    <section>
      <h3>性能测试（频繁切换）</h3>
      <p>点击次数: {{ clickCount }}</p>
      <button @click="rapidToggle">快速切换 10 次</button>
      <div class="performance-test">
        <div>
          <h4>v-if (更适合很少改变的情况)</h4>
          <div v-if="performanceToggle" class="box">
            内容
          </div>
        </div>
        <div>
          <h4>v-show (更适合频繁切换)</h4>
          <div v-show="performanceToggle" class="box">
            内容
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// v-if 示例
const type = ref('A')

// v-show 示例
const isVisible = ref(true)
const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}

// 对比示例
const comparisonVisible = ref(true)
const toggleComparison = () => {
  comparisonVisible.value = !comparisonVisible.value
}

// template 示例
const loginType = ref('username')
const username = ref('')
const email = ref('')

// 复杂条件
const isLoggedIn = ref(false)
const isAdmin = ref(false)

// 性能测试
const performanceToggle = ref(true)
const clickCount = ref(0)

const rapidToggle = () => {
  const startTime = performance.now()
  for (let i = 0; i < 10; i++) {
    performanceToggle.value = !performanceToggle.value
    clickCount.value++
  }
  const endTime = performance.now()
  console.log(\`快速切换 10 次耗时: \${(endTime - startTime).toFixed(2)}ms\`)
}
</script>

<style scoped>
.conditional-demo {
  padding: 20px;
}

section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h3 {
  color: #42b983;
  margin-top: 0;
}

.type-box, .box {
  margin-top: 15px;
  padding: 15px;
  border: 2px solid #42b983;
  border-radius: 8px;
  background: #f0f9f4;
}

.comparison {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.comparison > div {
  flex: 1;
}

.placeholder {
  color: #999;
  font-style: italic;
}

.message {
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
}

.message.info {
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.message.success {
  background: #f1f8e9;
  border-left: 4px solid #8bc34a;
}

.message.warning {
  background: #fff3e0;
  border-left: 4px solid #ff9800;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #35a372;
}

select, input {
  margin: 5px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

label {
  margin: 0 10px;
}

.performance-test {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.performance-test > div {
  flex: 1;
}
</style>`
        }
      ]
    },
    {
      id: 'components',
      title: '第三章：组件基础',
      description: '学习 Vue 组件的创建和使用',
      duration: '6小时',
      sections: [
        {
          id: 'component-basics',
          title: '3.1 组件基础',
          content: `
## 组件基础

组件是 Vue 最强大的功能之一。它们允许你将 UI 拆分成独立、可复用的部分。

### 定义组件

**选项式 API**:
\`\`\`javascript
export default {
  name: 'MyComponent',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
\`\`\`

**组合式 API** (推荐):
\`\`\`javascript
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => {
  count.value++
}
</script>
\`\`\`

### 使用组件

\`\`\`vue
<template>
  <MyComponent />
</template>

<script setup>
import MyComponent from './MyComponent.vue'
</script>
\`\`\`

### Props（父传子）

父组件向子组件传递数据：

\`\`\`vue
<!-- 子组件 -->
<script setup>
defineProps({
  title: String,
  count: {
    type: Number,
    default: 0,
    required: true
  }
})
</script>

<!-- 父组件 -->
<template>
  <ChildComponent title="标题" :count="10" />
</template>
\`\`\`

### Emits（子传父）

子组件向父组件发送事件：

\`\`\`vue
<!-- 子组件 -->
<script setup>
const emit = defineEmits(['update', 'delete'])

const handleClick = () => {
  emit('update', { id: 1 })
}
</script>

<!-- 父组件 -->
<template>
  <ChildComponent @update="handleUpdate" />
</template>
\`\`\`

### 插槽 (Slots)

父组件向子组件传递模板内容：

\`\`\`vue
<!-- 子组件 -->
<template>
  <div class="card">
    <slot>默认内容</slot>
  </div>
</template>

<!-- 父组件 -->
<template>
  <Card>
    <p>自定义内容</p>
  </Card>
</template>
\`\`\`
          `,
          code: `<!-- ========== 子组件: UserCard.vue ========== -->
<template>
  <div class="user-card">
    <div class="user-header">
      <img :src="avatar" :alt="name">
      <div class="user-info">
        <h3>{{ name }}</h3>
        <p class="role">{{ role }}</p>
      </div>
    </div>

    <div class="user-body">
      <slot>
        <p class="default-content">暂无内容</p>
      </slot>
    </div>

    <div class="user-footer">
      <button @click="handleLike" class="btn-like">
        👍 {{ likes }}
      </button>
      <button @click="handleFollow" class="btn-follow">
        {{ isFollowing ? '已关注' : '关注' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props - 接收父组件传递的数据
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/60'
  },
  role: {
    type: String,
    default: '普通用户'
  },
  initialLikes: {
    type: Number,
    default: 0
  }
})

// Emits - 声明要发送的事件
const emit = defineEmits(['like', 'follow'])

// 组件内部状态
const likes = ref(props.initialLikes)
const isFollowing = ref(false)

// 方法
const handleLike = () => {
  likes.value++
  emit('like', { name: props.name, likes: likes.value })
}

const handleFollow = () => {
  isFollowing.value = !isFollowing.value
  emit('follow', { name: props.name, following: isFollowing.value })
}
</script>

<style scoped>
.user-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.user-header img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.role {
  margin: 5px 0 0 0;
  font-size: 14px;
  color: #666;
}

.user-body {
  margin-bottom: 15px;
  min-height: 40px;
}

.default-content {
  color: #999;
  font-style: italic;
}

.user-footer {
  display: flex;
  gap: 10px;
}

button {
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-like {
  background: #f0f0f0;
  color: #333;
}

.btn-like:hover {
  background: #ff6b6b;
  color: white;
}

.btn-follow {
  background: #42b983;
  color: white;
}

.btn-follow:hover {
  background: #35a372;
}
</style>

<!-- ========== 父组件: App.vue ========== -->
<template>
  <div class="app">
    <h2>Vue 组件示例</h2>

    <!-- 使用子组件 -->
    <div class="card-container">
      <!-- 基础用法 -->
      <UserCard
        name="张三"
        avatar="https://i.pravatar.cc/150?img=1"
        role="前端工程师"
        :initial-likes="10"
        @like="handleLike"
        @follow="handleFollow"
      >
        <p>热爱编程，专注于 Vue 开发</p>
        <p>📍 北京</p>
      </UserCard>

      <!-- 使用默认插槽内容 -->
      <UserCard
        name="李四"
        avatar="https://i.pravatar.cc/150?img=2"
        role="UI 设计师"
        @like="handleLike"
        @follow="handleFollow"
      />

      <!-- 传递更多内容 -->
      <UserCard
        name="王五"
        avatar="https://i.pravatar.cc/150?img=3"
        role="产品经理"
        :initial-likes="25"
        @like="handleLike"
        @follow="handleFollow"
      >
        <p>🎯 专注用户体验</p>
        <p>💡 创新思维者</p>
        <div style="margin-top: 10px; color: #42b983;">
          <strong>技能:</strong> 需求分析 | 原型设计 | 项目管理
        </div>
      </UserCard>
    </div>

    <!-- 事件日志 -->
    <div class="event-log">
      <h3>事件日志</h3>
      <ul>
        <li v-for="(log, index) in eventLogs" :key="index">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserCard from './components/UserCard.vue'

// 事件日志
const eventLogs = ref([])

// 处理点赞事件
const handleLike = (data) => {
  eventLogs.value.unshift(\`\${data.name} 被点赞了！当前点赞数: \${data.likes}\`)
}

// 处理关注事件
const handleFollow = (data) => {
  const action = data.following ? '关注了' : '取消关注了'
  eventLogs.value.unshift(\`你 \${action} \${data.name}\`)
}
</script>

<style scoped>
.app {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #42b983;
  text-align: center;
  margin-bottom: 30px;
}

.card-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
}

.event-log {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.event-log h3 {
  margin-top: 0;
  color: #333;
}

.event-log ul {
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.event-log li {
  padding: 8px;
  margin: 5px 0;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #42b983;
}
</style>`
        }
      ]
    }
  ],

  // 学习资源
  resources: [
    {
      name: 'Vue 3 官方文档',
      url: 'https://cn.vuejs.org/'
    },
    {
      name: 'Vue 3 英文文档',
      url: 'https://vuejs.org/'
    },
    {
      name: 'Vue Router 文档',
      url: 'https://router.vuejs.org/zh/'
    },
    {
      name: 'Pinia 文档',
      url: 'https://pinia.vuejs.org/zh/'
    },
    {
      name: 'Vite 文档',
      url: 'https://cn.vitejs.dev/'
    },
    {
      name: 'Vue Mastery',
      url: 'https://www.vuemastery.com/'
    }
  ],

  // 练习项目
  projects: [
    {
      id: 'todo-app',
      name: 'Todo 应用',
      difficulty: '初级',
      description: '使用 Vue 3 创建待办事项应用，练习组件和响应式'
    },
    {
      id: 'blog-platform',
      name: '博客平台',
      difficulty: '中级',
      description: '完整的博客系统，包含路由、状态管理和 API 调用'
    },
    {
      id: 'e-commerce',
      name: '电商商城',
      difficulty: '高级',
      description: '完整的电商应用，包含购物车、订单管理等功能'
    }
  ]
}
