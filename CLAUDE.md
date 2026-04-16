# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目参考文档

**⚠️ 重要**: 开发前必须阅读并遵循以下设计规范文档：

| 文档 | 路径 | 说明 |
|------|------|------|
| AI视频推理平台原型图分析 | `D:\zzh\AI视频推理平台原型图分析.md` | 完整的设计系统规范，包括色彩、字体、间距、组件样式等 |

### 设计系统要点（详见上方文档）

- **设计风格**: Minimalism & Swiss Style / 浅色简约风格 / Light Theme
- **主色调**: `#2563EB` (蓝色)
- **字体**: Fira Sans (正文) + Fira Code (代码/数字)
- **间距系统**: 8px 网格
- **圆角**: 6-12px
- **阴影**: 轻量白色阴影
- **动效时长**: 150-300ms

### 页面开发优先级

1. **高优先级**: 首页、告警中心、任务中心
2. **中优先级**: 新增任务、算法中心、告警详情
3. **低优先级**: 设备管理、算法分类、告警处置

### 样式开发规范

**优先使用 Tailwind CSS** 进行页面样式开发。

#### Tailwind CSS 配置

项目已配置 Tailwind CSS，包含以下设计令牌：

```js
// 颜色
primary-500: #2563EB (主色)
success: #059669
warning: #D97706
error: #DC2626
gray-50 ~ gray-900

// 字体
font-sans: Fira Sans
font-mono: Fira Code

// 圆角
rounded-sm: 6px
rounded: 8px
rounded-lg: 12px

// 阴影
shadow-card: 0 1px 2px rgba(0, 0, 0, 0.05)
shadow-card-hover: 0 4px 12px rgba(37, 99, 235, 0.1)
```

#### Tailwind 使用示例

```vue
<!-- 页面容器 -->
<div class="min-h-screen bg-gray-50 p-6">

<!-- 卡片 -->
<div class="bg-white rounded-lg border border-gray-200 shadow-card p-6">

<!-- 按钮 -->
<n-button class="bg-primary-500 text-white hover:bg-primary-600">

<!-- 文字 -->
<span class="text-gray-500 font-mono text-sm">代码</span>

<!-- Flex 布局 -->
<div class="flex items-center justify-between gap-4">
```

#### 组件开发规范

- 优先使用 Naive UI 组件，参照文档中的样式规范
- 页面布局和自定义样式**优先使用 Tailwind CSS**
- 使用子组件模式开发表单和详情页面（见下方组件使用约定）

## Project Overview

Vue 3 + TypeScript + Vite admin template with Naive UI component library, Tailwind CSS, Pinia state management, and dynamic routing from backend API.

## Commands

```bash
pnpm dev      # Start dev server (runs patch-package first)
pnpm build    # TypeScript check + production build
pnpm preview  # Preview production build
```

**Note**: Vite is overridden via pnpm overrides to use `rolldown-vite@7.2.5`.

## Architecture

### Entry Flow
`src/main.ts` → creates app with Pinia, Router, Naive UI, i18n → imports `./permission` for router guards

### Routing
- Hash-based routing (`createWebHashHistory`)
- Dynamic routes generated from backend API via `generatorDynamicRouter()` in `src/utils/generator-routers.js`
- Routes wrap around `BasicLayout` component
- 404 redirect for unmatched paths

### State Management (Pinia)
- `src/stores/system.ts` - Theme (dark/light), language, system info
- TagsView store (`@/store/tagsView`) - Tab navigation state (expected but not yet created)
- User store (`@/store/user` - User store for auth (expected but not yet created)

### Custom Directives (`src/directives/`)
- `v-loading` - Loading state
- `v-auth` - Button permission (works with `authList` from user store)
- `v-drag` - Drag functionality
- `v-ripple` - Click ripple effect

### API Layer (`src/utils/request.js`)
- Uses `umi-request` with `extend()` for configuration
- Request interceptor adds `Authorization` header from localStorage token
- Response interceptor handles errors (notification for API errors, auto-redirect for 401/5000)
- Dev proxy: `/keer-api` → `http://192.168.0.73`

### Global Object (app.global)

全局对象通过 Vue provide/inject 注入，可在任意组件中使用：

```ts
const global: any = inject("global")
```

**可用属性：**

| 属性 | 说明 |
|------|------|
| `global.$api` | API 请求方法 |
| `global.$utils` | 工具函数集合 |
| `global.$dayjs` | dayjs 日期处理实例 |
| `global.$emitter` | 事件发射器 |

**使用示例：**
```ts
// API 调用
const res = await global.$api.getUserInfo()

// 工具函数
const formattedDate = global.$dayjs().format('YYYY-MM-DD')

// 事件通信
global.$emitter.emit('refresh-list')
```

### Theme System (`src/layouts/theme.ts`)
- CSS variables for light/dark themes
- Naive UI theme overrides via `n-config-provider`
- Dark mode toggled via `theme-mode` attribute on `<html>`

### i18n (`src/i18n/`)
- vue-i18n with Chinese (zh-CN) and English (en-US) locales
- Legacy mode disabled

### Patches
`patches/naive-ui+2.41.0.patch` - Modifies naive-ui internals (scrollbar, date-picker, empty, form, image). **Run `patch-package` after installing dependencies**.

## Component Usage Conventions

### 表单/详情优先使用子组件模式

新增表单和详情页面**优先以子组件方式调用**，而非新建独立路由页面。

**弹框组件**：优先使用 `@/common/VModal/index.vue`
- 基于 `n-modal`，支持拖拽
- Props：`show`（显示状态）、`title`（标题）
- 事件：`update:show`、`close`
- Slots：`default`（内容）、`footer`（底部按钮）

**图表组件**：优先使用 `@/common/VEcharts/index.vue`
- Props：`options`（ECharts 配置）、`autoPlay`（自动播放，默 false）
- 事件：`itemClick`（点击图表数据项）
- Features：自动响应容器大小变化、内置默认配色、支持自动播放动画

**图片组件**：优先使用 `@/common/VImage/index.vue`
- 基于 `n-image`
- Props：`fallback`（兜底图，默认 `static/images/common/noImg.png`）
- Slots：`placeholder`（加载中占位）
- 继承 `$attrs` 透传 `width`、`object-fit` 等属性

**适用场景**：
- 弹窗式新增/编辑表单
- 抽屉式详情查看
- 内嵌在列表页的快速编辑

**组件组织**：
```
src/views/xxx/
├── List.vue              # 列表页
├── components/
│   ├── FormDrawer.vue     # 新增/编辑抽屉组件
│   └── DetailDrawer.vue   # 详情抽屉组件
```

**调用方式**：通过 `ref` 调用子组件暴露的方法来控制显示
```vue
<!-- List.vue -->
<template>
  <FormDrawer ref="formDrawerRef" />
  <DetailDrawer ref="detailDrawerRef" />
</template>

<script setup>
const formDrawerRef = ref()
const detailDrawerRef = ref()

// 打开新增
const openAdd = () => formDrawerRef.value?.open()

// 打开编辑
const openEdit = (id) => formDrawerRef.value?.open(id)

// 打开详情
const openDetail = (id) => detailDrawerRef.value?.open(id)
</script>
```

```vue
<!-- components/FormDrawer.vue -->
<script setup>
const visible = ref(false)
const currentId = ref(null)

const open = (id) => {
  currentId.value = id
  visible.value = true
}

defineExpose({ open })
</script>
```

**优点**：
- 父组件完全掌控子组件的显示逻辑
- 子组件内部状态独立，不依赖父组件的响应式变量
- 交互清晰：`open(id)` 表示打开，`close()` 等方法由子组件定义

## Key Files

| File | Purpose |
|------|---------|
| `src/permission.js` | Router guards, title setting, token handling |
| `src/utils/generator-routers.js` | Converts backend menu data to Vue Router routes |
| `src/plugins/tab.js` | Tab management (refresh, close, open pages) |
| `src/layouts/Provider.vue` | Root layout with Naive UI providers and theme |

## Missing Modules

The codebase references modules that don't exist yet:
- `@/store/tagsView` - TagsView store for tab management
- `@/store/user` - User store for auth
- `@/config` - Configuration module

## Dependencies

- **UI**: naive-ui 2.41.0 (patched)
- **CSS**: Tailwind CSS 3.x (已配置项目设计令牌)
- **State**: pinia 3.x
- **Router**: vue-router 4.x
- **i18n**: vue-i18n 9.x
- **HTTP**: umi-request
- **Build**: Vite (rolldown-vite), TypeScript, vue-tsc
