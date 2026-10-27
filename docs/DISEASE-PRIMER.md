# 疾病概要 · 前列腺癌

> 本项目实例文件，由 `xyb-workbench-starter` 的 `templates/DISEASE-PRIMER.md` 复制而来。
> 规范：`docs/36-DISEASE-PRIMER.md`。四段固定、顺序不变，缺段不合格；填不了的写「本台尚未整理」，**不许删段**。

- 项目 / 品牌：小前宝 ProstaPal · 前列腺癌工作台
- 病种：前列腺癌（Prostate Cancer）
- 最后更新：2026-10-27
- 数据文件：`examples/disease-primer/primer-data.js`（`window.DISEASE_PRIMER`，可探针预览）；装机客户端 `lib/client.js` 内联同一份数据
- README 对应段：`## 疾病概要`

## 0 原件状态（本项目的前提）

项目 `docs/` 是接入骨架的标准文档集，**没有任何一行记录 NCCN / AJCC / ISUP / 国内指南的版本号或更新日期**。因此：

- 四份文件全部写「版本未核实」；来源栏按实际状态写：能取得可验证官方入口的标 `entry` / 二次来源，拿不到可验证链接的（ISUP、国内指南）标 `nolink` 并写原因；
- 页码全部「页码待核」；
- 趋势段写「本台尚未整理」，**不为了排满去编年份**。

## 1 定义（`definition`）

前列腺癌是发生在前列腺上皮的恶性肿瘤，最常见的是腺泡腺癌。确诊依据是穿刺或手术标本的病理。**PSA 是监测与提示指标，不是诊断结论**：PSA 升高本身不能确诊，PSA 在参考范围内也不能排除。

- **病理分级**：Gleason 评分与 ISUP 分级分组是**同一件事的两种表述**。ISUP 分组由 Gleason 评分换算：≤6 分 → 1 组；3+4=7 → 2 组；4+3=7 → 3 组；8 分 → 4 组；9–10 分 → 5 组。两者不是两套独立评分，**不能并列比较、不能相加**。
- **分期**：TNM（版本未核实），描述局部侵犯范围、淋巴结与远处转移。
- **风险分组**：把 PSA、Gleason / ISUP、分期放在一起得出的分档（低危 / 中危 / 高危这类说法），属医生结论；本台只抄原文，不自己算。
- **本台只记原文**：病理报告的分级、分期、风险分组都照抄并标注「未核对 / 已核对」，PSA 只记数值、日期、单位与报告里写的检测方法。

**来源**：ISUP · 前列腺癌 Gleason 分级分组共识 · 版本未核实 · 未取得原件（Am J Surg Pathol 订阅全文；DOI 对脚本返回 403）· 页码待核 ｜ AJCC · Cancer Staging Manual（前列腺章节）· 版本未核实 · 未取得原件，据二次来源 · 页码待核 ｜ 本项目 `docs/BRIEF.md` · 一手项目文件

## 2 医学资料规范和指南情况（`evidence`）

| 机构 | 文件 | 版本 / 年份 | 原件 | 本台的用途 |
|---|---|---|---|---|
| NCCN | NCCN Guidelines · Prostate Cancer | 版本未核实（项目 docs 未记录） | 未取得原件 | 风险分组与治疗路径的框架参考；不引具体条目 |
| AJCC | Cancer Staging Manual（前列腺章节） | 版本未核实 | 未取得原件 | TNM 分期口径 |
| ISUP | 前列腺癌 Gleason 分级分组共识 | 版本未核实 | 未取得原件 | Gleason 与 ISUP 分组的对应关系 |
| 国内指南 / 共识（名称与版本未核实） | 前列腺癌诊疗相关中国指南 | 未核实 | 未取得原件 | 国内实践差异；核实前**不作引用依据** |

- 一台一表，不合并。未取得原件的必须在表里标出来。
- Gleason 与 ISUP 在表里是**同一行**，因为它们指向同一套分级；分两行会让人以为是两套独立评分。

**来源**：见上表逐行。

## 3 目前治疗全景概要（`landscape`）

按病期与治疗目的分组，只列**手段类别**，不含剂量、疗程与选择条件。

### 3.1 局限期

- 主动监测：在特定情形下被列为一条路径，不等于「不处理」。
- 根治性前列腺切除。
- 放疗：外照射与近距离照射两类。

三类并列存在，选哪一条属医生与你共同判断；本台不做排序。

### 3.2 局部晚期

- 放疗联合雄激素剥夺治疗（ADT）。
- 手术：在特定情形下被讨论。
- ADT 联合新型内分泌治疗这一类别。

### 3.3 转移性

- 以 ADT 为基础。
- 联合新型内分泌治疗类别、化疗类别。
- HRR 基因突变情形下的 PARP 抑制剂类别。
- 骨转移的放射性配体治疗类别（国内获批状态与可及性**需单独核实**）。

### 3.4 贯穿全程

- PSA 复查节奏：只记数值与日期。
- 身体变化自评：骨健康、排尿功能、性功能、潮热与乏力。本台**不给总分、不画评分、不与人比**。

**固定出口（原话照抄）**：

> 以上是文献与指南里列出的手段，按病期与线序排列，不代表任何一项适合你。选哪一个，这一句需要问你的医生。

**来源**：NCCN · NCCN Guidelines · Prostate Cancer（版本未核实）· 未取得原件，据二次来源 · 页码待核 ｜ 国内前列腺癌诊疗指南（名称与版本未核实）· 未取得原件 · 页码待核

## 4 发展趋势（`trend`）

只写已发生的事实，每条带日期或版本号。

1. 本台尚未整理：项目 docs 没有 NCCN / AJCC / ISUP 或国内指南的版本号与更新日期，本段不列条目、不补年份。
2. Gleason 与 ISUP 分组的对应关系只写到「换算关系」这一层，分组体系的版本**待核**，因此也不写「哪一年改过版」。

**来源**：本台尚未整理（无版本记录可引，不据印象填写）。

## 5 落地清单

- [x] `examples/disease-primer/primer.css`（从 starter `assets/patterns/disease-primer.css` 复制，不改结构）
- [x] `examples/disease-primer/primer.js`（从 starter `assets/patterns/disease-primer.js` 复制，不改逻辑）
- [x] `examples/disease-primer/primer-data.js`（本文件四段转成 `window.DISEASE_PRIMER`）
- [x] `examples/disease-primer/index.html` 三处引用：`<link rel="stylesheet" href="primer.css">` / `<script src="primer-data.js">` / `<script src="primer.js">`
- [x] 顶栏出现「?」（预览页）；装机客户端顶栏为「疾病概要」按钮（`lib/client.js`，四段浮窗 + 状态卡）
- [x] README 的 `## 疾病概要` 四段正文写好，小标题与数据文件一致；指南表补可点链接
- [x] `node scripts/probe-disease-primer.mjs --port 8202 --url http://127.0.0.1:8202/examples/disease-primer/index.html` 10/10 通过
- [x] `node scripts/check-primer-links.mjs --data examples/disease-primer/primer-data.js` 0 失败
- [x] `node scripts/check-client-primer.mjs` 19/19 通过（装机层结构断言）

## 6 验收（P1–P9 + E0）

| 编号 | 判据 | 结果 |
|---|---|---|
| P1 | 顶栏有可点「?」，aria-label 说明四段 | PASS |
| P2 | 整页面板，四段齐全且顺序为 定义 → 指南 → 治疗全景 → 趋势 | PASS |
| P3 | 面板宽高 ≥ 视口 90% | PASS（1249×829 / 1280×860） |
| P4 | 打开压一条 history，`history.back()` 收起 | PASS |
| P5 | 「返回」「关闭」两个独立入口 | PASS |
| P6 | 关闭后焦点回触发按钮、滚动位置不变 | PASS |
| P7 | Esc 只退一层 | PASS |
| P8 | 四段齐全、每段有来源、趋势段无禁止词 | PASS |
| P9 | 排版对齐：正文/列表/来源行同左基线、右边界极差 ≤2px，三档 | PASS |
| E0 | 页面无 JS 报错、无 console error | PASS |

装机层（`lib/client.js`）另用真实 React 渲染 + 交互验证：按钮、四段顺序、返回/关闭/Esc、焦点回收、https 链接与红色缺链接标记均正常，无 console error。

## 7 本项目教训

- **Gleason 与 ISUP 差点被写成两套评分**。初稿在定义段并列写「Gleason 评分 7 分、ISUP 2 组」，读者会以为这是两个独立指标。现在写明「ISUP 分组由 Gleason 换算」，并给出对应关系；证据表里也合成一行，不分两行。
- **PSA 不许当结论**。`docs/BRIEF.md` 的场景是「拿到一张 PSA 化验单，看不懂」，最容易写成「PSA 高说明病情进展」。本台只存数值与日期，判断留在医生那一侧。
- 风险分组是**结论**，不是变量：它由 PSA + 分级 + 分期共同得出。本台把它当只读原文存，不算、不推。
