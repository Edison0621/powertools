import htmlTutorialContent from './html-tutorial.md?raw';

// 解析 Markdown 内容为结构化数据
function parseHtmlTutorialMarkdown(content) {
  const chapters = [];
  const lines = content.split('\n');
  
  let currentChapter = null;
  let currentSection = null;
  let contentBuffer = [];
  let codeBuffer = [];
  let inCodeBlock = false;
  let skipNextH2 = false;  // 用于跳过小节标题后的重复 ## 标题
  let chapterIndex = 0;  // 章节索引
  let sectionIndex = 0;  // 小节索引
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 检测章节标题（## 开头，但不是 ### 也不是被标记跳过的）
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      // 如果是小节后的重复标题，跳过它并将其作为内容
      if (skipNextH2 && currentSection) {
        skipNextH2 = false;
        // 将这个标题作为内容的一部分
        contentBuffer.push(line);
        continue;
      }
      
      // 保存上一个章节（如果存在）
      if (currentChapter) {
        if (currentSection) {
          // 保存当前小节的内容和代码
          if (contentBuffer.length > 0) {
            currentSection.content = contentBuffer.join('\n').trim();
          }
          if (codeBuffer.length > 0) {
            currentSection.code = codeBuffer.join('\n').trim();
          }
          currentChapter.sections.push(currentSection);
        }
        chapters.push(currentChapter);
      }
      
      // 创建新章节
      const chapterTitle = line.substring(3).trim();
      chapterIndex++;
      sectionIndex = 0;  // 重置小节索引
      currentChapter = {
        id: `chapter-${chapterIndex}-${generateId(chapterTitle)}`,
        title: chapterTitle,
        description: '',
        duration: '',
        sections: []
      };
      
      currentSection = null;
      contentBuffer = [];
      codeBuffer = [];
      inCodeBlock = false;
      skipNextH2 = false;
    }
    // 检测小节标题（### 开头且以数字开头，如 1.1）
    else if (line.startsWith('### ') && /^### \d+\.\d+/.test(line)) {
      // 保存上一个小节（如果存在）
      if (currentSection) {
        if (contentBuffer.length > 0) {
          currentSection.content = contentBuffer.join('\n').trim();
        }
        if (codeBuffer.length > 0) {
          currentSection.code = codeBuffer.join('\n').trim();
        }
        currentChapter.sections.push(currentSection);
      }
      
      // 创建新小节
      const sectionTitle = line.substring(4).trim();
      sectionIndex++;
      currentSection = {
        id: `section-${chapterIndex}-${sectionIndex}-${generateId(sectionTitle)}`,
        title: sectionTitle,
        content: '',
        code: '',
      };
      
      contentBuffer = [];
      codeBuffer = [];
      inCodeBlock = false;
      skipNextH2 = true;  // 标记下一个 ## 应该被跳过
    }
    // 检测代码块开始
    else if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      if (!inCodeBlock) {
        // 代码块结束，将内容添加到相应部分
        if (currentSection && codeBuffer.length > 0) {
          currentSection.code = codeBuffer.join('\n');
          codeBuffer = [];
        }
      }
      continue; // 跳过代码块标记行
    }
    // 在代码块内
    else if (inCodeBlock && currentSection) {
      codeBuffer.push(line);
    }
    // 普通内容行
    else {
      if (currentSection) {
        contentBuffer.push(line);
      }
    }
  }
  
  // 处理最后一个章节
  if (currentChapter) {
    if (currentSection) {
      if (contentBuffer.length > 0) {
        currentSection.content = contentBuffer.join('\n').trim();
      }
      if (codeBuffer.length > 0) {
        currentSection.code = codeBuffer.join('\n').trim();
      }
      currentChapter.sections.push(currentSection);
    }
    chapters.push(currentChapter);
  }
  
  return chapters;
}

// 生成ID的辅助函数
function generateId(title) {
  // 保留数字和字母，将其他字符替换为连字符
  const id = title
    .replace(/[\s]+/g, '-')  // 空格替换为连字符
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5-]/g, '')  // 移除特殊字符，保留中文
    .replace(/-+/g, '-')  // 多个连字符合并为一个
    .replace(/^-+|-+$/g, '')  // 移除首尾的连字符
    .toLowerCase();
  
  return id || 'section-' + Math.random().toString(36).substr(2, 9);
}

export const htmlTutorial = {
  id: 'html',
  name: 'HTML 完整教程',
  version: 'HTML5',
  lastUpdated: '2024-12',
  level: '初级',
  estimatedTime: '30小时',
  
  // 从 Markdown 文件解析的章节数据
  chapters: parseHtmlTutorialMarkdown(htmlTutorialContent),
  
  // 学习资源
  resources: [
    {
      type: 'official',
      name: 'MDN HTML文档',
      url: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML'
    },
    {
      type: 'spec',
      name: 'W3C HTML规范',
      url: 'https://www.w3.org/html/'
    },
    {
      type: 'tutorial',
      name: 'HTML标准',
      url: 'https://html.spec.whatwg.org/'
    },
    {
      type: 'tool',
      name: 'W3C验证工具',
      url: 'https://validator.w3.org/'
    }
  ]
};