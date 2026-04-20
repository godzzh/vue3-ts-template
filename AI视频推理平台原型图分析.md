# AI 视频推理平台 - Axure 原型图详细分析

> 分析日期：2026-04-15
> 原型工具：Axure RP 9
> 设计系统：Minimalism & Swiss Style / Enterprise Dashboard
> 设计风格：浅色简约风格 / Clean Minimal / Light Theme

---

## 一、项目概述

这是一个**智慧园区视频 AI 分析平台**的完整原型系统，用于工业园区、商业综合体或城市安防场景下的视频监控与智能分析。系统核心功能包括：设备接入管理、AI 算法调度、实时视频监控、告警检测与处置、任务配置等。

### 技术定位

| 维度 | 规范 |
|-----|------|
| 前端技术栈 | HTML + CSS + JavaScript (Axure 原生) |
| 设计风格 | Minimalism & Swiss Style / Enterprise Dashboard |
| 视觉特点 | 简洁留白 / 轻量阴影 / 柔和圆角 / 蓝色主调 |
| 用户场景 | 监控室 / 安防指挥中心 |
| 导航模式 | 顶部水平导航栏 |
| 性能目标 | ⚡ Excellent |
| 可访问性 | ✓ WCAG AA |

---

## 二、设计系统 (Design System)

### 2.1 设计语言

**风格名称**: Minimalism & Swiss Style

**核心关键词**: Clean, simple, spacious, functional, white space, high contrast, geometric, sans-serif, grid-based, essential

**最佳适用场景**: Enterprise apps, dashboards, documentation sites, SaaS platforms, professional tools

### 2.2 色彩系统 (Color Palette)

#### 主色板 (Primary Palette)

| 角色 | 色值 | 用途 |
|------|------|------|
| Primary | `#2563EB` | 品牌色、按钮、链接 |
| Primary Hover | `#3B82F6` | hover 状态 |
| Primary Active | `#1D4ED8` | active 状态 |
| CTA | `#F97316` | 行动召唤按钮 |
| Primary Background | `#EFF6FF` | 浅蓝色背景 |

#### 功能色 (Semantic Colors)

| 角色 | 色值 | 浅色背景 | 说明 |
|------|------|---------|------|
| Success | `#10B981` | `#ECFDF5` | 正常、已处置 |
| Warning | `#F59E0B` | `#FFFBEB` | 待处理、进行中 |
| Danger | `#EF4444` | `#FEF2F2` | 告警、异常、紧急 |
| Info | `#6366F1` | `#EEF2FF` | 提示、说明 |

#### 中性色 (Neutral Palette)

| 角色 | 色值 | 说明 |
|------|------|------|
| Background | `#F8FAFC` | 页面背景（浅灰蓝） |
| Surface | `#FFFFFF` | 卡片、面板 |
| Border | `#E2E8F0` | 分割线、边框 |
| Border Hover | `#CBD5E1` | 悬停边框 |
| Text Primary | `#1E293B` | 主要文字 |
| Text Secondary | `#64748B` | 次要文字 |
| Text Muted | `#94A3B8` | 占位符、禁用 |

### 2.3 字体系统 (Typography)

**字体栈**: Fira Sans (Body) + Fira Code (Headings/Code)

**Google Fonts**:
```css
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=swap');
```

| 层级 | 字体 | 字号 | 字重 | 用途 |
|------|------|------|------|------|
| h1 | Fira Sans | 24px | 600 | 页面标题 |
| h2 | Fira Sans | 20px | 600 | 模块标题 |
| h3 | Fira Sans | 16px | 600 | 卡片标题 |
| Body | Fira Sans | 14px | 400 | 正文 |
| Small | Fira Sans | 12px | 400 | 辅助说明 |
| Tiny | Fira Sans | 11px | 500 | 标签、徽章 |
| Code | Fira Code | 14px | 400 | 编号、阈值 |

**Mood**: dashboard, data, analytics, code, technical, precise

### 2.4 间距系统 (Spacing)

基于 **8px** 网格系统：

| 名称 | 值 | 用途 |
|------|-----|------|
| xs | 4px | 紧凑元素间距 |
| sm | 8px | 小间距 |
| md | 16px | 标准间距 |
| lg | 24px | 模块间距 |
| xl | 32px | 大区块间距 |
| 2xl | 48px | 页面边距 |

### 2.5 圆角系统 (Border Radius)

| 组件 | 圆角值 | 说明 |
|------|--------|------|
| 按钮 | 8px | 简洁圆角 |
| 输入框 | 8px | 与按钮一致 |
| 卡片 | 12px | 标准圆角 |
| 弹窗 | 16px | 较大圆角 |
| 头像 | 50% | 圆形 |
| 标签/徽章 | 6px | - |

### 2.6 阴影系统 (Shadow System)

```css
/* 浅色模式 - 轻量阴影 */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);

/* 悬停阴影 */
--shadow-hover: 0 8px 16px -4px rgba(0, 0, 0, 0.1);

/* 蓝色主题阴影 */
--shadow-primary: 0 4px 12px rgba(37, 99, 235, 0.15);
```

### 2.7 动效规范 (Animation)

| 类型 | 时长 | 说明 |
|------|------|------|
| 微交互 | 150-250ms | Hover、Focus 等 |
| 状态切换 | 200-300ms | 展开/折叠等 |
| 页面过渡 | 300-400ms | 路由切换等 |

**缓动函数**: `ease-out` 进入, `ease-in` 退出, 避免 `linear`

---

## 三、页面清单与文件结构

| 页面文件 | 标题 | 功能定位 | 复杂度 |
|---------|------|---------|--------|
| `首页.html` | 首页 | 仪表盘 + 实时监控 + 统计卡片 | ⭐⭐⭐⭐ |
| `告警中心.html` | 告警中心 | 告警列表查询 + 筛选 + 状态管理 | ⭐⭐⭐⭐⭐ |
| `告警详情.html` | 告警详情 | 单条告警详细信息查看 + 图片 | ⭐⭐⭐ |
| `告警处置.html` | 告警处置 | 告警处理流程 + 状态更新 | ⭐⭐⭐ |
| `图片详情.html` | 图片详情 | 告警抓拍图片查看 | ⭐⭐ |
| `任务中心.html` | 任务中心 | 任务列表管理 + CRUD 操作 | ⭐⭐⭐⭐ |
| `新增任务.html` | 新增任务 | 任务创建表单 + 参数配置 | ⭐⭐⭐⭐ |
| `算法中心.html` | 算法中心 | 算法库列表 + 搜索 + 版本管理 | ⭐⭐⭐ |
| `算法分类.html` | 算法分类 | 算法分类管理 | ⭐⭐⭐ |
| `设备管理.html` | 设备管理 | 监控设备注册与管理 | ⭐⭐ |

**共计 10 个核心页面**

---

## 四、导航结构

### 顶部水平导航栏模式

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  LOGO  │  🏠 首页  │  ⚠️ 告警中心  │  📋 任务中心  │  🔧 算法中心  │  📹 设备中心  │              │ 🔔 通知  👤 用户 │
├─────────────────────────────────────────────────────────────────────────────┤
│  白色背景 (#FFFFFF) | 底部 1px 边框 (#E2E8F0) | 蓝色激活态 (#2563EB)        │
└─────────────────────────────────────────────────────────────────────────────┘
```

**顶部导航栏设计规范**

| 属性 | 规范值 |
|------|--------|
| 导航栏高度 | 60px |
| 背景色 | `#FFFFFF` |
| 底部边框 | 1px `#E2E8F0` |
| Logo 区域 | 左侧 200px 固定 |
| 菜单项高度 | 60px |
| 菜单项内边距 | 0 20px |
| 激活态样式 | 底部 3px `#2563EB` + 文字变蓝 |
| 激活态文字色 | `#2563EB` |
| 默认文字色 | `#64748B` |
| Hover 背景 | `#F8FAFC` |
| Hover 文字色 | `#1E293B` |

**导航菜单元素**（共5个菜单项）：

| 菜单项 | 图标 (SVG) | 说明 |
|--------|-----------|------|
| 首页 | `<HomeIcon />` | Dashboard首页 |
| 告警中心 | `<AlertIcon />` | 告警列表管理 |
| 任务中心 | `<TaskIcon />` | 任务调度管理 |
| 算法中心 | `<AlgorithmIcon />` | AI算法库管理 |
| 设备中心 | `<DeviceIcon />` | 监控设备管理 |

**交互细节**

| 状态 | 背景色 | 文字色 | 边框 |
|------|--------|--------|------|
| 默认 | transparent | `#64748B` | none |
| Hover | `#F8FAFC` | `#1E293B` | none |
| 激活 | transparent | `#2563EB` | 底部 3px `#2563EB` |

**右侧功能区**

| 功能 | 图标 (SVG) | 说明 |
|------|-----------|------|
| 通知中心 | `<BellIcon />` | 告警通知、消息提醒（带红色徽标） |
| 用户菜单 | `<Avatar />` | 头像 + 下拉菜单 |

---

## 五、页面详细分析

### 5.1 首页 (`首页.html`)

**页面定位**：系统仪表盘，呈现全局态势感知

#### 布局结构

```
┌──────────────────────────────────────────────────────────┐
│                    顶部导航栏 (60px)                      │
├──────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐ │
│  │    统计卡片区 (4个) - 2x2 网格                    │ │
│  │  ┌──────────┐ ┌──────────┐                       │ │
│  │  │ 接入设备 │ │ 告警总数 │                       │ │
│  │  │   999    │ │   100    │                       │ │
│  │  └──────────┘ └──────────┘                       │ │
│  │  ┌──────────┐ ┌──────────┐                       │ │
│  │  │ 预警场景 │ │ 算法总数 │                       │ │
│  │  │    99    │ │    12    │                       │ │
│  │  └──────────┘ └──────────┘                       │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │    实时监控区 (6宫格) - 可滚动的视频网格           │ │
│  │  ┌────────┐ ┌────────┐ ┌────────┐                 │ │
│  │  │ 视频1  │ │ 视频2  │ │ 视频3  │                 │ │
│  │  └────────┘ └────────┘ └────────┘                 │ │
│  │  ┌────────┐ ┌────────┐ ┌────────┐                 │ │
│  │  │ 视频4  │ │ 视频5  │ │ 视频6  │                 │ │
│  │  └────────┘ └────────┘ └────────┘                 │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌───────────────────────┐  ┌────────────────────────┐│
│  │    告警卡片列表       │  │    处置统计饼图         ││
│  │  ┌─────────────────┐ │  │                        ││
│  │  │ 打架斗殴 | 12:00│ │  │    [ 饼图可视化 ]     ││
│  │  │ 人员摔倒 | 12:05│ │  │    已处置 | 未处置    ││
│  │  └─────────────────┘ │  │                        ││
│  └───────────────────────┘  └────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

#### 统计卡片组件

| 指标名称 | 数值 | 图标颜色 | 卡片样式 |
|---------|------|---------|---------|
| 接入设备 | 999 | `#2563EB` 蓝色 | Surface + Border + Shadow-sm |
| 告警总数 | 100 | `#F59E0B` 橙色 | Surface + Border + Shadow-sm |
| 预警场景数 | 99 | `#EF4444` 红色 | Surface + Border + Shadow-sm |
| 算法总数 | 12 | `#10B981` 绿色 | Surface + Border + Shadow-sm |

**统计卡片代码规范**

```vue
<template>
  <div class="stat-card">
    <div class="stat-icon" :style="{ background: iconBgColor }">
      <component :is="icon" />
    </div>
    <div class="stat-content">
      <div class="stat-value">{{ value }}</div>
      <div class="stat-label">{{ label }}</div>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 200ms ease, border-color 200ms ease;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
  border-color: #CBD5E1;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-size: 36px;
  font-weight: 600;
  color: #1E293B;
  font-family: 'Fira Code', monospace;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 14px;
  color: #64748B;
  margin-top: 4px;
}
</style>
```

#### 告警类型覆盖

| 告警类型 | 颜色标识 | 背景色 | 文字色 |
|---------|---------|-------|-------|
| 打架斗殴 | `#EF4444` | `#FEF2F2` | `#DC2626` |
| 人员摔倒 | `#F59E0B` | `#FFFBEB` | `#D97706` |
| 着火预警 | `#F97316` | `#FFF7ED` | `#EA580C` |
| 入侵检测 | `#DC2626` | `#FEF2F2` | `#B91C1C` |
| 非法入侵 | `#DC2626` | `#FEF2F2` | `#B91C1C` |

---

### 5.2 告警中心 (`告警中心.html`)

**页面定位**：告警数据集中管理平台，支持多维度查询和状态筛选

#### 页面结构

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  LOGO  │  🏠 首页  │  ⚠️ 告警中心  │  📋 任务中心  │  🔧 算法中心  │  📹 设备中心  │              │ 🔔  │  👤  │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  筛选工具栏 (FilterBar)                                            │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  [查询] [重置]   │   │
│  │  │开始时间  │ │截止时间  │ │告警名称  │ │告警类型 ▼│                   │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  数据表格 (DataTable)                                               │   │
│  │  ┌────┬────────┬────────────┬────────────┬────────┬────────┬─────┐│   │
│  │  │☑︎  │ 图片   │ 告警位置   │ 告警时间  │ 类型   │ 状态   │操作 ││   │
│  │  ├────┼────────┼────────────┼────────────┼────────┼────────┼─────┤│   │
│  │  │☑︎  │[缩略图]│软件园C3栋  │2026-03-06 │打架斗殴│[已处置]│详情 ││   │
│  │  │☑︎  │[缩略图]│软件园C3栋  │2026-03-06 │未带安全帽│[未处置]│详情 ││   │
│  └────┴────────┴────────────┴────────────┴────────┴────────┴─────┘│   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  分页器 (Pagination): 共 100 条  ◀ 1 2 3 ... 10 ▶  每页 10 条   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 筛选器组件 (FilterBar)

```vue
<template>
  <div class="filter-bar">
    <div class="filter-item">
      <label>告警开始时间</label>
      <input type="date" class="input" v-model="filters.startTime" />
    </div>
    <div class="filter-item">
      <label>告警截止时间</label>
      <input type="date" class="input" v-model="filters.endTime" />
    </div>
    <div class="filter-item">
      <label>告警名称</label>
      <input type="text" class="input" placeholder="输入告警名称" v-model="filters.name" />
    </div>
    <div class="filter-item">
      <label>告警类型</label>
      <select class="select" v-model="filters.type">
        <option value="">全部</option>
        <option value="fighting">打架斗殴</option>
        <option value="intrusion">人员入侵</option>
        <!-- 更多选项 -->
      </select>
    </div>
    <div class="filter-actions">
      <button class="btn btn-primary" @click="handleQuery">查询</button>
      <button class="btn btn-secondary" @click="handleReset">重置</button>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-item label {
  font-size: 12px;
  font-weight: 500;
  color: #64748B;
}

.input, .select {
  height: 36px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  color: #1E293B;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.input:focus, .select:focus {
  outline: none;
  border-color: #2563EB;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.filter-actions {
  display: flex;
  gap: 8px;
}
</style>
```

#### 数据表格 (DataTable)

```vue
<template>
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>告警图片</th>
          <th>告警位置</th>
          <th>告警时间</th>
          <th>告警类型</th>
          <th>告警状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td><input type="checkbox" :checked="item.selected" /></td>
          <td><img :src="item.image" class="thumbnail" /></td>
          <td>{{ item.location }}</td>
          <td>{{ item.time }}</td>
          <td><span class="badge" :class="item.typeClass">{{ item.type }}</span></td>
          <td><span class="badge" :class="item.statusClass">{{ item.status }}</span></td>
          <td><button class="btn btn-ghost">详情</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background: #F8FAFC;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
  text-align: left;
  border-bottom: 1px solid #E2E8F0;
}

.data-table td {
  padding: 14px 16px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #F1F5F9;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:hover td {
  background: #F8FAFC;
}

.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
}

.badge {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.badge.success {
  background: #ECFDF5;
  color: #059669;
  border: 1px solid #A7F3D0;
}

.badge.danger {
  background: #FEF2F2;
  color: #DC2626;
  border: 1px solid #FECACA;
}
</style>
```

#### 状态徽章

| 状态 | 背景色 | 文字色 | 边框 |
|------|--------|--------|------|
| 已处置 | `#ECFDF5` | `#059669` | 1px `#A7F3D0` |
| 未处置 | `#FEF2F2` | `#DC2626` | 1px `#FECACA` |
| 处理中 | `#FFFBEB` | `#D97706` | 1px `#FDE68A` |

---

### 5.3 任务中心 (`任务中心.html`)

**页面定位**：视频分析任务的管理与调度

#### 任务列表字段

| 列名 | 说明 | 示例值 |
|------|------|--------|
| 复选框 | 批量选择 | `<Checkbox />` |
| 序号 | 行号 | 1, 2, 3... |
| 任务ID | 唯一标识 | gl0001, gl0002 |
| 任务名称 | 任务描述 | 软件园入侵检测 |
| 关联算法 | AI算法 | 入侵检测 |
| 关联设备数 | 设备数量 | 30, 10 |
| 优先级 | 处理优先级 | 高/中/低 |
| 运行状态 | 启用/禁用 | 启用/禁用 |
| 创建人 | 负责人 | 系统管理员 |
| 创建时间 | 创建时刻 | 2026-3-12 12:00:00 |
| 操作 | 操作按钮 | 详情/编辑/启动 |

#### 优先级徽章

| 优先级 | 背景色 | 文字色 |
|--------|--------|--------|
| 高 | `#FEF2F2` | `#DC2626` |
| 中 | `#FFFBEB` | `#D97706` |
| 低 | `#F0FDF4` | `#16A34A` |

---

### 5.4 新增任务 (`新增任务.html`)

**页面定位**：创建新的 AI 分析任务

#### 表单字段

| 字段名 | 控件类型 | 必填 | 输入类型 |
|--------|---------|------|---------|
| 任务名称 | TextInput | ✅ | text |
| 算法场景 | Select | ✅ | - |
| 关联设备 | DeviceSelector | ✅ | - |
| 任务优先级 | Select | ✅ | - |
| 算法版本 | Select | - | - |
| 算法厂家 | Select | - | - |
| 检查周期 | TextInput | ✅ | text (Cron) |
| 抽帧频次 | NumberInput | ✅ | number |
| 触发次数 | NumberInput | ✅ | number |
| 告警级别 | Select | ✅ | - |
| 预警阈值 | Textarea | - | text (JSON) |
| 处理人 | Select | ✅ | - |

#### 表单组件代码

```vue
<template>
  <form class="task-form" @submit.prevent="handleSubmit">
    <div class="form-grid">
      <div class="form-field">
        <label class="form-label required">任务名称</label>
        <input
          type="text"
          class="form-input"
          v-model="form.name"
          placeholder="输入任务名称"
          required
        />
      </div>

      <div class="form-field">
        <label class="form-label required">算法场景</label>
        <select class="form-select" v-model="form.algorithm" required>
          <option value="">请选择</option>
          <option value="fire">烟火识别</option>
          <option value="crowd">聚众识别</option>
          <option value="intrusion">入侵检测</option>
        </select>
      </div>

      <!-- 更多字段... -->
    </div>

    <div class="form-actions">
      <button type="button" class="btn btn-secondary" @click="handleReset">重置</button>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? '提交中...' : '确认' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.task-form {
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  padding: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.form-label.required::after {
  content: ' *';
  color: #DC2626;
}

.form-input,
.form-select,
.form-textarea {
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  color: #1E293B;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #2563EB;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-input:disabled,
.form-select:disabled {
  background: #F9FAFB;
  color: #94A3B8;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E2E8F0;
}
</style>
```

---

### 5.5 算法中心 (`算法中心.html`)

**页面定位**：AI 算法库管理

#### 算法卡片网格

```
┌─────────────────────────────────────────────────────────────┐
│  [搜索框________________________] [搜索]  [+ 新增算法]   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │   [图标]    │ │   [图标]    │ │   [图标]    │            │
│  │  入侵检测   │ │   拉横幅    │ │  打架斗殴   │            │
│  │             │ │             │ │             │            │
│  │ [查看版本]  │ │ [查看版本]  │ │ [查看版本]  │            │
│  │ [版本维护]  │ │ [版本维护]  │ │ [版本维护]  │            │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

#### 算法卡片组件

```vue
<template>
  <div class="algorithm-card">
    <div class="card-icon">
      <component :is="algorithm.icon" />
    </div>
    <h3 class="card-title">{{ algorithm.name }}</h3>
    <p class="card-description">{{ algorithm.description }}</p>
    <div class="card-actions">
      <button class="btn btn-ghost btn-sm">查看版本</button>
      <button class="btn btn-ghost btn-sm">版本维护</button>
    </div>
  </div>
</template>

<style scoped>
.algorithm-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 24px;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.algorithm-card:hover {
  border-color: #2563EB;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: #EFF6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 8px;
}

.card-description {
  font-size: 14px;
  color: #64748B;
  margin-bottom: 16px;
}

.card-actions {
  display: flex;
  gap: 8px;
}
</style>
```

---

## 六、页面流转关系

```
                                    ┌─────────────┐
                                    │   首页      │
                                    └──────┬──────┘
                                           │
           ┌───────────────────┬───────────┼───────────┬───────────────────┐
           │                   │           │           │                   │
           ▼                   ▼           ▼           ▼                   ▼
    ┌─────────────┐    ┌─────────────┐ ┌─────────┐ ┌─────────┐       ┌─────────────┐
    │  告警中心   │    │  任务中心   │ │ 算法中心│ │ 设备管理│       │  图片详情   │
    └──────┬──────┘    └──────┬─────┘ └───┬───┘ └───┬───┘       └─────────────┘
           │                   │           │         │
           │                   │           ▼         │
           │                   │    ┌─────────────┐   │
           │                   │    │  算法分类   │   │
           │                   │    └─────────────┘   │
           ▼                   ▼                      │
    ┌─────────────┐    ┌─────────────┐               │
    │  告警详情   │    │  新增任务   │               │
    └──────┬──────┘    └─────────────┘               │
           │                                             │
           ▼                                             │
    ┌─────────────┐                                      │
    │  告警处置   │                                      │
    └─────────────┘                                      │
```

---

## 七、组件规范汇总

### 7.1 按钮 (Button)

#### 按钮类型

| 类型 | 背景色 | 文字色 | 边框 | Hover 背景 |
|------|--------|--------|------|-----------|
| Primary | `#2563EB` | `#FFFFFF` | none | `#1D4ED8` |
| Secondary | `#FFFFFF` | `#374151` | 1px `#D1D5DB` | `#F9FAFB` |
| Danger | `#EF4444` | `#FFFFFF` | none | `#DC2626` |
| Ghost | transparent | `#64748B` | none | `#F1F5F9` |

#### 按钮尺寸

| 尺寸 | 高度 | 字号 | 内边距 | 圆角 |
|------|------|------|--------|------|
| sm | 32px | 12px | 0 12px | 6px |
| md | 36px | 14px | 0 16px | 8px |
| lg | 44px | 14px | 0 20px | 8px |

#### 按钮状态

- **Hover**: 背景色加深 10%
- **Active**: scale(0.98)，背景色加深 15%
- **Disabled**: opacity 0.5, cursor not-allowed
- **Loading**: 显示 spinner，禁止点击

### 7.2 输入框 (Input)

```css
.input {
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  color: #1E293B;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.input::placeholder {
  color: #94A3B8;
}

.input:focus {
  outline: none;
  border-color: #2563EB;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.input:disabled {
  background: #F9FAFB;
  color: #94A3B8;
  cursor: not-allowed;
}
```

### 7.3 卡片 (Card)

```css
.card {
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 200ms ease, border-color 200ms ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #CBD5E1;
}
```

### 7.4 表格 (Table)

```css
.table {
  width: 100%;
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #E2E8F0;
}

.table th {
  background: #F8FAFC;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
  text-align: left;
  border-bottom: 1px solid #E2E8F0;
}

.table td {
  padding: 14px 16px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #F1F5F9;
}

.table tr:last-child td {
  border-bottom: none;
}

.table tr:hover td {
  background: #F8FAFC;
}

.table td {
  padding: 14px 16px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #F1F5F9;
}

.table tr:hover td {
  background: #F8FAFC;
}
```

### 7.5 徽章/标签 (Badge)

| 类型 | 背景色 | 文字色 | 边框 |
|------|--------|--------|------|
| Success | `#ECFDF5` | `#059669` | 1px `#A7F3D0` |
| Warning | `#FFFBEB` | `#D97706` | 1px `#FDE68A` |
| Danger | `#FEF2F2` | `#DC2626` | 1px `#FECACA` |
| Info | `#EEF2FF` | `#4F46E5` | 1px `#C7D2FE` |
| Default | `#F1F5F9` | `#64748B` | 1px `#E2E8F0` |

---

## 八、功能模块汇总

### 核心功能矩阵

| 功能模块 | 首页 | 告警 | 任务 | 算法 | 设备 |
|---------|:---:|:----:|:----:|:----:|:----:|
| 数据概览 | ✅ | | | | |
| 实时监控 | ✅ | | | | |
| 告警列表 | | ✅ | | | |
| 告警筛选 | | ✅ | | | |
| 告警详情 | | ✅ | | | |
| 告警处置 | | ✅ | | | |
| 图片查看 | | ✅ | | | |
| 任务列表 | | | ✅ | | |
| 任务创建 | | | ✅ | | |
| 任务编辑 | | | ✅ | | |
| 算法列表 | | | | ✅ | |
| 算法搜索 | | | | ✅ | |
| 版本管理 | | | | ✅ | |
| 分类管理 | | | | ✅ | |
| 设备列表 | | | | | ✅ |
| 设备注册 | | | | | ✅ |

---

## 九、原型完整性评估

### 完整页面 (可直接开发)

- ✅ 首页
- ✅ 告警中心
- ✅ 告警详情
- ✅ 任务中心
- ✅ 新增任务
- ✅ 算法中心

### 待完善页面 (需补充)

- ⚠️ 告警处置 - 缺少处置表单设计
- ⚠️ 算法分类 - 缺少详细交互
- ⚠️ 设备管理 - 仅包含备注，需要完整设计

### 缺失功能模块

| 模块 | 优先级 | 说明 |
|------|--------|------|
| 用户登录 | 高 | 认证模块 |
| 个人中心 | 中 | 个人信息、设置 |
| 角色权限 | 中 | RBAC权限管理 |
| 数据统计报表 | 中 | 报表导出 |
| 消息通知 | 中 | 站内信/短信/邮件 |
| 系统设置 | 低 | 配置管理 |

---

## 十、开发建议

### 技术选型

| 类别 | 推荐技术 |
|------|---------|
| 前端框架 | Vue 3 + TypeScript |
| UI 组件库 | Ant Design Vue / Element Plus（浅色主题） |
| 状态管理 | Pinia |
| 路由管理 | Vue Router |
| 图表库 | ECharts（浅色主题） |
| 视频播放 | video.js / hls.js |
| 图标库 | Lucide Icons / Heroicons (SVG) |
| 字体 | Fira Sans + Fira Code |

### 页面组件拆分

```
src/
├── layouts/
│   ├── BasicLayout.vue       # 基础布局（含顶部导航）
│   │   ├── TopNav.vue        # 顶部导航栏
│   │   ├── UserMenu.vue      # 用户菜单下拉
│   │   └── Notification.vue  # 通知中心
│   └── BlankLayout.vue       # 空白布局
│
├── pages/
│   ├── Dashboard/
│   │   ├── index.vue         # 首页仪表盘
│   │   └── components/
│   │       ├── StatCard.vue  # 统计卡片
│   │       ├── VideoGrid.vue # 视频监控网格
│   │       ├── AlertList.vue # 告警列表
│   │       └── DisposalChart.vue # 处置统计
│   │
│   ├── Alarm/
│   │   ├── index.vue         # 告警中心
│   │   ├── Detail.vue        # 告警详情
│   │   ├── Dispose.vue       # 告警处置
│   │   └── components/
│   │       ├── FilterBar.vue # 筛选栏
│   │       ├── AlarmTable.vue # 告警表格
│   │       └── ImageViewer.vue # 图片查看
│   │
│   ├── Task/
│   │   ├── index.vue        # 任务中心
│   │   ├── Create.vue        # 新增任务
│   │   └── components/
│   │       ├── TaskTable.vue
│   │       └── TaskForm.vue
│   │
│   ├── Algorithm/
│   │   ├── index.vue        # 算法中心
│   │   ├── Category.vue     # 算法分类
│   │   └── components/
│   │       ├── AlgorithmCard.vue
│   │       └── VersionModal.vue
│   │
│   └── Device/
│       ├── index.vue        # 设备管理
│       └── components/
│           └── DeviceTable.vue
│
└── components/
    ├── ui/                  # 通用UI组件
    │   ├── Button.vue
    │   ├── Input.vue
    │   ├── Select.vue
    │   ├── Table.vue
    │   ├── Card.vue
    │   ├── Badge.vue
    │   └── Pagination.vue
    └── icons/               # SVG图标组件
```

### API 接口设计

```typescript
// 告警相关
GET    /api/alarms              // 告警列表（分页+筛选）
GET    /api/alarms/:id           // 告警详情
PUT    /api/alarms/:id/dispose  // 告警处置
GET    /api/alarms/:id/images    // 告警图片

// 任务相关
GET    /api/tasks                // 任务列表
POST   /api/tasks                // 创建任务
PUT    /api/tasks/:id            // 更新任务
DELETE /api/tasks/:id            // 删除任务
POST   /api/tasks/:id/start      // 启动任务
POST   /api/tasks/:id/stop       // 停止任务

// 算法相关
GET    /api/algorithms           // 算法列表
GET    /api/algorithms/categories // 算法分类
GET    /api/algorithms/:id/versions

// 设备相关
GET    /api/devices              // 设备列表
POST   /api/devices              // 注册设备
PUT    /api/devices/:id
DELETE /api/devices/:id
POST   /api/devices/sync

// 首页统计
GET    /api/dashboard/stats       // 统计数据
GET    /api/dashboard/alarms      // 最新告警
GET    /api/dashboard/devices     // 设备状态
```

---

## 十一、Pre-Delivery 检查清单

### 视觉质量

- [ ] 无 Emoji 作为图标（使用 SVG: Lucide/Heroicons）
- [ ] 所有图标来自统一的图标库，风格一致
- [ ] 按钮有清晰的可点击反馈（ripple/opacity/elevation）
- [ ] 使用语义化主题色彩 token（无硬编码色值）

### 交互

- [ ] 所有可点击元素有 Hover 反馈（150-300ms 过渡）
- [ ] Touch target 尺寸 >= 44x44px
- [ ] Disabled 状态视觉清晰且不可交互
- [ ] 屏幕阅读器焦点顺序与视觉顺序一致

### 表单

- [ ] 每个输入框有可见的 label
- [ ] 必填字段有明确标识（`*`）
- [ ] 错误提示显示在相关字段下方
- [ ] 提交后有 Loading → Success/Error 反馈

### 布局

- [ ] 固定导航栏、底部栏有安全区域边距
- [ ] 滚动内容不会被固定/粘性栏遮挡
- [ ] 4/8dp 间距节奏贯穿组件、区块、页面层级

### 可访问性

- [ ] 所有有意义的图片/图标有 alt/text 属性
- [ ] 表单字段有 label、hints、错误提示
- [ ] 颜色不是唯一的信息传达方式
- [ ] 支持 reduced-motion 和 Dynamic Type

---

## 十二、总结

本原型是一个**中等完整度的智慧安防平台原型**，采用了以下设计系统：

| 设计维度 | 规范 |
|---------|------|
| 设计风格 | Minimalism & Swiss Style |
| 色彩系统 | 蓝色主调 (#2563EB) + 中性灰 |
| 字体系统 | Fira Sans + Fira Code |
| 间距系统 | 8px 网格 |
| 圆角系统 | 6-12px 圆角 |
| 阴影系统 | 轻量白色阴影 |
| 动效规范 | 150-300ms ease |

**设计特点**：
1. **浅色背景** - `#F8FAFC` 浅灰蓝背景，清爽专业
2. **白色卡片** - `#FFFFFF` 卡片 + 轻量阴影 + 细边框
3. **蓝色主调** - `#2563EB` 品牌色，活力但不过于张扬
4. **清晰层次** - Swiss Style 网格布局，高对比度
5. **功能优先** - 简洁留白，信息密度适中

**核心亮点**：
1. 顶部导航 + 浅色主题，现代 SaaS 风格
2. 完整的告警管理流程（检测→告警→处置）
3. 清晰的任务调度系统设计
4. 模块化的算法管理架构
5. 直观的 Dashboard 数据可视化

**待改进**：
1. 设备管理页面设计不够完整
2. 缺少用户认证和权限模块
3. 缺失数据报表和导出功能
4. 部分页面交互细节需要补充

**建议优先级**：
1. 先完成首页、告警中心、任务中心的开发
2. 再补充算法中心和设备管理
3. 最后完善权限系统和报表功能

---

## 十三、实际实现记录

### 已实现并验证的数值

以下数值已在代码中实现并验证：

| 元素 | 原型设计 | 实际实现 | 说明 |
|------|---------|---------|------|
| 导航激活指示器高度 | 2px | 3px | TopNav/index.vue |
| 统计卡片数值字号 | 32px | 36px (text-4xl) | StatCard.vue |
| 告警表格缩略图 | 60x40px | 100x100px | AlarmTable.vue |
| 边框颜色 | border-gray-100 | border-[#E2E8F0] | 全局统一 |
| 表单宽度 | 默认 | 800px (w-[800px]) | TaskForm.vue |
| 多选标签显示 | max-tag-count: 2 | max-tag-count: responsive | TaskForm.vue |

### 统一边框颜色

项目统一使用 `border-[#E2E8F0]` 替代 `border-gray-100`，以获得更精确的浅灰色边框效果。

### 组件结构

```
src/pages/
├── Dashboard/
│   ├── components/
│   │   ├── AlertList.vue
│   │   ├── DisposalChart.vue
│   │   ├── StatCard.vue
│   │   └── VideoGrid.vue
│   └── index.vue
├── Alarm/
│   ├── components/
│   │   ├── AlarmTable.vue
│   │   ├── DetailDrawer.vue
│   │   └── FilterBar.vue
│   └── index.vue
├── Task/
│   ├── components/
│   │   ├── TaskForm.vue
│   │   └── TaskTable.vue
│   └── index.vue
├── Algorithm/
│   ├── components/
│   │   └── AlgorithmCard.vue
│   └── index.vue
└── Device/
    ├── components/
    │   └── DeviceTable.vue
    └── index.vue
```
