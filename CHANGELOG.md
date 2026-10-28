## 0.1.3 — 2026-10-28（装机白屏修复：prefix 路由带尾斜杠）

- **根因**：`dsh/index.js` 用带尾斜杠的 `UI_PREFIX`（`/api/prostate/ui/`）注册宿主 prefix 路由。
  宿主 `dsh-host-webserver` 的命中判据是 `pathname === prefix || pathname.startsWith(prefix + '/')`，
  所以只有页面本身命中：`/api/prostate/ui/app.js`、`style.css`、`demo-data.js` 全部落到宿主兜底（回 index.html），
  浏览器把 HTML 当 JS/CSS 解析 → **装机后业务区整片空白**（本地 file:// / dev 挂根看不见）。
- **修法**：新增 `UI_ROUTE = UI_PREFIX.replace(/\/+$/, '')` 供注册；`createStaticHandler` 改用 `stripMountPrefix()`，
  带/不带尾斜杠都认（宿主不重写 `req.url`）。iframe 入口仍用 `UI_PREFIX`，对外 URL 不变。
- **回归**：新增 `test/ui-route.test.mjs`（4 条）并补 `npm test` / `release:check` 脚本（此前本仓没有 test）；
  `npm run check`（同时加了 `node --check dsh/server.js`）与 `npm test` 均退出 0。
- 实测（宿主同源桩件）：修前 `/api/prostate/ui/` 200、`app.js` / `style.css` / `demo-data.js` 全 404；
  修后全部 200，真 Chrome 渲染出完整业务页（正文 1633 字）。

# 变更记录

只增不删；每条写清"改了什么 + 为什么 + 用户可见结果"。版本号与 VERSION、package.json 三处必须一致。

## 0.1.1 — 2026-10-27

- 36 号 v2 引入（疾病概要 + 状态卡）：客户端顶栏新增「疾病概要」按钮，展开四段整页浮窗（定义 → 医学资料规范和指南情况 → 目前治疗全景概要 → 发展趋势），支持返回 / 关闭 / Esc、焦点回触发按钮、history 返回收起。
- 指南表原件列改为可点链接：NCCN 患者版（Early / Advanced Stage）详情页、NCCN 临床版官方入口、AJCC 官方分期体系入口共 4 条（均经 verify-links 验活为 OK）；ISUP 与国内指南未取得可达原件，如实标 `nolink` + 原因，不用栏目页冒充原件。
- 看板首卡按 §2.6 补齐四件结构：卡头 eyebrow、锚点派生大字天数（无锚点显示「待初始化」）、现状行、出口按钮排（三步初始化 + 「疾病概要：前列腺癌是什么？」）。
- 新增可探针预览页 `examples/disease-primer/`（primer 三件套 + 静态页），P1–P9 + E0 共 10/10 通过；新增 `scripts/check-primer-links.mjs` 与 `scripts/check-client-primer.mjs` 并接入 `npm run check`。

## 0.1.0 — 2026-10-22

- 由社区脚手架 dsh-wb-cli@1.4.3（7ebb193+dirty）初始化，仅有注册骨架与健康接口，无业务功能。
- 2026-10-24 建仓并推送远端；补 `VERSION` 作为版本唯一来源。
