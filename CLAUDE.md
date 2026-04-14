# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue 3 + TypeScript + Vite admin template with Naive UI component library, Pinia state management, and dynamic routing from backend API.

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
- User store (`@/store/user`) - User/auth state (expected but not yet created)

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

- 基于 `n-modal`，支持拖拽
- Props：`show`（显示状态）、`title`（标题）
- 事件：`update:show`、`close`
- Slots：`default`（内容）、`footer`（底部按钮）

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
- **State**: pinia 3.x
- **Router**: vue-router 4.x
- **i18n**: vue-i18n 9.x
- **HTTP**: umi-request
- **Build**: Vite (rolldown-vite), TypeScript, vue-tsc
