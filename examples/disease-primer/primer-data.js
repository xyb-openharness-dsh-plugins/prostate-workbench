/* 36 号 · 疾病概要 · 前列腺癌
 * 内容只取自本仓 README「## 疾病概要」、docs/DISEASE-PRIMER.md、docs/BRIEF.md 与 reference/。
 * 四段固定：definition → evidence → landscape → trend。不写判定、不复制指南条文、不编 URL。
 * 链接经 primer-backfill-2026-10-27/verify-links.mjs 逐条验活；只写 OK 的链接，其余如实 nolink + note。
 */
window.DISEASE_PRIMER = {
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
