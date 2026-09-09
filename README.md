# Vue Forge

一套可直接复制到新项目的 Vue 3 + TypeScript 中后台脚手架。它保留清晰、克制的默认界面，同时把路由、状态、国际化、请求、主题、代码质量和 CI 基线预先接好。

## 技术栈

- Vue 3.5 + TypeScript（strict）
- Vite / Rolldown Vite 7
- Vue Router 4 + Pinia 3
- Naive UI（自动按需引入）
- Tailwind CSS 3 + Less + CSS Design Tokens
- Vue I18n + dayjs
- ECharts（core 按需注册）+ Remix Icon 图标库
- ESLint 9 + Prettier 3 + Vitest 4

## 环境要求

- Node.js `>= 20.19`
- pnpm `>= 9`（仓库声明版本为 `10.20.0`）

项目只维护 `pnpm-lock.yaml`。不要再提交 npm/yarn 的锁文件。

## 快速开始

```bash
pnpm install
cp .env.example .env.development # Windows 可手动复制
pnpm dev
```

模板内置 Ant Design Pro 风格登录页，演示账号为 `admin`，密码为 `123456`。当前认证仅用于脚手架演示，新项目应替换为真实登录 API 和安全令牌策略。

提交前执行：

```bash
pnpm check
pnpm build
```

## 常用命令

| 命令                | 用途                    |
| ------------------- | ----------------------- |
| `pnpm dev`          | 启动开发服务器          |
| `pnpm typecheck`    | Vue/TypeScript 类型检查 |
| `pnpm lint:check`   | 非修改式 ESLint 检查    |
| `pnpm lint`         | ESLint 自动修复         |
| `pnpm format:check` | 检查格式                |
| `pnpm format`       | 格式化仓库文本文件      |
| `pnpm test`         | 监听模式单元测试        |
| `pnpm test:run`     | 单次运行测试            |
| `pnpm check`        | 类型 + ESLint + 测试    |
| `pnpm build`        | 类型检查后生产构建      |
| `pnpm preview`      | 本地预览构建产物        |

## 目录结构

```text
src/
├─ common/       # 与业务无关的复用组件（Loading、VEcharts、VModal 等）
├─ components/   # 项目级组件
├─ directives/   # v-auth / v-drag / v-loading / v-ripple
├─ i18n/         # 语言包与国际化实例
├─ layouts/      # 应用外壳、导航和 Provider
├─ pages/        # 路由页面
├─ router/       # 静态路由；后端菜单生成器位于 utils/
├─ services/     # 领域 API 模块
├─ stores/       # Pinia stores
├─ styles/       # 全局样式与设计令牌
├─ types/        # 全局类型、InjectionKey
└─ utils/        # 请求、导出、事件与通用工具
```

## 新项目替换清单

1. 修改 `package.json` 的 `name`、版本和仓库信息。
2. 修改 `.env.*` 中的 `VITE_APP_TITLE`、API 前缀和本地代理。
3. 替换 `public/favicon.svg` 与 `src/stores/system.ts` 中的品牌默认值。
4. 在 `src/router/index.ts` 添加真实页面，在 `src/services/` 按领域拆分接口。
5. 根据业务调整 `src/layouts/SideNav/index.vue` 的菜单分组与 Remix Icon 图标。
6. 若项目不需要数据图表，删除对应组件及 `echarts` 依赖。
7. 按业务补充登录、用户资料、服务端权限校验；模板不假定具体认证协议。
8. 检查并尽早移除 `patches/naive-ui+2.41.0.patch` 中不再需要的定制。

## 环境变量

| 变量                   | 说明                    | 默认值                  |
| ---------------------- | ----------------------- | ----------------------- |
| `VITE_APP_TITLE`       | 应用名与浏览器标题      | `Vue Forge`             |
| `VITE_API_BASE_URL`    | 浏览器请求的 API 前缀   | `/api`                  |
| `VITE_PROXY_TARGET`    | 仅开发服务器代理目标    | `http://localhost:8080` |
| `VITE_PORT`            | 开发端口                | `3031`                  |
| `VITE_BUILD_SOURCEMAP` | 是否生成生产 source map | `false`                 |

`VITE_` 变量会暴露给浏览器，禁止存储密钥。开发代理不参与生产部署；生产环境应由网关把 `VITE_API_BASE_URL` 转发到后端。

## 架构约定

### 路由与布局

静态页面统一作为 `BasicLayout` 子路由，因此导航和主要内容区行为一致。布局采用 Ant Design Pro 类似的左侧菜单 + 顶部工具栏结构，侧栏展开状态由 Pinia 持久化；窄屏自动切换为抽屉菜单。模板使用 Hash History，便于静态部署；若改为 History 模式，服务器必须将未知路径回退到 `index.html`。

### 主题与国际化

`Provider.vue` 统一同步三类主题状态：CSS 令牌、Naive UI theme 与 `html[theme-mode]`。语言切换同步 Vue I18n、Naive UI 和 dayjs，并持久化到 localStorage。

### 请求层

`src/utils/request.ts` 统一配置 API 前缀、超时、鉴权头和错误提示。示例仍使用 `umi-request` 以避免破坏已有项目行为；新项目可在保持调用接口一致的前提下评估迁移到维护活跃的请求库。

认证是业务能力而不是视觉指令：`v-auth` 只能控制界面显示，不能替代服务端鉴权。URL Token 导入仅在开发环境启用。

### Naive UI 与 ECharts

Naive UI 由 `unplugin-vue-components` 自动按需引入。`VEcharts` 默认注册 Bar、Line、Pie、Scatter 和常用组件；其他图表按需调用 `registerECharts`。

## CI 与部署

`.github/workflows/ci.yml` 会在 push 和 pull request 时执行 frozen install、类型检查、ESLint、测试与构建。

`dist/` 是纯静态产物。部署时推荐：

- `index.html` 不长期缓存；带 hash 的 `static/` 资源长期缓存。
- 网关转发 `/api`，或在构建环境覆盖 `VITE_API_BASE_URL`。
- 开启 HTTPS、安全响应头与服务端权限校验。

## 第三方补丁

`postinstall` 会应用 `patches/naive-ui+2.41.0.patch`。升级 Naive UI 前必须检查补丁是否仍能应用，并通过 `pnpm check && pnpm build`。长期建议把通用定制迁回业务组件，减少对第三方内部实现的耦合。
