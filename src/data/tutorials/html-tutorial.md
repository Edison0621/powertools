# HTML 完整教程

## 教程信息

- **版本**: HTML5
- **难度**: 初级
- **预计学习时间**: 30小时
- **最后更新**: 2024-12

---

## 第一章：HTML 基础入门

### 1.1 HTML 简介

## HTML 简介

HTML（HyperText Markup Language，超文本标记语言）是创建网页的标准语言。

### 什么是 HTML？

- **HTML** 代表超文本标记语言
- **HTML** 是构建网页的标准标记语言
- **HTML** 描述网页的结构
- **HTML** 由一系列元素（标签）组成
- **HTML** 元素告诉浏览器如何显示内容

### HTML 的作用

HTML 元素通过标签来标记内容，例如：
- 标题、段落、列表
- 链接、图片、表格
- 表单、按钮、输入框

### 一个简单的 HTML 文档

每个 HTML 页面都有以下基本结构：
- `<!DOCTYPE html>` 声明文档类型
- `<html>` 是根元素
- `<head>` 包含元数据
- `<title>` 指定页面标题
- `<body>` 包含可见内容

### HTML 历史

- **1991**: Tim Berners-Lee 发明 HTML
- **1995**: HTML 2.0 发布
- **1997**: HTML 3.2 成为 W3C 标准
- **1999**: HTML 4.01 发布
- **2014**: HTML5 成为官方标准
- **现在**: HTML Living Standard（持续演进）

### 代码示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>我的第一个网页</title>
</head>
<body>
    <h1>欢迎来到 HTML 世界</h1>
    <p>这是我的第一个 HTML 页面。</p>
    <p>HTML 很容易学习，你会喜欢它的！</p>
</body>
</html>
```

### 1.2 HTML 编辑器

## HTML 编辑器

### 常用的 HTML 编辑器

你可以使用任何文本编辑器来编写 HTML：

**推荐的专业编辑器**：
- **Visual Studio Code** - 微软出品，免费强大
- **Sublime Text** - 轻量快速
- **Atom** - GitHub 开发的开源编辑器
- **WebStorm** - JetBrains 的专业 IDE

**简单的文本编辑器**：
- Windows 记事本
- Mac TextEdit
- Linux gedit/nano

### 使用记事本创建 HTML

**步骤 1**：打开记事本
- Windows：开始菜单 → 记事本

**步骤 2**：编写 HTML 代码

**步骤 3**：保存文件
- 文件名：index.html
- 编码：UTF-8
- 文件类型：所有文件

**步骤 4**：在浏览器中打开
- 双击 HTML 文件
- 或右键 → 打开方式 → 选择浏览器

### VS Code 使用技巧

安装 VS Code 后：
1. 安装插件："HTML Snippets"、"Live Server"
2. 输入 `!` 然后按 Tab，自动生成 HTML 模板
3. 右键文件 → "Open with Live Server" 实时预览

#### 代码示例

```html
<!-- 在记事本中编写此代码 -->
<!DOCTYPE html>
<html>
<head>
    <title>我的页面</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>这是使用记事本创建的页面。</p>
</body>
</html>

<!-- 保存为 index.html，然后用浏览器打开 -->
```

### 1.3 HTML 基本结构

## HTML 基本结构

### HTML 文档声明

`<!DOCTYPE html>` 声明必须是 HTML 文档的第一行，它告诉浏览器这是 HTML5 文档。

### HTML 根元素

`<html>` 元素是所有其他元素的容器。

### head 部分

`<head>` 包含文档的元数据：
- `<title>` - 页面标题（显示在浏览器标签）
- `<meta>` - 元信息（字符集、描述、关键词）
- `<link>` - 外部资源（CSS 样式表）
- `<style>` - 内部样式
- `<script>` - JavaScript 代码

### body 部分

`<body>` 包含页面的可见内容：
- 标题、段落、图片
- 链接、列表、表格
- 视频、音频等多媒体

### 完整结构示例

一个标准的 HTML5 文档包含以下元素。

#### 代码示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- 字符编码声明 -->
    <meta charset="UTF-8">
    
    <!-- 移动端适配 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- 页面描述（SEO） -->
    <meta name="description" content="这是一个示例网页">
    <meta name="keywords" content="HTML, 教程, Web开发">
    <meta name="author" content="你的名字">
    
    <!-- 页面标题 -->
    <title>页面标题 - 显示在浏览器标签</title>
    
    <!-- 外部CSS -->
    <link rel="stylesheet" href="styles.css">
    
    <!-- 内部CSS -->
    <style>
        body {
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <!-- 页眉 -->
    <header>
        <h1>网站标题</h1>
        <nav>
            <a href="#home">首页</a>
            <a href="#about">关于</a>
        </nav>
    </header>
    
    <!-- 主要内容 -->
    <main>
        <h2>欢迎</h2>
        <p>这是页面的主要内容。</p>
    </main>
    
    <!-- 页脚 -->
    <footer>
        <p>&copy; 2024 版权所有</p>
    </footer>
    
    <!-- JavaScript -->
    <script src="script.js"></script>
</body>
</html>
```

### 1.4 HTML 元素

## HTML 元素

### 什么是 HTML 元素？

HTML 元素由开始标签、内容和结束标签组成：
- **开始标签**：`<tagname>`
- **内容**：元素的内容
- **结束标签**：`</tagname>`

### 元素语法

**标准元素**：
```html
<p>这是一个段落</p>
```

**自闭合元素**（无内容）：
```html
<br>
<img src="image.jpg">
<input type="text">
```

### 嵌套元素

HTML 元素可以嵌套（元素包含元素）：

```html
<div>
    <h1>标题</h1>
    <p>段落内容</p>
</div>
```

**注意**：确保正确嵌套和关闭标签！

### 空元素

有些元素没有内容，称为空元素：
- `<br>` - 换行
- `<hr>` - 水平线
- `<img>` - 图片
- `<input>` - 输入框
- `<meta>` - 元信息
- `<link>` - 链接资源

### 块级元素 vs 行内元素

**块级元素**（占满整行）：
- `<div>`, `<p>`, `<h1>-<h6>`
- `<ul>`, `<ol>`, `<li>`
- `<header>`, `<footer>`, `<section>`

**行内元素**（只占必要宽度）：
- `<span>`, `<a>`, `<strong>`, `<em>`
- `<img>`, `<input>`, `<button>`

#### 代码示例

```html
<!DOCTYPE html>
<html>
<head>
    <title>HTML 元素示例</title>
</head>
<body>
    <!-- 1. 标准元素（有开始和结束标签） -->
    <h1>这是标题</h1>
    <p>这是段落</p>
    
    <!-- 2. 嵌套元素 -->
    <div>
        <h2>嵌套示例</h2>
        <p>这个段落在 <strong>div</strong> 里面</p>
        <ul>
            <li>列表项 1</li>
            <li>列表项 2</li>
        </ul>
    </div>
    
    <!-- 3. 空元素（自闭合） -->
    <p>第一行<br>第二行</p>
    <hr>
    <img src="logo.png" alt="Logo">
    
    <!-- 4. 块级元素 -->
    <div>这是一个 div（块级）</div>
    <div>另一个 div（独占一行）</div>
    
    <!-- 5. 行内元素 -->
    <p>
        这是<span>行内元素</span>和
        <strong>粗体文本</strong>在同一行。
    </p>
    
    <!-- ❌ 错误示例：标签未正确关闭 -->
    <!-- <p>段落开始<strong>粗体</p></strong> -->
    
    <!-- ✅ 正确示例：标签正确嵌套 -->
    <p>段落开始<strong>粗体</strong></p>
</body>
</html>
```

### 1.5 HTML 属性

## HTML 属性

### 什么是属性？

HTML 属性为元素提供附加信息，总是在开始标签中定义。

### 属性语法

- 属性以 **名称/值** 对的形式出现：`name="value"`
- 属性值应该用引号括起来（单引号或双引号）
- 多个属性用空格分隔

### 常用属性

**全局属性**（所有元素都可用）：
- `id` - 元素的唯一标识符
- `class` - 元素的类名（用于CSS样式）
- `style` - 内联样式
- `title` - 额外信息（鼠标悬停显示）
- `lang` - 语言
- `hidden` - 隐藏元素

**特定属性**：
- `href` - 链接地址（`<a>`标签）
- `src` - 图片/脚本来源（`<img>`, `<script>`）
- `alt` - 替代文本（`<img>`标签）
- `width`, `height` - 宽度和高度
- `target` - 链接打开方式

### 属性值引号

建议始终使用引号：
- ✅ `<a href="https://example.com">`
- ✅ `<a href='https://example.com'>`
- ❌ `<a href=https://example.com>`（不推荐）

如果属性值包含空格，必须使用引号：
- ✅ `<p title="关于 HTML">`
- ❌ `<p title=关于 HTML>`（错误）

### 单引号 vs 双引号

通常使用双引号，但如果属性值包含双引号，可以使用单引号：
- `<p title='她说"你好"'>`
- 或使用 HTML 实体：`<p title="她说&quot;你好&quot;">`

#### 代码示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>HTML 属性示例</title>
    <style>
        .highlight {
            background-color: yellow;
            padding: 5px;
        }
        .blue {
            color: blue;
        }
    </style>
</head>
<body>
    <!-- 1. id 属性（唯一标识） -->
    <h1 id="main-title">页面标题</h1>
    <p id="intro">介绍段落</p>
    
    <!-- 2. class 属性（CSS 类名） -->
    <p class="highlight">高亮段落</p>
    <p class="blue">蓝色文本</p>
    <p class="highlight blue">多个类名</p>
    
    <!-- 3. style 属性（内联样式） -->
    <p style="color: red; font-size: 20px;">红色大字</p>
    
    <!-- 4. title 属性（鼠标悬停提示） -->
    <p title="这是一个提示信息">鼠标移到这里看提示</p>
    <abbr title="超文本标记语言">HTML</abbr>
    
    <!-- 5. href 属性（链接地址） -->
    <a href="https://www.example.com">外部链接</a>
    <a href="page2.html">内部链接</a>
    <a href="#section1">锚点链接</a>
    
    <!-- 6. src 和 alt 属性（图片） -->
    <img src="logo.png" alt="网站Logo" width="200" height="100">
    
    <!-- 7. target 属性（链接打开方式） -->
    <a href="https://www.example.com" target="_blank">新窗口打开</a>
    <a href="page2.html" target="_self">当前窗口打开</a>
    
    <!-- 8. lang 属性（语言） -->
    <p lang="en">This is English</p>
    <p lang="zh-CN">这是中文</p>
    
    <!-- 9. hidden 属性（隐藏元素） -->
    <p hidden>这段文字被隐藏了</p>
    
    <!-- 10. data-* 自定义属性 -->
    <div data-user-id="12345" data-role="admin">
        用户信息
    </div>
    
    <!-- 11. 布尔属性 -->
    <input type="text" disabled>
    <input type="checkbox" checked>
    <script src="app.js" defer></script>
</body>
</html>
```

---

## 第二章：HTML 文本格式化

### 2.1 HTML 标题

## HTML 标题

### 标题标签

HTML 提供 6 个级别的标题，从 `<h1>` 到 `<h6>`：
- `<h1>` 定义最重要的标题
- `<h6>` 定义最不重要的标题

### 标题的重要性

- **SEO**：搜索引擎使用标题索引网页结构
- **辅助功能**：屏幕阅读器使用标题帮助视障用户导航
- **视觉层次**：标题帮助用户快速浏览页面内容

### 使用建议

1. **每页只用一个 `<h1>`**（主标题）
2. **不要跳过标题级别**（不要从 h1 直接跳到 h3）
3. **不要用标题标签仅为了加大字体**（使用 CSS）
4. **保持标题简短明了**

### 标题和 SEO

搜索引擎重视标题内容，合理使用标题可以提高 SEO：
- 在标题中使用关键词
- 保持标题与内容相关
- 使用清晰的层次结构

#### 代码示例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>HTML 标题示例</title>
</head>
<body>
    <!-- 6 个标题级别 -->
    <h1>一级标题（最大最重要）</h1>
    <h2>二级标题</h2>
    <h3>三级标题</h3>
    <h4>四级标题</h4>
    <h5>五级标题</h5>
    <h6>六级标题（最小）</h6>
    
    <hr>
    
    <!-- 实际页面结构示例 -->
    <h1>网站主标题</h1>
    
    <h2>第一章：介绍</h2>
    <p>章节内容...</p>
    
    <h3>1.1 背景</h3>
    <p>小节内容...</p>
    
    <h3>1.2 目标</h3>
    <p>小节内容...</p>
    
    <h2>第二章：实现</h2>
    <p>章节内容...</p>
    
    <h3>2.1 技术栈</h3>
    <p>小节内容...</p>
    
    <hr>
    
    <!-- ❌ 错误示例：仅为了字体大小使用标题 -->
    <!-- <h1>这不应该用 h1，只是想要大字</h1> -->
    
    <!-- ✅ 正确做法：使用 CSS 控制大小 -->
    <p style="font-size: 24px; font-weight: bold;">
        使用 CSS 控制文本大小
    </p>
</body>
</html>
```

### 2.2 HTML 段落

## HTML 段落

### 段落标签

`<p>` 标签定义段落。浏览器会自动在段落前后添加空白。

### 换行和空格

- **浏览器会忽略多余的空格和换行**
- HTML 代码中的多个空格会被压缩为一个
- 使用 `<br>` 标签进行换行
- 使用 `<hr>` 标签创建水平线

### 预格式化文本

`<pre>` 标签定义预格式化文本，保留空格和换行：

```html
<pre>
  文本格式
    会被保留
      包括空格
</pre>
```

### HTML 空白字符

如果需要添加额外空格，使用：
- `&nbsp;` - 不换行空格
- `&ensp;` - 半角空格
- `&emsp;` - 全角空格

#### 代码示例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>HTML 段落示例</title>
</head>
<body>
    <!-- 1. 基本段落 -->
    <p>这是第一个段落。</p>
    <p>这是第二个段落。</p>
    
    <!-- 2. 浏览器会忽略多余空格和换行 -->
    <p>
        这段文本      包含很多
        空格和
        换行，
        但浏览器会忽略它们。
    </p>
    
    <!-- 3. 使用 br 标签换行 -->
    <p>
        第一行<br>
        第二行<br>
        第三行
    </p>
    
    <!-- 4. 使用 hr 标签创建水平线 -->
    <p>段落1</p>
    <hr>
    <p>段落2</p>
    
    <!-- 5. 预格式化文本 -->
    <pre>
function hello() {
    console.log("保留格式");
    if (true) {
        return "缩进也会保留";
    }
}
    </pre>
    
    <!-- 6. HTML 实体表示空格 -->
    <p>普通空格：单词 单词</p>
    <p>多个空格：单词&nbsp;&nbsp;&nbsp;&nbsp;单词</p>
    <p>半角空格：单词&ensp;单词</p>
    <p>全角空格：单词&emsp;单词</p>
    
    <!-- 7. 长段落示例 -->
    <p>
        HTML（超文本标记语言）是用于创建网页的标准标记语言。
        它不是编程语言，而是一种标记语言，用于描述网页的结构。
        HTML 使用一系列标签来标记不同类型的内容，
        浏览器根据这些标签来显示页面。
    </p>
    
    <!-- 8. 段落中的行内元素 -->
    <p>
        段落可以包含<strong>粗体</strong>、
        <em>斜体</em>、
        <a href="#">链接</a>等行内元素。
    </p>
</body>
</html>
```

### 2.3 HTML 文本格式化

## HTML 文本格式化

### 文本格式化标签

HTML 提供了多种格式化文本的标签：

**强调标签**：
- `<strong>` - 重要文本（粗体，强语义）
- `<b>` - 粗体文本（仅样式）
- `<em>` - 强调文本（斜体，强语义）
- `<i>` - 斜体文本（仅样式）

**其他格式化**：
- `<mark>` - 高亮文本
- `<small>` - 小号文本
- `<del>` - 删除线
- `<ins>` - 下划线（插入文本）
- `<sub>` - 下标文本
- `<sup>` - 上标文本

### 语义化 vs 样式化

**语义化标签**（推荐）：
- `<strong>` - 表示重要性
- `<em>` - 表示强调

**样式化标签**：
- `<b>` - 仅视觉加粗
- `<i>` - 仅视觉斜体

推荐使用语义化标签，有助于 SEO 和可访问性。

### 计算机输出标签

- `<code>` - 代码片段
- `<kbd>` - 键盘输入
- `<samp>` - 计算机输出
- `<var>` - 变量
- `<pre>` - 预格式化文本

#### 代码示例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>HTML 文本格式化</title>
</head>
<body>
    <h2>文本格式化示例</h2>
    
    <!-- 1. 粗体和强调 -->
    <p><strong>重要文本（strong）</strong></p>
    <p><b>粗体文本（b）</b></p>
    
    <!-- 2. 斜体和强调 -->
    <p><em>强调文本（em）</em></p>
    <p><i>斜体文本（i）</i></p>
    
    <!-- 3. 标记文本 -->
    <p>这是<mark>高亮文本</mark>示例</p>
    
    <!-- 4. 小号文本 -->
    <p>普通文本 <small>小号文本</small></p>
    
    <!-- 5. 删除和插入 -->
    <p>价格：<del>¥100</del> <ins>¥80</ins></p>
    
    <!-- 6. 下标和上标 -->
    <p>H<sub>2</sub>O（水的化学式）</p>
    <p>x<sup>2</sup> + y<sup>2</sup> = z<sup>2</sup></p>
    
    <hr>
    
    <!-- 7. 计算机相关标签 -->
    <h3>计算机输出</h3>
    
    <p>代码：<code>console.log("Hello");</code></p>
    
    <p>键盘输入：按 <kbd>Ctrl</kbd> + <kbd>C</kbd> 复制</p>
    
    <p>程序输出：<samp>File not found</samp></p>
    
    <p>变量：<var>x</var> = 10</p>
    
    <pre><code>
function greet(name) {
    return "Hello, " + name;
}
    </code></pre>
    
    <hr>
    
    <!-- 8. 组合使用 -->
    <p>
        这是一个<strong>重要</strong>的
        <em>强调</em>内容，
        包含<mark>高亮</mark>和
        <code>代码片段</code>。
    </p>
    
    <!-- 9. 引用 -->
    <p>
        <q>这是短引用</q> - 会自动添加引号
    </p>
    
    <blockquote>
        这是长引用（块引用）。
        通常会有缩进。
    </blockquote>
    
    <!-- 10. 缩写 -->
    <p>
        <abbr title="超文本标记语言">HTML</abbr> 
        是网页的标准标记语言。
    </p>
    
    <!-- 11. 地址 -->
    <address>
        作者：张三<br>
        邮箱：zhangsan@example.com<br>
        地址：北京市朝阳区
    </address>
</body>
</html>
```

---

## 第三章：链接和图片

### 3.1 HTML 链接

## HTML 链接

### 链接标签

`<a>` 标签定义超链接，用于从一个页面链接到另一个页面。

### href 属性

最重要的属性是 `href`，指示链接的目标地址：

```html
<a href="https://www.example.com">访问示例网站</a>
```

### 链接类型

**1. 外部链接**（完整URL）：
```html
<a href="https://www.google.com">Google</a>
```

**2. 内部链接**（相对路径）：
```html
<a href="about.html">关于我们</a>
<a href="/products/item.html">产品</a>
```

**3. 锚点链接**（页面内跳转）：
```html
<a href="#section1">跳转到第一节</a>
<!-- 目标位置 -->
<h2 id="section1">第一节</h2>
```

**4. 邮件链接**：
```html
<a href="mailto:someone@example.com">发送邮件</a>
```

**5. 电话链接**：
```html
<a href="tel:+8613800138000">拨打电话</a>
```

### target 属性

指定链接打开方式：
- `_blank` - 新窗口或标签页
- `_self` - 当前窗口（默认）
- `_parent` - 父框架
- `_top` - 顶层框架

### 链接样式

默认情况下：
- 未访问链接：蓝色带下划线
- 已访问链接：紫色带下划线
- 活动链接：红色带下划线

可以使用 CSS 自定义链接样式。

#### 代码示例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>HTML 链接示例</title>
    <style>
        /* 自定义链接样式 */
        a {
            text-decoration: none;
            padding: 5px 10px;
        }
        a:link { color: #2196F3; }
        a:visited { color: #9C27B0; }
        a:hover { 
            color: #FF5722;
            background-color: #FFF3E0;
        }
        a:active { color: #F44336; }
        
        .button-link {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h2>HTML 链接示例</h2>
    
    <!-- 1. 外部链接 -->
    <h3>外部链接</h3>
    <p><a href="https://www.google.com">访问 Google</a></p>
    <p><a href="https://www.baidu.com" target="_blank">
        在新窗口打开百度
    </a></p>
    
    <!-- 2. 内部链接 -->
    <h3>内部链接</h3>
    <p><a href="about.html">关于我们</a></p>
    <p><a href="contact.html">联系我们</a></p>
    <p><a href="../index.html">返回首页</a></p>
    
    <!-- 3. 锚点链接 -->
    <h3>页面内导航</h3>
    <nav>
        <a href="#section1">第一节</a> |
        <a href="#section2">第二节</a> |
        <a href="#section3">第三节</a>
    </nav>
    
    <h4 id="section1">第一节</h4>
    <p>这是第一节的内容...</p>
    <p><a href="#top">返回顶部</a></p>
    
    <h4 id="section2">第二节</h4>
    <p>这是第二节的内容...</p>
    <p><a href="#top">返回顶部</a></p>
    
    <h4 id="section3">第三节</h4>
    <p>这是第三节的内容...</p>
    <p><a href="#top">返回顶部</a></p>
    
    <!-- 4. 特殊链接 -->
    <h3>特殊链接</h3>
    <p><a href="mailto:info@example.com">发送邮件</a></p>
    <p><a href="tel:+8613800138000">拨打电话</a></p>
    <p><a href="sms:+8613800138000">发送短信</a></p>
    
    <!-- 5. 下载链接 -->
    <p><a href="document.pdf" download>下载 PDF</a></p>
    
    <!-- 6. 图片链接 -->
    <h3>图片链接</h3>
    <a href="https://www.example.com">
        <img src="logo.png" alt="Logo" width="100">
    </a>
    
    <!-- 7. 按钮样式链接 -->
    <h3>按钮样式链接</h3>
    <a href="#" class="button-link">点击这里</a>
    
    <!-- 8. 链接标题 -->
    <h3>带提示的链接</h3>
    <p>
        <a href="https://www.example.com" 
           title="点击访问示例网站">
            示例网站
        </a>
    </p>
    
    <!-- 9. 链接关系 -->
    <p>
        <a href="https://www.example.com" 
           rel="nofollow">
            不追踪链接（SEO）
        </a>
    </p>
</body>
</html>
```

### 3.2 HTML 图片

## HTML 图片

### 图片标签

`<img>` 标签用于在网页中插入图片。注意：`<img>` 是空元素，没有闭合标签。

### 必需属性

**src**：图片来源
```html
<img src="picture.jpg">
```

**alt**：替代文本（图片无法显示时的描述）
```html
<img src="picture.jpg" alt="风景图片">
```

### 可选属性

- `width` - 宽度（像素或百分比）
- `height` - 高度（像素或百分比）
- `title` - 鼠标悬停提示
- `loading` - 加载方式（lazy/eager）

### 图片路径

**绝对路径**：
```html
<img src="https://example.com/images/photo.jpg">
```

**相对路径**：
```html
<img src="images/photo.jpg">
<img src="../images/photo.jpg">
```

### 图片格式

常用格式：
- **JPEG/JPG** - 照片，有损压缩
- **PNG** - 透明背景，无损压缩
- **GIF** - 动画，颜色有限
- **SVG** - 矢量图，可缩放
- **WebP** - 现代格式，体积小

### 响应式图片

使用百分比宽度：
```html
<img src="photo.jpg" style="width:100%; height:auto;">
```

### 图片地图

使用 `<map>` 创建可点击区域：
```html
<img src="map.jpg" usemap="#imagemap">
<map name="imagemap">
  <area shape="rect" coords="0,0,100,100" href="link1.html">
</map>
```

#### 代码示例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>HTML 图片示例</title>
    <style>
        .container {
            max-width: 800px;
            margin: 20px auto;
        }
        .responsive-img {
            width: 100%;
            height: auto;
        }
        .thumbnail {
            width: 150px;
            border: 2px solid #ddd;
            border-radius: 4px;
            padding: 5px;
        }
        .thumbnail:hover {
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>HTML 图片示例</h2>
        
        <!-- 1. 基本图片 -->
        <h3>基本图片</h3>
        <img src="landscape.jpg" 
             alt="美丽的风景" 
             width="400" 
             height="300">
        
        <!-- 2. 带链接的图片 -->
        <h3>可点击图片</h3>
        <a href="https://www.example.com">
            <img src="logo.png" 
                 alt="网站Logo" 
                 width="200">
        </a>
        
        <!-- 3. 响应式图片 -->
        <h3>响应式图片</h3>
        <img src="banner.jpg" 
             alt="横幅" 
             class="responsive-img">
        
        <!-- 4. 缩略图 -->
        <h3>缩略图</h3>
        <img src="photo1.jpg" 
             alt="照片1" 
             class="thumbnail">
        <img src="photo2.jpg" 
             alt="照片2" 
             class="thumbnail">
        <img src="photo3.jpg" 
             alt="照片3" 
             class="thumbnail">
        
        <!-- 5. 浮动图片 -->
        <h3>文字环绕图片</h3>
        <img src="avatar.jpg" 
             alt="头像" 
             width="150" 
             style="float: left; margin: 0 15px 15px 0;">
        <p>
            这是一段文字，会环绕在图片周围。
            这是一段文字，会环绕在图片周围。
            这是一段文字，会环绕在图片周围。
            这是一段文字，会环绕在图片周围。
            这是一段文字，会环绕在图片周围。
        </p>
        <div style="clear: both;"></div>
        
        <!-- 6. 不同格式的图片 -->
        <h3>不同格式</h3>
        <p>JPEG: <img src="photo.jpg" alt="JPEG" width="100"></p>
        <p>PNG: <img src="icon.png" alt="PNG" width="100"></p>
        <p>GIF: <img src="animation.gif" alt="GIF" width="100"></p>
        <p>SVG: <img src="vector.svg" alt="SVG" width="100"></p>
        
        <!-- 7. 图片加载优化 -->
        <h3>懒加载图片</h3>
        <img src="large-image.jpg" 
             alt="大图" 
             loading="lazy" 
             width="400">
        
        <!-- 8. 带标题的图片 -->
        <h3>图片与标题</h3>
        <figure>
            <img src="artwork.jpg" 
                 alt="艺术作品" 
                 width="300">
            <figcaption>图：美丽的艺术作品</figcaption>
        </figure>
        
        <!-- 9. 图片地图（可点击区域） -->
        <h3>图片地图</h3>
        <img src="world-map.jpg" 
             alt="世界地图" 
             usemap="#worldmap" 
             width="400">
        <map name="worldmap">
            <area shape="rect" 
                  coords="0,0,100,100" 
                  href="asia.html" 
                  alt="亚洲">
            <area shape="circle" 
                  coords="200,50,50" 
                  href="europe.html" 
                  alt="欧洲">
        </map>
        
        <!-- 10. picture 元素（响应式图片） -->
        <h3>响应式图片（高级）</h3>
        <picture>
            <source media="(min-width: 800px)" 
                    srcset="large.jpg">
            <source media="(min-width: 400px)" 
                    srcset="medium.jpg">
            <img src="small.jpg" 
                 alt="响应式图片">
        </picture>
        
        <!-- 11. 占位图片 -->
        <h3>占位符</h3>
        <img src="https://via.placeholder.com/300x200" 
             alt="占位图片">
    </div>
</body>
</html>
```

---

## 第四章：列表和表格

### 4.1 HTML 列表

## HTML 列表

### 列表类型

HTML 支持三种列表类型：

**1. 无序列表** (`<ul>`)
- 项目符号列表
- 使用 `<li>` 定义列表项

**2. 有序列表** (`<ol>`)
- 编号列表
- 使用 `<li>` 定义列表项

**3. 描述列表** (`<dl>`)
- 术语和描述
- `<dt>` 定义术语
- `<dd>` 定义描述

### 无序列表样式

可以使用 CSS 改变项目符号：
- `disc` - 实心圆（默认）
- `circle` - 空心圆
- `square` - 实心方块
- `none` - 无标记

### 有序列表类型

可以指定编号类型：
- `type="1"` - 数字（默认）
- `type="A"` - 大写字母
- `type="a"` - 小写字母
- `type="I"` - 大写罗马数字
- `type="i"` - 小写罗马数字

### 嵌套列表

列表可以嵌套，创建多层级列表。

#### 代码示例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>HTML 列表示例</title>
    <style>
        .custom-list {
            list-style-type: square;
            color: #2196F3;
        }
        .no-bullets {
            list-style-type: none;
            padding: 0;
        }
    </style>
</head>
<body>
    <h2>HTML 列表示例</h2>
    
    <!-- 1. 无序列表 -->
    <h3>无序列表</h3>
    <ul>
        <li>苹果</li>
        <li>香蕉</li>
        <li>橙子</li>
    </ul>
    
    <!-- 2. 有序列表 -->
    <h3>有序列表</h3>
    <ol>
        <li>第一步</li>
        <li>第二步</li>
        <li>第三步</li>
    </ol>
    
    <!-- 3. 描述列表 -->
    <h3>描述列表</h3>
    <dl>
        <dt>HTML</dt>
        <dd>超文本标记语言</dd>
        
        <dt>CSS</dt>
        <dd>层叠样式表</dd>
        
        <dt>JavaScript</dt>
        <dd>网页编程语言</dd>
    </dl>
    
    <!-- 4. 嵌套列表 -->
    <h3>嵌套列表</h3>
    <ul>
        <li>水果
            <ul>
                <li>苹果</li>
                <li>香蕉</li>
            </ul>
        </li>
        <li>蔬菜
            <ul>
                <li>胡萝卜</li>
                <li>西红柿</li>
            </ul>
        </li>
    </ul>
    
    <!-- 5. 有序列表类型 -->
    <h3>不同类型的有序列表</h3>
    <ol type="1">
        <li>数字列表</li>
        <li>数字列表</li>
    </ol>
    
    <ol type="A">
        <li>大写字母</li>
        <li>大写字母</li>
    </ol>
    
    <ol type="a">
        <li>小写字母</li>
        <li>小写字母</li>
    </ol>
    
    <ol type="I">
        <li>罗马数字</li>
        <li>罗马数字</li>
    </ol>
    
    <!-- 6. 自定义起始编号 -->
    <h3>自定义起始编号</h3>
    <ol start="5">
        <li>从5开始</li>
        <li>6</li>
        <li>7</li>
    </ol>
    
    <!-- 7. 反向编号 -->
    <h3>反向编号</h3>
    <ol reversed>
        <li>第三</li>
        <li>第二</li>
        <li>第一</li>
    </ol>
    
    <!-- 8. 自定义样式 -->
    <h3>自定义样式</h3>
    <ul class="custom-list">
        <li>方块标记</li>
        <li>蓝色文本</li>
    </ul>
    
    <ul class="no-bullets">
        <li>无标记</li>
        <li>无标记</li>
    </ul>
    
    <!-- 9. 复杂嵌套 -->
    <h3>复杂嵌套列表</h3>
    <ol>
        <li>前端技术
            <ul>
                <li>HTML
                    <ol type="a">
                        <li>标签</li>
                        <li>属性</li>
                    </ol>
                </li>
                <li>CSS
                    <ol type="a">
                        <li>选择器</li>
                        <li>属性</li>
                    </ol>
                </li>
            </ul>
        </li>
        <li>后端技术
            <ul>
                <li>Node.js</li>
                <li>Python</li>
            </ul>
        </li>
    </ol>
    
    <!-- 10. 导航菜单（列表应用） -->
    <h3>导航菜单</h3>
    <nav>
        <ul class="no-bullets">
            <li><a href="#home">首页</a></li>
            <li><a href="#about">关于</a></li>
            <li><a href="#contact">联系</a></li>
        </ul>
    </nav>
</body>
</html>
```

### 4.2 HTML 表格

## HTML 表格

### 表格结构

HTML 表格由 `<table>` 标签定义：
- `<tr>` - 表格行
- `<td>` - 表格单元格（数据）
- `<th>` - 表头单元格

### 基本表格

```html
<table>
  <tr>
    <th>姓名</th>
    <th>年龄</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>25</td>
  </tr>
</table>
```

### 表格边框

使用 CSS 添加边框：
```css
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
```

### 跨行和跨列

- `colspan` - 跨列
- `rowspan` - 跨行

### 表格分组

- `<thead>` - 表头分组
- `<tbody>` - 表体分组
- `<tfoot>` - 表尾分组

### 列属性

- `<col>` - 列属性
- `<colgroup>` - 列组

### 表格标题

`<caption>` 定义表格标题。

#### 代码示例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>HTML 表格示例</title>
    <style>
        /* 表格基本样式 */
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
        }
        
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        
        th {
            background-color: #4CAF50;
            color: white;
        }
        
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        
        tr:hover {
            background-color: #ddd;
        }
        
        /* 特殊表格样式 */
        .striped-table tr:nth-child(odd) {
            background-color: #f9f9f9;
        }
        
        .bordered-table {
            border: 2px solid #2196F3;
        }
    </style>
</head>
<body>
    <h2>HTML 表格示例</h2>
    
    <!-- 1. 基本表格 -->
    <h3>基本表格</h3>
    <table>
        <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>城市</th>
        </tr>
        <tr>
            <td>张三</td>
            <td>25</td>
            <td>北京</td>
        </tr>
        <tr>
            <td>李四</td>
            <td>30</td>
            <td>上海</td>
        </tr>
        <tr>
            <td>王五</td>
            <td>28</td>
            <td>广州</td>
        </tr>
    </table>
    
    <!-- 2. 带标题的表格 -->
    <h3>带标题的表格</h3>
    <table>
        <caption>学生信息表</caption>
        <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>成绩</th>
        </tr>
        <tr>
            <td>001</td>
            <td>张三</td>
            <td>90</td>
        </tr>
        <tr>
            <td>002</td>
            <td>李四</td>
            <td>85</td>
        </tr>
    </table>
    
    <!-- 3. 跨列表格 -->
    <h3>跨列（colspan）</h3>
    <table>
        <tr>
            <th>姓名</th>
            <th colspan="2">电话</th>
        </tr>
        <tr>
            <td>张三</td>
            <td>138****1234</td>
            <td>010-****5678</td>
        </tr>
    </table>
    
    <!-- 4. 跨行表格 -->
    <h3>跨行（rowspan）</h3>
    <table>
        <tr>
            <th>姓名</th>
            <td>张三</td>
        </tr>
        <tr>
            <th rowspan="2">电话</th>
            <td>138****1234</td>
        </tr>
        <tr>
            <td>010-****5678</td>
        </tr>
    </table>
    
    <!-- 5. 表格分组 -->
    <h3>表格分组（thead, tbody, tfoot）</h3>
    <table>
        <thead>
            <tr>
                <th>产品</th>
                <th>数量</th>
                <th>价格</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>苹果</td>
                <td>10</td>
                <td>¥50</td>
            </tr>
            <tr>
                <td>香蕉</td>
                <td>5</td>
                <td>¥25</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="2">总计</th>
                <th>¥75</th>
            </tr>
        </tfoot>
    </table>
    
    <!-- 6. 列样式 -->
    <h3>列样式（colgroup）</h3>
    <table>
        <colgroup>
            <col style="background-color: #FFE5E5;">
            <col style="background-color: #E5F5FF;">
            <col style="background-color: #E5FFE5;">
        </colgroup>
        <tr>
            <th>红色列</th>
            <th>蓝色列</th>
            <th>绿色列</th>
        </tr>
        <tr>
            <td>数据1</td>
            <td>数据2</td>
            <td>数据3</td>
        </tr>
    </table>
    
    <!-- 7. 复杂表格 -->
    <h3>复杂表格</h3>
    <table>
        <caption><strong>2024年销售报表</strong></caption>
        <thead>
            <tr>
                <th rowspan="2">产品</th>
                <th colspan="3">季度销售额</th>
                <th rowspan="2">总计</th>
            </tr>
            <tr>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>产品 A</td>
                <td>¥1000</td>
                <td>¥1200</td>
                <td>¥1100</td>
                <td>¥3300</td>
            </tr>
            <tr>
                <td>产品 B</td>
                <td>¥800</td>
                <td>¥900</td>
                <td>¥1000</td>
                <td>¥2700</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th>合计</th>
                <th>¥1800</th>
                <th>¥2100</th>
                <th>¥2100</th>
                <th>¥6000</th>
            </tr>
        </tfoot>
    </table>
    
    <!-- 8. 响应式表格 -->
    <h3>响应式表格</h3>
    <div style="overflow-x: auto;">
        <table>
            <tr>
                <th>列1</th>
                <th>列2</th>
                <th>列3</th>
                <th>列4</th>
                <th>列5</th>
                <th>列6</th>
            </tr>
            <tr>
                <td>数据</td>
                <td>数据</td>
                <td>数据</td>
                <td>数据</td>
                <td>数据</td>
                <td>数据</td>
            </tr>
        </table>
    </div>
</body>
</html>
```

---

## 学习资源

- [MDN Web 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
- [W3C HTML 规范](https://www.w3.org/TR/html/)
- [HTML Living Standard](https://html.spec.whatwg.org/)
- [Can I Use](https://caniuse.com/)

## 练习项目

### 初级项目

1. **个人简历页面**
   - 难度：初级
   - 描述：创建一个包含个人信息、技能和联系方式的简历页面

2. **博客文章页面**
   - 难度：初级
   - 描述：制作包含标题、段落、图片和列表的博客文章页面

### 中级项目

3. **产品目录页面**
   - 难度：中级
   - 描述：使用表格和图片创建产品目录展示页面