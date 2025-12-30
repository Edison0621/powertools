import re

# Read the file with UTF-8 encoding
with open('src/components/TutorialViewer.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Define CSS replacements to make layout more compact
replacements = [
    # Header optimization
    (r'\.tutorial-header \{([^}]*?)padding: 16px 24px;', r'.tutorial-header {\1padding: 10px 16px;'),
    (r'\.tutorial-header \{([^}]*?)gap: 12px;', r'.tutorial-header {\1gap: 6px;'),
    
    # Tutorial title
    (r'\.tutorial-title \{([^}]*?)font-size: 24px;', r'.tutorial-title {\1font-size: 18px;'),
    
    # Tutorial info
    (r'\.tutorial-info \{([^}]*?)gap: 8px;', r'.tutorial-info {\1gap: 4px;'),
    
    # Badge
    (r'\.badge \{([^}]*?)padding: 4px 10px;', r'.badge {\1padding: 2px 6px;'),
    (r'\.badge \{([^}]*?)font-size: 12px;', r'.badge {\1font-size: 10px;'),
    (r'\.badge \{([^}]*?)border-radius: 16px;', r'.badge {\1border-radius: 10px;'),
    
    # Sidebar
    (r'\.tutorial-sidebar \{([^}]*?)width: 260px;', r'.tutorial-sidebar {\1width: 220px;'),
    (r'\.tutorial-sidebar \{([^}]*?)padding: 16px;', r'.tutorial-sidebar {\1padding: 10px;'),
    
    # Sidebar title
    (r'\.sidebar-title \{([^}]*?)font-size: 16px;', r'.sidebar-title {\1font-size: 14px;'),
    (r'\.sidebar-title \{([^}]*?)margin-bottom: 16px;', r'.sidebar-title {\1margin-bottom: 10px;'),
    
    # Chapter navigation
    (r'\.chapter-nav \{([^}]*?)margin-bottom: 24px;', r'.chapter-nav {\1margin-bottom: 16px;'),
    
    # Chapter item
    (r'\.chapter-item \{([^}]*?)margin-bottom: 8px;', r'.chapter-item {\1margin-bottom: 4px;'),
    
    # Chapter header
    (r'\.chapter-header \{([^}]*?)padding: 10px 12px;', r'.chapter-header {\1padding: 6px 8px;'),
    (r'\.chapter-header \{([^}]*?)border-radius: 8px;', r'.chapter-header {\1border-radius: 6px;'),
    
    # Chapter title
    (r'\.chapter-title \{([^}]*?)font-size: 13px;', r'.chapter-title {\1font-size: 12px;'),
    
    # Section list
    (r'\.section-list \{([^}]*?)margin-top: 6px;', r'.section-list {\1margin-top: 3px;'),
    (r'\.section-list \{([^}]*?)margin-left: 10px;', r'.section-list {\1margin-left: 6px;'),
    (r'\.section-list \{([^}]*?)padding-left: 10px;', r'.section-list {\1padding-left: 6px;'),
    
    # Section item
    (r'\.section-item \{([^}]*?)padding: 8px 12px;', r'.section-item {\1padding: 4px 8px;'),
    (r'\.section-item \{([^}]*?)font-size: 13px;', r'.section-item {\1font-size: 11px;'),
    
    # Main content area  
    (r'\.tutorial-main \{([^}]*?)padding: 24px 32px;', r'.tutorial-main {\1padding: 12px 20px;'),
    
    # Section title
    (r'\.section-title \{([^}]*?)font-size: 24px;', r'.section-title {\1font-size: 20px;'),
    (r'\.section-title \{([^}]*?)margin-bottom: 16px;', r'.section-title {\1margin-bottom: 10px;'),
    (r'\.section-title \{([^}]*?)padding-bottom: 12px;', r'.section-title {\1padding-bottom: 8px;'),
    
    # Content text
    (r'\.content-text \{([^}]*?)line-height: 1\.6;', r'.content-text {\1line-height: 1.5;'),
    (r'\.content-text \{([^}]*?)font-size: 15px;', r'.content-text {\1font-size: 13px;'),
    (r'\.content-text \{([^}]*?)margin-bottom: 24px;', r'.content-text {\1margin-bottom: 16px;'),
    
    # H2 headings
    (r'\.content-text :deep\(h2\) \{([^}]*?)font-size: 18px;', r'.content-text :deep(h2) {\1font-size: 16px;'),
    (r'\.content-text :deep\(h2\) \{([^}]*?)margin-top: 24px;', r'.content-text :deep(h2) {\1margin-top: 14px;'),
    (r'\.content-text :deep\(h2\) \{([^}]*?)margin-bottom: 12px;', r'.content-text :deep(h2) {\1margin-bottom: 8px;'),
    
    # H3 headings
   (r'\.content-text :deep\(h3\) \{([^}]*?)font-size: 16px;', r'.content-text :deep(h3) {\1font-size: 14px;'),
    (r'\.content-text :deep\(h3\) \{([^}]*?)margin-top: 20px;', r'.content-text :deep(h3) {\1margin-top: 12px;'),
    (r'\.content-text :deep\(h3\) \{([^}]*?)margin-bottom: 10px;', r'.content-text :deep(h3) {\1margin-bottom: 6px;'),
    
    # Paragraphs
    (r'\.content-text :deep\(p\) \{([^}]*?)margin-bottom: 10px;', r'.content-text :deep(p) {\1margin-bottom: 6px;'),
    
    # Lists
    (r'\.content-text :deep\(ul\) \{([^}]*?)margin-bottom: 12px;', r'.content-text :deep(ul) {\1margin-bottom: 8px;'),
    (r'\.content-text :deep\(li\) \{([^}]*?)margin-bottom: 4px;', r'.content-text :deep(li) {\1margin-bottom: 2px;'),
    
    # Code blocks
    (r'\.code-example \{([^}]*?)margin: 16px 0;', r'.code-example {\1margin: 10px 0;'),
    (r'\.code-header \{([^}]*?)padding: 8px 16px;', r'.code-header {\1padding: 4px 10px;'),
    (r'\.code-example pre \{([^}]*?)padding: 16px;', r'.code-example pre {\1padding: 10px;'),
    (r'\.code-example code \{([^}]*?)font-size: 13px;', r'.code-example code {\1font-size: 11px;'),
    (r'\.code-example code \{([^}]*?)line-height: 1\.5;', r'.code-example code {\1line-height: 1.3;'),
    
    # Navigation buttons
    (r'\.section-nav \{([^}]*?)margin-top: 40px;', r'.section-nav {\1margin-top: 24px;'),
    (r'\.section-nav \{([^}]*?)padding-top: 24px;', r'.section-nav {\1padding-top: 16px;'),
    (r'\.nav-btn \{([^}]*?)padding: 10px 24px;', r'.nav-btn {\1padding: 6px 16px;'),
    (r'\.nav-btn \{([^}]*?)font-size: 14px;', r'.nav-btn {\1font-size: 12px;'),
]

# Apply all replacements
for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write back with UTF-8 encoding
with open('src/components/TutorialViewer.vue', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Successfully updated TutorialViewer.vue with compact layout (UTF-8 encoding)")
