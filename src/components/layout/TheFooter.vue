<template>
  <footer class="footer" role="contentinfo">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-icon">🤖</span>
            <span class="logo-text">AI追梦者</span>
          </div>
          <p class="footer-desc">在线教程平台，提供丰富的编程教程和开发工具，助力每一位开发者实现梦想</p>
        </div>
        
        <div class="footer-links">
          <div class="footer-column">
            <h4>快速导航</h4>
            <a href="#" @click.prevent>全部工具</a>
            <a href="#" @click.prevent>热门教程</a>
            <a href="#" @click.prevent>开发文档</a>
          </div>
          <div class="footer-column">
            <h4>关于我们</h4>
            <a href="#" @click.prevent>关于项目</a>
            <a href="#" @click.prevent>联系我们</a>
            <a href="#" @click.prevent>反馈建议</a>
          </div>
          <div class="footer-column">
            <h4>社区</h4>
            <a href="https://github.com/Edison0621/powertools" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="#" @click.prevent>加入我们</a>
            <a href="#" @click.prevent>贡献指南</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 AI追梦者. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--card-bg);
  border-top: 1px solid var(--border-color);
  margin-top: 60px;
}

.footer-container {
  width: 100%;
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 60px 24px 30px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;
}

.footer-brand {
  max-width: 350px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text-color);
}

.footer-logo .logo-icon {
  font-size: 36px;
}

.footer-logo .logo-text {
  letter-spacing: 0.5px;
}

.footer-desc {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
  max-width: 450px;
}

.footer-links {
  display: contents;
}

.footer-column h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-color);
}

.footer-column a {
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 10px;
  transition: all 0.2s;
  padding: 4px 0;
}

.footer-column a:hover {
  color: var(--primary-color);
  padding-left: 4px;
}

.footer-bottom {
  text-align: center;
  padding-top: 24px;
  margin-top: 40px;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 13px;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 40px 20px 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer-brand {
    max-width: 100%;
  }
}
</style>
