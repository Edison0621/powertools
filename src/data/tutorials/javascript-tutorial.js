// JavaScript 完整教程 - 基于最新的 ECMAScript 2024 (ES15) 标准和现代最佳实践
export const javascriptTutorial = {
  id: 'javascript',
  name: 'JavaScript 完整教程',
  version: 'ES2024 (ES15)',
  lastUpdated: '2024-12',
  level: '初级',
  estimatedTime: '30小时',
  
  // 课程大纲
  chapters: [
    {
      id: 'intro',
      title: '第一章：JavaScript 入门',
      description: '了解 JavaScript 的基本概念和发展历史',
      duration: '3小时',
      sections: [
        {
          id: 'what-is-javascript',
          title: '1.1 什么是 JavaScript',
          content: `
## 什么是 JavaScript

JavaScript 是一种轻量级、解释型的编程语言，最初是为网页交互而设计的。现在已成为全栈开发的主流语言。

### JavaScript 的核心概念

- **解释型语言**: 代码逐行执行，无需编译
- **动态类型**: 变量类型在运行时确定
- **基于原型**: 面向对象编程基于原型继承
- **函数式编程**: 支持高阶函数、闭包等特性
- **事件驱动**: 响应用户交互和系统事件

### JavaScript 的作用

1. **网页交互**: 响应用户操作，动态修改页面内容
2. **表单验证**: 客户端数据验证
3. **异步通信**: AJAX、Fetch API 与服务器通信
4. **动画效果**: 创建丰富的视觉效果
5. **服务器端开发**: Node.js 构建后端应用
6. **移动应用**: React Native、Ionic 等框架
7. **桌面应用**: Electron 开发跨平台桌面应用

### JavaScript 发展历史

- **1995**: Brendan Eich 在 Netscape 开发 JavaScript
- **1997**: ECMAScript 1 标准发布
- **1999**: ECMAScript 3，增加正则表达式、try/catch
- **2009**: ECMAScript 5 (ES5)，严格模式、JSON 支持
- **2015**: ECMAScript 6 (ES6/ES2015)，let/const、箭头函数、类、模块
- **2016-2024**: 每年发布新版本，持续演进

### ES2024 (ES15) 的重要特性

✅ **Temporal API**: 全新的日期时间处理
✅ **Array Grouping**: 数组分组方法
✅ **Promise.withResolvers()**: 简化 Promise 创建
✅ **ArrayBuffer 改进**: 可调整大小的缓冲区
✅ **正则表达式增强**: /v 标志和集合操作
✅ **装饰器**: 类和方法装饰器标准化
          `,
          code: `// JavaScript 基本语法示例

// 1. 变量声明 (ES6+)
let name = "JavaScript";
const version = "ES2024";
var oldStyle = "不推荐使用";

// 2. 数据类型
let number = 42;              // 数字
let string = "Hello World";   // 字符串
let boolean = true;           // 布尔值
let array = [1, 2, 3];       // 数组
let object = { key: "value" }; // 对象
let nullValue = null;         // null
let undefinedValue;           // undefined

// 3. 函数
function greet(name) {
    return "Hello, " + name + "!";
}

// 4. 箭头函数 (ES6)
const greetArrow = (name) => \`Hello, \${name}!\`;

// 5. 控制流
if (number > 0) {
    console.log("正数");
} else {
    console.log("非正数");
}

// 6. 循环
for (let i = 0; i < 3; i++) {
    console.log(i);
}

// 7. 模板字符串 (ES6)
console.log(\`名称: \${name}, 版本: \${version}\`);`
        },
        {
          id: 'environment-setup',
          title: '1.2 开发环境配置',
          content: `
## 开发环境配置

### 浏览器控制台

所有现代浏览器都内置了 JavaScript 控制台：

1. **Chrome/Edge**: 按 F12 或 Ctrl+Shift+I，选择 Console 选项卡
2. **Firefox**: 按 F12，选择控制台
3. **Safari**: 开发 → 显示 JavaScript 控制台

### 代码编辑器推荐

- **Visual Studio Code**: 最流行的免费编辑器
- **WebStorm**: JetBrains 出品的专业 IDE
- **Sublime Text**: 轻量级编辑器
- **Atom**: GitHub 开发的编辑器

### Node.js 环境

**安装 Node.js**:
- 访问 [nodejs.org](https://nodejs.org)
- 下载 LTS 版本
- 安装完成后，在终端运行 \`node -v\` 验证

**运行 JavaScript 文件**:
\`\`\`bash
node filename.js
\`\`\`

### 在 HTML 中使用 JavaScript

三种方式引入 JavaScript：

1. **内联脚本**: \`<button onclick="alert('Hello')">\`
2. **内部脚本**: \`<script>alert('Hello');</script>\`
3. **外部文件**: \`<script src="script.js"></script>\`

**推荐使用外部文件**，便于维护和缓存。
          `,
          code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript 示例</title>
</head>
<body>
    <h1 id="title">Hello World</h1>
    <button id="btn">点击我</button>

    <!-- 方式1: 内联事件处理 (不推荐) -->
    <button onclick="alert('内联事件')">内联示例</button>

    <!-- 方式2: 内部脚本 -->
    <script>
        // 获取元素
        const title = document.getElementById('title');
        const btn = document.getElementById('btn');

        // 添加事件监听器
        btn.addEventListener('click', function() {
            title.textContent = 'Hello JavaScript!';
            title.style.color = 'blue';
        });

        console.log('页面加载完成');
    </script>

    <!-- 方式3: 外部脚本 (推荐) -->
    <!-- <script src="app.js"></script> -->
</body>
</html>`
        }
      ]
    },
    {
      id: 'basics',
      title: '第二章：JavaScript 基础',
      description: '掌握 JavaScript 的基本语法和数据类型',
      duration: '5小时',
      sections: [
        {
          id: 'variables',
          title: '2.1 变量和常量',
          content: `
## 变量和常量

### var、let、const 的区别

**var** (ES5及之前):
- 函数作用域
- 可以重复声明
- 存在变量提升
- **不推荐使用**

**let** (ES6+):
- 块级作用域
- 不能重复声明
- 不存在变量提升（TDZ）
- 可以重新赋值

**const** (ES6+):
- 块级作用域
- 不能重复声明
- 不存在变量提升（TDZ）
- **不能重新赋值**（但对象属性可以修改）

### 变量命名规则

✅ **合法命名**:
- 以字母、下划线 \`_\` 或美元符号 \`$\` 开头
- 后续可以包含字母、数字、下划线、美元符号
- 驼峰命名法: \`userName\`, \`getUserInfo\`
- 常量大写: \`MAX_SIZE\`, \`API_URL\`

❌ **非法命名**:
- 不能以数字开头: \`1name\`
- 不能使用关键字: \`let\`, \`class\`, \`function\`
- 不能包含空格或特殊字符

### 作用域

- **全局作用域**: 整个程序可访问
- **函数作用域**: 函数内部可访问
- **块级作用域**: \`{}\` 内部可访问（let/const）
          `,
          code: `// 1. var - 函数作用域，存在变量提升
console.log(varVariable); // undefined (变量提升)
var varVariable = "var 声明";
var varVariable = "可以重复声明"; // 不会报错

// 2. let - 块级作用域
// console.log(letVariable); // ReferenceError: TDZ
let letVariable = "let 声明";
letVariable = "可以重新赋值";
// let letVariable = "不能重复声明"; // SyntaxError

// 3. const - 块级作用域，不可重新赋值
const constVariable = "const 声明";
// constVariable = "不能重新赋值"; // TypeError

// const 对象的属性可以修改
const user = {
    name: "张三",
    age: 25
};
user.age = 26; // ✅ 可以
user.city = "北京"; // ✅ 可以
// user = {}; // ❌ TypeError

// 4. 块级作用域示例
if (true) {
    let blockScoped = "块级作用域";
    const blockConst = "块级常量";
    var functionScoped = "函数作用域";
}
// console.log(blockScoped); // ReferenceError
// console.log(blockConst); // ReferenceError
console.log(functionScoped); // "函数作用域"

// 5. 最佳实践
const API_URL = "https://api.example.com"; // 常量大写
let userName = "用户名"; // 驼峰命名
let _privateVar = "私有变量"; // 下划线前缀
let $jquery = "jQuery对象"; // $ 前缀（约定）`
        },
        {
          id: 'data-types',
          title: '2.2 数据类型',
          content: `
## JavaScript 数据类型

### 原始类型 (Primitive Types)

1. **Number**: 数字（整数和浮点数）
2. **String**: 字符串
3. **Boolean**: 布尔值（true/false）
4. **Undefined**: 未定义
5. **Null**: 空值
6. **Symbol** (ES6): 唯一标识符
7. **BigInt** (ES2020): 大整数

### 引用类型 (Reference Types)

1. **Object**: 对象
2. **Array**: 数组
3. **Function**: 函数
4. **Date**: 日期
5. **RegExp**: 正则表达式
6. **Map/Set** (ES6): 映射和集合

### 类型检测

- \`typeof\`: 检测基本类型
- \`instanceof\`: 检测对象类型
- \`Array.isArray()\`: 检测数组
- \`Object.prototype.toString.call()\`: 精确检测

### 类型转换

**隐式转换**: JavaScript 自动转换
**显式转换**: 手动转换
- \`Number()\`, \`parseInt()\`, \`parseFloat()\`
- \`String()\`, \`toString()\`
- \`Boolean()\`
          `,
          code: `// ========== 原始类型 ==========

// 1. Number
let integer = 42;
let float = 3.14;
let negative = -10;
let infinity = Infinity;
let notANumber = NaN;
console.log(typeof integer); // "number"

// 2. String
let singleQuote = '单引号';
let doubleQuote = "双引号";
let templateString = \`模板字符串 \${integer}\`;
console.log(typeof singleQuote); // "string"

// 3. Boolean
let isTrue = true;
let isFalse = false;
console.log(typeof isTrue); // "boolean"

// 4. Undefined
let undefinedVar;
console.log(typeof undefinedVar); // "undefined"

// 5. Null
let nullVar = null;
console.log(typeof nullVar); // "object" (历史遗留问题)

// 6. Symbol (ES6)
let symbol1 = Symbol('description');
let symbol2 = Symbol('description');
console.log(symbol1 === symbol2); // false (每个Symbol都是唯一的)

// 7. BigInt (ES2020)
let bigInt = 9007199254740991n;
let anotherBigInt = BigInt("9007199254740991");
console.log(typeof bigInt); // "bigint"

// ========== 引用类型 ==========

// 1. Object
let person = {
    name: "张三",
    age: 25,
    sayHi: function() {
        console.log("Hi!");
    }
};

// 2. Array
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "string", true, null, { key: "value" }];
console.log(Array.isArray(numbers)); // true

// 3. Function
function add(a, b) {
    return a + b;
}
console.log(typeof add); // "function"

// ========== 类型检测 ==========
console.log(typeof "Hello"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" ❌
console.log(typeof {}); // "object"
console.log(typeof []); // "object" ❌

// 精确检测
console.log(Object.prototype.toString.call([])); // "[object Array]"
console.log(Object.prototype.toString.call(null)); // "[object Null]"

// ========== 类型转换 ==========

// 转数字
Number("123");      // 123
parseInt("123px");  // 123
parseFloat("3.14"); // 3.14
+"42";             // 42 (一元加号)

// 转字符串
String(123);       // "123"
(123).toString();  // "123"
123 + "";          // "123"

// 转布尔
Boolean(1);        // true
Boolean(0);        // false
Boolean("");       // false
Boolean("hello");  // true
!!value;           // 双重取反`
        },
        {
          id: 'operators',
          title: '2.3 运算符',
          content: `
## JavaScript 运算符

### 算术运算符

- \`+\`: 加法
- \`-\`: 减法
- \`*\`: 乘法
- \`/\`: 除法
- \`%\`: 取模（余数）
- \`**\`: 幂运算 (ES7)
- \`++\`: 自增
- \`--\`: 自减

### 赋值运算符

- \`=\`: 赋值
- \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\`: 复合赋值
- \`**=\`: 幂赋值
- \`??=\`: 空值合并赋值 (ES2021)
- \`||=\`, \`&&=\`: 逻辑赋值 (ES2021)

### 比较运算符

- \`==\`: 相等（会类型转换）
- \`===\`: 严格相等（不会类型转换）**推荐**
- \`!=\`: 不相等
- \`!==\`: 严格不相等 **推荐**
- \`>\`, \`<\`, \`>=\`, \`<=\`: 大于、小于、大于等于、小于等于

### 逻辑运算符

- \`&&\`: 逻辑与
- \`||\`: 逻辑或
- \`!\`: 逻辑非
- \`??\`: 空值合并 (ES2020)

### 其他运算符

- \`? :\`: 三元运算符
- \`?.\`: 可选链 (ES2020)
- \`typeof\`: 类型检测
- \`instanceof\`: 实例检测
- \`in\`: 属性检测
- \`delete\`: 删除属性
- \`,\`: 逗号运算符
          `,
          code: `// ========== 算术运算符 ==========
let a = 10, b = 3;

console.log(a + b);  // 13 加法
console.log(a - b);  // 7  减法
console.log(a * b);  // 30 乘法
console.log(a / b);  // 3.333... 除法
console.log(a % b);  // 1  取模
console.log(a ** b); // 1000 幂运算 (10³)

let x = 5;
console.log(x++);    // 5 (后自增，先返回后加)
console.log(x);      // 6
console.log(++x);    // 7 (前自增，先加后返回)

// ========== 比较运算符 ==========

// == vs ===
console.log(5 == "5");   // true  (类型转换)
console.log(5 === "5");  // false (严格比较) ✅ 推荐

console.log(null == undefined);  // true
console.log(null === undefined); // false

// 其他比较
console.log(10 > 5);   // true
console.log(10 < 5);   // false
console.log(10 >= 10); // true
console.log(10 !== 5); // true ✅ 推荐

// ========== 逻辑运算符 ==========

// && 逻辑与（全真才真）
console.log(true && true);   // true
console.log(true && false);  // false

// || 逻辑或（一真即真）
console.log(true || false);  // true
console.log(false || false); // false

// ! 逻辑非（取反）
console.log(!true);  // false
console.log(!false); // true

// 短路求值
let user = null;
let name = user && user.name; // null (user为假，不继续求值)
let defaultName = user || "游客"; // "游客"

// ?? 空值合并（ES2020）- 只有null/undefined才使用默认值
let count = 0;
console.log(count || 10); // 10 (0被认为是假值)
console.log(count ?? 10); // 0  (0不是null/undefined) ✅

// ========== 三元运算符 ==========
let age = 18;
let status = age >= 18 ? "成年" : "未成年";
console.log(status); // "成年"

// ========== 可选链（ES2020）==========
let userObj = {
    profile: {
        name: "张三"
    }
};

// 传统方式
let userName1 = userObj && userObj.profile && userObj.profile.name;

// 可选链 ✅
let userName2 = userObj?.profile?.name; // "张三"
let userName3 = userObj?.address?.city; // undefined (不会报错)

// ========== 逻辑赋值（ES2021）==========
let value1 = null;
value1 ??= 10;  // 等价于: value1 = value1 ?? 10
console.log(value1); // 10

let value2 = 5;
value2 ||= 10;  // 等价于: value2 = value2 || 10
console.log(value2); // 5

let value3 = true;
value3 &&= false; // 等价于: value3 = value3 && false
console.log(value3); // false`
        }
      ]
    },
    {
      id: 'control-flow',
      title: '第三章：流程控制',
      description: '掌握条件语句和循环结构',
      duration: '4小时',
      sections: [
        {
          id: 'conditional',
          title: '3.1 条件语句',
          content: `
## 条件语句

### if...else 语句

基本的条件判断结构：

\`\`\`javascript
if (条件) {
    // 条件为真时执行
} else {
    // 条件为假时执行
}
\`\`\`

### else if 多条件判断

\`\`\`javascript
if (条件1) {
    // 条件1为真
} else if (条件2) {
    // 条件2为真
} else {
    // 所有条件都为假
}
\`\`\`

### switch 语句

适合多个固定值的判断：

\`\`\`javascript
switch (表达式) {
    case 值1:
        // 代码
        break;
    case 值2:
        // 代码
        break;
    default:
        // 默认代码
}
\`\`\`

### 真值和假值

**假值 (Falsy)**: 转换为布尔值时为 \`false\`
- \`false\`
- \`0\`, \`-0\`, \`0n\`
- \`""\`, \`''\`, \`\`\`\` (空字符串)
- \`null\`
- \`undefined\`
- \`NaN\`

**真值 (Truthy)**: 除假值外的所有值
          `,
          code: `// ========== if...else ==========

let score = 85;

if (score >= 90) {
    console.log("优秀");
} else if (score >= 80) {
    console.log("良好");
} else if (score >= 60) {
    console.log("及格");
} else {
    console.log("不及格");
}

// ========== 三元运算符 ==========
let result = score >= 60 ? "通过" : "未通过";
console.log(result);

// ========== switch 语句 ==========

let day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "星期一";
        break;
    case 2:
        dayName = "星期二";
        break;
    case 3:
        dayName = "星期三";
        break;
    case 4:
        dayName = "星期四";
        break;
    case 5:
        dayName = "星期五";
        break;
    case 6:
    case 7:
        dayName = "周末";
        break;
    default:
        dayName = "无效的日期";
}

console.log(dayName); // "星期三"

// ========== 真值和假值 ==========

// 假值示例
if (false) console.log("不会执行");
if (0) console.log("不会执行");
if ("") console.log("不会执行");
if (null) console.log("不会执行");
if (undefined) console.log("不会执行");
if (NaN) console.log("不会执行");

// 真值示例
if (true) console.log("会执行");
if (1) console.log("会执行");
if ("hello") console.log("会执行");
if ([]) console.log("会执行"); // 空数组是真值！
if ({}) console.log("会执行"); // 空对象是真值！

// ========== 逻辑运算符短路 ==========

// && 找假值，返回第一个假值或最后一个值
let value1 = "hello" && "world" && 0 && "end";
console.log(value1); // 0

// || 找真值，返回第一个真值或最后一个值
let value2 = "" || 0 || "default" || "end";
console.log(value2); // "default"

// ========== 实用模式 ==========

// 1. 默认参数（ES5）
function greet(name) {
    name = name || "游客"; // 如果name为假值，使用"游客"
    return "Hello, " + name;
}

// 2. 守卫语句
function processUser(user) {
    if (!user) {
        console.log("用户不存在");
        return;
    }
    
    if (!user.isActive) {
        console.log("用户未激活");
        return;
    }
    
    console.log("处理用户:", user.name);
}

// 3. 空值合并
let config = {
    timeout: 0
};
let timeout = config.timeout ?? 5000; // 0，不是null/undefined
console.log(timeout); // 0`
        },
        {
          id: 'loops',
          title: '3.2 循环语句',
          content: `
## 循环语句

### for 循环

经典的计数循环：

\`\`\`javascript
for (初始化; 条件; 更新) {
    // 循环体
}
\`\`\`

### while 循环

条件循环，先判断后执行：

\`\`\`javascript
while (条件) {
    // 循环体
}
\`\`\`

### do...while 循环

至少执行一次，后判断条件：

\`\`\`javascript
do {
    // 循环体
} while (条件);
\`\`\`

### for...of 循环 (ES6)

遍历可迭代对象（数组、字符串、Map、Set）：

\`\`\`javascript
for (const item of array) {
    // 处理item
}
\`\`\`

### for...in 循环

遍历对象属性（不推荐用于数组）：

\`\`\`javascript
for (const key in object) {
    // 处理key
}
\`\`\`

### 循环控制

- \`break\`: 跳出循环
- \`continue\`: 跳过本次迭代
- \`label\`: 标签（用于嵌套循环）
          `,
          code: `// ========== for 循环 ==========

// 基本for循环
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

// 遍历数组
const fruits = ["苹果", "香蕉", "橙子"];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// ========== while 循环 ==========

let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}

// 无限循环（需要break跳出）
let userInput;
while (true) {
    userInput = prompt("输入'exit'退出");
    if (userInput === "exit") break;
}

// ========== do...while 循环 ==========

let num = 0;
do {
    console.log(num);
    num++;
} while (num < 5);

// 至少执行一次
do {
    console.log("执行一次");
} while (false);

// ========== for...of 循环（ES6）==========

// 遍历数组 ✅ 推荐
const colors = ["红", "绿", "蓝"];
for (const color of colors) {
    console.log(color);
}

// 遍历字符串
for (const char of "Hello") {
    console.log(char); // H, e, l, l, o
}

// 遍历Map
const map = new Map([
    ["name", "张三"],
    ["age", 25]
]);
for (const [key, value] of map) {
    console.log(\`\${key}: \${value}\`);
}

// 遍历Set
const set = new Set([1, 2, 3]);
for (const num of set) {
    console.log(num);
}

// ========== for...in 循环 ==========

// 遍历对象属性 ✅ 推荐用法
const person = {
    name: "张三",
    age: 25,
    city: "北京"
};

for (const key in person) {
    console.log(\`\${key}: \${person[key]}\`);
}

// ❌ 不推荐用于数组（会遍历索引）
const arr = ["a", "b", "c"];
for (const index in arr) {
    console.log(index); // "0", "1", "2" (字符串!)
}

// ========== break 和 continue ==========

// break: 跳出循环
for (let i = 0; i < 10; i++) {
    if (i === 5) break;
    console.log(i); // 0, 1, 2, 3, 4
}

// continue: 跳过本次迭代
for (let i = 0; i < 5; i++) {
    if (i === 2) continue;
    console.log(i); // 0, 1, 3, 4
}

// ========== 嵌套循环和标签 ==========

// 标签用于跳出多层循环
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outer; // 跳出外层循环
        }
        console.log(\`i=\${i}, j=\${j}\`);
    }
}

// ========== 数组遍历方法（推荐）==========

const numbers = [1, 2, 3, 4, 5];

// forEach: 遍历每个元素
numbers.forEach((num, index) => {
    console.log(\`索引\${index}: \${num}\`);
});

// map: 映射为新数组
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter: 过滤
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce: 累积
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15`
        }
      ]
    },
    {
      id: 'functions',
      title: '第四章：函数',
      description: '掌握函数的定义和使用',
      duration: '5小时',
      sections: [
        {
          id: 'function-basics',
          title: '4.1 函数基础',
          content: `
## 函数基础

### 函数的定义方式

**1. 函数声明 (Function Declaration)**
\`\`\`javascript
function functionName(参数) {
    // 函数体
    return 返回值;
}
\`\`\`

**2. 函数表达式 (Function Expression)**
\`\`\`javascript
const functionName = function(参数) {
    // 函数体
    return 返回值;
};
\`\`\`

**3. 箭头函数 (Arrow Function) - ES6**
\`\`\`javascript
const functionName = (参数) => {
    // 函数体
    return 返回值;
};
\`\`\`

### 函数调用

\`\`\`javascript
functionName(实参);
\`\`\`

### 参数和返回值

- **参数**: 函数接收的输入
- **返回值**: 函数的输出（使用 \`return\` 语句）
- 没有 \`return\` 语句时，返回 \`undefined\`

### 函数提升 (Hoisting)

- **函数声明**: 会被提升，可以在声明前调用
- **函数表达式**: 不会被提升
- **箭头函数**: 不会被提升
          `,
          code: `// ========== 函数声明 ==========

// ✅ 可以在声明前调用（函数提升）
console.log(add(2, 3)); // 5

function add(a, b) {
    return a + b;
}

// ========== 函数表达式 ==========

// ❌ 不能在声明前调用
// console.log(subtract(5, 3)); // ReferenceError

const subtract = function(a, b) {
    return a - b;
};

console.log(subtract(5, 3)); // 2

// ========== 箭头函数（ES6）==========

// 完整语法
const multiply = (a, b) => {
    return a * b;
};

// 简写：单个表达式，省略return和{}
const multiplyShort = (a, b) => a * b;

// 单个参数，省略()
const square = n => n * n;

// 无参数
const greet = () => "Hello!";

// 返回对象，需要用()包裹
const createUser = (name, age) => ({
    name: name,
    age: age
});

console.log(multiply(3, 4));    // 12
console.log(multiplyShort(3, 4)); // 12
console.log(square(5));         // 25
console.log(greet());           // "Hello!"
console.log(createUser("张三", 25)); // { name: "张三", age: 25 }

// ========== 参数和返回值 ==========

// 多个参数
function introduce(name, age, city) {
    return \`我叫\${name}，今年\${age}岁，来自\${city}\`;
}
console.log(introduce("张三", 25, "北京"));

// 默认参数（ES6）
function greetUser(name = "游客", greeting = "你好") {
    return \`\${greeting}, \${name}!\`;
}
console.log(greetUser());              // "你好, 游客!"
console.log(greetUser("李四"));        // "你好, 李四!"
console.log(greetUser("李四", "早上好")); // "早上好, 李四!"

// 剩余参数（ES6）- 接收任意数量的参数
function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// 解构参数（ES6）
function printUser({ name, age, city = "未知" }) {
    console.log(\`\${name}, \${age}岁, 来自\${city}\`);
}
printUser({ name: "王五", age: 30 }); // "王五, 30岁, 来自未知"

// ========== 没有return语句 ==========

function logMessage(message) {
    console.log(message);
    // 没有return，返回undefined
}

const result = logMessage("Hello");
console.log(result); // undefined

// ========== 立即执行函数（IIFE）==========

(function() {
    console.log("立即执行！");
})();

// 箭头函数版本
(() => {
    console.log("箭头函数立即执行！");
})();

// ========== 函数作为值 ==========

// 函数可以赋值给变量
const func = add;
console.log(func(2, 3)); // 5

// 函数可以作为参数传递
function callTwice(fn, value) {
    fn(value);
    fn(value);
}
callTwice(console.log, "Hello"); // 输出两次"Hello"

// 函数可以作为返回值
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}
const double = createMultiplier(2);
console.log(double(5)); // 10`
        }
      ]
    }
  ],

  // 学习资源
  resources: [
    {
      name: 'MDN JavaScript 文档',
      url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript'
    },
    {
      name: 'ECMAScript 规范',
      url: 'https://tc39.es/ecma262/'
    },
    {
      name: 'JavaScript.info 现代教程',
      url: 'https://zh.javascript.info/'
    },
    {
      name: 'ES6 入门教程',
      url: 'https://es6.ruanyifeng.com/'
    },
    {
      name: 'Node.js 官网',
      url: 'https://nodejs.org/'
    }
  ],

  // 练习项目
  projects: [
    {
      id: 'calculator',
      name: '计算器应用',
      difficulty: '初级',
      description: '创建一个基本的计算器，支持加减乘除运算'
    },
    {
      id: 'todo-list',
      name: '待办事项列表',
      difficulty: '初级',
      description: '实现添加、删除、标记完成等功能的待办清单'
    },
    {
      id: 'weather-app',
      name: '天气查询应用',
      difficulty: '中级',
      description: '使用API获取天气数据并展示'
    },
    {
      id: 'quiz-game',
      name: '问答游戏',
      difficulty: '中级',
      description: '创建一个交互式的问答游戏，记录分数'
    }
  ]
}
