// CSS 完整教程 - 基于最新的 CSS3 标准和现代最佳实践
export const cssTutorial = {
  id: 'css',
  name: 'CSS 完整教程',
  version: 'CSS3',
  lastUpdated: '2024-12',
  level: '初级',
  estimatedTime: '25小时',
  
  // 课程大纲
  chapters: [
    {
      id: 'intro',
      title: '第一章：CSS 入门',
      description: '了解 CSS 的基本概念和作用',
      duration: '2小时',
      sections: [
        {
          id: 'what-is-css',
          title: '1.1 什么是 CSS',
          content: `
## 什么是 CSS

CSS (Cascading Style Sheets，层叠样式表) 是用于描述 HTML 文档样式的语言。它控制网页的外观和布局。

### CSS 的核心概念

- **层叠 (Cascading)**: 多个样式规则可以应用于同一元素，按优先级层叠
- **样式 (Style)**: 定义元素的视觉呈现
- **表 (Sheets)**: 样式规则的集合

### CSS 的作用

1. **控制布局**: 定位元素，创建网格和弹性布局
2. **设置样式**: 颜色、字体、背景、边框等
3. **创建动画**: 过渡效果和关键帧动画
4. **响应式设计**: 适配不同屏幕尺寸
5. **打印样式**: 优化打印效果

### CSS 发展历史

- **CSS 1 (1996)**: 基础样式属性
- **CSS 2 (1998)**: 定位、z-index、媒体类型
- **CSS 2.1 (2011)**: 修正和完善
- **CSS 3 (2011-至今)**: 模块化发展，持续更新

### CSS3 的重要特性

✅ **选择器增强**: 属性选择器、伪类、伪元素
✅ **盒模型**: box-sizing、flexbox、grid
✅ **视觉效果**: 圆角、阴影、渐变、滤镜
✅ **动画**: transition、animation、transform
✅ **响应式**: media queries、container queries
✅ **自定义属性**: CSS 变量
✅ **网格布局**: Grid Layout
✅ **弹性布局**: Flexbox
          `,
          code: `/* CSS 基本语法 */
selector {
    property: value;
}

/* 示例：改变段落样式 */
p {
    color: #333;
    font-size: 16px;
    line-height: 1.6;
}

/* 类选择器 */
.highlight {
    background-color: yellow;
    font-weight: bold;
}

/* ID 选择器 */
#header {
    background-color: #5cb85c;
    padding: 20px;
}`
        },
        {
          id: 'css-syntax',
          title: '1.2 CSS 语法和引入方式',
          content: `
## CSS 语法

### 基本语法结构

\`\`\`css
选择器 {
    属性: 值;
    属性: 值;
}
\`\`\`

### CSS 注释

\`/* 这是注释 */\` - CSS 只支持这种注释方式

### CSS 引入方式

#### 1. 内联样式（不推荐）

直接在 HTML 元素上使用 style 属性。

**优先级最高，但不易维护。**

#### 2. 内部样式表

在 <head> 中使用 <style> 标签。

**适合单页面样式。**

#### 3. 外部样式表（推荐）

使用 <link> 标签引入独立的 CSS 文件。

**便于维护和复用。**

#### 4. @import 导入

在 CSS 文件中导入其他 CSS 文件。

**会增加 HTTP 请求，不推荐。**

### 最佳实践

1. ✅ 优先使用外部样式表
2. ✅ 避免内联样式
3. ✅ 合理组织 CSS 文件
4. ✅ 使用预处理器（Sass/Less）
5. ✅ 压缩生产环境的 CSS
          `,
          code: `<!-- 1. 内联样式 -->
<p style="color: red; font-size: 20px;">内联样式文本</p>

<!-- 2. 内部样式表 -->
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            background-color: #f0f0f0;
        }
        h1 {
            color: #333;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>标题</h1>
</body>
</html>

<!-- 3. 外部样式表（推荐） -->
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>标题</h1>
</body>
</html>

/* styles.css */
body {
    background-color: #f0f0f0;
}
h1 {
    color: #333;
    text-align: center;
}

/* 4. @import 导入 */
/* main.css */
@import url('reset.css');
@import url('typography.css');

body {
    font-family: Arial, sans-serif;
}`
        }
      ]
    },
    
    {
      id: 'selectors',
      title: '第二章：CSS 选择器',
      description: '掌握各种 CSS 选择器',
      duration: '4小时',
      sections: [
        {
          id: 'basic-selectors',
          title: '2.1 基础选择器',
          content: `
## 基础选择器

### 1. 元素选择器（标签选择器）

选择所有指定类型的元素。

\`\`\`css
p { }  /* 选择所有 <p> 元素 */
\`\`\`

### 2. 类选择器

选择具有特定 class 的元素。

\`\`\`css
.className { }  /* 选择 class="className" 的元素 */
\`\`\`

### 3. ID 选择器

选择具有特定 id 的元素（id 唯一）。

\`\`\`css
#idName { }  /* 选择 id="idName" 的元素 */
\`\`\`

### 4. 通配选择器

选择所有元素。

\`\`\`css
* { }  /* 选择所有元素 */
\`\`\`

### 5. 属性选择器

根据属性选择元素。

\`\`\`css
[attr] { }           /* 有 attr 属性 */
[attr="value"] { }   /* attr 等于 value */
[attr~="value"] { }  /* attr 包含 value 单词 */
[attr^="value"] { }  /* attr 以 value 开头 */
[attr$="value"] { }  /* attr 以 value 结尾 */
[attr*="value"] { }  /* attr 包含 value */
\`\`\`

### 选择器优先级

**从高到低：**
1. !important
2. 内联样式 (1000)
3. ID 选择器 (100)
4. 类、属性、伪类选择器 (10)
5. 元素、伪元素选择器 (1)
6. 通配选择器 (0)
          `,
          code: `/* 元素选择器 */
p {
    color: #333;
}

h1 {
    font-size: 32px;
}

/* 类选择器 */
.warning {
    color: red;
    font-weight: bold;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

/* ID 选择器 */
#header {
    background-color: #5cb85c;
}

/* 通配选择器 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 属性选择器 */
/* 选择所有有 title 属性的元素 */
[title] {
    cursor: help;
}

/* 选择 type="text" 的输入框 */
input[type="text"] {
    border: 1px solid #ccc;
    padding: 5px;
}

/* 选择 href 以 https 开头的链接 */
a[href^="https"] {
    color: green;
}

/* 选择 href 以 .pdf 结尾的链接 */
a[href$=".pdf"] {
    background: url(pdf-icon.png) no-repeat left center;
    padding-left: 20px;
}

/* 选择 class 包含 btn 的元素 */
[class*="btn"] {
    padding: 10px 20px;
    border-radius: 5px;
}

/* 优先级示例 */
p { color: black; }           /* 优先级: 1 */
.text { color: blue; }         /* 优先级: 10 */
#main { color: green; }        /* 优先级: 100 */
p.text { color: red; }         /* 优先级: 11 */
#main p { color: orange; }     /* 优先级: 101 */`
        },
        {
          id: 'combinators',
          title: '2.2 组合选择器',
          content: `
## 组合选择器

### 1. 后代选择器（空格）

选择元素的所有后代。

\`\`\`css
div p { }  /* div 内的所有 p */
\`\`\`

### 2. 子选择器（>）

选择元素的直接子元素。

\`\`\`css
div > p { }  /* div 的直接子 p */
\`\`\`

### 3. 相邻兄弟选择器（+）

选择紧接在后的兄弟元素。

\`\`\`css
h1 + p { }  /* h1 后紧邻的 p */
\`\`\`

### 4. 通用兄弟选择器（~）

选择后面的所有兄弟元素。

\`\`\`css
h1 ~ p { }  /* h1 后的所有 p */
\`\`\`

### 5. 分组选择器（,）

同时选择多个元素。

\`\`\`css
h1, h2, h3 { }  /* 所有 h1、h2、h3 */
\`\`\`

### 使用场景

- **后代选择器**: 深层嵌套的元素
- **子选择器**: 只影响直接子元素
- **相邻兄弟**: 特定元素后的第一个元素
- **通用兄弟**: 同级的多个元素
          `,
          code: `/* 后代选择器 */
/* 选择 nav 内所有的 a */
nav a {
    text-decoration: none;
}

/* 选择 .container 内所有的 p */
.container p {
    line-height: 1.6;
}

/* 子选择器 */
/* 只选择 ul 的直接子 li */
ul > li {
    list-style: none;
}

/* 只选择 .menu 的直接子 a */
.menu > a {
    padding: 10px 15px;
}

/* 相邻兄弟选择器 */
/* h2 后紧邻的 p */
h2 + p {
    font-size: 18px;
    color: #666;
}

/* label 后紧邻的 input */
label + input {
    margin-left: 10px;
}

/* 通用兄弟选择器 */
/* h2 后的所有 p */
h2 ~ p {
    color: #333;
}

/* checked 的 radio 后的所有 label */
input:checked ~ label {
    font-weight: bold;
}

/* 分组选择器 */
h1, h2, h3, h4, h5, h6 {
    font-family: 'Arial', sans-serif;
    font-weight: 700;
}

button, 
input[type="submit"],
input[type="button"] {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}

/* 组合使用 */
/* .card 内的 h3 后紧邻的 p */
.card h3 + p {
    color: #888;
    font-size: 14px;
}

/* .sidebar 的直接子 ul 内的所有 a */
.sidebar > ul a {
    display: block;
    padding: 8px 12px;
}`
        },
        {
          id: 'pseudo-classes',
          title: '2.3 伪类选择器',
          content: `
## 伪类选择器

伪类用于选择元素的特定状态。

### 链接伪类

- **:link** - 未访问的链接
- **:visited** - 已访问的链接
- **:hover** - 鼠标悬停
- **:active** - 激活状态（点击中）

**顺序：LVHA (LoVe HAte)**

### 输入伪类

- **:focus** - 获得焦点
- **:checked** - 选中状态（复选框/单选框）
- **:disabled** - 禁用状态
- **:enabled** - 启用状态
- **:valid** - 验证通过
- **:invalid** - 验证失败
- **:required** - 必填字段
- **:optional** - 可选字段

### 结构伪类

- **:first-child** - 第一个子元素
- **:last-child** - 最后一个子元素
- **:nth-child(n)** - 第 n 个子元素
- **:nth-last-child(n)** - 倒数第 n 个
- **:only-child** - 唯一子元素
- **:first-of-type** - 第一个该类型
- **:last-of-type** - 最后一个该类型
- **:nth-of-type(n)** - 第 n 个该类型
- **:empty** - 空元素
- **:not(selector)** - 否定选择器

### 其他伪类

- **:root** - 根元素（通常是 <html>）
- **:target** - 当前活动的锚点
          `,
          code: `/* 链接伪类 */
a:link {
    color: blue;
}

a:visited {
    color: purple;
}

a:hover {
    color: red;
    text-decoration: underline;
}

a:active {
    color: orange;
}

/* 输入伪类 */
input:focus {
    outline: 2px solid #5cb85c;
    border-color: #5cb85c;
}

input:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
}

input:checked + label {
    font-weight: bold;
    color: #5cb85c;
}

input:valid {
    border-color: green;
}

input:invalid {
    border-color: red;
}

/* 结构伪类 */
/* 第一个子元素 */
li:first-child {
    font-weight: bold;
}

/* 最后一个子元素 */
li:last-child {
    border-bottom: none;
}

/* 奇数行斑马纹 */
tr:nth-child(odd) {
    background-color: #f9f9f9;
}

/* 偶数行 */
tr:nth-child(even) {
    background-color: #fff;
}

/* 每3个元素 */
li:nth-child(3n) {
    color: red;
}

/* 前3个元素 */
li:nth-child(-n+3) {
    font-weight: bold;
}

/* 倒数第二个 */
p:nth-last-child(2) {
    color: blue;
}

/* 唯一子元素 */
p:only-child {
    text-align: center;
}

/* 第一个 p 元素 */
p:first-of-type {
    font-size: 18px;
}

/* 空元素 */
div:empty {
    display: none;
}

/* 否定选择器 */
/* 除了 .special 的所有 p */
p:not(.special) {
    color: #666;
}

/* 不是 :last-child 的所有 li */
li:not(:last-child) {
    border-bottom: 1px solid #ccc;
}

/* :root 定义 CSS 变量 */
:root {
    --primary-color: #5cb85c;
    --font-size: 16px;
}

/* :target 锚点激活 */
:target {
    background-color: yellow;
    animation: highlight 2s;
}`
        },
        {
          id: 'pseudo-elements',
          title: '2.4 伪元素选择器',
          content: `
## 伪元素选择器

伪元素用于选择元素的特定部分或创建虚拟元素。

### 常用伪元素

**::before** - 元素内容之前插入内容
**::after** - 元素内容之后插入内容
**::first-line** - 首行样式
**::first-letter** - 首字母样式
**::selection** - 选中文本的样式
**::placeholder** - 输入框占位符样式

### 语法注意

CSS3 使用双冒号 \`::\` 区分伪元素和伪类，但 \`:\` 也兼容。

### ::before 和 ::after

**必须设置 content 属性才能显示。**

常用于：
- 装饰性图标
- 清除浮动
- 几何图形
- 引号
- 计数器

### 使用场景

1. 装饰性内容
2. 图标
3. 清除浮动
4. 工具提示
5. 进度条
6. 徽章
          `,
          code: `/* ::before 和 ::after */
/* 添加引号 */
blockquote::before {
    content: '"';
    font-size: 48px;
    color: #ccc;
}

blockquote::after {
    content: '"';
    font-size: 48px;
    color: #ccc;
}

/* 图标 */
.icon::before {
    content: '★';
    color: gold;
    margin-right: 5px;
}

/* 清除浮动 */
.clearfix::after {
    content: '';
    display: table;
    clear: both;
}

/* 工具提示 */
[data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    background: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s;
}

[data-tooltip]:hover::after {
    opacity: 1;
}

/* 计数器 */
body {
    counter-reset: section;
}

h2::before {
    counter-increment: section;
    content: "第 " counter(section) " 章 - ";
}

/* ::first-line 首行样式 */
p::first-line {
    font-weight: bold;
    color: #5cb85c;
    font-size: 120%;
}

/* ::first-letter 首字母 */
p::first-letter {
    font-size: 48px;
    float: left;
    margin-right: 10px;
    line-height: 1;
    color: #5cb85c;
}

/* ::selection 选中文本 */
::selection {
    background-color: #5cb85c;
    color: white;
}

/* Firefox */
::-moz-selection {
    background-color: #5cb85c;
    color: white;
}

/* ::placeholder 占位符 */
input::placeholder {
    color: #999;
    font-style: italic;
}

/* 几何图形：三角形 */
.triangle::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #5cb85c;
}

/* 徽章 */
.badge::after {
    content: '新';
    position: absolute;
    top: -5px;
    right: -5px;
    background: red;
    color: white;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 12px;
}`
        }
      ]
    },
    
    {
      id: 'box-model',
      title: '第三章：盒模型',
      description: '理解 CSS 盒模型',
      duration: '3小时',
      sections: [
        {
          id: 'box-model-concept',
          title: '3.1 盒模型基础',
          content: `
## CSS 盒模型

每个 HTML 元素都被视为一个矩形盒子，由以下部分组成：

### 盒模型组成部分

1. **Content（内容）** - 实际内容区域
2. **Padding（内边距）** - 内容与边框之间的空白
3. **Border（边框）** - 围绕内边距的边框
4. **Margin（外边距）** - 边框外的空白，与其他元素的间距

### 两种盒模型

#### 1. 标准盒模型（content-box）

width/height 只包含内容区域。

\`\`\`
总宽度 = width + padding + border + margin
\`\`\`

#### 2. IE盒模型（border-box）

width/height 包含 padding 和 border。

\`\`\`
总宽度 = width + margin
\`\`\`

### box-sizing 属性

\`\`\`css
box-sizing: content-box; /* 标准盒模型（默认） */
box-sizing: border-box;  /* IE盒模型（推荐） */
\`\`\`

### 最佳实践

**推荐全局设置 border-box：**

\`\`\`css
* {
    box-sizing: border-box;
}
\`\`\`

这样更符合直觉，更易于布局计算。
          `,
          code: `/* 标准盒模型 */
.box1 {
    box-sizing: content-box; /* 默认值 */
    width: 200px;
    padding: 20px;
    border: 5px solid #333;
    margin: 10px;
    /* 实际宽度 = 200 + 40 + 10 + 20 = 270px */
}

/* IE盒模型（推荐） */
.box2 {
    box-sizing: border-box;
    width: 200px;
    padding: 20px;
    border: 5px solid #333;
    margin: 10px;
    /* 实际宽度 = 200px + 20px = 220px */
}

/* 全局设置 border-box */
*,
*::before,
*::after {
    box-sizing: border-box;
}

/* 示例：卡片布局 */
.card {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    margin: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* padding 缩写 */
.padding-demo {
    /* 四个值: 上 右 下 左 */
    padding: 10px 20px 10px 20px;
    
    /* 三个值: 上 左右 下 */
    padding: 10px 20px 10px;
    
    /* 两个值: 上下 左右 */
    padding: 10px 20px;
    
    /* 一个值: 四周 */
    padding: 20px;
}

/* margin 缩写（同 padding） */
.margin-demo {
    margin: 10px 20px;
}

/* 单独设置 */
.individual {
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
    
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
    margin-left: 20px;
}`
        }
      ]
    },
    
    {
      id: 'colors-backgrounds',
      title: '第四章：颜色与背景',
      description: '掌握颜色和背景样式',
      duration: '3小时',
      sections: [
        {
          id: 'colors',
          title: '4.1 颜色系统',
          content: `
## CSS 颜色

### 颜色表示方法

#### 1. 颜色关键字

140+ 预定义颜色名称。

\`\`\`css
color: red;
color: transparent; /* 透明 */
color: currentColor; /* 继承当前颜色 */
\`\`\`

#### 2. 十六进制（HEX）

最常用的表示方式。

\`\`\`css
#RRGGBB  /* 如: #FF0000 */
#RGB     /* 缩写: #F00 */
#RRGGBBAA /* 带透明度: #FF000080 */
\`\`\`

#### 3. RGB / RGBA

Red、Green、Blue，每个值 0-255。

\`\`\`css
rgb(255, 0, 0)           /* 红色 */
rgba(255, 0, 0, 0.5)     /* 半透明红色 */
\`\`\`

#### 4. HSL / HSLA

色相(Hue)、饱和度(Saturation)、亮度(Lightness)。

\`\`\`css
hsl(0, 100%, 50%)        /* 红色 */
hsla(0, 100%, 50%, 0.5)  /* 半透明红色 */
\`\`\`

- **H**: 0-360度（0=红，120=绿，240=蓝）
- **S**: 0-100%（0=灰色，100=全彩）
- **L**: 0-100%（0=黑色，50=正常，100=白色）

### 颜色函数（CSS Color Module Level 4）

\`\`\`css
color-mix()     /* 混合颜色 */
color-contrast() /* 对比度 */
\`\`\`
          `,
          code: `/* 颜色关键字 */
.keyword-color {
    color: red;
    background-color: lightblue;
    border-color: navy;
}

/* 十六进制 */
.hex-color {
    color: #333333;      /* 深灰 */
    color: #333;         /* 缩写 */
    color: #FF6B6B;      /* 红色调 */
    color: #5cb85c;      /* 绿色 */
}

/* RGB */
.rgb-color {
    color: rgb(255, 0, 0);           /* 红色 */
    background: rgb(92, 184, 92);    /* 绿色背景 */
    border: 1px solid rgb(200, 200, 200);
}

/* RGBA（带透明度） */
.rgba-color {
    background-color: rgba(0, 0, 0, 0.5);  /* 半透明黑色 */
    color: rgba(255, 255, 255, 0.8);       /* 80%不透明白色 */
}

/* HSL */
.hsl-color {
    /* 红色系 */
    color: hsl(0, 100%, 50%);         /* 纯红 */
    color: hsl(0, 80%, 60%);          /* 淡红 */
    
    /* 绿色系 */
    background: hsl(120, 50%, 50%);   /* 绿色 */
    
    /* 蓝色系 */
    border-color: hsl(240, 100%, 50%); /* 蓝色 */
}

/* HSLA（带透明度） */
.hsla-color {
    background: hsla(0, 100%, 50%, 0.3);  /* 半透明红 */
}

/* currentColor */
.current-color {
    color: #5cb85c;
    border: 2px solid currentColor;  /* 边框颜色跟随文字颜色 */
    box-shadow: 0 0 10px currentColor;
}

/* 渐变颜色 */
.gradient {
    background: linear-gradient(
        to right,
        rgb(255, 0, 0),
        rgb(0, 0, 255)
    );
}

/* 透明度 */
.transparency {
    background-color: rgba(0, 0, 0, 0);    /* 完全透明 */
    background-color: rgba(0, 0, 0, 0.25); /* 25%不透明 */
    background-color: rgba(0, 0, 0, 0.5);  /* 50%不透明 */
    background-color: rgba(0, 0, 0, 0.75); /* 75%不透明 */
    background-color: rgba(0, 0, 0, 1);    /* 完全不透明 */
}`
        },
        {
          id: 'backgrounds',
          title: '4.2 背景样式',
          content: `
## 背景属性

### 基础背景属性

**background-color** - 背景颜色
**background-image** - 背景图片
**background-repeat** - 重复方式
**background-position** - 位置
**background-size** - 尺寸
**background-attachment** - 滚动方式

### background-repeat

- \`repeat\` - 平铺（默认）
- \`repeat-x\` - 水平平铺
- \`repeat-y\` - 垂直平铺
- \`no-repeat\` - 不平铺

### background-position

关键字：\`left | center | right | top | bottom\`
数值：\`10px 20px\` 或 \`50% 50%\`

### background-size

- \`auto\` - 原始尺寸
- \`cover\` - 覆盖整个容器
- \`contain\` - 完整显示图片
- \`100px 200px\` - 指定尺寸
- \`50%\` - 百分比

### 渐变背景

**linear-gradient** - 线性渐变
**radial-gradient** - 径向渐变
**conic-gradient** - 圆锥渐变

### 多重背景

可以设置多个背景图片，用逗号分隔。
          `,
          code: `/* 基础背景 */
.basic-bg {
    background-color: #f0f0f0;
    background-image: url('pattern.png');
    background-repeat: no-repeat;
    background-position: center;
}

/* 背景简写 */
.bg-shorthand {
    /* 颜色 图片 repeat position / size */
    background: #fff url('bg.jpg') no-repeat center / cover;
}

/* background-size */
.bg-cover {
    background-image: url('hero.jpg');
    background-size: cover;      /* 覆盖整个容器 */
    background-position: center;
}

.bg-contain {
    background-image: url('logo.png');
    background-size: contain;    /* 完整显示 */
    background-repeat: no-repeat;
}

/* background-attachment */
.parallax {
    background-image: url('mountain.jpg');
    background-attachment: fixed;  /* 固定背景，视差效果 */
    background-size: cover;
}

/* 线性渐变 */
.linear-gradient {
    /* 从上到下 */
    background: linear-gradient(to bottom, #5cb85c, #2e7d32);
    
    /* 45度角 */
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    
    /* 多色渐变 */
    background: linear-gradient(
        to right,
        red 0%,
        yellow 50%,
        green 100%
    );
}

/* 径向渐变 */
.radial-gradient {
    background: radial-gradient(circle, #fff, #000);
    background: radial-gradient(ellipse at center, #5cb85c, #2e7d32);
}

/* 圆锥渐变 */
.conic-gradient {
    background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red);
}

/* 多重背景 */
.multiple-bg {
    background-image:
        url('pattern1.png'),
        url('pattern2.png'),
        linear-gradient(to right, #5cb85c, #2e7d32);
    background-position:
        top left,
        bottom right,
        center;
    background-repeat:
        repeat-x,
        no-repeat,
        no-repeat;
    background-size:
        auto,
        100px 100px,
        cover;
}

/* 实用案例：Hero区域 */
.hero {
    background: linear-gradient(
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
    ), url('hero-bg.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: white;
    padding: 100px 20px;
}

/* 渐变按钮 */
.gradient-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 50px;
    transition: transform 0.3s;
}

.gradient-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}`
        }
      ]
    }
  ],
  
  // 学习资源
  resources: [
    {
      type: 'official',
      name: 'MDN CSS文档',
      url: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS'
    },
    {
      type: 'spec',
      name: 'W3C CSS规范',
      url: 'https://www.w3.org/Style/CSS/'
    },
    {
      type: 'tutorial',
      name: 'CSS-Tricks',
      url: 'https://css-tricks.com/'
    },
    {
      type: 'tool',
      name: 'Can I Use',
      url: 'https://caniuse.com/'
    }
  ],
  
  // 练习项目
  projects: [
    {
      id: 'card-layout',
      name: '卡片布局',
      difficulty: '初级',
      description: '使用 Flexbox 创建响应式卡片网格'
    },
    {
      id: 'navigation-menu',
      name: '导航菜单',
      difficulty: '中级',
      description: '创建多级下拉导航菜单'
    }
  ]
}

export default cssTutorial
