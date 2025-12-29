// HTML 完整教程 - 基于最新的 HTML5 标准和最佳实践
export const htmlTutorial = {
  id: 'html',
  name: 'HTML 完整教程',
  version: 'HTML5',
  lastUpdated: '2024-12',
  level: '初级',
  estimatedTime: '20小时',
  
  // 课程大纲
  chapters: [
    {
      id: 'intro',
      title: '第一章：HTML 入门',
      description: '了解 HTML 的基本概念和发展历史',
      duration: '2小时',
      sections: [
        {
          id: 'what-is-html',
          title: '1.1 什么是 HTML',
          content: `
## 什么是 HTML

HTML (HyperText Markup Language，超文本标记语言) 是构建网页的标准标记语言。它不是一种编程语言，而是一种**标记语言**，用于描述网页的结构和内容。

### HTML 的核心概念

- **超文本 (HyperText)**: 指可以链接到其他文档的文本
- **标记 (Markup)**: 使用标签来标记不同类型的内容
- **语言 (Language)**: 有自己的语法规则和结构

### HTML 的作用

1. **定义网页结构**: 通过标签组织内容的层次关系
2. **描述内容语义**: 说明内容的含义和用途
3. **嵌入多媒体**: 插入图片、视频、音频等资源
4. **创建超链接**: 连接不同的网页和资源
5. **构建表单**: 收集用户输入的数据

### HTML 发展历史

- **HTML 1.0 (1991)**: 最初版本，仅包含18个标签
- **HTML 2.0 (1995)**: 第一个官方标准
- **HTML 3.2 (1997)**: 引入表格、小程序等特性
- **HTML 4.01 (1999)**: 加强样式表支持,分离内容与样式
- **XHTML 1.0 (2000)**: 更严格的 XML 版本
- **HTML5 (2014)**: 现代 Web 标准，增加语义化标签、多媒体支持、API 等

### HTML5 的重要特性

✅ **语义化标签**: header, nav, article, section, footer 等
✅ **多媒体支持**: video, audio 原生支持
✅ **图形绘制**: Canvas 和 SVG
✅ **本地存储**: localStorage, sessionStorage
✅ **地理定位**: Geolocation API
✅ **拖放功能**: Drag and Drop API
✅ **Web Workers**: 后台线程支持
✅ **WebSocket**: 双向通信协议
          `,
          code: `<!-- HTML5 文档基本结构 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一个 HTML 页面</title>
</head>
<body>
    <h1>欢迎来到 HTML 世界</h1>
    <p>这是我的第一个网页!</p>
</body>
</html>`
        },
        {
          id: 'html-structure',
          title: '1.2 HTML 文档结构',
          content: `
## HTML 文档结构

一个标准的 HTML5 文档包含以下主要部分：

### 1. 文档类型声明 (DOCTYPE)

\`<!DOCTYPE html>\` 告诉浏览器这是一个 HTML5 文档。必须位于文档的第一行。

### 2. HTML 根元素

\`<html>\` 是所有其他元素的容器，\`lang\` 属性声明文档的主要语言。

### 3. 头部 (Head)

包含文档的元数据（metadata），不会直接显示在页面上：

- **<meta>**: 定义元数据
- **<title>**: 页面标题（显示在浏览器标签页）
- **<link>**: 链接外部资源（如 CSS）
- **<style>**: 内部样式表
- **<script>**: JavaScript 代码或链接

### 4. 主体 (Body)

包含页面的所有可见内容。

### 重要的 Meta 标签

**字符编码**
\`<meta charset="UTF-8">\` - 支持所有语言字符

**视口设置**（移动端适配）
\`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`

**SEO 优化**
- \`<meta name="description" content="页面描述">\`
- \`<meta name="keywords" content="关键词1,关键词2">\`
- \`<meta name="author" content="作者名称">\`
          `,
          code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- 字符编码 -->
    <meta charset="UTF-8">
    
    <!-- 视口设置（移动端适配） -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO 优化 -->
    <meta name="description" content="这是一个 HTML 教程页面">
    <meta name="keywords" content="HTML, HTML5, Web开发">
    <meta name="author" content="AI追梦者">
    
    <!-- 页面标题 -->
    <title>完整的 HTML 文档结构</title>
    
    <!-- 链接外部 CSS -->
    <link rel="stylesheet" href="style.css">
    
    <!-- 网站图标 -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
    <h1>这是页面主体内容</h1>
    <p>这里的内容会显示在浏览器窗口中。</p>
</body>
</html>`
        }
      ]
    },
    
    {
      id: 'basic-tags',
      title: '第二章：基础标签',
      description: '学习 HTML 的常用标签',
      duration: '4小时',
      sections: [
        {
          id: 'text-tags',
          title: '2.1 文本标签',
          content: `
## 文本标签

### 标题标签 (h1-h6)

HTML 提供了 6 级标题，\`<h1>\` 最重要，\`<h6>\` 最不重要。

**最佳实践：**
- 每个页面只使用一个 \`<h1>\`
- 不要跳级使用标题
- 标题用于结构，不要仅为样式而使用

### 段落标签 (p)

\`<p>\` 定义段落，浏览器会自动在段落前后添加空白。

### 文本格式化标签

**语义化标签**（推荐使用）:
- \`<strong>\` - 重要文本（默认加粗）
- \`<em>\` - 强调文本（默认斜体）
- \`<mark>\` - 标记/高亮文本
- \`<small>\` - 较小文本
- \`<del>\` - 删除文本
- \`<ins>\` - 插入文本
- \`<sub>\` - 下标文本
- \`<sup>\` - 上标文本

**样式标签**（不推荐，应使用 CSS）:
- \`<b>\` - 粗体
- \`<i>\` - 斜体
- \`<u>\` - 下划线

### 换行和分隔

- \`<br>\` - 换行（单标签）
- \`<hr>\` - 水平分隔线（单标签）

### 预格式化文本

\`<pre>\` - 保留空格和换行，常用于显示代码
          `,
          code: `<!-- 标题示例 -->
<h1>一级标题 - 页面主标题</h1>
<h2>二级标题 - 章节标题</h2>
<h3>三级标题 - 小节标题</h3>

<!-- 段落和文本格式化 -->
<p>这是一个普通段落。</p>
<p>这是<strong>重要文本</strong>和<em>强调文本</em>。</p>
<p>价格：<del>¥100</del> <ins>¥80</ins></p>
<p>H<sub>2</sub>O 和 x<sup>2</sup></p>

<!-- 标记文本 -->
<p>请注意<mark>高亮显示</mark>的部分。</p>

<!-- 预格式化文本 -->
<pre>
function hello() {
    console.log("保留缩进和换行");
}
</pre>

<!-- 换行和分隔线 -->
<p>第一行<br>第二行</p>
<hr>`
        },
        {
          id: 'link-tags',
          title: '2.2 链接标签',
          content: `
## 链接标签

### 基本链接 (a)

\`<a href="URL">链接文本</a>\`

### 链接属性

**href** - 链接目标地址
- 绝对路径: \`https://example.com\`
- 相对路径: \`./page.html\` 或 \`../index.html\`
- 锚点: \`#section-id\`
- 邮件: \`mailto:email@example.com\`
- 电话: \`tel:+8612345678\`

**target** - 打开方式
- \`_self\` - 当前窗口（默认）
- \`_blank\` - 新窗口/标签页
- \`_parent\` - 父框架
- \`_top\` - 顶层框架

**rel** - 链接关系
- \`nofollow\` - 不传递权重（SEO）
- \`noopener\` - 安全性（配合 target="_blank"）
- \`noreferrer\` - 不发送来源信息

**download** - 下载文件而非打开

### 最佳实践

1. 使用有意义的链接文本（避免"点击这里"）
2. 外部链接使用 \`rel="noopener noreferrer"\`
3. 提供链接描述（无障碍访问）
          `,
          code: `<!-- 基本链接 -->
<a href="https://example.com">访问示例网站</a>

<!-- 新窗口打开（安全做法） -->
<a href="https://example.com" 
   target="_blank" 
   rel="noopener noreferrer">
    在新标签页打开
</a>

<!-- 相对路径 -->
<a href="./about.html">关于我们</a>
<a href="../index.html">返回首页</a>

<!-- 锚点链接 -->
<a href="#section1">跳转到第一节</a>

<!-- 特殊链接 -->
<a href="mailto:support@example.com">发送邮件</a>
<a href="tel:+8612345678">拨打电话</a>

<!-- 下载链接 -->
<a href="document.pdf" download="我的文档.pdf">下载 PDF</a>

<!-- 图片链接 -->
<a href="https://example.com">
    <img src="logo.png" alt="网站Logo">
</a>`
        },
        {
          id: 'image-tags',
          title: '2.3 图片标签',
          content: `
## 图片标签

### 基本用法

\`<img src="图片路径" alt="替代文本">\`

### 必需属性

**src** - 图片源地址
**alt** - 替代文本（无障碍访问和 SEO 必需）

### 可选属性

**width / height** - 尺寸（推荐设置以避免布局抖动）
**loading** - 加载方式
- \`lazy\` - 懒加载（滚动到可见区域再加载）
- \`eager\` - 立即加载（默认）

**title** - 鼠标悬停提示
**srcset** - 响应式图片
**sizes** - 不同视口的图片尺寸

### 图片格式选择

- **JPEG/JPG** - 照片，有损压缩
- **PNG** - 透明背景，无损压缩
- **WebP** - 现代格式，体积更小
- **SVG** - 矢量图，可无限缩放
- **GIF** - 简单动画

### 响应式图片

使用 \`<picture>\` 元素提供多种图片源。
          `,
          code: `<!-- 基本图片 -->
<img src="photo.jpg" alt="美丽的风景照片">

<!-- 指定尺寸 -->
<img src="logo.png" 
     alt="公司Logo" 
     width="200" 
     height="100">

<!-- 懒加载 -->
<img src="large-image.jpg" 
     alt="大图片" 
     loading="lazy">

<!-- 响应式图片 -->
<img src="image-800.jpg" 
     alt="响应式图片"
     srcset="image-400.jpg 400w,
             image-800.jpg 800w,
             image-1200.jpg 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1024px) 800px,
            1200px">

<!-- picture 元素（更灵活的响应式方案） -->
<picture>
    <!-- WebP 格式（现代浏览器） -->
    <source srcset="image.webp" type="image/webp">
    
    <!-- JPEG 后备 -->
    <img src="image.jpg" alt="图片描述">
</picture>

<!-- 带链接的图片 -->
<a href="full-size.jpg">
    <img src="thumbnail.jpg" alt="点击查看大图">
</a>`
        },
        {
          id: 'list-tags',
          title: '2.4 列表标签',
          content: `
## 列表标签

### 无序列表 (ul)

用于没有特定顺序的项目列表。

### 有序列表 (ol)

用于有序号的项目列表。

**type 属性：**
- \`1\` - 数字（默认）
- \`A\` - 大写字母
- \`a\` - 小写字母
- \`I\` - 大写罗马数字
- \`i\` - 小写罗马数字

**start 属性：** 起始编号

### 定义列表 (dl)

用于术语和定义的列表。

### 嵌套列表

列表可以相互嵌套。
          `,
          code: `<!-- 无序列表 -->
<ul>
    <li>苹果</li>
    <li>香蕉</li>
    <li>橙子</li>
</ul>

<!-- 有序列表 -->
<ol>
    <li>打开编辑器</li>
    <li>编写代码</li>
    <li>保存文件</li>
</ol>

<!-- 自定义编号类型 -->
<ol type="A">
    <li>第一项</li>
    <li>第二项</li>
</ol>

<ol type="I" start="5">
    <li>从第五项开始</li>
    <li>第六项</li>
</ol>

<!-- 定义列表 -->
<dl>
    <dt>HTML</dt>
    <dd>超文本标记语言</dd>
    
    <dt>CSS</dt>
    <dd>层叠样式表</dd>
    
    <dt>JavaScript</dt>
    <dd>网页编程语言</dd>
</dl>

<!-- 嵌套列表 -->
<ul>
    <li>前端技术
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ul>
    </li>
    <li>后端技术
        <ul>
            <li>Python</li>
            <li>Java</li>
            <li>Node.js</li>
        </ul>
    </li>
</ul>`
        }
      ]
    },
    
    {
      id: 'semantic-html',
      title: '第三章：语义化 HTML',
      description: '掌握 HTML5 语义化标签',
      duration: '3小时',
      sections: [
        {
          id: 'semantic-structure',
          title: '3.1 页面结构标签',
          content: `
## 语义化页面结构

HTML5 引入了新的语义化标签，让页面结构更清晰、更利于 SEO 和无障碍访问。

### 主要结构标签

**<header>** - 页头
- 包含导航、Logo、标题等
- 可在多个地方使用（页面、article、section）

**<nav>** - 导航
- 主导航链接区域
- 一个页面可以有多个 nav

**<main>** - 主内容
- 页面的主要内容区域
- 一个页面只能有一个 main，不能嵌套

**<article>** - 独立内容
- 可独立分发或复用的内容
- 如：博客文章、新闻、评论

**<section>** - 内容分组
- 按主题分组的内容
- 通常包含标题

**<aside>** - 侧边栏
- 与主内容相关但可独立存在
- 如：侧边栏、广告、相关链接

**<footer>** - 页脚
- 版权信息、联系方式、相关链接等
- 可用于页面、article、section

### 为什么要使用语义化标签？

✅ **提升 SEO**: 搜索引擎更好地理解页面结构
✅ **增强无障碍性**: 屏幕阅读器更容易导航
✅ **提高代码可读性**: 开发者更容易理解结构
✅ **便于维护**: 清晰的结构易于修改
          `,
          code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>语义化页面结构</title>
</head>
<body>
    <!-- 页面头部 -->
    <header>
        <h1>我的网站</h1>
        <nav>
            <ul>
                <li><a href="#home">首页</a></li>
                <li><a href="#about">关于</a></li>
                <li><a href="#contact">联系</a></li>
            </ul>
        </nav>
    </header>

    <!-- 主要内容 -->
    <main>
        <!-- 文章 -->
        <article>
            <header>
                <h2>文章标题</h2>
                <p>发布于 2024年12月</p>
            </header>
            
            <section>
                <h3>第一部分</h3>
                <p>内容...</p>
            </section>
            
            <section>
                <h3>第二部分</h3>
                <p>内容...</p>
            </section>
            
            <footer>
                <p>作者：张三</p>
            </footer>
        </article>
    </main>

    <!-- 侧边栏 -->
    <aside>
        <h3>相关文章</h3>
        <ul>
            <li><a href="#">文章1</a></li>
            <li><a href="#">文章2</a></li>
        </ul>
    </aside>

    <!-- 页面底部 -->
    <footer>
        <p>&copy; 2024 我的网站. 保留所有权利。</p>
    </footer>
</body>
</html>`
        }
      ]
    },
    
    {
      id: 'tables-forms',
      title: '第四章：表格和表单',
      description: '学习创建表格和表单',
      duration: '4小时',
      sections: [
        {
          id: 'tables',
          title: '4.1 表格',
          content: `
## HTML 表格

### 基本表格结构

- **<table>** - 表格容器
- **<tr>** - 表格行 (table row)
- **<td>** - 单元格 (table data)
- **<th>** - 表头单元格 (table header)

### 表格分组

- **<thead>** - 表格头部
- **<tbody>** - 表格主体
- **<tfoot>** - 表格底部

### 单元格合并

- **colspan** - 横向合并（跨列）
- **rowspan** - 纵向合并（跨行）

### 表格标题

- **<caption>** - 表格标题
          `,
          code: `<!-- 基本表格 -->
<table>
    <caption>学生成绩表</caption>
    <thead>
        <tr>
            <th>姓名</th>
            <th>语文</th>
            <th>数学</th>
            <th>英语</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>张三</td>
            <td>90</td>
            <td>85</td>
            <td>88</td>
        </tr>
        <tr>
            <td>李四</td>
            <td>88</td>
            <td>92</td>
            <td>85</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>平均分</td>
            <td>89</td>
            <td>88.5</td>
            <td>86.5</td>
        </tr>
    </tfoot>
</table>

<!-- 单元格合并 -->
<table border="1">
    <tr>
        <th colspan="2">姓名</th>
        <th>年龄</th>
    </tr>
    <tr>
        <td>姓</td>
        <td>名</td>
        <td rowspan="2">25</td>
    </tr>
    <tr>
        <td>张</td>
        <td>三</td>
    </tr>
</table>`
        },
        {
          id: 'forms',
          title: '4.2 表单基础',
          content: `
## HTML 表单

### 表单元素

**<form>** - 表单容器

主要属性：
- **action** - 提交地址
- **method** - 提交方式（GET/POST）
- **enctype** - 编码类型
  - application/x-www-form-urlencoded（默认）
  - multipart/form-data（文件上传必需）
  - text/plain

### 输入控件

**<input>** - 最常用的表单元素

type 属性值：
- **text** - 文本输入
- **password** - 密码输入
- **email** - 邮箱（自动验证）
- **number** - 数字
- **tel** - 电话
- **url** - 网址
- **date** - 日期
- **time** - 时间
- **checkbox** - 复选框
- **radio** - 单选框
- **file** - 文件上传
- **submit** - 提交按钮
- **reset** - 重置按钮
- **button** - 普通按钮

### 其他表单元素

- **<textarea>** - 多行文本
- **<select>** + **<option>** - 下拉列表
- **<button>** - 按钮
- **<label>** - 标签（提升可用性）
          `,
          code: `<!-- 完整表单示例 -->
<form action="/submit" method="POST">
    <!-- 文本输入 -->
    <label for="username">用户名：</label>
    <input type="text" 
           id="username" 
           name="username" 
           required 
           placeholder="请输入用户名">
    <br><br>

    <!-- 密码输入 -->
    <label for="password">密码：</label>
    <input type="password" 
           id="password" 
           name="password" 
           required 
           minlength="6">
    <br><br>

    <!-- 邮箱 -->
    <label for="email">邮箱：</label>
    <input type="email" 
           id="email" 
           name="email" 
           required>
    <br><br>

    <!-- 数字 -->
    <label for="age">年龄：</label>
    <input type="number" 
           id="age" 
           name="age" 
           min="18" 
           max="100">
    <br><br>

    <!-- 单选框 -->
    <label>性别：</label>
    <input type="radio" id="male" name="gender" value="male">
    <label for="male">男</label>
    <input type="radio" id="female" name="gender" value="female">
    <label for="female">女</label>
    <br><br>

    <!-- 复选框 -->
    <label>兴趣爱好：</label>
    <input type="checkbox" id="reading" name="hobby" value="reading">
    <label for="reading">阅读</label>
    <input type="checkbox" id="sports" name="hobby" value="sports">
    <label for="sports">运动</label>
    <input type="checkbox" id="music" name="hobby" value="music">
    <label for="music">音乐</label>
    <br><br>

    <!-- 下拉列表 -->
    <label for="city">城市：</label>
    <select id="city" name="city">
        <option value="">请选择</option>
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
        <option value="guangzhou">广州</option>
    </select>
    <br><br>

    <!-- 多行文本 -->
    <label for="message">留言：</label><br>
    <textarea id="message" 
              name="message" 
              rows="4" 
              cols="50" 
              placeholder="请输入留言"></textarea>
    <br><br>

    <!-- 文件上传 -->
    <label for="avatar">头像：</label>
    <input type="file" 
           id="avatar" 
           name="avatar" 
           accept="image/*">
    <br><br>

    <!-- 提交和重置按钮 -->
    <button type="submit">提交</button>
    <button type="reset">重置</button>
</form>`
        }
      ]
    },
    
    {
      id: 'html5-features',
      title: '第五章：HTML5 新特性',
      description: '探索 HTML5 的强大功能',
      duration: '5小时',
      sections: [
        {
          id: 'multimedia',
          title: '5.1 多媒体支持',
          content: `
## HTML5 多媒体

### 视频 (video)

HTML5 原生支持视频播放，无需插件。

**主要属性：**
- **src** - 视频源
- **controls** - 显示播放控件
- **autoplay** - 自动播放
- **loop** - 循环播放
- **muted** - 静音
- **poster** - 封面图
- **width / height** - 尺寸

**支持的格式：**
- MP4 (推荐，兼容性最好)
- WebM
- Ogg

### 音频 (audio)

类似 video，用于音频播放。

**支持的格式：**
- MP3 (推荐)
- WAV
- Ogg

### 最佳实践

1. 提供多种格式以确保兼容性
2. 使用 <source> 元素提供备选源
3. 提供后备内容
4. 注意版权问题
5. 移动端自动播放受限，需用户交互
          `,
          code: `<!-- 视频示例 -->
<video width="640" 
       height="360" 
       controls 
       poster="thumbnail.jpg">
    <!-- 多种格式保证兼容性 -->
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <source src="video.ogg" type="video/ogg">
    
    <!-- 后备内容 -->
    <p>您的浏览器不支持 HTML5 视频。
       <a href="video.mp4">下载视频</a></p>
</video>

<!-- 音频示例 -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    您的浏览器不支持 HTML5 音频。
</audio>

<!-- 自动播放（需静音，移动端可能仍被阻止） -->
<video autoplay muted loop playsinline>
    <source src="background.mp4" type="video/mp4">
</video>`
        },
        {
          id: 'canvas-svg',
          title: '5.2 Canvas 和 SVG',
          content: `
## 图形绘制

### Canvas

用 JavaScript 动态绘制图形的画布。

**特点：**
- 位图，基于像素
- 适合游戏、动画、图表
- 不支持事件处理（需手动计算）

### SVG

可缩放矢量图形，使用 XML 描述。

**特点：**
- 矢量图，可无限缩放
- 每个元素都是 DOM 节点
- 支持事件处理
- 适合图标、Logo、图表

### 选择建议

- **高分辨率图标** → SVG
- **复杂动画/游戏** → Canvas  
- **交互式图表** → SVG
- **像素处理** → Canvas
          `,
          code: `<!-- Canvas 基础 -->
<canvas id="myCanvas" width="500" height="300" 
        style="border:1px solid #000;">
    您的浏览器不支持 Canvas。
</canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制矩形
ctx.fillStyle = '#FF0000';
ctx.fillRect(50, 50, 200, 100);

// 绘制圆形
ctx.beginPath();
ctx.arc(350, 100, 50, 0, 2 * Math.PI);
ctx.fillStyle = '#0000FF';
ctx.fill();

// 绘制文字
ctx.font = '30px Arial';
ctx.fillStyle = '#000';
ctx.fillText('Hello Canvas!', 150, 250);
</script>

<!-- SVG 示例 -->
<svg width="500" height="300" 
     xmlns="http://www.w3.org/2000/svg">
    <!-- 矩形 -->
    <rect x="50" y="50" width="200" height="100" 
          fill="#FF0000" />
    
    <!-- 圆形 -->
    <circle cx="350" cy="100" r="50" 
            fill="#0000FF" />
    
    <!-- 文字 -->
    <text x="150" y="250" 
          font-family="Arial" 
          font-size="30" 
          fill="#000">
        Hello SVG!
    </text>
</svg>`
        },
        {
          id: 'storage-apis',
          title: '5.3 本地存储',
          content: `
## Web Storage API

HTML5 提供了两种客户端存储方式：

### localStorage

**特点：**
- 持久化存储
- 不会过期
- 容量约 5-10MB
- 同源策略限制

### sessionStorage

**特点：**
- 会话级存储
- 标签页关闭后清除
- 容量约 5-10MB
- 同源策略限制

### Cookie 对比

| 特性 | Cookie | localStorage | sessionStorage |
|------|--------|--------------|----------------|
| 容量 | 4KB | 5-10MB | 5-10MB |
| 过期 | 可设置 | 永久 | 会话结束 |
| 服务器 | 自动发送 | 仅客户端 | 仅客户端 |

### 使用场景

- **localStorage**: 用户设置、离线数据、缓存
- **sessionStorage**: 表单数据、临时状态
- **Cookie**: 身份验证、跟踪
          `,
          code: `<!-- localStorage 示例 -->
<script>
// 存储数据
localStorage.setItem('username', '张三');
localStorage.setItem('theme', 'dark');

// 读取数据
const username = localStorage.getItem('username');
console.log(username); // '张三'

// 删除数据
localStorage.removeItem('theme');

// 清空所有数据
localStorage.clear();

// 存储对象（需 JSON 序列化）
const user = {
    name: '李四',
    age: 25,
    email: 'lisi@example.com'
};
localStorage.setItem('user', JSON.stringify(user));

// 读取对象
const savedUser = JSON.parse(localStorage.getItem('user'));
console.log(savedUser.name); // '李四'

// sessionStorage 用法相同
sessionStorage.setItem('tempData', 'value');
const tempData = sessionStorage.getItem('tempData');

// 监听存储变化
window.addEventListener('storage', (e) => {
    console.log('存储变化:', e.key, e.newValue);
});
</script>`
        }
      ]
    },
    
    {
      id: 'best-practices',
      title: '第六章：最佳实践',
      description: '编写高质量 HTML 代码',
      duration: '2小时',
      sections: [
        {
          id: 'seo-optimization',
          title: '6.1 SEO 优化',
          content: `
## SEO 最佳实践

### 1. 语义化标签

使用正确的语义化标签帮助搜索引擎理解内容。

### 2. 标题层次

- 每页只用一个 <h1>
- 不要跳级使用标题
- 标题要准确描述内容

### 3. Meta 标签

**必需的 meta 标签：**
- title（50-60 字符）
- description（150-160 字符）
- viewport（移动端适配）

### 4. 图片优化

- 使用描述性的 alt 文本
- 文件名有意义
- 压缩图片大小
- 使用现代格式（WebP）

### 5. 链接优化

- 使用描述性锚文本
- 内部链接结构清晰
- 外部链接添加 rel 属性

### 6. 结构化数据

使用 Schema.org 标记增强搜索结果。
          `,
          code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- 字符编码 -->
    <meta charset="UTF-8">
    
    <!-- 视口设置 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- 页面标题（SEO 重要） -->
    <title>HTML 教程 - 学习现代 Web 开发 | AI追梦者</title>
    
    <!-- 页面描述（SEO 重要） -->
    <meta name="description" 
          content="全面的 HTML5 教程，涵盖基础到高级知识，包含实例代码和最佳实践，适合初学者和进阶开发者。">
    
    <!-- 关键词 -->
    <meta name="keywords" 
          content="HTML, HTML5, Web开发, 前端教程, 网页设计">
    
    <!-- 作者 -->
    <meta name="author" content="AI追梦者">
    
    <!-- Open Graph (社交分享) -->
    <meta property="og:title" content="HTML 完整教程">
    <meta property="og:description" content="学习现代 Web 开发">
    <meta property="og:image" content="https://example.com/og-image.jpg">
    <meta property="og:url" content="https://example.com/html-tutorial">
    
    <!-- Canonical URL (避免重复内容) -->
    <link rel="canonical" href="https://example.com/html-tutorial">
    
    <!-- 结构化数据 (Schema.org) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "HTML 完整教程",
      "description": "从入门到精通的 HTML5 教程",
      "provider": {
        "@type": "Organization",
        "name": "AI追梦者"
      }
    }
    </script>
</head>
<body>
    <!-- 使用语义化标签 -->
    <header>
        <h1>HTML 完整教程</h1>
        <nav aria-label="主导航">
            <ul>
                <li><a href="#intro">入门</a></li>
                <li><a href="#basics">基础</a></li>
                <li><a href="#advanced">进阶</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article>
            <h2>什么是 HTML</h2>
            <p>HTML 是构建网页的标准标记语言...</p>
            
            <!-- 图片优化 -->
            <img src="html-structure.webp" 
                 alt="HTML 文档结构示意图" 
                 loading="lazy"
                 width="800" 
                 height="600">
        </article>
    </main>
    
    <footer>
        <p>&copy; 2024 AI追梦者</p>
    </footer>
</body>
</html>`
        },
        {
          id: 'accessibility',
          title: '6.2 无障碍访问',
          content: `
## 无障碍访问（A11y）

### 为什么重要？

- 让更多人能使用你的网站
- 法律要求（某些地区）
- 改善 SEO
- 提升整体用户体验

### 核心原则 (POUR)

1. **Perceivable** - 可感知
2. **Operable** - 可操作
3. **Understandable** - 可理解
4. **Robust** - 健壮性

### 实践建议

#### 1. 语义化 HTML
使用正确的标签而非 div 和 span。

#### 2. 替代文本
所有图片必须有 alt 属性。

#### 3. 键盘导航
确保所有功能都能用键盘访问。

#### 4. ARIA 属性
增强语义，辅助屏幕阅读器。

常用 ARIA 属性：
- **role** - 元素角色
- **aria-label** - 标签
- **aria-labelledby** - 引用标签元素
- **aria-describedby** - 引用描述元素
- **aria-hidden** - 隐藏元素

#### 5. 对比度
文字与背景对比度至少 4.5:1。

#### 6. 表单标签
所有输入框都要有关联的 label。
          `,
          code: `<!-- 无障碍访问最佳实践 -->

<!-- 1. 地标角色 -->
<nav role="navigation" aria-label="主导航">
    <ul>
        <li><a href="#home">首页</a></li>
        <li><a href="#about">关于</a></li>
    </ul>
</nav>

<!-- 2. 跳转链接（方便键盘用户） -->
<a href="#main-content" class="skip-link">
    跳转到主内容
</a>

<!-- 3. 图片替代文本 -->
<!-- 有意义的图片 -->
<img src="product.jpg" alt="红色连衣裙，圆领，中长款">

<!-- 装饰性图片 -->
<img src="decoration.jpg" alt="" role="presentation">

<!-- 4. 表单无障碍 -->
<form>
    <!-- label 关联 input -->
    <label for="email">邮箱地址</label>
    <input type="email" 
           id="email" 
           name="email" 
           required
           aria-required="true"
           aria-describedby="email-hint">
    <span id="email-hint" class="hint">
        我们不会分享您的邮箱
    </span>
    
    <!-- 错误提示 -->
    <input type="text" 
           id="username"
           aria-invalid="true"
           aria-describedby="username-error">
    <span id="username-error" role="alert">
        用户名已存在
    </span>
</form>

<!-- 5. 按钮无障碍 -->
<button type="button" 
        aria-label="关闭对话框"
        aria-pressed="false">
    <span aria-hidden="true">×</span>
</button>

<!-- 6. 可展开内容 -->
<button type="button" 
        aria-expanded="false" 
        aria-controls="details">
    查看详情
</button>
<div id="details" hidden>
    详细内容...
</div>

<!-- 7. 实时更新区域 -->
<div role="status" aria-live="polite">
    加载中...
</div>

<!-- 8. 表格标题和描述 -->
<table>
    <caption>2024年销售数据</caption>
    <thead>
        <tr>
            <th scope="col">月份</th>
            <th scope="col">销售额</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">1月</th>
            <td>¥10,000</td>
        </tr>
    </tbody>
</table>`
        },
        {
          id: 'performance',
          title: '6.3 性能优化',
          content: `
## HTML 性能优化

### 1. 资源加载优化

**预加载**
<link rel="preload"> - 提前加载关键资源

**预连接**  
<link rel="preconnect"> - 提前建立连接

**DNS 预解析**
<link rel="dns-prefetch"> - 提前解析域名

### 2. 图片优化

- 使用 WebP 格式
- 响应式图片（srcset）
- 懒加载（loading="lazy"）
- 指定尺寸避免重排

### 3. 脚本优化

- async - 异步加载，下载完立即执行
- defer - 延迟加载，HTML 解析完再执行
- type="module" - ES6 模块，默认 defer

### 4. 关键渲染路径

1. 将关键 CSS 内联
2. 非关键 CSS 异步加载
3. JavaScript 放在 </body> 前
4. 减少 DOM 深度

### 5. 减少 HTTP 请求

- 合并文件
- 使用 CSS Sprites
- 使用 SVG 图标
- 启用缓存
          `,
          code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>性能优化示例</title>
    
    <!-- 1. 预连接到外部资源 -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://cdn.example.com">
    
    <!-- 2. 预加载关键资源 -->
    <link rel="preload" 
          href="main.css" 
          as="style">
    <link rel="preload" 
          href="logo.webp" 
          as="image" 
          type="image/webp">
    
    <!-- 3. 内联关键 CSS -->
    <style>
        /* 关键样式，内联以加快首屏渲染 */
        body {
            font-family: sans-serif;
            margin: 0;
        }
        .hero { 
            height: 100vh; 
        }
    </style>
    
    <!-- 4. 异步加载非关键 CSS -->
    <link rel="preload" 
          href="styles.css" 
          as="style" 
          onload="this.onload=null;this.rel='stylesheet'">
    <noscript>
        <link rel="stylesheet" href="styles.css">
    </noscript>
</head>
<body>
    <div class="hero">
        <!-- 响应式图片 + 懒加载 -->
        <picture>
            <source srcset="hero-800.webp 800w,
                           hero-1200.webp 1200w,
                           hero-1600.webp 1600w"
                    sizes="100vw"
                    type="image/webp">
            <img src="hero-800.jpg" 
                 alt="首页大图"
                 width="1600" 
                 height="900"
                 loading="lazy">
        </picture>
    </div>
    
    <main>
        <!-- 懒加载图片 -->
        <img src="placeholder.jpg" 
             data-src="real-image.jpg"
             alt="图片描述"
             loading="lazy">
    </main>
    
    <!-- 5. 脚本优化 -->
    <!-- 异步加载第三方脚本 -->
    <script src="analytics.js" async></script>
    
    <!-- 延迟加载非关键脚本 -->
    <script src="app.js" defer></script>
    
    <!-- ES6 模块（默认 defer） -->
    <script type="module" src="main.js"></script>
</body>
</html>`
        }
      ]
    }
  ],
  
  // 学习资源
  resources: [
    {
      type: 'official',
      name: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML'
    },
    {
      type: 'spec',
      name: 'W3C HTML5 规范',
      url: 'https://www.w3.org/TR/html52/'
    },
    {
      type: 'tutorial',
      name: 'W3School HTML 教程',
      url: 'https://www.w3school.com.cn/html/index.asp'
    }
  ],
  
  // 练习项目
  projects: [
    {
      id: 'personal-page',
      name: '个人主页',
      difficulty: '初级',
      description: '创建一个包含个人介绍、技能、项目展示的单页网站'
    },
    {
      id: 'blog-layout',
      name: '博客布局',
      difficulty: '中级',
      description: '使用语义化标签构建一个博客页面结构'
    }
  ]
}

export default htmlTutorial
