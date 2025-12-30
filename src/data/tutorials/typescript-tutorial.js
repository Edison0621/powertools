// TypeScript 完整教程 - 基于最新的 TypeScript 5.x 和现代最佳实践
export const typescriptTutorial = {
  id: 'typescript',
  name: 'TypeScript 完整教程',
  version: 'TypeScript 5.x',
  lastUpdated: '2024-12',
  level: '中级',
  estimatedTime: '28小时',
  
  // 课程大纲
  chapters: [
    {
      id: 'intro',
      title: '第一章：TypeScript 入门',
      description: '了解 TypeScript 的基本概念和核心特性',
      duration: '3小时',
      sections: [
        {
          id: 'what-is-typescript',
          title: '1.1 什么是 TypeScript',
          content: `
## 什么是 TypeScript

TypeScript 是 JavaScript 的**超集**，为 JavaScript 添加了**静态类型系统**和其他现代编程特性。它由 Microsoft 开发和维护。

### TypeScript 的核心概念

- **静态类型**: 在编译时检查类型错误
- **类型推断**: 自动推断变量类型
- **编译型语言**: TypeScript 代码编译为 JavaScript
- **渐进式采用**: 可以逐步将 JavaScript 项目迁移到 TypeScript
- **面向对象**: 支持类、接口、泛型等特性

### TypeScript 的优势

**为什么使用 TypeScript？**

✅ **类型安全**: 在编译时发现错误，而不是运行时
✅ **更好的 IDE 支持**: 自动补全、重构、导航
✅ **代码可维护性**: 类型即文档，易于理解和维护
✅ **现代 JavaScript 特性**: 支持最新的 ES 标准
✅ **大型项目友好**: 适合团队协作和大型应用
✅ **生态丰富**: 大量库提供类型定义

**适用场景**:
- 大型企业级应用
- 团队协作项目
- 需要长期维护的项目
- 框架开发（Angular、Vue 3、React）
- Node.js 后端开发

### TypeScript 发展历史

- **2012**: TypeScript 0.8 发布，Anders Hejlsberg 创建
- **2014**: TypeScript 1.0 发布
- **2016**: TypeScript 2.0，非空类型、联合类型
- **2018**: TypeScript 3.0，项目引用、元组类型
- **2020**: TypeScript 4.0，变长元组、标签元组
- **2023**: TypeScript 5.0，装饰器、const 类型参数
- **2024**: TypeScript 5.4+，NoInfer、闭包改进

### TypeScript 5.x 的重要特性

✅ **装饰器**: 官方装饰器支持（Stage 3）
✅ **const 类型参数**: 更好的类型推断
✅ **satisfies 操作符**: 类型检查而不改变类型
✅ **using 声明**: 资源管理和清理
✅ **NoInfer**: 阻止类型推断
✅ **性能优化**: 更快的编译速度
✅ **Import 属性**: ES 模块的导入断言
          `,
          code: `// TypeScript 基本示例

// 1. 类型注解
let username: string = "张三";
let age: number = 25;
let isActive: boolean = true;

// 2. 类型推断（TypeScript 会自动推断类型）
let message = "Hello TypeScript"; // 推断为 string
let count = 0; // 推断为 number

// 3. 函数类型
function greet(name: string): string {
    return \`你好，\${name}！\`;
}

// 箭头函数
const add = (a: number, b: number): number => {
    return a + b;
};

// 4. 接口
interface User {
    id: number;
    name: string;
    email: string;
    age?: number; // 可选属性
}

const user: User = {
    id: 1,
    name: "李四",
    email: "lisi@example.com"
};

// 5. 类
class Person {
    private name: string;
    public age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    introduce(): string {
        return \`我叫\${this.name}，今年\${this.age}岁\`;
    }
}

const person = new Person("王五", 30);
console.log(person.introduce());

// 6. 泛型
function identity<T>(value: T): T {
    return value;
}

const result1 = identity<string>("Hello");
const result2 = identity<number>(42);

// 7. 联合类型
type Status = "pending" | "success" | "error";

function handleStatus(status: Status): void {
    if (status === "success") {
        console.log("操作成功");
    }
}

// 8. 类型别名
type Point = {
    x: number;
    y: number;
};

const point: Point = { x: 10, y: 20 };

// 9. 数组和元组
const numbers: number[] = [1, 2, 3, 4, 5];
const tuple: [string, number] = ["TypeScript", 2024];

// 10. 枚举
enum Color {
    Red,
    Green,
    Blue
}

const favoriteColor: Color = Color.Blue;

// 11. TypeScript 5.x 新特性 - satisfies
type Colors = "red" | "green" | "blue";
const palette = {
    red: "#ff0000",
    green: "#00ff00",
    blue: "#0000ff"
} satisfies Record<Colors, string>;

// palette 的类型被保留，同时进行类型检查
const redHex = palette.red.toUpperCase(); // ✅ 可以使用字符串方法`
        },
        {
          id: 'environment-setup',
          title: '1.2 开发环境搭建',
          content: `
## 开发环境搭建

### 安装 Node.js

TypeScript 需要 Node.js 环境：

1. 访问 [nodejs.org](https://nodejs.org)
2. 下载并安装 LTS 版本
3. 验证安装：\`node -v\` 和 \`npm -v\`

### 安装 TypeScript

**全局安装**（推荐用于学习）:
\`\`\`bash
npm install -g typescript
\`\`\`

**项目本地安装**（推荐用于项目）:
\`\`\`bash
npm install --save-dev typescript
\`\`\`

**验证安装**:
\`\`\`bash
tsc --version
\`\`\`

### 创建 TypeScript 项目

**1. 初始化项目**:
\`\`\`bash
mkdir my-ts-project
cd my-ts-project
npm init -y
npm install --save-dev typescript
\`\`\`

**2. 生成 tsconfig.json**:
\`\`\`bash
npx tsc --init
\`\`\`

**3. 创建第一个 TypeScript 文件**:
\`\`\`typescript
// index.ts
const message: string = "Hello TypeScript!";
console.log(message);
\`\`\`

**4. 编译 TypeScript**:
\`\`\`bash
npx tsc
\`\`\`

**5. 运行编译后的 JavaScript**:
\`\`\`bash
node index.js
\`\`\`

### tsconfig.json 配置

基本配置示例：

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",           // 编译目标
    "module": "commonjs",         // 模块系统
    "lib": ["ES2020"],            // 包含的库
    "outDir": "./dist",           // 输出目录
    "rootDir": "./src",           // 源码目录
    "strict": true,               // 严格模式
    "esModuleInterop": true,      // ES 模块互操作
    "skipLibCheck": true,         // 跳过库检查
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
\`\`\`

### 开发工具推荐

**编辑器**:
- **Visual Studio Code**（最推荐）
  - 内置 TypeScript 支持
  - 强大的类型提示
  - 自动重构功能

**VS Code 扩展**:
- ESLint - 代码检查
- Prettier - 代码格式化
- TypeScript Error Translator - 错误翻译
- Pretty TypeScript Errors - 美化错误提示

**在线工具**:
- [TypeScript Playground](https://www.typescriptlang.org/play) - 在线编辑器
- [TS Playground](https://tsplay.dev/) - 增强版在线工具

### 项目结构

\`\`\`
my-ts-project/
├── node_modules/
├── src/
│   ├── index.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       └── helpers.ts
├── dist/              # 编译输出
├── package.json
├── tsconfig.json
└── .gitignore
\`\`\`

### 实时编译和监听

**监听模式**（自动重新编译）:
\`\`\`bash
npx tsc --watch
\`\`\`

**使用 ts-node**（直接运行 TypeScript）:
\`\`\`bash
npm install --save-dev ts-node
npx ts-node src/index.ts
\`\`\`

**使用 nodemon + ts-node**（自动重启）:
\`\`\`bash
npm install --save-dev nodemon ts-node
npx nodemon --exec ts-node src/index.ts
\`\`\`
          `,
          code: `// tsconfig.json - TypeScript 配置文件
{
  "compilerOptions": {
    /* 语言和环境 */
    "target": "ES2020",                    // 编译目标版本
    "lib": ["ES2020"],                     // 包含的库文件
    "module": "commonjs",                  // 模块系统
    "jsx": "react-jsx",                    // JSX 支持
    
    /* 模块解析 */
    "moduleResolution": "node",            // 模块解析策略
    "baseUrl": "./",                       // 基础路径
    "paths": {                             // 路径映射
      "@/*": ["src/*"]
    },
    "resolveJsonModule": true,             // 允许导入 JSON
    
    /* 输出 */
    "outDir": "./dist",                    // 输出目录
    "rootDir": "./src",                    // 源码目录
    "removeComments": true,                // 移除注释
    "sourceMap": true,                     // 生成 source map
    "declaration": true,                   // 生成声明文件
    "declarationMap": true,                // 生成声明文件的 map
    
    /* 类型检查 */
    "strict": true,                        // 启用所有严格类型检查
    "noImplicitAny": true,                 // 不允许隐式 any
    "strictNullChecks": true,              // 严格的 null 检查
    "strictFunctionTypes": true,           // 严格的函数类型
    "strictBindCallApply": true,           // 严格的 bind/call/apply
    "strictPropertyInitialization": true,  // 严格的属性初始化
    "noImplicitThis": true,                // 不允许隐式 this
    "alwaysStrict": true,                  // 始终使用严格模式
    
    /* 额外检查 */
    "noUnusedLocals": true,                // 检查未使用的局部变量
    "noUnusedParameters": true,            // 检查未使用的参数
    "noImplicitReturns": true,             // 检查函数返回值
    "noFallthroughCasesInSwitch": true,   // 检查 switch 的 fallthrough
    
    /* 互操作性约束 */
    "esModuleInterop": true,               // ES 模块互操作
    "allowSyntheticDefaultImports": true,  // 允许合成默认导入
    "forceConsistentCasingInFileNames": true, // 强制文件名大小写一致
    
    /* 高级选项 */
    "skipLibCheck": true,                  // 跳过库文件检查
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 发出装饰器元数据
  },
  
  /* 包含和排除 */
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.spec.ts"
  ]
}

// ========================================

// package.json - 项目配置
{
  "name": "my-typescript-project",
  "version": "1.0.0",
  "description": "TypeScript 项目示例",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "dev": "ts-node src/index.ts",
    "dev:watch": "nodemon --exec ts-node src/index.ts",
    "start": "node dist/index.js",
    "clean": "rm -rf dist",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "ts-node": "^10.9.2",
    "nodemon": "^3.0.3",
    "@types/node": "^20.11.0"
  }
}

// ========================================

// src/index.ts - 入口文件
import { greet } from './utils/helpers';
import type { User } from './types';

const user: User = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com",
  age: 25
};

console.log(greet(user.name));

// ========================================

// src/types/index.ts - 类型定义
export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

export type Status = "active" | "inactive" | "pending";

export interface ApiResponse<T> {
  data: T;
  message: string;
  code: number;
}

// ========================================

// src/utils/helpers.ts - 工具函数
export function greet(name: string): string {
  return \`你好，\${name}！\`;
}

export function calculateAge(birthYear: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}`
        }
      ]
    },
    {
      id: 'types',
      title: '第二章：TypeScript 类型系统',
      description: '掌握 TypeScript 的核心类型系统',
      duration: '6小时',
      sections: [
        {
          id: 'basic-types',
          title: '2.1 基础类型',
          content: `
## 基础类型

TypeScript 提供了丰富的基础类型系统。

### 原始类型

**1. string（字符串）**
\`\`\`typescript
let name: string = "TypeScript";
let message: string = \`Hello, \${name}\`;
\`\`\`

**2. number（数字）**
\`\`\`typescript
let integer: number = 42;
let float: number = 3.14;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
\`\`\`

**3. boolean（布尔值）**
\`\`\`typescript
let isActive: boolean = true;
let isCompleted: boolean = false;
\`\`\`

**4. null 和 undefined**
\`\`\`typescript
let n: null = null;
let u: undefined = undefined;

// strictNullChecks 下，null 和 undefined 只能赋值给自己
let value: string | null = null; // 联合类型
\`\`\`

**5. symbol（符号）**
\`\`\`typescript
const sym1 = Symbol("key");
const sym2 = Symbol("key");
console.log(sym1 === sym2); // false
\`\`\`

**6. bigint（大整数）- ES2020**
\`\`\`typescript
const big: bigint = 9007199254740991n;
\`\`\`

### 特殊类型

**1. any（任意类型）**
\`\`\`typescript
let value: any = "Hello";
value = 42;        // ✅ 可以
value = true;      // ✅ 可以
value.foo.bar;     // ✅ 不会报错（危险！）
\`\`\`

**2. unknown（未知类型）- 安全的 any**
\`\`\`typescript
let value: unknown = "Hello";
// value.toUpperCase(); // ❌ 错误！需要先检查类型

if (typeof value === "string") {
  value.toUpperCase(); // ✅ 正确
}
\`\`\`

**3. void（空类型）**
\`\`\`typescript
function log(message: string): void {
  console.log(message);
  // 没有返回值
}
\`\`\`

**4. never（永不类型）**
\`\`\`typescript
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
\`\`\`

### 数组类型

**两种写法**:
\`\`\`typescript
// 方式 1: 类型[]
let numbers: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob"];

// 方式 2: Array<类型>
let scores: Array<number> = [90, 85, 88];
\`\`\`

### 元组类型（Tuple）

固定长度和类型的数组：

\`\`\`typescript
let tuple: [string, number] = ["TypeScript", 2024];
let point: [number, number] = [10, 20];

// 访问元素
console.log(tuple[0].toUpperCase()); // "TYPESCRIPT"
console.log(tuple[1].toFixed(2));    // "2024.00"

// 解构
const [name, year] = tuple;
\`\`\`

### 枚举类型（Enum）

**数字枚举**:
\`\`\`typescript
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

let dir: Direction = Direction.Up;
\`\`\`

**字符串枚举**:
\`\`\`typescript
enum Color {
  Red = "#ff0000",
  Green = "#00ff00",
  Blue = "#0000ff"
}
\`\`\`

**常量枚举**（性能优化）:
\`\`\`typescript
const enum Status {
  Pending = "PENDING",
  Success = "SUCCESS",
  Error = "ERROR"
}

let status: Status = Status.Success;
// 编译后直接使用值，不会生成额外代码
\`\`\`
          `,
          code: `// ========== 基础类型示例 ==========

// 1. 原始类型
const username: string = "张三";
const age: number = 25;
const isStudent: boolean = true;
const nothing: null = null;
const notDefined: undefined = undefined;

// 2. symbol 和 bigint
const uniqueId: symbol = Symbol("id");
const largeNumber: bigint = 9007199254740991n;

// 3. any vs unknown
let anyValue: any = "Hello";
anyValue = 42;
anyValue.toUpperCase(); // ❌ 运行时可能报错

let unknownValue: unknown = "World";
// unknownValue.toUpperCase(); // ❌ 编译时报错

// 类型守卫
if (typeof unknownValue === "string") {
  unknownValue.toUpperCase(); // ✅ 正确
}

// 4. void 和 never
function logMessage(msg: string): void {
  console.log(msg);
}

function throwError(error: string): never {
  throw new Error(error);
}

// 5. 数组类型
const numbers: number[] = [1, 2, 3, 4, 5];
const names: Array<string> = ["Alice", "Bob", "Charlie"];

// 多维数组
const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// 6. 元组类型
type Point = [number, number];
const point: Point = [10, 20];

type UserInfo = [string, number, boolean];
const user: UserInfo = ["张三", 25, true];

// 带标签的元组（TypeScript 4.0+）
type LabeledPoint = [x: number, y: number];
const labeledPoint: LabeledPoint = [10, 20];

// 可选元组元素
type OptionalTuple = [string, number?];
const tuple1: OptionalTuple = ["hello"];
const tuple2: OptionalTuple = ["world", 42];

// 剩余元素
type StringNumberBooleans = [string, number, ...boolean[]];
const example: StringNumberBooleans = ["hello", 1, true, false, true];

// 7. 枚举类型
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500
}

function handleResponse(status: HttpStatus): string {
  switch (status) {
    case HttpStatus.OK:
      return "请求成功";
    case HttpStatus.NotFound:
      return "资源未找到";
    default:
      return "未知状态";
  }
}

// 字符串枚举
enum LogLevel {
  Debug = "DEBUG",
  Info = "INFO",
  Warning = "WARNING",
  Error = "ERROR"
}

function log(level: LogLevel, message: string): void {
  console.log(\`[\${level}] \${message}\`);
}

log(LogLevel.Info, "应用启动成功");

// 常量枚举（编译后消失）
const enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

const move = Direction.Up; // 编译后直接替换为 "UP"

// 8. 类型推断
let inferredString = "TypeScript"; // 推断为 string
let inferredNumber = 42;           // 推断为 number
let inferredBoolean = true;        // 推断为 boolean

// 数组推断
let inferredArray = [1, 2, 3];     // 推断为 number[]
let mixedArray = [1, "two", true]; // 推断为 (string | number | boolean)[]

// 9. 字面量类型
let literal: "hello" = "hello";
// literal = "world"; // ❌ 错误

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
function request(url: string, method: HTTPMethod): void {
  console.log(\`\${method} \${url}\`);
}

request("/api/users", "GET"); // ✅
// request("/api/users", "PATCH"); // ❌ 错误

// 数字字面量
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
function rollDice(): DiceRoll {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}

// 10. 类型断言
const someValue: unknown = "this is a string";

// 方式 1: as 语法（推荐）
const strLength1: number = (someValue as string).length;

// 方式 2: 尖括号语法（在 JSX 中不能使用）
const strLength2: number = (<string>someValue).length;

// 非空断言（！）
function getValue(): string | null {
  return "hello";
}

const value = getValue()!; // 断言不为 null
console.log(value.toUpperCase());

// const 断言（TypeScript 3.4+）
const config = {
  host: "localhost",
  port: 3000
} as const;

// config.port = 8080; // ❌ 错误，属性只读

// 数组的 const 断言
const colors = ["red", "green", "blue"] as const;
type Color = typeof colors[number]; // "red" | "green" | "blue"`
        },
        {
          id: 'advanced-types',
          title: '2.2 高级类型',
          content: `
## 高级类型

TypeScript 提供了强大的高级类型特性。

### 联合类型（Union Types）

表示值可以是几种类型之一：

\`\`\`typescript
type StringOrNumber = string | number;

function printId(id: StringOrNumber): void {
  console.log(\`ID: \${id}\`);
}

printId(101);      // ✅
printId("202");    // ✅
\`\`\`

### 交叉类型（Intersection Types）

将多个类型合并为一个：

\`\`\`typescript
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  department: string;
};

type Staff = Person & Employee;

const staff: Staff = {
  name: "张三",
  age: 30,
  employeeId: 1001,
  department: "开发部"
};
\`\`\`

### 类型别名（Type Aliases）

为类型创建新名称：

\`\`\`typescript
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (data: string) => void;
\`\`\`

### 接口（Interfaces）

定义对象的结构：

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;        // 可选属性
  readonly role: string; // 只读属性
}
\`\`\`

**接口 vs 类型别名**:

| 特性 | Interface | Type |
|------|-----------|------|
| 对象类型 | ✅ | ✅ |
| 联合类型 | ❌ | ✅ |
| 元组 | ❌ | ✅ |
| 扩展 | extends | & |
| 声明合并 | ✅ | ❌ |

### 类型守卫（Type Guards）

**1. typeof 守卫**:
\`\`\`typescript
function process(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
\`\`\`

**2. instanceof 守卫**:
\`\`\`typescript
if (value instanceof Date) {
  console.log(value.toISOString());
}
\`\`\`

**3. in 守卫**:
\`\`\`typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}
\`\`\`

**4. 自定义类型守卫**:
\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}
\`\`\`

### 映射类型（Mapped Types）

从旧类型创建新类型：

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};
\`\`\`

### 条件类型（Conditional Types）

基于条件的类型：

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
\`\`\`

### 模板字面量类型（Template Literal Types）

TypeScript 4.1+ 特性：

\`\`\`typescript
type World = "world";
type Greeting = \`hello \${World}\`; // "hello world"

type Color = "red" | "blue";
type Quantity = "one" | "two";
type SeussFish = \`\${Quantity | Color} fish\`;
// "one fish" | "two fish" | "red fish" | "blue fish"
\`\`\`
          `,
          code: `// ========== 高级类型示例 ==========

// 1. 联合类型
type Status = "success" | "error" | "pending";
type Result = { data: any } | { error: string };

function handleResult(result: Result): void {
  if ("data" in result) {
    console.log("数据:", result.data);
  } else {
    console.error("错误:", result.error);
  }
}

// 可辨识联合（Discriminated Unions）
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
  }
}

// 2. 交叉类型
interface Nameable {
  name: string;
}

interface Ageable {
  age: number;
}

type Person = Nameable & Ageable & {
  email: string;
};

const person: Person = {
  name: "张三",
  age: 25,
  email: "zhangsan@example.com"
};

// 3. 类型别名 vs 接口
// 类型别名 - 可以表示联合类型、元组等
type ID = string | number;
type Point = [number, number];
type Callback = (data: string) => void;

// 接口 - 可以被继承和实现
interface Animal {
  name: string;
  makeSound(): void;
}

interface Dog extends Animal {
  breed: string;
}

const dog: Dog = {
  name: "旺财",
  breed: "金毛",
  makeSound() {
    console.log("汪汪汪");
  }
};

// 接口声明合并
interface User {
  id: number;
  name: string;
}

interface User {
  email: string;
}

// 合并后的 User 接口
const user: User = {
  id: 1,
  name: "李四",
  email: "lisi@example.com"
};

// 4. 类型守卫
function processValue(value: string | number | boolean): string {
  // typeof 守卫
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  
  return value ? "true" : "false";
}

// 自定义类型守卫
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird): void {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}

// 5. 索引类型
interface Dictionary<T> {
  [key: string]: T;
}

const scores: Dictionary<number> = {
  math: 95,
  english: 88,
  chinese: 92
};

// keyof 操作符
interface PersonInfo {
  name: string;
  age: number;
  email: string;
}

type PersonKeys = keyof PersonInfo; // "name" | "age" | "email"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const personInfo: PersonInfo = {
  name: "王五",
  age: 30,
  email: "wangwu@example.com"
};

const name = getProperty(personInfo, "name");     // string
const age = getProperty(personInfo, "age");       // number
// const invalid = getProperty(personInfo, "invalid"); // ❌ 错误

// 6. 映射类型
type ReadonlyPerson = Readonly<PersonInfo>;
type PartialPerson = Partial<PersonInfo>;
type RequiredPerson = Required<PartialPerson>;

// 自定义映射类型
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type PersonGetters = Getters<PersonInfo>;
// {
//   getName: () => string;
//   getAge: () => number;
//   getEmail: () => string;
// }

// 7. 条件类型
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>;  // true
type B = IsArray<number>;    // false

// infer 关键字
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getString(): string {
  return "hello";
}

type StringReturn = ReturnType<typeof getString>; // string

// 8. 模板字面量类型（TypeScript 4.1+）
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickEvent = EventName<"click">;     // "onClick"
type ChangeEvent = EventName<"change">;   // "onChange"

// 组合模板字面量
type HttpVerb = "GET" | "POST" | "PUT" | "DELETE";
type ResourcePath = "/users" | "/posts" | "/comments";
type ApiEndpoint = \`\${HttpVerb} \${ResourcePath}\`;
// "GET /users" | "POST /users" | ... (12 种组合)

// 9. 工具类型
interface Task {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
}

// Partial - 所有属性可选
type PartialTask = Partial<Task>;

// Required - 所有属性必需
type RequiredTask = Required<Task>;

// Readonly - 所有属性只读
type ReadonlyTask = Readonly<Task>;

// Pick - 选择部分属性
type TaskPreview = Pick<Task, "id" | "title">;

// Omit - 排除部分属性
type TaskWithoutId = Omit<Task, "id">;

// Record - 构造对象类型
type TasksById = Record<number, Task>;

// Exclude - 从联合类型中排除
type T1 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"

// Extract - 从联合类型中提取
type T2 = Extract<"a" | "b" | "c", "a" | "f">;  // "a"

// NonNullable - 排除 null 和 undefined
type T3 = NonNullable<string | number | null | undefined>;  // string | number

// 10. satisfies 操作符（TypeScript 4.9+）
type Colors = "red" | "green" | "blue";

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255]
} satisfies Record<Colors, string | number[]>;

// palette 保留原始类型，可以使用数组方法
const redNormalized = palette.red[0]; // ✅
const greenUppercase = palette.green.toUpperCase(); // ✅`
        }
      ]
    },
    {
      id: 'functions',
      title: '第三章：函数',
      description: '掌握 TypeScript 中的函数类型和用法',
      duration: '4小时',
      sections: [
        {
          id: 'function-types',
          title: '3.1 函数类型',
          content: `
## 函数类型

TypeScript 为函数提供了强大的类型支持。

### 函数声明和表达式

**函数声明**:
\`\`\`typescript
function add(a: number, b: number): number {
  return a + b;
}
\`\`\`

**函数表达式**:
\`\`\`typescript
const subtract = function(a: number, b: number): number {
  return a - b;
};
\`\`\`

**箭头函数**:
\`\`\`typescript
const multiply = (a: number, b: number): number => a * b;
\`\`\`

### 函数类型表达式

\`\`\`typescript
type MathOperation = (a: number, b: number) => number;

const divide: MathOperation = (a, b) => a / b;
\`\`\`

### 可选参数和默认参数

**可选参数**（用 \`?\` 标记）:
\`\`\`typescript
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return \`\${greeting}, \${name}!\`;
  }
  return \`Hello, \${name}!\`;
}

greet("Alice");              // ✅
greet("Bob", "Hi");          // ✅
\`\`\`

**默认参数**:
\`\`\`typescript
function createUser(name: string, role: string = "user"): void {
  console.log(\`\${name} - \${role}\`);
}

createUser("Alice");         // "Alice - user"
createUser("Bob", "admin");  // "Bob - admin"
\`\`\`

### 剩余参数

\`\`\`typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4, 5); // 15
\`\`\`

### 函数重载

TypeScript 支持函数重载：

\`\`\`typescript
// 重载签名
function getValue(id: number): string;
function getValue(name: string): number;

// 实现签名
function getValue(value: number | string): string | number {
  if (typeof value === "number") {
    return "ID: " + value;
  }
  return value.length;
}

const result1 = getValue(123);      // string
const result2 = getValue("Alice");  // number
\`\`\`

### this 类型

\`\`\`typescript
interface User {
  name: string;
  greet(this: User): void;
}

const user: User = {
  name: "Alice",
  greet() {
    console.log(\`Hello, \${this.name}\`);
  }
};
\`\`\`

### 泛型函数

\`\`\`typescript
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);
const str = identity<string>("hello");

// 类型推断
const auto = identity("world"); // 推断为 string
\`\`\`
          `,
          code: `// ========== 函数类型示例 ==========

// 1. 基本函数类型
function add(a: number, b: number): number {
  return a + b;
}

const subtract = (a: number, b: number): number => {
  return a - b;
};

// 函数类型表达式
type BinaryOperation = (a: number, b: number) => number;

const multiply: BinaryOperation = (a, b) => a * b;
const divide: BinaryOperation = (a, b) => {
  if (b === 0) {
    throw new Error("除数不能为零");
  }
  return a / b;
};

// 2. 可选参数和默认参数
function buildName(
  firstName: string,
  lastName?: string,
  title: string = "先生"
): string {
  if (lastName) {
    return \`\${title} \${firstName} \${lastName}\`;
  }
  return \`\${title} \${firstName}\`;
}

console.log(buildName("张", "三"));           // "先生 张 三"
console.log(buildName("李", undefined, "女士")); // "女士 李"

// 3. 剩余参数
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

function concatenate(separator: string, ...strings: string[]): string {
  return strings.join(separator);
}

console.log(sum(1, 2, 3, 4, 5));                    // 15
console.log(concatenate(" - ", "a", "b", "c"));     // "a - b - c"

// 4. 函数重载
// 重载签名
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;

// 实现签名
function format(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value ? "真" : "假";
}

console.log(format("hello"));  // "HELLO"
console.log(format(42.123));   // "42.12"
console.log(format(true));     // "真"

// 更复杂的重载示例
interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

function createPoint(x: number, y: number): Point2D;
function createPoint(x: number, y: number, z: number): Point3D;
function createPoint(x: number, y: number, z?: number): Point2D | Point3D {
  if (z !== undefined) {
    return { x, y, z };
  }
  return { x, y };
}

const point2D = createPoint(10, 20);       // Point2D
const point3D = createPoint(10, 20, 30);   // Point3D

// 5. this 参数
interface Counter {
  count: number;
  increment(this: Counter): void;
  decrement(this: Counter): void;
  getCount(this: Counter): number;
}

const counter: Counter = {
  count: 0,
  increment() {
    this.count++;
  },
  decrement() {
    this.count--;
  },
  getCount() {
    return this.count;
  }
};

counter.increment();
console.log(counter.getCount()); // 1

// 6. 泛型函数
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);
const str = identity("hello");  // 类型推断

// 泛型约束
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(value: T): T {
  console.log(value.length);
  return value;
}

logLength("hello");           // ✅ string 有 length
logLength([1, 2, 3]);         // ✅ 数组有 length
// logLength(42);             // ❌ number 没有 length

// 多个泛型参数
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair<string, number>("age", 25);

// 7. 回调函数类型
type Callback<T> = (value: T) => void;

function fetchData<T>(
  url: string,
  onSuccess: Callback<T>,
  onError: Callback<Error>
): void {
  // 模拟异步请求
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      onSuccess({ data: "success" } as T);
    } else {
      onError(new Error("请求失败"));
    }
  }, 1000);
}

interface UserData {
  data: string;
}

fetchData<UserData>(
  "/api/user",
  (data) => console.log("成功:", data),
  (error) => console.error("错误:", error)
);

// 8. 高阶函数
function createMultiplier(factor: number): (value: number) => number {
  return (value: number) => value * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// 函数组合
function compose<A, B, C>(
  f: (b: B) => C,
  g: (a: A) => B
): (a: A) => C {
  return (a: A) => f(g(a));
}

const addOne = (x: number) => x + 1;
const multiplyByTwo = (x: number) => x * 2;

const addOneThenMultiply = compose(multiplyByTwo, addOne);
console.log(addOneThenMultiply(5)); // (5 + 1) * 2 = 12

// 9. async/await 类型
async function fetchUser(id: number): Promise<{ name: string; age: number }> {
  // 模拟异步操作
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "张三", age: 25 });
    }, 1000);
  });
}

async function getUserInfo(id: number): Promise<void> {
  try {
    const user = await fetchUser(id);
    console.log(\`用户: \${user.name}, 年龄: \${user.age}\`);
  } catch (error) {
    console.error("获取用户信息失败:", error);
  }
}

// 10. 函数类型守卫
function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

function executeIfFunction(fn: unknown): void {
  if (isFunction(fn)) {
    fn(); // TypeScript 知道这里 fn 是函数
  }
}

// 断言函数（Assertion Functions）- TypeScript 3.7+
function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function processValue(value: string | null): string {
  assert(value !== null, "值不能为 null");
  // 这里 TypeScript 知道 value 是 string
  return value.toUpperCase();
}`
        }
      ]
    }
  ],

  // 学习资源
  resources: [
    {
      name: 'TypeScript 官方文档',
      url: 'https://www.typescriptlang.org/docs/'
    },
    {
      name: 'TypeScript 中文网',
      url: 'https://www.tslang.cn/'
    },
    {
      name: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/intro.html'
    },
    {
      name: 'Type Challenges',
      url: 'https://github.com/type-challenges/type-challenges'
    },
    {
      name: 'TypeScript Playground',
      url: 'https://www.typescriptlang.org/play'
    },
    {
      name: 'DefinitelyTyped',
      url: 'https://github.com/DefinitelyTyped/DefinitelyTyped'
    }
  ],

  // 练习项目
  projects: [
    {
      id: 'type-safe-api',
      name: '类型安全的 API 客户端',
      difficulty: '初级',
      description: '创建一个完全类型安全的 HTTP 客户端库'
    },
    {
      id: 'todo-app-ts',
      name: 'TypeScript Todo 应用',
      difficulty: '中级',
      description: '使用 TypeScript 和 React 构建 Todo 应用'
    },
    {
      id: 'express-ts',
      name: 'Express + TypeScript',
      difficulty: '中级',
      description: '使用 TypeScript 构建 RESTful API 服务'
    },
    {
      id: 'type-challenges',
      name: '类型挑战',
      difficulty: '高级',
      description: '完成 Type Challenges 中的高级类型题目'
    }
  ]
}
