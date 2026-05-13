## 技术栈

| 分类 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue 3 | 3.5.24 |
| 语言 | TypeScript | 5.9.3 |
| 构建 | Vite (rolldown-vite) | 7.2.5 |
| 组件库 | Naive UI | 2.41.0 |
| 样式 | Tailwind CSS | 3.4.17 |
| 状态管理 | Pinia | 3.0.4 |
| 路由 | Vue Router | 4.6.4 |
| 国际化 | Vue i18n | 9.x |
| HTTP | umi-request | 1.4.0 |
| 图表 | ECharts | 6.0.0 |
| 日期 | dayjs | 1.11.19 |
| 图标 | IconFont | - |

## 设计规范

**设计风格**: Minimalism & Swiss Style / 浅色简约风格 / Light Theme

**色彩系统**:
- 主色调: `rgba(24, 76, 255, 1)` (蓝色) / Tailwind: `primary-500`
- 边框色: `#E2E8F0`
- 背景色: `#F8FAFC`
- 文字色: `#1E293B` / `#64748B`

**字体**: Fira Sans (正文) + Fira Code (代码/数字)

**间距系统**: 8px 网格

**圆角**: 6-12px (Tailwind: `rounded-sm` / `rounded` / `rounded-lg`)

**动效时长**: 150-300ms

## 项目结构

```
src/
├── api/                 # API 接口层
├── assets/              # 静态资源
├── common/              # 公共组件
│   ├── CheckGroup/      # 多选框组组件
│   ├── Loading/         # 加载组件
│   ├── Observer/        # Intersection Observer 组件
│   ├── VEcharts/        # ECharts 图表组件
│   ├── VImage/          # 图片组件（带兜底图）
│   ├── VModal/         # 弹窗组件（支持拖拽）
│   └── views/           # 公共视图（ErrorPage, Redirect, RouterView）
├── components/          # 业务组件
├── directives/          # 自定义指令
│   ├── auth.ts          # v-auth 权限指令
│   ├── drag.ts          # v-drag 拖拽指令
│   ├── index.ts         # 指令注册
│   ├── loading.ts       # v-loading 加载指令
│   └── ripple.ts        # v-ripple 点击涟漪效果
├── i18n/                # 国际化
│   └── locales/
│       ├── zh-CN/       # 中文翻译
│       └── en-US/       # 英文翻译
├── layouts/             # 布局组件
│   ├── BasicLayout/     # 主布局（侧边栏 + 内容区）
│   ├── Provider.vue     # Naive UI 主题提供商
│   ├── TopNav/          # 顶部导航
│   └── theme.ts         # 主题配置（CSS 变量）
├── pages/               # 页面视图
│   └── Home/            # 首页
├── plugins/             # Vue 插件
│   └── tab.js           # 标签页管理插件
├── router/              # 路由配置
├── services/            # API 服务层
├── stores/              # Pinia 状态库
│   └── system.ts        # 系统状态（主题、语言）
├── styles/              # 全局样式
│   ├── global.less      # 全局 LESS 样式
│   └── main.css         # Tailwind + 全局 CSS
├── types/               # TypeScript 类型定义
├── utils/               # 工具函数
│   ├── request.ts       # umi-request 封装
│   ├── generator-routers.ts  # 动态路由生成器
│   ├── emitter.ts       # Mitt 事件发射器
│   ├── fileExport.ts    # 文件导出工具
│   └── utils.ts         # 通用工具函数
├── App.vue              # 根组件
├── main.ts              # 应用入口
└── permission.js        # 路由守卫
```

## 公共组件

### VModal

弹窗组件，基于 `n-modal`，支持拖拽。

```vue
<VModal :show="visible" title="标题" @update:show="visible = $event" @close="handleClose">
  <template #default>内容</template>
  <template #footer>底部按钮</template>
</VModal>
```

### VEcharts

ECharts 图表组件，自动响应容器大小变化。

```vue
<VEcharts :options="chartOptions" :auto-play="true" @item-click="handleClick" />
```

### VImage

图片组件，基于 `n-image`，支持兜底图。

```vue
<VImage src="/path/to/image.jpg" fallback="/static/images/common/noImg.png" />
```

## 自定义指令

| 指令 | 说明 | 用法 |
|------|------|------|
| v-loading | 加载状态 | `<div v-loading="loading">` |
| v-auth | 权限检查 | `<button v-auth="'btn:add'">` |
| v-drag | 拖拽功能 | `<div v-drag>` |
| v-ripple | 点击涟漪 | `<button v-ripple>点击</button>` |

## 命令

```bash
pnpm dev      # 启动开发服务器（先执行 patch-package）
pnpm build    # TypeScript 检查 + 生产构建
pnpm preview  # 预览生产构建
```

**Note**: Vite 通过 pnpm overrides 被覆盖为 `rolldown-vite@7.2.5`。

## 架构说明

### 入口流程

```
main.ts → 创建 app（Pinia, Router, Naive UI, i18n）→ 导入 permission.js（路由守卫）
```

### 路由

- Hash 模式路由 (`createWebHashHistory`)
- 动态路由由后端 API 数据生成 (`generatorDynamicRouter()`)
- 页面组件通过 `import.meta.glob` 懒加载 (`/src/pages/**/*.vue`)
- 路由包裹 `BasicLayout` 组件
- 未匹配路径重定向到 404

### 状态管理 (Pinia)

```typescript
// stores/system.ts
const { sysTheme, language, toggleTheme, toggleLanguage } = useSystemStore()
```

- `sysTheme` - 主题状态（dark/light）
- `language` - 语言状态（CN/EN）
- `toggleTheme()` - 切换主题
- `toggleLanguage()` - 切换语言

### API 层

基于 `umi-request`，封装在 `src/utils/request.ts`：

- 请求拦截器：自动添加 `Authorization` 头
- 响应拦截器：200ms 延迟处理、401/5000 错误跳转登录
- 5 秒缓存、60 秒超时

```typescript
// services/test.ts
getPlanDetailList(params).then(res => { ... })

// 使用
const api = inject('global').$api
api.getPlanDetailList(params)
```

### 全局对象

通过 Vue provide/inject 注入，可在任意组件中使用：

```typescript
const global: any = inject('global')

global.$api        // API 请求方法
global.$utils      // 工具函数（toTree, flattenArray, copyText...）
global.$dayjs      // dayjs 日期处理实例
global.$emitter    // Mitt 事件发射器
```

### Naive UI 全局 API

```typescript
window.$message        // 消息提示
window.$dialog        // 对话框
window.$notification  // 通知
window.$loadingBar    // 加载进度条
```

### 标签页管理插件

```javascript
$tab.refreshPage()      // 刷新当前页
$tab.closeOpenPage()   // 关闭当前页并打开新页
$tab.closePage(path)   // 关闭指定页
$tab.closeAllPage()    // 关闭所有页
$tab.closeLeftPage()   // 关闭左侧页
$tab.closeRightPage()  // 关闭右侧页
$tab.closeOtherPage()  // 关闭其他页
$tab.openPage(url)     // 打开新页
$tab.updatePage()       // 更新当前页信息
```

### 主题系统

支持亮色/暗色主题切换，通过 `localStorage` 持久化：

```typescript
// 切换主题
toggleTheme()

// CSS 变量在 html[theme-mode="dark"] 下自动切换
// Naive UI 主题同步切换
```

### i18n 国际化

支持中文（zh-CN）和英文（en-US）：

```typescript
// 切换语言
toggleLanguage()

// 使用
const { t } = useI18n()
t('system.title')
```

### patch-package

Naive UI 已打补丁，修改位于 `patches/naive-ui+2.41.0.patch`：

- 滚动条优化
- 日期选择器月份点击
- 空状态图标
- 表单项 tooltip
- 图片预览翻转

每次 `dev` / `build` 前自动执行 `patch-package` 应用补丁。
