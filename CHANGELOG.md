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
