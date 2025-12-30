// Angular 完整教程 - 基于最新的 Angular 17+ 和现代最佳实践
export const angularTutorial = {
  id: 'angular',
  name: 'Angular 完整教程',
  version: 'Angular 17+',
  lastUpdated: '2024-12',
  level: '中级',
  estimatedTime: '35小时',
  
  // 课程大纲
  chapters: [
    {
      id: 'intro',
      title: '第一章：Angular 入门',
      description: '了解 Angular 的基本概念和核心特性',
      duration: '4小时',
      sections: [
        {
          id: 'what-is-angular',
          title: '1.1 什么是 Angular',
          content: `
## 什么是 Angular

Angular 是一个基于 **TypeScript** 的开源 Web 应用框架，由 Google 开发和维护。它是一个**完整的框架**，提供了构建大型企业级应用所需的所有工具。

### Angular 的核心概念

- **组件化**: 基于组件的架构
- **TypeScript**: 强类型语言支持
- **依赖注入**: 强大的 DI 系统
- **模块化**: NgModule 组织应用
- **模板语法**: 声明式模板
- **响应式编程**: RxJS 支持
- **CLI 工具**: 强大的命令行工具

### Angular 的特点

**优势**:
✅ **完整框架**: 包含路由、HTTP、表单等所有功能
✅ **TypeScript**: 强类型，大型项目友好
✅ **企业级**: 适合大型复杂应用
✅ **双向绑定**: 简化表单处理
✅ **依赖注入**: 易于测试和维护
✅ **CLI 工具**: 自动化开发流程
✅ **Google 支持**: 稳定的长期支持

**适用场景**:
- 大型企业级应用
- 复杂的单页应用（SPA）
- 需要长期维护的项目
- 团队协作开发
- 对性能要求高的应用

### Angular 发展历史

- **2010**: AngularJS (Angular 1) 发布
- **2016**: Angular 2 发布，完全重写
- **2017-2019**: Angular 4-8，稳定发展
- **2020**: Angular 10-11，Ivy 编译器默认
- **2021-2022**: Angular 12-15，性能优化
- **2023**: Angular 16，Signals 引入
- **2024**: Angular 17，Standalone 组件默认

### Angular 17+ 的重要特性

✅ **Standalone 组件**: 不再需要 NgModule
✅ **Signals**: 新的响应式原语
✅ **控制流**: 新的 @if、@for 语法
✅ **延迟加载**: 内置的 @defer
✅ **Hydration**: 改进的 SSR 水合
✅ **Vite 支持**: 更快的开发服务器
✅ **性能优化**: 更快的构建和运行时
✅ **开发体验**: 更好的错误提示
          `,
          code: `// Angular 基本示例

// 1. Standalone 组件（Angular 17+）
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="hello">
      <h1>{{ title }}</h1>
      <p>{{ message }}</p>
    </div>
  \`,
  styles: [\`
    .hello {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
  \`]
})
export class HelloComponent {
  title = 'Hello Angular';
  message = '欢迎来到 Angular 17+';
}

// ========================================

// 2. 计数器组件示例
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <div class="counter">
      <h2>计数器</h2>
      <p>当前计数: {{ count() }}</p>
      <button (click)="increment()">增加</button>
      <button (click)="decrement()">减少</button>
      <button (click)="reset()">重置</button>
    </div>
  \`
})
export class CounterComponent {
  // 使用 Signals（Angular 16+）
  count = signal(0);

  increment() {
    this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update(value => value - 1);
  }

  reset() {
    this.count.set(0);
  }
}

// ========================================

// 3. 属性绑定和事件处理
@Component({
  selector: 'app-user-card',
  standalone: true,
  template: \`
    <div class="card">
      <h3>{{ user.name }}</h3>
      <p>年龄: {{ user.age }}</p>
      <button 
        [disabled]="!user.isActive"
        (click)="handleClick()"
      >
        {{ user.isActive ? '激活' : '未激活' }}
      </button>
    </div>
  \`
})
export class UserCardComponent {
  user = {
    name: '张三',
    age: 25,
    isActive: true
  };

  handleClick() {
    console.log('用户:', this.user.name);
  }
}

// ========================================

// 4. 新的控制流语法（Angular 17+）
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="user-list">
      <!-- 新的 @if 语法 -->
      @if (users.length > 0) {
        <h2>用户列表</h2>
        
        <!-- 新的 @for 语法 -->
        <ul>
          @for (user of users; track user.id) {
            <li>{{ user.name }} - {{ user.email }}</li>
          }
        </ul>
      } @else {
        <p>暂无用户</p>
      }
    </div>
  \`
})
export class UserListComponent {
  users = [
    { id: 1, name: '张三', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', email: 'lisi@example.com' },
    { id: 3, name: '王五', email: 'wangwu@example.com' }
  ];
}

// ========================================

// 5. 表单处理
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <form (ngSubmit)="onSubmit()">
      <div>
        <label for="username">用户名:</label>
        <input
          id="username"
          type="text"
          [(ngModel)]="username"
          name="username"
          required
        />
      </div>
      
      <div>
        <label for="password">密码:</label>
        <input
          id="password"
          type="password"
          [(ngModel)]="password"
          name="password"
          required
        />
      </div>
      
      <button type="submit">登录</button>
    </form>
  \`
})
export class LoginFormComponent {
  username = '';
  password = '';

  onSubmit() {
    console.log('登录:', this.username, this.password);
  }
}

// ========================================

// 6. 服务和依赖注入
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // 单例服务
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(\`\${this.apiUrl}/\${id}\`);
  }
}

// 在组件中使用服务
@Component({
  selector: 'app-user-data',
  standalone: true,
  template: \`
    <div>
      @if (loading) {
        <p>加载中...</p>
      } @else if (error) {
        <p>错误: {{ error }}</p>
      } @else {
        <p>用户数量: {{ users.length }}</p>
      }
    </div>
  \`
})
export class UserDataComponent {
  users: any[] = [];
  loading = true;
  error = '';

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}`
        },
        {
          id: 'environment-setup',
          title: '1.2 开发环境搭建',
          content: `
## 开发环境搭建

### 安装 Node.js

Angular 需要 Node.js 环境：

1. 访问 [nodejs.org](https://nodejs.org)
2. 下载并安装 LTS 版本（推荐 18.x 或更高）
3. 验证安装：\`node -v\` 和 \`npm -v\`

### 安装 Angular CLI

全局安装 Angular CLI：

\`\`\`bash
npm install -g @angular/cli@latest
\`\`\`

验证安装：
\`\`\`bash
ng version
\`\`\`

### 创建 Angular 项目

**使用 Angular CLI**:

\`\`\`bash
ng new my-angular-app
\`\`\`

**配置选项**:
- **路由**: Yes
- **样式**: CSS / SCSS / Less / Sass
- **Standalone**: Yes（推荐，Angular 17+）
- **SSR**: 是否需要服务端渲染

**启动开发服务器**:
\`\`\`bash
cd my-angular-app
ng serve
\`\`\`

访问 http://localhost:4200

### 项目结构

\`\`\`
my-angular-app/
├── node_modules/
├── src/
│   ├── app/
│   │   ├── app.component.ts      # 根组件
│   │   ├── app.component.html    # 根模板
│   │   ├── app.component.css     # 根样式
│   │   ├── app.config.ts         # 应用配置
│   │   └── app.routes.ts         # 路由配置
│   ├── assets/                   # 静态资源
│   ├── index.html                # HTML 入口
│   ├── main.ts                   # TypeScript 入口
│   └── styles.css                # 全局样式
├── angular.json                  # Angular 配置
├── tsconfig.json                 # TypeScript 配置
├── package.json                  # 项目依赖
└── .gitignore
\`\`\`

### 开发工具推荐

**编辑器**:
- **Visual Studio Code**（最推荐）
- **WebStorm**（专业 IDE）

**VS Code 扩展**:
- **Angular Language Service** - Angular 语法支持
- **Angular Snippets** - 代码片段
- **Prettier** - 代码格式化
- **ESLint** - 代码检查
- **Angular DevTools** - 浏览器扩展

### Angular CLI 常用命令

**生成代码**:
\`\`\`bash
ng generate component user-list    # 生成组件
ng generate service user           # 生成服务
ng generate module shared          # 生成模块
ng generate directive highlight    # 生成指令
ng generate pipe uppercase         # 生成管道
ng generate guard auth             # 生成路由守卫
\`\`\`

**简写**:
\`\`\`bash
ng g c user-list    # 生成组件
ng g s user         # 生成服务
\`\`\`

**构建和测试**:
\`\`\`bash
ng build              # 生产构建
ng build --prod       # 优化构建
ng test               # 运行单元测试
ng e2e                # 运行端到端测试
ng lint               # 代码检查
\`\`\`

### angular.json 配置

\`\`\`json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/my-app",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": ["src/assets"],
            "styles": ["src/styles.css"],
            "scripts": []
          }
        },
        "serve": {
          "options": {
            "port": 4200,
            "open": true
          }
        }
      }
    }
  }
}
\`\`\`

### 环境配置

**环境文件**（Angular 15+）:
\`\`\`typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com'
};
\`\`\`
          `,
          code: `// ========== main.ts - 应用入口 ==========
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));

// ========================================

// ========== app.config.ts - 应用配置 ==========
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};

// ========================================

// ========== app.component.ts - 根组件 ==========
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: \`
    <div class="app">
      <header>
        <h1>{{ title }}</h1>
        <nav>
          <a routerLink="/">首页</a>
          <a routerLink="/about">关于</a>
          <a routerLink="/users">用户</a>
        </nav>
      </header>
      
      <main>
        <router-outlet />
      </main>
      
      <footer>
        <p>&copy; 2024 My Angular App</p>
      </footer>
    </div>
  \`,
  styles: [\`
    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    header {
      background: #1976d2;
      color: white;
      padding: 1rem;
    }
    
    nav a {
      color: white;
      margin: 0 1rem;
      text-decoration: none;
    }
    
    main {
      flex: 1;
      padding: 2rem;
    }
    
    footer {
      background: #f5f5f5;
      padding: 1rem;
      text-align: center;
    }
  \`]
})
export class AppComponent {
  title = 'My Angular App';
}

// ========================================

// ========== app.routes.ts - 路由配置 ==========
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', redirectTo: '' } // 404 重定向
];

// ========================================

// ========== package.json ==========
{
  "name": "my-angular-app",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^17.0.0",
    "@angular/common": "^17.0.0",
    "@angular/compiler": "^17.0.0",
    "@angular/core": "^17.0.0",
    "@angular/forms": "^17.0.0",
    "@angular/platform-browser": "^17.0.0",
    "@angular/platform-browser-dynamic": "^17.0.0",
    "@angular/router": "^17.0.0",
    "rxjs": "^7.8.0",
    "tslib": "^2.6.0",
    "zone.js": "^0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^17.0.0",
    "@angular/cli": "^17.0.0",
    "@angular/compiler-cli": "^17.0.0",
    "@types/node": "^20.10.0",
    "typescript": "~5.2.0"
  }
}

// ========================================

// ========== tsconfig.json ==========
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": ["ES2022", "dom"]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

// ========================================

// ========== 环境配置 ==========
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  apiKey: 'dev-api-key'
};

// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com',
  apiKey: 'prod-api-key'
};

// 在组件中使用
import { environment } from '../environments/environment';

console.log('API URL:', environment.apiUrl);`
        }
      ]
    },
    {
      id: 'components',
      title: '第二章：组件基础',
      description: '掌握 Angular 组件的创建和使用',
      duration: '6小时',
      sections: [
        {
          id: 'component-basics',
          title: '2.1 组件基础',
          content: `
## 组件基础

组件是 Angular 应用的基本构建块。

### 组件的组成

一个 Angular 组件由以下部分组成：

1. **TypeScript 类**: 组件逻辑
2. **HTML 模板**: 视图
3. **CSS 样式**: 样式
4. **元数据**: @Component 装饰器

### 创建组件

**使用 CLI**:
\`\`\`bash
ng generate component user-card
# 或简写
ng g c user-card
\`\`\`

**手动创建**:
\`\`\`typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: \`<h1>{{ title }}</h1>\`,
  styles: [\`h1 { color: blue; }\`]
})
export class UserCardComponent {
  title = 'User Card';
}
\`\`\`

### 组件装饰器

\`\`\`typescript
@Component({
  selector: 'app-root',           // CSS 选择器
  standalone: true,               // 独立组件
  imports: [CommonModule],        // 导入依赖
  templateUrl: './app.component.html',  // 外部模板
  styleUrls: ['./app.component.css'],   // 外部样式
  // 或者内联
  template: \`<h1>{{ title }}</h1>\`,
  styles: [\`h1 { color: red; }\`]
})
\`\`\`

### 数据绑定

**1. 插值 {{ }}**:
\`\`\`html
<h1>{{ title }}</h1>
<p>{{ 1 + 1 }}</p>
<p>{{ user.name }}</p>
\`\`\`

**2. 属性绑定 [property]**:
\`\`\`html
<img [src]="imageUrl" [alt]="imageAlt">
<button [disabled]="isDisabled">按钮</button>
\`\`\`

**3. 事件绑定 (event)**:
\`\`\`html
<button (click)="handleClick()">点击</button>
<input (input)="onInput($event)">
\`\`\`

**4. 双向绑定 [(ngModel)]**:
\`\`\`html
<input [(ngModel)]="username">
\`\`\`

### 组件通信

**父传子 - @Input()**:
\`\`\`typescript
// 子组件
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: \`<p>{{ message }}</p>\`
})
export class ChildComponent {
  @Input() message: string = '';
}

// 父组件模板
<app-child [message]="parentMessage"></app-child>
\`\`\`

**子传父 - @Output()**:
\`\`\`typescript
// 子组件
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: \`<button (click)="sendMessage()">发送</button>\`
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit('Hello from child');
  }
}

// 父组件模板
<app-child (messageEvent)="receiveMessage($event)"></app-child>
\`\`\`

### 组件生命周期

\`\`\`typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  template: \`<p>Lifecycle Demo</p>\`
})
export class LifecycleComponent implements OnInit, OnDestroy {
  ngOnInit() {
    console.log('组件初始化');
  }

  ngOnDestroy() {
    console.log('组件销毁');
  }
}
\`\`\`

**主要生命周期钩子**:
- \`ngOnInit\`: 组件初始化
- \`ngOnChanges\`: 输入属性变化
- \`ngDoCheck\`: 变更检测
- \`ngAfterViewInit\`: 视图初始化完成
- \`ngOnDestroy\`: 组件销毁前
          `,
          code: `// ========== 组件基础示例 ==========

import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 1. 基础组件
@Component({
  selector: 'app-greeting',
  standalone: true,
  template: \`
    <div class="greeting">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <p>当前时间: {{ currentTime }}</p>
    </div>
  \`,
  styles: [\`
    .greeting {
      padding: 20px;
      border: 2px solid #1976d2;
      border-radius: 8px;
      background: #f5f5f5;
    }
  \`]
})
export class GreetingComponent {
  title = '欢迎';
  message = '这是一个基础 Angular 组件';
  currentTime = new Date().toLocaleString();
}

// ========================================

// 2. 数据绑定示例
@Component({
  selector: 'app-binding-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: \`
    <div class="binding-demo">
      <h3>数据绑定示例</h3>
      
      <!-- 插值绑定 -->
      <p>用户名: {{ username }}</p>
      <p>计算: {{ 1 + 1 }}</p>
      
      <!-- 属性绑定 -->
      <img [src]="imageUrl" [alt]="imageAlt" width="100">
      <button [disabled]="isDisabled">{{ buttonText }}</button>
      
      <!-- 事件绑定 -->
      <button (click)="handleClick()">点击我</button>
      <button (click)="count = count + 1">增加: {{ count }}</button>
      
      <!-- 双向绑定 -->
      <input [(ngModel)]="username" placeholder="输入用户名">
      <p>你输入的是: {{ username }}</p>
      
      <!-- Class 绑定 -->
      <div [class.active]="isActive">激活状态</div>
      <div [class]="currentClasses">多个类</div>
      
      <!-- Style 绑定 -->
      <p [style.color]="textColor">彩色文本</p>
      <p [style.font-size.px]="fontSize">可变字体</p>
    </div>
  \`,
  styles: [\`
    .active {
      color: green;
      font-weight: bold;
    }
    
    .highlight {
      background: yellow;
    }
  \`]
})
export class BindingDemoComponent {
  username = '张三';
  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.png';
  imageAlt = 'Angular Logo';
  isDisabled = false;
  buttonText = '可用按钮';
  count = 0;
  isActive = true;
  currentClasses = 'highlight';
  textColor = 'blue';
  fontSize = 16;

  handleClick() {
    alert('按钮被点击！');
    this.isDisabled = !this.isDisabled;
    this.buttonText = this.isDisabled ? '禁用按钮' : '可用按钮';
  }
}

// ========================================

// 3. 父子组件通信
// 子组件
@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="child">
      <h4>子组件</h4>
      <p>来自父组件的消息: {{ messageFromParent }}</p>
      <p>子组件计数: {{ childCount }}</p>
      <button (click)="sendToParent()">发送消息给父组件</button>
      <button (click)="increment()">增加</button>
    </div>
  \`,
  styles: [\`
    .child {
      border: 2px dashed #4caf50;
      padding: 15px;
      margin: 10px 0;
    }
  \`]
})
export class ChildComponent {
  @Input() messageFromParent: string = '';
  @Output() messageToParent = new EventEmitter<string>();
  @Output() countChange = new EventEmitter<number>();
  
  childCount = 0;

  sendToParent() {
    this.messageToParent.emit('你好，父组件！来自子组件的问候。');
  }

  increment() {
    this.childCount++;
    this.countChange.emit(this.childCount);
  }
}

// 父组件
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, ChildComponent],
  template: \`
    <div class="parent">
      <h3>父组件</h3>
      <input [(ngModel)]="parentMessage" placeholder="输入消息">
      <button (click)="updateMessage()">更新子组件消息</button>
      
      <p>来自子组件的消息: {{ childMessage }}</p>
      <p>子组件计数: {{ childCount }}</p>
      
      <app-child
        [messageFromParent]="messageToChild"
        (messageToParent)="receiveFromChild($event)"
        (countChange)="onCountChange($event)"
      ></app-child>
    </div>
  \`,
  styles: [\`
    .parent {
      border: 2px solid #2196f3;
      padding: 20px;
      margin: 10px 0;
    }
  \`]
})
export class ParentComponent {
  parentMessage = '';
  messageToChild = '初始消息';
  childMessage = '';
  childCount = 0;

  updateMessage() {
    this.messageToChild = this.parentMessage;
  }

  receiveFromChild(message: string) {
    this.childMessage = message;
  }

  onCountChange(count: number) {
    this.childCount = count;
  }
}

// ========================================

// 4. 使用 Signals（Angular 16+）
@Component({
  selector: 'app-signals-demo',
  standalone: true,
  template: \`
    <div class="signals-demo">
      <h3>Signals 示例</h3>
      <p>计数: {{ count() }}</p>
      <p>双倍: {{ doubled() }}</p>
      <p>描述: {{ description() }}</p>
      
      <button (click)="increment()">增加</button>
      <button (click)="reset()">重置</button>
    </div>
  \`
})
export class SignalsDemoComponent {
  // Signal
  count = signal(0);
  
  // Computed Signal
  doubled = computed(() => this.count() * 2);
  description = computed(() => 
    \`当前计数是 \${this.count()}，双倍是 \${this.doubled()}\`
  );

  increment() {
    this.count.update(value => value + 1);
  }

  reset() {
    this.count.set(0);
  }
}

// ========================================

// 5. 生命周期钩子
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  template: \`
    <div class="lifecycle">
      <h3>生命周期示例</h3>
      <p>查看控制台输出</p>
      <p>计数器: {{ counter }}</p>
    </div>
  \`
})
export class LifecycleComponent implements OnInit, AfterViewInit, OnDestroy {
  counter = 0;
  private interval: any;

  constructor() {
    console.log('1. Constructor - 组件构造');
  }

  ngOnInit() {
    console.log('2. ngOnInit - 组件初始化');
    this.interval = setInterval(() => {
      this.counter++;
    }, 1000);
  }

  ngAfterViewInit() {
    console.log('3. ngAfterViewInit - 视图初始化完成');
  }

  ngOnDestroy() {
    console.log('4. ngOnDestroy - 组件销毁');
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

import { computed } from '@angular/core';`
        }
      ]
    }
  ],

  // 学习资源
  resources: [
    {
      name: 'Angular 官方文档',
      url: 'https://angular.io/'
    },
    {
      name: 'Angular 中文文档',
      url: 'https://angular.cn/'
    },
    {
      name: 'Angular CLI',
      url: 'https://cli.angular.io/'
    },
    {
      name: 'Angular Material',
      url: 'https://material.angular.io/'
    },
    {
      name: 'RxJS 文档',
      url: 'https://rxjs.dev/'
    },
    {
      name: 'Angular University',
      url: 'https://angular-university.io/'
    }
  ],

  // 练习项目
  projects: [
    {
      id: 'todo-app',
      name: 'Todo 应用',
      difficulty: '初级',
      description: '创建待办事项应用，练习组件和数据绑定'
    },
    {
      id: 'user-management',
      name: '用户管理系统',
      difficulty: '中级',
      description: '完整的用户 CRUD 系统，包含表单验证'
    },
    {
      id: 'dashboard',
      name: '数据仪表板',
      difficulty: '中级',
      description: '数据可视化仪表板，使用图表和路由'
    },
    {
      id: 'e-commerce',
      name: '电商管理平台',
      difficulty: '高级',
      description: '企业级电商管理系统，包含完整功能'
    }
  ]
}
