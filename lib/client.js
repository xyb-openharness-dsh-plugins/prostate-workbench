window.__ModuleLoader__.load({
  id: "@xyb-community/prostate-workbench",
  factory(require) {
    const React = require('react')
    const h = React.createElement
    /* 业务界面随包发出（public/），外壳只负责用 iframe 装进面板。 */
    const UI_ENTRY = '/api/prostate/ui/'
    const metadata = {"title":"小前宝 ProstaPal · 前列腺癌工作台","description":"面向前列腺癌患者与照护者的本机优先工作台：病理与 PSA 读懂、ADT 身体与生活、排尿与性功能康复、主动监测、复诊准备与临床试验档案"}
    const theme = "/* Scope to business content; never style host navigation globally. */\n.wb-prostate-workbench {\n  --wb-paper: #f7faf8; --wb-surface: #ffffff; --wb-ink: #34413c;\n  --wb-muted: #596c62; --wb-line: #dce7df; --wb-mint: #e2f2ea;\n  --wb-mint-ink: #22664e; --wb-action: #b95023; --wb-action-ink: #ffffff;\n  --wb-pink: #f8e8eb; --wb-blue: #eaf1f6; --wb-yellow: #faf2d8;\n  --wb-radius: 18px; --wb-gap: 16px; --wb-group-gap: 24px;\n  color: var(--wb-ink); background: var(--wb-paper); font: 16px/1.65 -apple-system,BlinkMacSystemFont,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;\n  font-variant-numeric: tabular-nums; min-width: 0; min-height: 0; container-type: inline-size;\n}\n.wb-prostate-workbench[data-font=large] { font-size: 19px; }\n.wb-prostate-workbench * { box-sizing: border-box; }\n.wb-prostate-workbench button,.wb-prostate-workbench input,.wb-prostate-workbench select { font: inherit; }\n.wb-prostate-workbench button { min-height: 44px; cursor: pointer; }\n.wb-prostate-workbench :focus-visible { outline: 3px solid var(--wb-mint-ink); outline-offset: 3px; }\n.wb-prostate-workbench .wb-primary { background: var(--wb-action); color: var(--wb-action-ink); border: 0; border-radius: 999px; padding: 9px 20px; }\n.wb-prostate-workbench .wb-flower { display: inline-block; width: 24px; height: 24px; flex: 0 0 auto; margin-inline-end: 10px; animation: wb-flower-turn 12s linear infinite; }\n@keyframes wb-flower-turn { to { transform: rotate(360deg); } }\n@media (prefers-color-scheme: dark) {\n  .wb-prostate-workbench { --wb-paper:#17231f; --wb-surface:#20322a; --wb-ink:#edf5ef; --wb-muted:#c0d2c6; --wb-line:#496354; --wb-mint:#294f3f; --wb-mint-ink:#a0ddbd; --wb-action:#f3a578; --wb-action-ink:#39200e; --wb-pink:#45333a; --wb-blue:#283d4c; --wb-yellow:#473e25; }\n}\n@media (prefers-reduced-motion: reduce) {\n  .wb-prostate-workbench .wb-flower { animation:none; }\n}\n"

    /* 36 号 · 疾病概要数据。内容只取自本仓 README「## 疾病概要」、docs/DISEASE-PRIMER.md、
       docs/BRIEF.md 与 reference/；链接经 verify-links.mjs 验活，拿不到的如实 nolink + note。
       模块加载器不保证相对 require，所以数据内联在客户端里（与 examples/disease-primer/primer-data.js 同源）。 */
    const PRIMER = {
      brand: '小前宝 ProstaPal',
      name: '前列腺癌',
      en: 'Prostate Cancer',
      updated: '2026-10-27',
      sections: [
        {
          id: 'definition',
          title: '定义',
          intro: '前列腺癌是发生在前列腺上皮的恶性肿瘤，最常见的是腺泡腺癌。确诊依据是穿刺或手术标本的病理；PSA 是监测与提示指标，不是诊断结论——PSA 升高本身不能确诊，PSA 在参考范围内也不能排除。',
          points: [
            '病理分级：Gleason 评分与 ISUP 分级分组是同一件事的两种表述。ISUP 分组由 Gleason 评分换算而来（例如 3+4=7 对应 ISUP 2 组，4+3=7 对应 3 组，8 分对应 4 组，9–10 分对应 5 组）。两者不是两套独立评分，不能并列比较、不能相加。',
            '分期：TNM（版本未核实），描述局部侵犯范围、淋巴结与远处转移。',
            '风险分组：把 PSA、Gleason / ISUP 与分期放在一起得出的分档（低危 / 中危 / 高危这类说法），属医生结论；本台只抄原文，不自己算。',
            '本台只记原文：病理报告的分级、分期、风险分组照抄并标注「未核对 / 已核对」，PSA 只记数值、日期、单位与报告里写的检测方法。'
          ],
          sources: [
            { org: 'ISUP', doc: '前列腺癌 Gleason 分级分组共识', version: '版本未核实', nolink: true, note: 'Am J Surg Pathol 订阅全文；DOI 对脚本返回 403；本台未取得原件，页码待核' },
            { org: 'AJCC', doc: 'Cancer Staging Manual（前列腺章节）', version: '版本未核实', original: false, secondaryUrl: 'https://www.facs.org/quality-programs/cancer-programs/american-joint-committee-on-cancer/cancer-staging-systems/', note: '本台未取得手册原件；链接为 AJCC 官方分期体系入口，页码待核' },
            { org: '本项目', doc: 'docs/BRIEF.md', version: '2026-10-25', nolink: true, note: '仓内一手项目文件，无公开 https 链接' }
          ]
        },
        {
          id: 'evidence',
          title: '医学资料规范和指南情况',
          intro: '这个工作台里出现的每一条「该查什么、该怎么分期」，都应能追到下面某一份文件。原件未取得的，在表里如实标出来，不假装看过。',
          table: {
            head: ['机构', '文件', '版本 / 年份', '原件', '本台的用途'],
            rows: [
              ['NCCN', 'NCCN Guidelines for Patients · Prostate Cancer（Early Stage）', '版本未核实（项目 docs 未记录）',
                { text: '未取得原件 · 患者版详情页（PDF 可在该页下载）', url: 'https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients/guidelines-for-patients-details?patientGuidelineId=49', note: '官方患者版详情页；本台未存档 PDF' },
                '风险分组与治疗路径的框架参考；不引具体条目'],
              ['NCCN', 'NCCN Guidelines for Patients · Prostate Cancer（Advanced Stage）', '版本未核实（项目 docs 未记录）',
                { text: '未取得原件 · 患者版详情页（PDF 可在该页下载）', url: 'https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients/guidelines-for-patients-details?patientGuidelineId=50', note: '官方患者版详情页；本台未存档 PDF' },
                '风险分组与治疗路径的框架参考；不引具体条目'],
              ['NCCN', 'NCCN Guidelines · Prostate Cancer（临床版）', '版本未核实（项目 docs 未记录）',
                { text: '官方入口 · 临床版全文需 NCCN 官网注册', url: 'https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1459', note: '本台未取得该版原件' },
                '风险分组与治疗路径的框架参考；不引具体条目'],
              ['AJCC', 'Cancer Staging Manual（前列腺章节）', '版本未核实',
                { text: '未取得原件 · 官方分期体系入口', url: 'https://www.facs.org/quality-programs/cancer-programs/american-joint-committee-on-cancer/cancer-staging-systems/', note: '手册为付费书；本台未取得前列腺章节原件' },
                'TNM 分期口径'],
              ['ISUP', '前列腺癌 Gleason 分级分组共识', '版本未核实',
                { text: '未取得原件', nolink: true, note: 'Am J Surg Pathol 订阅全文；DOI 对脚本返回 403；本台未取得原件' },
                'Gleason 评分与 ISUP 分组的对应关系'],
              ['国内指南 / 共识（名称与版本未核实）', '前列腺癌诊疗相关中国指南', '未核实',
                { text: '未取得原件', nolink: true, note: '本仓 docs 未记录名称与版本；核实前不作引用依据' },
                '国内实践差异；核实前不作引用依据']
            ]
          },
          points: [
            '未取得原件的文件，本台只记「存在」与「大致讲什么」，不引用条文、推荐等级或剂量。',
            '指南给的是「通常怎么做」，不是「你该怎么做」。'
          ],
          sources: [
            { org: 'NCCN', doc: 'NCCN Guidelines for Patients · Prostate Cancer（Early Stage）', version: '版本未核实', original: false, secondaryUrl: 'https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients/guidelines-for-patients-details?patientGuidelineId=49', note: '官方患者版详情页；本台未取得临床版原件' },
            { org: 'NCCN', doc: 'NCCN Guidelines for Patients · Prostate Cancer（Advanced Stage）', version: '版本未核实', original: false, secondaryUrl: 'https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients/guidelines-for-patients-details?patientGuidelineId=50', note: '官方患者版详情页；本台未取得临床版原件' },
            { org: 'NCCN', doc: 'NCCN Guidelines · Prostate Cancer（临床版）', version: '版本未核实', entry: true, kind: 'hub', url: 'https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1459', note: '临床版全文需在 NCCN 官网注册；本台未取得该版原件' },
            { org: 'AJCC', doc: 'Cancer Staging Manual（前列腺章节）', version: '版本未核实', original: false, secondaryUrl: 'https://www.facs.org/quality-programs/cancer-programs/american-joint-committee-on-cancer/cancer-staging-systems/', note: '手册为付费书；本台未取得前列腺章节原件，页码待核' },
            { org: 'ISUP', doc: '前列腺癌 Gleason 分级分组共识', version: '版本未核实', nolink: true, note: 'Am J Surg Pathol 订阅全文；DOI 对脚本返回 403；本台未取得原件' },
            { org: '国内指南 / 共识', doc: '前列腺癌诊疗相关中国指南', version: '未核实', nolink: true, note: '本仓 docs 未记录名称与版本；核实前不作引用依据' }
          ]
        },
        {
          id: 'landscape',
          title: '目前治疗全景概要',
          intro: '按病期与治疗目的分组，只列指南里出现过的手段类别，不含剂量、疗程与选择条件。',
          groups: [
            {
              label: '局限期',
              points: [
                '主动监测：在特定情形下被列为一条路径，不等于「不处理」。',
                '根治性前列腺切除。',
                '放疗：外照射与近距离照射两类。'
              ]
            },
            {
              label: '局部晚期',
              points: [
                '放疗联合雄激素剥夺治疗（ADT）。',
                '手术：在特定情形下被讨论。',
                'ADT 联合新型内分泌治疗这一类别。'
              ]
            },
            {
              label: '转移性',
              points: [
                '以 ADT 为基础。',
                '联合新型内分泌治疗类别、化疗类别。',
                'HRR 基因突变情形下的 PARP 抑制剂类别。',
                '骨转移的放射性配体治疗类别（国内获批状态与可及性需单独核实）。'
              ]
            },
            {
              label: '贯穿全程',
              points: [
                'PSA 复查节奏：只记数值与日期。',
                '身体变化自评：骨健康、排尿功能、性功能、潮热与乏力。本台不给总分、不画评分、不与人比。'
              ]
            }
          ],
          points: [
            '局限期的三类手段并列存在，选哪一条属医生与你共同判断；本台不做排序。',
            '以上是文献与指南里列出的手段，按病期与线序排列，不代表任何一项适合你。选哪一个，这一句需要问你的医生。'
          ],
          sources: [
            { org: 'NCCN', doc: 'NCCN Guidelines for Patients · Prostate Cancer', version: '版本未核实', original: false, secondaryUrl: 'https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients/guidelines-for-patients-details?patientGuidelineId=49', note: '据 NCCN 患者版详情页（早期/晚期两份）；临床版未取得' },
            { org: '国内指南 / 共识', doc: '前列腺癌诊疗相关中国指南', version: '未核实', nolink: true, note: '名称与版本未核实，不据其条文' }
          ]
        },
        {
          id: 'trend',
          title: '发展趋势',
          intro: '只写已发生的事实，每条带日期或版本号。',
          points: [
            '本台尚未整理：项目 docs 是接入骨架的标准文档集，没有记录 NCCN / AJCC / ISUP 或国内指南的版本号与更新日期，因此本段不列条目、不补年份。',
            'Gleason 与 ISUP 分组的对应关系同样只写到「换算关系」这一层（见定义段），分组体系的版本待核，因此不写「哪一年改过版」。'
          ],
          sources: [
            { org: '本台', doc: '尚未整理', nolink: true, note: '无版本记录可引，不据印象填写' }
          ]
        }
      ]
    }

    const primerTheme = `
.wb-prostate-workbench .wb-primer-trigger {
  border: 1px solid var(--wb-line); background: var(--wb-mint); color: var(--wb-mint-ink);
  border-radius: 999px; padding: 7px 15px; font-size: .82em; font-weight: 700;
}
.wb-prostate-workbench .wb-primer-trigger:hover { border-color: var(--wb-mint-ink); }
.wb-prostate-workbench .wb-status-card {
  background: var(--wb-surface); border: 1px solid var(--wb-line); border-radius: var(--wb-radius); padding: 16px 18px;
}
.wb-prostate-workbench .wb-status-eyebrow { margin: 0; font-size: .72em; color: var(--wb-muted); letter-spacing: .02em; }
.wb-prostate-workbench .wb-status-days { margin: 4px 0 2px; font-size: 28px; line-height: 1.2; font-weight: 700; color: var(--wb-mint-ink); }
.wb-prostate-workbench .wb-status-line { margin: 0 0 12px; font-size: .82em; color: var(--wb-muted); }
.wb-prostate-workbench .wb-status-actions { display: flex; flex-wrap: wrap; gap: 10px; }
.wb-prostate-workbench .wb-status-actions .wb-primary { min-height: 44px; }
.wb-prostate-workbench .wb-status-secondary {
  border: 1px solid var(--wb-line); background: var(--wb-mint); color: var(--wb-mint-ink);
  border-radius: 999px; padding: 9px 18px; font-weight: 700;
}
.wb-prostate-workbench .wb-onboarding { margin: 14px 0 0; padding: 12px 14px; background: var(--wb-mint); border-radius: 12px; }
.wb-prostate-workbench .wb-onboarding p { margin: 0 0 6px; font-size: .82em; color: var(--wb-muted); }
.wb-prostate-workbench .wb-onboarding ol { margin: 0; padding-left: 20px; font-size: .9em; }
.wb-prostate-workbench .wb-onboarding li { margin: 4px 0; }

.wb-prostate-workbench .dp-overlay {
  position: fixed; inset: 0; z-index: 60; display: flex;
  background: rgba(20, 36, 29, .38); -webkit-backdrop-filter: blur(2px); backdrop-filter: blur(2px);
}
.wb-prostate-workbench .dp-panel {
  position: absolute; inset: clamp(8px, 1.2vw, 16px); display: flex; flex-direction: column;
  min-width: 0; min-height: 0; background: var(--wb-paper); color: var(--wb-ink);
  border: 1px solid var(--wb-line); border-radius: var(--wb-radius);
  box-shadow: 0 18px 48px rgba(20, 36, 29, .24); overflow: hidden;
}
.wb-prostate-workbench .dp-panel:focus { outline: none; }
.wb-prostate-workbench .dp-head {
  position: sticky; top: 0; z-index: 2; display: flex; align-items: center; gap: 10px;
  flex-shrink: 0; min-height: 56px; padding: 0 12px 0 8px;
  background: var(--wb-surface); border-bottom: 1px solid var(--wb-line);
}
.wb-prostate-workbench .dp-head-title { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.wb-prostate-workbench .dp-crumb { font-size: .68em; color: var(--wb-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.wb-prostate-workbench .dp-title { margin: 0; font-size: .94em; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.wb-prostate-workbench .dp-en { font-weight: 500; font-size: .72em; color: var(--wb-muted); }
.wb-prostate-workbench .dp-btn {
  display: inline-flex; align-items: center; gap: 4px; min-height: 36px; padding: 0 12px;
  font-size: .78em; color: var(--wb-ink); background: var(--wb-surface);
  border: 1px solid var(--wb-line); border-radius: 9px; cursor: pointer; flex-shrink: 0;
}
.wb-prostate-workbench .dp-btn:hover { background: var(--wb-mint); border-color: var(--wb-mint-ink); }
.wb-prostate-workbench .dp-close { min-width: 36px; justify-content: center; padding: 0; }
.wb-prostate-workbench .dp-body { flex: 1; min-height: 0; overflow: auto; overscroll-behavior: contain; padding: 20px clamp(14px, 1.6vw, 28px) 56px; }
.wb-prostate-workbench .dp-inner { max-width: 980px; margin: 0 auto; }
.wb-prostate-workbench .dp-note {
  margin: 0 0 18px; padding: 11px 14px; font-size: .78em; line-height: 1.7;
  color: var(--wb-ink); background: var(--wb-mint); border-left: 3px solid var(--wb-mint-ink); border-radius: 0 9px 9px 0;
}
.wb-prostate-workbench .dp-section { padding: 16px 0 4px; border-top: 1px dashed var(--wb-line); }
.wb-prostate-workbench .dp-section:first-of-type { border-top: 0; }
.wb-prostate-workbench .dp-section h3 {
  margin: 0 0 10px; font-size: .97em; font-weight: 700; color: var(--wb-ink);
  display: flex; align-items: baseline; gap: 8px;
}
.wb-prostate-workbench .dp-section h3::before { content: ""; width: 4px; height: 15px; border-radius: 2px; background: var(--wb-mint-ink); flex-shrink: 0; }
/* 36 号 §4.3：正文块不设 max-width，右边界与表格/小标题一致。 */
.wb-prostate-workbench .dp-lead { margin: 0 0 10px; font-size: .82em; line-height: 1.78; color: var(--wb-muted); }
.wb-prostate-workbench .dp-empty { color: var(--wb-muted); }
.wb-prostate-workbench .dp-group { margin: 0 0 12px; }
.wb-prostate-workbench .dp-group h4 { margin: 0 0 5px; font-size: .8em; font-weight: 700; color: var(--wb-mint-ink); }
.wb-prostate-workbench .dp-group .dp-points { margin-bottom: 6px; }
/* 36 号 §4.3：列表块 padding 归零，缩进放 li，保证 ul 右边界与正文/表格一致。 */
.wb-prostate-workbench .dp-points { margin: 0 0 10px; padding-left: 0; list-style: none; }
.wb-prostate-workbench .dp-points li { position: relative; padding-left: 18px; font-size: .8em; line-height: 1.75; color: var(--wb-muted); margin-bottom: 5px; }
.wb-prostate-workbench .dp-points li::before { content: ""; position: absolute; left: 6px; top: .72em; width: 5px; height: 5px; border-radius: 50%; background: var(--wb-muted); }
.wb-prostate-workbench .dp-table-wrap { overflow-x: auto; margin: 0 0 12px; }
.wb-prostate-workbench .dp-table { min-width: 640px; border-collapse: collapse; width: 100%; font-size: .76em; background: var(--wb-surface); border: 1px solid var(--wb-line); border-radius: 9px; }
.wb-prostate-workbench .dp-table th, .wb-prostate-workbench .dp-table td { padding: 7px 10px; text-align: left; border-bottom: 1px solid var(--wb-line); vertical-align: top; line-height: 1.6; }
.wb-prostate-workbench .dp-table th { background: var(--wb-mint); color: var(--wb-mint-ink); font-weight: 700; white-space: nowrap; }
.wb-prostate-workbench .dp-table tr:last-child td { border-bottom: 0; }
.wb-prostate-workbench .dp-src { margin: 10px 0 0; font-size: .7em; line-height: 1.65; color: var(--wb-muted); }
.wb-prostate-workbench .dp-src b { color: var(--wb-ink); margin-right: 6px; }
.wb-prostate-workbench .dp-src-missing { color: var(--wb-action); }
.wb-prostate-workbench .dp-foot { margin: 22px 0 0; padding-top: 14px; border-top: 1px solid var(--wb-line); font-size: .72em; line-height: 1.7; color: var(--wb-muted); }
.wb-prostate-workbench .dp-link { color: inherit; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
.wb-prostate-workbench .dp-link:hover { text-decoration-thickness: 2px; }
.wb-prostate-workbench .dp-miss { color: #b3372e; font-weight: 600; }
.wb-prostate-workbench .dp-cell-note { display: block; margin-top: 2px; font-size: .92em; color: var(--wb-muted); }
@media (max-width: 760px) {
  .wb-prostate-workbench .dp-panel { inset: 0; border-radius: 0; border: 0; }
  .wb-prostate-workbench .dp-head { min-height: 52px; }
  .wb-prostate-workbench .dp-back span { display: none; }
  .wb-prostate-workbench .dp-body { padding: 16px 14px 44px; }
}
`

    const PRIMER_ORDER = ['definition', 'evidence', 'landscape', 'trend']
    const safeHref = (value) => {
      if (!value || typeof value !== 'string') return ''
      const url = value.trim()
      return /^https:\/\//i.test(url) ? url : ''
    }
    const externalLink = (url, text, extra) => h('a', {
      href: url, target: '_blank', rel: 'noopener noreferrer',
      className: 'dp-link', key: extra || text
    }, text + ' ↗')

    function SourceLine({ source, index }) {
      if (!source) return null
      const bits = [source.org, source.doc].filter(Boolean).join(' · ')
      const tail = []
      if (source.version) tail.push(h('span', { key: 'v' }, source.version))
      const url = safeHref(source.url)
      const secondary = safeHref(source.secondaryUrl)
      if (source.nolink) {
        tail.push(h('span', { className: 'dp-miss', key: 'nolink' }, '未取得原件'))
        if (source.note) tail.push(source.note)
      } else if (source.entry) {
        tail.push(url
          ? externalLink(url, '官方入口 · 需自行注册', 'entry')
          : h('span', { className: 'dp-miss', key: 'entry-miss' }, '官方入口（缺链接，违反 36 号 §2.5）'))
        if (source.note) tail.push(source.note)
      } else if (source.original) {
        tail.push(url
          ? externalLink(url, '原件已取得 · 打开/下载', 'original')
          : h('span', { className: 'dp-miss', key: 'original-miss' }, '原件已取得（缺链接，违反 36 号 §2.5）'))
      } else {
        tail.push(secondary
          ? externalLink(secondary, '未取得原件，据二次来源', 'secondary')
          : h('span', { className: 'dp-miss', key: 'secondary-miss' }, '未取得原件，据二次来源（缺二次链接，违反 36 号 §2.5）'))
        if (source.note) tail.push(source.note)
      }
      if (source.page) tail.push('页码 ' + source.page)
      return h('span', { key: 'src-' + index }, bits + (tail.length ? '（' : ''), ...tail.flatMap((part, i) => [part, i < tail.length - 1 ? ' · ' : '']), tail.length ? '）' : '')
    }

    function SourceBlock({ sources }) {
      if (!sources || !sources.length) {
        return h('p', { className: 'dp-src dp-src-missing' }, h('b', null, '来源'), '未标注 —— 这一段还不能用。')
      }
      const children = [h('b', { key: 'label' }, '来源')]
      sources.forEach((source, index) => {
        if (index) children.push(' ｜ ')
        children.push(h(SourceLine, { source, index, key: 'source-' + index }))
      })
      return h('p', { className: 'dp-src' }, ...children)
    }

    function TableCell({ cell }) {
      if (cell && typeof cell === 'object' && !Array.isArray(cell)) {
        const url = safeHref(cell.url)
        const label = String(cell.text == null ? '' : cell.text)
        if (cell.nolink) {
          return h('span', null,
            h('span', { className: 'dp-miss' }, label || '未取得原件'),
            cell.note ? h('span', { className: 'dp-cell-note' }, cell.note) : null)
        }
        if (url) {
          return h('span', null,
            externalLink(url, label || url),
            cell.note ? h('span', { className: 'dp-cell-note' }, cell.note) : null)
        }
        return h('span', { className: 'dp-miss' }, (label || '链接') + '（缺 https 链接，违反 36 号 §2.5）')
      }
      return String(cell == null ? '' : cell)
    }

    function PrimerSection({ section, index }) {
      const body = []
      if (section.intro) body.push(h('p', { className: 'dp-lead', key: 'lead' }, section.intro))
      if (section.groups && section.groups.length) {
        section.groups.forEach((group, groupIndex) => {
          body.push(h('div', { className: 'dp-group', key: 'group-' + groupIndex },
            h('h4', null, group.label),
            h('ul', { className: 'dp-points' }, (group.points || []).map((point, pointIndex) => h('li', { key: pointIndex }, point)))))
        })
      }
      if (section.points && section.points.length) {
        body.push(h('ul', { className: 'dp-points', key: 'points' }, section.points.map((point, pointIndex) => h('li', { key: pointIndex }, point))))
      }
      if (section.table) {
        body.push(h('div', { className: 'dp-table-wrap', key: 'table' },
          h('table', { className: 'dp-table' },
            h('thead', null, h('tr', null, (section.table.head || []).map((head, headIndex) => h('th', { key: headIndex }, head)))),
            h('tbody', null, (section.table.rows || []).map((row, rowIndex) => h('tr', { key: rowIndex },
              row.map((cell, cellIndex) => h('td', { key: cellIndex }, h(TableCell, { cell })))))))))
      }
      if (!body.length) body.push(h('p', { className: 'dp-lead dp-empty', key: 'empty' }, '本台尚未整理这一段。'))
      return h('section', {
        className: 'dp-section', 'data-dp-section': section.id,
        'aria-labelledby': 'dp-h-' + index, key: section.id
      },
        h('h3', { id: 'dp-h-' + index }, section.title || ''),
        ...body,
        h(SourceBlock, { sources: section.sources }))
    }

    function PrimerPanel({ onClose, triggerRef }) {
      const panelRef = React.useRef(null)
      const scrollRef = React.useRef(0)
      const pushedRef = React.useRef(false)
      const closingRef = React.useRef(false)

      React.useEffect(() => {
        const unsubscribe = bridge?.desktopWorkbenches?.subscribe?.(() => setPaneTick?.((n) => n + 1) || setNote(''))
        return () => { try { unsubscribe?.() } catch {} }
        scrollRef.current = window.scrollY || document.documentElement.scrollTop || 0
        try {
          window.history.pushState({ prostatePrimer: true }, '', '#disease-primer')
          pushedRef.current = true
        } catch (_) { pushedRef.current = false }
        const onPop = () => { closingRef.current = true; onClose() }
        window.addEventListener('popstate', onPop)
        const timer = window.setTimeout(() => { if (panelRef.current) panelRef.current.focus() }, 0)
        return () => {
          window.clearTimeout(timer)
          window.removeEventListener('popstate', onPop)
          const trigger = triggerRef && triggerRef.current
          if (trigger && trigger.focus) {
            try { trigger.focus({ preventScroll: true }) } catch (_) { try { trigger.focus() } catch (__) {} }
          }
          if (scrollRef.current) { try { window.scrollTo(0, scrollRef.current) } catch (_) {} }
        }
      }, [])

      const requestClose = () => {
        if (closingRef.current) return
        if (pushedRef.current) {
          pushedRef.current = false
          try {
            window.history.back()
            window.setTimeout(() => { if (!closingRef.current) onClose() }, 250)
            return
          } catch (_) { /* 退化为直接关闭 */ }
        }
        onClose()
      }

      React.useEffect(() => {
        const onKey = (event) => {
          if (event.key === 'Escape') { event.preventDefault(); requestClose() }
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
      })

      return h('div', {
        className: 'dp-overlay', id: 'disease-primer',
        onClick: (event) => { if (event.target === event.currentTarget) requestClose() }
      },
        h('div', {
          className: 'dp-panel', role: 'dialog', 'aria-modal': 'true',
          'aria-labelledby': 'dp-title', tabIndex: -1, ref: panelRef
        },
          h('div', { className: 'dp-head' },
            h('button', { className: 'dp-btn dp-back', type: 'button', 'data-dp': 'back', 'aria-label': '返回工作台', onClick: requestClose }, '← ', h('span', null, '返回')),
            h('div', { className: 'dp-head-title' },
              h('span', { className: 'dp-crumb' }, (PRIMER.brand || '') + ' › 疾病概要'),
              h('h2', { className: 'dp-title', id: 'dp-title' }, PRIMER.name || '疾病概要', PRIMER.en ? h('span', { className: 'dp-en' }, ' ' + PRIMER.en) : null)),
            h('button', { className: 'dp-btn dp-close', type: 'button', 'data-dp': 'close', 'aria-label': '关闭疾病概要', onClick: requestClose }, '✕')),
          h('div', { className: 'dp-body', tabIndex: 0 },
            h('div', { className: 'dp-inner' },
              h('p', { className: 'dp-note' }, '这是公开信息的整理，属于', h('b', null, '解释'), '：说明这个病是什么、依据哪些文件、指南里列了哪些手段、这些年发生了什么变化。它不是对你个人情况的判断，也不构成任何建议。'),
              PRIMER.sections.map((section, index) => h(PrimerSection, { section, index, key: section.id })),
              h('p', { className: 'dp-foot' }, '最后更新 ' + (PRIMER.updated || '未标注') + ' · 内容只做事实与原文整理 · 任何与你有关的判断，这一句需要问你的医生。')))))
    }

    function StatusCard({ onOpenPrimer }) {
      const [showSteps, setShowSteps] = React.useState(false)
      return h('section', { className: 'wb-status-card', 'data-wb-status-card': '' },
        h('p', { className: 'wb-status-eyebrow', 'data-status-eyebrow': '' }, 'D+N 状态卡 · 距下一阶段（待初始化）'),
        h('div', { className: 'wb-status-days', 'data-status-days': '' }, '待初始化'),
        h('p', { className: 'wb-status-line', 'data-status-line': '' }, '当前阶段：待初始化 · 状态：待初始化 · 下次：待初始化'),
        h('div', { className: 'wb-status-actions' },
          h('button', {
            type: 'button', className: 'wb-primary', 'data-status-primary': '',
            'aria-expanded': showSteps ? 'true' : 'false',
            onClick: () => setShowSteps((value) => !value)
          }, '开始三步初始化 →'),
          h('button', {
            type: 'button', className: 'wb-status-secondary', 'data-primer-open': '',
            'aria-haspopup': 'dialog', 'aria-controls': 'disease-primer',
            'aria-label': '疾病概要：定义、医学资料与指南情况、治疗全景、发展趋势',
            onClick: onOpenPrimer
          }, '疾病概要：前列腺癌是什么？')),
        showSteps ? h('div', { className: 'wb-onboarding', 'data-status-steps': '' },
          h('p', null, '没有锚点日，所以天数不手填。按三步填入第一条真实记录后，状态卡再显示「第 N 天」。'),
          h('ol', null,
            h('li', null, '抄录病理与 PSA 原文：Gleason / ISUP、分期、风险分组、PSA 数值与日期，标注「未核对 / 已核对」。'),
            h('li', null, '记录当前阶段与治疗路径：主动监测 / 根治术 / 放疗 / ADT / 新型内分泌。'),
            h('li', null, '设下一次复诊日期与想问的问题，生成可带走的复诊摘要。'))) : null)
    }

    /* 宿主桥：页面（iframe）发 prostate:agent-draft，这里只把提示词交给原生会话。
       工作台不渲染聊天记录、不渲染输入框或发送键。 */
    let bridge = null
    function currentSession() {
      const service = bridge && bridge.desktopWorkbenches
      if (typeof service?.currentSession === 'function') return service.currentSession() || null
      const snapshot = bridge?.sessions?.list?.getSnapshot?.()
      return snapshot?.current || Object.keys(snapshot?.byId || {}).find((id) =>
        (snapshot.byId[id]?.retainedBy?.mainView ?? 0) > 0) || null
    }
    function ownsSession(id) {
      const service = bridge && bridge.desktopWorkbenches
      return Boolean(id) && typeof service?.ownsSession === 'function' && service.ownsSession(id) === true
    }

    /* ---------------- AI 会话面板宽度（25%–45%，默认 35%，步进 2%） ---------------- */

    const AGENT_MIN = 0.25
    const AGENT_MAX = 0.45
    const AGENT_STEP = 0.02
    const AGENT_DEFAULT = 0.35
    const PANE_WIDTH_KEY = 'prostate.agentPane.width.v1'

    const clampWidth = (value) => {
      const n = Number(value)
      if (!Number.isFinite(n)) return AGENT_DEFAULT
      return Math.min(AGENT_MAX, Math.max(AGENT_MIN, n))
    }
    /** 对齐到步进，键盘与鼠标落在同一组取值上，避免拖出 33.7% 这种数 */
    const snapWidth = (value) => clampWidth(Math.round(value / AGENT_STEP) * AGENT_STEP)
    const round4 = (n) => Math.round(n * 10000) / 10000

    function loadWidth() {
      try {
        const saved = JSON.parse(localStorage.getItem(PANE_WIDTH_KEY) || 'null')
        return clampWidth(saved?.width)
      } catch { return AGENT_DEFAULT }
    }
    function saveWidth(width) {
      try { localStorage.setItem(PANE_WIDTH_KEY, JSON.stringify({ width: round4(width) })) } catch { /* 隐私模式忽略 */ }
    }

    /* 分隔线：1px 常规线条，绝对定位在业务区/会话边界上，不占布局宽度。
       指针热区由子元素向外扩到 11px，线条本身不因为“好拖”而变粗。
       品牌色取自本仓 mint-ink（--wb-mint-ink #22664e），不写死蓝色。 */
    const SPLITTER_BRAND = '#22664e'
    const splitterRgba = (hex, alpha) => {
      const n = parseInt(String(hex).replace('#', ''), 16)
      return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
    }
    const splitterStyle = {
      position: 'absolute', top: 0, bottom: 0, width: 1, marginRight: -0.5,
      zIndex: 2, background: '#dce7df', cursor: 'col-resize', touchAction: 'none',
      transition: 'background .15s ease, box-shadow .15s ease',
    }
    const splitterHoverStyle = {
      ...splitterStyle,
      background: SPLITTER_BRAND,
      boxShadow: `0 0 6px ${splitterRgba(SPLITTER_BRAND, 0.55)}`,
    }
    const splitterDragStyle = {
      ...splitterHoverStyle,
      boxShadow: `0 0 10px ${splitterRgba(SPLITTER_BRAND, 0.8)}`,
    }
    const splitterHitStyle = {
      position: 'absolute', top: 0, bottom: 0, left: -5, width: 11,
      background: 'transparent', cursor: 'col-resize',
    }
    const splitterGripStyle = {
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      width: 14, height: 22, borderRadius: 4, background: SPLITTER_BRAND,
      color: '#fff', fontSize: 11, lineHeight: '22px', letterSpacing: '-1px', textAlign: 'center',
      opacity: 0.95, pointerEvents: 'none', userSelect: 'none',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.18)',
    }
    const splitterFocusStyle = {
      ...splitterStyle, background: SPLITTER_BRAND,
      boxShadow: `0 0 0 1px ${splitterRgba(SPLITTER_BRAND, 0.5)}`,
    }
    const dragShieldStyle = {
      position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 4,
      cursor: 'col-resize', background: 'transparent', touchAction: 'none',
    }

    
      /* 会话归属只问宿主：customFrame 下没会话也会传隐藏 conversation 容器，不能用它判断。 */
      function currentSession() {
        const service = bridge?.desktopWorkbenches
        if (typeof service?.currentSession === 'function') return service.currentSession() || null
        const snapshot = bridge?.sessions?.list?.getSnapshot?.()
        return snapshot?.current || Object.keys(snapshot?.byId || {}).find((id) =>
          (snapshot.byId[id]?.retainedBy?.mainView ?? 0) > 0) || null
      }
      function ownsSession(sessionId) {
        if (!sessionId) return false
        const service = bridge?.desktopWorkbenches
        return typeof service?.ownsSession === 'function' ? service.ownsSession(sessionId) : false
      }
      function ownedSession() { const id = currentSession(); return ownsSession(id) ? id : null }
      async function createOwnedSession() {
        const service = bridge?.desktopWorkbenches
        let workspaceId
        try { workspaceId = service?.defaultWorkspace?.()?.workspaceId } catch { workspaceId = undefined }
        return service.newSession(workspaceId)
      }
function Panel({ conversation }) {
      /* 业务界面在 public/（随包发出）；探不到才退回下面的旧自绘骨架。 */
      const [health, setHealth] = React.useState(null)
      const [error, setError] = React.useState('')
      const [large, setLarge] = React.useState(false)
      const [attempt, setAttempt] = React.useState(0)
      const [primerOpen, setPrimerOpen] = React.useState(false)
      const [uiBroken, setUiBroken] = React.useState(false)
      const [paneOpen, setPaneOpen] = React.useState(false)
      const [paneWidth, setPaneWidth] = React.useState(loadWidth)
      const [dragging, setDragging] = React.useState(false)
      const [hovering, setHovering] = React.useState(false)
      const [note, setNote] = React.useState('')
      const primerTriggerRef = React.useRef(null)
      const shellRef = React.useRef(null)
      const dragHostRef = React.useRef(null)
      const frameRef = React.useRef(null)
      const deliverRef = React.useRef(null)

      React.useEffect(() => {
        const controller = new AbortController()
        fetch(UI_ENTRY, { method: 'HEAD', signal: controller.signal, credentials: 'same-origin' })
          .then((response) => { if (!response.ok) setUiBroken(true) })
          .catch(() => setUiBroken(true))
        return () => controller.abort()
      }, [])

      React.useEffect(() => {
        const controller = new AbortController()
        setHealth(null); setError('')
        fetch('/api/prostate-workbench/health', { signal: controller.signal, credentials: 'same-origin' })
          .then(async (response) => {
            if (!response.ok) throw new Error(`服务连接失败 (${response.status})`)
            const result = await response.json()
            if (!controller.signal.aborted) setHealth(result)
          })
          .catch((failure) => { if (!controller.signal.aborted) setError(failure.message) })
        return () => controller.abort()
      }, [attempt])

      const openPrimer = (event) => {
        primerTriggerRef.current = event && event.currentTarget ? event.currentTarget : null
        setPrimerOpen(true)
      }

      /* 页面发来的草稿：校验来源后填进宿主原生草稿；send 为 true 时按双守卫发送。 */
      async function deliver(prompt, send) {
        setPaneOpen(true)
        setNote('正在把本页内容交给 AI 会话…')
        try {
          if (!bridge?.desktopWorkbenches) throw new Error('宿主服务不可用')
          let id = currentSession()
          const ownsApi = typeof bridge.desktopWorkbenches.ownsSession === 'function'
          if (id && ownsApi && !ownsSession(id)) id = null
          if (!id) {
            if (typeof bridge.desktopWorkbenches.newSession !== 'function') throw new Error('当前 Desktop 版本不能从面板创建会话')
            id = await createOwnedSession()
          }
          if (!id) throw new Error('没有可用的原生会话')
          /* 新建会话后 composer 可能晚一两拍就绪：短轮询，拿到就填，不无限等。 */
          let input = null
          let actx = null
          for (let i = 0; i < 12 && !input; i += 1) {
            actx = bridge.sessions?.scope?.(id)
            const node = actx?.get?.('conversation')
            input = node?.input?.for?.(actx) || null
            if (!input) await new Promise((done) => setTimeout(done, 120))
          }
          if (!input || typeof input.setDraft !== 'function') throw new Error('对话输入尚未就绪')
          const snapshot = input.state?.getSnapshot?.() || {}
          if (snapshot.occurrences?.length || (snapshot.phase && snapshot.phase !== 'plain')) {
            throw new Error('当前草稿含引用或特殊输入，请先在原生会话里处理')
          }
          const current = snapshot.draft || ''
          input.setDraft(current.trim() ? `${current}\n\n${prompt}` : prompt)
          if (send) {
            const after = input.state?.getSnapshot?.() || {}
          }
          setNote('已把本页内容填入原生会话草稿')
        } catch (failure) {
          setNote('没能连接到 AI 会话：' + (failure && failure.message ? failure.message : failure))
        }
      }
      React.useEffect(() => { deliverRef.current = deliver })

      React.useEffect(() => {
        function onMessage(event) {
          const data = event.data
          if (!data || typeof data !== 'object' || data.type !== 'prostate:agent-draft') return
          const frame = frameRef.current
          if (!frame || event.source !== frame.contentWindow) return
          if (event.origin !== window.location.origin) return
          const prompt = typeof data.prompt === 'string' ? data.prompt.trim() : ''
          if (!prompt) return
          void deliverRef.current?.(prompt.slice(0, 8000), data.send === true)
        }
        window.addEventListener('message', onMessage)
        return () => window.removeEventListener('message', onMessage)
      }, [])

      /* ---- splitter：鼠标/触控拖动 + 键盘调节 ---- */

      const applyWidth = React.useCallback((next) => {
        const snapped = round4(snapWidth(next))
        setPaneWidth(snapped)
        saveWidth(snapped)
      }, [])

      const stopDrag = React.useCallback(() => {
        dragHostRef.current = null
        setDragging(false)
      }, [])

      React.useEffect(() => {
        if (!dragging) return undefined
        const onMove = (event) => {
          const host = dragHostRef.current
          if (!host) return
          const rect = host.getBoundingClientRect()
          if (!rect.width) return
          // 会话在右侧：指针越靠左，会话越宽
          applyWidth((rect.right - event.clientX) / rect.width)
        }
        document.addEventListener('pointermove', onMove)
        document.addEventListener('pointerup', stopDrag)
        document.addEventListener('pointercancel', stopDrag)
        return () => {
          document.removeEventListener('pointermove', onMove)
          document.removeEventListener('pointerup', stopDrag)
          document.removeEventListener('pointercancel', stopDrag)
        }
      }, [dragging, applyWidth, stopDrag])

      const onSplitterPointerDown = (event) => {
        event.preventDefault()
        // 指针捕获失败时由 document 上的监听兜住，拖动不会断
        try { event.currentTarget.setPointerCapture(event.pointerId) } catch { /* 旧宿主无指针捕获 */ }
        dragHostRef.current = shellRef.current
        setDragging(true)
      }

      const onSplitterKeyDown = (event) => {
        const delta = { ArrowLeft: AGENT_STEP, ArrowRight: -AGENT_STEP }[event.key] // 会话在右：← 变宽
        if (delta !== undefined) { event.preventDefault(); applyWidth(paneWidth + delta); return }
        if (event.key === 'Home') { event.preventDefault(); applyWidth(AGENT_MAX); return }
        if (event.key === 'End') { event.preventDefault(); applyWidth(AGENT_MIN) }
      }

      const percent = Math.round(paneWidth * 100)

      if (!uiBroken) {
        return h('main', { className: 'wb-prostate-workbench', style: { flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0 } },
          /* 业务区 / 分隔线 / 会话共用同一个定位容器：拖动遮罩与绝对定位分隔线都以它为基准。 */
          h('div', { ref: shellRef, style: { position: 'relative', flex: 1, display: 'flex', minHeight: 0, minWidth: 0 } },
            h('iframe', {
              ref: frameRef,
              src: UI_ENTRY,
              title: '小前宝 ProstaPal · 前列腺癌工作台',
              style: { flex: 1, width: '100%', border: 0, minHeight: 0, background: '#f7faf8' },
            }),
            // 分隔线必须夹在业务区与会话之间：放到 aside 之后会贴到面板最右缘，
            // 真正的分界线上就既没有悬停高亮也拖不动。
            paneOpen && h('div', {
              role: 'separator',
              'aria-orientation': 'vertical',
              'aria-label': '调整 AI 对话面板宽度',
              'aria-valuemin': Math.round(AGENT_MIN * 100),
              'aria-valuemax': Math.round(AGENT_MAX * 100),
              'aria-valuenow': percent,
              tabIndex: 0,
              style: {
                ...(dragging ? splitterDragStyle : hovering ? splitterHoverStyle : splitterStyle),
                right: `${percent}%`,
              },
              onPointerDown: onSplitterPointerDown,
              onPointerEnter: () => setHovering(true),
              onPointerLeave: () => setHovering(false),
              onKeyDown: onSplitterKeyDown,
            },
              // 1px 线条 + 11px 透明热区：看起来是常规分界线，拖起来仍有足够命中面积
              h('span', { style: splitterHitStyle, 'aria-hidden': 'true' }),
              (hovering || dragging) ? h('span', { style: splitterGripStyle, 'aria-hidden': 'true' }, '⠿') : null),
            /* 原生会话始终挂载，只用 display 控显隐；收起不结束会话。 */
            h('aside', {
              'aria-label': 'AI 对话（宿主原生会话）',
              'aria-hidden': paneOpen ? undefined : 'true',
              style: {
                flex: '0 0 auto', width: `${percent}%`, boxSizing: 'border-box',
                minHeight: 0, minWidth: 0,
                display: paneOpen ? 'flex' : 'none', flexDirection: 'column',
                background: '#ffffff', borderInlineStart: '1px solid #dce7df',
              },
            },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderBottom: '1px solid #dce7df' } },
                h('strong', { style: { flex: 1, fontSize: 13 } }, 'AI 对话'),
                h('button', { type: 'button', onClick: () => setPaneOpen(false), 'aria-label': '收起 AI 对话', style: { minHeight: 32, padding: '0 10px' } }, '收起')),
              h('div', { style: { flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column' } },
                conversation || h('div', { style: { padding: 14, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#596c62' } },
                  h('b', null, '原生会话还没开始'),
                  h('span', null, '页面上的「和 AI 讨论」会调起 DSH 原生会话；本工作台不自建聊天窗。'))),
              note ? h('p', { role: 'status', style: { margin: 0, padding: '8px 10px', fontSize: 12, color: '#596c62', borderTop: '1px solid #dce7df' } }, note) : null),
            // 拖动时铺一层透明遮罩：指针一旦掠到业务 iframe 上，指针事件就归子文档，
            // document 上的监听收不到；遮罩让整个面板都成为我们的命中区。
            dragging && h('div', { 'aria-hidden': 'true', style: dragShieldStyle })))
      }

      return h('main', { className: 'wb-prostate-workbench', 'data-font': large ? 'large' : 'standard', style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 16, padding: 20, overflow: 'auto' } },
        h('header', { style: { display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', paddingInlineStart: 'var(--dsh-frame-leading-clearance, 0px)' } },
          h('strong', null, metadata.title),
          h('span', { 'aria-live': 'polite' }, health ? `v${health.version}` : '版本待连接'),
          h('button', {
            type: 'button', className: 'wb-primer-trigger', 'data-primer-open': '',
            'aria-haspopup': 'dialog', 'aria-controls': 'disease-primer',
            'aria-expanded': primerOpen ? 'true' : 'false',
            'aria-label': '疾病概要：定义、医学资料与指南情况、治疗全景、发展趋势',
            title: '疾病概要：定义 · 指南 · 治疗全景 · 趋势',
            onClick: openPrimer
          }, '疾病概要'),
          h('button', { type: 'button', 'aria-pressed': large, onClick: () => setLarge(!large) }, large ? '标准字' : '大字')),
        h('style', null, theme),
        h('style', null, primerTheme),
        h(StatusCard, { onOpenPrimer: openPrimer }),
        h('section', { style: { background: 'var(--wb-surface)', border: '1px solid var(--wb-line)', borderRadius: 'var(--wb-radius)', padding: 20 } },
          h('h1', { style: { fontSize: '1.6em', margin: '0 0 12px' } }, metadata.title),
          h('p', null, metadata.description),
          h('p', { role: 'status' }, error || (health ? '业务界面没能加载：本机服务已连接，请重试加载 public/ 页面。' : '正在连接本机服务…')),
          h('button', { type: 'button', className: 'wb-primary', onClick: () => setAttempt((value) => value + 1) }, '重新检查连接')),
        primerOpen ? h(PrimerPanel, { onClose: () => setPrimerOpen(false), triggerRef: primerTriggerRef }) : null)
    }
    function apply(ctx) {
      bridge = ctx
      ctx.effect(() => ctx.desktopWorkbenches.register({"title":"小前宝 ProstaPal · 前列腺癌工作台","repository":"https://github.com/xyb-openharness-dsh-plugins/prostate-workbench","description":"面向前列腺癌患者与照护者的本机优先工作台：病理与 PSA 读懂、ADT 身体与生活、排尿与性功能康复、主动监测、复诊准备与临床试验档案","audience":"前列腺癌患者与照护者","requirements":"本机资料整理；不判断病情，判断由用户与治疗团队做出。","initialization":"empty","embedded":true,"layout":{"businessSide":"left","businessWidth":0.6},"customFrame":true}, Panel))
    }
    return { apply, inject: ['desktopWorkbenches', 'sessions'] }
  }
})
