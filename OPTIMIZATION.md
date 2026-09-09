# 优化记录

本文件仅记录模板治理方向，不作为使用文档；当前用法以 `README.md` 与已通过的自动化命令为准。

## 本轮完成

- 统一 pnpm，声明 Node/pnpm 版本，清理冲突锁文件并刷新 lockfile。
- 启用 strict TypeScript 与安全索引检查，迁移 Loading/permission 等 JS 边界。
- 修复静态路由绕过 BasicLayout、ECharts 注册类型、全局注入 Key 等问题。
- 加入 ESLint、Prettier、Vitest、format/typecheck/check 脚本与 GitHub Actions CI。
- 环境变量去除私网地址，统一 API 前缀、代理、端口与 source map 开关。
- 更新品牌、favicon、首页、导航、暗色令牌、焦点与 reduced-motion 支持。
- 增加 store、校验工具测试和新项目替换清单。
- 删除 npm 锁文件、Vite starter、旧 tab 插件、旧 NProgress 样式等重复资产。

## 仍需按项目决策

- `umi-request` 已停止维护，新项目可评估迁移，但本轮不冒险改变现有请求语义。
- `vue-i18n` v9 已进入维护结束阶段，可在独立升级任务中迁移 v11。
- Naive UI patch 修改第三方内部文件，应逐步以业务组件替代并最终移除。
- 登录、用户、菜单与服务端权限依赖真实后端协议，模板仅提供明确接入边界。
- 后台布局已改为可伸缩左侧菜单，业务项目需按真实路由与权限数据生成菜单项。
