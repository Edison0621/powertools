const fs = require('fs');
const path = 'src/components/TutorialViewer.vue';

try {
    let content = fs.readFileSync(path, 'utf8');

    // Define replacements (regex -> replacement)
    const replacements = [
        // Header
        { r: /\.tutorial-header \{([^}]*?)padding: 16px 24px;/g, v: '.tutorial-header {$1padding: 10px 16px;' },
        { r: /\.tutorial-header \{([^}]*?)gap: 12px;/g, v: '.tutorial-header {$1gap: 6px;' },

        // Title & Info
        { r: /font-size: 24px;/g, v: 'font-size: 18px;' },
        { r: /\.tutorial-title \{([^}]*?)font-size: 24px;/g, v: '.tutorial-title {$1font-size: 18px;' },
        { r: /\.tutorial-info \{([^}]*?)gap: 8px;/g, v: '.tutorial-info {$1gap: 4px;' },

        // Badge
        { r: /\.badge \{([^}]*?)padding: 4px 10px;/g, v: '.badge {$1padding: 2px 6px;' },
        { r: /\.badge \{([^}]*?)font-size: 12px;/g, v: '.badge {$1font-size: 10px;' },
        { r: /border-radius: 16px;/g, v: 'border-radius: 10px;' },

        // Sidebar
        { r: /width: 260px;/g, v: 'width: 220px;' },
        { r: /\.tutorial-sidebar \{([^}]*?)padding: 16px;/g, v: '.tutorial-sidebar {$1padding: 10px;' },
        { r: /\.sidebar-title \{([^}]*?)font-size: 16px;/g, v: '.sidebar-title {$1font-size: 14px;' },
        { r: /\.sidebar-title \{([^}]*?)margin-bottom: 16px;/g, v: '.sidebar-title {$1margin-bottom: 10px;' },

        // Chapter Nav
        { r: /\.chapter-nav \{([^}]*?)margin-bottom: 24px;/g, v: '.chapter-nav {$1margin-bottom: 16px;' },
        { r: /\.chapter-item \{([^}]*?)margin-bottom: 8px;/g, v: '.chapter-item {$1margin-bottom: 4px;' },
        { r: /\.chapter-header \{([^}]*?)padding: 10px 12px;/g, v: '.chapter-header {$1padding: 6px 8px;' },
        { r: /\.chapter-header \{([^}]*?)border-radius: 8px;/g, v: '.chapter-header {$1border-radius: 6px;' },
        { r: /\.chapter-title \{([^}]*?)font-size: 13px;/g, v: '.chapter-title {$1font-size: 12px;' },
        { r: /\.chapter-duration \{([^}]*?)font-size: 11px;/g, v: '.chapter-duration {$1font-size: 10px;' },
        { r: /padding: 1px 5px;/g, v: 'padding: 1px 4px;' },

        // Sections
        { r: /\.section-list \{([^}]*?)margin-top: 6px;/g, v: '.section-list {$1margin-top: 3px;' },
        { r: /\.section-list \{([^}]*?)margin-left: 10px;/g, v: '.section-list {$1margin-left: 6px;' },
        { r: /\.section-list \{([^}]*?)padding-left: 10px;/g, v: '.section-list {$1padding-left: 6px;' },
        { r: /\.section-item \{([^}]*?)padding: 8px 12px;/g, v: '.section-item {$1padding: 4px 8px;' },
        { r: /\.section-item \{([^}]*?)font-size: 13px;/g, v: '.section-item {$1font-size: 11px;' },

        // Resources
        { r: /\.resources-section \{([^}]*?)margin-top: 24px;/g, v: '.resources-section {$1margin-top: 16px;' },
        { r: /\.resources-section \{([^}]*?)padding-top: 16px;/g, v: '.resources-section {$1padding-top: 12px;' },
        { r: /\.resources-section h4 \{([^}]*?)font-size: 14px;/g, v: '.resources-section h4 {$1font-size: 13px;' },
        { r: /\.resources-section h4 \{([^}]*?)margin-bottom: 12px;/g, v: '.resources-section h4 {$1margin-bottom: 8px;' },
        { r: /\.resource-link \{([^}]*?)padding: 8px 12px;/g, v: '.resource-link {$1padding: 5px 8px;' },
        { r: /\.resource-link \{([^}]*?)font-size: 13px;/g, v: '.resource-link {$1font-size: 11px;' },
        { r: /\.resource-link \{([^}]*?)margin-bottom: 6px;/g, v: '.resource-link {$1margin-bottom: 3px;' },


        // Main Content
        { r: /\.tutorial-main \{([^}]*?)padding: 24px 32px;/g, v: '.tutorial-main {$1padding: 12px 20px;' },
        { r: /\.section-title \{([^}]*?)font-size: 24px;/g, v: '.section-title {$1font-size: 20px;' },
        { r: /\.section-title \{([^}]*?)margin-bottom: 16px;/g, v: '.section-title {$1margin-bottom: 10px;' },
        { r: /\.section-title \{([^}]*?)padding-bottom: 12px;/g, v: '.section-title {$1padding-bottom: 8px;' },

        // Content Text
        { r: /\.content-text \{([^}]*?)line-height: 1\.6;/g, v: '.content-text {$1line-height: 1.5;' },
        { r: /\.content-text \{([^}]*?)font-size: 15px;/g, v: '.content-text {$1font-size: 13px;' },
        { r: /\.content-text \{([^}]*?)margin-bottom: 24px;/g, v: '.content-text {$1margin-bottom: 16px;' },

        // Headings H2
        { r: /\.content-text :deep\(h2\) \{([^}]*?)font-size: 18px;/g, v: '.content-text :deep(h2) {$1font-size: 16px;' },
        { r: /\.content-text :deep\(h2\) \{([^}]*?)margin-top: 24px;/g, v: '.content-text :deep(h2) {$1margin-top: 14px;' },
        { r: /\.content-text :deep\(h2\) \{([^}]*?)margin-bottom: 12px;/g, v: '.content-text :deep(h2) {$1margin-bottom: 8px;' },

        // Headings H3
        { r: /\.content-text :deep\(h3\) \{([^}]*?)font-size: 16px;/g, v: '.content-text :deep(h3) {$1font-size: 14px;' },
        { r: /\.content-text :deep\(h3\) \{([^}]*?)margin-top: 20px;/g, v: '.content-text :deep(h3) {$1margin-top: 12px;' },
        { r: /\.content-text :deep\(h3\) \{([^}]*?)margin-bottom: 10px;/g, v: '.content-text :deep(h3) {$1margin-bottom: 6px;' },

        // Paragraphs & Lists
        { r: /\.content-text :deep\(p\) \{([^}]*?)margin-bottom: 10px;/g, v: '.content-text :deep(p) {$1margin-bottom: 6px;' },
        { r: /\.content-text :deep\(ul\) \{([^}]*?)margin-bottom: 12px;/g, v: '.content-text :deep(ul) {$1margin-bottom: 8px;' },
        { r: /\.content-text :deep\(li\) \{([^}]*?)margin-bottom: 4px;/g, v: '.content-text :deep(li) {$1margin-bottom: 2px;' },

        // Code
        { r: /\.code-example \{([^}]*?)margin: 16px 0;/g, v: '.code-example {$1margin: 10px 0;' },
        { r: /\.code-header \{([^}]*?)padding: 8px 16px;/g, v: '.code-header {$1padding: 4px 10px;' },
        { r: /\.code-lang \{([^}]*?)font-size: 12px;/g, v: '.code-lang {$1font-size: 10px;' },
        { r: /\.copy-btn \{([^}]*?)padding: 4px 10px;/g, v: '.copy-btn {$1padding: 3px 8px;' },
        { r: /\.copy-btn \{([^}]*?)font-size: 11px;/g, v: '.copy-btn {$1font-size: 10px;' },
        { r: /\.code-example pre \{([^}]*?)padding: 16px;/g, v: '.code-example pre {$1padding: 10px;' },
        { r: /\.code-example code \{([^}]*?)font-size: 13px;/g, v: '.code-example code {$1font-size: 11px;' },
        { r: /line-height: 1\.5;/g, v: 'line-height: 1.35;' },

        // Nav Buttons
        { r: /\.section-nav \{([^}]*?)margin-top: 40px;/g, v: '.section-nav {$1margin-top: 24px;' },
        { r: /\.section-nav \{([^}]*?)padding-top: 24px;/g, v: '.section-nav {$1padding-top: 16px;' },
        { r: /\.nav-btn \{([^}]*?)padding: 10px 24px;/g, v: '.nav-btn {$1padding: 6px 16px;' },
        { r: /\.nav-btn \{([^}]*?)font-size: 14px;/g, v: '.nav-btn {$1font-size: 12px;' },
    ];

    let modified = content;
    for (const item of replacements) {
        modified = modified.replace(item.r, item.v);
    }

    fs.writeFileSync(path, modified, 'utf8');
    console.log('SUCCESS: Applied CSS optimizations with UTF-8 encoding preserved.');

} catch (err) {
    console.error('FATAL:', err);
    process.exit(1);
}
