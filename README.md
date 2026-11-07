# Qiwei Zhang · 张其炜

以「XYBERMIND 联合创始人」为主要定位的中英文个人主页。文案参考用户简历与 [XYBERMIND 团队介绍](https://www.xyber-mind.com/zh/team)，工作年限采用团队官网的 10+ 年口径。X-CAD 仅介绍产品功能、个人职责与落地成果。默认中文，右上角可切换英文并保留语言选择。GitHub 使用用户指定的 [rainbowsteins](https://github.com/rainbowsteins/)。

## 立即预览

直接用浏览器打开 `dist/preview.html`。此文件已内嵌 JavaScript、CSS 和英文字体，无需服务器或安装依赖；请保留旁边的 `resumes/` 目录，以便下载简历。

也可以运行本地服务器：

```bash
cd /x-projects/QIWEI-PERSON/qiwei-portfolio
npm run preview
```

浏览器访问 `http://localhost:4173`。用 `PORT=3000 npm run preview` 可更换端口。英文版可直接访问 `http://localhost:4173/?lang=en`。

## 开发与构建

使用 React、TypeScript、esbuild 和原生 Canvas / SVG。Node.js 20 或更高版本。

```bash
npm ci
npm run dev
```

修改后重新运行 `npm run dev`，或运行 `npm run build` 生成 `dist/` 后刷新页面。

```bash
npm run typecheck
npm run build
npm run check
```

`check` 验证两种语言的语义渲染、导航锚点、项目详情入口、GitHub 地址、简历资源和独立预览文件。检查前先构建。

## 内容与样式

- `lib/content.ts`：中英文文案、工作经历、教育、项目详情与技能。
- `app/page.tsx`：页面结构、语言切换、项目弹窗、移动端导航、邮箱复制。
- `app/globals.css`：响应式布局、视觉样式与动效。
- `components/neural-sculpture.tsx`：随指针变化的三维环结线框；离开视口后停止绘制，可手动暂停，并遵循系统减少动态效果设置。
- `public/resumes/`：用户提供的原始简历副本，未修改 DOCX 内容。
- `public/fonts/`：本地托管的 Source Sans 3 英文字体、Noto Sans SC 中文字形子集及许可证。中文不依赖访客设备预装字体。新增中文字符时，可使用 `scripts/subset-font.py` 从上游 Noto Sans SC 可变字体重新生成子集（需安装 `fonttools[woff]`）。

简历中的数字按原文呈现。机器人项目的 100% 成功率仅作为项目真机测试结果放在详情中。UTS 学业状态保留为预计 2026 年 11 月完成。

## 发布

将 `dist/` 作为网站根目录部署到静态托管平台即可，不需要数据库或 API 密钥。`preview.html` 是额外提供的独立预览，线上入口使用 `index.html`。

网站使用 GitHub Pages：**https://rainbowsteins.github.io/**。

源码仓库：https://github.com/rainbowsteins/rainbowsteins.github.io

每次推送到 `main`，`.github/workflows/pages.yml` 都会自动安装依赖、进行类型检查、构建和双语资源检查，成功后发布 `dist/`。可在仓库的 Actions 页面查看进度，也可使用 `workflow_dispatch` 手动重新发布。

本地 `.openai/` 为早期预备的托管配置，已加入 Git 忽略规则；GitHub Pages 的构建与发布不依赖该目录。
