# Vue 3 Admin Template

基于 Vue 3 + TypeScript + Vite 的后台管理模板，集成了 Naive UI、Tailwind CSS、Pinia 状态管理和动态路由。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全
- **Vite** - 下一代前端构建工具
- **Naive UI** - Vue 3 组件库
- **Tailwind CSS** - Utility-First CSS 框架
- **Pinia** - Vue 状态管理
- **Vue Router** - Vue 3 官方路由
- **Vue i18n** - 国际化解决方案

## 项目结构

```
src/
├── api/            # API 接口层
├── assets/         # 静态资源
├── common/         # 公共组件
│   ├── VModal/     # 弹窗组件
│   ├── VEcharts/  # ECharts 图表组件
│   └── VImage/    # 图片组件
├── components/     # 业务组件
├── directives/     # 自定义指令 (v-loading, v-auth, v-drag, v-ripple)
├── layouts/        # 布局组件
├── plugins/        # 插件 (tab 管理)
├── router/         # 路由配置
├── stores/         # Pinia 状态库
├── utils/          # 工具函数
└── views/          # 页面视图
```

## 开发规范

### 组件开发约定

**表单/详情优先使用子组件模式**，而非独立路由页面：

- `VModal` - 弹窗式新增/编辑表单
- `VEcharts` - ECharts 图表组件
- `VImage` - 图片组件，支持兜底图

详细规范请参考 [CLAUDE.md](./CLAUDE.md)

### Tailwind CSS

项目已配置设计令牌，包括：

- 主色调：`primary-500: #2563EB`
- 字体：Fira Sans (正文) + Fira Code (代码/数字)
- 圆角：`rounded-sm: 6px` / `rounded: 8px` / `rounded-lg: 12px`

## 命令

```bash
pnpm dev      # 启动开发服务器
pnpm build    # TypeScript 检查 + 生产构建
pnpm preview  # 预览生产构建
```

## 架构说明

### 入口流程

`src/main.ts` → 初始化 Pinia、Router、Naive UI、i18n → 导入 `./permission` 加载路由守卫

### 路由

- Hash 模式路由 (`createWebHashHistory`)
- 动态路由由后端 API 生成 (`generatorDynamicRouter()`)
- 路由包裹 `BasicLayout` 组件
- 未匹配路径重定向到 404

### API 层 (`src/utils/request.js`)

- 使用 `umi-request` 进行网络请求
- 请求拦截器自动添加 `Authorization` 头
- 响应拦截器处理错误（401 自动跳转登录）

### 全局对象

通过 Vue provide/inject 注入的全局对象：

| 属性 | 说明 |
|------|------|
| `global.$api` | API 请求方法 |
| `global.$utils` | 工具函数集合 |
| `global.$dayjs` | dayjs 日期处理 |
| `global.$emitter` | 事件发射器 |

## 文档

- [AI视频推理平台原型图分析](./AI视频推理平台原型图分析.md) - 设计系统规范
