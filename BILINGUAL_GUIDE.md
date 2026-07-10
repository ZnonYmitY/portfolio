# 双语网站指南 / Bilingual Website Guide

## 中文 / Chinese

### 功能特性
- 自动检测浏览器语言（优先显示中文或英文）
- 用户可点击导航栏右上角的 `EN` / `中` 按钮切换语言
- 语言选择会保存到 localStorage，下次访问时自动恢复
- 所有页面内容完全双语支持

### 如何更新内容

所有可翻译的内容都存储在 `src/i18n.ts` 文件中。该文件包含两个对象：
- `translations.en` - 英文内容
- `translations.zh` - 中文内容

**更新流程：**

1. 打开 `src/i18n.ts`
2. 找到要修改的部分（例如，如果要改 About 部分，找 `about` 对象）
3. **同时更新英文和中文版本**

**示例：** 如果要改项目描述

```typescript
projects: {
  items: [
    {
      title: 'Project Alpha',  // 英文
      description: 'A high-performance...',  // 英文
      // ...
    },
    // 然后立即在下面的中文部分也改
  ]
}
```

### 各部分对应关系

| 页面部分 | 中文名 | 文件位置 |
|---------|-------|--------|
| 导航栏 | 导航 | `nav` |
| 首页 | 首页 | `hero` |
| 关于 | 关于 | `about` |
| 技能 | 技能 | `skills` |
| 项目 | 项目 | `projects` |
| 经历 | 经历 | `experience` |
| 联系 | 联系 | `contact` |
| 页脚 | 页脚 | `footer` |

---

## English

### Features
- Auto-detects browser language (defaults to Chinese or English)
- Users can toggle via `EN` / `中` button in navbar
- Language preference saved in localStorage (persists across sessions)
- All content fully bilingual

### How to Update Content

All translatable content is in `src/i18n.ts` with two objects:
- `translations.en` - English content
- `translations.zh` - Chinese content

**Update Process:**

1. Open `src/i18n.ts`
2. Find the section to modify (e.g., `about` for the About section)
3. **Update BOTH the English and Chinese versions**

**Example:** Updating a project description

```typescript
projects: {
  items: [
    {
      title: 'Project Alpha',  // English
      description: 'A high-performance...',  // English
      // ...
    }
  ]
}
```

Then immediately update the Chinese version too.

### Section Reference

| Page Section | Chinese Name | i18n Key |
|-------------|-------------|----------|
| Navbar | 导航栏 | `nav` |
| Hero | 首页 | `hero` |
| About | 关于 | `about` |
| Skills | 技能 | `skills` |
| Projects | 项目 | `projects` |
| Experience | 经历 | `experience` |
| Contact | 联系 | `contact` |
| Footer | 页脚 | `footer` |

### Component Changes for Each Update

When updating any section, follow this pattern in the corresponding component:

```typescript
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';

export default function MyComponent() {
  const { language } = useLanguage();
  const t = translations[language];
  
  // Now use t.section.field throughout
  return <div>{t.mySection.myField}</div>;
}
```

The system is already wired up for all components. Just ensure any new text additions go through the translations object.
